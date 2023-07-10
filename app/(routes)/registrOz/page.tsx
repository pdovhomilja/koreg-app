import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/actions/get-user";
import Container from "../components/ui/Container";

const ProfilePage = async () => {
  const data = await getUser();
  return (
    <Container title="Registr Obchodních zástupců" description={""}>
      <div>Tady bude tabulka s datama, až jí Konva dodá :-D</div>
    </Container>
  );
};

export default ProfilePage;
