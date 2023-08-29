import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductPage from "./ProductPage";

beforeEach(async () => {
  render(<ProductPage />);
  await waitForElementToBeRemoved(() => screen.getByTitle(/loading/i));
});

describe("ProductPage", () => {
  test("WHEN a user goes to the Products page, THEN the pagination control will be displayed", () => {
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    const nextPageButton = screen.getByRole("button", { name: "Next page" });
    expect(previousPageButton).toBeInTheDocument();
    expect(nextPageButton).toBeInTheDocument();
  });

  test("WHEN a user navigates to the first page of the Products page, THEN the previous/back button of the pagination control will be disabled", () => {
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    expect(previousPageButton).toBeDisabled();
  });

  //todo.test
  test("WHEN the user navigates to the second page of the Products page, THEN the previous/back button of the pagination control will be enabled", () => {
    // navigating to second page
    const nextPageButton = screen.getByRole("button", { name: "Next page" });
    userEvent.click(nextPageButton);
    // check previous page button becomes enabled
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    expect(previousPageButton).not.toBeDisabled();
  });

  //todo.test
  test("WHEN the user navigates to the last page of the Products page, THEN next button of the pagination control will be disabled", () => {
    // navigating to the last page + implement logic to click the next page button until disabled
    const nextPageButton = screen.getByRole("button", { name: "Next page" });
    while (!nextPageButton.disabled) {
      userEvent.click(nextPageButton);
    }
    // check next page button becomes disabled
    expect(nextPageButton).toBeDisabled();
  });

  test("WHEN a user goes to the Products page, THEN the current page will be highlighted in the pagination control", () => {
    const pageDisplay = screen.queryByText(/page/i);
    expect(pageDisplay.textContent).toBe("Page 1 of 2");
    const nextPageButton = screen.getByRole("button", { name: "Next page" });
    userEvent.click(nextPageButton);
    expect(pageDisplay.textContent).toBe("Page 2 of 2");
  });
});
