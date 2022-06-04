import { Template, NewRoomPage } from "@components/layout";
import { Illustration } from "@components/modules";
import type { NextPage } from "next";

const NewRoom: NextPage = () => {
  return (
    <div className="h-screen flex">
      <Illustration />

      <NewRoomPage />
    </div>
  );
};

export default NewRoom;
