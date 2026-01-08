function QuestionCard({ question, selectedOption, onSelect }) {
    if (!question) return null;

    return (
        <div className="question-card">
            <div className="question-header">
                <span className="category-badge">{question.category}</span>
                <span className="difficulty-badge">{question.difficulty}</span>
            </div>
            <h2 className="question-text">{question.question}</h2>

            <div className="options-list">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
                        onClick={() => onSelect(option)}
                    >
                        <span className="option-letter">{String.fromCharCode(65 + index)}.</span>
                        <span className="option-text">{option}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuestionCard;
