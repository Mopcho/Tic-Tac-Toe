import { Square } from './square/square';

export const Board = ({ squares, onClick }) => {
	console.log(squares);
	return (
		<>
			<ul>
				<li className="board-row">
					<Square value={squares[0]} onClick={() => onClick(0)} />
					<Square value={squares[1]} onClick={() => onClick(1)} />
					<Square value={squares[2]} onClick={() => onClick(2)} />
				</li>
				<li className="board-row">
					<Square value={squares[3]} onClick={() => onClick(3)} />
					<Square value={squares[4]} onClick={() => onClick(4)} />
					<Square value={squares[5]} onClick={() => onClick(5)} />
				</li>
				<li className="board-row">
					<Square value={squares[6]} onClick={() => onClick(6)} />
					<Square value={squares[7]} onClick={() => onClick(7)} />
					<Square value={squares[8]} onClick={() => onClick(8)} />
				</li>
			</ul>
		</>
	);
};
