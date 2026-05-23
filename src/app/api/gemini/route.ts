import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { prompt } = (await request.json()) as { prompt?: string };
    const promptText = prompt?.trim() || "Escreva uma breve explicação sobre como usar o Gemini Pro em português.";
    const model = process.env.GEMINI_MODEL_NAME || "gemini-pro";

    const auth = new GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    const token = typeof tokenResponse === "string" ? tokenResponse : tokenResponse?.token;

    if (!token) {
      return NextResponse.json(
        { error: "Não foi possível obter token de acesso do Google. Verifique suas credenciais." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta2/models/${encodeURIComponent(model)}:generateText`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: { text: promptText },
          temperature: 0.2,
          maxOutputTokens: 256,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Falha ao chamar a API Gemini Pro.",
          status: response.status,
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Erro interno ao processar a solicitação do Gemini." }, { status: 500 });
  }
}
