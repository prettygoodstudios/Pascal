//Library Imports
import React from "react";
import {render} from "react-dom";

//Imports From Codebase
import styles from "./styles/main.scss";
import App from "./components/App.jsx";

const appWrapper = document.getElementById("appWrapper");

render(<App />, appWrapper); 