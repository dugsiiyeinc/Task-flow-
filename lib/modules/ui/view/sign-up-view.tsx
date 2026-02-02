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
}).refine((data)=> data.password === data.confirmPassword,{
    message:"passwords don't match",
    path:['confirmPassword']
})

export const SignUpView=()=>{
     const router=useRouter();
    const [pending, setPending]=useState(false)
    const [error, setError]=useState<String | null>(null)



    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    })

    const onSubmit=(data:z.infer<typeof formSchema>)=>{

        setPending(true)
        setError(null)

        signUp.email(
            {
                name:data.name,
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
                          <div className="flex flex-col text-center gap-2">
                            <h1 className="text-2xl font-semibold">Get started for free</h1>
                            <p className="text-sm text-muted-foreground">Create an account and start organizing your work today.</p>
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
                              name="name"
                              render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                      type="text"
                                      placeholder="enter your name"
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
                          <div>
                            <FormField
                              control={form.control}
                              name="confirmPassword"
                              render={({field})=>(
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input
                                      type="password"
                                      placeholder="********"
                                      {...field}
                                    />
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
                                ?"Creating account..."
                                :"Create account"
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
                                Already have an account?{" "}
                                <Link href={'/sign-in'} className="underline underline-offset-4">Sign in</Link>
                            </div>
                            <div className='w-full text-muted-foreground *:[a]:hover:text-primary text-center text-xs *:[a]:underline *:[a]:underline-offset-4'>
                                By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href="#">Privacy Policy</a>
                            </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}