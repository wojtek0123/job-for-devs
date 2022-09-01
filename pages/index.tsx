// import type { NextPage } from 'next';
import type { NextPageWithLayout } from './_app';
import Image from 'next/image';
import Link from 'next/link';
import searchIcon from '../public/icons/search-icon.svg';
import locationIcon from '../public/icons/location-dot-solid.svg';
import sackIcon from '../public/icons/sack-dollar-solid.svg';
import buildingIcon from '../public/icons/building-solid.svg';
import timeIcon from '../public/icons/business-time-solid.svg';
import Layout from '../components/layouts/layout';
import { ReactElement, useState } from 'react';

import { technologies, seniorities } from '../components/new-post/OfferDetails';
import { cities } from '../components/new-post/CompanyInfo';
import Modal from '../components/modal/Modal';

const Home: NextPageWithLayout = () => {
  const [showFilters, setShowFilters] = useState(false);

  const showFiltersHandler = (): void => {
    setShowFilters(true);
  };

  const filterOffer = (): void => {
    setShowFilters(false);
  };

  return (
    <>
      <div className='w-full bg-white flex flex-col items-center justify-center md:pt-10 rounded-b-lg pb-3'>
        <h2 className='text-black my-3 text-3xl font-light md:mb-8 md:mt-0 md:text-5xl text-center'>
          Find Your Deam Job
        </h2>
        <form className='flex flex-row lg:flex-row px-5 pb-4 pt-3 rounded-b-lg max-w-7xl w-full items-center md:justify-center xl:px-0'>
          <input
            type='text'
            placeholder='Filtruj po tytule'
            id='title'
            className='border my-2 px-4 py-2 rounded-lg w-full max-w-xl mx-auto text-lg md:my-0 md:mx-2 outline-green-500'
          />
          <button
            type='submit'
            aria-label='search button'
            className='flex items-center justify-center h-full rounded-lg px-4 py-3 bg-gray-200 text-black ml-2 max-w-xl min-w-max hover:bg-gray-300 transition-colors duration-300'
          >
            <Image src={searchIcon} alt='search icon' width={15} height={15} />
            <span className='ml-2'>Search</span>
          </button>
        </form>
        <button
          type='button'
          className='bg-gray-200 px-6 py-3 rounded-lg md:hidden hover:bg-gray-300 transition-colors duration-300'
          onClick={showFiltersHandler}
        >
          Filtruj
        </button>
      </div>
      <Modal show={showFilters} close={filterOffer} />
      {/* MAIN CONTENT */}
      <div className='px-5 xl:px-0 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[400px_1fr] lg:gap-3'>
        <div className='hidden bg-white p-5 lg:block lg:static lg:p-0'>
          <div className='mt-3'>
            <p className='text-lg'>Technologie</p>
            <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
              {technologies.map((technology, index) => (
                <button
                  type='button'
                  key={index}
                  className='px-3 py-1 rounded-lg mr-1 my-1 bg-gray-200 '
                >
                  {technology}
                </button>
              ))}
            </div>
          </div>
          <div className='mt-3'>
            <p className='text-lg'>Miasto</p>
            <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
              {cities.map((city, index) => (
                <button
                  type='button'
                  key={index}
                  className='px-3 py-1 rounded-lg mr-1 my-1 bg-gray-200'
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className='mt-3'>
            <p className='text-lg'>Doświadczenie</p>
            <div className='flex flex-wrap items-center text-black col-start-2 col-end-3'>
              {seniorities.map((seniority, index) => (
                <button
                  type='button'
                  key={index}
                  className='px-3 py-1 rounded-lg mr-1 my-1 bg-gray-200'
                >
                  {seniority}
                </button>
              ))}
            </div>
          </div>
          <button
            type='button'
            className='bg-green-500 text-white px-4 py-1 rounded-lg mt-10 w-full hover:bg-green-600 transition-colors duration-300'
          >
            Filtruj
          </button>
        </div>
        <div className='lg:col-start-2 lg:col-end-3'>
          <Link href='/details/1'>
            <div className='bg-gray-200 text-black rounded-lg w-full px-5 py-2 mt-5 cursor-pointer shadow-lg'>
              <div className='flex w-full items-center justify-between mb-2'>
                <h2 className='text-2xl'>Front End Developer</h2>
                <p className='hidden sm:block'>5 d</p>
              </div>
              <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                <div>
                  <div className='flex items-center'>
                    <Image src={buildingIcon} width={15} height={15} />
                    <h3 className='text-xl ml-2'>Frontend Base</h3>
                  </div>
                  <div className='flex items-center'>
                    <Image src={sackIcon} width={15} height={15} />
                    <h4 className='text-xl ml-2'>4000 - 8000 PLN</h4>
                  </div>
                </div>
                <div className='flex flex-wrap text-black mt-5 md:mt-0 md:ml-2'>
                  <span className='bg-white rounded-lg py-1 px-2 mx-1 my-1 sm:my-2 text-xs lg:text-base md:mr-0 shadow'>
                    React
                  </span>
                  <span className='bg-white rounded-lg py-1 px-2 mx-1 my-1 sm:my-2 text-xs lg:text-base md:mr-0 shadow'>
                    GraphQL
                  </span>
                  <span className='bg-white rounded-lg py-1 px-2 mx-1 my-1 sm:my-2 text-xs lg:text-base md:mr-0 shadow'>
                    Tailwindcss
                  </span>
                  <span className='bg-white rounded-lg py-1 px-2 mx-1 my-1 sm:my-2 text-xs lg:text-base md:mr-0 shadow'>
                    TypeScript
                  </span>
                  <span className='bg-white rounded-lg py-1 px-2 mx-1 my-1 sm:my-2 text-xs lg:text-base md:mr-0 shadow'>
                    TypeScript
                  </span>
                  <span className='bg-white rounded-lg py-1 px-2 mx-1 my-1 sm:my-2 text-xs lg:text-base md:mr-0 shadow'>
                    TypeScript
                  </span>
                  <span className='bg-white rounded-lg py-1 px-2 mx-1 my-1 sm:my-2 text-xs lg:text-base md:mr-0 shadow'>
                    TypeScript
                  </span>
                </div>
              </div>

              <div className='flex justify-between items-center mt-3'>
                <div className='flex items-center'>
                  <Image src={locationIcon} width={15} height={15} />
                  <span className='ml-2'>Warszawa</span>
                </div>
                <div className='flex items-center'>
                  <Image src={timeIcon} width={15} height={15} />
                  <span className='ml-2'>Full time</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
