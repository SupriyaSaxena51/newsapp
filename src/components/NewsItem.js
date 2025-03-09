import React from 'react';
import news_image from './news-image.jpg'

export default function NewsItem(props) {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className='my-3'>
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0 }}>
                    <span className="badge rounded-pill bg-danger" style={{ left: "93%", zIndex: "1" }}>{source}</span>
                </div>
                <img src={imageUrl ? imageUrl : news_image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description ? description : "News"}...</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toLocaleString()}</small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-custom" rel="noreferrer">Read More</a>
                </div>
            </div>
        </div>
    )
}
