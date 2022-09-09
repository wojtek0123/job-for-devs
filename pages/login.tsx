/* eslint-disable @typescript-eslint/no-misused-promises */
import { NextPage } from 'next';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Notification from '../components/notification/Notification';
import { INotification } from '../helpers/types';
import ReturnButton from '../components/return-button/ReturnButton';

const Login: NextPage = () => {
  const { data: session } = useSession();
  const [notification, setNotification] = useState<INotification>({
    message: '',
    isError: false,
  });
  const [showPopup, setShowPopup] = useState(false);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const signInWithGoogle = async (): Promise<void> => {
    const data = await signIn('google', {
      redirect: false,
      callbackUrl: '/',
    });
    await router.push(data?.url ?? '');
  };

  const signInWithGithub = async (): Promise<void> => {
    const data = await signIn('github', {
      redirect: false,
      callbackUrl: '/',
    });
    await router.push(data?.url ?? '');
  };

  const signInWithEmail = async (event: React.FormEvent): Promise<any> => {
    event.preventDefault();
    if (!emailInputRef.current?.value) {
      return;
    }
    const enteredEmail = emailInputRef.current.value;
    try {
      const data = await signIn('email', {
        callbackUrl: '/',
        email: enteredEmail,
        redirect: false,
      });
      if (data?.error) {
        setNotification({ message: 'Błąd logowania', isError: true });
        return;
      }
      setNotification({ message: 'Email wysłany', isError: false });
    } catch (error) {
      setNotification({ message: 'Błąd logowania', isError: true });
      console.error(error);
    } finally {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
      emailInputRef.current.value = '';
    }
  };

  useEffect(() => {
    (async function () {
      if (session) {
        await router.push('/');
      }
    })();
  }, [session]);

  return (
    <>
      <div className='flex flex-col bg-gray-200 p-10 text-black border border-gray-200 sm:rounded-lg absolute inset-0 justify-center items-center md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 max-w-md shadow-xl'>
        <div className='absolute top-4 left-4'>
          <ReturnButton isGray={false} />
        </div>
        <h1 className='text-center mb-6 mt-2 text-2xl'>
          Sign in to Job for Devs
        </h1>
        <div className='flex flex-col justify-center w-full items-center'>
          <button
            className='bg-white text-black w-full max-w-[13rem] py-2 my-2 rounded-lg hover:bg-gray-300 transition-colors duration-300'
            type='button'
            onClick={signInWithGithub}
          >
            Sign in with GitHub
          </button>
          <button
            className='bg-white text-black w-full max-w-[13rem] py-2 my-2 rounded-lg hover:bg-gray-300 transition-colors duration-300'
            type='button'
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
          <form
            onSubmit={async (event) => await signInWithEmail(event)}
            className='flex flex-col'
          >
            <label htmlFor='email' className='mt-6 mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              placeholder='email@przyklad.com'
              ref={emailInputRef}
              className='rounded-lg px-3 py-2  w-full max-w-[13rem] text-black'
              autoComplete='off'
            />
            <button
              type='submit'
              className='bg-white text-black rounded-lg mt-7 py-2 cursor-pointer w-full max-w-xs hover:bg-gray-300 transition-colors duration-300'
            >
              Zaloguj się
            </button>
          </form>
        </div>
      </div>
      <Notification
        show={showPopup}
        message={notification.message}
        isError={notification.isError}
      />
    </>
  );
};

export default Login;
