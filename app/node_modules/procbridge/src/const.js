const PB_FLAG = Buffer.from('pb', 'utf8')
const RESERVED = Buffer.from([0x00, 0x00])

const Version = {
  V1_0: Buffer.from([0x01, 0x00]),
  V1_1: Buffer.from([0x01, 0x01]),
  current () {
    return this.V1_1
  }
}

const StatusCode = {
  REQUEST: 0,
  GOOD_RESPONSE: 1,
  BAD_RESPONSE: 2
}

const Keys = {
  METHOD: 'method',
  PAYLOAD: 'payload',
  MESSAGE: 'message'
}

module.exports = {
  PB_FLAG,
  RESERVED,
  Version,
  StatusCode,
  Keys
}
