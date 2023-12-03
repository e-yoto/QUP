import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Checkbox,
  FormGroup
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  bio: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  username: "",
  email: "",
  password: "",
  location: "",
  bio: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};





const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    formData.append("games", selectedGames);
    console.log("GAMES: " + selectedGames);

    console.log(values);
    console.log(formData);
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  const [selectedGames, setSelectedGames] = useState([]);

  const handleCheckboxChange = (game) => {
    if (selectedGames.includes(game)) {
      // If the game is already selected, remove it
      setSelectedGames(selectedGames.filter(selectedGame => selectedGame !== game));
    } else {
      // If the game is not selected, add it
      setSelectedGames([...selectedGames, game]);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            {isRegister && (
              <>
                <TextField
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={
                    Boolean(touched.username) && Boolean(errors.username)
                  }
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Bio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bio}
                  name="bio"
                  error={
                    Boolean(touched.bio) && Boolean(errors.bio)
                  }
                  helperText={touched.bio && errors.bio}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

                <TextField
                  label="Discord Username (Optional)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discordSocial}
                  name="discordSocial"
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  label="Steam Friend Code (Optional)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.steamSocial}
                  name="steamSocial"
                  sx={{ gridColumn: "span 4" }}
                />

                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"

                >
                  <Typography variant="h5">Select your games:</Typography>

                  <FormGroup>
                  <FlexBetween  >
                      <Box>
                    <label>
                    <img style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }} src="http://localhost:3001/assets/valorant_cover.png" alt="valorant" />
                      <Checkbox
                        value="Valorant"
                        checked={selectedGames.includes('Valorant')}
                        onChange={() => handleCheckboxChange('Valorant')}
                      />
                    </label>
                    <br />
                          </Box>
                          <Box>
                    <label>
                      <Checkbox
                        value="LeagueOfLegends"
                        checked={selectedGames.includes('LeagueOfLegends')}
                        onChange={() => handleCheckboxChange('LeagueOfLegends')}
                      />
                      <img style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }} src="http://localhost:3001/assets/lol_cover.jpg" alt="LoL" />
                    </label>
                    <br />
                    </Box>
                          

                    </FlexBetween>
                    <label>
                    <img style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }} src="http://localhost:3001/assets/cs2_cover.png" alt="CS2" />
                      <Checkbox
                        value="CounterStrike2"
                        checked={selectedGames.includes('CounterStrike2')}
                        onChange={() => handleCheckboxChange('CounterStrike2')}
                      />
                    </label>
                    <br />
                      {/* <p>Selected Games: {selectedGames.join(', ')}</p> */}
                  </FormGroup>
{/* 
                  <FormGroup >
                  <FlexBetween  >
                      <Box>

                        <img style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }} src="http://localhost:3001/assets/valorant_cover.png" alt="valorant" />
                        <Checkbox value={1}  name="valorant" />
                      </Box>
                      <Box>
                        <Checkbox value={2} name="league of legends" />
                        <img style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }} src="http://localhost:3001/assets/lol_cover.jpg" alt="LoL" />
                        
                      </Box>
                    </FlexBetween>

                    <FlexBetween  >
                      <Box>

                        <img style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }} src="http://localhost:3001/assets/cs2_cover.png" alt="CS2" />
                        <Checkbox value={3}  name="counter strike 2" />
                      </Box>
                      <Box>
                        <Checkbox  name="counter strike 2" />
                        <img style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }} src="http://localhost:3001/assets/cs2_cover.png" alt="CS2" />
                      </Box>
                    </FlexBetween>

                  </FormGroup> */}
                  


                </Box>
              </>
            )}

            
          </Box>

          

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;