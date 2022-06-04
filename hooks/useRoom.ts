import { app, db } from "@/firebase";
import { DatabaseRoomProps, QuestionType } from "@/types";
import { useEffect, useState } from "react";

export function useRoom(roomID: string) {
  const [authorID, setAuthorID] = useState("");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const roomRef = db.ref(db.getDatabase(app), `rooms/${roomID}`);

    db.onValue(roomRef, (snapshot) => {
      const databaseRoom = snapshot.val() as DatabaseRoomProps;
      const roomQuestions = databaseRoom?.questions ?? {};

      const parsedQuestions = Object.entries(roomQuestions).map(
        ([key, value]) => ({
          id: key,
          ...value,
        })
      );

      setAuthorID(databaseRoom?.authorId);
      setTitle(databaseRoom?.title);
      setQuestions(parsedQuestions);
    });
  }, [roomID]);

  return { authorID, title, questions };
}
