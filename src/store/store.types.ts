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
  intervalId: number,
  time: string
}

export type Timers = Array<Timer>