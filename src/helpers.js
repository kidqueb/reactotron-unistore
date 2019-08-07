import dlv from 'dlv'
import diff from 'deep-diff'

export function getChanges(paths, state, changes = []) {
  for (let index = 0, total = paths.length; index < total; index++) {
    const path = paths[index];
    const actualPath = path.endsWith('.*') ? path.replace('.*', '') : path
    const value = dlv(state, actualPath);

    changes.push({ path, value });
  }

  return changes
}

export function getActionParams(oldState, newState) {
  let diffs = diff(oldState, newState)
  console.log(diffs)
  let params = {}

  // for (let index = 0; index < diffs.length; index++) {
  //   console.log(diffs[index])
  // }

  return params
}
