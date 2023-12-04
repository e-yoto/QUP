import { Box, Button, Divider, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
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
import UserImage from "components/UserImage";
import UserImageSmall from "components/UserImageSmall";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const QueuePage = () => {
  const [post, setPost] = useState(null);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const { postId } = useParams();
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  console.log("POSTID: " + postId);

  const getPost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log("DATA: " + data);
    setPost(data);
  };

  useEffect(() => {
    getPost();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          gridColumn: "span 4"
        }}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >





          <WidgetWrapper>
            <Box
            >
              <FlexBetween>

                <UserImage image={"lol_icon.png"} size="55px" />
                <Typography variant="h1" >frodon's Q</Typography>
                <Button>LEAVE</Button>


              </FlexBetween>

            </Box>

            <Divider dark sx={{ margin: "1.25rem 0" }} />
            <FlexBetween>
              <Typography>League of Legends</Typography>
              <Typography>NA-Central</Typography>
              <Typography>Competitive</Typography>
            </FlexBetween>
          </WidgetWrapper>

          <WidgetWrapper marginTop={"1rem"}>
          <Typography variant='h3' paddingBottom={"1rem"}>Chat</Typography>

            <Box
              // minWidth={"350px"}
              // minHeight={"100px"}
              minWidth={"20rem"}
              minHeight={"5rem"}
              p="1rem"
            >

              <Typography marginLeft={"2.3rem"} mb={"1rem"} color={main} >

                skur has joined...
              </Typography>

              <Box marginTop="1rem" display={"flex"} flexDirection={"row"}>

                <UserImageSmall image={"naruto.jpg"}></UserImageSmall>
                <Typography 
                color={main}
                variant="h5"
                fontWeight="500"
                paddingLeft={"5px"}
                alignItems={"center"}
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}>skur </Typography>
              </Box>
              <Typography marginLeft={"2.3rem"}> Hello guys...</Typography>

              <Box marginTop={"1rem"} display={"flex"} flexDirection={"row"}>

                <UserImageSmall image={"tenz.jpg"}></UserImageSmall>
                <Typography
                color={main}
                variant="h5"
                fontWeight="500"
                paddingLeft={"5px"}
                alignItems={"center"}
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
                >frodon (Host)</Typography>
              </Box>
              <Typography  marginLeft={"2.3rem"}> hey...</Typography>


              <Box marginTop="1rem" display={"flex"} flexDirection={"row"}>

                
                <UserImageSmall image={"naruto.jpg"}></UserImageSmall>
                <Typography color={main}
                  variant="h5"
                  fontWeight="500"
                  paddingLeft={"5px"}
                  alignItems={"center"}
                  sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },  
                  }}>
                  skur</Typography>
              </Box>
              <Typography marginLeft={"2.3rem"} mb={"1rem"}> One game. I'll add you all on discord.</Typography>

              

              

              
              
              <Typography marginLeft={"2.3rem"} mb={"1rem"} color={main} sx={{ mt: "1rem" }}>
                jyoto has joined...
              </Typography>
              <TextField fullWidth={"yes"} label="Send a message..."></TextField>

            </Box>
            <Box>

            </Box>
          </WidgetWrapper>
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Box />
            <WidgetWrapper>

              <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
              >
                Members (3/5)
              </Typography>


              <Box display="flex" flexDirection="column" gap="1.5rem">
                <Box display={"grid"}>
                  <FlexBetween>



                  </FlexBetween>
                  <Box display={"flex"} flexDirection={"row"} alignItems={"center"} mb={"1rem"}>

                    <UserImageSmall image={"tenz.jpg"}></UserImageSmall>
                    <Typography color={main}
                variant="h5"
                fontWeight="500"
                paddingLeft={"5px"}
                alignItems={"center"}
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}>frodon (Host)</Typography>
                  </Box>
                  <Box display={"flex"} flexDirection={"row"} mb={"1rem"} alignItems={"center"}>

                    <UserImageSmall image={"naruto.jpg"}></UserImageSmall>
                    <Typography justifyContent="center " color={main}
                variant="h5"
                fontWeight="500"
                paddingLeft={"5px"}
                alignItems={"center"}
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}>skur</Typography>
                  </Box>
                  <Box display={"flex"} flexDirection={"row"} mb={"1rem"} alignItems={"center"}>

                    <UserImageSmall image={"ayo.png"}></UserImageSmall >
                    <Typography color={main}
                variant="h5"
                fontWeight="500"
                paddingLeft={"5px"}
                alignItems={"center"}
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}>jyoto</Typography>
                  </Box>
                </Box>
              </Box>
            </WidgetWrapper>
            <Box m="1rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>

    </Box>
  );
};

export default QueuePage;