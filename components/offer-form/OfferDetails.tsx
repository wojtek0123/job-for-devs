import React, { useContext, useEffect, useState } from 'react';
import { FormData } from '../../helpers/types';
import { technologies, seniorities, categories } from '../../helpers/constants';
import StepsContext from '../../context/steps-context';
import ErrorMessage from './ErrorMessage';
import {
  handleInputData,
  checkIsLengthIsGreaterThanZero,
  handleButtonData,
} from '../../utils/functions';
import Notification from '../notification/Notification';
import { useRouter } from 'next/router';
import Capsules from 'components/capsules/Capsules';
import useSalaryError from '../../hooks/useSalaryError';

const typeOfDayJobs = ['pełny etat', 'połowa etatu', 'częściowy etat'];
const locations = ['stacjonarnie', 'zdalnie', 'hybrydowo'];

const OfferDetails: React.FC<{
  onFirstStep: (firstStepData: Partial<FormData>) => void;
  formData: FormData;
}> = ({ onFirstStep, formData }) => {
  const router = useRouter();
  const { nextStep } = useContext(StepsContext);

  const [selectedCategory, setSelectedCategory] = useState(
    formData?.category ?? ''
  );
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    formData?.technologies ?? []
  );
  const [enteredMinSalary, setEnteredMinSalary] = useState(
    formData?.minSalary ?? ''
  );
  const [enteredMaxSalary, setEnteredMaxSalary] = useState(
    formData?.maxSalary ?? ''
  );
  const [enteredExactSalary, setExactSalary] = useState(
    formData?.exactSalary ?? ''
  );
  const [selectedLocation, setSelectedLocation] = useState(
    formData?.location ?? ''
  );
  const [selectedTypeOfDayJob, setSelectedTypeOfDayJob] = useState(
    formData?.typeOfDayJob ?? ''
  );
  const [selectedSeniority, setSelectedSeniority] = useState(
    formData?.seniority ?? ''
  );
  const [enteredBenefits, setEnteredBenefits] = useState(
    formData?.benefits ?? ''
  );
  const [enteredJobTitle, setEnteredJobTitle] = useState(
    formData?.jobTitle ?? ''
  );

  const [showErrors, setShowErrors] = useState(false);
  const [showNotificationOnSmallerDevice, setShowNotificationOnSmallerDevice] = useState(false);
  const {errorMessage, numberOfErrors} = useSalaryError(enteredMinSalary, enteredMaxSalary, enteredExactSalary);

  const handleTechnologies = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
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
  };

  const onNextStep = (): void => {
    let counter = 0;
    const requiredFieldsWithoutSalary = [
      selectedCategory,
      selectedTechnologies,
      selectedLocation,
      selectedSeniority,
      enteredJobTitle,
    ];

    requiredFieldsWithoutSalary.forEach(
      (requiredField) =>
        (counter = checkIsLengthIsGreaterThanZero(requiredField, counter))
    );

    counter += numberOfErrors;
    if (counter !== 0) {
      setShowErrors(true);
      setShowNotificationOnSmallerDevice(true);
      setTimeout(() => setShowNotificationOnSmallerDevice(false), 2000);
      return;
    }

    const firstStepData: Partial<FormData> = {
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
          <Capsules
            array={categories}
            selectedItem={selectedCategory}
            onClick={(event) => handleButtonData(event, setSelectedCategory)}
          />
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
          <Capsules
            array={technologies}
            selectedItem={selectedTechnologies}
            onClick={(event) => handleTechnologies(event)}
          />
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
        <div className='flex flex-col items-start sm:justify-between sm:items-center sm:flex-row md:flex-col md:items-start lg:items-center lg:flex-row w-full col-start-2 col-end-3'>
          <div className='flex items-center'>
            <input
              type='number'
              id='min-salary'
              placeholder='Od'
              min={2800}
              max={500000}
              maxLength={5}
              className='rounded-lg text-black p-3 max-w-[8rem] outline-green-500 bg-gray-100 lg:col-start-1 lg:col-end-2'
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
              className='rounded-lg text-black p-3 w-full max-w-[8rem] bg-gray-100 outline-green-500 lg:col-start-2 lg:col-end-3'
              autoComplete='off'
              value={enteredMaxSalary}
              onChange={(event) => handleInputData(event, setEnteredMaxSalary)}
            />
          </div>
          <div className='my-2 lg:col-start-3 lg:col-end-4'>lub</div>
          <input
            type='number'
            id='salary'
            placeholder='Dokładnie'
            min={2800}
            max={500000}
            maxLength={5}
            className='rounded-lg text-black p-3 w-full max-w-[8rem] bg-gray-100 outline-green-500 lg:col-start-4 lg:col-end-5'
            autoComplete='off'
            value={enteredExactSalary}
            onChange={(event) => handleInputData(event, setExactSalary)}
          />
        </div>
        <ErrorMessage isVisible={showErrors} message={errorMessage} />
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='mt-3 flex flex-col md:grid md:grid-cols-2 col-span-2 md:mb-6'>
        <p className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'>
          Lokalizacja
          <span className='ml-1 text-red-600'>*</span>
        </p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3 text-base'>
          <Capsules
            array={locations}
            selectedItem={selectedLocation}
            onClick={(event) => handleButtonData(event, setSelectedLocation)}
          />
        </div>
        <ErrorMessage expression={selectedLocation} isVisible={showErrors} />
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col lg:flex-row mt-3 md:grid md:grid-cols-2 col-span-2 md:mb-6'>
        <p className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'>
          Wymiar czasu pracy
        </p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3 text-base'>
          <Capsules
            array={typeOfDayJobs}
            onClick={(event) =>
              handleButtonData(event, setSelectedTypeOfDayJob)
            }
            selectedItem={selectedTypeOfDayJob}
          />
        </div>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 md:grid md:grid-cols-2 col-span-2 w-full md:mb-6'>
        <p className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'>
          Doświadczenie
          <span className='ml-1 text-red-600'>*</span>
        </p>
        <div className='flex flex-wrap items-center text-black col-start-2 col-end-3 text-base'>
          <Capsules
            array={seniorities}
            selectedItem={selectedSeniority}
            onClick={(event) => handleButtonData(event, setSelectedSeniority)}
          />
        </div>
        <ErrorMessage expression={selectedSeniority} isVisible={showErrors} />
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <label
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl flex flex-col lg:flex-row lg:items-center relative'
          htmlFor='benefits'
        >
          Dodatki dla pracownika
          <div className='group hidden lg:block'>
            <svg className='ml-2 w-5 h-5 fill-green-500' viewBox='0 0 512 512'>
              <path d='M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM256 336c-18 0-32 14-32 32s13.1 32 32 32c17.1 0 32-14 32-32S273.1 336 256 336zM289.1 128h-51.1C199 128 168 159 168 198c0 13 11 24 24 24s24-11 24-24C216 186 225.1 176 237.1 176h51.1C301.1 176 312 186 312 198c0 8-4 14.1-11 18.1L244 251C236 256 232 264 232 272V288c0 13 11 24 24 24S280 301 280 288V286l45.1-28c21-13 34-36 34-60C360 159 329 128 289.1 128z' />
            </svg>
            <div className='absolute bg-gray-200 top-0 -translate-y-3/4 left-1/2 translate-x-1/2 p-3 lg:transform-none lg:-top-3/4 lg:left-0 rounded-lg text-base hidden group-hover:block'>
              <p>
                Jeśli chcesz stworzyć listę odziel zdania naciskając enter.
                Efekt zobaczysz w kroku 4 - podgląd.
              </p>
            </div>
          </div>
          <p className='text-sm lg:hidden'>
            Jeśli chcesz stworzyć listę odziel zdania naciskając enter
          </p>
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
          show={showNotificationOnSmallerDevice}
        />
      </div>
      <div
        className={`flex w-full justify-center items-center bg-white py-4 md:col-span-2`}
      >
        <button
          type='button'
          className='bg-white text-black px-8 py-1 rounded-lg text-lg mx-3 flex justify-center items-center hover:bg-slate-200 transition-colors duration-300  border border-gray-200 capitalize'
          onClick={() => router.back()}
        >
          Powrót
        </button>

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
