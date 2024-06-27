const Footer = () => {
  return (
    <footer className='hidden md:inline-block text-yarysa-primary text-center p-4 absolute bottom-0 inset-x-0 '>
      <p className='font-sen text-xl'>
        &copy; {new Date().getFullYear()} Devdex Software Solution
      </p>
    </footer>
  );
};

export default Footer;
