import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRender = ({ content }) => {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert w-full overflow-x-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // 👈 enables tables & GFM features
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="rounded-lg my-2"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-2">
                <table className="table-auto border-collapse border border-gray-400 dark:border-gray-600">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return (
              <thead className="bg-gray-100 dark:bg-gray-700">
                {children}
              </thead>
            );
          },
          th({ children }) {
            return (
              <th className="border border-gray-400 dark:border-gray-600 px-3 py-1 font-semibold text-left">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="border border-gray-400 dark:border-gray-600 px-3 py-1">
                {children}
              </td>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
