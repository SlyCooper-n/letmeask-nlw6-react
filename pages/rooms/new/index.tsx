import { NewRoomPage } from "@components/layout";
import { Illustration } from "@components/modules";
import type { NextPage } from "next";
import Head from "next/head";

const NewRoom: NextPage = () => {
  return (
    <div className="h-screen flex">
      <Head>
        <title>Create a new room</title>
      </Head>

      <Illustration />

      <NewRoomPage />
    </div>
  );
};

export default NewRoom;
