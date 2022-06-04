export type DatabaseRoomProps = {
  authorId: string;
  questions: Record<
    string,
    {
      author: {
        avatar: string;
        name: string;
      };
      content: string;
      isAnswered: boolean;
      isHighlighted: boolean;
      likes: Record<
        string,
        {
          authorId: string;
        }
      >;
    }
  >;
  title: string;
};
