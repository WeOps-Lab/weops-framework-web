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
    const traverseMenu = (menu) => {
        if (menu.children?.length) {
            for (const child of menu.children) {
                const result = traverseMenu(child) // 递归遍历子菜单
                if (result) {
                    return result // 如果找到了目标项，则直接返回结果
                }
            }
        }
        if (menu.id && !menu.isUrl && !menu.children?.length) {
            return menu.id // 返回具有 id 属性且 isUrl 为 false 的项的 id
        }
        return null // 如果当前菜单项不满足条件，则返回 null
    }
    for (const menu of menus) {
        const result = traverseMenu(menu) // 遍历每一个菜单项
        if (result) {
            return result // 如果找到了目标项，则直接返回结果
        }
    }

    return null // 如果没有满足条件的项，则返回 null 或其他默认值
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

export function filterMenuByIds(data = [], menus) {
    const menuSet = new Set(menus) // 将数组转为集合，使得查找更快
    const result = []
    for (const item of data) {
        // 只有在 item 的 id 在菜单集合中，item中含有isUrl为true的字段或者它有子项时，才进行处理
        if (menuSet.has(item.id) || item.isUrl || item.children) {
            // 如果 item 的 id 在菜单集合中，或者item中含有isUrl为true的字段，将其添加到结果中
            if (menuSet.has(item.id) || item.isUrl) {
                result.push(item)
            }
            // 如果 item 有子项，对其进行递归处理
            if (item.children) {
                const children = filterMenuByIds(item.children, menus)
                if (children.length > 0) {
                    result.push({...item, children: children})
                }
            }
        }
    }
    return result
}
