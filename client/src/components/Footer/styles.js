//importaciones
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  footer: {
    backgroundColor: "#3f51b5",
    padding: "4rem 4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    flexDirection: "column",
    margin: "30px 0 0 0",
    bottom: "0",
  },
  p: {
    marginTop: "2rem",
  },
  socialIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  github: {
    marginRight: "1rem",
  },
  linkeIn: {
    marginLeft: "1rem",
  },
}));
