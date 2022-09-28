import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// initial test to check if add button is present:
test('renders add button', () => {
  const page = render(<App />);
  const buttonElement = page.getByLabelText('add');
  expect(buttonElement).toBeInTheDocument();
});

// TEST FOR BROWSING THE WHOLE LIBRARY

// TEST FOR ADDING A BOOK TO THE CATALOG

// TEST FOR EDITING BOOK INFORMATION

// TEST FOR LOANING A BOOK FROM CATALOG

// TEST FOR RETURNING A LOANED BOOK

// TEST FOR LOGIN FUNCTIONALITY