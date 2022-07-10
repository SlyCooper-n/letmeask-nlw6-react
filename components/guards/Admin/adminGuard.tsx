import { AdminGuardProps } from "@core/types/props";
import { useRouter } from "next/router";

export const Admin = ({
  userID,
  roomAuthor,
  roomID,
  children,
}: AdminGuardProps) => {
  const router = useRouter();

  if (!userID) {
    router.push("/");
    return null;
  }

  if (userID !== roomAuthor) {
    router.push(`/rooms/${roomID}`);
    return null;
  }

  return <>{children}</>;
};
