import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header>
      <nav className="bg-white dark:bg-gray-900 border-b top-0 border-gray-200 dark:border-gray-700 fixed h-16 z-[9999] w-full">
        <div className="flex items-center justify-start h-[inherit]">
          <Link href="/" className="text-xl font-bold flex items-center ml-2.5">
            <Image
              src="/favicon.ico"
              width={24}
              height={24}
              alt="Super Dash Logo"
            />
            <span className="self-center whitespace-nowrap ml-2">
              Super Dash
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
