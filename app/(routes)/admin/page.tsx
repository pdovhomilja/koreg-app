import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/actions/get-user";
import Container from "../components/ui/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminPage = async () => {
  return (
    <Container
      title="Administation"
      description={`Here you can setup your ${process.env.NEXTPUBLIC_APP_URL} instance`}
    >
      <div className="space-x-2">
        <Button asChild>
          <Link href="/admin/users">Users administration</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/modules">Modules administration</Link>
        </Button>
      </div>
    </Container>
  );
};

export default AdminPage;
