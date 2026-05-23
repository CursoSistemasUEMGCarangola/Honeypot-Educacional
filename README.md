# 🎣 Honeypot Educacional: Simulador de Phishing Acadêmico

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel)
![Status](https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge)

Um projeto de código aberto desenvolvido para fins educacionais no escopo do curso de Sistemas de Informação. O objetivo é simular uma campanha de phishing real utilizando gatilhos mentais comuns no ambiente universitário (ex: "Bolsa Auxílio", "Brindes"), coletando métricas de vulnerabilidade e convertendo o clique em um momento de conscientização imediata.

---

## 🎯 Objetivo e Visão

A engenharia social continua sendo um dos maiores vetores de ataque cibernético. Este sistema permite que professores e pesquisadores avaliem a resiliência da comunidade acadêmica diante de iscas digitais.

O diferencial do projeto é a sua **Conformidade Ética (Privacy by Design)**: no momento em que o aluno preenche a "isca" com seu Nome e Curso, o sistema **descarta o Nome instantaneamente** antes de qualquer comunicação com o banco de dados. Apenas dados estatísticos (qual curso caiu na isca) são armazenados, respeitando integralmente a LGPD.

## 🚀 Funcionalidades

- **Múltiplas Campanhas:** Crie campanhas sazonais (ex: "Bolsa 2024", "Sorteio de Livros 2025") sem misturar os dados.
- **Feedback Educacional Imediato:** Após a submissão, o usuário é redirecionado para uma Landing Page de conscientização, explicando os sinais de alerta que ele ignorou na página falsa.
- **Dashboard Administrativo:** Uma área protegida para o corpo docente visualizar o ranking de cursos mais vulneráveis em tempo real.
- **Efêmero e Leve:** Projetado para rodar campanhas curtas (ex: 5 dias) com hospedagem de custo zero.

## 🛠️ Stack Tecnológica (O DNA do Projeto)

- **Frontend/Backend:** Next.js 14 (App Router) + TypeScript
- **Estilização:** Tailwind CSS
- **Banco de Dados:** PostgreSQL (via Supabase)
- **Hospedagem:** Vercel (Front/API) e Supabase (Banco)

## 📦 Como rodar o projeto localmente

### Pré-requisitos

- Node.js 20 LTS
- Uma conta gratuita no [Supabase](https://supabase.com/)
- Conta na [Vercel](https://vercel.com/) (para deploy)

## 🛡️ Aviso Legal e Ético

**Aviso Importante:** Este software foi criado **estritamente para fins acadêmicos e educacionais**. Os desenvolvedores e a instituição de ensino não se responsabilizam pelo uso indevido deste código-fonte.

Ao executar uma simulação em sua instituição:

1. Certifique-se de ter autorização da diretoria/reitoria.

2. Jamais modifique o código para armazenar dados sensíveis, senhas ou informações pessoalmente identificáveis (PII).

3. A página de conscientização pós-clique deve sempre estar ativa, clara e conter os contatos dos responsáveis pela disciplina.

## 🪐 Integração com Gemini Pro

Este projeto agora inclui uma rota servidor `POST /api/gemini` que faz chamada ao Gemini Pro via API do Google.

### Como configurar

1. Crie um projeto no Google Cloud.
2. Ative a API `Generative Language API` ou `Vertex AI`.
3. Crie uma Service Account com permissão para o Cloud Platform e baixe a chave JSON.
4. Defina a variável de ambiente `GOOGLE_APPLICATION_CREDENTIALS` apontando para o arquivo JSON:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/caminho/para/key.json"
```

No Windows PowerShell:

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = "C:\caminho\para\key.json"
```

5. (Opcional) Ajuste o modelo com `GEMINI_MODEL_NAME`, por exemplo `gemini-pro`.

### Como usar

Faça uma requisição POST para `/api/gemini` com JSON:

```json
{
  "prompt": "Explique em poucas linhas como usar o Gemini Pro em português."
}
```

Exemplo em JavaScript:

```js
const response = await fetch('/api/gemini', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'Escreva um resumo curto sobre educação.' }),
});
const result = await response.json();
console.log(result);
```

### Observações importantes

- A chave do Google não deve ser exposta no front-end.
- Use a rota somente no servidor (API route do Next.js).
- Monitore custos no Google Cloud Console.

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
