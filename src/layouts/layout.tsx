import { Header, Sidebar } from "@/components";
import Head from "next/head";

interface LayoutTypes {
  children: JSX.Element;
}

export function Layout({ children }: LayoutTypes) {
  return (
    <>
      <Head>
        <title>Super Dash</title>
      </Head>
      <Header />
      <Sidebar />
      <main id="main">
        <div
          id="content"
          className="rounded-lg bg-white dark:bg-gray-900 shadow p-2"
        >
          {children}
        </div>
      </main>
    </>
  );
}
