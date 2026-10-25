// import { checkUser } from '@/actions/check-user'
// import { redirect } from 'next/navigation';

// const DashboardPage =async () => {
//   const user = await checkUser();
//   if(!user) redirect("/sign-in")

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold">Welcome, {user.name ?? user.email}</h1>
//       <p className="mt-2 text-sm text-muted-foreground">Your user id in our database:{user.id}
//       </p>
//     </div>
//   );
// };

// export default DashboardPage


import { checkUser } from "@/actions/check-user";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";

const DashboardPage = () => {
  return (
    <Suspense fallback={<div className="p-8">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
};

async function DashboardContent() {
  await connection();

  const user = await checkUser();

  if (!user) redirect("/sign-in");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">
        Welcome, {user.name ?? user.email}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Your user id in our database: {user.id}
      </p>
    </div>
  );
}

export default DashboardPage;
