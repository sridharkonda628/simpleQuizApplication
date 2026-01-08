import { useQuiz } from '../context/QuizContext';

function ReportPage() {
    const { questions, userAnswers, email, restart } = useQuiz();

    // Calculate score
    let score = 0;
    questions.forEach((q, index) => {
        if (userAnswers[index] === q.correctAnswer) {
            score++;
        }
    });

    return (
        <div className="report-page">
            <div className="report-header">
                <h1>Quiz Results</h1>
                <p>Email: {email}</p>
                <div className="score-card">
                    <h2>Your Score: {score} / {questions.length}</h2>
                    <p>{Math.round((score / questions.length) * 100)}%</p>
                </div>
                <button onClick={() => window.location.reload()} className="btn-primary">
                    Retake Quiz
                </button>
            </div>

            <div className="answers-review">
                {questions.map((q, index) => {
                    const userAnswer = userAnswers[index];
                    const isCorrect = userAnswer === q.correctAnswer;
                    const isSkipped = userAnswer === undefined;

                    return (
                        <div key={index} className={`review-card ${isCorrect ? 'correct' : 'incorrect'}`}>
                            <div className="review-question">
                                <span className="q-number">{index + 1}.</span> {q.question}
                            </div>
                            <div className="review-comparison">
                                <div className="user-answer-row">
                                    <span className="label">Your Answer:</span>
                                    <span className={`value ${isCorrect ? 'text-success' : 'text-danger'}`}>
                                        {isSkipped ? 'Skipped' : userAnswer}
                                        {isCorrect && ' ✓'}
                                        {!isCorrect && !isSkipped && ' ✗'}
                                    </span>
                                </div>
                                {!isCorrect && (
                                    <div className="correct-answer-row">
                                        <span className="label">Correct Answer:</span>
                                        <span className="value text-success">{q.correctAnswer}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ReportPage;
