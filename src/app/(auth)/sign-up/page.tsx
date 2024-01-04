"use client";

import { Icon } from "@/components/Icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TAuthCredentialsValidator, AuthCreadentialsValidator } from "@/lib/validators/acc-validator-credentials";
import { trpc } from "@/trpc/client";
import {toast} from 'sonner'
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

const Page = () => {

  const router = useRouter();

  const {
  register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCreadentialsValidator)
  });


const {mutate , isLoading} = trpc.auth.createPayLloadUser.useMutation({
  onError : (err)=>{
    if(err.data?.code === 'CONFLICT') {
      toast.error('this email is in use. Sign-in ?')
      return
    }
    
    if(err  instanceof ZodError){
      toast.error(err.issues[0].message) 
      return
    }
    toast.error('unknow error occured in client please try again later')
  },
  onSuccess: ({sendToEmail}) => {
    toast.success(`sign up was success. Email went to ${sendToEmail} please check` )
    router.push('/verify-email?'+sendToEmail)
  },
})

  const onSubmit =({email,password}:TAuthCredentialsValidator)=>{
    mutate({email,password})
  }

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icon.logo className="w-20 h-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Already have an account ? Signin &rarr;
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                  {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className='text-sm text-red-500'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                  type="password"
                  {...register("password")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className='text-sm text-red-500'>
                      {errors.password.message}
                    </p>)}
                  
                </div>

                <Button className="hover:bg-emerald-700">Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
