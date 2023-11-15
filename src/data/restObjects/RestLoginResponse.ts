export interface RestLoginResponse {
  token_type: string
  expires_in: string
  access_token: string
  refresh_token?: string
}
