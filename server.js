const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// ======== IA simulée pour le sucre ========
app.post("/api/advice", (req, res) => {
    const { sucre } = req.body;

    if (sucre === undefined) {
        return res.status(400).json({ error: "Taux de sucre requis" });
    }

    if (sucre < 70) {
        return res.json({ advice: "⚠️ Sucre trop bas. Mange un fruit ou du glucose." });
    }

    if (sucre > 180) {
        return res.json({ advice: "⚠️ Sucre trop élevé. Surveille ton insuline et hydrate-toi." });
    }

    return res.json({ advice: "✅ Taux normal. Continue comme ça." });
});


// ======== Sauvegarde des exercices (mémoire temporaire) ========
let progress = {};

app.post("/api/progress", (req, res) => {
    const { day, exercise } = req.body;

    if (!progress[day]) {
        progress[day] = [];
    }

    progress[day].push(exercise);

    res.json({ message: "Exercice enregistré", progress });
});

app.get("/api/progress/:day", (req, res) => {
    const day = req.params.day;
    res.json({ exercises: progress[day] || [] });
});


// ======== Lancement serveur ========
app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`);
});
