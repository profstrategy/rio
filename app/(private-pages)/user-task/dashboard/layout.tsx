import DashboardWrapper from "@/components/ui/dashboard-wrapper";
import { getDashboardData } from "../actions/user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Fetch data on the server
  const user = await getDashboardData();

  // 2. Pass data to the client wrapper
  return (
    <DashboardWrapper user={user}>
      {children}
    </DashboardWrapper>
  );
}