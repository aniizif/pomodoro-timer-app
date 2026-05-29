export const SessionStatus = {
  WORK: 'work',
  SHORT_BREAK: 'short_break',
  LONG_BREAK: 'long_break',
  IDLE: 'idle',
};

export const createSession = ({ workDuration, shortBreak, longBreak, sessionsBeforeLongBreak }) => {
  return {
    status: SessionStatus.IDLE,
    currentSession: 0,
    settings: {
      workDuration,
      shortBreak,
      longBreak,
      sessionsBeforeLongBreak,
    },
  };
};