"use client";

import React, { useState } from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginWithPwd } from "@/services/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 characters long." }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    toast.promise(loginWithPwd(data), {
      loading: () => {
        setLoading(true);
        return "Logging in...";
      },
      success: () => {
        setLoading(false);
        router.push("/blogs");
        return "Logged in";
      },
      error: (err) => {
        setLoading(false);
        return err.toString();
      },
    });
  };

  return (
    <div className="flex h-[75vh]">
      <Card className="p-12 m-auto space-y-5 min-w-[400px]">
        <CardBody className="text-center text-2xl">Log in here</CardBody>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            label="Email"
            isClearable
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <Input
            type="password"
            label="Password"
            isClearable
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            variant="bordered"
            isLoading={loading}
          >
            {loading ? "Loading..." : "Log in"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Page;
