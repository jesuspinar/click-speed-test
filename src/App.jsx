import { Button, Container, Stack, Select, Option, Typography, FormControl, FormLabel, Input } from "@mui/joy";
import { useState, useEffect } from "react";
import AutoDialog from "./components/AutoDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "./components/Dialog";

function App() {
	const second = 1000;
	const defaultTime = 5;
	const [clicks, setClicks] = useState(-1);
	const [timeLeft, setTimeLeft] = useState(-1);
	const [gameActive, setGameActive] = useState(false);
	const [selectedTime, setSelectedTime] = useState(defaultTime);
	const [records, setRecords] = useState([]);

	const [name, setName] = useState("");
	const [openNewRecord, setOpenNewRecord] = useState(false);

	const checkForRecord = () => {
		const isNewRecord = records.length < 3 || clicks > Math.min(...records.map((record) => record.clicks));

		if (isNewRecord) {
			setOpenNewRecord(true);
		} else {
			toast.info("You are not at the top, try again!");
		}
	};

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

	const handleNewRecord = (event) => {
		event.preventDefault();
		if (name) {
			const newRecord = { name, clicks, time: selectedTime };
			const updatedRecords = [...records, newRecord].sort((a, b) => b.clicks - a.clicks).slice(0, 3);

			const isNewRecord = updatedRecords.some((record) => record.name === name);

			if (isNewRecord) {
				setRecords(updatedRecords);
				localStorage.setItem("records", JSON.stringify(updatedRecords));
			}
		}
		setOpenNewRecord(false);
	};

	return (
		<Container>
			<ToastContainer position="bottom-right" autoClose={2500} closeOnClick theme="colored" />
			<Stack direction="row" justifyContent="space-between">
				<AutoDialog disabled={gameActive} placeholder="Rank" title="Top 3 players">
					{records.length > 0 ? (
						records.map((record, index) => {
							const text = `${++index}# ${record?.name}: ${record?.clicks} in ${record?.time}s`;
							return <Typography key={index}>{text}</Typography>;
						})
					) : (
						<Typography>No records available...</Typography>
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
			<Dialog title="You set a new record!" open={openNewRecord} setOpen={setOpenNewRecord}>
				<form onSubmit={handleNewRecord}>
					<Stack spacing={2}>
						<FormControl>
							<FormLabel>Enter your name:</FormLabel>
							<Input onChange={(event) => setName(event.target.value)} autoFocus required />
						</FormControl>
						<Button type="submit">Submit</Button>
					</Stack>
				</form>
			</Dialog>
		</Container>
	);
}

export default App;
