import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuiz } from '../context/QuizContext';

function StartPage() {
    const { startQuiz, status, error } = useQuiz();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }

        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        startQuiz(email);
        toast.promise(
            Promise.resolve(), // just to trigger the loading state visual if we wanted, or we rely on the component transition
            {
                loading: 'Starting...',
                success: <b>Quiz Started! Good Luck.</b>,
                error: <b>Could not start.</b>,
            }
        );
        // actually toast.promise works best with the promise returned by startQuiz if it was async and threw errors.
        // startQuiz dispatch is async in effect but synchronous in redux-style.
        // Let's just use simple success if logic flows.
    };

    return (
        <div className="start-page">
            <header>
                <h1>Simple Quiz App</h1>
                <p className="subtitle">Test your knowledge with 15 random questions!</p>
            </header>

            <div className="card">
                <h2>Get Started</h2>
                <p>Please enter your email address to begin the quiz. You will have 30 minutes.</p>

                {error && <div className="alert-error">Error: {error}</div>}

                <form onSubmit={handleSubmit} className="start-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading'}
                            required
                        />
                    </div>
                    <button type="submit" disabled={status === 'loading'} className="btn-primary">
                        {status === 'loading' ? 'Loading...' : 'Start Quiz'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default StartPage;
