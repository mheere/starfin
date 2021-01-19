import { StreamUpdate } from "./StreamUpdate";

export interface Stream<T> {
  start(): void,
  stop(): void,
  onUpdate: ((updates: Array<StreamUpdate<T>>) => void) | undefined
}