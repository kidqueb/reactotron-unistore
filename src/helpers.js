import dlv from "dlv";

/**
 * For each path we're subscribed to, get the values after the latest state change.
 * @param {array} paths
 * @param {object} state
 * @param {array} changes
 */
export function getChanges(paths, state, changes = []) {
  for (let index = 0, total = paths.length; index < total; index++) {
    const path = paths[index];
    const actualPath = path.endsWith(".*") ? path.replace(".*", "") : path;
    const isRoot = ["", "*", ".*", "root", "root.*"].indexOf(path) > -1;
    const value = isRoot ? state : dlv(state, actualPath);

    changes.push({ path, value });
  }

  return changes;
}

/**
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
