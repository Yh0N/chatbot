const WebSocket = require('ws');

const PORT = 8080;
const server = new WebSocket.Server({ port: PORT });

console.log(`✅ Servidor WebSocket corriendo en ws://localhost:${PORT}`);

server.on('connection', (socket, req) => {
    const clientAddress = req.socket.remoteAddress;
    console.log(`Nuevo cliente conectado desde ${clientAddress}`);

    socket.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
        
        // Reenviar el mensaje a todos los clientes conectados excepto al remitente
        server.clients.forEach(client => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log(`Cliente desconectado desde ${clientAddress}`);
    });

    socket.on('error', (error) => {
        console.error(`Error en la conexión: ${error.message}`);
    });
});