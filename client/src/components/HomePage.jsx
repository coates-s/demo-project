//import React from 'react'

import { useEffect, useState } from "react";
import Loading from './Loading';
import Article from "./Article";


function ArticleList({ articles }){
  console.log(articles);
  let display = (articles.length !== 0) ?
    articles.map( a=> <Article key={a.id} article={a}/>):
    <h3>No Results Found</h3> ;
  return (
    <>
        <h4>Articles ({ articles.length})</h4>
        {display}
    </>

  )
}
export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [articles, setArticles] = useState([]);
  useEffect( ()=>{
    async function dataFetch () {
      let response = await fetch("http://localhost:3000/articles/");
      if (response.ok) {
        let json = await response.json();
        setArticles(json.data);
        setLoaded(true);
      }
    }
    dataFetch();
}, [])
  return (
    <div>
      <h2>Home Page </h2>
      {(!loaded) ? <Loading a="a"/>: 
        <ArticleList articles={articles} />}
    </div>
  )
}
