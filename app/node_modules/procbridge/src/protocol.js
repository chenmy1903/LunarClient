const { Reader, convertIntToLittleEndianBuffer, convertLittleEndianBufferToInt } = require('./utils')
const { PB_FLAG, RESERVED, Version, Keys, StatusCode } = require('./const')
const { Messages, ProtocolError } = require('./errors')

function writeSocket (socket, statusCode, json) {
  // 1. FLAG
  socket.write(PB_FLAG)

  // 2. VERSION
  socket.write(Version.current())

  // 3. STATUS CODE
  socket.write(Buffer.from([statusCode]))

  // 4. RESERVED
  socket.write(RESERVED)

  // 5. LENGTH (little endian)
  const jsonText = JSON.stringify(json)
  socket.write(convertIntToLittleEndianBuffer(Buffer.byteLength(jsonText, 'utf8')))

  // 6. JSON
  socket.write(jsonText, 'utf8')
}

function writeRequest (socket, method, payload) {
  const body = {}
  if (method !== undefined && method !== null) {
    body[Keys.METHOD] = method
  }
  if (payload !== undefined && payload !== null) {
    body[Keys.PAYLOAD] = payload
  }
  writeSocket(socket, StatusCode.REQUEST, body)
}

function writeGoodResponse (socket, payload) {
  const body = {}
  if (payload !== undefined && payload !== null) {
    body[Keys.PAYLOAD] = payload
  }
  writeSocket(socket, StatusCode.GOOD_RESPONSE, body)
}

function writeBadResponse (socket, message) {
  const body = {}
  if (message !== undefined && message !== null) {
    body[Keys.MESSAGE] = message
  }
  writeSocket(socket, StatusCode.BAD_RESPONSE, body)
}

async function readSocket (socket) {
  const reader = new Reader()

  socket.on('data', data => {
    if (Buffer.isBuffer(data)) {
      reader.append(data)
    } else {
      reader.append(Buffer.from(data, 'utf8'))
    }
  })

  socket.on('close', data => {
    reader.close()
  })

  try {
    // 1. FLAG
    let buf = await reader.read(2)
    if (!buf.equals(PB_FLAG)) {
      throw new ProtocolError(Messages.UNRECOGNIZED_PROTOCOL)
    }

    // 2. VERSION
    buf = await reader.read(2)
    if (!buf.equals(Version.current())) {
      throw new ProtocolError(Messages.INCOMPATIBLE_VERSION)
    }

    // 3. STATUS CODE
    buf = await reader.read(1)
    const statusCode = buf[0]

    // 4. RESERVED
    await reader.read(2)

    // 5. LENGTH (little endian)
    buf = await reader.read(4)
    const len = convertLittleEndianBufferToInt(buf)

    // 6. JSON
    buf = await reader.read(len)
    try {
      const json = JSON.parse(buf.toString('utf8'))
      if (typeof json === 'object' && json !== null) {
        return {
          statusCode: statusCode,
          json: json
        }
      } else {
        throw new ProtocolError(Messages.INVALID_BODY)
      }
    } catch (err) {
      throw new ProtocolError(Messages.INVALID_BODY)
    }
  } finally {
    reader.close()
  }
}

async function readRequest (socket) {
  const { statusCode, json } = await readSocket(socket)
  if (statusCode !== StatusCode.REQUEST) {
    throw new ProtocolError(Messages.INVALID_STATUS_CODE)
  }
  let method = null
  let payload = null
  if (json[Keys.METHOD] !== undefined) {
    method = `${json[Keys.METHOD]}`
  }
  if (json[Keys.PAYLOAD] !== undefined) {
    payload = json[Keys.PAYLOAD]
  }
  return { method, payload }
}

async function readResponse (socket) {
  const { statusCode, json } = await readSocket(socket)
  let payload = null
  let message = null

  if (statusCode === StatusCode.GOOD_RESPONSE) {
    if (json[Keys.PAYLOAD] !== undefined) {
      payload = json[Keys.PAYLOAD]
    }
  } else if (statusCode === StatusCode.BAD_RESPONSE) {
    if (json[Keys.MESSAGE] !== undefined) {
      message = `${json[Keys.MESSAGE]}`
    }
  } else {
    throw new ProtocolError(Messages.INVALID_STATUS_CODE)
  }

  return { statusCode, payload, message }
}

module.exports = {
  writeRequest,
  writeGoodResponse,
  writeBadResponse,
  readRequest,
  readResponse
}
