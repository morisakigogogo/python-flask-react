import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type ContentProps = {
  value: string;
  language?: string;
};

const CodeBlock: React.FC<ContentProps> = props => {
  return (
    <SyntaxHighlighter language={props.language} style={atomDark}>
      {props.value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
