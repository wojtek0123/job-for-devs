import { OfferData, FormData } from '../../helpers/types';
import Image from 'next/image';
import detailsBg from '../../public/images/details-bg.jpg';
import Link from 'next/link';
import DisplayAsTextOrList from './DisplayAsTextOrList';

const DisplayOfferDetails: React.FC<{
  offer: FormData | OfferData;
  review: boolean;
}> = ({ offer, review }) => {
  const displaySalary =
    offer.exactSalary === ''
      ? `${offer.minSalary} - ${offer.maxSalary}`
      : offer.exactSalary;

  const displayAddress =
    offer.house === ''
      ? `${offer.street.toString()} ${offer.building.toString()}, ${offer.city}`
      : `${offer.street.toString()} ${offer.building.toString()}/${offer.house.toString()}, {offer.city}`;

  return (
    <div className='max-w-7xl mx-auto w-full mt-5 col-span-2'>
      {!review && (
        <Link href='/'>
          <a className='inline-flex items-center bg-gray-200 border text-black shadow px-4 py-1 rounded-lg ml-2 xl:ml-0 text-lg hover:bg-gray-300 transition-colors duration-300'>
            <svg className='w-4 h-4 fill-black' viewBox='0 0 448 512'>
              <path d='M447.1 256c0 17.7-13.4 32-31.1 32H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25-6.3 6.25-14.5 9.35-22.7 9.35s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416c17.7 0 31.1 14.3 31.1 32z' />
            </svg>
            <span className='ml-2'>back</span>
          </a>
        </Link>
      )}
      <div className='rounded-b-lg relative mt-5'>
        <Image
          src={detailsBg}
          alt='Group of workers think together how to solve a problem in code'
          layout='responsive'
          objectFit='cover'
          height={800}
          className='xl:rounded-lg'
          priority={true}
        />
        <div className='absolute inset-0 bg-black/70 rounded-bl-lg rounded-lg flex flex-col justify-center pl-5 md:pl-10 md:pt-20 lg:pl-20 lg:px-28'>
          <h2 className='text-white text-2xl mb-2 sm:text-3xl lg:text-4xl xl:text-5xl xl:mb-8'>
            {offer.jobTitle}
          </h2>
          <div className='flex'>
            <div>
              <div className='text-white text-base lg:text-lg xl:text-2xl xl:my-1 flex items-center'>
                <svg className='fill-white w-4 h-4' viewBox='0 0 384 512'>
                  <path d='M336 0c26.5 0 48 21.49 48 48v416c0 26.5-21.5 48-48 48h-96v-80c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H48c-26.51 0-48-21.5-48-48V48C0 21.49 21.49 0 48 0h288zM64 272c0 8.8 7.16 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.84 0-16 7.2-16 16v32zm112-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zm80 48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v32zM80 96c-8.84 0-16 7.2-16 16v32c0 8.8 7.16 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80zm80 48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v32zm112-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32z' />
                </svg>
                <span className='ml-2'>{offer.companyName}</span>
              </div>
              <div className='flex items-center text-white text-base lg:text-lg xl:text-2xl xl:my-1'>
                <svg className='w-4 h-4 fill-white' viewBox='0 0 384 512'>
                  <path d='M168.3 499.2C116.1 435 0 279.4 0 192 0 85.96 85.96 0 192 0c106 0 192 85.96 192 192 0 87.4-117 243-168.3 307.2-12.3 15.3-35.1 15.3-47.4 0zM192 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64z' />
                </svg>
                <span className='ml-2'>{displayAddress}</span>
              </div>
              <div className='flex items-center text-white text-base lg:text-lg xl:text-2xl xl:my-1'>
                <svg className='w-4 h-4 fill-white' viewBox='0 0 512 512'>
                  <path d='M320 96H192l-47.4-71.12C137.5 14.24 145.1 0 157.9 0h196.2c12.8 0 20.4 14.24 13.3 24.88L320 96zm-128 32h128c3.8 2.5 8.1 5.3 12.1 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53.02 0-96-43-96-96 0-165.1 122.3-243.3 179-279.6 4.9-3.1 9.2-5.9 13-8.4zm84.1 96c0-11.1-9-20.1-21-20.1-10.2 0-19.2 9-19.2 20.1v6c-5.6 1.2-11.8 2.9-15.9 5.1-14.9 6.8-27.9 19.4-31.1 37.7-1.8 10.2-.8 20.1 3.4 29 4.2 8.8 10.7 15 17.3 19.5 11.6 7.9 26.9 12.5 38.6 16l2.2.6c14 4.3 23.4 7.4 29.3 11.7 2.5 1.8 3.4 3.2 3.7 4.1.4.8 1 2.6.3 6.6-.6 3.5-2.5 6.5-8 8.8-6.1 2.6-16 3.9-28.8 1.9-6-1-16.7-4.6-26.2-7.8-2.2-.8-4.4-1.5-6.4-2.2-10.5-3.5-21.8 2.2-25.3 12.7s2.2 21.8 12.7 24.4c1.2 1.3 2.7 1.8 4.4 2.4 7 2.7 20.3 6.9 29.8 9.1v6.4c0 11.1 9 20.1 19.2 20.1 12 0 21-9 21-20.1v-5.5c5.3-1 10.5-3.4 15.3-4.6 15.8-6.7 28.4-19.7 31.7-38.7 1.8-10.4 1-20.4-3-29.5-3.9-9-10.2-15.6-16.9-20.4-12.1-8.9-28.3-13.7-40.4-17.4l-1.7-.2c-13.3-4.3-22.9-7.3-29-11.5-2.6-1.8-3.4-3-3.6-3.5-.2-.4-.8-1.6-.2-5 .4-2 1.9-5.3 8.2-8.1 5.6-2.9 16.4-4.5 28.6-3.5 4.4 1.6 17.9 4.2 21.8 5.2 10.6 2.9 21.6-3.5 24.4-14.2 2.9-10.6-3.5-21.6-14.2-24.4-4.4-1.2-14.4-3.2-21-4.4V224z' />
                </svg>
                <span className='ml-2'>{displaySalary} PLN</span>
              </div>
            </div>
            <div className='ml-14 lg:ml-20 xl:ml-28'>
              <div className='hidden md:flex items-center text-white text-base lg:text-lg xl:text-2xl xl:my-1'>
                <svg className='w-4 h-4 fill-white' viewBox='0 0 576 512'>
                  <path d='M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.1c0 2.8-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40h-16c-1.1 0-2.2-.9-3.3-.1-1.4-.8-2.8.1-4.2.1H392c-22.1 0-40-17.9-40-40v-88c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v88c0 22.1-17.9 40-40 40h-55.9c-1.5 0-3-.1-4.5-.2-1.2.1-2.4.2-3.6.2h-16c-22.09 0-40-17.9-40-40V360c0-.9.03-1.9.09-2.8v-69.6H32.05C14.02 287.6 0 273.5 0 255.5c0-9 3.004-17 10.01-24L266.4 8.016c7-7.014 15-8.016 22-8.016s15 2.004 21.1 7.014L564.8 231.5c8 7 12.1 15 11 24z' />
                </svg>
                <span className='ml-2 capitalize'>{offer.typeOfDayJob}</span>
              </div>
              <div className='hidden md:flex items-center text-white text-base lg:text-lg xl:text-2xl xl:my-1'>
                <svg className='w-4 h-4 fill-white' viewBox='0 0 640 512'>
                  <path d='M496 224c-79.6 0-144 64.4-144 144s64.38 144 144 144 144-64.38 144-144-64.4-144-144-144zm48 160h-54.25c-5.35 0-9.75-4.4-9.75-9.7V304c0-8.8 7.2-16 16-16s16 7.2 16 16v48h32c8.838 0 16 7.162 16 16 0 8.8-7.2 16-16 16zm-223.9-32H208c-8.8 0-16-7.2-16-16v-48H0v144c0 25.6 22.41 48 48 48h312.2c-25.1-30.4-40.2-69.5-40.2-112 0-5.4.5-10.7.1-16zM496 192c5.402 0 10.72.33 16 .807V144c0-25.6-22.4-48-48-48h-80V48c0-25.59-22.4-48-48-48H176c-25.6 0-48 22.41-48 48v48H48c-25.59 0-48 22.4-48 48v112h360.2c32.3-39.1 81.1-64 135.8-64zM336 96H176V48h160v48z' />
                </svg>
                <span className='ml-2 capitalize'>{offer.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='px-5 [1300px]:px-0 w-full grid grid-cols-1 mt-5'>
        <div className='flex justify-between'>
          <div className='flex items-center text-black text-base md:hidden'>
            <svg className='w-4 h-4 fill-black' viewBox='0 0 640 512'>
              <path d='M496 224c-79.6 0-144 64.4-144 144s64.38 144 144 144 144-64.38 144-144-64.4-144-144-144zm48 160h-54.25c-5.35 0-9.75-4.4-9.75-9.7V304c0-8.8 7.2-16 16-16s16 7.2 16 16v48h32c8.838 0 16 7.162 16 16 0 8.8-7.2 16-16 16zm-223.9-32H208c-8.8 0-16-7.2-16-16v-48H0v144c0 25.6 22.41 48 48 48h312.2c-25.1-30.4-40.2-69.5-40.2-112 0-5.4.5-10.7.1-16zM496 192c5.402 0 10.72.33 16 .807V144c0-25.6-22.4-48-48-48h-80V48c0-25.59-22.4-48-48-48H176c-25.6 0-48 22.41-48 48v48H48c-25.59 0-48 22.4-48 48v112h360.2c32.3-39.1 81.1-64 135.8-64zM336 96H176V48h160v48z' />
            </svg>
            <span className='capitalize ml-1'>{offer.location}</span>
          </div>
          <div className='flex items-center text-black text-base md:hidden'>
            <svg className='w-4 h-4 fill-black' viewBox='0 0 576 512'>
              <path d='M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.1c0 2.8-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40h-16c-1.1 0-2.2-.9-3.3-.1-1.4-.8-2.8.1-4.2.1H392c-22.1 0-40-17.9-40-40v-88c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v88c0 22.1-17.9 40-40 40h-55.9c-1.5 0-3-.1-4.5-.2-1.2.1-2.4.2-3.6.2h-16c-22.09 0-40-17.9-40-40V360c0-.9.03-1.9.09-2.8v-69.6H32.05C14.02 287.6 0 273.5 0 255.5c0-9 3.004-17 10.01-24L266.4 8.016c7-7.014 15-8.016 22-8.016s15 2.004 21.1 7.014L564.8 231.5c8 7 12.1 15 11 24z' />
            </svg>
            <span className='capitalize ml-1'>{offer.typeOfDayJob}</span>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row col-span-2 md:grid md:grid-cols-2 md:mb-6'>
          <p className='text-2xl mb-2 mt-4 col-start-1 col-end-2'>
            Technologie
          </p>
          <div className='flex flex-wrap items-center text-black col-start-2 col-end-3 text-base'>
            {offer.technologies.map((technology, index) => (
              <span
                key={index}
                className='bg-gray-200 rounded-lg py-1 px-2 mr-2 my-1 shadow'
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
        <hr className='hidden md:block mb-3 col-span-2' />

        {offer.description.length !== 0 && (
          <>
            {' '}
            <div className='mt-3 flex flex-col col-span-2 md:grid md:grid-cols-2 md:mb-6'>
              <p className='text-2xl mb-2 mt-4 col-start-1 col-end-2'>Opis</p>
              <p className='lg:col-start-2 lg:col-end-3 break-words'>
                {offer.description}
              </p>
            </div>
            <hr className='hidden md:block mb-3 col-span-2' />
          </>
        )}

        <div className='mt-3 flex flex-col col-span-2 md:grid md:grid-cols-2 md:mb-6'>
          <p className='text-2xl mb-2 mt-4 col-start-1 col-end-2'>
            Twoje podstawowe zadania
          </p>
          <DisplayAsTextOrList text={offer.obligations.toString()} />
        </div>
        <hr className='hidden md:block mb-3 col-span-2' />

        <div className='mt-3 flex flex-col col-span-2 md:grid md:grid-cols-2 md:mb-6'>
          <p className='text-2xl mb-2 mt-4 col-start-1 col-end-2'>Wymagania</p>
          <DisplayAsTextOrList text={offer.requirements.toString()} />
        </div>
        <hr className='hidden md:block mb-3 col-span-2' />

        {offer.advantages.length !== 0 && (
          <>
            <div className='mt-3 flex flex-col col-span-2 md:grid md:grid-cols-2 md:mb-6'>
              <p className='text-2xl mb-2 mt-4 col-start-1 col-end-2'>
                Dobrze mieć
              </p>
              <DisplayAsTextOrList text={offer.advantages.toString()} />
            </div>
            <hr className='hidden md:block mb-3 col-span-2' />
          </>
        )}

        {offer.benefits.length !== 0 && (
          <div className='mt-3 flex flex-col col-span-2 md:grid md:grid-cols-2 md:mb-6'>
            <p className='text-2xl mb-2 mt-4 col-start-1 col-end-2'>
              Co oferujemy
            </p>
            <DisplayAsTextOrList text={offer.benefits.toString()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayOfferDetails;
