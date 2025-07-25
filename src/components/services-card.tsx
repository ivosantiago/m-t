import React from "react";
import { Card } from "./ui/card";

const servicesMock = [
  {
    id: 1,
    name: "Botox",
    duration: "2700000", // 45 minutes
    price: "20000", // $200
  },
  {
    id: 2,
    name: "Botox",
    duration: "2700000", // 45 minutes
    price: "20000", // $200
  },
];

const formatDuration = (duration: string) => {
  const minutes = Math.floor(Number(duration) / 60 / 1000);
  return `${minutes} mins`;
};

const formatPrice = (price: string) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Math.floor(Number(price) / 100));
};

export function ServicesCard() {
  return (
    <Card className="gap-6 bg-white p-4">
      <h5 className="text-sm font-semibold">Services</h5>
      {servicesMock.map((service) => (
        <div className="flex flex-col gap-2" key={service.id}>
          <div className="text-mx-text-dark font-semibold">{service.name}</div>
          <div className="text-mx-text-additional text-sm">
            {`${formatDuration(service.duration)} • ${formatPrice(
              service.price,
            )}`}
          </div>
        </div>
      ))}
    </Card>
  );
}
