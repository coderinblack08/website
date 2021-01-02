import matter from 'gray-matter';
import { ArrowLeft, Clock } from 'heroicons-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import Link from 'next/link';
import React from 'react';
import { Tween } from 'react-gsap';
import readingTime from 'reading-time';
import rehypeKatex from 'rehype-katex';
import remarkCodeTitles from 'remark-code-titles';
import remarkMath from 'remark-math';
import { GradientBar } from '../../components/GradientBar';
import { getAllPostSlugs, getPostdata } from '../../lib/blog';
import { components } from '../../lib/components';

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
          <Link href="/">
            <a>
              <ArrowLeft
                size={24}
                className="mb-4 text-gray-600 hover:text-gray-400 transition"
              />
            </a>
          </Link>
          <Tween stagger={0.2} duration={0.5} from={{ opacity: 0, y: -25 }}>
            <h1 className="font-black md:leading-normal text-3xl md:text-4xl">
              {frontMatter.title}
            </h1>
            <div className="mt-5 text-gray-400 font-lato flex justify-between">
              <p>By Coderinblack / {frontMatter.date}</p>
              <div className="flex items-center">
                <Clock size={18} className="mr-1.5" />
                {frontMatter.readingTime.text}
              </div>
            </div>
            <article className="prose max-w-none w-full mt-14 font-lato">
              {content}
            </article>
            <a
              href="https://github.com/coderinblack08"
              className="block text-gray-500 text-sm mt-4 hover:underline"
            >
              Found mistakes? Edit on Github
            </a>
          </Tween>
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
      remarkPlugins: [remarkMath, remarkCodeTitles],
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
