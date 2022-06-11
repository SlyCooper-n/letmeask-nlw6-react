import { app, db } from "@/firebase";
import { logo } from "@/images";
import { Question } from "@components/modules";
import { Button, RoomCode } from "@components/widgets";
import { Admin } from "components/guards";
import { useAuth } from "hooks/useAuth";
import { useRoom } from "hooks/useRoom";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

const AdminRoomPage: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { roomID } = router.query;
  const { authorID, title, questions, loading } = useRoom(roomID as string);

  async function handleCloseRoom() {
    await db.update(db.ref(db.getDatabase(app), `rooms/${roomID}`), {
      closedAt: new Date(),
    });

    toast.success("Room closed successfully");
    router.push("/");
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
    <Admin
      userID={user?.id}
      roomAuthor={authorID as string}
      roomID={roomID as string}
    >
      <Head>
        <title>Admin | Room {title}</title>
      </Head>

      <div className="min-h-screen">
        <header className="p-6 border-b border-[#e2e2e2]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="w-fit mx-auto md:ml-0 mb-4 p-2 dark:bg-neutral-300 rounded-lg">
              <Image src={logo} alt="Letmeask" className="max-h-11" />
            </div>

            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4">
              <RoomCode code={roomID as string} />

              <Button outlined onClick={handleCloseRoom}>
                Close room
              </Button>
            </div>
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
                    <Question key={question.id} type="admin" {...question} />
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
                <Question key={question.id} type="admin" {...question} />
              ))}
          </section>

          {questions.some((question) => question.isAnswered) && (
            <>
              <hr className="my-10" />

              <section>
                <h2 className="mx-6 mb-4 text-xl">Answered questions</h2>

                {questions
                  .filter((question) => question.isAnswered)
                  .map((question) => (
                    <Question key={question.id} type="admin" {...question} />
                  ))}
              </section>
            </>
          )}
        </main>

        <Toaster />
      </div>
    </Admin>
  );
};

export default AdminRoomPage;
