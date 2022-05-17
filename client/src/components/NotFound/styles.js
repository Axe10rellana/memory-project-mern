//estilos
import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  img404: {
    width: "100%",
  },
  h1: {
    fontSize: "3rem",
    textAlign: "center",
    color: "#4fd699",
  },
  message404: {
    fontSize: "1.5rem",
    padding: "20px",
    textAlign: "center",
  },
  container: {
    overflowX: "hidden",
    color: "#000000",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  btnSuccessSm: {
    display: "inline-block",
    fontWeight: "400",
    lineHeight: "1.5",
    textAlign: "center",
    textDecoration: "none",
    verticalAlign: "middle",
    cursor: "pointer",
    color: "#ffffff",
    backgroundColor: "#42b983",
    borderColor: "#42b983",
    margin: "2rem 0",
    padding: "0.25rem 0.5rem",
    fontSize: "0.875rem",
    borderRadius: "0.2rem",
    borderStyle: "none",
    transition: "opacity 0.2rem ease-in-out",
  },
}));
