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
  <header className="sticky top-0 z-10 flex w-full items-center justify-center border-b-2 border-white/10 bg-black pb-2 pt-3 text-white/80">
    <div className="flex max-w-[1400px] flex-1 items-center justify-between px-4 sm:px-6">
      <div className="text-left font-bold">
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
    </div>
  </header>
);

export default Header;
