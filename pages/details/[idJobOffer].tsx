// import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import detailsBg from '../../public/images/details-bg.jpg';
import backArrowIcon from '../../public/icons/arrow-left-solid.svg';
import sackIcon from '../../public/icons/sack-dollar-solid.svg';
import locationIcon from '../../public/icons/location-dot-solid.svg';
import buildingIcon from '../../public/icons/building-solid.svg';
import { ReactElement } from 'react';
import Layout from '../../components/layouts/Layout';
import { NextPageWithLayout } from '../_app';

const JobOfferDetails: NextPageWithLayout = () => {
  return (
    <div className='max-w-7xl mx-auto w-full mt-5'>
      <Link href='/'>
        <a className='bg-gray-200 border text-black shadow px-4 py-1 rounded-lg ml-2 xl:ml-0 text-lg hover:bg-gray-300 transition-colors duration-300'>
          <Image src={backArrowIcon} alt='back' width={15} height={15} />
          <span className='ml-2'>back</span>
        </a>
      </Link>
      <div className='rounded-b-lg relative mt-5'>
        <Image
          src={detailsBg}
          alt='Group of workers think together how to solve a problem in code'
          layout='responsive'
          objectFit='cover'
          height={800}
          className='rounded-lg'
        />
        <div className='absolute inset-0 bg-black/70 rounded-bl-lg rounded-lg flex flex-col justify-center pl-5 md:pl-10 md:pt-20 lg:pl-20 lg:pt-28'>
          <h2 className='text-white text-2xl mb-2 sm:text-3xl lg:text-4xl xl:text-5xl xl:mb-8'>
            Junior Front End Developer
          </h2>
          <p className='text-white text-base lg:text-lg xl:text-2xl xl:my-1'>
            <Image src={buildingIcon} width={15} height={15} />
            <span className='ml-2'>Front End Base</span>
          </p>
          <p className='text-white text-base lg:text-lg xl:text-2xl xl:my-1'>
            <Image src={locationIcon} width={15} height={15} />
            <span className='ml-2'>Mickiewicza 30/10, Warszawa</span>
          </p>
          <p className='text-white text-base lg:text-lg xl:text-2xl xl:my-1'>
            <Image src={sackIcon} width={15} height={15} />
            <span className='ml-2'>4000-8000 PLN</span>
          </p>
        </div>
      </div>
      <div className='px-5 xl:px-0 w-full grid grid-cols-1 mt-5'>
        <div className='flex flex-col lg:flex-row col-span-2 md:grid md:grid-cols-2 md:mb-6'>
          <p className='text-2xl mb-2 mt-4 col-start-1 col-end-2'>
            Technologie
          </p>
          <div className='flex flex-wrap items-center text-black col-start-2 col-end-3 text-base'>
            <span className='bg-gray-200 rounded-lg py-1 px-2 mr-2 my-1'>
              React
            </span>
            <span className='bg-gray-200 rounded-lg py-1 px-2 mr-2 my-1'>
              GraphQL
            </span>
            <span className='bg-gray-200 rounded-lg py-1 px-2 mr-2 my-1'>
              Tailwindcss
            </span>
            <span className='bg-gray-200 rounded-lg py-1 px-2 mr-2 my-1'>
              TypeScript
            </span>
            <span className='bg-gray-200 rounded-lg py-1 px-2 mr-2 my-1'>
              TypeScript
            </span>
            <span className='bg-gray-200 rounded-lg py-1 px-2 mr-2 my-1'>
              TypeScript
            </span>
            <span className='bg-gray-200 rounded-lg py-1 px-2 mr-2 my-1'>
              TypeScript
            </span>
          </div>
        </div>
        <hr className='hidden md:block mb-3 col-span-2' />

        <div className='mt-3 flex flex-col col-span-2 md:grid md:grid-cols-2 md:mb-6'>
          <p className='text-2xl mb-2 mt-4 col-start-1 col-end-2'>Opis</p>
          <div className='lg:col-start-2 lg:col-end-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            eveniet vel iure minus ab laudantium iusto veniam incidunt omnis
            aperiam cum ipsa commodi nemo, magni repellat consequuntur, nostrum
            sint soluta nihil, porro illum vitae recusandae? Obcaecati
          </div>
        </div>
        <hr className='hidden md:block mb-3 col-span-2' />

        <div className='mt-3 flex flex-col col-span-2 md:grid md:grid-cols-2 md:mb-6'>
          <p className='text-2xl mb-2 mt-4 col-start-1 col-end-2'>
            Twoje podstawowe zadania
          </p>

          <ul className='list-disc pl-7'>
            <li>
              Design the frontend architecture and be involved in key decisions
              to enable us to build for scale
            </li>
            <li>
              Working with Product and Design to build intuitive and performant
              user-facing products and interfaces
            </li>
            <li>
              Review code, continuously raise the bar for engineering efficiency
              and contribute to best practices
            </li>
          </ul>
        </div>
        <hr className='hidden md:block mb-3 col-span-2' />

        <div className='mt-3 flex flex-col col-span-2 md:grid md:grid-cols-2 md:mb-6'>
          <p className='text-2xl mb-2 mt-4 col-start-1 col-end-2'>Wymagania</p>
          <ul className='list-disc pl-7'>
            <li>4+ years experience</li>
            <li>
              Great knowledge of JavaScript and experience in working with Vue 3
              and its Composition API.
            </li>
            <li>
              Proficiency in HTML and selected specifications (Web Components,
              Shadow DOM)
            </li>
            <li>
              Experience with REST APIs, Nuxt.js and Server Side Rendering (JAM
              Stack)
            </li>
            <li>
              Experience creating micro-frontends (Vue Component Libraries)
            </li>
            <li>Knowledge of the latest CSS standards (+ SASS)</li>
            <li>
              Knowledge of basic UX concepts (Style Guides, Components
              Libraries)
            </li>
          </ul>
        </div>
        <hr className='hidden md:block mb-3 col-span-2' />

        <div className='mt-3 flex flex-col col-span-2 md:grid md:grid-cols-2 md:mb-6'>
          <p className='text-2xl mb-2 mt-4 col-start-1 col-end-2'>
            Dobrze mieć
          </p>
          <ul className='list-disc pl-7'>
            <li>Graphical sense of orientation</li>
            <li>Experience in a similar position or in Fintech</li>
            <li>AWS knowledge</li>
          </ul>
        </div>
        <hr className='hidden md:block mb-3 col-span-2' />

        <div className='mt-3 flex flex-col col-span-2 md:grid md:grid-cols-2 md:mb-6'>
          <p className='text-2xl mb-2 mt-4 col-start-1 col-end-2'>
            Co oferujemy
          </p>
          <ul className='list-disc pl-7'>
            <li>
              Flexible work-time from office, remote or hybrid work — it’s up to
              you (CET +/- 2 hours).
            </li>
            <li>
              Annual personal development budget and the opportunity to be
              mentored by Europe's top experts.
            </li>
            <li>Excellent team of highly qualified and motivated colleagues</li>
            <li>
              For those in Poland, comfy office in Warsaw with drinks and
              snacks, free cab rides, Multisport, and private healthcare
            </li>
            <li>
              For those remote, the option to fly in periodically and spend
              in-person time with the team.
            </li>
          </ul>
        </div>

        <div className='lg:col-span-2 mt-6 bg-slate-800 px-5 rounded-t-lg pt-3 pb-3'>
          <p className='uppercase text-2xl text-white mb-3 font-bold lg:col-start-1 lg:col-end-2'>
            Aplikuj
          </p>
          <form className='flex flex-col'>
            <div className='flex flex-col md:flex-row md:justify-between'>
              <input
                type='text'
                title='name'
                placeholder='Imie i nazwisko'
                className='border border-white p-3 rounded-lg my-1 outline-green-500 min-w-max w-full md:mr-5'
              />
              <input
                type='email'
                title='email'
                placeholder='Twój email'
                className='border border-white p-3 rounded-lg my-1 outline-green-500 min-w-max w-full md:ml-5'
              />
            </div>
            <textarea
              aria-label='your message to the employer'
              placeholder='Wiadomość dla pracodawcy'
              className='border border-white p-3 rounded-lg my-1 max-h-52 min-h-[13rem] resize-none outline-green-500'
              maxLength={500}
            />
            <small className='flex justify-end mt-1 text-white'>
              Maksymalnie 500 znaków
            </small>
            <input
              type='file'
              title='cv'
              className='border border-white my-1 rounded-lg p-3 bg-white outline-green-500'
              accept='.pdf, .doc, .docx'
            />
            <button
              type='submit'
              className='bg-white text-slate-800 p-3 rounded-lg my-1 outline-green-500 hover:bg-slate-200 transition-colors duration-200'
            >
              Aplikuj
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

JobOfferDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default JobOfferDetails;
