import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactInformation } from "../contact-information";
import { ContactFormData } from "@/app/page";

// Mock the child components
jest.mock("../clinic-card", () => ({
  ClinicCard: () => <div data-testid="clinic-card">Clinic Card</div>,
}));

jest.mock("../services-card", () => ({
  ServicesCard: () => <div data-testid="services-card">Services Card</div>,
}));

describe("ContactInformation", () => {
  const mockOnSubmit = jest.fn();
  const initialData: ContactFormData = {
    fullName: "",
    email: "",
    phone: "",
    visitReason: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with initial data", () => {
    render(
      <ContactInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    expect(screen.getByText("Book appointment")).toBeInTheDocument();
    expect(screen.getByText("Enter your details below")).toBeInTheDocument();
    expect(screen.getByTestId("clinic-card")).toBeInTheDocument();
    expect(screen.getByTestId("services-card")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(
      <ContactInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Visit reason")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" }),
    ).toBeInTheDocument();
  });

  it("populates form fields with initial data", () => {
    const filledData: ContactFormData = {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      visitReason: "Regular checkup",
    };

    render(
      <ContactInformation initialData={filledData} onSubmit={mockOnSubmit} />,
    );

    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123-456-7890")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Regular checkup")).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    const user = userEvent.setup();

    render(
      <ContactInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    const continueButton = screen.getByRole("button", { name: "Continue" });
    await user.click(continueButton);

    await waitFor(() => {
      expect(screen.getByText("Full name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Phone number is required")).toBeInTheDocument();
      expect(screen.getByText("Visit reason is required")).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();

    render(
      <ContactInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    const emailInput = screen.getByLabelText("Email");
    await user.type(emailInput, "invalid-email");

    const continueButton = screen.getByRole("button", { name: "Continue" });
    await user.click(continueButton);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email"),
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();

    render(
      <ContactInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    // Fill in all required fields
    await user.type(screen.getByLabelText("Full Name"), "Jane Smith");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.type(screen.getByLabelText("Phone"), "555-123-4567");
    await user.type(screen.getByLabelText("Visit reason"), "Consultation");

    const continueButton = screen.getByRole("button", { name: "Continue" });
    await user.click(continueButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        fullName: "Jane Smith",
        email: "jane@example.com",
        phone: "555-123-4567",
        visitReason: "Consultation",
      });
    });
  });

  it("handles form field updates correctly", async () => {
    const user = userEvent.setup();

    render(
      <ContactInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email");

    await user.type(nameInput, "Test User");
    await user.type(emailInput, "test@example.com");

    expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
  });

  it("clears validation errors when valid data is entered", async () => {
    const user = userEvent.setup();

    render(
      <ContactInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    // First trigger validation errors
    const continueButton = screen.getByRole("button", { name: "Continue" });
    await user.click(continueButton);

    await waitFor(() => {
      expect(screen.getByText("Full name is required")).toBeInTheDocument();
    });

    // Then fill in the field
    const nameInput = screen.getByLabelText("Full Name");
    await user.type(nameInput, "Valid Name");

    await waitFor(() => {
      expect(
        screen.queryByText("Full name is required"),
      ).not.toBeInTheDocument();
    });
  });

  it("has correct input types and placeholders", () => {
    render(
      <ContactInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    const nameInput = screen.getByPlaceholderText("Enter your full name");
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const phoneInput = screen.getByPlaceholderText("Enter your phone number");
    const reasonInput = screen.getByPlaceholderText(
      "Describe the reason for your visit",
    );

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(phoneInput).toHaveAttribute("type", "tel");
    expect(reasonInput).toBeInTheDocument();
  });
});
