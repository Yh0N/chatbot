const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = async function(event) {
    try {
        const text = await event.data.text();
        const messageElement = document.createElement("p");
        messageElement.textContent = text;
        document.body.appendChild(messageElement);
    } catch (err) {
        console.error("⚠️ Error al leer el Blob:", err);
    }
};

socket.onopen = () => console.log("Conectado al servidor WebSocket");
socket.onclose = () => console.log(" Desconectado del servidor WebSocket");
socket.onerror = (error) => console.error("Error en la conexión WebSocket:", error);

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    if (message) {
        socket.send(message);
        input.value = ''; // Limpiar input
    }
}
