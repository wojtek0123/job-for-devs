import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import OfferDetails from '../../components/new-offer/OfferDetails';
import OfferInfo from '../../components/new-offer/OfferInfo';
import ComapnyInfo from '../../components/new-offer/CompanyInfo';
import {
  FirstStepError,
  FormData,
  Offer,
  SecondStepError,
  ThirdStepError,
} from '../../helpers/types';
import DisplayOfferDetails from '../../components/offer-details/DisplayOfferDetails';

const stepsInfo = [
  'Szczegóły oferty',
  'Opis oferty',
  'Dane administracyjne',
  'Podgląd',
];

const NewPost: NextPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    category: '',
    technologies: [],
    minSalary: '',
    maxSalary: '',
    exactSalary: '',
    location: '',
    typeOfDayJob: '',
    seniority: '',
    benefits: '',
    jobTitle: '',
    description: '',
    obligations: '',
    requirements: '',
    advantages: '',
    companyName: '',
    city: '',
    street: '',
    building: '',
    house: '',
  });
  const [formDataErrorsFirstStep, setFormDataErrorsFirstStep] =
    useState<FirstStepError>({
      category: '',
      technologies: '',
      minSalary: '',
      location: '',
      seniority: '',
      jobTitle: '',
    });
  const [formDataErrorsSecondStep, setFormDataErrorsSecondStep] =
    useState<SecondStepError>({
      obligations: '',
      requirements: '',
    });
  const [formDataErrorsThirdStep, setFormDataErrorsThirdStep] =
    useState<ThirdStepError>({
      companyName: '',
      city: '',
      street: '',
      building: '',
    });

  const handleButtonData = (
    event: React.FormEvent<HTMLButtonElement>,
    input: Offer
  ): void => {
    if (input === Offer.Technologies) {
      const text = event.currentTarget?.textContent?.toLowerCase() ?? '';
      if (formData.technologies.includes(text)) {
        const filteredTechnologies = formData.technologies.filter(
          (technology) => technology.toLowerCase() !== text
        );

        setFormData({ ...formData, technologies: filteredTechnologies });
        return;
      }

      if (formData.technologies.length > 5) {
        return;
      }

      setFormData({
        ...formData,
        [input]: [
          ...formData.technologies,
          event.currentTarget?.textContent?.toLowerCase() ?? '',
        ],
      });
      return;
    }
    setFormData({
      ...formData,
      [input]: event.currentTarget?.textContent?.toLowerCase() ?? '',
    });
  };

  const handleInputData = (
    event: React.ChangeEvent<HTMLInputElement>,
    input: string,
    type: 'number' | 'text'
  ): void => {
    if (type === 'number') {
      const value = isNaN(+event.currentTarget.value)
        ? ''
        : event.currentTarget.value.toString();

      setFormData({
        ...formData,
        [input]: value,
      });
    } else {
      setFormData({
        ...formData,
        [input]: event.currentTarget.value,
      });
    }
  };

  const handleTextareaData = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    input: string
  ): void => {
    setFormData({
      ...formData,
      [input]: event.target.value,
    });
  };

  const onPreviousStep = (): void => {
    if (step === 1) {
      return;
    }
    setStep((prevState) => prevState - 1);
  };

  const onNextStep = (): void => {
    let counter = 0;
    if (step === stepsInfo.length) {
      return;
    }

    if (step === 1) {
      for (const key in formDataErrorsFirstStep) {
        if (key === Offer.Technologies && formData.technologies.length === 0) {
          counter += 1;
          setFormDataErrorsFirstStep((prevState) => ({
            ...prevState,
            technologies: 'Zaznacz co najmniej jedną technologię',
          }));
        }

        const isEmpty = formData[key] === '';

        if (isEmpty) {
          counter += 1;
          setFormDataErrorsFirstStep((prevState) => ({
            ...prevState,
            [key]: 'To pole jest wymagane',
          }));
        } else {
          setFormDataErrorsFirstStep((prevState) => ({
            ...prevState,
            [key]: '',
          }));
        }
      }

      if (
        formData.exactSalary !== '' &&
        (formData.minSalary !== '' || formData.maxSalary !== '')
      ) {
        counter += 1;
        setFormDataErrorsFirstStep((prevState) => ({
          ...prevState,
          minSalary: 'Wybierz widełki lub dokładną wartość',
        }));
      }

      if (
        formData.exactSalary !== '' &&
        formData.minSalary === '' &&
        formData.maxSalary === ''
      ) {
        counter -= 1;
        setFormDataErrorsFirstStep((prevState) => ({
          ...prevState,
          minSalary: '',
        }));
      }

      if (formData.minSalary !== '' && formData.maxSalary !== '') {
        if (formData.minSalary >= formData.maxSalary) {
          counter += 1;
          setFormDataErrorsFirstStep((prevState) => ({
            ...prevState,
            minSalary: 'Wartość maks. musi być większa od min.',
          }));
        }
      }

      if (
        (formData.minSalary === '' && formData.maxSalary !== '') ||
        (formData.minSalary !== '' && formData.maxSalary === '')
      ) {
        counter += 1;
        setFormDataErrorsFirstStep((prevState) => ({
          ...prevState,
          minSalary: 'Uzupełnij widełki lub wpisz tylko dokładną wartość',
        }));
      }
    } else if (step === 2) {
      for (const key in formDataErrorsSecondStep) {
        const isEmpty = formData[key] === '';

        if (isEmpty) {
          counter += 1;
          setFormDataErrorsSecondStep((prevState) => ({
            ...prevState,
            [key]: 'To pole jest wymagane',
          }));
        } else {
          setFormDataErrorsSecondStep((prevState) => ({
            ...prevState,
            [key]: '',
          }));
        }
      }
    } else if (step === 3) {
      for (const key in formDataErrorsThirdStep) {
        const isEmpty = formData[key] === '';

        if (isEmpty) {
          counter += 1;
          setFormDataErrorsThirdStep((prevState) => ({
            ...prevState,
            [key]: 'To pole jest wymagane',
          }));
        } else {
          setFormDataErrorsThirdStep((prevState) => ({
            ...prevState,
            [key]: '',
          }));
        }
      }
    }

    if (counter === 0) {
      setStep((prevState) => prevState + 1);
    }
  };

  const submitHandler = (event: React.FormEvent): void => {
    event.preventDefault();

    const x = Object.keys(formData).map(
      (key) =>
        (formData[key] =
          typeof formData[key] === 'string'
            ? formData[key].toString().trim()
            : formData[key])
    );
    console.log(x);
  };

  useEffect(() => console.log(formData), [formData]);

  const content = {
    1: (
      <OfferDetails
        handleButtons={handleButtonData}
        handleInputs={handleInputData}
        handleTextarea={handleTextareaData}
        data={formData}
        errorMsgs={formDataErrorsFirstStep}
      />
    ),
    2: (
      <OfferInfo
        handleTextarea={handleTextareaData}
        data={formData}
        errorMsgs={formDataErrorsSecondStep}
      />
    ),
    3: (
      <ComapnyInfo
        handleButtons={handleButtonData}
        handleInputs={handleInputData}
        data={formData}
        errorMsgs={formDataErrorsThirdStep}
      />
    ),
    4: <DisplayOfferDetails offer={formData} review={true} />,
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
      <Head>
        <title>Job for devs</title>
        <meta charSet='UTF-8' />
        <meta
          name='description'
          content='App to help devs find a job or for employers to find a employees'
        />
        <link rel='icon' href='/icons/looking-for-job.svg' />
      </Head>

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
      <main className='w-full max-w-7xl mx-auto px-5 [1300px]:px-0'>
        <form
          onSubmit={submitHandler}
          className='grid grid-cols-1 md:grid-cols-2'
        >
          {content}
          {step !== stepsInfo.length && (
            <div className='col-span-2 flex items-center'>
              *
              <span className='w-[0.35rem] h-[0.05rem] mx-1 bg-black block'></span>
              pole wymagane
            </div>
          )}
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
        </form>
      </main>
    </>
  );
};

export default NewPost;
