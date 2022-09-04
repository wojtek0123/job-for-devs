import React, { useState } from 'react';
import { FormData } from '../../helpers/types';
import { technologies, seniorities, cities } from '../../helpers/constants';
import { DUMMY_DATA } from '../../data/DUMMY_DATA';

interface IFilters {
  city: string;
  seniority: string;
}

const Filters: React.FC<{
  offers: FormData[];
  onFilterOffers: (offers: FormData[]) => void;
  closeModal?: () => void;
}> = ({ offers, onFilterOffers, closeModal }) => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSeniority, setSelectedSeniority] = useState('');

  const changeTechnologiesHandler = (
    event: React.FormEvent<HTMLButtonElement>
  ): void => {
    const selectedTechnology =
      event.currentTarget.textContent?.toLowerCase() ?? '';

    if (selectedTechnologies.includes(selectedTechnology)) {
      const filteredTechnologies = selectedTechnologies.filter(
        (technology) => technology.toLowerCase() !== selectedTechnology
      );

      setSelectedTechnologies(filteredTechnologies);
      return;
    }

    if (selectedTechnologies.length > 5) {
      return;
    }

    setSelectedTechnologies((prevState) => [...prevState, selectedTechnology]);
  };

  const changeSeniorityHandler = (
    event: React.FormEvent<HTMLButtonElement>
  ): void => {
    setSelectedSeniority(event.currentTarget.textContent?.toLowerCase() ?? '');
  };

  const changeCityHandler = (
    event: React.FormEvent<HTMLButtonElement>
  ): void => {
    setSelectedCity(event.currentTarget.textContent?.toLowerCase() ?? '');
  };

  const filterByTechnologiesCitySeniority = (event: React.FormEvent): void => {
    event.preventDefault();

    if (
      selectedCity.length === 0 &&
      selectedSeniority.length === 0 &&
      selectedTechnologies.length === 0
    ) {
      onFilterOffers(DUMMY_DATA);
      if (closeModal !== undefined) {
        closeModal();
      }
      return;
    }

    const filters: IFilters = {
      city: selectedCity,
      seniority: selectedSeniority,
    };

    let filtered;

    if (selectedTechnologies.length !== 0) {
      filtered = offers.filter((data) =>
        data.technologies.some((technology) =>
          selectedTechnologies.includes(technology.toLowerCase())
        )
      );
    } else {
      filtered = offers;
    }

    const filteredData = filtered.filter((data) =>
      Object.entries(filters).every(
        ([key, value]) => value === data[key as keyof FormData] || value === ''
      )
    );
    onFilterOffers(filteredData);
    if (closeModal !== undefined) {
      closeModal();
    }
  };

  return (
    <form onSubmit={filterByTechnologiesCitySeniority} className='bg-white'>
      <div className='mt-3'>
        <p className='text-lg'>Technologie</p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
          <button
            type='button'
            className={`px-3 py-1 rounded-lg mr-1 my-1 ${
              selectedTechnologies.length === 0
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={() => setSelectedTechnologies([])}
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
              onClick={changeTechnologiesHandler}
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
            className={`px-3 py-1 rounded-lg mr-1 my-1 ${
              selectedCity === ''
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={() => setSelectedCity('')}
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
              onClick={changeCityHandler}
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
            className={`px-3 py-1 rounded-lg mr-1 my-1 ${
              selectedSeniority === ''
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={() => setSelectedSeniority('')}
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
              onClick={changeSeniorityHandler}
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
