import React, { useContext, useEffect, useState } from 'react';
import { Offer, IFirstStepData } from '../../helpers/types';
import { technologies, seniorities } from '../../helpers/constants';
import Link from 'next/link';
import StepsContext from '../../context/steps-context';
import ErrorMessage from './ErrorMessage';
import {
  handleInputData,
  checkIsLengthIsGreaterThanZero,
} from '../../helpers/functions';
import Notification from '../notification/Notification';

const categories = ['Frontend', 'Backend', 'Fullstack'];
const TypeOfDayJobs = ['pełny etat', 'połowa etatu', 'częściowy etat'];
const locations = ['stacjonarnie', 'zdalnie', 'hybrydowo'];

const OfferDetails: React.FC<{
  onFirstStep: (firstStepData: IFirstStepData) => void;
}> = ({ onFirstStep }) => {
  const { nextStep } = useContext(StepsContext);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [enteredMinSalary, setEnteredMinSalary] = useState('');
  const [enteredMaxSalary, setEnteredMaxSalary] = useState('');
  const [enteredExactSalary, setExactSalary] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTypeOfDayJob, setSelectedTypeOfDayJob] = useState('');
  const [selectedSeniority, setSelectedSeniority] = useState('');
  const [enteredBenefits, setEnteredBenefits] = useState('');
  const [enteredJobTitle, setEnteredJobTitle] = useState('');

  const [salaryError, setSalaryError] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleButtonData = (
    event: React.MouseEvent<HTMLButtonElement>,
    fn: (text: string) => void,
    input: Offer
  ): void => {
    if (input === Offer.Technologies) {
      const text = event.currentTarget?.textContent?.toLowerCase() ?? '';
      if (selectedTechnologies.includes(text)) {
        const filteredTechnologies = selectedTechnologies.filter(
          (technology) => technology.toLowerCase() !== text
        );

        setSelectedTechnologies(filteredTechnologies);
        return;
      }

      if (selectedTechnologies.length > 5) {
        return;
      }

      setSelectedTechnologies((prevState) => [...prevState, text]);
    }

    fn(event.currentTarget.textContent?.toLowerCase() ?? '');
  };

  const onNextStep = (): void => {
    const requiredFields = [
      selectedCategory,
      selectedTechnologies,
      selectedLocation,
      selectedSeniority,
      enteredJobTitle,
    ];
    let counter = 0;

    requiredFields.forEach(
      (requiredField) =>
        (counter = checkIsLengthIsGreaterThanZero(requiredField, counter))
    );

    if (
      enteredMinSalary === '' &&
      enteredMaxSalary === '' &&
      enteredExactSalary === ''
    ) {
      counter += 1;
      setSalaryError('To pole jest wymagane');
    }

    if (
      enteredExactSalary !== '' &&
      (enteredMinSalary !== '' || enteredMaxSalary !== '')
    ) {
      counter += 1;
      setSalaryError('Wybierz widełki lub dokładną wartość');
    }

    if (enteredMinSalary !== '' && enteredMaxSalary !== '') {
      if (enteredMinSalary >= enteredMaxSalary) {
        counter += 1;
        setSalaryError('Wartość maks. musi być większa od min.');
      }
    }

    if (
      (enteredMinSalary === '' && enteredMaxSalary !== '') ||
      (enteredMinSalary !== '' && enteredMaxSalary === '')
    ) {
      counter += 1;
      setSalaryError('Uzupełnij widełki lub wpisz tylko dokładną wartość');
    }

    if (
      (enteredMinSalary !== '' && enteredMaxSalary !== '') ||
      enteredExactSalary !== ''
    ) {
      setSalaryError('');
    }

    if (counter !== 0) {
      setShowErrors(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      return;
    }

    const firstStepData: IFirstStepData = {
      category: selectedCategory,
      technologies: selectedTechnologies,
      minSalary: enteredMinSalary,
      maxSalary: enteredMaxSalary,
      exactSalary: enteredExactSalary,
      location: selectedLocation,
      typeOfDayJob: selectedTypeOfDayJob,
      seniority: selectedSeniority,
      benefits: enteredBenefits.trim(),
      jobTitle: enteredJobTitle.trim(),
    };
    onFirstStep(firstStepData);
    setShowErrors(false);
    nextStep();
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

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
                selectedCategory.includes(category.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={(event) =>
                handleButtonData(event, setSelectedCategory, Offer.Category)
              }
            >
              {category}
            </button>
          ))}
        </div>
        <ErrorMessage expression={selectedCategory} isVisible={showErrors} />
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
              onClick={(event) =>
                handleButtonData(event, () => {}, Offer.Technologies)
              }
            >
              {technology}
            </button>
          ))}
        </div>
        <small className='col-span-2 flex justify-end mt-1'>
          {selectedTechnologies.length}/6
        </small>
        <ErrorMessage
          expression={selectedTechnologies}
          isVisible={showErrors}
        />
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
              value={enteredMinSalary}
              onChange={(event) => handleInputData(event, setEnteredMinSalary)}
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
              value={enteredMaxSalary}
              onChange={(event) => handleInputData(event, setEnteredMaxSalary)}
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
            value={enteredExactSalary}
            onChange={(event) => handleInputData(event, setExactSalary)}
          />
        </div>
        {showErrors && (
          <small className='col-span-2 text-left md:text-right text-red-600 h-4'>
            {(enteredMinSalary !== '' && enteredMaxSalary !== '') ||
            enteredExactSalary !== ''
              ? ''
              : salaryError}
          </small>
        )}
        {!showErrors && (
          <small className='col-span-2 text-left md:text-right text-red-600 h-4'></small>
        )}
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
                selectedLocation.includes(location.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={(event) =>
                handleButtonData(event, setSelectedLocation, Offer.Location)
              }
            >
              {location}
            </button>
          ))}
        </div>
        <ErrorMessage expression={selectedLocation} isVisible={showErrors} />
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col lg:flex-row mt-3 md:grid md:grid-cols-2 col-span-2 md:mb-6'>
        <p className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'>
          Wymiar czasu pracy
        </p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3 text-base'>
          {TypeOfDayJobs.map((typeOfDayJob, index) => (
            <button
              type='button'
              key={index}
              className={`px-3 py-1 rounded-lg mr-1 my-1 ${
                selectedTypeOfDayJob.includes(typeOfDayJob.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={(event) =>
                handleButtonData(
                  event,
                  setSelectedTypeOfDayJob,
                  Offer.TypeOfDayJob
                )
              }
            >
              {typeOfDayJob}
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
                selectedSeniority.includes(seniority.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={(event) =>
                handleButtonData(event, setSelectedSeniority, Offer.Seniority)
              }
            >
              {seniority}
            </button>
          ))}
        </div>
        <ErrorMessage expression={selectedSeniority} isVisible={showErrors} />
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <label
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
          htmlFor='benefits'
        >
          Dodatki dla pracownika
        </label>
        <textarea
          name='benefits'
          id='benefits'
          maxLength={500}
          className='py-1 px-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
          onChange={(event) => handleInputData(event, setEnteredBenefits)}
          value={enteredBenefits}
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1'>
          {enteredBenefits.length}/500
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
          onChange={(event) => handleInputData(event, setEnteredJobTitle)}
          value={enteredJobTitle}
        />
        <ErrorMessage expression={enteredJobTitle} isVisible={showErrors} />
      </div>
      <div className='lg:hidden col-span-2 w-full'>
        <Notification
          isError={true}
          message={'Popraw błędy'}
          show={showNotification}
        />
      </div>
      <div
        className={`flex w-full justify-center items-center bg-white py-4 md:col-span-2`}
      >
        <Link href='/'>
          <a className='bg-white text-black px-8 py-1 rounded-lg text-lg mx-3 flex justify-center items-center hover:bg-slate-200 transition-colors duration-300  border border-gray-200 capitalize'>
            <span className='capitalize'>powrót</span>
          </a>
        </Link>

        <button
          type='button'
          onClick={onNextStep}
          className='bg-green-500 text-white px-8 py-1 rounded-lg text-lg mx-3 hover:bg-green-600 transition-colors duration-300 capitalize'
        >
          dalej
        </button>
      </div>
    </>
  );
};

export default OfferDetails;
