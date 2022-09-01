import { NextPage } from 'next';
import React, { useState } from 'react';
import Link from 'next/link';
import OfferDetails from '../../components/new-post/OfferDetails';
import OfferInfo from '../../components/new-post/OfferInfo';
import ComapnyInfo from '../../components/new-post/CompanyInfo';

const stepsInfo = [
  'Szczegóły oferty',
  'Opis oferty',
  'Dane administracyjne',
  'Podgląd',
];

const NewPost: NextPage = () => {
  const [step, setStep] = useState(1);

  const onPreviousStep = (): void => {
    if (step === 1) {
      return;
    }
    setStep((prevState) => prevState - 1);
  };

  const onNextStep = (): void => {
    if (step === stepsInfo.length) {
      return;
    }
    setStep((prevState) => prevState + 1);
  };

  const content = {
    1: <OfferDetails />,
    2: <OfferInfo />,
    3: <ComapnyInfo />,
    4: <></>,
  }[step];

  const renderStepsDetails = stepsInfo.map((stepInfo, index) => (
    <div className='flex items-center' key={index}>
      {index !== 0 && (
        <div className={`mx-3 w-3 h-[0.1rem] bg-gray-200 xl:mx-5`} />
      )}
      <span
        className={`flex items-center justify-center h-8 w-8 rounded-full text-white ${
          step - 1 === index ? 'bg-green-500' : 'bg-gray-200'
        }`}
      >
        {index + 1}
      </span>
      <p
        className={`ml-2 text-base ${
          step - 1 === index ? 'text-black' : 'text-gray-200'
        }`}
      >
        {stepInfo}
      </p>
    </div>
  ));

  return (
    <>
      <header className='bg-white p-5 flex items-center justify-center w-full text-black selection:bg-green-500 selection:text-white border-b-2 border-gray-200'>
        <div className='max-w-7xl w-full flex justify-between'>
          <Link href='/'>
            <h1 className='text-3xl min-w-max cursor-pointer'>Job for Devs</h1>
          </Link>
          <div className='flex flex-col items-end w-full lg:hidden'>
            <p>{stepsInfo[step - 1]}</p>
            <p> Krok {step} z 4</p>
          </div>
          <div className='hidden w-full lg:flex lg:items-center justify-end'>
            {renderStepsDetails}
          </div>
        </div>
      </header>

      <main className='w-full max-w-7xl mx-auto px-5 xl:px-0  grid grid-cols-1 md:grid-cols-2'>
        {content}
        <div className='col-span-2 flex items-center'>
          *<span className='w-[0.35rem] h-[0.05rem] mx-1 bg-black block'></span>{' '}
          pole wymagane
        </div>
        <div
          className={`flex w-full justify-center items-center bg-white py-4 md:col-span-2`}
        >
          {step === 1 && (
            <Link href='/'>
              <a className='bg-white text-black px-8 py-1 rounded-lg text-lg mx-3 flex justify-center items-center hover:bg-slate-200 transition-colors duration-300  border border-gray-200'>
                <span className=''>powrót</span>
              </a>
            </Link>
          )}
          {step !== 1 && (
            <button
              type='button'
              onClick={onPreviousStep}
              className='bg-white text-black px-8 py-1 rounded-lg text-lg mx-3 hover:bg-slate-200 transition-colors duration-300 border border-gray-200'
            >
              wstecz
            </button>
          )}
          {step !== stepsInfo.length && (
            <button
              type='button'
              onClick={onNextStep}
              className='bg-green-500 text-white px-8 py-1 rounded-lg text-lg mx-3 hover:bg-green-600 transition-colors duration-300'
            >
              dalej
            </button>
          )}
          {step === stepsInfo.length && (
            <button
              type='submit'
              className='bg-green-500 text-white px-8 py-1 rounded-lg text-lg mx-3 hover:bg-green-600 transition-colors duration-300'
            >
              Opublikuj
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default NewPost;
