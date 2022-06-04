import { ButtonProps } from "@/types";

export const Button = ({
  outlined,
  ...props
}: ButtonProps & { outlined?: boolean }) => {
  if (outlined) {
    return (
      <button
        {...props}
        className={`h-12 px-8 flex justify-center items-center border border-primary-500 text-primary-500 font-medium rounded-lg transition-all duration-200 hover:brightness-90 ${props.mystyle}`}
      >
        {props.children}
      </button>
    );
  }

  return (
    <button
      {...props}
      className={`h-12 px-8 flex justify-center items-center bg-primary-500 text-white font-medium rounded-lg transition-all duration-200 hover:brightness-90 ${props.mystyle}`}
    >
      {props.children}
    </button>
  );
};
