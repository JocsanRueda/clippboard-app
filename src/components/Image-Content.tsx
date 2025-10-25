import { getImage } from "@/api/tauri/utils";
import { ImageContentProps } from "@/types/image-content.type";

import { useEffect, useState } from "react";

function ImageContent({ text, url }: ImageContentProps) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getImage(url ?? "");
      setImageSrc(image);
    };
    fetchImage();
  }, [url]);

  return (

    <img src={imageSrc} alt={text} className="max-w-full max-h-30 rounded-md shadow-md " />
  );
}

export default ImageContent;
