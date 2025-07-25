import React from "react";
import { Card } from "./ui/card";
import { formatDuration, formatPrice } from "@/lib/utils";

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
