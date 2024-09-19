import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css'; // 选择你喜欢的代码高亮样式

type MarkdownRendererProps = {
    content: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]} // 启用数学公式解析
            rehypePlugins={[
                rehypeKatex,  // 数学公式渲染
                rehypeHighlight, // 代码高亮
                rehypeRaw // 解析HTML
            ]}
            className="prose prose-invert max-w-none"
        >
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;
