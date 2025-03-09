import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);


  const capitalizeText = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }
  async function updateNews() {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setarticles(parseData.articles);
    settotalResults(parseData.totalResults);
    setloading(false);
    props.setProgress(100);
  }
  useEffect(() => {
    updateNews();
    document.title = `News App -  ${capitalizeText(props.category)}`
  }, []);
  const fetchMoreData = async () => {
    setpage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    let parseData = await data.json();
    setarticles(articles.concat(parseData.articles));
    settotalResults(parseData.totalResults);
    setloading(false);
  };
    return (
      <>
        <h1 className='text-center' style={{margin : '19px 0', marginTop: '77px'}}>News - Top HeadLines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loading && <Spinner />}
        >
          <div className="container my-3">
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-3" key={element.url} >
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>


      </>
    )
}
