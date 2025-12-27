"use server";

import { IFormData } from "@/types/form-data";
// import { prisma } from "@/utils/prisma";
import prisma from "@/utils/prisma";

export async function registerUser(formData: IFormData) {
  const { email, password, confirmPassword } = formData;

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });

    console.log("user", user);

    return user;
  } catch (error) {
    console.error("Error of registration", error);
    return { error: "Error in reg" };
  }
}
