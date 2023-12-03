import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import T1 from "@assets/toy1.png";
import T2 from "@assets/toy2.png";
import T3 from "@assets/toy3.png";

import "./Toy.css";

export const getRandomInt = (max) => {
	const val = Math.floor(Math.random() * max);
	return val > 0 ? val : 1;
};

export const config = {
	1: T1,
	2: T2,
	3: T3,
};

const Toy = ({ toy, clientSize }: any) => {
	const { positionX, positionY, message } = toy;
	const { clientHeight, clientWidth } = clientSize;
	if (!positionX || !positionY || !message || !clientHeight || !clientWidth) return null;

	const style = {
		left: clientWidth * positionX,
		top: clientHeight * positionY,
	};

	return (
		<Tippy
			// visible
			render={(attrs) => (
				<div className="tippy-container" {...attrs}>
					<span className="tippy-messages">{message}</span>
				</div>
			)}
		>
			<div style={style} className="toy toy--read-only">
				<img src={config[getRandomInt(3)]} className="toy__img" />
			</div>
		</Tippy>
	);
};

export default Toy;
