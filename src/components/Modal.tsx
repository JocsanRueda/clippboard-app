import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  title: string; 
  acceptText: string; 
  rejectText: string; 
  onAccept: () => void; 
  onReject: () => void; 
  onClose: () => void; 
}

const Modal = (props: ModalProps) => {
  const { title, acceptText, rejectText, onAccept, onReject, onClose } = props;

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50 m-4">
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-2xs px-6 py-5 w-96 border-3 border-gray-600 ">
        <div className="flex justify-end items-start   gap-4">
          

        <button
          onClick={onClose}
          className=" text-gray-900 dark:text-white hover:text-gray-500"
        >
          <AiOutlineClose />
        </button>
        </div>
        <h2 className="text-gray-900 dark:text-white text-md  mb-7">
          {title}
        </h2>

        {/* Botones */}
        <div className="flex justify-between gap-4">

            <button
            onClick={onAccept}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {acceptText}
          </button>

          <button
            onClick={onReject}
            className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            {rejectText}
          </button>
        
        </div>

      
        
      </div>
    </div>
  );
};

export default Modal;