import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

// initial test to check if add button is present:
test("renders header", () => {
  const page = render(<App />);
  const headerElement = screen.getByText("Efilibrary");
  expect(headerElement).toBeInTheDocument();
});

// TEST FOR BROWSING THE WHOLE LIBRARY

// TEST FOR ADDING A BOOK TO THE CATALOG

// TEST FOR EDITING BOOK INFORMATION

// TEST FOR LOANING A BOOK FROM CATALOG

// TEST FOR RETURNING A LOANED BOOK

// TEST FOR LOGIN FUNCTIONALITY
