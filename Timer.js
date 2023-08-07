import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

const Timer = ({ providedTime }) => {
  const [timerValue, setTimerValue] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (startTime !== null && isRunning) {
      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const diffInMilliseconds = currentTime - startTime;
        setTimerValue(diffInMilliseconds);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startTime, isRunning]);

  const handleStart = () => {
    if (startTime === null) {
      const providedTimeMilliseconds = new Date(providedTime).getTime();
      setStartTime(providedTimeMilliseconds);
    }
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setStartTime(null);
  };

  const formatTime = (timeInMilliseconds) => {
    const duration = new Date(timeInMilliseconds);
    const formattedTime = `${padTwoDigits(duration.getUTCHours())}:${padTwoDigits(duration.getUTCMinutes())}:${padTwoDigits(duration.getUTCSeconds())}.${padThreeDigits(duration.getUTCMilliseconds())}`;
    return formattedTime;
  };

  const padTwoDigits = (num) => String(num).padStart(2, "0");
  const padThreeDigits = (num) => String(num).padStart(3, "0");

  return (
    <View>
      <Text>{formatTime(timerValue)}</Text>
      {!isRunning ? (
        <Button title="Start" onPress={handleStart} />
      ) : (
        <Button title="Stop" onPress={handleStop} />
      )}
      <Button title="Reset" onPress={handleReset} />
    </View>
  );
};

export default Timer;
