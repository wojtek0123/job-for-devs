import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Filters from '../filters/Filters';
import { FormData } from '../../helpers/types';

const Modal: React.FC<{
  show: boolean;
  close: () => void;
  offers: FormData[];
  onFilteredOffers: (offers: FormData[]) => void;
}> = ({ show, close, offers, onFilteredOffers }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div className='absolute top-0 left-0 right-0 bg-white p-5 lg:block lg:static lg:p-0 '>
      <div className='flex items-center'>
        <button
          type='button'
          onClick={close}
          className='bg-gray-200 text-black py-3 px-6 rounded-lg'
        >
          Wstecz
        </button>
        <h3 className='text-2xl mx-auto'>Filtruj oferty</h3>
      </div>
      <hr className='w-full mt-6' />
      <Filters offers={offers} onFilterOffers={onFilteredOffers} closeModal={close} />
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root') as HTMLDivElement
    );
  } else {
    return null;
  }
};

export default Modal;
