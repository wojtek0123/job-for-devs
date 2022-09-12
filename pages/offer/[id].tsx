import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../components/layouts/layout';
import { NextPageWithLayout } from '../_app';
import DisplayOfferDetails from '../../components/offer-details/DisplayOfferDetails';
import { GetStaticPaths, GetStaticProps } from 'next';
import prisma from '../../lib/prisma';
import { OfferDataDetails, INotification } from '../../helpers/types';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_APPLICATION, GET_USER_ID } from '../../graphql/queries';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { context as graphContext } from '../api/graphql/context';
import Notification from '../../components/notification/Notification';

export const getStaticPaths: GetStaticPaths = async () => {
  const offersId = await prisma.offer.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: offersId.map((offerId) => ({
      params: { id: offerId.id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context?.params;
  if (params === undefined) {
    return {
      redirect: '/',
      permanent: false,
      props: {},
    };
  }

  const offer = await graphContext.prisma.offer.findUnique({
    where: { id: params.id?.toString() },
  });

  if (offer) {
    return {
      props: {
        offer: JSON.parse(JSON.stringify(offer)),
      },
    };
  }

  return {
    redirect: '/',
    permanent: false,
    props: {},
  };
};

const JobOfferDetails: NextPageWithLayout<{
  offer: OfferDataDetails;
}> = (props: { offer: OfferDataDetails }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: user } = useQuery(GET_USER_ID, {
    variables: {
      email: session?.user?.email ?? '',
    },
  });
  const [apply] = useMutation(ADD_APPLICATION);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [notification, setNotification] = useState<INotification>({
    message: '',
    isError: false,
  });
  const [showNotification, setShowNotification] = useState(false);

  const changeMessageHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setMessageInput(event.target.value);
  };

  const submitHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const enteredName = nameInput.trim();
    const enteredEmail = emailInput.trim();
    const enteredMessage = messageInput.trim();

    if (enteredName === '') {
      setNameError('Proszę uzupełnić to pole');
    } else {
      setNameError('');
    }

    const emailRegExp = /[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}/g;

    if (enteredEmail === '') {
      setEmailError('Proszę uzupełnić to pole');
      return;
    } else if (!enteredEmail?.match(emailRegExp)) {
      setEmailError('Nie prawidłowy adres email');
      return;
    } else {
      setEmailError('');
    }

    if (emailError.length !== 0 || nameError.length !== 0) {
      return;
    }

    try {
      if (!session) {
        const data = await apply({
          variables: {
            name: enteredName,
            email: enteredEmail,
            message: enteredMessage,
            offerId: router.query.id,
          },
        });
        if (data.errors) {
          setNotification({ message: 'Błąd przy aplikowaniu', isError: true });
          return;
        }
      }
      if (session) {
        const data = await apply({
          variables: {
            name: enteredName,
            email: enteredEmail,
            message: enteredMessage,
            offerId: router.query.id,
            userId: user.userId.id,
          },
        });
        if (data.errors) {
          setNotification({ message: 'Błąd przy aplikowaniu', isError: true });
          return;
        }
      }
      setNotification({ message: 'Wysłano podanie', isError: false });
    } catch (error) {
      setNotification({ message: 'Błąd przy aplikowaniu', isError: true });
    } finally {
      if (status !== 'authenticated') {
        setEmailInput('');
        setNameInput('');
      }
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
      setMessageInput('');
    }
  };

  const changeNameInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    setNameInput(event.target.value);
  };

  const changeEmailInput = (
    event: React.FocusEvent<HTMLInputElement>
  ): void => {
    setEmailInput(event.target.value);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setEmailInput(session.user?.email ?? '');
      setNameInput(session.user?.name ?? '');
    }
  }, [session?.user]);

  return (
    <div className='max-w-7xl mx-auto w-full mt-5'>
      <DisplayOfferDetails offer={props.offer} review={false} />
      <Notification
        message={notification.message}
        isError={notification.isError}
        show={showNotification}
      />
      <div className='lg:col-span-2 mt-6 bg-gray-200 px-5 rounded-lg pt-3 pb-3'>
        <p className='uppercase text-2xl text-black mb-3 font-bold lg:col-start-1 lg:col-end-2'>
          Aplikuj
        </p>
        <form
          className='flex flex-col items-center'
          onSubmit={(event) => {
            void (async () => await submitHandler(event))();
          }}
        >
          <div className='flex flex-col w-full md:flex-row md:justify-between mb-4 mt-2'>
            <div className='flex flex-col w-full md:mr-5 mb-4 md:my-0'>
              <input
                type='text'
                title='name'
                placeholder='Imie i nazwisko'
                className='p-3 rounded-lg outline-green-500 min-w-max'
                maxLength={100}
                value={nameInput}
                onChange={changeNameInput}
              />
              <small className='text-red-600 h-4'>{nameError}</small>
            </div>
            <div className='flex flex-col w-full md:ml-5'>
              <input
                type='text'
                title='email'
                placeholder='Twój email'
                className='p-3 rounded-lg outline-green-500 min-w-max'
                maxLength={100}
                value={emailInput}
                onChange={changeEmailInput}
              />
              <small className='text-red-600 h-4'>{emailError}</small>
            </div>
          </div>
          <textarea
            aria-label='your message to the employer'
            placeholder='Wiadomość dla pracodawcy'
            className='p-3 rounded-lg my-1 max-h-52 min-h-[13rem] resize-none outline-green-500 w-full'
            maxLength={500}
            onChange={changeMessageHandler}
            value={messageInput}
          />
          <small className='flex w-full justify-end my-1 text-black text-left'>
            {messageInput.length}/500
          </small>
          <div className='w-full flex justify-start'>
            <input
              type='file'
              title='cv'
              className='my-1 rounded-lg p-3 md:max-w-xs bg-white outline-green-500 '
              accept='.pdf, .doc, .docx'
            />
          </div>
          <button
            type='submit'
            className='bg-white text-black py-3 px-5 max-w-xs w-full rounded-lg mt-4 mb-1 outline-green-500 hover:bg-gray-300 transition-colors duration-200'
          >
            Aplikuj
          </button>
        </form>
      </div>
    </div>
  );
};

JobOfferDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout typeHeader='main'>{page}</Layout>;
};

export default JobOfferDetails;
