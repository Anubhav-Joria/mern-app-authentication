import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Private.css";
function Private() {
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(true);
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getUser = async (id: string) => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/getUser",
      params: {
        id: id,
      },
    })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const verifyUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/protected", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      setUser(res.data.user);
      getUser(res.data.user.userId);
    } catch (err) {
      navigate("/auth");
    }
  };

  useEffect(() => {
    verifyUser();
  }, [toggle]);

  const handleEdit = async () => {
    setName(user?.name);
    setToggle(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/changeData",
        {
          name: name,
          password: password,
          id: user._id,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      setName("");
      setPassword("");
      setToggle(true);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Navbar />
      {toggle ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <br />
          <table>
            <thead>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <b>Your Data</b>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Id</td>
                <td>{user?._id}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{user?.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user?.email}</td>
              </tr>
            </tbody>
          </table>
          <br />

          <Button variant="outlined" onClick={handleEdit}>
            Change name and Password
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={3}
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid item xs={12}>
                <Typography variant="h5"> Edit your Data</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Name"
                  variant="outlined"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  label="New Password"
                  variant="outlined"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></TextField>
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  {" "}
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>

          <Button onClick={() => setToggle(true)}>Cancel</Button>
        </Box>
      )}
    </>
  );
}

export default Private;
