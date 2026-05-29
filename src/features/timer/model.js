import { useState, useEffect, useRef } from 'react';

export const SessionStatus = {
  WORK: 'work',
  SHORT_BREAK: 'short_break',
  LONG_BREAK: 'long_break',
  IDLE: 'idle',
};

export const useTimer = (settings) => {
  const [status, setStatus] = useState(SessionStatus.IDLE);
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(settings.workDuration * 60);
    }
  }, [settings.workDuration]);

  const startTimer = () => {
    if (status === SessionStatus.IDLE) {
      setStatus(SessionStatus.WORK);
      setTimeLeft(settings.workDuration * 60);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setStatus(SessionStatus.IDLE);
    setTimeLeft(settings.workDuration * 60);
    setCompletedSessions(0);
  };

  const switchSession = () => {
    if (status === SessionStatus.WORK) {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);

      if (newCompletedSessions % settings.sessionsBeforeLongBreak === 0) {
        setStatus(SessionStatus.LONG_BREAK);
        setTimeLeft(settings.longBreak * 60);
      } else {
        setStatus(SessionStatus.SHORT_BREAK);
        setTimeLeft(settings.shortBreak * 60);
      }
    } else {
      setStatus(SessionStatus.WORK);
      setTimeLeft(settings.workDuration * 60);
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      switchSession();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    status,
    timeLeft,
    isRunning,
    completedSessions,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};