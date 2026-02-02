"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {  signOut } from "@/lib/auth/auth-client"
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export const SignOutView=()=>{

    const router=useRouter()

    return(
        <DropdownMenuItem onClick={async()=>{
            await signOut()
            router.push('/sign-in')
        }}>
          <LogOutIcon className="size-4" />
          Logout
        </DropdownMenuItem>
    )
}