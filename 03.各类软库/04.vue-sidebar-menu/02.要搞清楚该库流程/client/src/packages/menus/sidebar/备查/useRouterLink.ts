// Adapted from vue-router-next
// See: https://github.com/vuejs/vue-router-next/blob/master/src/RouterLink.ts
import type { RouteLocationNormalized, RouteParams, RouteRecordNormalized } from "vue-router"

export function activeRecordIndex(route: RouteLocationNormalized, currentRoute: RouteLocationNormalized) {
  const { matched } = route
  const { length } = matched
  const routeMatched = matched[length - 1]

  const currentMatched = currentRoute.matched
  if (!routeMatched || !currentMatched.length) return -1
  const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched))
  if (index > -1) return index

  const parentRecordPath = getOriginalPath(matched[length - 2])
  return length > 1 &&
    getOriginalPath(routeMatched) === parentRecordPath &&
    currentMatched[currentMatched.length - 1]!.path !== parentRecordPath
    ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2]!))
    : index
}

export function isSameRouteLocationParams(a: RouteParams | RouteParams[], b: RouteParams | RouteParams[]) {
  if (Object.keys(a).length !== Object.keys(b).length) return false
  for (const key in a) {
    if (!isSameRouteLocationParamsValue(a[key], b[key])) return false
  }
  return true
}

export function includesParams(outer: RouteParams, inner: RouteParams) {
  for (const key in inner) {
    const innerValue = inner[key]
    const outerValue = outer[key]
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) return false
    } else {
      if (
        !Array.isArray(outerValue) ||
        outerValue.length !== innerValue!.length ||
        innerValue!.some((value, i) => value !== outerValue[i])
      ) {
        return false
      }
    }
  }
  return true
}

function getOriginalPath(record: RouteRecordNormalized | undefined) {
  return record ? (record.aliasOf ? record.aliasOf.path : record.path) : ""
}

function isSameRouteRecord(a: RouteRecordNormalized, b: RouteRecordNormalized) {
  return (a.aliasOf || a) === (b.aliasOf || b)
}

function isSameRouteLocationParamsValue(a: RouteParams[], b: RouteParams[]) {
  return Array.isArray(a) ? isEquivalentArray(a, b) : Array.isArray(b) ? isEquivalentArray(b, a) : a === b
}

function isEquivalentArray(a: RouteParams[], b: RouteParams[]) {
  return Array.isArray(b)
    ? a.length === b.length && a.every((value, i) => value === b[i])
    : a.length === 1 && a[0] === b
}
