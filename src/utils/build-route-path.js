//'/users/:id'

export function buildRoadPath(path) {
  const routeParamtersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParamtersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}