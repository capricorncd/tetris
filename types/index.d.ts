/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-03 22:32
 */
export interface MessageData {
  code: number;
  msg: string;
}

export interface SquareOrigin {
  x: number;
  y: number;
}

export interface Options {
  container: string;
  ready: (data: MessageData) => void;
  error: (data: MessageData) => void;
}

export type NumberArray = number[];

export type ProgressHandler = (progress: number) => void;
