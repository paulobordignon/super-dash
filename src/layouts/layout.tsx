import { Header } from "@/components";
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
      <main>{children}</main>
    </>
  );
}
