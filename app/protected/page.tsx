import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const user = await currentUser();
  const authObj = await auth();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Protected Workspace</h1>
      <p>Organization: {authObj.orgId ? authObj.orgId : "Personal"}</p>
      <p>User: {user.emailAddresses?.[0]?.emailAddress ?? "Unknown"}</p>
      <p className="text-sm text-zinc-500">Only visible when signed in.</p>
    </div>
  );
}
