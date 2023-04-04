import Link from "next/link";
import Folder from "./icons/Folder";

const listItems = [
  {
    href: "/albums",
    icon: <Folder />,
    text: "albums",
  },
];

const Header = () => (
  <header className="flex items-center justify-between border-b-2 border-white/10 px-4 pt-4 pb-2 text-white/80 sm:px-6">
    <div className="text-left text-sm font-bold sm:text-base">
      <Link href="/">∇ictor.photos</Link>
    </div>
    <ul className="flex">
      {listItems.map((item) => (
        <li
          key={item.href}
          className="flex cursor-pointer flex-col items-center hover:underline"
        >
          <Link href={item.href}>{item.icon}</Link>
          <p className="mt-1 hidden text-xs sm:block">{item.text}</p>
        </li>
      ))}
    </ul>
  </header>
);

export default Header;
