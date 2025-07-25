import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ContactFormData } from "@/app/page";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

type Props = {
  initialData: ContactFormData;
  onSubmit: (data: ContactFormData) => void;
};

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  phone: z.string().min(1, "Phone number is required"),
  visitReason: z.string().min(1, "Visit reason is required"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactInformation({ initialData, onSubmit }: Props) {
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

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const handleSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <div className="p-8">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-2 pb-[100px] md:pb-0">
        <h1 className="self-center text-lg font-bold md:self-auto md:pl-2">
          Book appointment
        </h1>
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div className="flex-1 md:max-w-[450px]">
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
                <a
                  className="text-mx-violet-90"
                  href={`mailto:${businessMock.email}`}
                >
                  {businessMock.email}
                </a>

                <div className="text-mx-text-additional">Phone</div>
                <a
                  className="text-mx-violet-90"
                  href={`tel:${businessMock.phone}`}
                >
                  {businessMock.phone}
                </a>
              </div>
            </Card>
          </div>
          <div className="flex-1">
            <Card className="flex-1 bg-white p-8 md:m-0">
              <h3 className="text-mx-tile text-lg font-bold">
                Enter your details below
              </h3>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="flex flex-col gap-4"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visitReason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visit reason</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the reason for your visit"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>

      <div className="fixed right-0 bottom-0 left-0 bg-white p-4 shadow-lg">
        <div className="mx-auto flex max-w-screen-xl justify-end">
          <Button
            className="w-full md:w-auto"
            onClick={form.handleSubmit(handleSubmit)}
            type="submit"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
