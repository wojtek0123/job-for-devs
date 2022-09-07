import { OfferData } from '../../helpers/types';
import Link from 'next/link';

const skeletons = [1, 2, 3, 4, 5];

const DisplayOffers: React.FC<{
  offers: OfferData[] | undefined;
  error: Error | undefined;
  loading: boolean;
}> = ({ offers = [], loading, error }) => {
  if (error) {
    return (
      <p className='text-center mt-10 text-2xl px-2'>
        Przepraszamy za problemy! Błąd przy wczytywaniu danych.
      </p>
    );
  }

  if (loading) {
    return (
      <>
        {skeletons.map((index) => (
          <div className='animate-pulse' key={index}>
            <div className='bg-gray-200 text-black rounded-lg w-full px-5 py-4 mt-5 cursor-pointer shadow-lg'>
              <div className='flex w-full items-center justify-between mb-2'>
                <div className='w-48 mr-4 sm:w-1/2 max-w-sm rounded-lg h-8 bg-gray-300'></div>
                <div className='w-10 rounded-lg h-5 bg-gray-300'></div>
              </div>
              <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                <div>
                  <div className='flex items-center'>
                    <div className='w-44 rounded-lg h-6 bg-gray-300'></div>
                  </div>
                  <div className='flex items-center my-2'>
                    <div className='w-36 rounded-lg h-6 bg-gray-300'></div>
                  </div>
                </div>
                <div className='flex flex-wrap text-black mt-5 md:mt-0 md:ml-2'>
                  <div className='w-10 rounded-lg mr-1 my-1 h-5 md:h-7 md:w-14 bg-gray-300'></div>
                  <div className='w-10 rounded-lg mr-1 my-1 h-5 md:h-7 md:w-14 bg-gray-300'></div>
                  <div className='w-10 rounded-lg mr-1 my-1 h-5 md:h-7 md:w-14 bg-gray-300'></div>
                  <div className='w-10 rounded-lg mr-1 my-1 h-5 md:h-7 md:w-14 bg-gray-300'></div>
                </div>
              </div>
              <div className='flex justify-between items-center mt-3'>
                <div className='w-32 mr-4 rounded-lg h-5 bg-gray-300'></div>
                <div className='w-14 md:w-20 rounded-lg h-5 bg-gray-300'></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  const showTimeDifference = (offer: OfferData): string => {
    const currentTime = new Date().getTime();
    const createdAt = new Date(offer.createdAt).getTime();

    const seconds =
      Math.floor(currentTime / 1000) - Math.floor(createdAt / 1000);
    const minutes = Math.floor((seconds % 3600) / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(hours / 24);
    if (days >= 1) {
      return `${days}d`;
    }
    if (hours >= 1) {
      return `${hours}h`;
    }
    if (minutes >= 1) {
      return `${minutes}m`;
    }

    return `${seconds}s`;
  };

  return (
    <>
      {offers.map((offer) => (
        <Link key={offer.id} href={`/offer/${offer.id}`}>
          <div className='bg-gray-200 text-black rounded-lg w-full px-5 py-2 mt-5 cursor-pointer shadow-lg'>
            <div className='flex w-full items-center justify-between mb-2'>
              <h2 className='text-2xl'>{offer.jobTitle}</h2>
              <p className='hidden sm:block'>{showTimeDifference(offer)}</p>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
              <div>
                <div className='flex items-center'>
                  <svg className='fill-black w-4 h-4' viewBox='0 0 384 512'>
                    <path d='M336 0c26.5 0 48 21.49 48 48v416c0 26.5-21.5 48-48 48h-96v-80c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H48c-26.51 0-48-21.5-48-48V48C0 21.49 21.49 0 48 0h288zM64 272c0 8.8 7.16 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.84 0-16 7.2-16 16v32zm112-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zm80 48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v32zM80 96c-8.84 0-16 7.2-16 16v32c0 8.8 7.16 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80zm80 48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v32zm112-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32z' />
                  </svg>
                  <h3 className='text-xl ml-2'>{offer.companyName}</h3>
                </div>
                <div className='flex items-center'>
                  <svg className='w-4 h-4 fill-black' viewBox='0 0 512 512'>
                    <path d='M320 96H192l-47.4-71.12C137.5 14.24 145.1 0 157.9 0h196.2c12.8 0 20.4 14.24 13.3 24.88L320 96zm-128 32h128c3.8 2.5 8.1 5.3 12.1 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53.02 0-96-43-96-96 0-165.1 122.3-243.3 179-279.6 4.9-3.1 9.2-5.9 13-8.4zm84.1 96c0-11.1-9-20.1-21-20.1-10.2 0-19.2 9-19.2 20.1v6c-5.6 1.2-11.8 2.9-15.9 5.1-14.9 6.8-27.9 19.4-31.1 37.7-1.8 10.2-.8 20.1 3.4 29 4.2 8.8 10.7 15 17.3 19.5 11.6 7.9 26.9 12.5 38.6 16l2.2.6c14 4.3 23.4 7.4 29.3 11.7 2.5 1.8 3.4 3.2 3.7 4.1.4.8 1 2.6.3 6.6-.6 3.5-2.5 6.5-8 8.8-6.1 2.6-16 3.9-28.8 1.9-6-1-16.7-4.6-26.2-7.8-2.2-.8-4.4-1.5-6.4-2.2-10.5-3.5-21.8 2.2-25.3 12.7s2.2 21.8 12.7 24.4c1.2 1.3 2.7 1.8 4.4 2.4 7 2.7 20.3 6.9 29.8 9.1v6.4c0 11.1 9 20.1 19.2 20.1 12 0 21-9 21-20.1v-5.5c5.3-1 10.5-3.4 15.3-4.6 15.8-6.7 28.4-19.7 31.7-38.7 1.8-10.4 1-20.4-3-29.5-3.9-9-10.2-15.6-16.9-20.4-12.1-8.9-28.3-13.7-40.4-17.4l-1.7-.2c-13.3-4.3-22.9-7.3-29-11.5-2.6-1.8-3.4-3-3.6-3.5-.2-.4-.8-1.6-.2-5 .4-2 1.9-5.3 8.2-8.1 5.6-2.9 16.4-4.5 28.6-3.5 4.4 1.6 17.9 4.2 21.8 5.2 10.6 2.9 21.6-3.5 24.4-14.2 2.9-10.6-3.5-21.6-14.2-24.4-4.4-1.2-14.4-3.2-21-4.4V224z' />
                  </svg>
                  <h4 className='text-xl ml-2'>
                    {offer.exactSalary === ''
                      ? `${offer.minSalary} - ${offer.maxSalary}`
                      : offer.exactSalary}
                    PLN
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
    </>
  );
};

export default DisplayOffers;
