import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputItemList from "./InputItemsList";

describe("InputItems component", () => {
  test("empty input", async () => {
    const handleFilter = jest.fn();
    render(<InputItemList handler={handleFilter} />);

    await waitFor(() => {
        userEvent.click(
            screen.getByRole("button", { name: /Generate your pairings/i })
          );
        const outputElement = screen.getByText("Error : empty input");
        expect(outputElement).toBeInTheDocument();
      });
 
  });
  test("use props handler", async () => {
    const handleFilter = jest.fn();
    render(<InputItemList handler={handleFilter} />);
    const placeholderElement = screen.getByPlaceholderText(
      /You can add a user by adding/i
    );
    await userEvent.type(placeholderElement, "Jean\nSarah");
    await userEvent.click(
      screen.getByRole("button", { name: /Generate your pairings/i })
    );
    expect(handleFilter).toHaveBeenCalled();
  });
});
