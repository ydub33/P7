import React, { useState } from 'react';
import { postService } from '../../utils/postService';


import "./postAdd.css";

const PostAdd = ({ data }) => {
    const [text, setText] = useState([])
    const [image, setImage] = useState()

   
    
    const onChange = (e) => {
        setText(e.target.value)
    }

    const imageChange = (e) => {
        console.log(e.target.files)
        setImage(e.target.files[0])
    }

 

    const onSubmit = (e) => {
        e.preventDefault()
        // console.log(post)
        const formData = new FormData();
        formData.append('imageUrl', image);
        formData.append('post', text);

        postService.createPost(formData)
            .then((res) => {
                console.log(res)
                data(prev => [res.data.data, ...prev])
            })
            .catch(err => console.log(err))
    }

    

    return (
        <div className='form-post'>
            <form onSubmit={onSubmit}>
                <div className="posterName">
               
                </div>
                <div className="message">
                    <label htmlFor="post"></label>
                    <input type="text" className="share" name="post" 
                    placeholder='Message' onChange={onChange}
                    style={{  height:"22px"}}/>
                    {/* <textarea name="post" placeholder='Message' onChange={onChange}></textarea> */}

                </div>
                <div className="group">
                    <p style={{ fontSize: "12px" , fontStyle:'italic'}}> 
                        Sélectionner une image </p>
                    <label htmlFor="image"></label>
                    <input type="file" name="image" onChange={imageChange} />

                </div>
                <div className="group">
                    <button>Poster</button>
                </div>
            </form>
        </div>
    );
};

export default PostAdd;