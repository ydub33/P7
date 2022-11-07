import Axios from "./Axios";

let getAllPosts = () => {
  return Axios.get("/api/post");

};

let getPost = (_id) => {
  return Axios.get("/api/post/" + _id);

};

let createPost = (post) => {
  return Axios.post("/api/post", post);
};

let modifyPost = (_id, post) => {
  return Axios.patch("/api/post/" + _id, post);

};

let likePost = (_id, posterId) => {
  return Axios.patch("/api/post/like/" + _id + "/" + posterId)
}

let unlikePost = (_id, posterId) => {
  return Axios.patch("/api/post/unlike/" + _id + "/" + posterId)
}

let delPost = (postId) => {
  return Axios.delete("/api/post/" + postId)
}

export const postService = {
  getAllPosts,
  getPost,
  createPost,
  modifyPost,
  likePost,
  unlikePost,
  delPost
};
