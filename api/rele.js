export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    // IMPORTANTE: leer body como JSON
    let body = "";
    await new Promise(resolve => {
        req.on("data", chunk => body += chunk);
        req.on("end", resolve);
    });

    let json = {};
    try {
        json = JSON.parse(body);
    } catch (e) {
        return res.status(400).json({ error: "Body inválido o no es JSON" });
    }

    const comando = json.comando;

    const accessToken = process.env.PARTICLE_ACCESS_TOKEN;
    const deviceID = process.env.PARTICLE_DEVICE_ID;

    if (!accessToken || !deviceID) {
        return res.status(500).json({ error: "Variables privadas no configuradas en Vercel" });
    }

    if (!comando) {
        return res.status(400).json({ error: "Falta parámetro 'comando'" });
    }

    const url = `https://api.particle.io/v1/devices/${deviceID}/rele`;

    try {
        const particleRes = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `access_token=${accessToken}&params=${comando}`
        });

        const data = await particleRes.json();

        return res.status(200).json({
            ok: true,
            enviado: comando,
            respuesta: data
        });

    } catch (error) {
        return res.status(500).json({
            error: "Error enviando comando al Particle",
            detalle: String(error)
        });
    }
}
