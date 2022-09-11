import { useState, useContext } from 'react';
import { cities } from '../../helpers/constants';
import {
  handleButtonData,
  handleInputData,
  checkIsLengthIsGreaterThanZero,
} from '../../helpers/functions';
import ErrorMessage from './ErrorMessage';
import StepsContext from '../../context/steps-context';
import { IThirdStepData } from '../../helpers/types';
import Notification from '../notification/Notification';

const citiesLowerCase = cities.map((city) => city.toLowerCase());

const ComapnyInfo: React.FC<{
  onThirdStep: (data: IThirdStepData) => void;
}> = ({ onThirdStep }) => {
  const { nextStep, previousStep } = useContext(StepsContext);

  const [enteredCompanyName, setEnteredCompanyName] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [enteredStreet, setEnteredStreet] = useState('');
  const [enteredBuildingNumber, setEnteredBuildingNumber] = useState('');
  const [enteredHouseNumber, setEnteredHouseNumber] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const onNextStep = (): void => {
    const requiredFields = [
      enteredCompanyName,
      selectedCity,
      enteredBuildingNumber,
      enteredStreet,
    ];
    let counter = 0;

    requiredFields.forEach(
      (requiredField) =>
        (counter = checkIsLengthIsGreaterThanZero(requiredField, counter))
    );

    if (counter !== 0) {
      setShowErrors(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      return;
    }

    const thirdStepData: IThirdStepData = {
      companyName: enteredCompanyName.trim(),
      city: selectedCity.trim(),
      street: enteredStreet.trim(),
      building: enteredBuildingNumber.trim(),
      house: enteredHouseNumber.trim(),
    };

    onThirdStep(thirdStepData);
    setShowErrors(false);
    nextStep();
  };

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
          onChange={(event) => handleInputData(event, setEnteredCompanyName)}
          value={enteredCompanyName}
        />
        <ErrorMessage expression={enteredCompanyName} isVisible={showErrors} />
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
                selectedCity.includes(city.toLowerCase())
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={(event) => handleButtonData(event, setSelectedCity)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className='col-span-2 md:col-start-2 md:col-end-3 mb-4'>
        <span className='w-full flex items-center justify-start mb-3'>lub</span>
        <input
          type='text'
          id='input-location'
          placeholder='Inne miasto'
          className='py-3 px-3 rounded-lg text-black text-base outline-green-500 w-full bg-gray-100 col-start-2 col-end-3'
          autoComplete='off'
          value={
            citiesLowerCase.includes(selectedCity.toLowerCase())
              ? ''
              : selectedCity
          }
          onChange={(event) => handleInputData(event, setSelectedCity)}
        />
        <div className='flex md:justify-end'>
          <ErrorMessage expression={selectedCity} isVisible={showErrors} />
        </div>
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
          value={enteredStreet}
          onChange={(event) => handleInputData(event, setEnteredStreet)}
        />
        <div className='flex flex-col border border-white rounded-lg mt-4 w-full col-span-2 md:grid md:grid-cols-2'>
          <div className='flex justify-between col-start-2 col-end-3 text-lg lg:text-xl'>
            <input
              type='text'
              id='building-number'
              title='building number'
              placeholder='Nr budynku'
              maxLength={7}
              className='py-3 px-3 rounded-lg text-black text-base border border-gray-200 outline-green-500 w-full bg-gray-100 col-start-2 col-end-3 max-w-[10rem] mr-1 sm:mr-0'
              autoComplete='off'
              value={enteredBuildingNumber}
              onChange={(event) =>
                handleInputData(event, setEnteredBuildingNumber)
              }
            />
            <input
              type='text'
              id='house-number'
              title='house number'
              placeholder='Nr mieszkania'
              maxLength={7}
              className='py-3 px-3 rounded-lg text-black text-base border border-gray-200 outline-green-500 w-full bg-gray-100 col-start-2 col-end-3 max-w-[10rem] ml-1 sm:ml-0'
              autoComplete='off'
              value={enteredHouseNumber}
              onChange={(event) =>
                handleInputData(event, setEnteredHouseNumber)
              }
            />
          </div>
        </div>

        <ErrorMessage
          expression={enteredStreet}
          isVisible={showErrors}
          message='Uzupełnij nazwę ulicy'
        />

        <ErrorMessage
          expression={enteredBuildingNumber}
          isVisible={showErrors}
          message='Uzupełnij number budynku'
        />
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
        <button
          type='button'
          onClick={previousStep}
          className='bg-white text-black px-8 py-1 rounded-lg text-lg mx-3 hover:bg-slate-200 transition-colors duration-300 border border-gray-200'
        >
          wstecz
        </button>
        <button
          type='button'
          onClick={onNextStep}
          className='bg-green-500 text-white px-8 py-1 rounded-lg text-lg mx-3 hover:bg-green-600 transition-colors duration-300'
        >
          dalej
        </button>
      </div>
    </>
  );
};

export default ComapnyInfo;
