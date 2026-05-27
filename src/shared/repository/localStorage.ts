export interface LocalStorageRepo<T> {
  load(): T
  save(data: T): void
  clear(): void
}

/**
 * 创建基于 localStorage 的数据仓库。
 *
 * @param key — localStorage 键名
 * @param fallback — 当无缓存或解析失败时的回退数据工厂
 * @param merge — 可选：将解析后的原始数据合并为完整结构（处理字段新增/缺失）
 */
export function createLocalStorageRepo<T>(
  key: string,
  fallback: () => T,
  merge?: (parsed: T) => T,
): LocalStorageRepo<T> {
  function load(): T {
    try {
      const raw = localStorage.getItem(key)
      if (raw) {
        const parsed = JSON.parse(raw) as T
        return merge ? merge(parsed) : parsed
      }
    } catch {
      // 解析失败静默回退，避免阻塞渲染
    }
    return fallback()
  }

  function save(data: T): void {
    localStorage.setItem(key, JSON.stringify(data))
  }

  function clear(): void {
    localStorage.removeItem(key)
  }

  return { load, save, clear }
}
