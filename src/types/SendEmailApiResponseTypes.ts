export interface ApiResponse {
    success: boolean,
    message: string,
    error?: unknown,
    result?: unknown
}