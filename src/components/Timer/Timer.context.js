/* eslint-disable react/no-multi-comp */
// @flow
import * as React from 'react';

export interface TimerContext {
  timer: number,
  isEngaged: boolean,
  startTimer: () => void,
  stopTimer: () => void,
  resetTimer: () => void,
  addTimer: (addTime: number) => void,
}

type State = {
  timer: number,
  isEngaged: boolean
}

type Props = {
  children: any
}

export const DEFAULT_TIMER_STATE = {
  timer: 60,
  isEngaged: false
};

const { Provider, Consumer }: any = React.createContext({ ...DEFAULT_TIMER_STATE });

export class TimerProvider extends React.Component<Props, State> {
  state = { ...DEFAULT_TIMER_STATE };

  intervalId: IntervalID

  startTimer = () => {
    this.setState({ isEngaged: true });
    this.intervalId = setInterval(() => (
      this.setState((previousState) => ({
        timer: --previousState.timer
      }
      ))
    ), 1000);
  }

  stopTimer = () => {
    this.setState((previousState) => ({
      ...previousState,
      isEngaged: false
    }), () => {
      clearInterval(this.intervalId);
    });
  }

  resetTimer = () => {
    this.stopTimer();
    this.setState({ timer: DEFAULT_TIMER_STATE.timer });
  }

  addTimer = (addedTime: number) => {
    clearInterval(this.intervalId);
    this.setState((previousState) => {
      const newtime = previousState.timer + addedTime;
      return ({
        timer: newtime > 60 ? 60 : newtime
      })
      ;
    },
    this.startTimer);
  }

  render() {
    return (
      <Provider value={{
        timer: this.state.timer,
        isEngaged: this.state.isEngaged,
        startTimer: this.startTimer,
        stopTimer: this.stopTimer,
        resetTimer: this.resetTimer,
        addTimer: this.addTimer
      }}>
        {this.props.children}
      </Provider>
    );
  }
}

class TimerConsumer extends React.Component<Props> {
  render() {
    return <Consumer>{this.props.children}</Consumer>;
  }
}

export const withTimer = (Component: any) => (props: any) => (
  <TimerConsumer>
    {(context) => <Component {...props} {...context}/>}
  </TimerConsumer>
);
