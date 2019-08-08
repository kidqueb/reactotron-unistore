import { getPathState, getChanges, getActionValues } from "./helpers";

export default function createCommandHandlers(store, reactotron) {
  let storeSub,
    clientSubs = [];
  const restoreState = store.action((_, state) => state);

  return {
    "state.keys.request": ({ payload }) => {
      const state = getPathState(payload.path, store.getState());
      reactotron.stateKeysResponse(payload.path, Object.keys(state));
    },

    "state.values.request": ({ payload }) => {
      const state = getPathState(payload.path, store.getState());
      reactotron.stateValuesResponse(payload.path, state);
    },

    "state.values.subscribe": ({ payload }) => {
      clientSubs = payload.paths;

      // handle initial paths from the client
      if (payload.paths) {
        const changes = getChanges(clientSubs, store.getState());
        reactotron.stateValuesChange(changes);
      }

      // subscribe to handle changes to our subscribed paths
      if (!storeSub)
        store.subscribe((state, action) => {
          const name = (action && action.name) || "Reactotron/DISPATCH";
          const changes = getChanges(clientSubs, state);

          getActionValues(state, action).then(actionValues => {
            if (actionValues) {
              reactotron.stateActionComplete(name, actionValues);
            } else {
              reactotron.display({
                name: "UNISTORE",
                preview: "store.setState",
                value:
                  "Warning: The values of the action cannot be determined when store.setState is used to update state within an action. Think about returning an object instead.",
                important: true
              });
            }

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
