import Markdown from "react-markdown";
import { useEffect, useState } from "react";
import getElement from "../../tools/getElement";
import {
  findAssetAttribute,
  findMarkdownAttribute,
  findTextAttribute,
} from "../../tools/dataGetter";

const fetchData = async (
  code: string,
  setData: (
    data: {
      title: string;
      illustrationUrl: string;
      content: string;
    }[]
  ) => void
) => {
  const element = await getElement(code);

  const blogposts = element.map((item) => {
    const asset = findAssetAttribute(item, "mainAsset");
    const content = findMarkdownAttribute(item, "content");
    const title = findTextAttribute(item, "title");

    return {
      title: title?.data.text ?? "",
      illustrationUrl: asset?.data.url ?? "",
      content: content?.data.markdown ?? "",
    };
  });

  if (blogposts) {
    setData(blogposts);
  }
};

const BlogContent = ({
  initialData,
  code,
}: {
  initialData: {
    title: string;
    illustrationUrl?: string;
    content: string;
  }[];
  code: string;
}) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (code && setData) {
      fetchData(code, setData);
    }
  }, [code, setData]);

  return (
    <div className="flex flex-col max-w-screen-md w-full gap-6 pt-12">
      {data.map((item) => {
        return (
          <div className="flex flex-col gap-4 border-b-2 pb-6">
            <h2 className="font-bold text-xl">{item.title}</h2>
            {item.illustrationUrl && (
              <img
                src={item.illustrationUrl}
                className="max-w-screen-md max-h-[300px] self-center"
              />
            )}
            <Markdown>{item.content}</Markdown>
          </div>
        );
      })}
    </div>
  );
};

export default BlogContent;
