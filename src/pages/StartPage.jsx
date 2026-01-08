import { useState } from 'react';
import { useQuiz } from '../context/QuizContext';

function StartPage() {
    const { startQuiz, status, error } = useQuiz();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && email.includes('@')) {
            startQuiz(email);
        }
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
                            placeholder="you@example.com"
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
