import { app, db } from "@/firebase";
import { DatabaseRoomProps, QuestionType } from "@/types";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export function useRoom(roomID: string) {
  const { user } = useAuth();
  const [authorID, setAuthorID] = useState("");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const roomRef = db.ref(db.getDatabase(app), `rooms/${roomID}`);

    db.onValue(roomRef, (snapshot) => {
      const databaseRoom = snapshot.val() as DatabaseRoomProps;
      const roomQuestions = databaseRoom?.questions ?? {};

      const parsedQuestions: QuestionType[] = Object.entries(roomQuestions).map(
        ([key, value]) => ({
          id: key,
          author: {
            avatar: value.author.avatar,
            name: value.author.name,
          },
          content: value.content,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted,
          likesCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(
            ([, like]) => like?.authorId === user?.id
          )?.[0],
        })
      );

      setAuthorID(databaseRoom?.authorId);
      setTitle(databaseRoom?.title);
      setQuestions(parsedQuestions);
    });

    return () => {
      db.off(roomRef, "value");
    };
  }, [roomID, user]);

  return { authorID, title, questions };
}
