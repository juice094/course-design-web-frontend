export class ApiError extends Error {
  constructor(
    public code: number,
    message: string,
    public original?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
