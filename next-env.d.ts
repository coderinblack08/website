/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '@mdx-js/react' {
  import * as React from 'react';
  type ComponentType =
    | 'a'
    | 'blockquote'
    | 'code'
    | 'del'
    | 'em'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'hr'
    | 'img'
    | 'inlineCode'
    | 'li'
    | 'ol'
    | 'p'
    | 'pre'
    | 'strong'
    | 'sup'
    | 'table'
    | 'td'
    | 'thematicBreak'
    | 'tr'
    | 'ul';
  export type Components = {
    [key in ComponentType]?: React.ComponentType<any>;
  };
  export interface MDXProviderProps {
    children: React.ReactNode;
    components: Components;
  }
  export class MDXProvider extends React.Component<MDXProviderProps> {}
}

declare module '@mapbox/rehype-prism';
declare module 'reading-time';
declare module 'remark-math';
declare module 'remark-code-titles';
