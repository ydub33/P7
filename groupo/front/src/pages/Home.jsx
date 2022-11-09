import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { postService } from "../utils/postService";
import { accountService } from "../utils/accountService";

import PostAdd from "../pages/Posts/PostAdd";
import LikeButton from "../components/LikeButton";

import "./home.css";
import trash from "../assets/trash.svg";
import update from "../assets/update.svg";


export default function Home() {
  let navigate = useNavigate()
  const flag = useRef(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (flag.current === false) {
      postService.getAllPosts()
        .then(res => {
          console.log(res.data)
          setPosts(res.data)
        })
        .catch(err => console.log(err))

    }
    return () => flag.current = true

  }, [])

  const updatePost = (postId) => {
    navigate("/edit-post/" + postId)
  }

  const delPost = (postId) => {
    console.log(postId);
    postService.delPost(postId)
      .then(res => setPosts(current => current.filter(post => post._id !== postId)))
      .catch(err => console.log(err))
  }

  // let name = localStorage.getItem('name')

  return (
    <>
      <div className="home-container">

        <div className="bienvenue">
          <h1>Intranet Groupomania</h1>
        </div>

        <div className="feed">

        <div className="create-post">
        
          <PostAdd data={setPosts} />
        </div>

          {posts.map((post) => (
            <div className="post-container" key={post._id}>
              
              <div className="group">
                {post.post}
              </div>

              <img
                src={post.imageUrl}
                alt="user-pic"
              />

              <div className="post-infos">

                <LikeButton post={post} />

                <p className="pinfos">
                  créé le : {new Date(post.createdAt).toLocaleString("fr-FR")}
                </p>
                
              </div>

              {post.posterId === accountService.getInfo().userId || accountService.getInfo().userId === accountService.getAdmin() ? (
                <div className="updating">

                  <img onClick={() => updatePost(post._id)}
                    src={update}
                    alt="Modifier"
                  ></img>

                  <img onClick={() => {
                      delPost(post._id)
                  }}
                    src={trash}
                    alt="Supprimer"
                  ></img>

                </div>

              ) : ''}
            </div>


          ))}
        </div>

      </div>

    </>
  );
};


