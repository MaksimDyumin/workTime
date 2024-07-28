export type TimerId = null | number

export type TimeBuffer = {
  hours: number;
  minutes: number,
  seconds: number,
}

export type Timer = {
  timeBuffer: TimeBuffer,
  dateWhenTimerStart: Date,
  targetDate: Date,
  intervalId: NodeJS.Timeout | number,
  time: string,
  name: string,
  isTimeStopped: boolean,
  timeWhenStopped: Date
}

export type Timers = Array<Timer>