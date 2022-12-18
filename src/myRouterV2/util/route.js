/**
 * 根据路由地址，创建 route 路由规则对象
 * @param {Object} record
 * @param {String} path
 * @returns
 */
export default function createRoute(record, path) {
  const matched = [];

  while (record) {
    matched.unshift(record);
    record = record.parentRecord;
  }

  return {
    matched,
    path,
  };
}
