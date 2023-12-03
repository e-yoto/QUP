import * as React from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const [game, setGame] = React.useState('');
  const [mode, setMode] = React.useState('');
  const [lobby, setLobbySize] = React.useState('');
  const [region, setRegion] = React.useState('');

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    formData.append("game", game);
    formData.append("mode", mode);
    formData.append("size", lobby);
    formData.append("region", region);
    console.log(formData);
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  

  const handleChangeGame = (event) => {
    setGame(event.target.value);
  };
  const handleChangeMode = (event) => {
    setMode(event.target.value);
  };
  const handleChangeLobbySize = (event) => {
    setLobbySize(event.target.value);
  };
  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
  };


  return (
    
    <WidgetWrapper>
      <Typography variant='h3' paddingBottom={"1rem"}>Create a Q</Typography>
      <FlexBetween gap="1.5re4">
        <InputBase
          placeholder="Description ex: 'Looking for team to play some ranked!'"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      <FlexBetween margin="1.5rem">
        <FormControl required sx={{ minWidth: 200 }}>
          <InputLabel id="select-game">Game</InputLabel>
          <Select
            value={game}
            label="Select a game"
            onChange={handleChangeGame}
          >
            <MenuItem value={"League of Legends"}>
              <FlexBetween>
              <img  width= "20px"src="http://localhost:3001/assets/lol_icon.png" alt="lol" />League of Legends 
              </FlexBetween>
            </MenuItem>
            <MenuItem value={"Valorant"}>
              <FlexBetween>
              <img  width= "20px"src="http://localhost:3001/assets/valorant_icon.png" alt="valorant" />Valorant 
              </FlexBetween>
            </MenuItem>
            <MenuItem value={"Counter Strike 2"}>
              <FlexBetween>
              <img  width= "20px"src="http://localhost:3001/assets/cs_icon.webp" alt="cs2" />Counter Strike 2 
              </FlexBetween>
            </MenuItem>
            
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        <FormControl required sx={{ minWidth: 200 }}>
          <InputLabel id="select-mode">Mode</InputLabel>
          <Select
            value={mode}
            label="Select a mode"
            onChange={handleChangeMode}
          >
            <MenuItem value={"competitive"}>
              <FlexBetween>
                Competitive 
              </FlexBetween>
            </MenuItem>
            <MenuItem value={"casual"}>
              <FlexBetween>
              Casual
              </FlexBetween>
            </MenuItem>
            
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

      </FlexBetween>

      <FlexBetween margin="1.5rem">
        <FormControl required sx={{ minWidth: 200 }}>
          <InputLabel id="select-lobby-size">Lobby size</InputLabel>
          <Select
            value={lobby}
            label="Select a lobby size"
            onChange={handleChangeLobbySize}
          >
            <MenuItem value={2}>
              <FlexBetween>
              2
              </FlexBetween>
            </MenuItem>
            <MenuItem value={3}>
              <FlexBetween>
              3
              </FlexBetween>
            </MenuItem>
            <MenuItem value={4}>
              <FlexBetween>
              4
              </FlexBetween>
            </MenuItem>
            <MenuItem value={5}>
              <FlexBetween>
              5
              </FlexBetween>
            </MenuItem>
            
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        <FormControl required sx={{ minWidth: 200 }}>
          <InputLabel id="select-region">Region</InputLabel>
          <Select
            value={region}
            label="Select a region"
            onChange={handleChangeRegion}
          >
            <MenuItem value="na-east">
              <FlexBetween>
                NA East 
              </FlexBetween>
            </MenuItem>
            <MenuItem value="na-west">
              <FlexBetween>
                NA West 
              </FlexBetween>
            </MenuItem>
            <MenuItem value="na-central">
              <FlexBetween>
                NA Central 
              </FlexBetween>
            </MenuItem>
            
            
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

      </FlexBetween>
      
      

      <FlexBetween >
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            width: "100px"
          }}
        >
          CREATE
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;