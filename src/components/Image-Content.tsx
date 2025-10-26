import { getImageUrl } from "@/api/tauri/utils";
import { ImageContentProps } from "@/types/image-content.type";

import { useEffect, useState } from "react";

function ImageContent({ text, url }: ImageContentProps) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const file = url ?? "";
    let mounted = true;

    (async () => {
      if (!file) return;
      const image = await getImageUrl(file);
      if (mounted) setImageSrc(image);
    })();

  }, [url]);

  return (

    <img src={imageSrc} alt={text} className="max-w-full max-h-30 rounded-md shadow-md object-cover aspect-[16/9]" loading="lazy" />

  );
}

export default ImageContent;
