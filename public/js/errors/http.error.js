export class HttpError extends Error {
  constructor (response, message) {
    super(message || `HTTP ${response.status} ${response.statusText}`)

    this.name = 'HttpError'
    this.status = response.status
    this.statusText = response.statusText
    this.url = response.url
    this.ok = response.ok
    this.headers = response.headers

    // keep the original response if needed
    this.response = response
  }
}
