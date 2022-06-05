import { app, db } from "@/firebase";
import { QuestionType } from "@/types";
import { useAuth } from "hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export const Question = (props: QuestionType & { type: "user" | "admin" }) => {
  const { user } = useAuth();
  const { roomID } = useRouter().query;

  async function handleLike(questionID: string, likeId: string | undefined) {
    if (likeId) {
      await db.remove(
        db.ref(
          db.getDatabase(app),
          `rooms/${roomID}/questions/${questionID}/likes/${likeId}`
        )
      );
      return;
    }

    await db.push(
      db.ref(
        db.getDatabase(app),
        `rooms/${roomID}/questions/${questionID}/likes`
      ),
      { authorId: user?.id }
    );
  }

  async function handleDelete(questionID: string) {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      await db.remove(
        db.ref(db.getDatabase(app), `rooms/${roomID}/questions/${questionID}`)
      );
    } catch {
      toast.error("Error deleting question");
      console.error("Something went wrong while deleting the question");
    }

    toast.success("Question deleted successfully");
  }

  return (
    <div className="my-2 p-6 bg-primary-100 rounded-lg shadow">
      <p>{props.content}</p>

      <footer className="mt-6 flex justify-between items-center">
        <div className="flex justify-center items-center">
          <Image
            src={props.author.avatar}
            alt={props.author.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="ml-2 text-[#737380] text-sm">
            {props.author.name}
          </span>
        </div>

        <div className="flex gap-3">
          {props.type == "admin" ? (
            <>
              <button
                type="button"
                aria-label="mark this question as answered"
                className="group"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12.0003"
                    cy="11.9998"
                    r="9.00375"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-[#737380] transition-colors group-hover:stroke-green-500"
                  />
                  <path
                    d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-[#737380] transition-colors group-hover:stroke-green-500"
                  />
                </svg>
              </button>

              <button
                type="button"
                aria-label="highlight this question"
                className="group"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-[#737380] transition-colors group-hover:stroke-primary-500"
                  />
                </svg>
              </button>

              <button
                type="button"
                aria-label="delete this question"
                onClick={() => handleDelete(props.id)}
                className="group"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 5.99988H5H21"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-[#737380] transition-colors group-hover:stroke-red-500"
                  />
                  <path
                    d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-[#737380] transition-colors group-hover:stroke-red-500"
                  />
                </svg>
              </button>
            </>
          ) : (
            <button
              type="button"
              aria-label="mark this question as liked"
              onClick={() => handleLike(props.id, props.likeId)}
              className="flex items-end gap-2 text-primary-500 transition-all hover:brightness-[0.7]"
            >
              <span className="text-sm text-primary-500">
                {props.likesCount}
              </span>

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={props.likeId ? "#835afd" : "none"}
                className="transition-colors duration-200"
              >
                <path
                  d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                  stroke={props.likeId ? "currentColor" : "#737380"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-200"
                />
              </svg>
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
