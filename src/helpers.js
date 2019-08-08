export const ROOT_VALS = ["", "*", ".*", "root", "root.*"];

/**
 * @name getChanges
 * For each path we're subscribed to, get the values after the latest state change.
 * @param {array} paths
 * @param {object} state
 * @param {array} changes
 */
export function getChanges(paths = [], state = {}, changes = []) {
  if (paths.length === 0) return changes;

  for (let index = 0, total = paths.length; index < total; index++) {
    const path = paths[index];
    const value = getPathState(path, state);

    if (value) changes.push({ path, value });
  }

  return changes;
}

/**
 * @name getActionValues
 * Since we recieve a function instead of a redux structured action object
 * we have to call the function to get the object it returns in order to
 * determine what the params may have been. Kind've assumes it's just
 * setting state recieved instead of executing calls based on params =/
 * @param {object} state
 * @param {function} action
 */
export async function getActionValues(state, action) {
  if (!action) return false;

  const actionResponse = await action()
  const actionKeys = actionResponse ? Object.keys(actionResponse) : [];

  let actionValues = {};
  for (let index = 0; index < actionKeys.length; index++) {
    const key = actionKeys[index];
    actionValues[key] = state[key];
  }

  return actionValues;
}

/**
 * @name getPathState
 * Calls getPathObj to get the state at a specific path, but accounts for
 * our root keywords and actual path since idk if getPathObj can use .* ha
 * @param {string} path
 * @param {object} state
 */
export function getPathState(path, state) {
  return isPathRoot(path) ? state : getPathObj(state, path);
}

/**
 * @name getPathObj
 * Get the value/object at a specific path in the state tree.
 * Completely ripped off from https://github.com/infinitered/reactotron-redux
 * @param {object} state
 * @param {string} path
 */
export function getPathObj(state, path) {
  if (!path) return state;
  const splitPaths = path.split(".");

  let pathObj = state;
  for (let i = 0; i < splitPaths.length; i++) {
    const currentPath = splitPaths[i];
    if (currentPath !== "*") pathObj = pathObj[currentPath];

    if (i < splitPaths.length - 1 && typeof pathObj !== "object") {
      pathObj = undefined;
      break;
    }
  }

  return pathObj;
}

/**
 * @name isPathRoot
 * Determines if the path is one of our predetermined root paths.
 * @param {string} path
 */
export function isPathRoot(path) {
  return ROOT_VALS.indexOf(path) > -1;
}
