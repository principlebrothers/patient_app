import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Button from './Button';
import { IoIosArrowForward } from 'react-icons/io';
import Modal from './Modal';

const Card = ({ title, description, image, alt, bg_color, text_color, path, frArrow_style, border_color, children }) => {
  const mainModalRef = useRef(null);
  const openModal = () => {
    mainModalRef.current.showModal();
  };

  const closeModal = () => {
    mainModalRef.current.close();
  };

  return (
    <>
      <article
        className={`${bg_color} rounded-lg p-4 shadow-lg flex flex-col items-center border ${border_color} `}
      >
        <figure>
          <img src={image} alt={alt} />
        </figure>
        <h3 className='text-xl font-semibold font-sen md:text-2xl'>{title}</h3>
        <p className='font-sen mb-2 text-center'>{description}</p>
        <Link
          to={path}
          className={
            'bg-yarysa-primary text-white text-center rounded-full p-2 w-32 font-sen font-semibold text-xl md:hidden'
          }
        >
          View
        </Link>
        <Button
          type='button'
          className={`hidden md:flex md:items-center gap-2 duration-300 hover:scale-105 ${text_color}`}
          onClick={openModal}
        >
          View details
          <IoIosArrowForward
            className={frArrow_style ? frArrow_style : 'text-xl'}
          />
        </Button>
      </article>
      <Modal handleCloseModal={closeModal} modalRef={mainModalRef} title={title}>
        { children }
      </Modal>
    </>
  );
}

export default Card