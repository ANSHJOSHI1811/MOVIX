import React,{useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './heroBanner.scss'

import { useSelector } from 'react-redux/es/hooks/useSelector';
import useFetch from '../../../hooks/useFetch';
import Img from "../../../components/lazyLoadImage/Img"
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

function HeroBanner() {
  const [background,setBackground] = useState("");  //? Built a BG IMG-fetching Hook with API integration
  const [query,setQuery] = useState("");
  const navigate = useNavigate();
  const {url} =useSelector((state)=>state.home)
  const {data,loading}= useFetch("/movie/upcoming")

 useEffect(()=>{
 const bg =url.backdrop + data?.results?.[Math.floor(Math.random()*20)].backdrop_path ;
 setBackground(bg);
 },[data])
  const searchQueryHandler = (event)=>{            //?HITS API only if Query>0 and key ==== Enter
    if(event.key==="Enter" && query.length>0){
        navigate(`/search/${query}`)              //*Navigate to search on Enter 
    }
  }
  return (
  <div className="heroBanner">

   {!loading && <div className="backdrop-img"><Img src={background}/></div>}

<div className="opacity-layer"></div>
   <ContentWrapper>  <div className="heroBannerContent">
        <span className="title">Welcome</span>
        <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.  </span>
        <div className="searchInput">
          <input type="text" 
          placeholder='Search for a Movie or TV show...'
          onChange={(event)=>setQuery(event.target.value)}
          onKeyUp={searchQueryHandler}
          />
          <button>Search</button>
        </div>
      </div></ContentWrapper>
   
  </div>
  )
}

export default HeroBanner