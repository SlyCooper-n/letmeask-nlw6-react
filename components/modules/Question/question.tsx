import { deleteImg, like } from "@/images";
import { QuestionType } from "@/types";
import Image from "next/image";

export const Question = (props: QuestionType) => {
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

        <div className="flex gap-2">{props.children}</div>
      </footer>
    </div>
  );
};
