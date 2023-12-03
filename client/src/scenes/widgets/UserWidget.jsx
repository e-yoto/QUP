import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    DescriptionOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "components/UserImage";
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
  
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    };
  
    useEffect(() => {
      getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    if (!user) {
      return null;
    }
  
    const {
      username,
      location,
      games,
      bio,
      discordSocial,
      steamSocial,
      // viewedProfile,
      // impressions,
      friends,
    } = user;

    var hasValorant, hasLol, hasCs;
    hasValorant = hasLol = hasCs = false;
    if (games[0].includes("Valorant")){
      hasValorant = true;
    }
    if (games[0].includes("LeagueOfLegends")){
      hasLol = true;
    }
    if (games[0].includes("CounterStrike2")){
      hasCs = true;
    }
  
    return (
      <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
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
              <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
        </FlexBetween>
  
        <Divider />
  
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <DescriptionOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{bio}</Typography>
          </Box>
        </Box>
        
        <Divider />
  
        {/* THIRD ROW */}
        <Box p="1rem 0">
          <FlexBetween>
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            My Games
          </Typography>
          <EditOutlined sx={{ color: main }} />

          </FlexBetween>
         
          {hasValorant && (
              <>
            <img margin="0px 10px 0px" width= "40px"src="http://localhost:3001/assets/valorant_icon.png" alt="discord" />
          </>
            )}
          {hasLol && (
              <>
            <img margin="0px 10px 0px" width= "40px"src="http://localhost:3001/assets/lol_icon.png" alt="discord" />
          </>
            )}
          {hasCs && (
              <>
            <img margin="0px 10px 0px" width= "40px"src="http://localhost:3001/assets/cs_icon.webp" alt="discord" />
          </>
            )}
            
        </Box>
  
        <Divider />
  
        {/* FOURTH ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>

          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img width= "40px"src="http://localhost:3001/assets/discord.png" alt="discord" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Discord
                </Typography>
                <Typography color={medium}>{discordSocial}</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
  
          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <img width= "40px"src="http://localhost:3001/assets/steam.png" alt="steam" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Steam
                </Typography>
                <Typography color={medium}>{steamSocial}</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>
      </WidgetWrapper>
    );
  };
  
  export default UserWidget;