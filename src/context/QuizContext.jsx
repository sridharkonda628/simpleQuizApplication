import { createContext, useContext, useEffect, useReducer } from 'react';
import { fetchQuestions } from '../services/api';

const QuizContext = createContext();

const initialState = {
    status: 'idle', // idle, loading, ready, active, finished, error
    questions: [],
    currentQuestionIndex: 0,
    visitedIndices: new Set([0]), // Start with 0 visited
    userAnswers: {},
    email: '',
    secondsRemaining: null,
    error: null,
};

const QUIZ_DURATION = 30 * 60; // 30 minutes in seconds

function reducer(state, action) {
    switch (action.type) {
        case 'setEmail':
            return { ...state, email: action.payload };
        case 'startLoading':
            return { ...state, status: 'loading', error: null };
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'active',
                secondsRemaining: QUIZ_DURATION,
                visitedIndices: new Set([0])
            };
        case 'dataFailed':
            return { ...state, status: 'error', error: action.payload };
        case 'newAnswer':
            const { questionId, answer } = action.payload;
            return {
                ...state,
                userAnswers: {
                    ...state.userAnswers,
                    [questionId]: answer
                }
            };
        case 'nextQuestion':
            if (state.currentQuestionIndex >= state.questions.length - 1) return state;
            const nextIndex = state.currentQuestionIndex + 1;
            const newVisitedNext = new Set(state.visitedIndices);
            newVisitedNext.add(nextIndex);
            return {
                ...state,
                currentQuestionIndex: nextIndex,
                visitedIndices: newVisitedNext
            };
        case 'prevQuestion':
            if (state.currentQuestionIndex <= 0) return state;
            const prevIndex = state.currentQuestionIndex - 1;
            const newVisitedPrev = new Set(state.visitedIndices);
            newVisitedPrev.add(prevIndex);
            return {
                ...state,
                currentQuestionIndex: prevIndex,
                visitedIndices: newVisitedPrev
            };
        case 'jumpToQuestion':
            const jumpIndex = action.payload;
            const newVisitedJump = new Set(state.visitedIndices);
            newVisitedJump.add(jumpIndex);
            return {
                ...state,
                currentQuestionIndex: jumpIndex,
                visitedIndices: newVisitedJump
            };
        case 'tick':
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? 'finished' : state.status,
            };
        case 'finishQuiz':
            return { ...state, status: 'finished' };
        case 'restart':
            return { ...initialState };
        default:
            throw new Error('Unknown action');
    }
}

function QuizProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Timer effect
    useEffect(() => {
        if (state.status === 'active' && state.secondsRemaining > 0) {
            const timer = setInterval(() => {
                dispatch({ type: 'tick' });
            }, 1000);
            return () => clearInterval(timer);
        } else if (state.status === 'active' && state.secondsRemaining === 0) {
            dispatch({ type: 'finishQuiz' });
        }
    }, [state.status, state.secondsRemaining]);

    const startQuiz = async (email) => {
        dispatch({ type: 'setEmail', payload: email });
        dispatch({ type: 'startLoading' });
        try {
            const questions = await fetchQuestions();
            dispatch({ type: 'dataReceived', payload: questions });
        } catch (err) {
            dispatch({ type: 'dataFailed', payload: err.message });
        }
    };

    const submitQuiz = () => {
        dispatch({ type: 'finishQuiz' });
    };

    return (
        <QuizContext.Provider
            value={{
                ...state,
                dispatch,
                startQuiz,
                submitQuiz
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined)
        throw new Error('useQuiz must be used within a QuizProvider');
    return context;
}

export { QuizProvider, useQuiz };
