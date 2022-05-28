import { useRouter } from "next/router";

const RoomPage = () => {
  const router = useRouter();

  return <div>Room ID: {router.query.roomID}</div>;
};

export default RoomPage;
