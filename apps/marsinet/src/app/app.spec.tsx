import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './app'; // Asegúrate de que la ruta de importación sea correcta
import '@testing-library/jest-dom';

describe('App Component', () => {
  it('renders welcome message', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /Check/i })).toBeInTheDocument();
  });

  it('navigates to the home page and shows the correct content', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/This is the generated root route./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Click here for page 2./i)).toBeInTheDocument();
  });

  it('navigates to page 2 when the link is clicked', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const page2Links = screen.getAllByText(/Page 2/i);
    userEvent.click(page2Links[0]); // Si hay más de un enlace, asegúrate de hacer clic en el correcto
    await waitFor(() => {
      expect(
        screen.getByText(/Click here to go back to root page./i)
      ).toBeInTheDocument();
    });
  });
});
