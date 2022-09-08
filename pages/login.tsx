/* eslint-disable @typescript-eslint/no-misused-promises */
import { NextPage } from 'next';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Login: NextPage = () => {
  const { data: session } = useSession();
  const [message, setMessage] = useState('');
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
        setMessage('Błąd logowania');
        return;
      }
      setMessage('Email wysłany');
    } catch (error) {
      setMessage('Błąd logowania');
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
      <Head>
        <title>Job for devs</title>
        <meta charSet='UTF-8' />
        <meta
          name='description'
          content='App to help devs find a job or for employers to find a employees'
        />
        <link rel='icon' href='/code.svg' />
      </Head>
      <div className='flex flex-col bg-gray-200 p-10 text-black border border-gray-200 sm:rounded-lg absolute inset-0 justify-center items-center md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 max-w-md shadow-xl'>
        <Link href='/'>
          <a className='absolute top-4 left-4 inline-flex items-center bg-white border text-black shadow px-4 py-1 rounded-lg ml-2 xl:ml-0 text-lg hover:bg-gray-300 transition-colors duration-300'>
            <svg className='w-4 h-4 fill-black' viewBox='0 0 448 512'>
              <path d='M447.1 256c0 17.7-13.4 32-31.1 32H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25-6.3 6.25-14.5 9.35-22.7 9.35s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416c17.7 0 31.1 14.3 31.1 32z' />
            </svg>
            <span className='ml-2'>back</span>
          </a>
        </Link>
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
              // autoComplete='off'
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
      {showPopup && (
        <div className='absolute bottom-[1rem] left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-lg px-10 py-3 flex items-center max-w-xs w-full justify-between'>
          <p className='text-xl'>{message}</p>
          <button
            type='button'
            className='p-3 flex items-center justify-center'
            onClick={() => setShowPopup(false)}
            title='close'
          >
            <svg
              className='fill-black w-5 h-5 hover:fill-white transition-colors duration-300'
              viewBox='0 0 384 512'
            >
              <path d='M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z' />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
