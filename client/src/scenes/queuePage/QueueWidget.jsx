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
  
  const QueueWidget = ({
    // postId,
    // postUserId,
    // name,
    // description,
    // location,
    // picturePath,
    // userPicturePath,
    // likes,
    // comments,
    // game,
    // mode,
    // lobby,
    // region,
    userId,
    username,
    game,
    description,
    mode,
    region,
    size,
    userPicturePath,
    users,
  }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const navigate = useNavigate();
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const medium = palette.neutral.medium;



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
      <WidgetWrapper m="2rem 0"height={"700px"}>
        <Box
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {username}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {region}
          </Typography>
        </Box>
      </WidgetWrapper>
    );
  };
  
  export default QueueWidget;