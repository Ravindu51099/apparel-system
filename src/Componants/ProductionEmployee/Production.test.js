import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductionPage from "./ProductionPage";

describe("ProductionPage component", () => {
  test("renders the Orders table", () => {
    render(<ProductionPage />);

    expect(screen.getByRole("table", { name: "Orders" })).toBeInTheDocument();
  });

  test("renders the Tasks table", () => {
    render(<ProductionPage />);

    expect(screen.getByRole("table", { name: "Tasks" })).toBeInTheDocument();
  });

  test("displays the selected task in the modal", () => {
    render(<ProductionPage />);
    const modalTitle = screen.getByText(/task details/i);
    const taskDescription = screen.getByText(/assemble zerone t-shirts/i);
    expect(modalTitle).toBeInTheDocument();
    expect(taskDescription).toBeInTheDocument();
  });

  test("adds a new task to the table", () => {
    render(<ProductionPage />);
    const addButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(addButton);

    const modalTitle = screen.getByText(/new task/i);
    expect(modalTitle).toBeInTheDocument();

    const descriptionInput = screen.getByLabelText(/description/i);
    const assignedToInput = screen.getByLabelText(/assigned to/i);
    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.change(descriptionInput, { target: { value: "Test Task" } });
    fireEvent.change(assignedToInput, { target: { value: "Test User" } });
    fireEvent.click(saveButton);

    const taskDescription = screen.getByText(/test task/i);
    expect(taskDescription).toBeInTheDocument();
  });
});
