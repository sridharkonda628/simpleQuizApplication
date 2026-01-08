import { useQuiz } from '../context/QuizContext';

function Timer() {
    const { secondsRemaining } = useQuiz();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Warning color if less than 5 minutes
    const isUrgent = secondsRemaining < 300;

    return (
        <div className={`timer ${isUrgent ? 'urgent' : ''}`}>
            Time Remaining: <strong>{formatTime(secondsRemaining)}</strong>
        </div>
    );
}

export default Timer;
