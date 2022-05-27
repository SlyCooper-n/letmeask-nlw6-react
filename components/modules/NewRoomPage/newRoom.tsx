import Image from "next/image";
import { Button } from "components/widgets/Button";
import Link from "next/link";
import { logo } from "@/images";

export const NewRoomPage = () => {
  return (
    <main className="px-8 flex-[8] flex justify-center items-center">
      <div className="w-full max-w-xs flex flex-col text-center">
        <div className="w-3/4 mx-auto">
          <Image src={logo} alt="letmeask logo" layout="responsive" />
        </div>

        <h2 className="mx-6 pt-16 pb-4 text-2xl font-secondary font-bold">
          Create a new room
        </h2>

        <form>
          <input
            type="text"
            placeholder="Type the room code"
            className="w-full h-12 px-4 bg-white border border-primary-200 rounded-lg"
          />

          <Button type="submit" mystyle="w-full h-12 mt-4">
            Enter the room
          </Button>
        </form>

        <p className="mt-4 text-sm text-[#737380]">
          Want to enter an existing room?{" "}
          <Link href="/">
            <a className="text-[#e559f9]">click here</a>
          </Link>
        </p>
      </div>
    </main>
  );
};
