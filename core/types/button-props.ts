import { ButtonHTMLAttributes } from "react";

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = ButtonAttributes & { mystyle?: string };
