import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const authObj = await auth();
  const user = await currentUser();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cartograph</h1>
      <section className="rounded-lg border p-6 space-y-2">
        <h2 className="text-lg font-semibold">Current session</h2>
        <p className="text-sm text-zinc-600">
          Organization: {authObj.orgId ? authObj.orgId : "Personal / default"}
        </p>
        <p className="text-sm text-zinc-600">
          Signed in: {user ? user.emailAddresses?.[0]?.emailAddress ?? user.id : "No"}
        </p>
      </section>
      <p className="text-sm text-zinc-500">
        Theme is written to <code>&lt;html data-theme&gt;</code> and survives reload.
        Protected routes require sign-in.
      </p>
    </div>
  );
}
