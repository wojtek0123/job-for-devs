const cities = [
  'Warszawa',
  'Kraków',
  'Wrocław',
  'Poznań',
  'Trójmiasto',
  'Białystok',
  'Bielsko-Biała',
  'Bydgoszcz',
  'Częstochowa',
  'Kielce',
  'Lublin',
  'Łódź',
  'Olsztyn',
  'Opole',
  'Rzeszów',
  'Szczecin',
  'Toruń',
  'Zielona góra',
];

const ComapnyInfo: React.FC = () => {
  return (
    <>
      <h2 className='text-3xl mt-3 mb-5 col-span-2 lg:mb-10 lg:mt-5'>
        Dane administracyjne
      </h2>
      <div className='flex flex-col border border-white rounded-lg my-4 w-full col-span-2 md:grid md:grid-cols-2'>
        <label
          htmlFor='company-name'
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
        >
          Nazwa firmy <span className='text-red-600'>*</span>
        </label>
        <input
          type='text'
          id='company-name'
          maxLength={100}
          className='py-3 px-3 rounded-lg text-black text-base border border-gray-200 outline-green-500 w-full bg-gray-100 col-start-2 col-end-3'
          autoComplete='off'
          placeholder='Nazwa firmy'
        />
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col border border-white rounded-lg my-4 w-full col-span-2 md:grid md:grid-cols-2'>
        <label className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'>
          Location <span className='text-red-600'>*</span>
        </label>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
          {cities.map((city, index) => (
            <button
              type='button'
              key={index}
              className={`px-3 py-1 rounded-lg mr-1 my-1 bg-gray-200`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className='col-span-2 md:col-start-2 md:col-end-3 mb-4'>
        <div className='w-full flex items-center justify-start mb-3'>lub</div>
        <input
          type='text'
          id='input-location'
          placeholder='Inne miasto'
          className='py-3 px-3 rounded-lg text-black text-base border border-gray-200 outline-green-500 w-full bg-gray-200 col-start-2 col-end-3'
          autoComplete='off'
        />
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col border border-white rounded-lg my-4 w-full col-span-2 md:grid md:grid-cols-2'>
        <label
          htmlFor='street'
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
        >
          Adres <span className='text-red-600'>*</span>
        </label>
        <input
          type='text'
          id='street'
          placeholder='Nazwa ulicy'
          maxLength={100}
          className='py-3 px-3 rounded-lg text-black text-base border border-gray-200 outline-green-500 w-full bg-gray-100 col-start-2 col-end-3'
          autoComplete='off'
        />

        <div className='flex flex-col border border-white rounded-lg my-4 w-full col-span-2 md:grid md:grid-cols-2'>
          <div className='flex justify-between col-start-2 col-end-3 text-lg lg:text-xl mb-4'>
            <input
              type='text'
              id='building-number'
              title='building number'
              placeholder='Nr budynku'
              maxLength={7}
              className='py-3 px-3 rounded-lg text-black text-base border border-gray-200 outline-green-500 w-full bg-gray-100 col-start-2 col-end-3 max-w-[10rem] mr-1 sm:mr-0'
              autoComplete='off'
            />
            <input
              type='text'
              id='house-number'
              title='house number'
              placeholder='Nr mieszkania'
              maxLength={7}
              className='py-3 px-3 rounded-lg text-black text-base border border-gray-200 outline-green-500 w-full bg-gray-100 col-start-2 col-end-3 max-w-[10rem] ml-1 sm:ml-0'
              autoComplete='off'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ComapnyInfo;
