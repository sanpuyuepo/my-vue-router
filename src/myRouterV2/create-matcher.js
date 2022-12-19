import createRouteMap from "./create-route-map";
import createRoute from "./util/route";

export default function createMatcher(routes) {
  const { pathList, pathMap } = createRouteMap(routes);

  /**
   * 根据路由地址，匹配一个路由对象
   * @param {*} path
   * @returns
   */
  function match(path) {
    path = pathList.includes(path) ? path : "*";
    const record = pathMap[path];
    if (record) {
      return createRoute(record, path);
    }
    return createRoute(null, path);
  }

  // console.log(match("/music/pop"));

  /**
   * 动态添加路由规则
   * @param {*} routes
   */
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap);
  }
  return {
    match,
    addRoutes,
  };
}
