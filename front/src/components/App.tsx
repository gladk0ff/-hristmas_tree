import React, {useEffect, useRef, useState} from 'react';

import Snow from 'react-snow-effect';
import Toy from '@components/Toy/Toy';
import NewToy from "@components/NewToy";
import treeImg from '@assets/pngegg.png';
import logo from '@assets/logo.svg'
import Background2 from '@assets/background.jpg'

import './App.css';

function App() {
    const [toys, updateToys] = useState([...new Array(1)]);
    const [ourToys, updateOurToys] = useState([]);
    const [size,setSize]=useState({
        clientHeight: document.documentElement.clientHeight,
        clientWidth: document.documentElement.clientWidth
    })
    const tree = useRef(null);

    const getToys = () =>{
        fetch(`${process.env.API_SERVICE_URL}/toys`)
            .then(resp=>{
                return resp.json()
            })
            .then(resp=>{
                console.log("getToys resp",resp)
                if (resp.length) updateOurToys(resp)
                else throw new Error({message:resp})
        }).catch(e=>{
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

    return (
        <div className="christmas-tree-app scene"
           style={{backgroundImage:`url(${Background2})`}}
        >
            <Snow/>
            <NewToy target={tree}/>
            <main className="christmas-tree-app__tree-container ">
                <img src={treeImg} ref={tree} title="Елка" className="droppable"/>
                {ourToys?.map((toy, index) => <Toy key={"toy" + index} {...toy}/>)}
            </main>
            <img className="christmas-tree-app__footer-logo" src={logo} alt=""/>
        </div>
    );
}

export default App;




