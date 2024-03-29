import { useContext } from 'react';
import {
  technologies,
  seniorities,
  cities,
  categories,
} from '../../helpers/constants';
import FiltersContext from '../../context/filters-context';
import Capsules from 'components/capsules/Capsules';

const Filters: React.FC<{ close?: () => void }> = ({ close }) => {
  const {
    changeCategory,
    changeCity,
    changeTechnologies,
    changeSeniority,
    selectedCity,
    selectedCategory,
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
    <form onSubmit={submitHandler} className='bg-white relative'>
      <div className='mt-3'>
        <p className='text-lg'>Kategoria</p>
        <button
          type='button'
          id='clear-category'
          className={`p-3 lg:px-3 lg:py-2 rounded-lg mr-1 my-1 ${
            selectedCategory === ''
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-black'
          }`}
          onClick={changeCategory}
        >
          Wszystkie
        </button>
        <Capsules
          array={categories}
          onClick={changeCategory}
          selectedItem={selectedCategory}
        />
      </div>
      <div className='mt-3'>
        <p className='text-lg'>Technologie</p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
          <button
            type='button'
            id='clear-technologies'
            className={`p-3 lg:px-3 lg:py-2 rounded-lg mr-1 my-1 ${
              selectedTechnologies.length === 0
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={changeTechnologies}
          >
            Wszystkie
          </button>
          <Capsules
            array={technologies}
            selectedItem={selectedTechnologies}
            onClick={changeTechnologies}
          />
        </div>
      </div>
      <div className='mt-3'>
        <p className='text-lg'>Miasto</p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
          <button
            type='button'
            id='clear-city'
            className={`p-3 lg:px-3 lg:py-2 rounded-lg mr-1 my-1 ${
              selectedCity === ''
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={changeCity}
          >
            Wszystkie
          </button>
          <Capsules
            array={cities}
            onClick={changeCity}
            selectedItem={selectedCity}
          />
          <button
            type='button'
            id='rest-city'
            className={`p-3 lg:px-3 lg:py-2 rounded-lg mr-1 my-1 capitalize ${
              selectedCity === 'inne'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={changeCity}
          >
            Inne
          </button>
        </div>
      </div>

      <div className='mt-3'>
        <p className='text-lg'>Doświadczenie</p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
          <button
            type='button'
            id='clear-seniority'
            className={`p-3 lg:px-3 lg:py-2 rounded-lg mr-1 my-1 ${
              selectedSeniority === ''
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={changeSeniority}
          >
            wszystkie
          </button>
          <Capsules
            array={seniorities}
            onClick={changeSeniority}
            selectedItem={selectedSeniority}
          />
        </div>
      </div>
      <button
        type='submit'
        className='bg-green-500 sticky bottom-2 shadow-green-500 text-white p-5 md:p-3 text-lg rounded-lg mt-10 w-full hover:bg-green-600 transition-colors duration-300'
      >
        Filtruj
      </button>
    </form>
  );
};

export default Filters;
