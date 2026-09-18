"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

interface TimerButtonProps {
  initialSeconds?: number;
}

const TimerButton: React.FC<TimerButtonProps> = ({ initialSeconds = 0 }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isRunning) {
      // Pause
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      // Play
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Link
      href="#"
      className={`btn btn-light w-100 timer-btn ${isRunning ? "running" : ""}`}
      onClick={handleClick}
      data-bs-toggle="modal"
      data-bs-target={isRunning ? "#order_pause" : "#cooking_started_modal"}
    >
      <i className={`me-2 ${isRunning ? "icon-pause" : "icon-play"}`} />
      <span className="label">{isRunning ? "Pause" : "Play"}</span>
      <span className="ps-1 fw-semibold time">{formatTime(seconds)}</span>
    </Link>
  );
};

export default TimerButton;
