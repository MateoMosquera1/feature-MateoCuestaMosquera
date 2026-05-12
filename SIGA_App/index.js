const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

//Ruta principal 
app.get("/",(req, res) => {
    res.send("¡Bienvenido a mi web app con Express!");
});

//Ejemplo: consumir una API pública (Pókemon API)
app.get ("/pokemo                                                                                               n/:name", async (req,res) => {
    const { name } = req.params;
    try {
        const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        res.json({
            nombre: data.name,
            altura: data.height,
            peso: data.weight,
            tipo: data.types.map(t => t.type.name)
        });
    } catch (error) {
        res.status(500).json({error: "No se pudo obtener el Pokemón"});
    }
}); 

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})