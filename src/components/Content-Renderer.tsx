
import { ContentRendererProps } from "@/types/content-renderer.type";
import AudioContent from "./Audio-Content";
import DocumentContent from "./Document-Content";
import ImageContent from "./Image-Content";
import TextContentEditor from "./Text-Content-Editor";
import VideoContent from "./Video-Content";

function ContentRenderer({ type, value, url,editText, setText,handleCopy }: ContentRendererProps) {
  switch (type) {
    case "text":
      return <TextContentEditor text={value} editText={editText} setText={setText} handleCopy={handleCopy} />;
    case "image":
      return <ImageContent text={value} url={url } />;
    case "audio":
      return <AudioContent text={value} url={url} />;
    case "video":
      return <VideoContent text={value} url={url} />;
    case "document":
      return <DocumentContent text={value} url={url} />;
    default:
      return null;
  }
}

export default ContentRenderer;
