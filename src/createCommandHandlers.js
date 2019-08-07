import { getChanges, getActionValues } from "./helpers";

export default function createCommandHandlers(store, reactotron) {
  let storeSub, clientSubs = [];
  const restoreState = store.action((_, state) => state);

  return {
    // "state.keys.request": res => {
    //   console.log(res);
    //   const state = store.getState();
    // },

    "state.values.subscribe": ({ payload }) => {
      clientSubs = payload.paths

      // handle initial paths from the client
      if (payload.paths) {
        const changes = getChanges(clientSubs, store.getState());
        reactotron.stateValuesChange(changes);
      }

      // subscribe to handle changes to our subscribed paths
      if (!storeSub) store.subscribe((state, action) => {
        const name = (action && action.name) || "Reactotron/DISPATCH";
        const changes = getChanges(clientSubs, state);

        getActionValues(state, action).then(actionValues => {
          reactotron.stateActionComplete(name, actionValues);
          reactotron.stateValuesChange(changes);
        });
      });
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
