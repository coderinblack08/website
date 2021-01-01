import React from 'react';
import { GradientBar } from '../../components/GradientBar';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPostSlugs, getPostdata } from '../../lib/blog';
import readingTime from 'reading-time';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { components } from '../../lib/components';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { Clock } from 'heroicons-react';

const Blog: React.FC<{ source: any; frontMatter: any }> = ({
  source,
  frontMatter,
}) => {
  const content = hydrate(source, { components });
  return (
    <div>
      <GradientBar />
      <div>
        <div className="max-w-3xl mx-auto py-24 px-5">
          <h1 className="font-black md:leading-normal text-3xl md:text-4xl">
            {frontMatter.title}
          </h1>
          <div className="mt-5 text-gray-500 font-lato flex justify-between">
            <p>By Coderinblack / {frontMatter.date}</p>
            <div className="flex items-center">
              <Clock size={18} className="mr-1.5" />
              {frontMatter.readingTime.text}
            </div>
          </div>
          <article className="prose lg:prose-lg mt-14">{content}</article>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postContent = await getPostdata(params!.slug as string);
  const { data, content } = matter(postContent);

  const mdxSource = await renderToString(content, {
    components,
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    },
    scope: data,
  });

  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = new Date(data.date).toLocaleDateString(
    'en',
    options as any
  );

  return {
    props: {
      source: mdxSource,
      frontMatter: {
        ...data,
        date: formattedDate,
        readingTime: readingTime(content),
      },
    },
  };
};

export default Blog;
