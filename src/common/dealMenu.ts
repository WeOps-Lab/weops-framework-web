export function removeItemsWithId(items, idsToRemove) {
    if (!items) return false
    for (let i = items.length - 1; i >= 0; i--) {
        if (idsToRemove.includes(items[i].id)) {
            items.splice(i, 1)
        }
        // 如果元素具有子元素children，则递归调用removeItemsWithId函数
        if (items[i]?.children?.length) {
            removeItemsWithId(items[i].children, idsToRemove)
        }
    }
}
// 按照层级顺序检查每层级的第一个是否具有url属性
export function findFirstUrl(menus) {
    const firstLevelItem = menus[0]
    let id = null
    if (firstLevelItem) {
        if (firstLevelItem.url) {
            id = firstLevelItem.id
        } else if (firstLevelItem.children?.[0]?.url) {
            id = firstLevelItem.children[0].id
        } else if (firstLevelItem.children?.[0]?.children?.[0]?.url) {
            id = firstLevelItem.children[0].children[0].id
        }
    }
    return id
}

export function hasPathInChildren(data, path) {
    // 遍历数组中的每个对象
    for (const item of data) {
        // 判断当前对象的 path 是否匹配
        if (item.url === path) {
            return true // 如果匹配，直接返回 true
        }
        // 判断当前对象是否有 children 属性且为非空数组
        if (item.children?.length) {
            // 递归调用 hasPathInChildren 函数检查子级数组
            if (hasPathInChildren(item.children, path)) {
                return true // 如果子级数组中存在匹配的 path，直接返回 true
            }
        }
    }
    // 如果遍历完整个数组都没有找到匹配的 path，返回 false
    return false
}

export function findIdsWithNoChildren(data, result = []) {
    for (const item of data) {
        if (!item.children || item.children.length === 0) {
            result.push(item.id)
        } else {
            findIdsWithNoChildren(item.children, result)
        }
    }
    return result
}

export function filterDataWithId(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (item.id === id) {
            return [item] // 返回包含id的项作为初始层级
        }
        if (item.children) {
            const result = filterDataWithId(item.children, id)
            if (result.length > 0) {
                return [{ ...item, children: result }] // 返回包含id的项及其子层级的新对象
            }
        }
    }
    return [] // 没有找到符合条件的项
}
