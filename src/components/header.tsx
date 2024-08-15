import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 fixed z-[9998] w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link
                href="/"
                className="text-xl font-bold flex items-center lg:ml-2.5"
              >
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
          </div>
        </div>
      </nav>
    </header>
  );
}
