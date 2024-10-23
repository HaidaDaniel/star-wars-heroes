import React from "react";
import { render, screen } from "@testing-library/react";
import { AppContext, AppProvider } from "./AppContext";
import { StarWarsData } from "../types/Data";
import { Film } from "../types/Film.type";

const TestComponent: React.FC = () => {
  const contextValue = React.useContext(AppContext);
  return (
    <div>
      <span data-testid="films-length">{Object.keys(contextValue.films).length}</span>
    </div>
  );
};

describe("AppContext", () => {
  it("provides default data", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const filmsLength = screen.getByTestId("films-length");
    expect(filmsLength.textContent).toBe("0"); 
  });

  it("can wrap components and provide context", () => {
    const customData: StarWarsData = {
      films: {
        1: { id: 1, title: "A New Hope" } as Film,
      },
    };

    const CustomTestComponent: React.FC = () => {
      const contextValue = React.useContext(AppContext);
      return (
        <div>
          <span data-testid="films-length">{Object.keys(contextValue.films).length}</span>
        </div>
      );
    };

    render(
      <AppContext.Provider value={customData}>
        <CustomTestComponent />
      </AppContext.Provider>
    );

    const filmsLength = screen.getByTestId("films-length");
    expect(filmsLength.textContent).toBe("1");
  });
});