import { StreamUpdateType } from "./StreamUpdateType";

export interface StreamUpdate<TUpdate> {
  update: TUpdate;
  type: StreamUpdateType;
}