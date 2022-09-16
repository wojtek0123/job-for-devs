import { OfferData } from '../../helpers/types';
import Link from 'next/link';
import usePagination from '../../hooks/usePagination';
import { useMutation } from '@apollo/client';
import { DELETE_OFFER } from '../../graphql/queries';

const skeletons: number[] = [];
const NUMBER_OF_SKELETONS = 20;
for (let i = 0; i < NUMBER_OF_SKELETONS; i++) {
  skeletons.push(i);
}
const PAGINATION_TAKE = 20;

const DisplayOffers: React.FC<{
  offers: OfferData[] | undefined;
  error: Error | undefined;
  loading: boolean;
  showUtilities: boolean;
  refetch?: () => void;
}> = ({ offers = [], loading, error, showUtilities, refetch }) => {
  const { numberOfElements, showLess, showMore } = usePagination(
    offers.length,
    PAGINATION_TAKE
  );
  const [deleteOffer] = useMutation(DELETE_OFFER, {
    onCompleted: () => {
      if (refetch) {
        refetch();
      }
    },
  });

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
          <div
            className='animate-pulse'
            key={index}
            data-testid={`skeleton${index}`}
          >
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

  if (offers.length === 0) {
    return (
      <p className='text-center mt-10 text-2xl px-2 lg:text-3xl my-5'>
        Brak ofert do wyświetlenia
      </p>
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
      {offers.map((offer, index) =>
        index < numberOfElements ? (
          <Link key={offer.id} href={`/offer/${offer.id}`}>
            <div>
              <div className='bg-gray-200 text-black rounded-lg w-full px-5 py-2 mt-5 cursor-pointer shadow-lg relative'>
                {showUtilities && (
                  <div
                    className='hidden lg:flex absolute left-0 -translate-x-full -translate-y-1/2 top-1/2 bottom-0 flex-col justify-center'
                    data-testId='utility'
                  >
                    <Link href={`/applications/${offer.id}`}>
                      <a className='h-5 w-5 fill-black hover:fill-green-500 transition-colors cursor-default duration-300 my-2 mr-1'>
                        <svg className='cursor-pointer' viewBox='0 0 576 512'>
                          <path d='M128 192C110.3 192 96 177.7 96 160C96 142.3 110.3 128 128 128C145.7 128 160 142.3 160 160C160 177.7 145.7 192 128 192zM200 160C200 146.7 210.7 136 224 136H448C461.3 136 472 146.7 472 160C472 173.3 461.3 184 448 184H224C210.7 184 200 173.3 200 160zM200 256C200 242.7 210.7 232 224 232H448C461.3 232 472 242.7 472 256C472 269.3 461.3 280 448 280H224C210.7 280 200 269.3 200 256zM200 352C200 338.7 210.7 328 224 328H448C461.3 328 472 338.7 472 352C472 365.3 461.3 376 448 376H224C210.7 376 200 365.3 200 352zM128 224C145.7 224 160 238.3 160 256C160 273.7 145.7 288 128 288C110.3 288 96 273.7 96 256C96 238.3 110.3 224 128 224zM128 384C110.3 384 96 369.7 96 352C96 334.3 110.3 320 128 320C145.7 320 160 334.3 160 352C160 369.7 145.7 384 128 384zM0 96C0 60.65 28.65 32 64 32H512C547.3 32 576 60.65 576 96V416C576 451.3 547.3 480 512 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H512C520.8 432 528 424.8 528 416V96C528 87.16 520.8 80 512 80H64C55.16 80 48 87.16 48 96z' />
                        </svg>
                      </a>
                    </Link>
                    <Link
                      href={`/edit-offer/${offer.id}`}
                      className='cursor-default'
                    >
                      <a className='h-5 w-5 fill-black hover:fill-green-500 transition-colors duration-300 cursor-default my-2 mr-1'>
                        <svg className='cursor-pointer' viewBox='0 0 512 512'>
                          <path d='M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z' />
                        </svg>
                      </a>
                    </Link>
                    <button
                      type='button'
                      title='Usuń'
                      onClick={(event) => {
                        event.stopPropagation();
                        void (async () =>
                          await deleteOffer({
                            variables: {
                              id: offer.id,
                            },
                          }))();
                      }}
                    >
                      <svg
                        className='h-5 w-5 fill-black hover:fill-green-500 transition-colors duration-300 cursor-pointer my-2 mr-1'
                        viewBox='0 0 448 512'
                      >
                        <path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
                      </svg>
                    </button>
                  </div>
                )}
                <div className='flex w-full items-center justify-between mb-2'>
                  <h2 className='text-2xl'>{offer.jobTitle}</h2>
                  <p className='hidden sm:block'>{showTimeDifference(offer)}</p>
                  <p className='sm:hidden ml-2'>{offer.location}</p>
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
                    <span className='ml-2 capitalize truncate flex items-center'>
                      {offer.city}
                      <span className='lowercase hidden sm:block ml-1'>
                        - {offer.location}
                      </span>
                    </span>
                  </div>
                  {offer.typeOfDayJob && (
                    <div className='flex items-center'>
                      <svg className='w-4 h-4 fill-black' viewBox='0 0 640 512'>
                        <path d='M496 224c-79.6 0-144 64.4-144 144s64.38 144 144 144 144-64.38 144-144-64.4-144-144-144zm48 160h-54.25c-5.35 0-9.75-4.4-9.75-9.7V304c0-8.8 7.2-16 16-16s16 7.2 16 16v48h32c8.838 0 16 7.162 16 16 0 8.8-7.2 16-16 16zm-223.9-32H208c-8.8 0-16-7.2-16-16v-48H0v144c0 25.6 22.41 48 48 48h312.2c-25.1-30.4-40.2-69.5-40.2-112 0-5.4.5-10.7.1-16zM496 192c5.402 0 10.72.33 16 .807V144c0-25.6-22.4-48-48-48h-80V48c0-25.59-22.4-48-48-48H176c-25.6 0-48 22.41-48 48v48H48c-25.59 0-48 22.4-48 48v112h360.2c32.3-39.1 81.1-64 135.8-64zM336 96H176V48h160v48z' />
                      </svg>
                      <span className='ml-2 truncate'>
                        {offer.typeOfDayJob}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {showUtilities && (
                <div
                  className='flex lg:hidden mt-4 items-center justify-between max-w-lg mx-auto'
                  data-testId='utility'
                >
                  <Link
                    href={`/applications/${offer.id}`}
                    title='Zobacz aplikacje'
                  >
                    <a className='h-10 w-10 fill-black hover:fill-green-500 transition-colors duration-300 cursor-pointer'>
                      <svg viewBox='0 0 576 512'>
                        <path d='M128 192C110.3 192 96 177.7 96 160C96 142.3 110.3 128 128 128C145.7 128 160 142.3 160 160C160 177.7 145.7 192 128 192zM200 160C200 146.7 210.7 136 224 136H448C461.3 136 472 146.7 472 160C472 173.3 461.3 184 448 184H224C210.7 184 200 173.3 200 160zM200 256C200 242.7 210.7 232 224 232H448C461.3 232 472 242.7 472 256C472 269.3 461.3 280 448 280H224C210.7 280 200 269.3 200 256zM200 352C200 338.7 210.7 328 224 328H448C461.3 328 472 338.7 472 352C472 365.3 461.3 376 448 376H224C210.7 376 200 365.3 200 352zM128 224C145.7 224 160 238.3 160 256C160 273.7 145.7 288 128 288C110.3 288 96 273.7 96 256C96 238.3 110.3 224 128 224zM128 384C110.3 384 96 369.7 96 352C96 334.3 110.3 320 128 320C145.7 320 160 334.3 160 352C160 369.7 145.7 384 128 384zM0 96C0 60.65 28.65 32 64 32H512C547.3 32 576 60.65 576 96V416C576 451.3 547.3 480 512 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H512C520.8 432 528 424.8 528 416V96C528 87.16 520.8 80 512 80H64C55.16 80 48 87.16 48 96z' />
                      </svg>
                    </a>
                  </Link>
                  <Link href={`/edit-offer/${offer.id}`}>
                    <a className='h-8 w-8 fill-black hover:fill-green-500 transition-colors duration-300 cursor-default'>
                      <svg className='cursor-pointer' viewBox='0 0 512 512'>
                        <path d='M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z' />
                      </svg>
                    </a>
                  </Link>
                  <button
                    type='button'
                    title='Usuń'
                    onClick={() => {
                      void (async () =>
                        await deleteOffer({
                          variables: {
                            id: offer.id,
                          },
                        }))();
                    }}
                  >
                    <svg
                      className='h-8 w-8 fill-black hover:fill-green-500 transition-colors duration-300 cursor-pointer'
                      viewBox='0 0 448 512'
                    >
                      <path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className='hidden' key={index}></div>
        )
      )}
      <div className='w-full flex items-center justify-around mt-5'>
        {numberOfElements > PAGINATION_TAKE && (
          <button
            type='button'
            onClick={showLess}
            className='p-3 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition-colors duration-300 mr-2'
          >
            Mniej
          </button>
        )}
        {numberOfElements < offers.length && (
          <button
            type='button'
            onClick={showMore}
            className='p-3 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition-colors duration-300 ml-2'
          >
            Więcej
          </button>
        )}
      </div>
    </>
  );
};

export default DisplayOffers;
