import { useState, useContext } from 'react';
import {
  checkIsLengthIsGreaterThanZero,
  handleInputData,
} from '../../utils/functions';
import StepsContext from '../../context/steps-context';
import { FormData } from '../../helpers/types';
import ErrorMessage from './ErrorMessage';
import Notification from '../notification/Notification';

const OfferInfo: React.FC<{
  onSecondStep: (data: Partial<FormData>) => void;
  formData: FormData;
}> = ({ onSecondStep, formData }) => {
  const { nextStep, previousStep } = useContext(StepsContext);

  const [enteredDescription, setEnteredDescription] = useState(
    formData?.description ?? ''
  );
  const [enteredObligations, setEnteredObligations] = useState(
    formData?.obligations ?? ''
  );
  const [enteredRequirements, setEnteredRequirements] = useState(
    formData?.requirements ?? ''
  );
  const [enteredAdvantages, setEnteredAdvantages] = useState(
    formData?.advantages ?? ''
  );
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

    const secondStepData: Partial<FormData> = {
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
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl flex flex-col lg:flex-row lg:items-center relative'
        >
          <div className='flex items-center'>
            <span>
              Obowiązki <span className='ml-1 text-red-600'>*</span>
            </span>
          </div>

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
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl flex flex-col lg:flex-row lg:items-center relative'
        >
          <div className='flex items-center'>
            <span>
              Wymagania <span className='ml-1 text-red-600'>*</span>
            </span>
          </div>
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
          className='text-lg mb-2 mt-4 col-start-1 col-end-2 lg:text-xl flex flex-col lg:flex-row lg:items-center relative'
          htmlFor='advantage'
        >
          Przewaga
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
