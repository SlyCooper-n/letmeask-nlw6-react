import Head from "next/head";
import { TemplateProps } from "@/types";

export const Template = ({ children }: TemplateProps) => {
  return (
    <div className="min-h-screen bg-primary-100 dark:bg-primary-900 dark:text-primary-100 text-primary-900 font-primary">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <title>Letmeask | Q&amp;A rooms for content creators</title>
        <meta
          name="description"
          content="Q&amp;A rooms for content creators."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </div>
  );
};
