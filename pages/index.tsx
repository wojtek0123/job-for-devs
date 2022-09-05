import type { NextPageWithLayout } from './_app';
import Link from 'next/link';
import Layout from '../components/layouts/layout';
import React, { ReactElement, useRef, useState } from 'react';
import Modal from '../components/modal/Modal';
import { DUMMY_DATA } from '../data/DUMMY_DATA';
import Filters from '../components/filters/Filters';

const Home: NextPageWithLayout = () => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [displayedData, setDisplayedData] = useState(DUMMY_DATA);

  const showFiltersHandler = (): void => {
    setShowFilters(true);
  };

  const filterOffers = (): void => {
    setShowFilters(false);
  };

  const filterByJobTitle = (event: React.FormEvent): void => {
    event.preventDefault();

    if (titleInputRef.current === null) return;

    const enteredTitle = titleInputRef.current.value;
    let filteredOffers;

    if (displayedData.length !== DUMMY_DATA.length) {
      filteredOffers = displayedData.filter((data) =>
        data.jobTitle.toLowerCase().includes(enteredTitle.toLowerCase().trim())
      );
    } else {
      filteredOffers = DUMMY_DATA.filter((data) =>
        data.jobTitle.toLowerCase().includes(enteredTitle.toLowerCase().trim())
      );
    }

    setDisplayedData(filteredOffers);
  };

  return (
    <>
      <div className='w-full bg-white flex flex-col items-center justify-center md:pt-10 rounded-b-lg pb-3 px-5 [1300px]:px-0'>
        <h2 className='text-black my-3 text-3xl font-light md:mb-8 md:mt-0 md:text-5xl text-center'>
          Find Your Deam Job
        </h2>
        <form
          onSubmit={filterByJobTitle}
          className='flex flex-row lg:flex-row pb-4 pt-3 rounded-b-lg max-w-7xl w-full items-center md:justify-center'
        >
          <input
            type='text'
            placeholder='Filtruj po tytule'
            id='title'
            className='border my-2 px-4 py-2 rounded-lg w-full max-w-xl mx-auto text-lg md:my-0 md:mx-2 outline-green-500'
            ref={titleInputRef}
          />
          <button
            type='submit'
            aria-label='search button'
            className='flex items-center justify-center h-full rounded-lg px-4 py-3 bg-gray-200 text-black ml-2 max-w-xl min-w-max hover:bg-gray-300 transition-colors duration-300'
          >
            <svg className='w-4 h-4 fill-black' viewBox='0 0 512 512'>
              <path d='M500.3 443.7 380.6 324c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723 99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9 53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0 15.606-15.64 15.606-41.04.006-56.64zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128-57.42 128-128 128-128-57.4-128-128z' />
            </svg>
            <span className='ml-2'>Search</span>
          </button>
        </form>
        <button
          type='button'
          className='bg-gray-200 py-3 w-full rounded-lg lg:hidden hover:bg-gray-300 transition-colors duration-300'
          onClick={showFiltersHandler}
        >
          Filtruj
        </button>
      </div>
      <Modal
        show={showFilters}
        close={filterOffers}
        offers={displayedData}
        onFilteredOffers={setDisplayedData}
      />
      {/* MAIN CONTENT */}
      {!showFilters && (
        <div className='px-5 xl:px-0 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[400px_1fr] lg:gap-3'>
          <div className='hidden lg:block p-5 lg:p-0'>
            <Filters offers={displayedData} onFilterOffers={setDisplayedData} />
          </div>
          <div className='lg:col-start-2 lg:col-end-3'>
            {displayedData.map((offer) => (
              <Link key={offer.id} href={`/details/${offer.id}`}>
                <div className='bg-gray-200 text-black rounded-lg w-full px-5 py-2 mt-5 cursor-pointer shadow-lg'>
                  <div className='flex w-full items-center justify-between mb-2'>
                    <h2 className='text-2xl'>{offer.jobTitle}</h2>
                    <p className='hidden sm:block'>5 d</p>
                  </div>
                  <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                    <div>
                      <div className='flex items-center'>
                        <svg
                          className='fill-black w-4 h-4'
                          viewBox='0 0 384 512'
                        >
                          <path d='M336 0c26.5 0 48 21.49 48 48v416c0 26.5-21.5 48-48 48h-96v-80c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H48c-26.51 0-48-21.5-48-48V48C0 21.49 21.49 0 48 0h288zM64 272c0 8.8 7.16 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.84 0-16 7.2-16 16v32zm112-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zm80 48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v32zM80 96c-8.84 0-16 7.2-16 16v32c0 8.8 7.16 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80zm80 48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v32zm112-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32z' />
                        </svg>
                        <h3 className='text-xl ml-2'>{offer.companyName}</h3>
                      </div>
                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 fill-black'
                          viewBox='0 0 512 512'
                        >
                          <path d='M320 96H192l-47.4-71.12C137.5 14.24 145.1 0 157.9 0h196.2c12.8 0 20.4 14.24 13.3 24.88L320 96zm-128 32h128c3.8 2.5 8.1 5.3 12.1 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53.02 0-96-43-96-96 0-165.1 122.3-243.3 179-279.6 4.9-3.1 9.2-5.9 13-8.4zm84.1 96c0-11.1-9-20.1-21-20.1-10.2 0-19.2 9-19.2 20.1v6c-5.6 1.2-11.8 2.9-15.9 5.1-14.9 6.8-27.9 19.4-31.1 37.7-1.8 10.2-.8 20.1 3.4 29 4.2 8.8 10.7 15 17.3 19.5 11.6 7.9 26.9 12.5 38.6 16l2.2.6c14 4.3 23.4 7.4 29.3 11.7 2.5 1.8 3.4 3.2 3.7 4.1.4.8 1 2.6.3 6.6-.6 3.5-2.5 6.5-8 8.8-6.1 2.6-16 3.9-28.8 1.9-6-1-16.7-4.6-26.2-7.8-2.2-.8-4.4-1.5-6.4-2.2-10.5-3.5-21.8 2.2-25.3 12.7s2.2 21.8 12.7 24.4c1.2 1.3 2.7 1.8 4.4 2.4 7 2.7 20.3 6.9 29.8 9.1v6.4c0 11.1 9 20.1 19.2 20.1 12 0 21-9 21-20.1v-5.5c5.3-1 10.5-3.4 15.3-4.6 15.8-6.7 28.4-19.7 31.7-38.7 1.8-10.4 1-20.4-3-29.5-3.9-9-10.2-15.6-16.9-20.4-12.1-8.9-28.3-13.7-40.4-17.4l-1.7-.2c-13.3-4.3-22.9-7.3-29-11.5-2.6-1.8-3.4-3-3.6-3.5-.2-.4-.8-1.6-.2-5 .4-2 1.9-5.3 8.2-8.1 5.6-2.9 16.4-4.5 28.6-3.5 4.4 1.6 17.9 4.2 21.8 5.2 10.6 2.9 21.6-3.5 24.4-14.2 2.9-10.6-3.5-21.6-14.2-24.4-4.4-1.2-14.4-3.2-21-4.4V224z' />
                        </svg>
                        <h4 className='text-xl ml-2'>
                          {offer.minSalary} - {offer.maxSalary} PLN
                        </h4>
                      </div>
                    </div>
                    <div className='flex flex-wrap text-black mt-5 md:mt-0 md:ml-2'>
                      {offer.technologies.map((technology, index) => (
                        <span
                          key={index}
                          className='bg-white rounded-lg py-1 px-2 mx-1 my-1 sm:my-2 text-base md:mr-0 shadow'
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className='flex justify-between items-center mt-3'>
                    <div className='flex items-center'>
                      <svg className='w-4 h-4 fill-black' viewBox='0 0 384 512'>
                        <path d='M168.3 499.2C116.1 435 0 279.4 0 192 0 85.96 85.96 0 192 0c106 0 192 85.96 192 192 0 87.4-117 243-168.3 307.2-12.3 15.3-35.1 15.3-47.4 0zM192 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64z' />
                      </svg>
                      <span className='ml-2 capitalize'>{offer.city}</span>
                    </div>
                    <div className='flex items-center'>
                      <svg className='w-4 h-4 fill-black' viewBox='0 0 640 512'>
                        <path d='M496 224c-79.6 0-144 64.4-144 144s64.38 144 144 144 144-64.38 144-144-64.4-144-144-144zm48 160h-54.25c-5.35 0-9.75-4.4-9.75-9.7V304c0-8.8 7.2-16 16-16s16 7.2 16 16v48h32c8.838 0 16 7.162 16 16 0 8.8-7.2 16-16 16zm-223.9-32H208c-8.8 0-16-7.2-16-16v-48H0v144c0 25.6 22.41 48 48 48h312.2c-25.1-30.4-40.2-69.5-40.2-112 0-5.4.5-10.7.1-16zM496 192c5.402 0 10.72.33 16 .807V144c0-25.6-22.4-48-48-48h-80V48c0-25.59-22.4-48-48-48H176c-25.6 0-48 22.41-48 48v48H48c-25.59 0-48 22.4-48 48v112h360.2c32.3-39.1 81.1-64 135.8-64zM336 96H176V48h160v48z' />
                      </svg>
                      <span className='ml-2'>{offer.typeOfDayJob}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
