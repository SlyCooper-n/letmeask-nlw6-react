import Image from "next/image";
import { illustration } from "@/images";

export const Illustration = () => {
  return (
    <aside className="px-20 py-32 flex-[7] hidden lg:flex flex-col justify-center bg-primary-500 text-white">
      <Image
        src={illustration}
        alt="illustration representing questions and anwers"
        className="max-w-xs"
        priority
      />
      <strong className="mt-4 text-4xl font-secondary">
        Create live Q&amp;A rooms
      </strong>

      <p className="mt-4 text-2xl text-primary-100">
        Clear the doubts of your audience in real time
      </p>
    </aside>
  );
};
