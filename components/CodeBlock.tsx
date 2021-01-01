import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';

const gruvboxTheme = {
  plain: {
    color: '#f7e7d6',
    backgroundColor: '#161616',
  },
  styles: [
    {
      types: ['keyword', 'operator'],
      style: {
        color: '#E78A4E',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: '#D8A657',
      },
    },
    {
      types: ['number', 'boolean', 'function', 'constant', 'namespace', 'char'],
      style: {
        color: '#D3869B',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#928374',
      },
    },
    {
      types: ['builtin', 'variable', 'class-name'],
      style: {
        color: '#7DAEA3',
      },
    },
    {
      types: ['property'],
      style: {
        color: '#89B482',
      },
    },
    {
      types: ['string'],
      style: {
        color: '#D4BE98',
      },
    },
  ],
};

const CodeBlock: React.FC<{ className: string }> = ({
  children,
  className,
}) => {
  const language = className.replace(/language-/, '');

  return (
    <Highlight
      {...defaultProps}
      code={children as string}
      language={language as Language}
      theme={vsDark}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} rounded-lg shadow-lg`}
          style={{ ...style, padding: '20px', fontSize: 16 }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
