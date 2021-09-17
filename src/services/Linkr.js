import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr"

function sendLoginRequest (body){
    return axios.post(`${BASE_URL}/sign-in`, body);
}

function sendSignupRequest (body){
    return axios.post(`${BASE_URL}/sign-up`, body);
}

function sendPostLinkRequest (body, config){
    return axios.post(`${BASE_URL}/posts`, body, config);
}

function getPosts(config) {
    return axios.get(`${BASE_URL}/posts`, config);
}

function getHashtags(config) {
    return axios.get(`${BASE_URL}/hashtags/trending`, config);
}

function getMyLikedPosts(config) {
    return axios.get(`${BASE_URL}/posts/liked`, config);
}

function getPostsByUserId (userId, config){
    return axios.get(`${BASE_URL}/users/${userId}/posts`, config);
}

function getPostsByHashtag (hashtag, config) {
    return axios.get(`${BASE_URL}/hashtags/${hashtag}/posts`, config);
}

export {
    sendLoginRequest,
    sendSignupRequest,
    sendPostLinkRequest,
    getPosts,
    getHashtags,
    getMyLikedPosts,
    getPostsByUserId,
    getPostsByHashtag,
}

