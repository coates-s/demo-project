// eslint-disable-next-line no-unused-vars
import React, { useEffect , useState} from 'react'
import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
  const { id } = useParams();
  let [article, setArticle] = useState();
  
  useEffect (()=>{

    async function populate(){
      let result = await fetch(`http://localhost:3000/articles/${id}`);
      if (result.ok){
        let json = await result.json();
        setArticle(json.data);
      }
    }
    populate();

  }, [id])

  if(article){
      return (
    <article>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <img src="https://picsum.photos/seed/picsum/400/300" alt="" />

      <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.</p>
      <p>He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.
</p>
<p>His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me? " he thought. It wasn't a dream.
</p>
<p>His room, a proper human room although a little too small, lay peacefully between its four familiar walls.
</p>
<p>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops
</p>


    </article>
  );
  } else {
    return <div>
       Loading
    </div>
  }


}

export default ArticleDetail;
