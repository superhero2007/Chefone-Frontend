export default fn =>
  function(args, cb) {
    const res = fn(this, args, cb);

    if (res === undefined) {
      return Promise.resolve();
    }
    return res;
  };
