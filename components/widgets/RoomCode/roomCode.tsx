import { copy } from "@/images";
import { RoomCodeProps } from "@core/types";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export const RoomCode = (props: RoomCodeProps) => {
  function handleCopyToClipboard() {
    navigator.clipboard.writeText(props.code);

    toast.success("Copied to clipboard");
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCopyToClipboard}
        className="w-full md:w-fit h-12 mx-auto sm:mx-0 mt-8 sm:mt-0 flex bg-white dark:bg-neutral-700 border border-primary-500 rounded-lg overflow-hidden font-primary"
      >
        <div className="h-full px-3 flex justify-center items-center bg-primary-500">
          <Image src={copy} alt="Copy room code" />
        </div>

        <span className="flex-1 w-60 pr-4 pl-3 block self-center text-sm font-medium">
          Room #{props.code}
        </span>
      </button>

      <Toaster />
    </>
  );
};
