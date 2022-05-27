import type { NextPage } from "next";
import { Template } from "@components/layout";
import { Homepage, Illustration } from "@components/modules";

const Home: NextPage = () => {
  return (
    <Template>
      <div className="h-screen flex">
        <Illustration />

        <Homepage />
      </div>
    </Template>
  );
};

export default Home;
