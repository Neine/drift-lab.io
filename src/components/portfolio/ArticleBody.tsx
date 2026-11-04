import ReactMarkdown from 'react-markdown';
export function ArticleBody({ content }: { content: string }) {
  return <div className="article-body break-words"><ReactMarkdown skipHtml components={{ a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> }}>{content}</ReactMarkdown></div>;
}