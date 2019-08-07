import { getChanges } from './helpers'

export default function createCommandHandlers(store, reactotron) {
  let storeSub;
  const restoreState = store.action((_, state) => state);

  return {
    // "state.keys.request": res => {
    //   console.log(res);
    //   const state = store.getState();
    // },

    "state.values.subscribe": ({ payload }) => {
      // handle initial paths from the client
      if (payload.paths) {
        const changes = getChanges(payload.paths, store.getState());
        reactotron.stateValuesChange(changes);
      }

      function handler(state, action) {
        const name = (action && action.name) || "Reactotron/DISPATCH";
        const changes = getChanges(payload.paths, state);

        reactotron.stateActionComplete(name, state);
        reactotron.stateValuesChange(changes);
      }

      // subscribe to handle changes to our subscribed paths
      if (!storeSub) store.subscribe(handler);
    },

    "state.action.dispatch": ({ payload }) => {
      store.setState(payload.action);
    },

    "state.backup.request": () => {
      const state = store.getState();
      reactotron.stateBackupResponse(state);
    },

    "state.restore.request": ({ payload }) => {
      restoreState(payload.state);
    }
  };
}
