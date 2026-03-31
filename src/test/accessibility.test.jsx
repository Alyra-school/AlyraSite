import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import NavBar from "../components/NavBar";
import ProgramCatalog from "../components/ProgramCatalog";

const testPrograms = [
  {
    id: "PRG-T1",
    slug: "dev-blockchain",
    title: "Dev Blockchain",
    subtitle: "Construire des dApps en production",
    tags: ["Blockchain", "Developpement"],
    date: "Mai 2026",
    duration: "14 semaines",
    price: 6200,
    image: "https://picsum.photos/seed/test-1/640/360",
  },
  {
    id: "PRG-T2",
    slug: "developpeur-intelligence-artificielle",
    title: "Developpeur Intelligence Artificielle",
    subtitle: "MLOps et applications generatives",
    tags: ["IA", "Data"],
    date: "Septembre 2026",
    duration: "16 semaines",
    price: 6900,
    image: "https://picsum.photos/seed/test-2/640/360",
  },
];

function renderWithRouter(ui, initialEntries = ["/"]) {
  return render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>);
}

const axeConfig = {
  rules: {
    "color-contrast": { enabled: false },
  },
};

describe("accessibility", () => {
  it("NavBar should not have obvious a11y violations", async () => {
    const { container } = renderWithRouter(
      <NavBar
        navRef={{ current: null }}
        isProgramsArea
        isFinancement={false}
        isVosBesoins={false}
        isBlog={false}
        isQuiSommesNous={false}
        isNosAnciens={false}
        isRendezVous={false}
        onHome={vi.fn()}
        onCatalogAll={vi.fn()}
        onCatalogBlockchain={vi.fn()}
        onCatalogIA={vi.fn()}
        onFeaturedLong={vi.fn()}
        featuredLongTitle="Dev Blockchain"
        onFinancement={vi.fn()}
        onVosBesoins={vi.fn()}
        onBlog={vi.fn()}
        onQuiSommesNous={vi.fn()}
        onNosAnciens={vi.fn()}
        onRendezVous={vi.fn()}
      />
    );

    const results = await axe(container, axeConfig);
    expect(results.violations).toHaveLength(0);
  });

  it("ProgramCatalog should not have obvious a11y violations", async () => {
    const { container } = renderWithRouter(
      <ProgramCatalog programsList={testPrograms} onOpenProgram={vi.fn()} />,
      ["/programmes"]
    );

    expect(screen.getByRole("heading", { name: /catalogue des programmes/i })).toBeInTheDocument();

    const results = await axe(container, axeConfig);
    expect(results.violations).toHaveLength(0);
  });
});
