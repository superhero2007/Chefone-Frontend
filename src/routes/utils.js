// @flow

export function errorLoading(error: string) {
  throw new Error(`Dynamic page loading failed: ${error}`);
}

export function loadRoute(cb: Function) {
  return (module: *) => {
    cb(null, module);
  };
}
