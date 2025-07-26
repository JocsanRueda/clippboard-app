import SquareText from "./square-text";



function History() {
  return (
    <div>
      <h2 className="text-gray-900 dark:text-white mt-5 text-base font-light tracking-tight mx-3">Clippboard</h2>
 

     <section className="flex flex-col gap-2 my-2">
        <SquareText text="This is a sample text that has been copied to the clipboard." type="text"/>
     
        <SquareText text="This text is also part of the clipboard history, showcasing how it This text is also part of the clipboard history, showcasing how itThis text is also part of the clipboard history, showcasing how it." type="text"/>
     
        <SquareText text="This is a image" type="image" url="https://static.getimg.ai/media/getimg_ai_img-uXZgKW7ZjTW9WBdjLofIG.jpeg"/>
        <SquareText text="This is a audio" type="audio" url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"/>
        <SquareText text="This is a video" type="video" url="https://www.w3schools.com/html/mov_bbb.mp4"/>
        <SquareText text="This is a document" type="document" url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"/>
      </section>
     
    </div>
  );
}


export default History;