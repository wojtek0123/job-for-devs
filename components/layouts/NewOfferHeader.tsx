import Link from 'next/link';
import { useContext } from 'react';
import StepsContext, { stepsInfo } from '../../context/steps-context';
import { v4 as uuid } from 'uuid';

const NewOfferHeader: React.FC = () => {
  const { step } = useContext(StepsContext);

  const renderStepsDetails = stepsInfo.map((stepInfo, index) => (
    <button
      type='button'
      className='flex items-center cursor-default'
      key={uuid()}
    >
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
    </button>
  ));

  return (
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
  );
};

export default NewOfferHeader;
