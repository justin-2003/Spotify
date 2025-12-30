import React,{useEffect, useState} from 'react';
import "./homePage.css";

function HomePage(){
    const [user, setUser] = useState("");
    const [playlist, setPlaylist] = useState("");

    useEffect(() => {
        fetch("https://loop-07er.onrender.com/home/me")
        .then(res => res.json())
        .then(data => setUser(data));
    }, []);

    useEffect(() => {
        fetch("https://loop-07er.onrender.com/home/me/playlists")
        .then(res => res.json())
        .then(data => setPlaylist(data));
    }, []);
    
    console.log(playlist);
    
    return (
        <div className='home-page'>
            <div className='home-card'>
            {user ? (
                <h1>Hi {user.display_name}</h1>
            ) : (
                <h1>Loading...</h1>
            )}
  
        </div>
        </div>
    );
}

export default HomePage;