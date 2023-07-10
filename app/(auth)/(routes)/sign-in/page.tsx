import { LoginComponent } from "./components/LoginComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }

  return (
    <div>
      <div className="py-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Vítejte v aplikaci {process.env.NEXT_PUBLIC_APP_NAME ?? "App"}
        </h1>
      </div>
      <LoginComponent />
    </div>
  );
};

export default SignInPage;
