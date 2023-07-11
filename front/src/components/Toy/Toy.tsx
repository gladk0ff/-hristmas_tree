import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import { Tooltip } from 'react-tooltip'
import T1 from 'assets/toy1.png';
import T2 from 'assets/toy2.png';
import T3 from 'assets/toy3.png';

import './Toy.css';

export const getRandomInt = (max) => {
    const val = Math.floor(Math.random() * max);
    return (val > 0) ? val : 1;
}

export const config = {
    1: T1,
    2: T2,
    3: T3
}

const Toy = ({positionX, positionY, message}: any) => {
    if (!positionX || !positionY || !message) return null;
    const clientHeight = document.documentElement.clientHeight;
    const clientWidth = document.documentElement.clientWidth;
    const style = {
        left: clientWidth / positionX,
        top: clientHeight / positionY,
    };

    return <>
        <div
             style={style}
             data-tooltip-id="my-tooltip"
             data-tooltip-content={message}
             className="toy toy--read-only">
            <img src={config[getRandomInt(3)]}/>
        </div>
        <Tooltip multiline id="my-tooltip" />
    </>
}

export default Toy
