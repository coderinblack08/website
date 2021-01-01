import * as React from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from '../components/CodeBlock';

const components = {
  code: (props: any) => <CodeBlock {...props} />,
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
};

export default MyApp;
