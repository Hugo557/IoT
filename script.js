const accessToken = process.env.PARTICLE_ACCESS_TOKEN;
const deviceID = process.env.PARTICLE_DEVICE_ID;
const url = `https://api.particle.io/v1/devices/${deviceID}/rele`;


async function enviarComando(comando) {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `params=${comando}&access_token=${accessToken}`
        });

        document.getElementById("estado").textContent = 
            comando === "on" ? "Foco ENCENDIDO" : "Foco APAGADO";

        console.log("Comando enviado:", comando);
    } catch (error) {
        console.error("Error enviando comando:", error);
        document.getElementById("estado").textContent = "Error enviando comando";
    }
}

document.getElementById("btnOn").addEventListener("click", () => enviarComando("on"));
document.getElementById("btnOff").addEventListener("click", () => enviarComando("off"));
