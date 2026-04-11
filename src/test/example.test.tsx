import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("App", () => {
  it("renders the home page", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: /maakera/i })).toBeInTheDocument();
  });

  it("renders Estonian text without mojibake", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 2, name: "Ürgjärved" })).toBeInTheDocument();
    expect(screen.getByText("Maailma 20 ürgjärve")).toBeInTheDocument();
    expect(screen.getByText("Mis on ürgjärv?")).toBeInTheDocument();
    expect(screen.getByText("Tõetruu kaart päris taustakaardiga. Suumi sügavale sisse, lohista kaarti ja kliki järvedel.")).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/[ÃÂÅð]/);
  });
});
