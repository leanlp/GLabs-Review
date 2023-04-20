import React from "react";

import { useCountDown } from "hooks/useCountDown";
import { FC } from "react";

interface RafflesCountdownProps {
  date: string;
}

const RafflesCountdown: FC<RafflesCountdownProps> = ({ date }) => {
  const countDown = useCountDown(date);
  return (
    <p className="text-xl">
      Raffle ends in:{" "}
      <strong className="text-xl font-extrabold">{countDown?.days}</strong> days{" "}
      <strong className="text-xl font-extrabold">{countDown?.hours}</strong>{" "}
      hours{" "}
      <strong className="text-xl font-extrabold">{countDown?.minutes}</strong>{" "}
      minutes
    </p>
  );
};

export default RafflesCountdown;
