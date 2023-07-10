import { UserIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "./components/ui/Container";

import { getUsers } from "@/actions/get-users";

const DashboardPage = async () => {
  const users = await getUsers();

  //const notions = await getNotions();

  return (
    <Container
      title="Dashboard"
      description={
        "Welcome to Koreg cockpit, here you can see your company overview"
      }
    >
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active users</CardTitle>
            <UserIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{users.length}</div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default DashboardPage;
