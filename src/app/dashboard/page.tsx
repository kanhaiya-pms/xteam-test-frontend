import Dashboard from '@/components/Dashboard'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
    const cookie = cookies()

   const token = cookie.get("ACCESS_TOKEN")
   console.log("token",token?.value);
   

   if (!token?.value) {
    redirect("/login")
   }
  return (
    <Dashboard token={token.value}/>
  )
}

export default page