import { getChanges } from './helpers'

export default store => {
  return tron => {
    const Handlers = {
      'state.values.subscribe': ({ payload, type }) => {
        // handle initial paths from the client
        if (payload.paths) {
          const changes = getChanges(payload.paths, store.getState());
          tron.stateValuesChange(changes);
        }

        // subscribe to handle changes to our subscribed paths
        store.subscribe((state, action) => {
          const name = (action && action.name) || 'setState';
          const changes = getChanges(payload.paths, state)

          tron.stateActionComplete(name, state);
          tron.stateValuesChange(changes);
          return;
        });
      }
    }

    return {
      onCommand: res => Handlers[res.type](res)
    };
  };
};
