var gTemp = null;
var gHum = null;

document.addEventListener("DOMContentLoaded", () => {

    // ===== GAUGE TEMPERATURA =====
    gTemp = new JustGage({
        id: "gaugeTemp",
        value: 0,
        min: 0,
        max: 60,
        label: "",
        humanFriendly: true,
        humanFriendlyDecimal: 1,
        gaugeWidthScale: 0.7,
        levelColors: ["#4caf50", "#ffc107", "#f44336"]
    });

    // ===== GAUGE HUMEDAD =====
    gHum = new JustGage({
        id: "gaugeHum",
        value: 0,
        min: 0,
        max: 100,
        label: "",
        humanFriendly: true,
        humanFriendlyDecimal: 1,
        gaugeWidthScale: 0.7,
        levelColors: ["#2196f3", "#00bcd4", "#3f51b5"]
    });

    actualizar();
});


function actualizar() {

    // ---------- TEMPERATURA ----------
    $.get("/api/temperatura", (data) => {
        let t = parseFloat(data.valor);
        gTemp.refresh(t);

        // 🔥 AGREGA °C JUNTO AL NÚMERO DENTRO DEL GAUGE 🔥
        document.querySelector("#gaugeTemp .value").innerHTML = t.toFixed(1) + " °C";

        $("#tempVal").text(t.toFixed(2) + " °C");
    });


    // ---------- HUMEDAD ----------
    $.get("/api/humedad", (data) => {
        let h = parseFloat(data.valor);
        gHum.refresh(h);

        // 🔥 AGREGA % JUNTO AL NÚMERO DENTRO DEL GAUGE 🔥
        document.querySelector("#gaugeHum .value").innerHTML = h.toFixed(1) + " %";

        $("#humVal").text(h.toFixed(2) + " %");

        evaluarEstado();
    });

    setTimeout(actualizar, 1200);
}



// ---------- ESTADO ----------
function evaluarEstado() {
    let t = parseFloat($("#tempVal").text());
    let h = parseFloat($("#humVal").text());
    let estado = $("#estado");

    if (h > 60) {
        estado.text("Humedad alta: Foco encendido").css("color", "#d32f2f");
    }
    else if (t <= 27) {
        estado.text("Temperatura baja: Secuencia general").css("color", "#1976d2");
    }
    else if (t > 27 && t <= 30) {
        estado.text("Temperatura templada: PWM respiración").css("color", "#ffa000");
    }
    else if (t > 30) {
        estado.text("Temperatura alta: Secuencia caliente").css("color", "#d84315");
    }
}
