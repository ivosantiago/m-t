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
  billingZip: string;
  agreeToCancellationPolicy: boolean;
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
      billingZip: "",
      agreeToCancellationPolicy: false,
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
    const newFormData = {
      ...formData,
      payment: paymentData,
    };
    setFormData(newFormData);
    console.log(newFormData);
    setStep(Steps.Confirmation);
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
      {step === Steps.Confirmation && <Confirmation />}
    </>
  );
}
