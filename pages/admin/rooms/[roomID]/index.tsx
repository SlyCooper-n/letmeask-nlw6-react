import { app, db } from "@/firebase";
import { logo } from "@/images";
import { Question } from "@components/modules";
import { Button, RoomCode } from "@components/widgets";
import { Admin } from "components/guards";
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
  const { authorID, title, questions } = useRoom(roomID as string);

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

  return (
    <Admin
      userID={user?.id}
      roomAuthor={authorID as string}
      roomID={roomID as string}
    >
      <header className="p-6 border-b border-[#e2e2e2]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <Image src={logo} alt="Letmeask" className="max-h-11" />

          <div className="flex justify-center items-center gap-4">
            <RoomCode code={roomID as string} />

            <Button outlined>Close room</Button>
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
            <Question key={question.id} {...question}>
              <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12.0003"
                    cy="11.9998"
                    r="9.00375"
                    stroke="#737380"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193"
                    stroke="#737380"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z"
                    stroke="#737380"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 5.99988H5H21"
                    stroke="#737380"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z"
                    stroke="#737380"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Question>
          ))}
        </section>
      </main>

      <Toaster />
    </Admin>
  );
};

export default AdminRoomPage;
