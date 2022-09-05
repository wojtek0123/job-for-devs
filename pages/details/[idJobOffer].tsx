import React, { ReactElement, useRef, useState } from 'react';
import Layout from '../../components/layouts/layout';
import { NextPageWithLayout } from '../_app';
import { DUMMY_DATA } from '../../data/DUMMY_DATA';
import DisplayOfferDetails from '../../components/offer-details/DisplayOfferDetails';

const dataArray = DUMMY_DATA.filter((data) => data.id === '1');
const data = dataArray[0];

const JobOfferDetails: NextPageWithLayout = () => {
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

  const submitHandler = (event: React.FormEvent): void => {
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

    const application = {
      name: enteredName,
      email: enteredEmail,
      message: message.trim(),
    };

    nameRef.current.value = '';
    emailRef.current.value = '';
    setMessage('');

    console.log(application);
  };

  return (
    <div className='max-w-7xl mx-auto w-full mt-5'>
      <DisplayOfferDetails offer={data} review={false} />

      <div className='lg:col-span-2 mt-6 bg-slate-800 px-5 rounded-t-lg pt-3 pb-3'>
        <p className='uppercase text-2xl text-white mb-3 font-bold lg:col-start-1 lg:col-end-2'>
          Aplikuj
        </p>
        <form className='flex flex-col' onSubmit={submitHandler}>
          <div className='flex flex-col md:flex-row md:justify-between mb-4 mt-2'>
            <div className='flex flex-col w-full md:mr-5 mb-4 md:my-0'>
              <input
                type='text'
                title='name'
                placeholder='Imie i nazwisko'
                className='border border-white p-3 rounded-lg outline-green-500 min-w-max'
                ref={nameRef}
                onFocus={() => setNameError('')}
              />
              <small className='text-red-600 h-4'>{nameError}</small>
            </div>
            <div className='flex flex-col w-full md:ml-5'>
              <input
                type='text'
                title='email'
                placeholder='Twój email'
                className='border border-white p-3 rounded-lg outline-green-500 min-w-max'
                ref={emailRef}
                onFocus={() => setEmailError('')}
              />
              <small className='text-red-600 h-4'>{emailError}</small>
            </div>
          </div>
          <textarea
            aria-label='your message to the employer'
            placeholder='Wiadomość dla pracodawcy'
            className='border border-white p-3 rounded-lg my-1 max-h-52 min-h-[13rem] resize-none outline-green-500'
            maxLength={500}
            onChange={changeMessageHandler}
            value={message}
          />
          <small className='flex justify-end my-1 text-white'>
            {message.length}/500
          </small>
          {/* <small>{}</small> */}
          <input
            type='file'
            title='cv'
            className='border border-white my-1 rounded-lg p-3 md:max-w-xs bg-white outline-green-500'
            accept='.pdf, .doc, .docx'
          />
          <button
            type='submit'
            className='bg-white text-slate-800 p-3 rounded-lg mt-4 mb-1 outline-green-500 hover:bg-slate-200 transition-colors duration-200'
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
