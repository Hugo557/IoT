const accessToken = "dee0df19a954aeab90df14d8f812690726c582f1";
const deviceID = "0a10aced202194944a0674bc";
const url = `https://api.particle.io/v1/devices/${deviceID}/led`;

async function enviarComando(comando) {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `params=${comando}&access_token=${accessToken}`
        });

        document.getElementById("estado").textContent = 
            comando === "on" ? "LED encendido" : "LED apagado";

        console.log("Comando enviado:", comando);
    } catch (error) {
        console.error("Error enviando comando:", error);
        document.getElementById("estado").textContent = "Error enviando comando";
    }
}

document.getElementById("btnOn").addEventListener("click", () => enviarComando("on"));
document.getElementById("btnOff").addEventListener("click", () => enviarComando("off"));
