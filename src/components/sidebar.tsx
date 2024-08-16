import Image from "next/image";
import Link from "next/link";
import menu from "@/assests/menu.json";

export function Sidebar() {
  return (
    <aside className="fixed hidden h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-48 transition-width duration-75 z-[9998]">
      <div className="relative flex-1 flex pt-5 pb-4 overflow-y-auto px-3 flex-col min-h-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <ul className="space-y-2 pb-2">
          {menu.map((item) => (
            <div key={item.title}>
              <Link
                href={{
                  pathname: item.path || "",
                }}
                className={`text-base text-gray-900 dark:text-gray-100 font-normal rounded-lg flex p-2 hover:bg-gray-100 dark:hover:bg-gray-800 group flex-col cursor-pointer`}
              >
                <div className="flex flex-row">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={25}
                    height={25}
                    className="dark:invert dark:brightness-0"
                  />
                  <span className="ml-3">{item.title}</span>
                </div>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </aside>
  );
}
