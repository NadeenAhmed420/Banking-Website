"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const route = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // sign up with Appwrite /create plaid token
      // if (type === "sign-up") {
      //   const newUser = await signUp(data);
      //   setUser(newUser);
      // }

      if (type === "sign-up") {
        const newUser = await signUp({
          email: data.email!,
          password: data.password!,
          firstName: data.firstName,
          lastName: data.lastName,
          address1: data.address1,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          dateOfBirth: data.dateOfBirth,
          ssn: data.ssn,
        });
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email!,
          password: data.password!,
        });
        if (response) {
          route.push("/");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex items-center gap-3 cursor-pointer ">
          <Image src="/icons/logo.svg" alt="logo" width={34} height={34} />
          <h2 className="text-26 font-ibm-plex-serif font-bold text-black-1 ">
            Horizon
          </h2>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3 ">
          <h1 className="text-26 lg:text-32 font-semibold text-gray-900 ">
            {user ? "link account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600 ">
            {user
              ? "Link your account to get started"
              : "Welcome back! Please enter your details."}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/*PlAID LINKS*/}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4 ">
                    <CustomInput
                      control={form.control}
                      label="First Name"
                      name="firstName"
                      placeholder="Enter your First Name"
                    />
                    <CustomInput
                      control={form.control}
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter your Last Name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    label="Address"
                    name="address1"
                    placeholder="Enter your specific address"
                  />
                  <CustomInput
                    control={form.control}
                    label="City"
                    name="city"
                    placeholder="Enter your city "
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label="State"
                      name="state"
                      placeholder="ex: NY"
                    />
                    <CustomInput
                      control={form.control}
                      label="Postal Code"
                      name="postalCode"
                      placeholder="ex: 11101"
                    />
                  </div>

                  <div className="flex gap-4 ">
                    <CustomInput
                      control={form.control}
                      label="Date of Birth"
                      name="dateOfBirth"
                      placeholder="yyyy-mm-dd"
                    />
                    <CustomInput
                      control={form.control}
                      label="SSN"
                      name="ssn"
                      placeholder="ex: 1234"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                label="Email"
                name="email"
                placeholder="Enter your email"
              />
              <CustomInput
                control={form.control}
                label="Password"
                name="password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isloading} className="form-btn">
                  {isloading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>

              <footer className="flex justify-center gap-1">
                <p className="text-14 font-normal text-gray-600">
                  {type === "sign-in"
                    ? "Dont have an account ?"
                    : "Already have an account ?"}
                </p>
                <Link
                  href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                  className="form-link"
                >
                  {type === "sign-in" ? "sign up" : "sign in"}
                </Link>
              </footer>
            </form>
          </Form>
        </>
      )}
    </section>
  );
};

export default AuthForm;
