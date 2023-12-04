import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "components/FlexBetween";
import UserImageSmall from "components/UserImageSmall";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends)
  const main = palette.neutral.main;

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      {/* <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box> */}
      <Box display="flex" flexDirection="column" gap="1.5rem">
                <Box display={"grid"}>
                  <FlexBetween>



                  </FlexBetween>
                  <Box display={"flex"} flexDirection={"row"} alignItems={"center"} mb={"1rem"}>

                    <UserImageSmall image={"goku.png"}></UserImageSmall>
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
                }}>Naruto</Typography>
                  </Box>
                  <Box display={"flex"} flexDirection={"row"} mb={"1rem"} alignItems={"center"}>

                    <UserImageSmall image={"patrick.webp"}></UserImageSmall>
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
                }}>Patrick Star</Typography>
                  </Box>
                  <Box display={"flex"} flexDirection={"row"} mb={"1rem"} alignItems={"center"}>

                    <UserImageSmall image={"ninja.webp"}></UserImageSmall >
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
                }}>Ninja</Typography>
                  </Box>
                  <Box display={"flex"} flexDirection={"row"} mb={"1rem"} alignItems={"center"}>

                    <UserImageSmall image={"wolf.jpg"}></UserImageSmall >
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
                }}>big daddy</Typography>
                  </Box>
                </Box>
              </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;