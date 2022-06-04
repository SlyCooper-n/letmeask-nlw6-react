import { app, db } from "@/firebase";
import { logo } from "@/images";
import { Question } from "@components/modules";
import { Button, RoomCode } from "@components/widgets";
import { useAuth } from "hooks/useAuth";
import { useRoom } from "hooks/useRoom";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const RoomPage: NextPage = () => {
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

  return (
    <>
      <header className="p-6 border-b border-[#e2e2e2]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <Image src={logo} alt="Letmeask" className="max-h-11" />

          <RoomCode code={roomID as string} />
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

        <form onSubmit={handleSendQuestion}>
          <textarea
            ref={textareaRef}
            placeholder="What you want to ask?"
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
            className="w-full min-h-[130px] p-4 bg-[#fefefe] border-none rounded-lg shadow-md resize-y"
          />

          <div className="mt-4 flex justify-between items-center">
            {user ? (
              <div className="flex items-center">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="ml-2 inline-block text-primary-900 text-sm font-medium">
                  {user.name}
                </span>
              </div>
            ) : (
              <span className="text-sm text-[#737380]">
                To send an ask,{" "}
                <button className="text-primary-500 text-sm">log in</button>.
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Send ask
            </Button>
          </div>
        </form>

        <section className="mt-8">
          {questions.map((question) => (
            <Question key={question.id} {...question}>
              <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
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
    </>
  );
};

export default RoomPage;
