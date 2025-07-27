function ImageContent({text,url}: ImageContentProps) {

   return (
     <img src={url} alt={text} className="max-w-full max-h-36 rounded-md shadow-md" />
   )

}


export default ImageContent;
