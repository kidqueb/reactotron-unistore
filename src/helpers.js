import dlv from "dlv";

export const ROOT_VALS = ["", "*", ".*", "root", "root.*"]

/**
 * For each path we're subscribed to, get the values after the latest state change.
 * @param {array} paths
 * @param {object} state
 * @param {array} changes
 */
export function getChanges(paths = [], state = {}, changes = []) {
  if (paths.length === 0) return changes;

  for (let index = 0, total = paths.length; index < total; index++) {
    const path = paths[index];
    const value = getPathState(path, state)

    if (value) changes.push({ path, value });
  }

  return changes;
}


/**
 * Since we recieve a function instead of a redux structured action object
 * we have to call the function to get the object it returns in order to
 * determine what the params may have been. Kind've assumes it's just
 * setting state recieved instead of executing calls based on params =/
 * @param {object} state
 * @param {function} action
 */
export async function getActionValues(state, action) {
  if (!action) return false;
  const actionKeys = Object.keys(await action());

  let actionValues = {};
  for (let index = 0; index < actionKeys.length; index++) {
    const key = actionKeys[index];
    actionValues[key] = state[key];
  }

  return actionValues;
}


/**
 * Trims the .* off the end of a path to get its actual key to input to dlv.
 * @param {string} path
 */
export function getActualPath(path) {
  return path && path.endsWith(".*") ? path.replace(".*", "") : path;
}


/**
 * Determines if the path is one of our predetermined root paths.
 * @param {string} path
 */
export function isPathRoot(path) {
  return ROOT_VALS.indexOf(path) > -1
}


/**
 * Calls dlv to get the state at a specific path, but accounts for
 * our root keywords and actual path since idk if dlv can use .* ha
 * @param {string} path
 * @param {object} state
 */
export function getPathState(path, state) {
  const actualPath = getActualPath(path)
  const isRoot = isPathRoot(path)

  return isRoot ? state : dlv(state, actualPath)
}
