import React, { ReactElement, useRef, useState } from 'react';
import Layout from '../../components/layouts/layout';
import { NextPageWithLayout } from '../_app';
import DisplayOfferDetails from '../../components/offer-details/DisplayOfferDetails';
import { GetStaticPaths, GetStaticProps } from 'next';
import prisma from '../../lib/prisma';
import { OfferData } from '../../helpers/types';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_APPLICATION, GET_USER_ID } from '../../graphql/queries';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { context as graphContext } from '../api/graphql/context';

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

  const offer: OfferData | null = await graphContext.prisma.offer.findUnique({
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

interface User {
  id: string;
  name: string;
  email: string;
}

const JobOfferDetails: NextPageWithLayout<{
  offer: OfferData;
  user: User;
}> = (props: { offer: OfferData; user: User }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data } = useQuery(GET_USER_ID, {
    variables: {
      email: session?.user?.email ?? '',
    },
  });
  const [apply] = useMutation(ADD_APPLICATION);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const changeMessageHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setMessage(event.target.value);
  };

  const submitHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (nameRef.current === null || emailRef.current === null) return;

    const enteredName = nameRef.current.value.trim();
    const enteredEmail = emailRef.current.value.trim();

    if (enteredName === '') {
      setNameError('Proszę uzupełnić to pole');
    } else {
      setNameError('');
    }

    const emailRegExp = /[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}/g;

    if (enteredEmail === '') {
      setEmailError('Proszę uzupełnić to pole');
    } else if (!enteredEmail?.match(emailRegExp)) {
      setEmailError('Nie prawidłowy adres email');
    } else {
      setEmailError('');
    }

    console.log(emailError);
    console.log(nameError);

    if (emailError.length !== 0 || nameError.length !== 0) {
      return;
    }

    try {
      if (!session) {
        console.log('Nie zalogowany');
        await apply({
          variables: {
            name: enteredName,
            email: enteredEmail,
            message: message.trim(),
            offerId: router.query.id,
          },
        });
      }
      if (session) {
        console.log('Zalogowany');
        await apply({
          variables: {
            name: enteredName,
            email: enteredEmail,
            message: message.trim(),
            offerId: router.query.id,
            userId: data.userId.id,
          },
        });
      }

      console.log('You applied');
    } catch (error) {
      console.error(error);
    } finally {
      nameRef.current.value = '';
      emailRef.current.value = '';
      setMessage('');
    }
  };

  return (
    <div className='max-w-7xl mx-auto w-full mt-5'>
      <DisplayOfferDetails offer={props.offer} review={false} />

      <div className='lg:col-span-2 mt-6 bg-gray-200 px-5 rounded-lg pt-3 pb-3'>
        <p className='uppercase text-2xl text-black mb-3 font-bold lg:col-start-1 lg:col-end-2'>
          Aplikuj
        </p>
        <form className='flex flex-col items-center' onSubmit={submitHandler}>
          <div className='flex flex-col w-full md:flex-row md:justify-between mb-4 mt-2'>
            <div className='flex flex-col w-full md:mr-5 mb-4 md:my-0'>
              <input
                type='text'
                title='name'
                placeholder='Imie i nazwisko'
                className='p-3 rounded-lg outline-green-500 min-w-max'
                ref={nameRef}
                maxLength={100}
                onFocus={() => setNameError('')}
              />
              <small className='text-red-600 h-4'>{nameError}</small>
            </div>
            <div className='flex flex-col w-full md:ml-5'>
              <input
                type='text'
                title='email'
                placeholder='Twój email'
                className='p-3 rounded-lg outline-green-500 min-w-max'
                ref={emailRef}
                maxLength={100}
                onFocus={() => setEmailError('')}
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
            value={message}
          />
          <small className='flex w-full justify-end my-1 text-black text-left'>
            {message.length}/500
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
  return <Layout>{page}</Layout>;
};

export default JobOfferDetails;
