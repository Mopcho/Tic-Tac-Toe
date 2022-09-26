import { Board } from './board/board';
import { useState } from 'react';

export const Game = () => {
	let [squareValues, setSquareValues] = useState({
		xIsNext: true,
		history: [{ squares: Array(9).fill(null) }],
		step: 0,
	});

	function handleClick(i) {
		const history = squareValues.history.slice(0, squareValues.step + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = squareValues.xIsNext ? 'X' : 'O';

		setSquareValues({
			history: history.concat([
				{
					squares: squares,
				},
			]),
			step: history.length,
			xIsNext: !squareValues.xIsNext,
		});
	}

	function calculateWinner(squares) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a];
			}
		}
		return null;
	}

	function jumpTo(move) {
		setSquareValues({
			...squareValues,
			step: move,
			xIsNext: move % 2 === 0,
		});
	}

	const history = squareValues.history;
	const current = history[squareValues.step];
	const winner = calculateWinner(current.squares);

	const moves = history.map((step, move) => {
		const desc = move ? 'Go to move #' + move : 'Go to game start';
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		);
	});

	let status;
	if (winner) {
		status = 'Winner: ' + winner;
	} else {
		status = 'Next player: ' + (squareValues.xIsNext ? 'X' : 'O');
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board
					squares={current.squares}
					onClick={(i) => handleClick(i)}
				/>
			</div>
			<div className="game-info">
				<div className="status">{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	);
};
