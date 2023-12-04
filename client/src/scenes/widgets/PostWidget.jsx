import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme, Button } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
  import { useNavigate } from "react-router-dom";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    game,
    mode,
    lobby,
    region,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const navigate = useNavigate();
    // const isLiked = Boolean(likes[loggedInUserId]);
    // const likeCount = Object.keys(likes).length;
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  
    const patchLike = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };



    const displayRegion = (region) => {
      if(region === "na-east") {
        return <>NA East</>
      }
      if(region === "na-west") {
        return <>NA West</>
      }
      if(region === "na-central") {
        return <>NA Central</>
      }
    }

    const displayMode = (mode) => {
      if(mode === "competitive") {
        return <>Competitive</>
      }
      if(mode === "casual") {
        return <>Casual</>
      }
    }
  
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
          game={game}
          
        />
        {console.log(name + ' ' + userPicturePath)}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <Box
                // minWidth={"350px"}
                // minHeight={"100px"}
                minWidth={"20rem"}
                minHeight={"5rem"}
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
                >

              <Typography color={main} sx={{ mt: "1rem" }}>
                
                {description}
              </Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>
          <Box display="flex" justifyContent="flex-end" alignItems="flex-end" gap="0.3rem" flexDirection='column'>
            <FlexBetween>
              {game}
            </FlexBetween>
            <FlexBetween>
              {displayMode(mode)}
            </FlexBetween>
            <FlexBetween>
              {displayRegion(region)}
            </FlexBetween>
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end" gap="0.3rem" flexDirection='row'>
              <Button
                sx={{
                  color: palette.background.alt,
                  backgroundColor: palette.primary.main,
                  borderRadius: "3rem",
                  width: "70px"
                }}
                onClick={() => navigate(`/posts/${postId}`)}
                
              >
                JOIN
              </Button>
              <FlexBetween fontSize="15px" padding="7px">
                3 / {lobby}
              </FlexBetween>
            </Box>
          </Box>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;