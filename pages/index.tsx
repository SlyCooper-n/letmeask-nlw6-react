import type { NextPage } from "next";
import { Template } from "@/Template";
import { Homepage, Illustration } from "@/modules";
import "@/firebase";

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
