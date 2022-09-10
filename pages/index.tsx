import type { NextPageWithLayout } from './_app';
import Layout from '../components/layouts/layout';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import Modal from '../components/modal/Modal';
import Filters from '../components/filters/Filters';
import DisplayOffers from '../components/display-offers/DisplayOffers';
import FiltersContext from '../context/filters-context';

const Home: NextPageWithLayout = () => {
  const {
    offers,
    loading,
    error,
    changeTitle,
    enteredTitle,
    onFilter,
    refetch,
  } = useContext(FiltersContext);

  const [showFilters, setShowFilters] = useState(false);

  const showFiltersHandler = (): void => {
    setShowFilters(true);
  };

  const filterOffers = (): void => {
    setShowFilters(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className='w-full bg-white flex flex-col items-center justify-center md:pt-10 rounded-b-lg pb-3 px-5 2xl:px-0'>
        <h2 className='text-black my-3 text-3xl font-light md:mb-8 md:mt-0 md:text-5xl text-center'>
          Find Your Deam Job
        </h2>
        <form
          onSubmit={onFilter}
          className='flex flex-row lg:flex-row pb-4 pt-3 rounded-b-lg max-w-7xl w-full items-center md:justify-center'
        >
          <input
            type='text'
            placeholder='Filtruj po tytule'
            id='title'
            className='border my-2 px-4 py-2 rounded-lg w-full max-w-xl mx-auto text-lg md:my-0 md:mx-2 outline-green-500'
            onChange={changeTitle}
            value={enteredTitle}
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
      <Modal show={showFilters} close={filterOffers} />
      {!showFilters && (
        <div className='px-5 2xl:px-0 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[400px_1fr] lg:gap-3'>
          <aside className='hidden lg:block p-5 lg:p-0'>
            <Filters />
          </aside>
          <section className='lg:col-start-2 lg:col-end-3'>
            <DisplayOffers
              error={error}
              loading={loading}
              offers={offers}
              showUtilities={false}
            />
          </section>
        </div>
      )}
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout typeHeader='main'>{page}</Layout>;
};

export default Home;
