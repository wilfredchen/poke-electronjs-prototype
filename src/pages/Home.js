import { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  Chip,
  Grid,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { listPoke, deletePoke } from "../store/pokelist";
import { Header } from "../components";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

const useStyles = makeStyles((theme) => ({
  Pokemon: {
    position: "relative",
    padding: "5%",
    height: 260,
    background: theme.palette.secondary.light,
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  grid: {
    marginTop: theme.spacing(1),
  },
  deleteBtn: {
    position: "absolute",
    border: "1px solid #252525",
    right: 5,
    top: 5,
  },
  pokeDesc: {
    width: "100%",
    height: 80,
    overflow: "hidden",
  },
}));

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.pokelist);

  useEffect(() => {
    dispatch(listPoke());
  }, [dispatch]);

  const handleDelete = (id, path, preloaded) => {
    dispatch(deletePoke(id, path, preloaded));
  };
  return (
    <Container maxWidth="lg">
      {/*Header*/}
      <Header />
      {/*card*/}
      <Grid container spacing={2} className={classes.grid}>
        {list &&
          list.map((poke, key) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={key}>
              <Card className={classes.Pokemon}>
                <IconButton
                  aria-label="delete"
                  className={classes.deleteBtn}
                  size="small"
                  onClick={() =>
                    handleDelete(poke.id, poke.deletePath, poke.preloaded)
                  }
                >
                  <ClearOutlinedIcon fontSize="inherit" />
                </IconButton>
                <Box>
                  <img
                    src={poke.path}
                    width={100}
                    height={100}
                    alt={poke.name}
                  />
                </Box>
                <Box>
                  <Typography variant="h5">{poke.name}</Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  mt={1}
                  mb={1}
                  width="50%"
                  justifyContent="space-evenly"
                >
                  <Chip label={poke.type1} size="small" variant="outlined" />
                  {poke.type2 && (
                    <Chip label={poke.type2} size="small" variant="outlined" />
                  )}
                </Box>
                <Box className={classes.pokeDesc}>
                  <Typography
                    variant="subtitle2"
                    align="center"
                    className={classes.pokeDescText}
                  >
                    {poke.desc.substr(0, 100) + "..."}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Home;
