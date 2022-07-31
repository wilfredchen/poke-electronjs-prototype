import { createMuiTheme } from "@material-ui/core/styles";

const main = "#F6F8FC";
const mainDark = "#EFEFF1";
const mainLight = "#6e6764";
const second = "#FF5350";
const secondDark = "#ccc";
const secondLight = "#fff";
const white = "#ffffff";
const black = "#252525";
// Create a theme instance.
export const theme = createMuiTheme({
  //color palette;
  palette: {
    primary: {
      main: main,
      dark: mainDark,
      light: mainLight,
    },
    secondary: {
      main: second,
      dark: secondDark,
      light: secondLight,
    },
    error: {
      main: second,
    },
    background: {
      default: mainLight,
    },
    text: {
      default: black,
      light: white,
    },
  },
  //typography settings
  typography: {
    h1: {
      fontWeight: 600,
      fontSize: "40px",
      color: black,
    },
    h2: {
      fontWeight: 600,
      fontSize: "35px",
      color: black,
    },
    h3: {
      fontWeight: 600,
      fontSize: "30px",
      color: black,
    },
    h4: {
      fontWeight: 600,
      fontSize: "25px",
      color: black,
    },
    h5: {
      fontWeight: 600,
      fontSize: "20px",
      color: black,
    },
    h6: {
      fontWeight: 600,
      fontSize: "18px",
      color: black,
    },
    subtitle1: {
      fontSize: "16px",
      color: black,
    },
    subtitle2: {
      fontSize: "14px",
      color: black,
    },
    body1: {
      fontSize: "16px",
      color: black,
    },
    body2: {
      fontSize: "14px",
      color: "#ba000d",
    },
    button: {
      fontSize: "16px",
      color: black,
    },
  },
});

export default theme;
