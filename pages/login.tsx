/* eslint-disable @typescript-eslint/no-misused-promises */
import { NextPage } from 'next';
import Image from 'next/image';
import arrowIcon from '../public/icons/arrow-left-solid.svg';
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
    <div className='flex flex-col bg-slate-800 p-10 text-white sm:rounded-lg absolute inset-0 justify-center items-center md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 max-w-md'>
      <Link href='/'>
        <a className='bg-gray-200 border absolute top-4 left-4 text-black shadow px-4 py-1 rounded-lg ml-2 xl:ml-0 text-lg hover:bg-gray-300 transition-colors duration-300'>
          <Image src={arrowIcon} alt='back' width={15} height={15} />
          <span className='ml-2'>back</span>
        </a>
      </Link>
      <h1 className='text-center mb-6 mt-2 text-2xl'>
        Sign in to Job for Devs
      </h1>
      <div className='flex flex-col justify-center w-full items-center'>
        <button
          className='bg-white text-slate-800 w-full max-w-[13rem] py-2 my-2 rounded-lg hover:bg-slate-200 transition-colors duration-200'
          type='button'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={signInWithGithub}
        >
          Sign in with GitHub
        </button>
        <button
          className='bg-white text-slate-800 w-full max-w-[13rem] py-2 my-2 rounded-lg hover:bg-slate-200 transition-colors duration-200'
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
            className='rounded-lg px-3 py-1 w-full max-w-xs text-slate-800'
          />
          <button
            type='submit'
            className='bg-white text-slate-800 rounded-lg mt-7 py-1 cursor-pointer mb-4 w-full max-w-xs'
          >
            Send
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default Login;
