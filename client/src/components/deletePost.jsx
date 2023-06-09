import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IconButton} from "@mui/material";
import {DeleteOutlined} from "@mui/icons-material";
import PostWidget from "../scenes/widgets/PostWidget";
import {setPosts} from "../state";

const DeletePost = ({postId}) => {
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const deletePost = async () => {
        const response = await fetch(
            `http://localhost:3001/posts/delete/${postId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(
            ()=>getPosts()
        ).then(
            function (){
                return(
                    posts.map(
                        ({
                             _id,
                             userId,
                             firstName,
                             lastName,
                             description,
                             location,
                             picturePath,
                             userPicturePath,
                             likes,
                             comments,
                             createdAt,
                         }) => (
                            <PostWidget
                                key={_id}
                                postId={_id}
                                postUserId={userId}
                                name={`${firstName} ${lastName}`}
                                description={description}
                                location={location}
                                picturePath={picturePath}
                                userPicturePath={userPicturePath}
                                likes={likes}
                                comments={comments}
                                createdAt={createdAt}
                            />
                        )
                    )
                )
            }
        )
    }
    const getPosts = async () => {
        const response = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };
    return (
        <div>
                <IconButton
                    onClick={()=>deletePost()}
                >
                    <DeleteOutlined/>
                </IconButton>
        </div>
    );
};

export default DeletePost;