import net from "net"
// import fs from "fs"
const HOST = "localhost"
const PORT = 3000

// function createServer(connectionListener?: ((socket: net.Socket) => void) | undefined): net.Server (+1 overload)
const connectionListener = (socket: net.Socket) => {
  console.log("conected: " + socket.remoteAddress + ":" + socket.remotePort)
  socket.on("data", (data) => {
    console.log("DATA " + socket.remoteAddress + ": " + data)
    // sock.write('Hey client, You said "' + data + '"');
    socket.pipe(process.stdout)
    socket.end()
  })
}

const server: net.Server = net.createServer(connectionListener)

server.listen(PORT, HOST)

console.log("Server listening on " + HOST + ":" + PORT)
