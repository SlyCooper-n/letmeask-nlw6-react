import { Template } from "@components/layout";
import { Illustration, NewRoomPage } from "@components/modules";
import type { NextPage } from "next";

const NewRoom: NextPage = () => {
  return (
    <Template>
      <div className="h-screen flex">
        <Illustration />

        <NewRoomPage />
      </div>
    </Template>
  );
};

export default NewRoom;
