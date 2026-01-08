import { useQuiz } from '../context/QuizContext';
import toast from 'react-hot-toast';
import Timer from '../components/Timer';
import QuestionPalette from '../components/QuestionPalette';
import QuestionCard from '../components/QuestionCard';

function QuizPage() {
    const {
        questions,
        currentQuestionIndex,
        userAnswers,
        visitedIndices,
        dispatch,
        submitQuiz
    } = useQuiz();

    const currentQuestion = questions[currentQuestionIndex];
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleOptionSelect = (option) => {
        dispatch({
            type: 'newAnswer',
            payload: { questionId: currentQuestionIndex, answer: option } // Using index as ID
        });
    };

    const handleNext = () => dispatch({ type: 'nextQuestion' });
    const handlePrev = () => dispatch({ type: 'prevQuestion' });
    const handleJump = (index) => dispatch({ type: 'jumpToQuestion', payload: index });

    return (
        <div className="quiz-page">
            <header className="quiz-header">
                <h1>Quiz Application</h1>
                <Timer />
            </header>

            <div className="quiz-layout">
                <main className="quiz-main">
                    <div className="progress-bar">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>

                    <QuestionCard
                        question={currentQuestion}
                        selectedOption={userAnswers[currentQuestionIndex]}
                        onSelect={handleOptionSelect}
                    />

                    <div className="quiz-controls">
                        <button
                            onClick={handlePrev}
                            disabled={isFirstQuestion}
                            className="btn-secondary"
                        >
                            Previous
                        </button>

                        {isLastQuestion ? (
                            <button
                                onClick={() => {
                                    const answeredCount = Object.keys(userAnswers).length;
                                    const totalQuestions = questions.length;
                                    const confirmMsg = answeredCount < totalQuestions
                                        ? `You have answered ${answeredCount} out of ${totalQuestions} questions.\n\nAre you sure you want to submit?`
                                        : "Are you sure you want to submit the quiz?";

                                    if (window.confirm(confirmMsg)) {
                                        submitQuiz();
                                        toast.success("Quiz Submitted Successfully!");
                                    }
                                }}
                                className="btn-primary submit-btn"
                            >
                                Submit Quiz
                            </button>
                        ) : (
                            <button onClick={handleNext} className="btn-primary">
                                Next
                            </button>
                        )}
                    </div>
                </main>

                <aside className="quiz-sidebar">
                    <QuestionPalette
                        questions={questions}
                        currentQuestionIndex={currentQuestionIndex}
                        userAnswers={userAnswers}
                        visitedIndices={visitedIndices}
                        onJump={handleJump}
                    />
                </aside>
            </div>
        </div>
    );
}

export default QuizPage;
