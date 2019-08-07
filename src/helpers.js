import dlv from 'dlv'

export function getChanges(paths, state, changes = []) {
  for (let index = 0, total = paths.length; index < total; index++) {
    const path = paths[index];
    const actualPath = path.endsWith('.*') ? path.replace('.*', '') : path
    const value = dlv(state, actualPath);

    changes.push({ path, value });
  }

  return changes
}
