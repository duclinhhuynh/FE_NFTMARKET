import React, { useState, useEffect } from "react";

const CountDown = ({ timestamp }) => {
  const calculateTimeLeft = (targetTimestamp) => {
    const targetTime = new Date(targetTimestamp).getTime();
    const now = new Date().getTime();
    const difference = targetTime - now;
  
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
      if (days > 0) {
        return `${days}d: ${hours}h: ${minutes}m: ${seconds}s`;
      } else {
        return `${hours}h: ${minutes}m: ${seconds}s`;
      }
    } else {
      return "Offer has expired!";
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timestamp));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(timestamp));
    }, 1000);

    return () => clearInterval(timer);
  }, [timestamp]);

  return (
    <div>
      <p>{timeLeft}</p>
    </div>
  );
};

export default CountDown;
