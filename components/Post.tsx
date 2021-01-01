import { Eye } from 'heroicons-react';
import Link from 'next/link';
import React from 'react';

type PostProps = {
  slug: string;
  tag: string;
  date: string;
  pageViews: number;
  title: string;
  description: string | null;
};

const formatNumber = (n: number): string | null => {
  const s = n.toString();
  if (s.length <= 3) {
    return s;
  }
  return (
    s.slice(0, s.length % 3) +
    ',' +
    formatNumber(parseInt(s.slice(s.length % 3)))
  );
};

export const Post: React.FC<PostProps> = ({
  slug,
  tag,
  date,
  pageViews,
  title,
  description,
}) => {
  return (
    <Link href="/blog/[slug]" as={`/blog/${slug}`}>
      <div
        className="font-lato cursor-pointer transform-gpu focus:scale-105 hover:scale-105 transition focus:outline-none"
        tabIndex={0}
      >
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center">
            <span className="rounded-md font-bold text-orange-100 bg-orange-300 bg-opacity-20 px-3 py-0.5 mr-2">
              {tag}
            </span>
            <span className="font-bold text-gray-400">·</span>
            <span className="ml-2">{date}</span>
          </div>
          <div className="flex items-center text-gray-500 mt-3 sm:mt-0">
            <Eye className="mr-2" size={20} />
            {formatNumber(pageViews)} page views
          </div>
        </div>
        <div className="font-lato">
          <h3 className="text-xl mt-4 font-bold">{title}</h3>
          <p className="text-gray-400 mt-2">{description}</p>
        </div>
      </div>
    </Link>
  );
};
