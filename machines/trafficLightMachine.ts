import { createMachine } from "xstate";

type TrafficLightEvent = { type: "NEXT" };

type TraffiLightState =
  | { value: "green"; context: undefined }
  | { value: "yellow"; context: undefined }
  | { value: "red"; context: undefined };

export const trafficLightMachine = createMachine<
  undefined, // We don’t have context, so we type it as undefined
  TrafficLightEvent,
  TraffiLightState
>({
  id: "trafficLight",
  initial: "red",
  states: {
    green: {
      on: { NEXT: "yellow" }
    },
    yellow: {
      on: { NEXT: "red" }
    },
    red: {
      on: { NEXT: "green" }
    }
  }
});
