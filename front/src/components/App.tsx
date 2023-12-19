import React, { useEffect, useRef, useState } from "react";

import Snow from "react-snow-effect";
import Toy from "@components/Toy/Toy";
import NewToy from "@components/NewToy";
import treeImg from "@assets/pngegg.png";
import logo from "@assets/logo.svg";
import Background2 from "@assets/background.jpg";

import "./App.css";

function App() {
	const [ourToys, updateOurToys] = useState([]);
	const [isMobile, setMobileMode] = useState(false);
	const [size, setSize] = useState({
		clientHeight: document.getElementById("app")?.clientHeight || 0,
		clientWidth: document.getElementById("app")?.clientWidth || 0,
	});

	const tree = useRef(null);

	const getToys = () => {
		fetch(`${process.env.API_SERVICE_URL}/toys`)
			.then((resp) => {
				return resp.json();
			})
			.then((resp) => {
				console.log("getToys resp", resp);
				if (resp.length) updateOurToys(resp);
				else throw new Error({ message: resp });
			})
			.catch((e) => {
				console.log("error", e.toString());
			});
	};

	const changeSize = () => {
		const isNormalScreen = document?.body.clientWidth >= 1300;
		if (isNormalScreen) {
			setMobileMode(false);
			setSize({
				clientHeight: document.getElementById("app")?.clientHeight || 0,
				clientWidth: document.getElementById("app")?.clientWidth || 0,
			});
		} else {
			setMobileMode(true);
		}
	};

	useEffect(() => {
		if (document?.body.clientWidth < 1300) {
			setMobileMode(true);
		} else {
			getToys();
		}
		window.addEventListener("resize", changeSize);
		return () => {
			window.removeEventListener("resize", changeSize);
		};
	}, []);

	if (isMobile)
		return (
			<div className="christmas-tree-app  scene">
				<div className="christmas-tree-app__placeholder">
					<div className="christmas-tree-app__placeholder-content">
						<h1>
							<strong>К cожалению, Мы пока не поддерживаем такое разрешение</strong> <br />
							(минимальная ширина экрана 1300 )
						</h1>
						<hr />
						<h2>МИРА,ДОБРА И УДАЧИ В НОВОМ ГОДУ ВАМ!!!</h2>
					</div>
				</div>
			</div>
		);

	return (
		<div className="christmas-tree-app scene" style={{ backgroundImage: `url(${Background2})` }}>
			<h1 className="christmas-tree-app__current-year">{process.env.CURRENT_YEAR}</h1>
			<Snow />
			<NewToy target={tree} clientSize={size} />
			{ourToys?.map((toy, index) => <Toy clientSize={size} toy={toy} key={"toy" + index} />)}
			<main className="christmas-tree-app__tree-container ">
				<img src={treeImg} ref={tree} title="Елка" className="droppable" />
			</main>
			<img className="christmas-tree-app__footer-logo" src={logo} alt="" />
		</div>
	);
}

export default App;
