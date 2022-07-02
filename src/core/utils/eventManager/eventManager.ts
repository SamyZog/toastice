import type {
  Args,
  Callbacks,
  EventBus,
  Events,
} from "./eventManager.types";

const eventBus = {} as EventBus;

const subscribe = <E extends Events>(event: E, callback: Callbacks[E]) => {
  if (!eventBus[event]) eventBus[event] = new Set();

  const callbacks = eventBus[event];

  callbacks.add(callback);

  return () => {
    callbacks.delete(callback);

    if (callbacks.size === 0) delete eventBus[event];
  };
};

const emit = <E extends Events>(event: E, ...args: Args[E]) => {
  if (!eventBus[event]) return;

  const callbacks = eventBus[event];

  callbacks.forEach((cb) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cb(...args);
  });
};

export { emit, subscribe };
