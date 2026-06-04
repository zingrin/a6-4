import DashPageHeader from "@/components/layout/DashPageHeader";
import UsersTable from "@/components/modules/admin/UsersTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { userService } from "@/services/user.service";
import { ListUserPaginationProps } from "@/types";

export default async function ListUsers({
  searchParams,
}: {
  searchParams: Promise<ListUserPaginationProps>;
}) {
  const filters = await searchParams;

  const { data } = await userService.listUsers(
    { ...filters },
    { cache: "no-store" },
  );

  const pagination = data?.data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };

  return (
    <div>
      <DashPageHeader title="User Management" description="Manage all registered users" />
      <UsersTable users={data.data.data} />
      <PaginationControls meta={pagination} />
    </div>
  );
}
