const { Messages, ProtocolError } = require('./errors')

function convertIntToLittleEndianBuffer (n) {
  const bytes = []
  for (let i = 0; i < 4; i++) {
    const byte = n % 256
    bytes.push(byte)
    n = Math.floor(n / 256)
  }
  return Buffer.from(bytes)
}

function convertLittleEndianBufferToInt (buffer) {
  let n = buffer[0]
  n += buffer[1] * 256
  n += buffer[2] * 65536
  n += buffer[3] * 16777216
  return n
}

class Reader {
  constructor () {
    this.buffer = Buffer.alloc(0)
    this.handlers = []
  }

  read (count) {
    return new Promise((resolve, reject) => {
      if (count <= 0) {
        resolve(Buffer.alloc(0))
        return
      }
      if (count <= this.buffer.length) {
        const result = this.buffer.slice(0, count)
        this.buffer = this.buffer.slice(count)
        resolve(result)
        return
      }
      this.handlers.push((cancel) => {
        if (cancel) {
          reject(new ProtocolError(Messages.INCOMPLETE_DATA))
          return false
        }
        if (count <= this.buffer.length) {
          const result = this.buffer.slice(0, count)
          this.buffer = this.buffer.slice(count)
          resolve(result)
          return true
        } else {
          return false
        }
      })
    })
  }

  append (buffer) {
    this.buffer = Buffer.concat([this.buffer, buffer])
    while (this.handlers.length > 0) {
      const handler = this.handlers[0]
      if (handler(false)) {
        this.handlers.shift()
      } else {
        break
      }
    }
  }

  close () {
    for (const handler of this.handlers) {
      handler(true)
    }
    this.handlers = []
    this.buffer = Buffer.alloc(0)
  }
}

module.exports = {
  convertIntToLittleEndianBuffer,
  convertLittleEndianBufferToInt,
  Reader
}
