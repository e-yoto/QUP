import { Box, Divider, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import Friend from "components/Friend";
import QueueWidget from "./QueueWidget";

const QueuePage = () => {
    const [post, setPost] = useState(null);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    const { postId } = useParams();
    const token = useSelector((state) => state.token);
    
    console.log("POSTID" + postId); 

    const getPost = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log("DATA: "+ data);
      setPost(data);
    };

    useEffect(() => {
      getPost();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /*const {
      userId,
      username,
      game,
      description,
      mode,
      region,
      size,
      userPicturePath,
      users
    } = post; */

    return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          
          {/* <QueuePage 
            userId = {post.userId}
            username = {post.username}
            game =  {post.game}
            description = {post.description}
            mode = {post.mode}
            region = {post.region}
            size = {post.size}
            userPicturePath = {post.userPicturePath}
            users  = {post.users}
          
          /> */}
          
          <Divider dark sx={{ margin: "1.25rem 0" }}  />
          
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default QueuePage;