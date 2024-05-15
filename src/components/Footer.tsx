const Footer = () => (
  <footer className="p-6 pt-3 text-center text-xs leading-4 text-gray-950 dark:text-white/80">
    {`${new Date().getFullYear()} `} made with ❤ by
    <br />
    <a href="https://sunnyshot.com" className="hover:underline">
      SunnyShot
    </a>
  </footer>
);

export default Footer;
