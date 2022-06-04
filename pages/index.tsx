import type { NextPage } from "next";
import { Homepage, Template } from "@components/layout";
import { Illustration } from "@components/modules";

const Home: NextPage = () => {
  return (
    <>
      <div className="h-screen flex">
        <Illustration />

        <Homepage />
      </div>
    </>
  );
};

export default Home;
