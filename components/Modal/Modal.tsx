import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { technologies, seniorities, cities } from '../../helpers/constants';

const Modal: React.FC<{ show: boolean; close: () => void }> = ({
  show,
  close,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div className='absolute top-0 left-0 right-0 bg-white p-5 lg:block lg:static lg:p-0'>
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
      <div className='mt-3'>
        <p className='text-lg'>Technologie</p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
          {technologies.map((technology, index) => (
            <button
              type='button'
              key={index}
              className='px-3 py-1 rounded-lg mr-1 my-1 bg-gray-200'
            >
              {technology}
            </button>
          ))}
        </div>
      </div>
      <div className='mt-3'>
        <p className='text-lg'>Miasto</p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
          {cities.map((city, index) => (
            <button
              type='button'
              key={index}
              className='px-3 py-1 rounded-lg mr-1 my-1 bg-gray-200'
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className='mt-3'>
        <p className='text-lg'>Doświadczenie</p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
          {seniorities.map((seniority, index) => (
            <button
              type='button'
              key={index}
              className='px-3 py-1 rounded-lg mr-1 my-1 bg-gray-200'
            >
              {seniority}
            </button>
          ))}
        </div>
      </div>
      <button
        type='button'
        className='bg-green-500 text-white py-3 rounded-lg mt-10 w-full'
        onClick={close}
      >
        Filtruj
      </button>
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
