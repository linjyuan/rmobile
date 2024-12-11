import { root } from '@/utils';

/**
 * 防抖函数
 * @param {Function} func 函数
 * @param {number} wait 时间
 * @param {Record<string, any>} options 参数
 */
function debounce(func: Function, wait: number, options: Record<string, any>) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  const useRAF: boolean =
    !wait && wait !== 0 && typeof root.requestAnimationFrame === 'function';

  let lastArgs: any[],
    lastThis: Object,
    maxWait: number,
    result: Function,
    timerId: NodeJS.Timeout | number | undefined,
    lastCallTime: number;

  let lastInvokeTime: number = 0;
  let leading: boolean = false;
  let maxing: boolean = false;
  let trailing: boolean = true;

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function invokeFunc(time: number) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function startTimer(
    pendingFunc: Function,
    wait: number,
  ): NodeJS.Timeout | number {
    if (useRAF) {
      root.cancelAnimationFrame(timerId);
      return root.requestAnimationFrame(pendingFunc);
    }
    return setTimeout(() => pendingFunc(), wait);
  }

  function trailingEdge(time: number) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }
  function remainingWait(time: number) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time));
  }

  function leadingEdge(time: number) {
    lastInvokeTime = time;
    timerId = startTimer(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }

  function debounced(...args: any[]) {
    let lastArgs, lastThis, maxWait, result, timerId, lastCallTime;

    let lastInvokeTime: number = 0;
    let leading: boolean = false;
    let maxing: boolean = false;
    let trailing: boolean = true;

    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  return debounced;
}

export { debounce };
