import { ButtonProps } from "@/types";

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`flex justify-center items-center bg-primary-500 text-white font-medium rounded-lg transition-all duration-200 hover:brightness-90 ${props.mystyle}`}
    >
      {props.children}
    </button>
  );
};
