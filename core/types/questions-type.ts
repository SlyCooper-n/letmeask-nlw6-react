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
  children?: ReactNode | ReactNode[];
};
