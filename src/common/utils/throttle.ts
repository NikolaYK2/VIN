export const throttle = <Args extends unknown[]>(cb: (...args: Args) => void, delay: number) => {
  let wait = false;

  return (...args: Args) => {
    if (wait) {
      return;
    }

    cb(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  };
};
