import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PaymentInformation } from "../payment-information";
import { PaymentFormData } from "@/app/page";

// Mock the child components
jest.mock("../clinic-card", () => ({
  ClinicCard: () => <div data-testid="clinic-card">Clinic Card</div>,
}));

jest.mock("../services-card", () => ({
  ServicesCard: () => <div data-testid="services-card">Services Card</div>,
}));

describe("PaymentInformation", () => {
  const mockOnSubmit = jest.fn();
  const initialData: PaymentFormData = {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingZip: "",
    agreeToCancellationPolicy: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with initial data", () => {
    render(
      <PaymentInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    expect(
      screen.getByRole("heading", { name: "Book appointment" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Secure your appointment by card"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "A credit or debit card is required to book your appointment.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId("clinic-card")).toBeInTheDocument();
    expect(screen.getByTestId("services-card")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(
      <PaymentInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    expect(screen.getByLabelText("Card information")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("MM / YY")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CVV")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Billing zip code")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Book appointment" }),
    ).toBeInTheDocument();
  });

  it("populates form fields with initial data", () => {
    const filledData: PaymentFormData = {
      cardNumber: "1234 5678 9012 3456",
      expiryDate: "12/25",
      cvv: "123",
      billingZip: "12345",
      agreeToCancellationPolicy: false,
    };

    render(
      <PaymentInformation initialData={filledData} onSubmit={mockOnSubmit} />,
    );

    expect(screen.getByDisplayValue("1234 5678 9012 3456")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12/25")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12345")).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    const user = userEvent.setup();

    render(
      <PaymentInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    const submitButton = screen.getByRole("button", {
      name: "Book appointment",
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Card number is required")).toBeInTheDocument();
      expect(screen.getByText("Expiry date is required")).toBeInTheDocument();
      expect(screen.getByText("CVV is required")).toBeInTheDocument();
      expect(screen.getByText("Billing zip is required")).toBeInTheDocument();
      expect(
        screen.getByText("You must agree to the cancellation policy"),
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error when checkbox is not checked", async () => {
    const user = userEvent.setup();

    render(
      <PaymentInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    // Fill all required fields except checkbox
    await user.type(
      screen.getByLabelText("Card information"),
      "1234 5678 9012 3456",
    );
    await user.type(screen.getByPlaceholderText("MM / YY"), "12/25");
    await user.type(screen.getByPlaceholderText("CVV"), "123");
    await user.type(screen.getByPlaceholderText("Billing zip code"), "12345");

    const submitButton = screen.getByRole("button", {
      name: "Book appointment",
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("You must agree to the cancellation policy"),
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("submits form with valid data when all fields are filled and checkbox is checked", async () => {
    const user = userEvent.setup();

    render(
      <PaymentInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    // Fill in all required fields
    await user.type(
      screen.getByLabelText("Card information"),
      "1234 5678 9012 3456",
    );
    await user.type(screen.getByPlaceholderText("MM / YY"), "12/25");
    await user.type(screen.getByPlaceholderText("CVV"), "123");
    await user.type(screen.getByPlaceholderText("Billing zip code"), "12345");
    await user.click(screen.getByRole("checkbox"));

    const submitButton = screen.getByRole("button", {
      name: "Book appointment",
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        cardNumber: "1234 5678 9012 3456",
        expiryDate: "12/25",
        cvv: "123",
        billingZip: "12345",
        agreeToCancellationPolicy: true,
      });
    });
  });

  it("handles checkbox toggle correctly", async () => {
    const user = userEvent.setup();

    render(
      <PaymentInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    const checkbox = screen.getByRole("checkbox");

    // Initially unchecked
    expect(checkbox).not.toBeChecked();

    // Click to check
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    // Click to uncheck
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("handles form field updates correctly", async () => {
    const user = userEvent.setup();

    render(
      <PaymentInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    const cardInput = screen.getByLabelText("Card information");
    const expiryInput = screen.getByPlaceholderText("MM / YY");
    const cvvInput = screen.getByPlaceholderText("CVV");
    const zipInput = screen.getByPlaceholderText("Billing zip code");

    await user.type(cardInput, "4111 1111 1111 1111");
    await user.type(expiryInput, "01/26");
    await user.type(cvvInput, "456");
    await user.type(zipInput, "54321");

    expect(screen.getByDisplayValue("4111 1111 1111 1111")).toBeInTheDocument();
    expect(screen.getByDisplayValue("01/26")).toBeInTheDocument();
    expect(screen.getByDisplayValue("456")).toBeInTheDocument();
    expect(screen.getByDisplayValue("54321")).toBeInTheDocument();
  });

  it("clears validation errors when valid data is entered", async () => {
    const user = userEvent.setup();

    render(
      <PaymentInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    // First trigger validation errors
    const submitButton = screen.getByRole("button", {
      name: "Book appointment",
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Card number is required")).toBeInTheDocument();
    });

    // Then fill in the field
    const cardInput = screen.getByLabelText("Card information");
    await user.type(cardInput, "1234 5678 9012 3456");

    await waitFor(() => {
      expect(
        screen.queryByText("Card number is required"),
      ).not.toBeInTheDocument();
    });
  });

  it("has correct input placeholders", () => {
    render(
      <PaymentInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    expect(
      screen.getByPlaceholderText("1234 1234 1234 1234"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("MM / YY")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CVV")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Billing zip code")).toBeInTheDocument();
  });

  it("displays cancellation policy text", () => {
    render(
      <PaymentInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    expect(
      screen.getByText(
        /We ask that you please reschedule or cancel at least 24 hours/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /By creating this appointment, you acknowledge you will receive/,
      ),
    ).toBeInTheDocument();
  });

  it("checkbox starts as unchecked with default initial data", () => {
    render(
      <PaymentInformation initialData={initialData} onSubmit={mockOnSubmit} />,
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });
});
