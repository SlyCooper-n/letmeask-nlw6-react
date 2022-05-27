import type { NextPage } from "next";
import { Template } from "@/Template";
import { Illustration, NewRoomPage } from "@/modules";

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
