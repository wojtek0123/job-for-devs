import React, { useContext, useEffect, useState } from 'react';
import OfferDetails from './OfferDetails';
import OfferInfo from './OfferInfo';
import CompanyInfo from './CompanyInfo';
import DisplayOfferDetails from '../offer-details/DisplayOfferDetails';
import {
  FormData,
  OfferDataDetails,
} from '../../helpers/types';
import StepsContext, { stepsInfo } from '../../context/steps-context';

const OfferForm: React.FC<{
  offer?: OfferDataDetails;
  onOffer: (offer: OfferDataDetails | FormData) => Promise<void>;
}> = ({ offer, onOffer }) => {
  const { step, previousStep, jumpToStep } = useContext(StepsContext);
  const [formData, setFormData] = useState<FormData | {}>(offer ?? {});

  const stepHandler = (stepData: Partial<FormData>): void => {
    setFormData(Object.assign({}, formData, stepData))
  }

  const createNewOffer = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const offerData: FormData = Object.assign({}, formData as FormData);
    await onOffer(offerData);
  };

  const content = {
    1: (
      <OfferDetails
        onFirstStep={stepHandler}
        formData={formData as FormData}
      />
    ),
    2: (
      <OfferInfo
        onSecondStep={stepHandler}
        formData={formData as FormData}
      />
    ),
    3: (
      <CompanyInfo
        onThirdStep={stepHandler}
        formData={formData as FormData}
      />
    ),
    4: <DisplayOfferDetails offer={formData as FormData} review={true} />,
  }[step];

  useEffect(() => jumpToStep(1), []);
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [formData]);

  return (
    <form
      className='grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto px-5 2xl:px-0'
      onSubmit={(event) => {
        void (async () => await createNewOffer(event))();
      }}
    >
      {content}
      {step !== stepsInfo.length && (
        <div className='col-span-2 flex items-center'>
          *<span className='w-[0.35rem] h-[0.05rem] mx-1 bg-black block'></span>
          pole wymagane
        </div>
      )}
      {step === stepsInfo.length && (
        <div
          className={`flex w-full justify-center items-center bg-white py-4 md:col-span-2`}
        >
          <button
            type='button'
            onClick={previousStep}
            className='bg-white text-black px-8 py-1 rounded-lg text-lg mx-3 hover:bg-slate-200 transition-colors duration-300 border border-gray-200 capitalize'
          >
            Wstecz
          </button>

          <button
            type='submit'
            className='bg-green-500 text-white px-8 py-1 rounded-lg text-lg mx-3 hover:bg-green-600 transition-colors duration-300 capitalize'
          >
            Opublikuj
          </button>
        </div>
      )}
    </form>
  );
};

export default OfferForm;
