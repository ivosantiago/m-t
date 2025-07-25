import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { PaymentFormData } from "@/app/page";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { ClinicCard } from "./clinic-card";
import { ServicesCard } from "./services-card";

type Props = {
  initialData: PaymentFormData;
  onSubmit: (data: PaymentFormData) => void;
};

const formSchema = z.object({
  cardNumber: z.string().min(1, "Card number is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  cvv: z.string().min(1, "CVV is required"),
  billingZip: z.string().min(1, "Billing zip is required"),
  agreeToCancellationPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the cancellation policy",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function PaymentInformation({ initialData, onSubmit }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const handleSubmit = (data: FormData) => {
    // There should be a proper payment form transaction here
    onSubmit(data);
  };

  return (
    <div className="p-8">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-2">
        <h1 className="self-center text-lg font-bold md:self-auto md:pl-2">
          Book appointment
        </h1>
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div className="flex flex-1 flex-col gap-6 md:max-w-[450px]">
            <ClinicCard />
            <ServicesCard />
          </div>
          <div className="flex-1">
            <Card className="flex-1 bg-white p-8 md:m-0">
              <h3 className="text-mx-tile text-lg font-bold">
                Secure your appointment by card
              </h3>
              <p className="text-mx-text-description text-sm">
                A credit or debit card is required to book your
                appointment.{" "}
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="flex flex-col gap-4"
                >
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card information</FormLabel>
                        <FormControl>
                          <Input placeholder="1234 1234 1234 1234" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="MM / YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="CVV" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="billingZip"
                    render={({ field }) => (
                      <FormItem className="my-2">
                        <FormControl>
                          <Input placeholder="Billing zip code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agreeToCancellationPolicy"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <div className="flex gap-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-mx-text-description text-sm">
                            We ask that you please reschedule or cancel at least
                            24 hours before the beginning of your appointment or
                            you may be charged a cancellation fee of $50. In the
                            event of emergency, contact us directly. Your card
                            will held in case of late cancellation and for
                            future purchases. It will not be charged now.
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <hr className="mt-6 mb-4" />
                  <Button type="submit">Book appointment</Button>
                  <p className="text-mx-text-description text-sm">
                    By creating this appointment, you acknowledge you will
                    receive automated transactional messages from this merchant.
                  </p>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
