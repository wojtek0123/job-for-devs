import { FormData, Offer } from '../../helpers/types';
import { cities } from '../../helpers/constants';

const ComapnyInfo: React.FC<{
  handleButtons: (
    event: React.FormEvent<HTMLButtonElement>,
    input: string
  ) => void;
  handleInputs: (
    event: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => void;
  data: FormData;
}> = ({ handleButtons, handleInputs, data }) => {
  return (
    <>
      <h2 className='text-3xl mt-3 mb-5 col-span-2 lg:mb-10 lg:mt-5'>
        Dane administracyjne
      </h2>
      <div className='flex flex-col rounded-lg my-4 w-full col-span-2 md:grid md:grid-cols-2'>
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
          className='py-3 px-3 rounded-lg text-black text-base outline-green-500 w-full bg-gray-100 col-start-2 col-end-3'
          autoComplete='off'
          placeholder='Nazwa firmy'
          onChange={(event) => handleInputs(event, Offer.CompanyName)}
        />
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col rounded-lg my-4 w-full col-span-2 md:grid md:grid-cols-2'>
        <label className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'>
          Miasto <span className='text-red-600'>*</span>
        </label>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3 text-base'>
          {cities.map((city, index) => (
            <button
              type='button'
              key={index}
              className={`px-3 py-1 rounded-lg mr-1 my-1 ${
                data.city.includes(city.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={(event) => handleButtons(event, Offer.City)}
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
          className='py-3 px-3 rounded-lg text-black text-base outline-green-500 w-full bg-gray-100 col-start-2 col-end-3'
          autoComplete='off'
          onChange={(event) => handleInputs(event, Offer.City)}
        />
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col rounded-lg my-4 w-full col-span-2 md:grid md:grid-cols-2'>
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
          className='py-3 px-3 rounded-lg text-black text-base outline-green-500 w-full bg-gray-100 col-start-2 col-end-3'
          autoComplete='off'
          onChange={(event) => handleInputs(event, Offer.Street)}
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
              onChange={(event) => handleInputs(event, Offer.BuildingNumber)}
            />
            <input
              type='text'
              id='house-number'
              title='house number'
              placeholder='Nr mieszkania'
              maxLength={7}
              className='py-3 px-3 rounded-lg text-black text-base border border-gray-200 outline-green-500 w-full bg-gray-100 col-start-2 col-end-3 max-w-[10rem] ml-1 sm:ml-0'
              autoComplete='off'
              onChange={(event) => handleInputs(event, Offer.HouseNumber)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ComapnyInfo;
