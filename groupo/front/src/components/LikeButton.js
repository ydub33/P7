import React, { useEffect, useRef, useState } from 'react';
import { postService } from '../utils/postService';
import { accountService } from '../utils/accountService';
import likeEmpty from "../assets/heart.svg"
import likeFull from "../assets/heart-filled.svg"

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false)
    const [total, setTotal] = useState(0)
    const flag = useRef(false)

    const like = () => {
        postService.likePost(post._id, accountService.getInfo().userId)
            .then(res => {
                setLiked(true)
                setTotal(current => current + 1)
            })
            .catch(err => console.log(err))
    }

    const unlike = () => {
        postService.unlikePost(post._id, accountService.getInfo().userId)
            .then(res => {
                setLiked(false)
                setTotal(current => current - 1)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (flag.current === false) {

            setTotal(post.likers.length)
            if (post.likers.length > 0) {
                console.log('ici')
                setLiked(true)
            }
            else setLiked(false)

        }
        return () => flag.current = true

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='like-container'>
            {
                liked
                    ?
                    <img src={likeFull} onClick={() => unlike()} alt="unlike" />
                    :
                    <img src={likeEmpty} onClick={() => like()} alt="like" />
            }

            <span>{total}</span>
        </div>
    );
};

export default LikeButton;