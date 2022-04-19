import { render, screen } from "@testing-library/react";
import { MainPageHero } from "./components/MainPageHero";
import { MainPageIndex } from "./MainPageIndex";

test("renders learn react link", () => {
  render(<MainPageHero />);
  const linkElement = screen.getByText(/especialista/i);
  expect(linkElement).toBeInTheDocument();
});
