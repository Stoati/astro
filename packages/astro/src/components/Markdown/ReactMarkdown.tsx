import Markdown from "react-markdown";

export default function ReactMarkdown({ value }: { value: string }) {
  return (
    <div>
      <Markdown>{value}</Markdown>
    </div>
  );
}
