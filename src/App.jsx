import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { QuizProvider, useQuiz } from './context/QuizContext';
import StartPage from './pages/StartPage';
import QuizPage from './pages/QuizPage'; // Will implement next
import ReportPage from './pages/ReportPage'; // Will implement next

function QuizApp() {
    const { status } = useQuiz();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (status === 'active' && location.pathname === '/') {
            navigate('/quiz');
        }
        if (status === 'finished' && location.pathname !== '/report') {
            navigate('/report');
        }
    }, [status, navigate, location.pathname]);

    return (
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route
                path="/quiz"
                element={status === 'active' ? <QuizPage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/report"
                element={status === 'finished' ? <ReportPage /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default function App() {
    return (
        <QuizProvider>
            <QuizApp />
        </QuizProvider>
    );
}
