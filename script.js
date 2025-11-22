async function enviarComando(comando) {
    try {
        const res = await fetch("/api/rele", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comando })
        });

        const data = await res.json();

        if (res.ok && data.ok) {
            document.getElementById("estado").textContent =
                comando === "on" ? "Foco ENCENDIDO" : "Foco APAGADO";

            console.log("Comando enviado:", data);
        } else {
            document.getElementById("estado").textContent =
                "Error enviando comando al servidor";

            console.error("Error:", data);
        }
    } catch (error) {
        console.error(error);
        document.getElementById("estado").textContent =
            "Error conectando con el servidor";
    }
}

document.getElementById("btnOn").addEventListener("click", () => enviarComando("on"));
document.getElementById("btnOff").addEventListener("click", () => enviarComando("off"));
