import { app, db } from "@/firebase";
import { logo } from "@/images";
import { Question } from "@components/modules";
import { Button, RoomCode } from "@components/widgets";
import { useAuth } from "hooks/useAuth";
import { useRoom } from "hooks/useRoom";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const RoomPage: NextPage = () => {
  const { user, signInWithGoogle } = useAuth();
  const { roomID } = useRouter().query;
  const [newQuestion, setNewQuestion] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { title, questions, loading } = useRoom(roomID as string);

  async function logIn() {
    try {
      await signInWithGoogle();
      toast.success("Logged in");
    } catch (error) {
      console.log(error);
      toast.error("Error logging in");
    }
  }

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-36 h-36 flex justify-center items-center bg-gradient-to-br from-primary-500 to-pink-400 rounded-full animate-spin">
          <div className="w-4/5 aspect-square bg-white dark:bg-primary-900 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Room {title}</title>
      </Head>

      <header className="p-6 border-b border-[#e2e2e2]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row sm:justify-between sm:items-center">
          <div className="w-fit mx-auto md:ml-0 mb-4 p-2 dark:bg-neutral-300 rounded-lg">
            <Image src={logo} alt="Letmeask" className="max-h-11" />
          </div>

          <RoomCode code={roomID as string} />
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-1">
        <div className="mx-6 my-8 sm:flex sm:items-center">
          <h1 className="text-3xl text-primary-900 dark:text-primary-100 font-secondary font-medium">
            Room {title}
          </h1>

          {questions.length > 0 && (
            <span className="mt-4 sm:mt-0 sm:ml-4 px-4 py-2 inline-block sm:inline bg-[#e559f9] text-white text-sm font-medium rounded-full">
              {questions.length}{" "}
              {questions.length === 1 ? "question" : "questions"}
            </span>
          )}
        </div>

        <form onSubmit={handleSendQuestion} className="mb-12">
          <textarea
            ref={textareaRef}
            placeholder="What you want to ask?"
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
            className="w-full min-h-[130px] p-4 bg-[#fefefe] dark:bg-neutral-700 dark:placeholder:text-primary-100 border-none rounded-lg shadow-md resize-y"
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
                <span className="ml-2 inline-block text-primary-900 dark:text-primary-100 text-sm font-medium">
                  {user.name}
                </span>
              </div>
            ) : (
              <span className="text-sm text-[#737380]">
                To send an ask,{" "}
                <button onClick={logIn} className="text-primary-500 text-sm">
                  log in
                </button>
                .
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Send ask
            </Button>
          </div>
        </form>

        {questions.some(
          (question) => question.isHighlighted && !question.isAnswered
        ) && (
          <>
            <section>
              <h2 className="mx-6 mb-4 text-xl">Highlighted question</h2>

              {questions
                .filter(
                  (question) => question.isHighlighted && !question.isAnswered
                )
                .map((question) => (
                  <Question key={question.id} type="user" {...question} />
                ))}
            </section>

            <hr className="my-10" />
          </>
        )}

        <section>
          {questions
            .filter(
              (question) => !question.isHighlighted && !question.isAnswered
            )
            .sort((a, b) => b?.likesCount - a?.likesCount)
            .map((question) => (
              <Question key={question.id} type="user" {...question} />
            ))}
        </section>

        {questions.some((question) => question.isAnswered) && (
          <>
            <hr className="my-10" />

            <section className="pb-2">
              <h2 className="mx-6 mb-4 text-xl">Answered questions</h2>

              {questions
                .filter((question) => question.isAnswered)
                .map((question) => (
                  <Question key={question.id} type="user" {...question} />
                ))}
            </section>
          </>
        )}
      </main>

      <Toaster />
    </>
  );
};

export default RoomPage;
