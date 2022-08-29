// import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import detailsBg from '../../public/images/details-bg.jpg';
import backArrowIcon from '../../public/icons/arrow-left-solid.svg';
import sackIcon from '../../public/icons/sack-dollar-solid.svg';
import locationIcon from '../../public/icons/location-dot-solid.svg';
import buildingIcon from '../../public/icons/building-solid.svg';
import { ReactElement } from 'react';
import Layout from '../../components/layout';
import { NextPageWithLayout } from '../_app';

const JobOfferDetails: NextPageWithLayout = () => {
  return (
    <div className='max-w-7xl mx-auto w-full mt-3'>
      <Link href='/'>
        <a className='bg-white border border-slate-800 text-slate-800 px-4 py-1 rounded-lg ml-2 xl:ml-0 text-lg hover:bg-slate-200 transition-colors duration-200'>
          <Image src={backArrowIcon} alt='back' width={15} height={15} />
          <span className='ml-2'>back</span>
        </a>
      </Link>
      <div className='rounded-b-lg relative mt-3'>
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
      <div className='px-5 xl:px-0'>
        <section className='mt-6 border-slate-800 border p-3 rounded-lg'>
          <p className='uppercase text-xl font-bold'>Stack</p>
          <div className='flex flex-wrap mt-4'>
            <span className='bg-green-500 rounded-lg text-white py-1 px-2 mr-2 my-1 text-base'>
              React
            </span>
            <span className='bg-green-500 rounded-lg text-white py-1 px-2 mr-2 my-1 text-base'>
              GraphQL
            </span>
            <span className='bg-green-500 rounded-lg text-white py-1 px-2 mr-2 my-1 text-base'>
              Tailwindcss
            </span>
            <span className='bg-green-500 rounded-lg text-white py-1 px-2 mr-2 my-1 text-base'>
              TypeScript
            </span>
            <span className='bg-green-500 rounded-lg text-white py-1 px-2 mr-2 my-1 text-base'>
              TypeScript
            </span>
            <span className='bg-green-500 rounded-lg text-white py-1 px-2 mr-2 my-1 text-base'>
              TypeScript
            </span>
            <span className='bg-green-500 rounded-lg text-white py-1 px-2 mr-2 my-1 text-base'>
              TypeScript
            </span>
          </div>
        </section>
        <section className='mt-6 border-slate-800 border p-3 rounded-lg'>
          <p className='uppercase text-xl font-bold'>Description</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            eveniet vel iure minus ab laudantium iusto veniam incidunt omnis
            aperiam cum ipsa commodi nemo, magni repellat consequuntur, nostrum
            sint soluta nihil, porro illum vitae recusandae? Obcaecati
          </p>
        </section>
        <section className='mt-6 border-slate-800 border p-3 rounded-lg'>
          <p className='uppercase text-xl font-bold'>What you will do</p>

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
        </section>
        <section className='mt-6 border-slate-800 border p-3 rounded-lg'>
          <p className='uppercase text-xl font-bold'>Requirements</p>
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
        </section>
        <section className='mt-6 border-slate-800 border p-3 rounded-lg'>
          <p className='uppercase text-xl font-bold'>Nice to have</p>
          <ul className='list-disc pl-7'>
            <li>Graphical sense of orientation</li>
            <li>Experience in a similar position or in Fintech</li>
            <li>AWS knowledge</li>
          </ul>
        </section>
        <section className='mt-6 border-slate-800 border p-3 rounded-lg'>
          <p className='uppercase text-xl font-bold'>What we offer</p>
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
        </section>

        <section className='mt-6 bg-slate-800 px-5 rounded-lg pt-3 pb-3'>
          <p className='uppercase text-2xl text-white mb-3 font-bold'>Apply</p>
          <form className='flex flex-col'>
            <input
              type='text'
              title='name'
              placeholder='First and last name'
              className='border border-white py-1 px-2 rounded-lg my-1 outline-green-500'
            />
            <input
              type='email'
              title='email'
              placeholder='Your email'
              className='border border-white py-1 px-2 rounded-lg my-1 outline-green-500'
            />
            <textarea
              aria-label='your message to the employer'
              placeholder='Message to employer'
              className='border border-white py-1 px-2 rounded-lg my-1 max-h-52 min-h-[13rem] resize-none outline-green-500'
              maxLength={300}
            />
            <input
              type='file'
              title='cv'
              className='border border-white my-1 rounded-lg py-1 px-2 bg-white outline-green-500'
              accept='.pdf, .doc, .docx'
            />
            <button
              type='submit'
              className='bg-white text-slate-800 py-1 px-2 rounded-lg my-1 outline-green-500 hover:bg-slate-200 transition-colors duration-200'
            >
              Apply
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

JobOfferDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default JobOfferDetails;
