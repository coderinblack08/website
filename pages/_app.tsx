import * as React from 'react';
import '../styles/index.css';
import '../styles/global.css';
import { AppProps } from 'next/app';
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
