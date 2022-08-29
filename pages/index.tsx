// import type { NextPage } from 'next';
import type { NextPageWithLayout } from './_app';
import Image from 'next/image';
import Link from 'next/link';
import searchIcon from '../public/icons/search-icon.svg';
import locationIcon from '../public/icons/location-dot-solid.svg';
import sackIcon from '../public/icons/sack-dollar-solid.svg';
import buildingIcon from '../public/icons/building-solid.svg';
import timeIcon from '../public/icons/business-time-solid.svg';
import Layout from '../components/layout';
import { ReactElement } from 'react';

const Home: NextPageWithLayout = () => {
  return (
    <div className=''>
      <div className='w-full bg-slate-800 flex flex-col items-center justify-center md:pt-10 rounded-b-lg pb-3'>
        <h2 className='text-white my-3 text-3xl font-light md:mb-8 md:mt-0 md:text-5xl text-center'>
          Find Your Deam Job
        </h2>
        <form className='flex flex-col px-5 pb-4 pt-3 rounded-b-lg max-w-7xl w-full items-center md:justify-center xl:px-0'>
          <input
            type='text'
            placeholder='Filter by title...'
            id='title'
            className='border my-2 px-4 py-2 rounded-lg w-full max-w-xl mx-auto text-lg md:my-0 md:mx-2'
          />
          <div className='flex my-2 items-center justify-center flex-row max-w-xl  md:mt-5'>
            <select
              id='language'
              title='language'
              className='border mr-1 sm:px-4 py-1 rounded-lg md:mr-2 w-full max-w-xl'
              defaultValue='default'
            >
              <option value='default'>Technologies</option>
              <option value='javascript'>JavaScript</option>
              <option value='javascript'>.Net</option>
              <option value='javascript'>Java</option>
              <option value='javascript'>Python</option>
              <option value='javascript'>GO</option>
              <option value='javascript'>Lang</option>
              <option value='javascript'>Rust</option>
              <option value='javascript'>C++</option>
              <option value='javascript'>PHP</option>
            </select>
            <select
              id='job-seniority'
              title='job seniority'
              className='border mx-2 sm:px-4 py-1 rounded-lg md:mx-2 max-w-xl w-full'
              defaultValue='default'
            >
              <option value='default'>Experience</option>
              <option value='all'>All</option>
              <option value='intern'>Intern</option>
              <option value='junior'>Junior</option>
              <option value='mid'>Mid</option>
              <option value='senior'>Senior</option>
            </select>

            <select
              placeholder='Filter by location'
              id='location'
              title='location'
              className='border mx-1 sm:px-4 py-1 rounded-lg md:mx-2 max-w-xl w-full'
              defaultValue='default'
            >
              <option value='default'>Location</option>
              <option>Warszawa</option>
              <option>Kraków</option>
              <option>Wrocław</option>
              <option>Poznań</option>
              <option>Trójmiasto</option>
              <option>Białystok</option>
              <option>Bielsko-Biała</option>
              <option>Bydgoszcz</option>
              <option>Częstochowa</option>
              <option>Kielce</option>
              <option>Lublin</option>
              <option>Łódź</option>
              <option>Olsztyn</option>
              <option>Opole</option>
              <option>Rzeszów</option>
              <option>Szczecin</option>
              <option>Toruń</option>
              <option>Zielona Góra</option>
              <option>Reszta</option>
            </select>
            <button
              type='submit'
              aria-label='search button'
              className='items-center justify-center rounded-lg px-4 py-1 bg-white text-black md:mt-0 sm:ml-2 max-w-xl min-w-max hover:bg-slate-200 transition-colors duration-200 hidden sm:flex'
            >
              <Image
                src={searchIcon}
                alt='search icon'
                width={15}
                height={15}
              />
              <span className='ml-2'>Search</span>
            </button>
          </div>
          <button
            type='submit'
            aria-label='search button'
            className='flex items-center justify-center rounded-lg px-4 py-1 mt-2 bg-white text-black sm:mt-0 sm:ml-2 max-w-xl min-w-max hover:bg-slate-200 transition-colors duration-200 sm:hidden'
          >
            <Image src={searchIcon} alt='search icon' width={15} height={15} />
            <span className='ml-2'>Search</span>
          </button>
        </form>
      </div>

      <div className='px-5 xl:px-0 max-w-7xl mx-auto w-full'>
        <Link href='/details/1'>
          <div className='bg-slate-800 text-white rounded-lg w-full px-5 py-2 mt-5 cursor-pointer'>
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
              <div className='flex flex-wrap mt-5 md:mt-0 md:ml-2'>
                <span className='bg-white rounded-lg text-slate-800 py-1 px-2 mx-2 my-2 text-xs lg:text-base md:mr-0'>
                  React
                </span>
                <span className='bg-white rounded-lg text-slate-800 py-1 px-2 mx-2 my-2 text-xs lg:text-base md:mr-0'>
                  GraphQL
                </span>
                <span className='bg-white rounded-lg text-slate-800 py-1 px-2 mx-2 my-2 text-xs lg:text-base md:mr-0'>
                  Tailwindcss
                </span>
                <span className='bg-white rounded-lg text-slate-800 py-1 px-2 mx-2 my-2 text-xs lg:text-base md:mr-0'>
                  TypeScript
                </span>
                <span className='bg-white rounded-lg text-slate-800 py-1 px-2 mx-2 my-2 text-xs lg:text-base md:mr-0'>
                  TypeScript
                </span>
                <span className='bg-white rounded-lg text-slate-800 py-1 px-2 mx-2 my-2 text-xs lg:text-base md:mr-0'>
                  TypeScript
                </span>
                <span className='bg-white rounded-lg text-slate-800 py-1 px-2 mx-2 my-2 text-xs lg:text-base md:mr-0'>
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
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
