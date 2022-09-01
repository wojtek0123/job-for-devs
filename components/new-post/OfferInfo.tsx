const OfferInfo: React.FC = () => {
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
          Description
        </label>
        <textarea
          name='description'
          id='description'
          maxLength={2000}
          className='p-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1'>
          Maksymalnie 2000 znaków
        </small>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <label
          htmlFor='obligation'
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
        >
          Obligation <span className='ml-1 text-red-600'>*</span>
        </label>
        <textarea
          name='obligation'
          id='obligation'
          maxLength={500}
          className='p-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1'>
          Maksymalnie 500 znaków
        </small>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <label
          htmlFor='requirements'
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
        >
          Requirements <span className='ml-1 text-red-600'>*</span>
        </label>
        <textarea
          name='requirements'
          id='requirements'
          maxLength={500}
          className='p-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1'>
          Maksymalnie 500 znaków
        </small>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 mb-6 md:mb-6'>
        <label
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
          htmlFor='advantage'
        >
          Advantage
        </label>
        <textarea
          name='advantage'
          id='advantage'
          maxLength={500}
          className='p-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1'>
          Maksymalnie 500 znaków
        </small>
      </div>
    </>
  );
};

export default OfferInfo;
