"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {FcGoogle} from "react-icons/fc"
import { signIn, signUp } from "@/lib/auth/auth-client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";

const formSchema=z.object({
    name:z.string().min(1,{message:"Name is required"}),
    email:z.string().email(),
    password:z.string().min(1, { message:"Password is required"}),
    confirmPassword:z.string().min(1, { message:"Password is required"})
})

export const SignInView=()=>{
     const router=useRouter();
    const [pending, setPending]=useState(false)
    const [error, setError]=useState<String | null>(null)



    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })

    const onSubmit=(data:z.infer<typeof formSchema>)=>{

        setPending(true)
        setError(null)

        signIn.email(
            {
                email:data.email,
                password:data.password,
                callbackURL:'/dashboard'
            },
            {
                onSuccess:()=>{
                    router.push('/dashboard')
                    setPending(false)
                },
                onError:({error})=>{
                    setError(error.message)
                    setPending(false)
                }
            }
        )
    }
    return(
        <div className="max-w-md mx-auto p-8">
            <Card>
                <CardContent>
                    <Form {...form}>
                        <form 
                           onSubmit={form.handleSubmit(onSubmit)}
                           className="flex flex-col gap-4"
                        >
                          <div className="flex flex-col text-center gap-2 mb-3">
                            <h1 className="text-2xl font-semibold">Sign in to your account</h1>
                            <p className="text-sm text-muted-foreground">Continue managing your tasks and stay organized.</p>
                          </div>
                          {!!error && (
                                <Alert className="bg-destructive/10 border-none">
                                    <OctagonAlertIcon className="h-4 w-4 text-destructive!"/>
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                                )}
                          <div>
                            <FormField
                              control={form.control}
                              name="email"
                              render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                      type="email"
                                      placeholder="enter your email"
                                      {...field}
                                    />
                                    <FormMessage/>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div>
                            <FormField
                              control={form.control}
                              name="password"
                              render={({field})=>(
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                      type="password"
                                      placeholder="********"
                                      {...field}
                                    />
                                    <FormMessage/>
                                </FormItem>
                              )}
                            />
                          </div>
                          <Button
                            type="submit"
                            className="w-full my-2"
                            disabled={pending}
                          >
                            {
                                pending 
                                ?"Signing in..."
                                :"Sign in"
                            }
                          </Button>
                           <div className="flex flex-col gap-4">
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">Or Continue with</span>
                            </div>
                            <div>
                                <Button
                                  type="button"
                                  variant={"outline"}
                                  className="w-full"
                                  onClick={()=>{
                                    signIn.social({
                                        provider:"google"
                                    })
                                  }}
                                >
                                    <FcGoogle/>
                                    Google
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don't have an account?{" "}
                                <Link href={'/sign-up'} className="underline underline-offset-4">Sign up</Link>
                            </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}