import { NextPageWithLayout } from '../_app';
import { ReactElement, useState } from 'react';
import Layout from '../../components/layouts/layout';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { context as graphContext } from '../api/graphql/context';
import DisplayOffers from '../../components/display-offers/DisplayOffers';
import { OfferData } from '../../helpers/types';
import ReturnButton from '../../components/return-button/ReturnButton';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {},
    };
  }

  const userOffer = await graphContext.prisma.offer.findUnique({
    where: { id: context.params?.id?.toString() ?? '' },
    select: {
      userId: true,
      id: true,
      city: true,
      companyName: true,
      exactSalary: true,
      jobTitle: true,
      createdAt: true,
      location: true,
      maxSalary: true,
      minSalary: true,
      technologies: true,
      typeOfDayJob: true,
      seniority: true,
      application: {
        select: {
          email: true,
          message: true,
          id: true,
          name: true,
        },
      },
    },
  });

  const user = await graphContext.prisma.user.findUnique({
    where: { email: session.user?.email ?? '' },
  });

  if (userOffer?.userId !== user?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {
      offer: JSON.parse(JSON.stringify(userOffer)),
    },
  };
};

interface ApplicationsProps {
  offer: {
    application: {
      email: string;
      message: string;
      id: string;
      name: string;
    }[];
    userId: string;
    id: string;
    city: string;
    companyName: string;
    exactSalary: string;
    jobTitle: string;
    createdAt: string;
    location: string;
    maxSalary: string;
    minSalary: string;
    technologies: string[];
    typeOfDayJob: string;
    seniority: string;
  };
}

const take = 5;

const Applications: NextPageWithLayout<ApplicationsProps> = (props) => {
  const [step, setStep] = useState(take);

  const offerData: OfferData[] = [
    {
      id: props.offer.id,
      city: props.offer.city,
      companyName: props.offer.companyName,
      exactSalary: props.offer.exactSalary,
      jobTitle: props.offer.jobTitle,
      createdAt: props.offer.createdAt,
      location: props.offer.location,
      maxSalary: props.offer.maxSalary,
      minSalary: props.offer.minSalary,
      technologies: props.offer.technologies,
      typeOfDayJob: props.offer.typeOfDayJob,
      seniority: props.offer.seniority,
    },
  ];

  const showMore = () => {
    if (step > props.offer.application.length) {
      return;
    }
    setStep((prevState) => prevState + take);
  };

  const showLess = () => {
    if (step <= take) {
      return;
    }
    setStep((prevState) => prevState - take);
  };

  return (
    <div className='px-5 mt-5 max-w-7xl mx-auto w-full 2xl:px-0'>
      <ReturnButton isGray={true} />
      <div className='lg:grid lg:grid-cols-[400px_1fr] mt-7'>
        <p className='text-xl lg:text-2xl col-start-1 col-end-2'>
          Podania do oferty
        </p>
        <div className='lg:col-start-2 lg:col-end-3'>
          <DisplayOffers
            offers={offerData}
            error={undefined}
            loading={false}
            showUtilities={true}
          />
        </div>
      </div>
      <hr className='mb-3 mt-6 bg-gray-200' />
      <div className='lg:grid lg:grid-cols-[400px_1fr]'>
        <p className='text-xl lg:text-2xl col-start-1 col-end-2'>
          Lista podań o pracę
        </p>
        <div className='lg:col-start-2 lg:col-end-3'>
          {props.offer.application.length === 0 && (
            <p className='text-xl text-center my-3'>
              Jeszcze nikt nie wysłał podania
            </p>
          )}
          {props.offer.application.map((application, index) =>
            index < step ? (
              <div
                key={application.id}
                className='bg-gray-200 p-5 rounded-lg my-5 flex flex-col items-start'
              >
                <div className='flex flex-col lg:flex-row mb-3 bg-white px-3 py-2 rounded-lg w-full lg:max-w-max'>
                  <span>Adres email:</span>
                  <span className='lg:font-bold truncate lg:ml-2'>
                    {application.email}
                  </span>
                </div>
                <div className='flex flex-col lg:flex-row mb-3 bg-white px-3 py-2 rounded-lg w-full lg:max-w-max'>
                  <span>Imię i nazwisko:</span>
                  <span className='lg:font-bold lg:ml-2'>
                    {application.name}
                  </span>
                </div>
                <p className='bg-white px-3 py-2 rounded-lg w-full lg:max-w-max'>
                  {application.message}
                </p>
              </div>
            ) : (
              <div key={index} className='hidden'></div>
            )
          )}
          {props.offer.application.length !== 0 && (
            <div className='w-full flex items-center justify-around'>
              {step > take && (
                <button
                  type='button'
                  onClick={showLess}
                  className='p-3 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition-colors duration-300 mr-2'
                >
                  Mniej
                </button>
              )}
              {step < props.offer.application.length && (
                <button
                  type='button'
                  onClick={showMore}
                  className='p-3 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition-colors duration-300 ml-2'
                >
                  Więcej
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Applications.getLayout = function getLayout(page: ReactElement) {
  return <Layout typeHeader='main'>{page}</Layout>;
};

export default Applications;
