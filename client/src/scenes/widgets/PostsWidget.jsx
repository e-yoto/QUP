import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { Box, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    
    <>
      
      {!isProfile && (
        <>
          <Box display={"flex"}>
            <Box flex={1}>
              <Typography variant="h2">Live Q's</Typography>
            </Box>
            <FlexBetween >
              <img height={"50px"} margin-right={"10px"} src="http://localhost:3001/assets/valorant_icon.png" alt="val_icon" />
              <img height={"50px"} margin-right={"10px"} src="http://localhost:3001/assets/lol_icon.png" alt="lol_icon" />
              <img height={"50px"} margin-right={"10px"} src="http://localhost:3001/assets/cs_icon.webp" alt="cs_icon" />
            </FlexBetween>
          </Box>
        </>
      )}
      
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          username,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          game,
          mode,
          size,
          region
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${username}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            game={game}
            mode={mode}
            lobby={size}
            region={region}
          />
          
        )
      )}
    </>
  );
};

export default PostsWidget;