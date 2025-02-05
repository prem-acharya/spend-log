import { prisma } from "@/lib/prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    return user;
  } catch (error) {
    console.error("[GET_USER_BY_EMAIL_ERROR]", error);
    return null;
  }
};
