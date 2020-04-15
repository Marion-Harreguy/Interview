const logMiddleware = (store) => (next) => (action) => {
  next(action);
  console.log(action);
  // Allow actions only if user is connected
};

export default logMiddleware;
