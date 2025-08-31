import { VideoContentProps } from "@/types/video-content.type";

function VideoContent({ text, url }: VideoContentProps) {
  return (
    <div className="relative w-full max-w-full max-h-96 overflow-hidden rounded-md shadow-md dark:bg-gray-700">
      <video
        controls
        className="w-full h-auto"
      >
        <source src={url} type="video/mp4" />
        {text}
      </video>
    </div>
  );
}

export default VideoContent;
