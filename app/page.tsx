
"use client"
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth/auth-client";
import { ArrowRight, BarChart3, Briefcase, ClipboardCheck, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Smart Task Management",
    description:
      "Create, edit, and organize tasks with ease. Keep everything in one place.",
    icon: ClipboardCheck,
  },
  {
    title: "Due Dates & Reminders",
    description:
      "Set deadlines and get timely reminders so you stay on track.",
    icon: Clock,
  },
  {
    title: "Progress Tracking",
    description:
      "Visualize your productivity with clear task statuses and progress.",
    icon: BarChart3,
  },
  {
    title: "Secure & Private",
    description:
      "Your tasks are protected with strong security and privacy controls.",
    icon: ShieldCheck,
  },
];
export default function Home() {
    const { data: session } = useSession();
  return (
    <div className="max-w-6xl mx-auto  bg-zinc-50 font-sans dark:bg-black">
        <div className="min-h-screen container mx-auto text-center pt-20 flex flex-col gap-6">
          <h1 className="text-6xl font-bold "> <span>Organize Your Tasks.</span><br/>
             <span className="text-4xl italic ">Focus on What Matters.</span></h1>
          <p className="max-w-xl mx-auto text-muted-foreground text-xl ">Stay productive and in control with a simple, powerful task manager that helps you plan, track, and complete your work—every day.</p>
          {
            !session?.user && (
           <div className="flex flex-col items-center gap-4">
              <Link href={"sign-up"}>
                <Button size={"lg"} className="h-12 px-8 text-lg font-medium">Start for free <ArrowRight className="ml-2"/></Button>
              </Link>
              <p className="text-sm text-muted-foreground">Free forever. No credit card needed.</p>
            </div>
            )
          }
        </div>
        <section className="border-t bg-white py-24">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-3">
              {
                features.map(f=>(
              <div key={f.title} className="flex flex-col border-2 rounded-lg shadow-xl p-4 gap-3">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  {f.title}
                </h3>
                <p className="text-muted-foreground">
                  {f.description}
                </p>
              </div>
                ))
              }
              </div>
            </div>
        </section>
    </div>
  );
}
