import { useState } from "react";
import "./App.css";


function App() {
    const [input, setInput] = useState("");
    const [liste, setListe] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hata, setHata] = useState("");
    

async function filmAra(e) {
    e.preventDefault();
    if (input.trim() === "") {
        return ;  
    }
    setLoading(true);

    const yanit = await fetch("http://localhost:5000/api/movies?search=" + input);
    const veri = await yanit.json();

    console.log(veri);

    if(veri.Response === "True"){
        setListe(veri.Search);
        setHata("");
    }else{
        setListe([]);
        setHata("Aradığınız film bulunamadı...");
    }

    
    setLoading(false);
        
    
}

return (
    <div className="app-container">
        <h1 className="app-title">🎬 Film Arama Motoru</h1>
        <form onSubmit={filmAra} className="search-form">
        <input className="search-input" value = {input} onChange={function(e){
            setInput(e.target.value);
        }} placeholder="Lütfen bir film adi yaziniz..."/>
        <button type="submit" className="search-button">ARA</button>
        </form>
        {loading && <p className="status-text">Yükleniyor...</p>}
        {hata && <p className="error-text">{hata}</p>}
        
        <div className="movie-grid">
      {liste && liste.map(function(film) {
        return (
          <div key={film.imdbID} className="movie-card">
            <div className="poster-wrapper">
              <img 
                src={film.Poster !== "N/A" ? film.Poster : "https://via.placeholder.com/300x450?text=Afiş+Yok"} 
                alt={film.Title} 
              />
            </div>
            <div className="movie-info">
              <h3>{film.Title}</h3>
              <p>{film.Year}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
}
export default App;
