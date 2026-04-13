import { render, screen } from '@testing-library/react';
import App from './App.jsx';
import { ThemeProvider } from './contexts/ThemeContext';

test('renders the portfolio hero section', async () => {
    render(
        <ThemeProvider>
            <App />
        </ThemeProvider>
    );
    const contactNavLinks = await screen.findAllByRole('link', { name: /Contact/i });
    expect(contactNavLinks.length).toBeGreaterThan(0);
});
