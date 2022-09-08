import { GetServerSideProps } from 'next';
import React, { ReactElement, useContext, useState } from 'react';
import Link from 'next/link';
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
import { useMutation } from '@apollo/client';
import { ADD_OFFER } from '../../graphql/queries';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { context as graphContext } from '../api/graphql/context';
import StepsContext, { stepsInfo } from '../../context/steps-context';
import { NextPageWithLayout } from '../_app';
import NewOfferLayout from '../../components/layouts/new-offer-layout';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      props: {},
    };
  }

  const user = await graphContext.prisma.user.findUnique({
    where: { email: session.user?.email ?? '' },
  });

  return {
    props: {
      user,
    },
  };
};

interface SessionProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const NewOffer: NextPageWithLayout<SessionProps> = (props) => {
  const { step, nextStep, previousStep } = useContext(StepsContext);
  const router = useRouter();
  const [addOffer] = useMutation(ADD_OFFER);
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

  const onNextStep = (): void => {
    let counter = 0;

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
      nextStep();
    }
  };

  const submitHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    // const x = Object.keys(formData).map(
    //   (key) =>
    //     (formData[key] =
    //       typeof formData[key] === 'string'
    //         ? formData[key].toString().trim()
    //         : formData[key])
    // );

    try {
      const newOffer = await addOffer({
        variables: {
          category: formData.category,
          location: formData.location,
          jobTitle: formData.jobTitle,
          companyName: formData.companyName,
          typeOfDayJob: formData.typeOfDayJob,
          seniority: formData.seniority,
          street: formData.street,
          building: formData.building,
          house: formData.house,
          city: formData.city,
          minSalary: formData.minSalary,
          maxSalary: formData.maxSalary,
          exactSalary: formData.exactSalary,
          technologies: formData.technologies,
          description: formData.description,
          obligations: formData.obligations,
          requirements: formData.requirements,
          advantages: formData.advantages,
          benefits: formData.benefits,
          userId: props.user.id,
        },
      });
      if (newOffer.errors) {
        throw new Error('Something went wrong');
      }
      const offerId: string = await newOffer.data.addOffer.id;
      await router.push(`/offer/${offerId}`);
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <form onSubmit={submitHandler} className='grid grid-cols-1 md:grid-cols-2'>
      {content}
      {step !== stepsInfo.length && (
        <div className='col-span-2 flex items-center'>
          *<span className='w-[0.35rem] h-[0.05rem] mx-1 bg-black block'></span>
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
            onClick={previousStep}
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
  );
};

NewOffer.getLayout = function getLayout(page: ReactElement) {
  return <NewOfferLayout>{page}</NewOfferLayout>;
};

export default NewOffer;
