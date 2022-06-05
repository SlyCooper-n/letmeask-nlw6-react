import { app, db } from "@/firebase";
import { logo } from "@/images";
import { Question } from "@components/modules";
import { Button, RoomCode } from "@components/widgets";
// import { Admin } from "components/guards";
import { useAuth } from "hooks/useAuth";
import { useRoom } from "hooks/useRoom";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AdminRoomPage: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { roomID } = router.query;
  const [newQuestion, setNewQuestion] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { title, questions } = useRoom(roomID as string);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      textareaRef.current?.focus();
      return;
    }

    if (!user) {
      throw new Error("User not logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    setNewQuestion("");
    await db.push(
      db.ref(db.getDatabase(app), `rooms/${roomID}/questions`),
      question
    );
    toast.success("Question sent successfully");
  }

  async function handleCloseRoom() {
    await db.update(db.ref(db.getDatabase(app), `rooms/${roomID}`), {
      closedAt: new Date(),
    });

    toast.success("Room closed successfully");
    router.push("/");
  }

  return (
    <>
      {/* 
      // userID={user?.id}
      // roomAuthor={authorID as string}
      // roomID={roomID as string}
    > */}
      <header className="p-6 border-b border-[#e2e2e2]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <Image src={logo} alt="Letmeask" className="max-h-11" />

          <div className="flex justify-center items-center gap-4">
            <RoomCode code={roomID as string} />

            <Button outlined onClick={handleCloseRoom}>
              Close room
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto">
        <div className="mx-6 my-8 sm:flex sm:items-center">
          <h1 className="text-2xl text-primary-900 font-secondary font-medium">
            Room {title}
          </h1>

          {questions.length > 0 && (
            <span className="mt-4 sm:mt-0 sm:ml-4 px-4 py-2 inline-block sm:inline bg-[#e559f9] text-white text-sm font-medium rounded-full">
              {questions.length}{" "}
              {questions.length === 1 ? "question" : "questions"}
            </span>
          )}
        </div>

        <section className="mt-8">
          {questions.map((question) => (
            <Question key={question.id} type="admin" {...question} />
          ))}
        </section>
      </main>

      <Toaster />
    </>
  );
};

export default AdminRoomPage;
