import Image from "next/image";
import { Button } from "components/widgets/Button";
import Link from "next/link";
import { logo } from "@/images";
import { FormEvent, useRef, useState } from "react";
import { app, db } from "@/firebase";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

export const NewRoomPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [newRoom, setNewRoom] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      setNewRoom("");
      inputRef.current?.focus();
      toast.error("Please enter a room code.");
      return;
    }

    const roomRef = db.ref(db.getDatabase(app), "rooms");
    const firebaseRoom = await db.push(roomRef, {
      title: newRoom,
      authorId: user?.id,
    });

    toast.success("Room created");
    router.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <main className="px-8 flex-[8] flex justify-center items-center">
      <div className="w-full max-w-xs flex flex-col text-center">
        <div className="w-3/4 mx-auto">
          <Image src={logo} alt="letmeask logo" layout="responsive" />
        </div>

        <h2 className="mx-6 pt-16 pb-4 text-2xl font-secondary font-bold">
          Create a new room
        </h2>

        <form onSubmit={handleCreateRoom}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type the room name"
            value={newRoom}
            onChange={(event) => setNewRoom(event.target.value)}
            className="w-full h-12 px-4 bg-white border border-primary-200 rounded-lg"
          />

          <Button type="submit" mystyle="w-full mt-4">
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

      <Toaster />
    </main>
  );
};
