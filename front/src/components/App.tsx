import React, {useEffect, useRef, useState} from 'react';
import Toy from 'components/Toy/Toy';
import { Tooltip } from 'react-tooltip'
import treeImg from 'assets/pngegg.png';
import logo from 'assets/logo.svg'
import Background2 from 'assets/background.jpg'
import Snow from 'react-snow-effect';
import NewToy from "components/NewToy";

import './App.css';

function App() {
    const [toys, updateToys] = useState([...new Array(1)]);
    const [ourToys, updateOurToys] = useState([]);
    const [size,setSize]=useState({
        clientHeight: document.documentElement.clientHeight,
        clientWidth: document.documentElement.clientWidth
    })

    const getToys = () =>{
        fetch(`${process.env.API_SERVICE_URL}/toys`)
            .then(resp=>{
                return resp.json()
            })
            .then(toys=>{
            updateOurToys(toys);
        })
            .catch(e=>{
            console.log('error',e.toString())
        })
    }

    const changeSize = ()=>{
        setSize({
            clientHeight: document.documentElement.clientHeight,
            clientWidth: document.documentElement.clientWidth
        })
    }

    useEffect(() => {
        getToys();
        window.addEventListener('resize',changeSize);
        return()=>{
            window.removeEventListener('resize',changeSize)
        }
    }, [])

    const tree = useRef(null);
    console.log("ourToys",ourToys)
    return (
        <div className="christmas-tree-app scene"
           style={{backgroundImage:`url(${Background2})`}}
        >
            <NewToy target={tree}/>
            <main className="christmas-tree-app__tree-container ">
                <img src={treeImg} ref={tree} title="Елка" className="droppable"/>
            </main>
            {ourToys?.map((toy, index) => <Toy key={"toy" + index} {...toy}/>)}
            <footer className="christmas-tree-app__footer">
                <img className="christmas-tree-app__footer-logo" src={logo} alt=""/>
            </footer>
            <Snow/>
            <Tooltip multiline id="my-tooltip" />
        </div>
    );
}

export default App;




