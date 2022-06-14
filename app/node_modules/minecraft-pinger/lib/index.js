/*
 * The MIT License (MIT)
 * Copyright © 2016 Dennis Bruner
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const net = require('net')
const dns = require('dns')
const {
  PacketDecoder,
  createHandshakePacket,
  createPingPacket
} = require('./packet')

const ping = module.exports.ping = (hostname, port, callback) => {
  checkSrvRecord(hostname)
    .then(openConnection, _ => openConnection({ hostname, port }))
    .then(data => callback(null, data))
    .catch(callback)
}

module.exports.pingPromise = (hostname, port) => {
  return new Promise((resolve, reject) => {
    ping(hostname, port, (error, result) => {
      error ? reject(error) : resolve(result)
    })
  })
}

function openConnection (address) {
  const { hostname, port } = address

  return new Promise((resolve, reject) => {
    let connection = net.createConnection(port, hostname, () => {
      // Decode incoming packets
      let packetDecoder = new PacketDecoder()
      connection.pipe(packetDecoder)

      // Write handshake packet
      connection.write(createHandshakePacket(hostname, port))

      packetDecoder.once('error', error => {
        connection.destroy()
        clearTimeout(timeout)
        reject(error)
      })

      packetDecoder.once('packet', data => {
        // Write ping packet
        connection.write(createPingPacket(Date.now()))

        packetDecoder.once('packet', ping => {
          connection.end()
          clearTimeout(timeout)
          data.ping = ping
          resolve(data)
        })
      })
    })

    // Destroy on error
    connection.once('error', error => {
      connection.destroy()
      clearTimeout(timeout)
      reject(error)
    })

    // Destroy on timeout
    connection.once('timeout', () => {
      connection.destroy()
      clearTimeout(timeout)
      reject(new Error('Timed out'))
    })

    // Packet timeout (10 seconds)
    let timeout = setTimeout(() => {
      connection.end()
      reject(new Error('Timed out (10 seconds passed)'))
    }, 10000)
  })
}

function checkSrvRecord (hostname) {
  return new Promise((resolve, reject) => {
    if (net.isIP(hostname) !== 0) {
      reject(new Error('Hostname is an IP address'))
    } else {
      dns.resolveSrv('_minecraft._tcp.' + hostname, (error, result) => {
        if (error) {
          reject(error)
        } else if (result.length === 0) {
          reject(new Error('Empty result'));
        } else {
          resolve({
            hostname: result[0].name,
            port: result[0].port
          })
        }
      })
    }
  })
}
