import he from 'he';

const API_URL = 'https://opentdb.com/api.php?amount=15';

export const fetchQuestions = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        const data = await response.json();

        if (data.response_code !== 0) {
            throw new Error('API returned error code: ' + data.response_code);
        }

        return data.results.map((q, index) => {
            const incorrectAnswers = q.incorrect_answers.map(a => he.decode(a));
            const correctAnswer = he.decode(q.correct_answer);
            // Combine and shuffle
            const allOptions = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);

            return {
                id: index, // Simple index as ID since API doesn't provide unique IDs
                question: he.decode(q.question),
                correctAnswer: correctAnswer,
                options: allOptions,
                category: q.category,
                difficulty: q.difficulty,
                type: q.type
            };
        });
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
    }
};
