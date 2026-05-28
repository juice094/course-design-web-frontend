import { createLocalStorageRepo } from '@/shared/repository/localStorage'

export interface PersistOptions<T> {
  key: string
  fallback: () => T
}

export function createPersistPlugin<T>(options: PersistOptions<T>) {
  const { key, fallback } = options
  const repo = createLocalStorageRepo<T>(key, fallback)

  return {
    load: () => repo.load(),
    save: (data: T) => repo.save(data),
  }
}
