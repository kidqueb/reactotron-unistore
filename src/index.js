import createCommandHandlers from './createCommandHandlers'

export default store => {
  return reactotron => {
    const handlers = createCommandHandlers(store, reactotron)

    return {
      onCommand: res => {
        const handler = handlers[res.type]
        handler && handler(res)
      }
    };
  };
};
