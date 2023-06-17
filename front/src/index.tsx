import React from 'react';
import {createRoot} from "react-dom/client";
import App from 'components/App';
import './index.css';

const elem = document.getElementById('app')
const root = createRoot(
    elem
    ||document.body.appendChild((()=>{
        const a = document.createElement('div')
            a.setAttribute('id',"app")
        return a
    })()));

root.render(<App/>);

if (module.hot) {
    module.hot.accept()
}
