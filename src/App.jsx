import "./App.css";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS, WINNER_COMBOS } from "./constants.js";

function App() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(TURNS.X);
    const [winner, setWinner] = useState(null);

    const checkWinner = (boardToCheck) => {
        for (const combo of WINNER_COMBOS) {
            const [a, b, c] = combo;
            if (
                boardToCheck[a] &&
                boardToCheck[a] == boardToCheck[b] &&
                boardToCheck[a] == boardToCheck[c]
            ) {
                return boardToCheck[a];
            }
        }
        return null;
    };
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
    };

    const checkEndGame = (newBoard) => {
        return newBoard.every((square) => square != null);
    };

    const updateBoard = (index) => {
        // si hay algo en la pieza del tablero que se clika no hagas nada, return
        if (board[index] || winner) return;
        // actualizar el tablero primero haciendo una copia del tablero y despues hacemos set al tablero que ya teniamos
        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);
        // cambiar de turno
        const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);
        // revisar si hay un ganador
        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            confetti();
            setWinner(newWinner);
        } else if (checkEndGame(newBoard)) {
            setWinner(false);
        }
    };

    return (
        <main className="board">
            <h1>Tres En Raya</h1>
            <button onClick={resetGame}>Empezar de nuevo</button>
            <section className="game">
                {board.map((square, index) => {
                    return (
                        <Square
                            key={index}
                            index={index}
                            updateBoard={updateBoard}
                        >
                            {square}
                        </Square>
                    );
                })}
            </section>
            <section className="turn">
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>
            {winner != null && (
                <section className="winner">
                    <div className="text">
                        <h2>{winner == false ? "Empate" : "Ganó " + winner}</h2>
                        <header className="win">
                            {winner && <Square>{winner}</Square>}
                        </header>
                        <footer>
                            <button onClick={resetGame}>
                                Empezar de nuevo
                            </button>
                        </footer>
                    </div>
                </section>
            )}
        </main>
    );
}

export default App;
