import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'

const Player = () => {


  const {id} = useParams();

  const [apiData, setApiData] = useState({
    name : "",
    key : "",
    published_at : "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmFmNjFiMDExZDZkM2Q0MzVmNjAyMGI4M2MwYzAzZCIsIm5iZiI6MTc0OTIyMTA4Ni41NzksInN1YiI6IjY4NDJmZWRlNTU4ZGYwYmI3ODFiMDY5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o88PalkR0uBpD_oJ3Ilst23xNp-wQ4naSvBT8NmORr0'
    }
  };
  
  useEffect(()=> {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])



  return (
    <div className='player'>
      <Link to={`/`}> <img src={back_arrow_icon} alt="" /> </Link>
     
      <iframe 
      width='90%' 
      height='90%'
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='Trailer'
      frameBorder='0' 
      allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player