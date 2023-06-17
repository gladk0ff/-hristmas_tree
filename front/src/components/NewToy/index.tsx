import React, { useEffect, useRef, useState} from 'react';
import cn from 'classnames'
import BoxFront from 'assets/box_front.png';
import BoxBack from 'assets/box_back.png';
import T1 from 'assets/toy1.png';
import T2 from 'assets/toy2.png';
import T3 from 'assets/toy3.png';
import ToyBig from "assets/toy-big.png"
import EditForm from "components/NewToy/Form"

import './style.css';

let pageX=0;
let pageY=0;

const NewToy = ({target}:any) => {
        const toyRef = useRef<any>(null);
        const clientHeight = document.documentElement.clientHeight;
        const clientWidth = document.documentElement.clientWidth;
        const dragRef = useRef<any>({active:false,shift:{x:0,y:0}});
        let drag = dragRef.current;
        const [state, setState] = useState({edit: false, data: {
                _id:null,
                message: '',
                positionX:0,
                positionY:0,
            }})

    const startEdit =(event) => {
        setState({...state, edit: true})
    }

    const createOrUpdateToy= async (toy)=>{
        let _toy = JSON.stringify(toy);
        try {
            const resp = await fetch(`${process.env.API_SERVICE_URL}/toys`,{
                method: "POST",
                body: _toy
            });

            const data  = await resp.json();
            console.log('data',data);
            setState({
                edit: state.edit,
                data
            })
        } catch (e) {
            console.log("ОШИБКА",e)
        }
    }


    const moveAt=()=> {
        if (!drag.active) return;
        toyRef.current.style.left = pageX - drag.shift.x + 'px';
        toyRef.current.style.top = pageY - drag.shift.y + 'px';
        window.requestAnimationFrame(moveAt);
    }

    const mouseHandler=(event)=>{
        pageX=event.pageX;
        pageY=event.pageY;
        window.requestAnimationFrame(moveAt);
    }

    const mouseUpHandler = (event)=>{
        const ball=toyRef.current;
        ball.style.display = 'none';
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        ball.style.display = 'flex';
        if (elemBelow===target.current) {
            const toy = {
                _id:state.data._id,
                message: state.data.message,
                positionX:clientWidth/event.clientX,
                positionY:clientHeight/event.clientY,
            }
            createOrUpdateToy(toy);
        } else {
            console.log('цель не достигнута')
        }
        document.body.removeEventListener('mousemove',mouseHandler)
        document.body.removeEventListener('mouseup',mouseUpHandler)
    }

    const onMouseDown=(event)=>{
        let shiftX = event.clientX - toyRef.current.getBoundingClientRect().left;
        let shiftY = event.clientY - toyRef.current.getBoundingClientRect().top;
        pageX=event.clientX;
        pageY=event.clientY;
        drag={active:true,shift:{x:shiftX,y:shiftY}}
        document.body.addEventListener('mouseup',mouseUpHandler);
        document.body.addEventListener('mousemove',mouseHandler);
    }
    const onMouseUp=(event)=>{
        drag={active:false,shift:{x:0,y:0}}
    }

    const handleSubmit=(message)=>{

        setState({
            edit: false,
            data: {
                ...state.data,
                message
            }
        })
    }

    const isEditable = state.edit;

    return <>
        <div className="toy-box-container">
            <div className="toy-box" onClick={!state.data.message&&startEdit}>
                <img className="toy-box__front" src={BoxFront} />
                <div>
                    <img className="toy-in-box toy-box__toy-1" src={T1} alt=""/>
                    <img className="toy-in-box toy-box__toy-2" src={T3} alt=""/>
                    <img className="toy-in-box toy-box__toy-3" src={T2} alt=""/>
                </div>
                <img className="toy-box__back" src={BoxBack} />
            </div>
        </div>
            <div
                ref={toyRef}
                onMouseDown={target&&((e)=>{
                    if (state.edit||!state.data.message) return
                    onMouseDown(e);
                })}
                onDoubleClick={startEdit}
                onDragStart={()=>false}
                title={state.data.message}
                style={{
                backgroundImage:`url(${ToyBig})`
                }}
                onMouseUp={target&&onMouseUp}
                className={cn('toy toy-new', isEditable && 'toy-new--edit', state.data.message &&'toy-new--has-message')}
            >
                {isEditable && <EditForm mess={state.data.message} onSubmit={handleSubmit}/>}
            </div>
        </>
}

export default NewToy
