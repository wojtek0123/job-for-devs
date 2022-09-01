import { useState } from 'react';

export const technologies = [
  'JavaScript',
  'TypeScript',
  'NextJS',
  'React',
  'GraphQL',
  'tRPC',
  'Angular',
  'Vue',
  'Node.js',
  'Spring',
  '.Net',
  'SQL',
  'Python',
  'C++',
  'PHP',
  'Laravel',
];
const allCategory = ['Frontend', 'Backend', 'Fullstack'];
export const seniorities = ['stażysta', 'junior', 'mid', 'senior'];
const workingHours = ['pełny etat', 'połowa etatu', 'częściowy etat'];
const locations = ['stacjonarnie', 'zdalnie', 'hybrydowo'];

const OfferDetails: React.FC = () => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState('');

  const changeSelectedTechnologies = (
    event: React.FormEvent<HTMLButtonElement>
  ): void => {
    const text: string = event.currentTarget?.textContent?.toLowerCase() ?? '';

    if (selectedTechnologies.includes(text)) {
      const filtredTechnologies = selectedTechnologies.filter(
        (technology) => technology !== text
      );
      setSelectedTechnologies(filtredTechnologies);
      return;
    }

    setSelectedTechnologies((prevState) => [...prevState, text]);
  };

  const changeSelectedCategories = (
    event: React.FormEvent<HTMLButtonElement>
  ): void => {
    const text: string = event.currentTarget?.textContent?.toLowerCase() ?? '';
    setSelectedCategory(text);
  };

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
          {allCategory.map((category, index) => (
            <button
              type='button'
              key={index}
              className={`px-3 py-1 rounded-lg mr-1 my-1 ${
                selectedCategory.includes(category.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={changeSelectedCategories}
            >
              {category}
            </button>
          ))}
        </div>
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
                selectedTechnologies.includes(technology.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={changeSelectedTechnologies}
            >
              {technology}
            </button>
          ))}
        </div>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='mt-3 flex flex-col col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <p className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'>
          Wynagrodzenie
          <span className='ml-1 text-red-600'>*</span>
        </p>
        <div className='flex sm:justify-between items-start sm:items-center flex-col sm:flex-row md:flex-col md:items-start lg:items-center lg:flex-row lg:grid w-full col-start-2 col-end-3 lg:grid-cols-3'>
          <div className='flex items-center'>
            <input
              type='number'
              id='min-salary'
              placeholder='Od'
              min={2800}
              max={500000}
              maxLength={5}
              className='rounded-lg text-black p-3 max-w-[10rem] min-w-max w-full outline-green-500 bg-gray-100'
              autoComplete='off'
            />
            <div className='mx-2'>-</div>
            <input
              type='number'
              id='max-salary'
              min={2800}
              placeholder='Do'
              max={500000}
              maxLength={5}
              className='rounded-lg text-black p-3 w-full max-w-[10rem] min-w-max bg-gray-100 outline-green-500'
              autoComplete='off'
            />
          </div>
          <span className='flex min-w-min justify-start ml-1 my-2 sm:my-0 md:my-2 lg:my-0 sm:justify-center md:justify-start lg:justify-end lg:mr-10  xl:mr-0 xl:justify-center items-center lg:ml-0'>
            lub
          </span>
          <input
            type='number'
            id='salary'
            placeholder='Dokładnie'
            min={2800}
            max={500000}
            maxLength={5}
            className='rounded-lg text-black p-3 w-full max-w-[10rem] min-w-max bg-gray-100 outline-green-500'
            autoComplete='off'
          />
        </div>
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
                selectedCategory.includes(location.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {location}
            </button>
          ))}
        </div>
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
                selectedCategory.includes(workingHour.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
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
                selectedCategory.includes(seniority.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {seniority}
            </button>
          ))}
        </div>
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
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1'>
          Maksymalnie 500 znaków
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
        />
      </div>
    </>
  );
};

export default OfferDetails;
