import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from './components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { supabase,  saveGameProgress, getUserGameHistory } from './lib/supabase';
import { useAuth } from '../../../hooks/useAuth';

// Definimos las interfaces para nuestros tipos
interface Question {
  id: number;
  question: string;
  options: string[]; 
  correct: string;
}

// Array de preguntas tipado
const questions: Question[] = [
  {
    id: 1,
    question: "¿Qué proceso ocurre cuando el sol calienta el agua de océanos y lagos?",
    options: ["Condensación", "Evaporación", "Precipitación", "Filtración"],
    correct: "Evaporación"
  },
  {
    id: 2,
    question: "¿Cómo se llama el proceso cuando el vapor de agua se convierte en nubes?",
    options: ["Evaporación", "Condensación", "Infiltración", "Escorrentía"],
    correct: "Condensación"
  },
  {
    id: 3,
    question: "¿Qué proceso ocurre cuando el agua cae de las nubes?",
    options: ["Evaporación", "Condensación", "Precipitación", "Transpiración"],
    correct: "Precipitación"
  },
  {
    id: 4,
    question: "¿Cómo se llama cuando el agua se filtra en el suelo?",
    options: ["Escorrentía", "Evaporación", "Precipitación", "Infiltración"],
    correct: "Infiltración"
  },
  {
    id: 5,
    question: "¿Qué proceso describe el agua que fluye sobre la superficie de la tierra?",
    options: ["Infiltración", "Escorrentía", "Evaporación", "Condensación"],
    correct: "Escorrentía"
  }
];

const Missions: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Nuevo estado para historial
  const [gameHistory, setGameHistory] = useState<any[]>([]);
  
  // Obtén el usuario del contexto de autenticación
  const { user } = useAuth();

  // Efecto para cargar el historial del juego
  useEffect(() => {
    const fetchGameHistory = async () => {
      if (user) {
        try {
          console.log('Fetching game history for user:', user.id);
          const history = await getUserGameHistory(user.id);
          console.log('Fetched game history:', history);
          if (history) setGameHistory(history);
        } catch (error) {
          console.error('Error fetching game history:', error);
        }
      }
    };

    fetchGameHistory();
        // Limpiar la suscripción cuando el componente se desmonte
        return () => {
          supabase.removeChannel(channel);
        };
  }, [user]);

  const channel = supabase
  .channel("realtime-game-progress")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "user_game_progress",
      filter: `user_id=eq.${user?.id}`,
    },
    (payload) => {
      console.log("Evento recibido:", payload);
      if (payload.eventType === "UPDATE") {
        const newMistakes = payload.new?.mistakes || 0;
        setMistakes(newMistakes); // Actualizamos las respuestas malas en tiempo real
      }
    }
  )
  .subscribe();

  const handleAnswer = (selectedOption: string): void => {
    const correct = selectedOption === questions[currentQuestion].correct;

    if (correct) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setMistakes(mistakes + 1); // Esto actualiza el estado local
      setIsCorrect(false);
    }

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        endGame();
      }
    }, 2000);
  };

  const endGame = async () => {
    setGameOver(true);
    
    // Guardar progreso si el usuario está autenticado
    if (user) {
      const progress = {
        user_id: user.id,
        game_type: 'water_cycle',
        score: score,
        total_questions: questions.length,
        mistakes: mistakes
      };

      await saveGameProgress(progress);
      
      // Actualizar historial
      const updatedHistory = await getUserGameHistory(user.id);
      if (updatedHistory) setGameHistory(updatedHistory);
    }
  };

  const restartGame = (): void => {
    setCurrentQuestion(0);
    setScore(0);
    setMistakes(0);
    setShowFeedback(false);
    setGameOver(false);
  };

  const getFeedbackMessage = (): string => {
    if (gameOver) {
      const percentage = (score / questions.length) * 100;
      if (percentage >= 80) {
        return "¡Excelente! Tienes un gran conocimiento del ciclo del agua.";
      } else if (percentage >= 60) {
        return "¡Bien hecho! Aunque podrías mejorar un poco más.";
      } else {
        return "Sigue practicando para mejorar tu comprensión del ciclo del agua.";
      }
    }
    return isCorrect ? "¡Correcto!" : "Incorrecto, intenta de nuevo";
  };

  // Renderizado del historial de juegos
  const renderGameHistory = () => {
    console.log('Rendering game history. User:', user);
    console.log('Game history:', gameHistory);

    if (!user) {
      console.log('No user, cannot render history');
      return null;
    }

    if (gameHistory.length === 0) {
      return (
        <div className="mt-6 text-center text-gray-500">
          Aún no tienes historial de juegos
        </div>
      );
    }

    return (
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-4">Historial de Juegos</h4>
        <div className="space-y-2">
          {gameHistory.map((game, index) => (
            <div 
              key={index} 
              className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
            >
              <span className="text-sm">
                {new Date(game.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="font-medium">
                Puntuación: {game.score}/{game.total_questions}
              </span>
            </div>
          ))}
        </div>
      </div>
    );


  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          El Ciclo del Agua
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!gameOver ? (
          <div className="space-y-4">
            <div className="text-lg font-semibold mb-4">
              Pregunta {currentQuestion + 1} de {questions.length}
            </div>
            
            <div className="mb-6">
              {questions[currentQuestion].question}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full"
                  disabled={showFeedback}
                >
                  {option}
                </Button>
              ))}
            </div>

            {showFeedback && (
              <Alert className={isCorrect ? "bg-green-50" : "bg-red-50"}>
                {isCorrect ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertTitle>
                  {isCorrect ? "¡Correcto!" : "Incorrecto"}
                </AlertTitle>
                <AlertDescription>
                  {getFeedbackMessage()}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between mt-4 text-sm">
              <div>Correctas: {score}</div>
              <div>Incorrectas: {mistakes}</div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-bold">¡Juego Terminado!</h3>
            <p>Puntuación final: {score} de {questions.length}</p>
            <p className="text-lg">{getFeedbackMessage()}</p>
            <Button onClick={restartGame} className="mt-4">
              Jugar de nuevo
            </Button>
            
            {renderGameHistory()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};



export default Missions;