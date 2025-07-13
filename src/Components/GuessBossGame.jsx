import React, { useState, useEffect } from "react";
import bosses from "../data/Bosses";

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const GuessBossGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [remainingBosses, setRemainingBosses] = useState([]);
  const [currentBoss, setCurrentBoss] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [disableButtons, setDisableButtons] = useState(false);

  const startGame = (numQuestions) => {
    const bossesShuffled = shuffleArray(bosses).slice(0, numQuestions);
    setTotalQuestions(numQuestions);
    setRemainingBosses(bossesShuffled);
    setScore(0);
    setQuestionsAsked(0);
    setGameStarted(true);
    setCurrentBoss(null);
  };

  useEffect(() => {
    if (gameStarted && remainingBosses.length > 0 && !currentBoss) {
      loadNextBoss();
    }
  }, [gameStarted, remainingBosses]);

  const loadNextBoss = () => {
    const [nextBoss, ...rest] = remainingBosses;
    setCurrentBoss(nextBoss);
    setShuffledOptions(shuffleArray(nextBoss.options));
    setRemainingBosses(rest);
    setFeedback("");
    setDisableButtons(false);
    setQuestionsAsked((prev) => prev + 1);
  };

  const handleGuess = (guess) => {
    if (disableButtons) return;
    setDisableButtons(true);

    const correct = guess === currentBoss.name;
    setFeedback(correct ? "✅ ¡Correcto!" : `❌ Incorrecto. Era: ${currentBoss.name}`);
    if (correct) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (questionsAsked >= totalQuestions) {
        alert(`Juego terminado. ¡Puntaje final: ${score + (correct ? 1 : 0)}!`);
        setGameStarted(false);
        setCurrentBoss(null);
      } else {
        loadNextBoss();
      }
    }, 2000);
  };

  if (!gameStarted) {
    return (
      <div className="container text-center mt-5">
        <h2 className="mb-4">¿Cuántos jefes quieres adivinar?</h2>
        <div className="d-flex justify-content-center gap-3">
          {[5, 10, 20].map((num) => (
            <button key={num} className="btn btn-primary btn-lg" onClick={() => startGame(num)}>
              {num}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!currentBoss) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div className="container mt-4 text-center">
      <h2 className="mb-4">🧠 Adivina el jefe</h2>
      <img
        src={currentBoss.image}
        alt="Jefe"
        className="img-fluid mb-4 shadow"
        style={{
          width: "50%",
          height: "50%",
          objectFit: "cover",
          borderRadius: "12px",
          border: "3px solid #222",
        }}
      />
      <div className="d-grid gap-3 col-10 col-sm-8 col-md-6 mx-auto mb-3">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            className="btn btn-outline-dark fs-5"
            onClick={() => handleGuess(option)}
            disabled={disableButtons}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <p className={`fw-bold fs-5 ${feedback.includes("Correcto") ? "text-success" : "text-danger"}`}>
          {feedback}
        </p>
      )}
      <p className="mt-2">
        Puntaje: <strong>{score}</strong> / {totalQuestions}
      </p>
      <p>Pregunta {questionsAsked} de {totalQuestions}</p>
    </div>
  );
};

export default GuessBossGame;