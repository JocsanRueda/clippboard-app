import { MAX_TEXT_LENGTH } from "@/utils/constant";

export function TextContentEditor({text, editText, setText}: TextContentEditorProps ) {

   const displayText = text.length > MAX_TEXT_LENGTH ? text.slice(0, MAX_TEXT_LENGTH) + "..." : text;


   if (editText){
   
    return (
      <textarea
        className="w-full  h-28 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base font-light tracking-tight "
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={50*MAX_TEXT_LENGTH}
      />
    );
   }else{

     return (<p className="text-gray-900 dark:text-white text-base font-light tracking-tight ">

        {displayText}

    </p>)
    
   }

}

export default TextContentEditor;