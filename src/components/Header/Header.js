import { Box, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import pokeball from "../../images/statics/pokeball.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  Header: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginbottom: theme.spacing(1),
    background: theme.palette.secondary.light,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.Header}>
      <Box pr={2} pl={2} borderRight={1}>
        <img src={pokeball} width={30} height={30} alt="pokeball" />
      </Box>
      <Box mr={2} ml={2}>
        <Link to="/" className={classes.link}>
          <Typography variant="body1">Home</Typography>
        </Link>
      </Box>
      <Box>
        <Link to="/New" className={classes.link}>
          <Typography variant="body1">Add Pokemon</Typography>
        </Link>
      </Box>
    </Card>
  );
};

export default Header;
