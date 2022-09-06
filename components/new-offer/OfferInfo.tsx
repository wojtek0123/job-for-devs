import { useEffect } from 'react';
import { Offer, FormData, SecondStepError } from '../../helpers/types';

const OfferInfo: React.FC<{
  handleTextarea: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    input: string
  ) => void;
  data: FormData;
  errorMsgs: SecondStepError;
}> = ({ handleTextarea, data, errorMsgs }) => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <h2 className='text-3xl mt-3 mb-5 col-span-2 lg:mb-10 lg:mt-5'>
        Opis oferty
      </h2>
      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <label
          htmlFor='description'
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
        >
          Opis
        </label>
        <textarea
          name='description'
          id='description'
          maxLength={2000}
          className='p-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
          onChange={(event) => handleTextarea(event, Offer.Description)}
          value={data.description}
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1'>
          {data.description.length}/2000
        </small>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <label
          htmlFor='obligation'
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
        >
          Obowiązki <span className='ml-1 text-red-600'>*</span>
        </label>
        <textarea
          name='obligation'
          id='obligation'
          maxLength={500}
          className='p-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
          value={data.obligation}
          onChange={(event) => handleTextarea(event, Offer.Obligation)}
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1'>
          {data.obligations.length}/500
        </small>
        <small className='col-span-2 text-left md:text-right text-red-600 h-4'>
          {errorMsgs.obligation}
        </small>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <label
          htmlFor='requirements'
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
        >
          Wymagania <span className='ml-1 text-red-600'>*</span>
        </label>
        <textarea
          name='requirements'
          id='requirements'
          maxLength={500}
          className='p-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
          value={data.requirements}
          onChange={(event) => handleTextarea(event, Offer.Requirements)}
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1'>
          {data.requirements.length}/500
        </small>
        <small className='col-span-2 text-left md:text-right text-red-600 h-4'>
          {errorMsgs.requirements}
        </small>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 mb-6 md:mb-6'>
        <label
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
          htmlFor='advantage'
        >
          Przewaga
        </label>
        <textarea
          name='advantage'
          id='advantage'
          maxLength={500}
          className='p-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
          onChange={(event) => handleTextarea(event, Offer.Advantages)}
          value={data.advantages}
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1 h-4'>
          {data.advantages.length}/500
        </small>
      </div>
    </>
  );
};

export default OfferInfo;
