import React from 'react';
import { FormData, Offer, FirstStepError } from '../../helpers/types';
import { technologies, seniorities } from '../../helpers/constants';

const categories = ['Frontend', 'Backend', 'Fullstack'];
const workingHours = ['pełny etat', 'połowa etatu', 'częściowy etat'];
const locations = ['stacjonarnie', 'zdalnie', 'hybrydowo'];

const OfferDetails: React.FC<{
  handleButtons: (
    event: React.FormEvent<HTMLButtonElement>,
    input: string
  ) => void;
  handleInputs: (
    event: React.ChangeEvent<HTMLInputElement>,
    input: string,
    type: 'number' | 'text'
  ) => void;
  handleTextarea: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    input: string
  ) => void;
  data: FormData;
  errorMsgs: FirstStepError;
}> = ({ handleButtons, data, handleInputs, handleTextarea, errorMsgs }) => {
  return (
    <>
      <h2 className='text-3xl mt-3 mb-5 col-span-2 lg:mb-10 lg:mt-5'>
        Szczegóły oferty
      </h2>
      <div className='flex flex-col lg:flex-row col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <p className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'>
          Kategoria
          <span className='ml-1 text-red-600'>*</span>
        </p>
        <div className='flex flex-wrap items-center text-base text-black col-start-2 col-end-3'>
          {categories.map((category, index) => (
            <button
              type='button'
              key={index}
              className={`px-3 py-1 rounded-lg mr-1 my-1 ${
                data.category.includes(category.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={(event) => handleButtons(event, Offer.Category)}
            >
              {category}
            </button>
          ))}
        </div>
        <small className='col-span-2 text-left md:text-right text-red-600'>
          {errorMsgs.category}
        </small>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />
      <div className='mt-3 flex flex-col w-full col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <p className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'>
          Technologie
          <span className='ml-1 text-red-600'>*</span>
        </p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3  text-base'>
          {technologies.map((technology, index) => (
            <button
              type='button'
              key={index}
              className={`px-3 py-1 rounded-lg mr-1 my-1 ${
                data.technologies.includes(technology.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={(event) => handleButtons(event, Offer.Technologies)}
            >
              {technology}
            </button>
          ))}
        </div>
        <small className='col-span-2 flex justify-end mt-1'>
          Maks. 6 technologii
        </small>
        <small className='col-span-2 text-left md:text-right text-red-600'>
          {errorMsgs.technologies}
        </small>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='mt-3 flex flex-col col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <p className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'>
          Wynagrodzenie
          <span className='ml-1 text-red-600'>*</span>
        </p>
        <div className='flex flex-col items-start sm:justify-between sm:items-center sm:flex-row md:flex-col md:items-start lg:items-center lg:flex-row w-full col-start-2 col-end-3 lg:grid-cols-3'>
          <div className='flex items-center'>
            <input
              type='number'
              id='min-salary'
              placeholder='Od'
              min={2800}
              max={500000}
              maxLength={5}
              className='rounded-lg text-black p-3 max-w-[10rem] min-w-fit w-full outline-green-500 bg-gray-100'
              autoComplete='off'
              value={data.minSalary}
              onChange={(event) =>
                handleInputs(event, Offer.MinSalary, 'number')
              }
            />
            <div className='mx-2'>-</div>
            <input
              type='number'
              id='max-salary'
              min={2800}
              placeholder='Do'
              max={500000}
              maxLength={5}
              className='rounded-lg text-black p-3 w-full max-w-[10rem] min-w-fit bg-gray-100 outline-green-500'
              autoComplete='off'
              value={data.maxSalary}
              onChange={(event) =>
                handleInputs(event, Offer.MaxSalary, 'number')
              }
            />
          </div>
          <span className='my-2'>lub</span>
          <input
            type='number'
            id='salary'
            placeholder='Dokładnie'
            min={2800}
            max={500000}
            maxLength={5}
            className='rounded-lg text-black p-3 w-full max-w-[10rem] min-w-max bg-gray-100 outline-green-500'
            autoComplete='off'
            value={data.exactSalary}
            onChange={(event) =>
              handleInputs(event, Offer.ExactSalary, 'number')
            }
          />
        </div>
        <small className='col-span-2 text-left md:text-right text-red-600'>
          {errorMsgs.minSalary}
        </small>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='mt-3 flex flex-col md:grid md:grid-cols-2 col-span-2 md:mb-6'>
        <p className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'>
          Lokalizacja
          <span className='ml-1 text-red-600'>*</span>
        </p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3 text-base'>
          {locations.map((location, index) => (
            <button
              type='button'
              key={index}
              className={`px-3 py-1 rounded-lg mr-1 my-1 ${
                data.location.includes(location.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={(event) => handleButtons(event, Offer.Location)}
            >
              {location}
            </button>
          ))}
        </div>
        <small className='col-span-2 text-left md:text-right text-red-600'>
          {errorMsgs.location}
        </small>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col lg:flex-row mt-3 md:grid md:grid-cols-2 col-span-2 md:mb-6'>
        <p className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'>
          Wymiar czasu pracy
        </p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3 text-base'>
          {workingHours.map((workingHour, index) => (
            <button
              type='button'
              key={index}
              className={`px-3 py-1 rounded-lg mr-1 my-1 ${
                data.workingHour.includes(workingHour.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={(event) => handleButtons(event, Offer.WorkingHour)}
            >
              {workingHour}
            </button>
          ))}
        </div>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 md:grid md:grid-cols-2 col-span-2 w-full md:mb-6'>
        <p className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'>
          Doświadczenie
          <span className='ml-1 text-red-600'>*</span>
        </p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3 text-base'>
          {seniorities.map((seniority, index) => (
            <button
              type='button'
              key={index}
              className={`px-3 py-1 rounded-lg mr-1 my-1 ${
                data.seniority.includes(seniority.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={(event) => handleButtons(event, Offer.Seniority)}
            >
              {seniority}
            </button>
          ))}
        </div>
        <small className='col-span-2 text-left md:text-right text-red-600'>
          {errorMsgs.seniority}
        </small>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <label
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
          htmlFor='benefits'
        >
          Korzyści
        </label>
        <textarea
          name='benefits'
          id='benefits'
          maxLength={500}
          className='py-1 px-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
          onChange={(event) => handleTextarea(event, Offer.Benefits)}
          value={data.benefits}
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1'>
          {data.benefits.length}/500
        </small>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col rounded-lg my-4 w-full col-span-2 md:grid md:grid-cols-2'>
        <label
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
          htmlFor='title'
        >
          Tytuł stanowiska <span className='text-red-600'>*</span>
        </label>
        <input
          type='text'
          id='title'
          className='p-3 rounded-lg text-black text-base outline-green-500 w-full bg-gray-100 col-start-2 col-end-3'
          autoComplete='off'
          onChange={(event) => handleInputs(event, Offer.JobTitle, 'text')}
          value={data.jobTitle}
        />
        <small className='col-span-2 text-left md:text-right text-red-600'>
          {errorMsgs.jobTitle}
        </small>
      </div>
    </>
  );
};

export default OfferDetails;
