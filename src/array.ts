import { isArray, isUndef } from './is'
import { clone } from './object'

interface ArrayToTreeOptions {
  /**
   * 标识符字段
   * @default 'id'
   */
  idKey?: string
  /**
   * 父级字段
   * @default 'pid'
   */
  pidKey?: string
  /**
   * 子级字段
   * @default 'children'
   */
  childrenKey?: string
  /**
   * 排序字段
   * @default 'sort'
   */
  sortKey?: string
  /**
   * 排序方式
   * @default 'asc'
   */
  sortOrder?: 'asc' | 'desc'
}

/**
 * 数组转树
 * @example arrayToTree(array, {
 *  idKey: 'id',
 *  pidKey: 'pid',
 *  childrenKey: 'children',
 *  sortKey: 'sort',
 *  sortOrder: 'asc',
 * })
 */
export function arrayToTree<T extends Record<string, any>>(array: T[], options: ArrayToTreeOptions = {}) {
  const {
    idKey = 'id',
    pidKey = 'pid',
    childrenKey = 'children',
    sortKey = 'sort',
    sortOrder = 'asc',
  } = options || {}

  if (!isArray(array))
    return undefined

  array = clone(array)

  const result = []
  const nodeMap = new Map<string | number, T>()

  // 排序
  array.sort((a, b) => a[sortKey] - b[sortKey])

  if (sortOrder === 'desc')
    array.reverse()

  for (const node of array)
    nodeMap.set(node[idKey], { ...node, [childrenKey]: [] })

  for (const node of array) {
    // 最顶层节点
    if (isUndef(node[pidKey])) {
      result.push(nodeMap.get(node[idKey]))
    }
    else {
      // 思路：借助对象引用的思路，无论上下查找都可以被正确压入

      // 获取当前遍历节点的父节点
      const parentNode = nodeMap.get(node[pidKey])
      if (parentNode) {
        // 将当前节点放入父节点的子节点中
        parentNode[childrenKey].push(nodeMap.get(node[idKey]))
      }
    }
  }

  return result
}
