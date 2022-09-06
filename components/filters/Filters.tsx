import React, { useContext } from 'react';
import { technologies, seniorities, cities } from '../../helpers/constants';
import FiltersContext from '../../context/filters-context';

const Filters: React.FC<{ close?: () => void }> = ({ close }) => {
  const {
    changeCity,
    changeTechnologies,
    changeSeniority,
    selectedCity,
    selectedSeniority,
    selectedTechnologies,
    onFilter,
  } = useContext(FiltersContext);

  const submitHandler = (event: React.FormEvent): void => {
    onFilter(event);
    if (close) {
      close();
    }
  };

  return (
    <form onSubmit={submitHandler} className='bg-white'>
      <div className='mt-3'>
        <p className='text-lg'>Technologie</p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
          <button
            type='button'
            id='clear-technologies'
            className={`px-3 py-1 rounded-lg mr-1 my-1 ${
              selectedTechnologies.length === 0
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={changeTechnologies}
          >
            All
          </button>
          {technologies.map((technology, index) => (
            <button
              type='button'
              key={index}
              className={`px-3 py-1 rounded-lg mr-1 my-1 ${
                selectedTechnologies.includes(technology.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={changeTechnologies}
            >
              {technology}
            </button>
          ))}
        </div>
      </div>
      <div className='mt-3'>
        <p className='text-lg'>Miasto</p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
          <button
            type='button'
            id='clear-city'
            className={`px-3 py-1 rounded-lg mr-1 my-1 ${
              selectedCity === ''
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={changeCity}
          >
            All
          </button>
          {cities.map((city, index) => (
            <button
              type='button'
              key={index}
              className={`px-3 py-1 rounded-lg mr-1 my-1 ${
                selectedCity.includes(city.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={changeCity}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className='mt-3'>
        <p className='text-lg'>Doświadczenie</p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
          <button
            type='button'
            id='clear-seniority'
            className={`px-3 py-1 rounded-lg mr-1 my-1 ${
              selectedSeniority === ''
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={changeSeniority}
          >
            All
          </button>
          {seniorities.map((seniority, index) => (
            <button
              type='button'
              key={index}
              className={`px-3 py-1 rounded-lg mr-1 my-1 ${
                selectedSeniority.includes(seniority.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={changeSeniority}
            >
              {seniority}
            </button>
          ))}
        </div>
      </div>
      <button
        type='submit'
        className='bg-green-500 text-white py-3 rounded-lg mt-10 w-full hover:bg-green-600 transition-colors duration-300'
      >
        Filtruj
      </button>
    </form>
  );
};

export default Filters;
