import Button from './Button'

const Modal = ({ children, handleCloseModal, modalRef, title }) => {
  return (
    <dialog ref={modalRef} className='w-full p-4 rounded-t-xl md:w-96'>
      <div className='flex justify-between items-center h-8 mb-4'>
        <h3 className='text-2xl font-semibold font-sen'>{ title }</h3>
        <Button
          type='button'
          data-close-modal
          className={
            'px-2 bg-red-600 rounded-full text-white text-xl font-senibold'
          }
          onClick={handleCloseModal}
        >
          &times;
        </Button>
      </div>

      { children }
    </dialog>
  );
}

export default Modal