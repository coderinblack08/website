import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'data/blog');

export const getSortedPosts = () => {
  const fileNames = fs.readdirSync(blogDirectory);

  const allPostsData = fileNames.map((filename) => {
    const slug = filename.replace('.md', '');

    const fullPath = path.join(blogDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(data.date).toLocaleDateString(
      'en',
      options as any
    );

    const frontmatter = {
      ...data,
      date: formattedDate,
    };

    return {
      slug,
      ...frontmatter,
    };
  });

  return allPostsData.sort((a, b) => {
    return new Date(a.date) < new Date(b.date) ? 1 : -1;
  });
};

export const getAllPostSlugs = () => {
  const slugs = fs.readdirSync(blogDirectory);

  return slugs.map((slug) => {
    return {
      params: {
        slug: slug.replace('.md', ''),
      },
    };
  });
};

export const getPostdata = async (slug: string) => {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  const postContent = fs.readFileSync(fullPath, 'utf8');

  return postContent;
};
