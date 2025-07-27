function AudioContent({text, url}: AudioContentProps) {

   return (
    
     <audio controls className="max-w-full max-h-36 my-3 dark:bg-gray-700 rounded-md shadow-md">
       <source src={url} type="audio/mpeg" />
       {text}
     </audio>
   )

}

export default AudioContent;
