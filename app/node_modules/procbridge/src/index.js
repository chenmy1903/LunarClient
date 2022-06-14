const net = require('net')
const protocol = require('./protocol')
const { ServerError } = require('./errors')
const { StatusCode } = require('./const')

class Client {
  constructor (...args) {
    if (args.length === 2) {
      this.host = args[0]
      this.port = args[1]
    } else if (args.length === 1) {
      this.path = args[0]
    } else {
      throw new Error('illegal number of arguments')
    }
  }

  async request (method, payload) {
    const client = new net.Socket()
    const req = () => {
      protocol.writeRequest(client, method, payload)
    }
    if (this.path) {
      client.connect(this.path, req)
    } else {
      client.connect(this.port, this.host, req)
    }
    try {
      const { statusCode, payload, message } = await protocol.readResponse(client)
      if (statusCode === StatusCode.GOOD_RESPONSE) {
        return payload
      } else {
        throw new ServerError(message)
      }
    } finally {
      client.destroy()
    }
  }
}

class Server {
  constructor (...args) {
    this.server = null
    if (args.length === 3) {
      this.host = args[0]
      this.port = args[1]
      this.delegate = args[2]
    } else if (args.length === 2) {
      this.path = args[0]
      this.delegate = args[1]
    } else {
      throw new Error('illegal number of arguments')
    }
  }

  start () {
    if (this.server !== null) {
      return
    }
    this.server = net.createServer(async socket => {
      const { method, payload } = await protocol.readRequest(socket)
      let ret
      try {
        ret = this.delegate(method, payload)
      } catch (err) {
        protocol.writeBadResponse(socket, err.message || err)
        socket.destroy()
        return
      }

      if (ret !== undefined && ret !== null && typeof ret.then === 'function') {
        ret.then(result => {
          protocol.writeGoodResponse(socket, result)
          socket.destroy()
        }).catch(err => {
          protocol.writeBadResponse(socket, err.message || err)
          socket.destroy()
        })
      } else {
        protocol.writeGoodResponse(socket, ret)
        socket.destroy()
      }
    })

    try {
      if (this.path) {
        this.server.listen(this.path)
      } else {
        this.server.listen(this.port, this.host)
      }
    } catch (err) {
      this.server = null
      throw err
    }
  }

  stop () {
    if (this.server === null) {
      return
    }
    this.server.close()
    this.server = null
  }
}

module.exports = {
  Client, Server, ServerError
}
