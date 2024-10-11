import ContactEditPage from '@/components/ContactEditPage'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

function page() {
    const cookie = cookies()

   const token = cookie.get("ACCESS_TOKEN")
   console.log("token",token?.value);
   

   if (!token?.value) {
    redirect("/login")
   }
  return (
    <>
    <ContactEditPage/>
    </>
  )
}

export default page