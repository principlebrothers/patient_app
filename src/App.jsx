import { Link } from 'react-router-dom';

import yarysaLogo from './assets/yarysaLogo.svg';
import union from './assets/union.svg';


function App() {
  return (
    <>
      <article className='h-screen bg-yarysa-primary flex flex-col items-center justify-center relative'>
        <Link to='/login'>
          <figure className='flex flex-col gap-3 justify-between items-center group'>
            <img src={yarysaLogo} alt='Yarysa logo' />
            <figcaption className='text-white font-semibold shadow-md group-hover:underline'>
              Click the logo to the login
            </figcaption>
          </figure>
        </Link>
        <img
          src={union}
          alt='Union'
          className='absolute top-12 right-6'
        />
      </article>
    </>
  );
}

export default App;
