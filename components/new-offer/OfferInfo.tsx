import { useState, useContext } from 'react';
import {
  checkIsLengthIsGreaterThanZero,
  handleInputData,
} from '../../helpers/functions';
import StepsContext from '../../context/steps-context';
import { ISecondStepData } from '../../helpers/types';
import ErrorMessage from './ErrorMessage';
import Notification from '../notification/Notification';

const OfferInfo: React.FC<{
  onSecondStep: (data: ISecondStepData) => void;
}> = ({ onSecondStep }) => {
  const { nextStep, previousStep } = useContext(StepsContext);

  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredObligations, setEnteredObligations] = useState('');
  const [enteredRequirements, setEnteredRequirements] = useState('');
  const [enteredAdvantages, setEnteredAdvantages] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const onNextStep = (): void => {
    const requiredFields = [enteredObligations, enteredRequirements];
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

    const secondStepData: ISecondStepData = {
      description: enteredDescription.trim(),
      requirements: enteredRequirements.trim(),
      obligations: enteredObligations.trim(),
      advantages: enteredAdvantages.trim(),
    };

    onSecondStep(secondStepData);
    setShowErrors(false);
    nextStep();
  };

  return (
    <>
      <h2 className='text-3xl mt-3 mb-5 col-span-2 lg:mb-10 lg:mt-5'>
        Opis oferty
      </h2>
      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <label
          htmlFor='description'
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
        >
          Opis
        </label>
        <textarea
          name='description'
          id='description'
          maxLength={2000}
          className='p-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
          onChange={(event) => handleInputData(event, setEnteredDescription)}
          value={enteredDescription}
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1'>
          {enteredDescription.length}/2000
        </small>
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <label
          htmlFor='obligation'
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
        >
          Obowiązki <span className='ml-1 text-red-600'>*</span>
        </label>
        <textarea
          name='obligation'
          id='obligation'
          maxLength={500}
          className='p-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
          value={enteredObligations}
          onChange={(event) => handleInputData(event, setEnteredObligations)}
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1'>
          {enteredObligations.length}/500
        </small>
        <ErrorMessage expression={enteredObligations} isVisible={showErrors} />
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 md:mb-6'>
        <label
          htmlFor='requirements'
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
        >
          Wymagania <span className='ml-1 text-red-600'>*</span>
        </label>
        <textarea
          name='requirements'
          id='requirements'
          maxLength={500}
          className='p-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
          value={enteredRequirements}
          onChange={(event) => handleInputData(event, setEnteredRequirements)}
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1'>
          {enteredRequirements.length}/500
        </small>
        <ErrorMessage expression={enteredRequirements} isVisible={showErrors} />
      </div>
      <hr className='hidden md:block mb-3 col-span-2' />

      <div className='flex flex-col mt-3 col-span-2 md:grid md:grid-cols-2 mb-6 md:mb-6'>
        <label
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl'
          htmlFor='advantage'
        >
          Przewaga
        </label>
        <textarea
          name='advantage'
          id='advantage'
          maxLength={500}
          className='p-3 rounded-lg text-black text-base h-28 resize-none outline-green-500 bg-gray-100 col-start-2 col-end-3 w-full'
          onChange={(event) => handleInputData(event, setEnteredAdvantages)}
          value={enteredAdvantages}
        ></textarea>
        <small className='col-span-2 flex justify-end mt-1 h-4'>
          {enteredAdvantages.length}/500
        </small>
      </div>
      <div className='block lg:hidden col-span-2 w-full'>
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
          className='bg-white text-black px-8 py-1 rounded-lg text-lg mx-3 hover:bg-slate-200 transition-colors duration-300 border border-gray-200 capitalize'
        >
          wstecz
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

export default OfferInfo;
