import { GetServerSideProps } from 'next';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import OfferDetails from '../../components/new-offer/OfferDetails';
import OfferInfo from '../../components/new-offer/OfferInfo';
import ComapnyInfo from '../../components/new-offer/CompanyInfo';
import {
  FormData,
  ISecondStepData,
  IThirdStepData,
  IFirstStepData,
  INotification,
} from '../../helpers/types';
import DisplayOfferDetails from '../../components/offer-details/DisplayOfferDetails';
import { useMutation } from '@apollo/client';
import { ADD_OFFER } from '../../graphql/queries';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { context as graphContext } from '../api/graphql/context';
import StepsContext, { stepsInfo } from '../../context/steps-context';
import { NextPageWithLayout } from '../_app';
import Layout from '../../components/layouts/layout';
import Notification from '../../components/notification/Notification';

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
      user: JSON.parse(JSON.stringify(user)),
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
  const { step, previousStep, jumpToStep } = useContext(StepsContext);
  const router = useRouter();
  const [addOffer] = useMutation(ADD_OFFER);
  const [notification, setNotification] = useState<INotification>({
    message: '',
    isError: false,
  });
  const [showNotification, setShowNotification] = useState(false);

  const [formData, setFormData] = useState<FormData | {}>({});

  async function showNoti(id: string): Promise<void> {
    await new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });

    const offerId: string = id;
    await router.push(`/offer/${offerId}`);
  }

  const createNewOffer = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      const data: FormData = Object.assign({}, formData as FormData);
      const newOffer = await addOffer({
        variables: {
          category: data.category,
          location: data.location,
          jobTitle: data.jobTitle,
          companyName: data.companyName,
          typeOfDayJob: data.typeOfDayJob,
          seniority: data.seniority,
          street: data.street,
          building: data.building,
          house: data.house,
          city: data.city,
          minSalary: data.minSalary,
          maxSalary: data.maxSalary,
          exactSalary: data.exactSalary,
          technologies: data.technologies,
          description: data.description,
          obligations: data.obligations,
          requirements: data.requirements,
          advantages: data.advantages,
          benefits: data.benefits,
          userId: props.user.id,
        },
      });
      if (newOffer.errors) {
        throw new Error('Something went wrong');
      }
      setShowNotification(true);
      setNotification({
        message:
          'Dodano ofertę pracy. Za chwilę zostaniesz przekierowany do niej',
        isError: false,
      });

      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
      await showNoti(newOffer.data.addOffer.id);
    } catch (error) {
      setNotification({ message: 'Coś poszło nie tak', isError: true });
      setTimeout(() => setShowNotification(false), 4000);
    }
  };

  useEffect(() => jumpToStep(1), []);
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [formData]);

  const firstStepHandler = (firstStepData: IFirstStepData): void => {
    setFormData(Object.assign({}, firstStepData));
  };

  const secondStepHandler = (secondStepData: ISecondStepData): void => {
    setFormData(Object.assign({}, formData, secondStepData));
  };

  const thirdStepHandler = (thirdStepData: IThirdStepData): void => {
    setFormData(Object.assign({}, formData, thirdStepData));
  };

  const content = {
    1: <OfferDetails onFirstStep={firstStepHandler} />,
    2: <OfferInfo onSecondStep={secondStepHandler} />,
    3: <ComapnyInfo onThirdStep={thirdStepHandler} />,
    4: <DisplayOfferDetails offer={formData as FormData} review={true} />,
  }[step];

  return (
    <form
      className='grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto px-5 2xl:px-0'
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={createNewOffer}
    >
      <Notification
        isError={notification.isError}
        message={notification.message}
        show={showNotification}
      />
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

NewOffer.getLayout = function getLayout(page: ReactElement) {
  return <Layout typeHeader='new-offer'>{page}</Layout>;
};

export default NewOffer;
