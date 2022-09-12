import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '../_app';
import { context as graphContext } from '../api/graphql/context';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import React, { ReactElement, useState } from 'react';
import Layout from '../../components/layouts/layout';
import DisplayOffers from '../../components/display-offers/DisplayOffers';
import { OfferData } from '../../helpers/types';
import userIcon from '../../public/user.svg';
import { useMutation } from '@apollo/client';
import { EDIT_NAME } from '../../graphql/queries';
import Notification from '../../components/notification/Notification';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params?.id ?? '';
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

  if (!userId) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      props: {},
    };
  }

  const user = await graphContext.prisma.user.findUnique({
    where: { id: userId.toString() },
  });

  if (user?.email !== session.user?.email) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {},
    };
  }

  const applications = await graphContext.prisma.application.findMany({
    where: { userId: userId.toString() },
    select: {
      id: true,
      offer: {
        select: {
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
        },
      },
    },
  });

  const postedOffers = await graphContext.prisma.offer.findMany({
    where: { userId: userId.toString() },
    select: {
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
    },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      applications: JSON.parse(JSON.stringify(applications)),
      postedOffers: JSON.parse(JSON.stringify(postedOffers)),
    },
  };
};

interface UserProps {
  user: { id: string; name: string; email: string; image: string };
  applications: [
    {
      id: string;
      offer: {
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
  ];
  postedOffers: OfferData[];
}

const Profile: NextPageWithLayout<UserProps> = (props) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [name, setName] = useState(props.user.name ?? 'Brak danych');
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    isError: boolean;
  }>({ message: '', isError: false });

  const [editName] = useMutation(EDIT_NAME);

  const offers: OfferData[] = props.applications.map(
    (application) => application.offer
  );
  const uniqueOffers = Array.from(
    new Set(offers.map((offer) => JSON.stringify(offer)))
  ).map((offer) => JSON.parse(offer));

  const showPopup = (): void => {
    setShowEditPopup(true);
  };

  const hidePopup = (): void => {
    setShowEditPopup(false);
  };

  const submitChangeNameHandler = async (
    event: React.FormEvent
  ): Promise<void> => {
    event.preventDefault();

    const enteredName = nameInput.trim();

    if (enteredName.length === 0) {
      return;
    }

    try {
      const data = await editName({
        variables: {
          userId: props.user.id,
          name: enteredName,
        },
      });
      if (data.errors) {
        throw new Error('Coś poszło nie tak');
      }
      setName(data.data.changeName.name);
      setShowNotification(true);
      setNotification({
        message: 'Udało się zmienić imię i nazwisko',
        isError: false,
      });
    } catch (error) {
      setShowNotification(true);
      setNotification({
        message: 'Błąd podczas zmiany imię i nazwisko',
        isError: true,
      });
      console.error(error);
    } finally {
      hidePopup();
      setTimeout(() => {
        setShowNotification(false);
        setNotification({ message: '', isError: false });
      }, 4000);
    }
  };

  const changeNameHandler = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    setNameInput(event.currentTarget.value);
  };

  return (
    <div className='px-5 mt-5 max-w-7xl mx-auto w-full 2xl:px-0'>
      <Notification
        isError={notification.isError}
        message={notification.message}
        show={showNotification}
      />
      {showEditPopup && (
        <div className='fixed bottom-0 left-1/2 -translate-x-1/2 bg-green-500 shadow text-white w-full max-w-xl rounded-t-lg py-10 lg:bottom-5 lg:rounded-lg z-10'>
          <button
            type='button'
            className='absolute top-2 right-2 p-2 flex items-center justify-center bg-white rounded-lg'
            onClick={hidePopup}
            title='close'
          >
            <svg
              className='fill-green-500 w-5 h-5 hover:fill-green-600 transition-colors duration-300'
              viewBox='0 0 384 512'
            >
              <path d='M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z' />
            </svg>
          </button>
          <form
            onSubmit={(event) => {
              void (async () => await submitChangeNameHandler(event))();
            }}
            className='flex flex-col items-center px-5 lg:px-10'
          >
            <label htmlFor='change-name' className='text-lg mb-2'>
              Imię i nazwisko
            </label>
            <input
              type='text'
              id='change-name'
              className='max-w-sm w-full rounded-lg p-3 text-black'
              maxLength={100}
              onChange={changeNameHandler}
            />
            <button
              type='submit'
              className='bg-white rounded-lg hover:bg-gray-300 transition-colors duration-300 text-black px-6 py-3 mt-5'
            >
              Zmień
            </button>
          </form>
        </div>
      )}

      <div className='flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center sm:mb-5'>
        {props.user.image !== null && (
          <Image
            src={props.user.image}
            alt='avatar'
            width={150}
            height={150}
            className='rounded-lg'
          />
        )}
        {props.user.image === null && (
          <Image
            src={userIcon}
            alt='avatar'
            width={150}
            height={150}
            className='rounded-lg'
          />
        )}
        <div className='flex flex-col mt-2 md:text-xl sm:ml-10'>
          <div className='flex flex-col xs:flex-row sm:text-lg md:grid md:grid-cols-2 my-2'>
            <p className='md:text-right pr-3'>Imię i nazwisko:</p>
            <div className='truncate flex'>
              <p>{name}</p>
              <button
                type='button'
                title='edit name'
                className='cursor-default ml-4'
                onClick={showPopup}
              >
                <svg
                  className='h-4 w-4 fill-black hover:fill-green-500 transition-colors duration-300 cursor-pointer'
                  viewBox='0 0 512 512'
                >
                  <path d='M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z' />
                </svg>
              </button>
            </div>
          </div>
          <div className='flex flex-col xs:flex-row sm:text-lg md:grid md:grid-cols-2 my-2'>
            <p className='md:text-right pr-3 min-w-max'>Adres email:</p>
            <p className='truncate'>{props.user.email}</p>
          </div>
        </div>
      </div>
      <hr className='my-3 bg-gray-200' />
      <div className='lg:grid lg:grid-cols-[400px_1fr]'>
        <p className='text-xl lg:text-2xl col-start-1 col-end-2'>
          Oferty pracy, na które wysłano podanie
        </p>
        <div className='lg:col-start-2 lg:col-end-3'>
          <DisplayOffers
            loading={false}
            error={undefined}
            offers={uniqueOffers}
            showUtilities={false}
          />
        </div>

        {uniqueOffers.length === 0 && (
          <p className='mt-4'>Brak wysłanych podań</p>
        )}
      </div>
      <hr className='mb-3 mt-6 bg-gray-200' />
      <div className='lg:grid lg:grid-cols-[400px_1fr]'>
        <p className='text-xl lg:text-2xl col-start-1 col-end-2'>
          Opublikowane oferty pracy
        </p>
        <div className='lg:col-start-2 lg:col-end-3'>
          <DisplayOffers
            loading={false}
            error={undefined}
            offers={props.postedOffers}
            showUtilities={true}
          />
        </div>
        {props.postedOffers.length === 0 && (
          <p className='mt-4'>Brak opublikowanych ofert</p>
        )}
      </div>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout typeHeader='main'>{page}</Layout>;
};

export default Profile;
