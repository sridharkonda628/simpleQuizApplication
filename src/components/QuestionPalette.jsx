function QuestionPalette({ questions, currentQuestionIndex, userAnswers, visitedIndices, onJump }) {
    return (
        <div className="question-palette">
            <h3>Overview</h3>
            <div className="palette-grid">
                {questions.map((q, index) => {
                    const isAnswered = userAnswers[index] !== undefined;
                    const isActive = index === currentQuestionIndex;
                    const isVisited = visitedIndices ? visitedIndices.has(index) : false;

                    let className = 'palette-item';
                    if (isActive) className += ' active';
                    else if (isAnswered) className += ' answered';
                    else if (isVisited) className += ' visited';

                    return (
                        <button
                            key={q.id}
                            className={className}
                            onClick={() => onJump(index)}
                            aria-label={`Go to question ${index + 1}`}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>
            <div className="palette-legend">
                <span className="legend-item"><span className="dot active"></span> Current</span>
                <span className="legend-item"><span className="dot answered"></span> Answered</span>
                <span className="legend-item"><span className="dot visited"></span> Visited</span>
                <span className="legend-item"><span className="dot"></span> Pending</span>
            </div>
        </div>
    );
}

export default QuestionPalette;
