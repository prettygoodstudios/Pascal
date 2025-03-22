//Library Imports
import React from "react";
import {render} from "react-dom";

//Imports From Codebase
import "./styles/main.scss";
import App from "./components/App.jsx";

const appWrapper = document.getElementById("appWrapper");

render(<App />, appWrapper); 

if('serviceWorker' in navigator){
    window.addEventListener("load", () => {
        navigator.serviceWorker.
            register('../serviceworker.js')
            .then(() => {
                console.log("Registered")
            }).catch(() => {
                console.log("Error registering service worker");
            });
    });
}