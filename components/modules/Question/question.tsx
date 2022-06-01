import { deleteImg, like } from "@/images";
import { QuestionType } from "@/types";
import Image from "next/image";

export const Question = (props: QuestionType) => {
  return (
    <div className="my-4 p-4 bg-primary-100 shadow-md">
      <p>{props.content}</p>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex justify-center items-center">
          <Image
            src={props.author.avatar}
            alt={props.author.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="ml-2">{props.author.name}</span>
        </div>

        <div className="flex gap-2">
          <button className="group">
            <Image
              src={deleteImg}
              alt="delete icon"
              width={20}
              height={20}
              className="group-hover:opacity-75 transition-opacity duration-150"
            />
          </button>

          <button className="group">
            <Image
              src={like}
              alt="like icon"
              width={20}
              height={20}
              className="group-hover:opacity-75 transition-opacity duration-150"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
