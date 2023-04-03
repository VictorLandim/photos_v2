import Link from "next/link";
import Folder from "./icons/Folder";

const listItems = [
  {
    href: "/chapters",
    icon: <Folder />,
    text: "chapters",
  },
];

const Header = () => (
  <header className="flex items-center justify-between border-b-2 border-white/10 px-6 py-4 text-white/80">
    <div className="text-left font-bold">victor.photos</div>
    <ul className="flex">
      {listItems.map((item) => (
        <li className="flex cursor-pointer flex-col items-center hover:underline">
          <Link href={item.href}>{item.icon}</Link>
          <p className="mt-1 text-xs">{item.text}</p>
        </li>
      ))}
    </ul>
  </header>
);

export default Header;
