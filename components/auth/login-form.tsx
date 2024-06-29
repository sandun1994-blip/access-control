"use client";
import React, { useState, useTransition } from "react";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "@/components/form-error";
import FormSucess from "@/components/form-sucess";
// import { login } from "@/app/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoginSchema } from "@/lib/schema";
import { login } from "@/app/actions/login";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email alredy in use with diffrent provider!"
      : "";
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSucess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error as string);
        setSucess(data?.success as string);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="sandun.doe@example.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSucess message={sucess} />
          <Button type="submit" className="w-full border-b-0" variant={'sidebar'} disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
