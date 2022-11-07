import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postService } from "../../utils/postService";

import "./post.css"

const PostEdit = () => {
  let navigate = useNavigate();
  const [text, setText] = useState([]);
  const [image, setImage] = useState([]);
  const [isLoad, setLoad] = useState(false)

  let { pid } = useParams()

  useEffect(() => {
    postService.getPost(pid)
      .then(res => {
        setText(res.data.post)
        setImage(res.data.imageUrl)
        setLoad(true)
      })
      .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChange = (e) => {
    setText(e.target.value);
  };

  const imageChange = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageUrl", image);
    formData.append("post", text);

    postService.modifyPost(pid, formData)
      .then(res => navigate('/'))
      .catch((err) => console.log(err));
  };

  if (!isLoad) {
    return <div>Loading ...</div>
  }

  return (
    <form className="form-edit" onSubmit={onSubmit} >
      <div className="group" >
        <label htmlFor="post">Modifiez votre texte</label>
        <textarea name="post" value={text} onChange={onChange}></textarea>
      </div>

      <div className="group">
        <label htmlFor="image">Votre image</label>
        <input type="file" name="image" onChange={imageChange} />
        <img src={image} alt="Post pic" />
      </div>
      <div className="group">
        <button>Modifier</button>
      </div>

    </form>


  );
};

export default PostEdit;
