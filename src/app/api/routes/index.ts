import { prisma } from "@/src/lib/prisma";
import { hash } from "bcrypt-ts";
import { Hono } from "hono";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { z } from "zod";

export const auth = new Hono()

auth.post("/", async (c) => {
  try {
    const { email, password, name, telephone } = await c.req.json();
    console.log(email)
    console.log(password)
    console.log(name)
    console.log(telephone)

    if (!email || !password || !name || !telephone) {
      return c.json(
        { error: "Nome, E-mail e senha são obrigátorios" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return c.json({ error: "Usuário já existente" }, { status: 409 });
    }

    // Define validation schema
    const credentialsSchema = z.object({
      email: z.string().email("O email deve ser válido.").trim(),
      password: z
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres.")
        .trim(),
      name: z
        .string()
        .trim()
        .regex(/^[A-Za-z\s]+$/, "O nome não deve conter números."),
      telephone: z.string().trim().regex(/^\d{10,11}$/)
    });

    const parsedCredentials = credentialsSchema.safeParse({
      email,
      password,
      name,
      telephone,
    });

    if (!parsedCredentials.success) {
      const errorMessages = parsedCredentials.error.errors.map((error) => {
        return { field: error.path[0], message: error.message };
      });

      console.error("Validation errors:", errorMessages);
      return c.json({ errors: errorMessages }, { status: 400 });
    }

    // Hash the password and create a new user
    const hashedPassword = await hash(password, 10);
    const userId = new ObjectId().toString(); // Gera um ObjectId válido

    const user = await prisma.user.create({
      data: {
        id: userId,
        name,
        email,
        password: hashedPassword,
        telephone,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});
