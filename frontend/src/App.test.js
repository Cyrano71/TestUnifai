import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const placeholderElement = screen.getByPlaceholderText(
    /You can add a user by adding/i
  );
  expect(placeholderElement).toBeInTheDocument();
  const resultTable = screen.getByRole("result");
  expect(resultTable.className).toContain("result none");
});
