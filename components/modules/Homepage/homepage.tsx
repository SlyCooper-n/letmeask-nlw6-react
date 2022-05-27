import Image from "next/image";
import { Button } from "components/widgets/Button";
import { useRouter } from "next/router";
import { app, auth, db } from "@/firebase";
import { googleIcon, logo } from "@/images";

export const Homepage = () => {
  const router = useRouter();

  function signIn() {
    const provider = new auth.GoogleAuthProvider();

    auth.signInWithPopup(auth.getAuth(app), provider).then((result) => {
      console.log(result);

      router.push("/rooms/new");
    });
  }

  return (
    <main className="px-8 flex-[8] flex justify-center items-center">
      <div className="w-full max-w-xs flex flex-col text-center">
        <div className="w-3/4 mx-auto">
          <Image src={logo} alt="letmeask logo" layout="responsive" />
        </div>

        <button
          onClick={signIn}
          className="w-full h-12 mt-16 flex justify-center items-center bg-[#ea4335] text-white font-medium rounded-lg transition-all duration-200 hover:brightness-90 disabled:opacity-60"
        >
          <div className="mr-2 -mb-1">
            <Image src={googleIcon} alt="Google icon" layout="intrinsic" />
          </div>
          Create your room with Google
        </button>

        <div className="my-8 flex items-center text-sm text-primary-200">
          Or enter a room
        </div>

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

        <style jsx>{`
          div.my-8::before {
            content: "";
            height: 1px;
            margin-right: 16px;
            flex: 1;
            background: #a8a8b3;
          }
          div.my-8::after {
            content: "";
            height: 1px;
            margin-left: 16px;
            flex: 1;
            background: #a8a8b3;
          }
        `}</style>
      </div>
    </main>
  );
};
