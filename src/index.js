import App from "./app";
import "./styles.styl";

var mountNode = document.getElementById("root");
ReactDOM.render(<App name="Jane" />, mountNode);