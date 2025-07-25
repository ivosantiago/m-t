import React from "react";
import Image from "next/image";
import { Card } from "./ui/card";

const businessMock = {
  logo: "/images/gold-spa.png",
  name: "Gold Spa",
  address: {
    line1: "2525 Camino del Rio S",
    line2: "Suite 315 Room B",
    city: "San Diego",
    state: "CA",
    zip: "92108",
  },
  email: "goldspa@gmail.com",
  phone: "+11 123 4567 222",
};
export function ClinicCard() {
  return (
    <Card className="gap-6 bg-white p-4">
      <Image
        className="self-center"
        src={businessMock.logo}
        alt={`${businessMock.name} logo`}
        width={80}
        height={80}
      />

      <h2 className="text-mx-text-dark text-center text-lg font-bold">
        {businessMock.name}
      </h2>

      <div className="grid grid-cols-[85px_1fr] gap-2">
        <div className="text-mx-text-additional">Address</div>
        <div className="text-mx-text-dark">
          <div>{businessMock.address.line1}</div>
          <div>{businessMock.address.line2}</div>
          <div>
            {`${businessMock.address.city}, ${businessMock.address.state} ${businessMock.address.zip}`}
          </div>
        </div>

        <div className="text-mx-text-additional">Email</div>
        <a className="text-mx-violet-90" href={`mailto:${businessMock.email}`}>
          {businessMock.email}
        </a>

        <div className="text-mx-text-additional">Phone</div>
        <a className="text-mx-violet-90" href={`tel:${businessMock.phone}`}>
          {businessMock.phone}
        </a>
      </div>
    </Card>
  );
}
