import { app, db } from "@/firebase";
import { googleIcon, logo } from "@/images";
import { useAuth } from "@core/hooks";
import { Button } from "components/widgets/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const Homepage = () => {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
      toast.success("Logged in");
    }

    router.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      setRoomCode("");
      inputRef.current?.focus();
      return;
    }

    const roomRef = db.ref(db.getDatabase(app), `rooms/${roomCode}`);
    const room = await db.get(roomRef);

    if (!room.exists()) {
      toast.error("Room does not exist");
      return;
    }

    if (room.val().closedAt) {
      toast("Room is already closed");
      return;
    }

    router.push(`/rooms/${roomCode}`);
  }

  return (
    <main className="px-8 flex-[8] flex justify-center items-center">
      <div className="w-full max-w-xs flex flex-col text-center">
        <div className="w-3/4 mx-auto p-2 dark:bg-neutral-300 rounded-lg">
          <Image src={logo} alt="letmeask logo" layout="responsive" />
        </div>

        <button
          type="button"
          onClick={handleCreateRoom}
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

        <form onSubmit={handleJoinRoom}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type the room code"
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value)}
            className="w-full h-12 px-4 bg-white dark:bg-neutral-600 dark:placeholder:text-primary-100 border border-primary-200 rounded-lg"
          />

          <Button type="submit" mystyle="w-full mt-4">
            Enter the room
          </Button>
        </form>

        <Toaster />

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
