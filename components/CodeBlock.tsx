import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';

const CodeBlock: React.FC<{ className: string }> = ({
  children,
  className,
}) => {
  const language = className ? className.replace(/language-/, '') : 'txt';

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
          style={{
            ...style,
            padding: '20px',
            fontSize: 16,
            overflow: 'auto',
            wordWrap: 'normal',
            whiteSpace: 'pre',
          }}
        >
          {tokens.map((line, i) =>
            line ? (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) =>
                  token.empty && i == tokens.length - 1 ? null : (
                    <span key={key} {...getTokenProps({ token, key })} />
                  )
                )}
              </div>
            ) : null
          )}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
