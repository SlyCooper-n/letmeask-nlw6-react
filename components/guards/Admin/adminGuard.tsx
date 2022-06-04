import { useRouter } from "next/router";
import { ReactNode } from "react";

type AdminGuardProps = {
  userID: string | undefined;
  roomAuthor: string;
  roomID: string;
  children: ReactNode | ReactNode[];
};

export const Admin = ({
  userID,
  roomAuthor,
  roomID,
  children,
}: AdminGuardProps) => {
  const router = useRouter();

  if (!userID) {
    router.push("/");
  }

  if (userID !== roomAuthor) {
    router.push(`/rooms/${roomID}`);
  }

  return <>{children}</>;
};
