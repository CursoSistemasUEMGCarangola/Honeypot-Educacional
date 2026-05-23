import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
      console.error("ADMIN_PASSWORD não configurada no servidor (.env.local)");
      return NextResponse.json({ error: "Configuração do servidor incorreta." }, { status: 500 });
    }

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true });
      // Configurar o cookie de autenticação
      response.cookies.set("admin_auth", "true", {
        path: "/",
        maxAge: 3600, // 1 hora
        sameSite: "lax",
      });
      return response;
    }

    return NextResponse.json({ error: "Senha administrativa incorreta." }, { status: 401 });
  } catch (err) {
    console.error("Erro na API de login:", err);
    return NextResponse.json({ error: "Falha interna no servidor." }, { status: 500 });
  }
}
