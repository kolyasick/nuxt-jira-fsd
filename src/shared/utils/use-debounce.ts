function useDebounce<T extends (...args: any[]) => any>(
  cb: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb.apply(this, args);
    }, delay);
  };
}

export default useDebounce;
