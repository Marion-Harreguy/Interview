const logMiddleware = (store) => (next) => (action) => {
  next(action);
  // Allow actions only if user is connected
};

export default logMiddleware;
