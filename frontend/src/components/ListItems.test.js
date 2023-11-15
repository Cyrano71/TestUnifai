import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ListItems from "./ListItems";
import userEvent from "@testing-library/user-event";

describe("ListItems component", () => {
  test("renders pairing data", async () => {
    const user = userEvent.setup();

    const player = "jean";
    const pairing = "thomas";
    const fakeData = {
      1: {
        pairings: [{ player: player, pairing: pairing }],
        pub_date: "2023-03-19T18:41:28+00:00",
      },
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeData),
      })
    );

    render(<ListItems />);

    await waitFor(() => {
      user.click(
        screen.getByRole("button", { name: /List previous SecretSantas/i })
      );

      const outputElement = screen.getByText(
        player + " paired with " + pairing,
        {
          selector: "li",
        }
      );
      expect(outputElement).toBeInTheDocument();
    });

    global.fetch.mockRestore();
  });
});
