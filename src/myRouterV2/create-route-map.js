/**
 * 添加路由表
 * @param {*} route
 * @param {*} pathList
 * @param {*} pathMap
 * @param {*} parentRecord
 */
const addRouteRecord = (route, pathList, pathMap, parentRecord) => {
  // 判断是否有父路由
  const path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path;

  const record = {
    path: path,
    component: route.component,
    parentRecord, // 如果是子路由的话，记录子路由的 parent record
  };

  if (!pathMap[path]) {
    pathList.push(path);
    pathMap[path] = record;
  }

  // 如果有子路由，递归添加到对应的 pathList 和 pathMap 中
  if (route.children) {
    route.children.forEach(childRoute => {
      addRouteRecord(childRoute, pathList, pathMap, record);
    });
  }
};

export default function createRouteMap(routes, pathList = [], pathMap = {}) {
  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap);
  });

  return {
    pathList,
    pathMap,
  };
}
