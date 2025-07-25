import React from "react";
import Image from "next/image";
import { Card } from "./ui/card";
import { ClinicCard } from "./clinic-card";
import { ServicesCard } from "./services-card";

export function Confirmation() {
  return (
    <div className="p-8">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-2 pb-[100px] md:pb-0">
        <h1 className="self-center text-lg font-bold md:self-auto md:pl-2">
          Book appointment
        </h1>
        <div className="flex flex-col items-center gap-6">
          <div className="w-full text-center md:w-[542px]">
            <Card className="gap-6 bg-white px-[60px] py-10">
              <Image
                className="self-center"
                src={"/success-icon-with-circle.svg"}
                alt="Confirmation checkmark in a green circle"
                width={200}
                height={200}
              />
              <h4 className="text-mx-text-description text-lg font-bold">
                Your appointment has been booked!
              </h4>
              <p className="text-mx-text-dark">
                A confirmation has been sent to your email address.
              </p>
            </Card>
          </div>
          <div className="w-full md:w-[542px]">
            <ClinicCard />
          </div>
          <div className="w-full md:w-[542px]">
            <ServicesCard />
          </div>
        </div>
      </div>
    </div>
  );
}
