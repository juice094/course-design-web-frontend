/**
 * 数值千分位格式化
 */
export function formatNumber(val: number): string {
  return val.toLocaleString('zh-CN')
}

/**
 * 日期格式化
 */
export function formatDate(date: Date | string | number, fmt = 'yyyy-MM-dd'): string {
  const d = new Date(date)
  const o: Record<string, number> = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds()
  }
  // SAFETY: 使用显式正则捕获替代废弃的 RegExp.$1
  const yearMatch = fmt.match(/(y+)/)
  if (yearMatch) {
    fmt = fmt.replace(yearMatch[0], String(d.getFullYear()).slice(4 - yearMatch[0].length))
  }
  for (const [k, v] of Object.entries(o)) {
    const match = fmt.match(new RegExp(`(${k})`))
    if (match) {
      const padded = v < 10 ? `0${v}` : v
      fmt = fmt.replace(match[0], String(padded).slice(0, match[0].length))
    }
  }
  return fmt
}
