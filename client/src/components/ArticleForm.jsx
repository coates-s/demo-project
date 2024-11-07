
import React, { useContext } from 'react'
import UserContext from '../../UserContext';

const ArticleForm = () => {
  const xxx = useContext(UserContext);
  //console.log(xxx.actions.signIn());

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const form = new FormData(document.getElementById("formy"));
    console.log(form);

    const request = await fetch("http:////localhost:3000/articles/", {
      method: 'POST',
      body:  form,
      
    });
    console.log(await request.json());
  }
  return (
    <form id="formy" onSubmit={handleSubmit}>
      <label>Title:
          <input type="text" name="title" />
      </label>
      < br /> 
      <label>Status:
          <select name="status">
             <option value="draft">draft</option>
             <option value="published">published</option>
          </select>
      </label>
      <input type='submit' value="Save" />
    </form>
  )
}

export default ArticleForm
