import { useEffect, useState } from "react";

function TodayInfo() {
  const [dateTime, setDateTime] = useState(new Date());

  // Update once every minute (no seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const day = dateTime.toLocaleDateString(undefined, {
    weekday: "long",
  });

  const date = dateTime.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full flex justify-end px-4">
      <div className="text-right">
        <div className="text-lg font-semibold text-gray-900">
          {day}
        </div>
        <div className="text-sm text-green-600 tracking-wide">
          {date}
        </div>
      </div>
    </div>
  );
}

export default TodayInfo;
