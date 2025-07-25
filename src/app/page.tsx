"use client";

import { useState } from "react";
import { ContactInformation } from "@/components/contact-information";
import { PaymentInformation } from "@/components/payment-information";
import { Confirmation } from "@/components/confirmation";

enum Steps {
  ContactInformation = "contact-information",
  PaymentInformation = "payment-information",
  Confirmation = "confirmation",
}

// Types for all form data across steps
export type ContactFormData = {
  fullName: string;
  email: string;
  phone: string;
  visitReason: string;
};

export type PaymentFormData = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
};

export type CompleteFormData = {
  contact: ContactFormData;
  payment: PaymentFormData;
};

export default function Home() {
  const [step, setStep] = useState<Steps>(Steps.ContactInformation);

  // Centralized form data state
  const [formData, setFormData] = useState<CompleteFormData>({
    contact: {
      fullName: "",
      email: "",
      phone: "",
      visitReason: "",
    },
    payment: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    },
  });

  const handleContactSubmit = (contactData: ContactFormData) => {
    setFormData((prev) => ({
      ...prev,
      contact: contactData,
    }));
    setStep(Steps.PaymentInformation);
  };

  const handlePaymentSubmit = (paymentData: PaymentFormData) => {
    setFormData((prev) => ({
      ...prev,
      payment: paymentData,
    }));
    setStep(Steps.Confirmation);
  };

  const handleFinalSubmit = () => {
    console.log("Complete form data:", formData);
    // Here you can send the complete form data to your API
    // or perform any final submission logic
  };

  return (
    <>
      {step === Steps.ContactInformation && (
        <ContactInformation
          initialData={formData.contact}
          onSubmit={handleContactSubmit}
        />
      )}
      {step === Steps.PaymentInformation && (
        <PaymentInformation
          initialData={formData.payment}
          onSubmit={handlePaymentSubmit}
        />
      )}
      {step === Steps.Confirmation && (
        <Confirmation formData={formData} onSubmit={handleFinalSubmit} />
      )}
    </>
  );
}
