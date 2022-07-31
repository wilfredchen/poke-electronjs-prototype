import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { Header } from "../components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPoke } from "../store/pokelist";

function New() {
  const [no, setNo] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState();
  const dispatch = useDispatch();

  const handleAdd = () => {
    setError(false);
    if (!no || !name || !desc || !type1) {
      setError(true);
    } else {
      dispatch(addPoke(no, name, desc, type1, type2, file))
        .then(() => {
          setMessage("successfully added a new pokemon.");
        })
        .catch(() => {
          setMessage("error: new pokemon was not added.");
        });
    }
  };

  return (
    <Container maxWidth="lg">
      <Header />
      <Box width="100%" display="flex" flexDirection="column" mb={2} mt={2}>
        <TextField
          required
          id="standard-required"
          label="No"
          value={no}
          onChange={(e) => setNo(e.target.value)}
        />
        <TextField
          required
          id="standard-required"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="standard-required"
          label="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <TextField
          required
          id="standard-required"
          label="First Type"
          value={type1}
          onChange={(e) => setType1(e.target.value)}
        />
        <TextField
          id="standard-required"
          label="Second Type"
          value={type2}
          onChange={(e) => setType2(e.target.value)}
        />
        <br />
        <Button
          variant="contained"
          component="label"
          color="primary"
          size="small"
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Button>
      </Box>
      {error && (
        <Box mb={2}>
          <Typography variant="body2">Please fill all the fields.</Typography>
        </Box>
      )}
      {message && (
        <Box mb={2}>
          <Typography variant="body1">{message}</Typography>
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={() => handleAdd()}>
        Add!!
      </Button>
    </Container>
  );
}

export default New;
