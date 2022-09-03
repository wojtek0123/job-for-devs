/* eslint-disable @typescript-eslint/no-misused-promises */
import { NextPage } from 'next';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import React from 'react';

const Login: NextPage = () => {
  // const emailInputRef = useRef<HTMLInputElement | null>(null);

  const signInWithGoogle = async (): Promise<any> => {
    await signIn('google', {
      callbackUrl: window.location.href,
      redirect: false,
    });
  };

  const signInWithGithub = async (): Promise<any> => {
    await signIn('github', {
      callbackUrl: window.location.href,
      redirect: false,
    });
  };

  // const signInWithEmail = async (event: React.FormEvent): Promise<any> => {
  //   event.preventDefault();
  //   const enteredEmail = emailInputRef.current?.value;
  //   await signIn('email', {
  //     callbackUrl: window.location.href,
  //     email: enteredEmail,
  //     redirect: false,
  //   });
  // };

  return (
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
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={signInWithGithub}
        >
          Sign in with GitHub
        </button>
        <button
          className='bg-white text-black w-full max-w-[13rem] py-2 my-2 rounded-lg hover:bg-gray-300 transition-colors duration-300'
          type='button'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>
        {/* <form onSubmit={async (event) => await signInWithEmail(event)}>
          <label htmlFor='email' className='mt-6 '>
            Email
          </label>
          <input
            type='email'
            id='email'
            placeholder='email@example.com'
            ref={emailInputRef}
            className='rounded-lg px-3 py-1 w-full max-w-xs text-black'
          />
          <button
            type='submit'
            className='bg-gray-200 text-black rounded-lg mt-7 py-1 cursor-pointer mb-4 w-full max-w-xs'
          >
            Send
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default Login;
