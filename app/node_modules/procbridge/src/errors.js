const Messages = {
  UNRECOGNIZED_PROTOCOL: 'unrecognized protocol',
  INCOMPATIBLE_VERSION: 'incompatible protocol version',
  INCOMPLETE_DATA: 'incomplete data',
  INVALID_STATUS_CODE: 'invalid status code',
  INVALID_BODY: 'invalid body',
  UNKNOWN_SERVER_ERROR: 'unknown server error'
}

class ProtocolError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ProtocolError'
  }
}

class ServerError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ServerError'
  }
}

module.exports = { ProtocolError, ServerError, Messages }
