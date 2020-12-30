import React from 'react'

type PostProps = {
  tag: string;
  date: string;
  pageViews: number | null;
  title: string;
  description: string | null;
}

export const Post: React.FC<PostProps> = ({
  tag,
  date,
  pageViews,
  title,
  description
}) => {
    return (

    );
}