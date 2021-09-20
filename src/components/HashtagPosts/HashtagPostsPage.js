import PageStyled from "../shared/PageStyled";
import { HashtagPostContainer } from "./HashtagPostsStyled";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Loading from "../shared/Loading";
import { getPostsByHashtag } from "../../services/Linkr";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import NoPosts from "../shared/NoPosts";

export default function HashtagPostsPage() {
    const {userData} = useContext(UserContext);
    const [posts, setPosts] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {hashtag} = useParams();
 
    useEffect(() => {
        if (userData) {
            renderPosts();
        }
    },[hashtag, userData.token])

    function renderPosts() {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        getPostsByHashtag(hashtag, config)
        .then(response => {
            setTimeout(() => {setIsLoading(false)}, 1000)
            setPosts(response.data.posts);
        })
        .catch(error => {
            alert("Failed to get posts from this hashtag, please refresh page")
        })
    }


    if(!posts){
        return(
            <Loading />
        )
    }
  
    return (
        <PageStyled centralized>
            <HashtagPostContainer>
                <TittleWithLimitattor># {hashtag}</TittleWithLimitattor>
                <div className="content">
                    <Separator>
                        {isLoading ? <NoPosts centralized content={<Loader type="Hearts" color="#00BFFF" height={80} width={80} />}/>  : posts.length !== 0 ? posts.map(post => <Card post={post}/>) : <NoPosts/>}
                    </Separator>
                    <HashtagsInTranding setIsLoading={setIsLoading}/>
                </div>
            </HashtagPostContainer>
        </PageStyled>
    )
}

const TittleWithLimitattor = styled(Title)`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media(max-width: 996px){
        margin: 19px auto;
        width: 86vw;
    }
`;

const Separator = styled.div`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Hashtauge = styled.span`
    width: 100%;
    font-size: 43px;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
`;