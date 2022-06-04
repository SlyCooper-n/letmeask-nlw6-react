import { ReactNode } from "react";

export type QuestionType = {
  id: string;
  author: {
    avatar: string;
    name: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likesCount: number;
  likeId: string | undefined;
  children?: ReactNode | ReactNode[];
};
