import { useEffect, useState } from 'react';

const Timer = ({ onTimeUp }) => {
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onTimeUp]);

  return (
    <div className="px-4 py-1 bg-red-100 text-red-700 font-semibold rounded-full text-sm">
      ⏱ {time}s
    </div>
  );
};

export default Timer;
