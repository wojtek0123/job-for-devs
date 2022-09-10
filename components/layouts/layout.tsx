import MainHeader from './MainHeader';
import NewOfferHeader from './NewOfferHeader';

const currentYear = new Date().getFullYear();

const Layout: React.FC<{
  children: JSX.Element;
  typeHeader: 'main' | 'new-offer';
}> = ({ children, typeHeader }) => {
  return (
    <>
      {typeHeader === 'main' && <MainHeader />}
      {typeHeader === 'new-offer' && <NewOfferHeader />}
      <main className='selection:bg-green-500 selection:text-white'>
        {children}
      </main>
      <footer className='w-full bg-white rounded-t-lg mt-10 py-5 border-t-2 border-gray-200 selection:bg-green-500 selection:text-white'>
        <p className='text-center'>Stworzone przez Wojciech Pietaszuk</p>
        <p className='text-center'>{currentYear}</p>
      </footer>

      <div id='modal-root'></div>
    </>
  );
};

export default Layout;
