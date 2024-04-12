import React from 'react'
import { getUserSession } from '@/services/auth'
import { redirect } from 'next/navigation';
const Page = async () => {

  
  const {data} = await getUserSession();
  if (!data.user) {
   return redirect("/login")
  }

  console.log(data)
  return (
    <div>
           In blogs page

    </div>
  )
}

export default Page
