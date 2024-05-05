export const revalidate = 0;

import { getPaginatedUsers } from "@/actions";
import { Pagination, Title } from "@/components";

import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

export default async function () {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  // todo: agregar filtro

  return (
    <>
      <Title title="Mantenimiento de Usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />

        <Pagination totalPages={users.length} />
      </div>
    </>
  );
}
