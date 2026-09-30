const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(cors());
require("dotenv").config();

app.get( "/" , (req, res) => {
    res.send("Backend çalışıyor!");
});

app.get("/api/movies", async(req, res) => {
    const arananFilm = req.query.search;
    console.log("Aranan film:", arananFilm);

    if(!arananFilm){
        return res.status(400).json({ 
            hata: "Lütfen aramak istediğiniz film adını 'search' parametresi olarak belirtin." 
        });
    }

    try{
    const apiKey = process.env.OMDB_API_KEY;
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${arananFilm}`);
    console.log(response.data);
    res.json(response.data);
    
    }
    catch (error) { 
        console.log("OMDb İsteğinde Hata Oluştu:", error.message);
        res.status(500).json({ hata: "Sunucu hatası: Film verileri çekilemedi." });
    }
   
});


app.listen(PORT, function(){
    console.log("Sunucu 5000 portunda çalışıyor...");
})

