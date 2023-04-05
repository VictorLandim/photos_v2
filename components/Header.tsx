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
  <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b-2 border-white/10 bg-black px-4 pt-4 pb-2 text-white/80 sm:px-6">
    <div className="text-left text-xs font-bold sm:text-base">
      <Link href="/">∇ictor.photos</Link>
    </div>
    <ul className="flex">
      {listItems.map((item) => (
        <li key={item.href}>
          <Link
            className="flex cursor-pointer flex-col items-center hover:underline"
            href={item.href}
          >
            {item.icon}
            <p className="mt-1 text-[0.6rem]">{item.text}</p>
          </Link>
        </li>
      ))}
    </ul>
  </header>
);

export default Header;
