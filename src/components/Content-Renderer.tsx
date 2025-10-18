
import { ContentRendererProps } from "@/types/content-renderer.type";
import AudioContent from "./Audio-Content";
import DocumentContent from "./Document-Content";
import ImageContent from "./Image-Content";
import TextContentEditor from "./Text-Content-Editor";
import VideoContent from "./Video-Content";

function ContentRenderer({ type, text, url,editText, setText,handleCopy }: ContentRendererProps) {
  switch (type) {
    case "text":
      return <TextContentEditor text={text} editText={editText} setText={setText} handleCopy={handleCopy} />;
    case "image":
      return <ImageContent text={text} url={url } />;
    case "audio":
      return <AudioContent text={text} url={url} />;
    case "video":
      return <VideoContent text={text} url={url} />;
    case "document":
      return <DocumentContent text={text} url={url} />;
    default:
      return null;
  }
}

export default ContentRenderer;
