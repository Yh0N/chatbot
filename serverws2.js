const WebSocket = require('ws');

const PORT = 8095;
const wss = new WebSocket.Server({ port: PORT });

console.log(`Servidor WebSocket corriendo en ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    // Enviar mensaje cada 3 segundos
    const interval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(`🕒 Hora del servidor: ${new Date().toLocaleTimeString()}`);
        }
    }, 3000);

    // Manejar cierre de conexión
    ws.on('close', () => {
        console.log('Cliente desconectado');
        clearInterval(interval); // Detener el intervalo
    });

    // Manejo de errores
    ws.on('error', (error) => {
        console.error(`Error en la conexión: ${error.message}`);
    });
});