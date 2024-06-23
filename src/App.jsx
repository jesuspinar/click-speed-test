import { Button, Container, Stack, Select, Option } from "@mui/joy";
import React, { useState, useEffect } from "react";
import AutoDialog from "./components/AutoDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const second = 1000;
	const defaultTime = 5;
	const [clicks, setClicks] = useState(-1);
	const [timeLeft, setTimeLeft] = useState(-1);
	const [gameActive, setGameActive] = useState(false);
	const [selectedTime, setSelectedTime] = useState(defaultTime);
	const [records, setRecords] = useState([]);

	useEffect(() => {
		const savedRecords = JSON.parse(localStorage.getItem("records"));
		if (savedRecords) {
			setRecords(savedRecords);
		}
	}, []);

	useEffect(() => {
		if (timeLeft > 0) {
			const timer = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, second);
			return () => clearInterval(timer);
		} else if (timeLeft === 0) {
			setGameActive(false);
			checkForRecord();
		}
	}, [timeLeft]);

	const startGame = () => {
		setClicks(0);
		setTimeLeft(selectedTime);
		setGameActive(true);
	};

	const handleClick = () => {
		if (gameActive) {
			setClicks((prevClicks) => prevClicks + 1);
		}
	};

	const handleTimeChange = (_, value) => {
		setSelectedTime(value);
	};

	const checkForRecord = () => {
		const newRecord = { name: "", clicks, time: selectedTime };
		const updatedRecords = [...records, newRecord].sort((a, b) => b.clicks - a.clicks).slice(0, 3);
		if (updatedRecords.some((record) => record.clicks === clicks)) {
			const name = prompt("You set a new record! Enter your name:");
			if (name) {
				updatedRecords.map((record) => {
					if (record.clicks === clicks && !record.name) {
						record.name = name;
					}
				});
			}
			setRecords(updatedRecords);
			localStorage.setItem("records", JSON.stringify(updatedRecords));
		} else {
			toast.info("You are not at the top, try again!");
		}
	};

	return (
		<Container>
			<ToastContainer position="bottom-right" autoClose={2500} closeOnClick theme="colored" />
			<Stack direction="row" justifyContent="space-between">
				<AutoDialog placeholder="Rank" title="Top 3 players">
					{records.length > 0 ? (
						<ol>
							{records.map((record, index) => {
								return <li key={index}>{`${record?.name}: ${record?.clicks} in ${record?.time}s`}</li>;
							})}
						</ol>
					) : (
						"There are no records available..."
					)}
				</AutoDialog>
				<Select disabled={gameActive} startDecorator={<>⏳</>} defaultValue={defaultTime} onChange={handleTimeChange}>
					<Option value={15}>15s</Option>
					<Option value={10}>10s</Option>
					<Option value={5}>5s</Option>
					<Option value={3}>3s</Option>
				</Select>
			</Stack>
			<Stack alignItems="center">
				{gameActive ? (
					<Button variant="soft" onClick={handleClick}>
						Click here!
					</Button>
				) : (
					<Button variant="soft" onClick={startGame}>
						Start a game!
					</Button>
				)}
			</Stack>
		</Container>
	);
}

export default App;
