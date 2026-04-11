import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";
import { continents } from "@/data/lakes";

const normalizeLakeName = (name: string) =>
  name.normalize("NFC").trim().toLocaleLowerCase("et-EE");

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
    expect(
      screen.getByText(
        "Tõetruu kaart päris taustakaardiga. Suumi sügavale sisse, lohista kaarti ja kliki järvedel.",
      ),
    ).toBeInTheDocument();

    const pageText = document.body.textContent ?? "";
    expect(pageText).not.toContain("TÃµetruu");
    expect(pageText).not.toContain("Ã¼rgjÃ¤rv");
    expect(pageText).not.toContain("JÃ¤rved");
  }, 15000);

  it("keeps lake names unique inside every section", () => {
    for (const continent of continents) {
      const seen = new Set<string>();

      for (const lake of continent.lakes) {
        const normalized = normalizeLakeName(lake.name);

        expect(
          seen.has(normalized),
          `Duplicate lake "${lake.name}" found in section "${continent.nameEt}"`,
        ).toBe(false);

        seen.add(normalized);
      }
    }
  });
});
