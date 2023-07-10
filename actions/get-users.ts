import { prismadb } from "@/lib/prisma";

export const getUsers = async () => {
  const data = await prismadb.user.findMany({});
  return data;
};
