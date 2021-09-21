import PageStyled from "../shared/PageStyled";
import { TimelineContainer } from "./TimelineStyle";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import PostLink from "../shared/PublishLink/PostLink";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { getPosts } from "../../services/Linkr";
import Loading from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";
import SearchBar from "../shared/Topbar/SearchBar";
import useWindowDimensions from "../shared/useWindowDimensions";

export default function TimelinePage() {
    const { userData } = useContext(UserContext);
    const [posts, setPosts] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {windowWidth} = useWindowDimensions();

    useEffect(() => {
        if (userData) {
            renderPosts();
        }
    }, [userData])

    function renderPosts() {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        getPosts(config)
            .then(res => {
                setPosts(res.data.posts);
            })
            .catch(err => {
                alert("Houve uma falha ao obter os posts, por favor atualize a página");
            })
    }


    if (!posts) {
        return <Loading />
    }

    return (
        <PageStyled centralized>
            <SearchBar display={windowWidth >= 992 ? "none" : "initial"}/>

            <TimelineContainer>
                <Title>timeline</Title>
                <div className="content">
                    <div posts="posts">
                        <PostLink renderPosts={renderPosts} />
                        {posts.length !== 0 ? posts.map(post => <Card post={post} key={post.id} renderPosts={renderPosts} />) : <NoPosts />}
                    </div>
                    <HashtagsInTranding setIsLoading={setIsLoading}/>
                </div>
            </TimelineContainer>
        </PageStyled>
    )
}