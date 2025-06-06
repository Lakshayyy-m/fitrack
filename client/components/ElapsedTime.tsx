import React, { useEffect } from "react";
import { Text } from "react-native";

const ElapsedTime = ({ startTime }: { startTime: Date }) => {
  const [elapsedTime, setElapsedTime] = React.useState(0);

  useEffect(() => {
    const workoutStartTime = new Date(startTime).getTime();
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const diffInSeconds = Math.floor((currentTime - workoutStartTime) / 1000);
      setElapsedTime(diffInSeconds);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <Text className="text-stone-500 font-bold">
      {hours !== 0 && `${hours} : `}
      {pad(minutes)} : {pad(seconds)}
    </Text>
  );
};

export default ElapsedTime;
