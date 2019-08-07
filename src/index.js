import { getChanges } from './helpers'

export default store => {

  return tron => {
    const restoreState = store.action((_, state) => state)

    const Handlers = {
      'state.keys.request': (res) => {
        console.log(res)
        const state = store.getState()
      },

      'state.values.subscribe': ({ payload }) => {
        // handle initial paths from the client
        if (payload.paths) {
          const changes = getChanges(payload.paths, store.getState());
          tron.stateValuesChange(changes);
        }

        // subscribe to handle changes to our subscribed paths
        store.subscribe((state, action) => {
          const name = (action && action.name) || 'Reactotron/DISPATCH';
          const changes = getChanges(payload.paths, state)

          tron.stateActionComplete(name, state);
          tron.stateValuesChange(changes);
        });
      },

      'state.action.dispatch': ({ payload }) => {
        store.setState(payload.action)
      },

      "state.backup.request": () => {
        const state = store.getState()
        tron.stateBackupResponse(state)
      },

      "state.restore.request": ({ payload }) => {
        restoreState(payload.state)
      }
    }

    return {
      onCommand: res => {
        const handler = Handlers[res.type]
        handler && handler(res)
      }
    };
  };
};
