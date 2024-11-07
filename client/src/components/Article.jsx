// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const Article = ({article }) => {

  return (
    <div>
        <Link to={`/articles/${article._id}`} >
          <h3>{article.title}</h3>
        </Link>
        <img src="https://picsum.photos/300/200?random=1"/>
        <p><strong>{article.description} </strong></p>
    </div>
  )
}

export default Article
