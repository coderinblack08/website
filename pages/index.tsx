import { GetStaticProps } from 'next';
import * as React from 'react';
import { GradientBar } from '../components/GradientBar';
import { Post } from '../components/Post';
import { getSortedPosts } from '../lib/blog';

const Index: React.FC<{ blogData: any }> = ({ blogData }) => {
  return (
    <div>
      <GradientBar />
      <header className="py-20 md:py-32 lg:py-40 xl:py-44 2xl:py-48 px-5">
        <div className="relative z-10">
          <h1 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-left sm:text-center leading-snug">
            Find out what shenanigans <br />
            <div className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent md:mt-4 pb-1">
              I’m thinking about
            </div>
          </h1>
          <blockquote className="font-lato relative text-gray-400 my-5 md:my-10 max-w-md sm:max-w-2xl sm:mx-auto text-left sm:text-center">
            <div className="hidden md:block absolute -top-4 left-2">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.4174 6.97501H27.125C25.117 10.337 23.7266 13.5424 23.0315 16.5129H26.739L25.5029 24.8H17.47L18.0102 21.0475C18.9371 14.949 21.1001 10.2587 23.4174 6.97501ZM9.82235 6.97501H13.6075C11.5227 10.337 10.1316 13.5424 9.4364 16.5129H13.144L11.9079 24.8H3.875L4.41595 21.0475C5.34285 14.949 7.5051 10.2587 9.82235 6.97501Z"
                  fill="#43A4FF"
                  fill-opacity="0.75"
                />
              </svg>
            </div>
            <p>
              Computer science is no more about computers than astronomy is
              about telescopes
              <span className="ml-2 inline sm:hidden text-white font-bold">
                - Edsger W. Dijkstra
              </span>
            </p>
            <div className="hidden md:block absolute bottom-2 right-2">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.5826 24.025H3.875C5.88303 20.663 7.27337 17.4576 7.96855 14.4871L4.26095 14.4871L5.49707 6.19999L13.53 6.19999L12.9898 9.95254C12.0629 16.051 9.89985 20.7413 7.5826 24.025ZM21.1777 24.025H17.3925C19.4773 20.663 20.8684 17.4576 21.5636 14.4871L17.856 14.4871L19.0921 6.19999H27.125L26.5841 9.95254C25.6572 16.051 23.4949 20.7413 21.1777 24.025Z"
                  fill="#43A4FF"
                  fill-opacity="0.5"
                />
              </svg>
            </div>
          </blockquote>
          <p className="hidden sm:block font-lato font-bold text-white text-left sm:text-center -mt-1 md:-mt-6">
            - Edsger W. Dijkstra
          </p>
          <button className="sm:mx-auto block mt-10 shadow-xl rounded-full px-8 sm:px-11 py-2 sm:py-2.5 font-lato sm:text-lg font-bold bg-gradient-to-r from-blue-500 to-violet-500 focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-4 transition focus:ring-offset-black">
            Dive In
          </button>
        </div>
        <h2 className="hidden lg:block relative z-0 -mt-48 font-lato font-black text-9xl text-center bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-800">
          Coderinblack
        </h2>
      </header>
      <main className="space-y-24 max-w-3xl px-10 mx-auto mt-12 mb-44">
        {blogData.map((post: any) => (
          <Post
            slug={post.slug}
            tag={post.tag}
            date={post.date}
            pageViews={0}
            title={post.title}
            description={post.description}
          />
        ))}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogData = getSortedPosts();
  return {
    props: {
      blogData,
    },
  };
};

export default Index;
