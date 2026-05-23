# 🎣 Comunicado Institucional: Projeto Honeypot Educacional e Conscientização em Cibersegurança

**De:** Coordenação e Alunos do 3º Período de Sistemas de Informação  
**Para:** Coordenadores de Curso da UEMG  
**Assunto:** Relatório da Simulação de Phishing e Resultados Obtidos  
**Data:** Maio de 2026  

---

Prezados Coordenadores,

Com o objetivo de avaliar e elevar a maturidade da nossa comunidade acadêmica frente às ameaças virtuais, os alunos do **3º Período do Curso de Sistemas de Informação** realizaram uma simulação controlada de cibersegurança baseada em engenharia social. Este projeto, intitulado **Honeypot Educacional**, foi implantado como atividade prática.

Abaixo, apresentamos os detalhes sobre o funcionamento da campanha, a dinâmica de disseminação, as estatísticas por curso e as diretrizes de privacidade adotadas.

---

## 🎯 A Dinâmica da Simulação (O que aconteceu?)

Utilizando técnicas comuns empregadas por cibercriminosos (engenharia social), espalhamos cartazes com **QR Codes** nos murais do campus simulando uma promoção para o sorteio de uma camiseta oficial da seleção brasileira: **"UEMG RUMO AO HEXA"**.

Ao escanear o código com seus smartphones, os estudantes eram direcionados para a Landing Page da campanha. A dinâmica seguiu duas etapas distintas:

### 🔄 1. A Fase de Disseminação Viral (Ilusão de Sorteio)
Durante o período ativo da simulação, a página de conscientização **não era exibida de imediato**. Em vez disso, ao submeter o formulário:
* O aluno era levado a crer que estava realmente participando do sorteio, sendo direcionado para uma tela com a mensagem **"Você está na disputa!"**.
* O sistema gerava um **"Número da Sorte"** (ex: `452-UEMG`) para validar a veracidade psicológica do processo.
* A tela de confirmação continha um botão de compartilhamento rápido ("Convide Amigos"), incentivando os participantes a repassarem o link em grupos de WhatsApp para "ganhar chances extras". 
* Essa isca de compartilhamento serviu para testar o **vetor de propagação orgânica** do ataque. A curiosidade e a confiança mútua entre os alunos fizeram com que a campanha se espalhasse rapidamente sem qualquer intervenção direta da equipe.

### 🎓 2. A Fase de Revelação e Consciência (Pós-Campanha)
Após a finalização do período de coleta de dados, a configuração do sistema foi alterada pelo administrador. A partir desse momento, a rota principal do projeto passou a exibir de forma transparente a **Landing Page de Resultados**, contendo:
* Um vídeo educativo de conscientização (`ProjetoSeg.mp4`) detalhando o funcionamento do teste.
* As estatísticas gerais e o ranking de cliques por curso.
* Instruções didáticas ensinando os alunos a reconhecerem phishing no futuro (pressão por urgência, domínios falsos e fontes não oficiais).

---

## 🛡️ Compromisso Ético e Privacidade (Privacy by Design)

Seguindo estritamente as diretrizes da **Lei Geral de Proteção de Dados (LGPD)** e os princípios de *Privacy by Design*, o sistema garantiu o anonimato absoluto dos participantes:

> [!IMPORTANT]  
> **Nenhum dado pessoal foi trafegado ou armazenado.**  
> O campo "Nome Completo" funcionou exclusivamente como uma isca psicológica local. O código-fonte do sistema foi programado para **descartar o nome instantaneamente na memória do próprio navegador do aluno**, antes de realizar qualquer requisição ao banco de dados. A única informação registrada em nosso banco de dados no Supabase foi o **ID do curso** selecionado, gerando dados puramente quantitativos e anônimos.

---

## 📊 Estatísticas Gerais e Resultados por Curso

Durante a campanha **"Camisa do Brasil"**, registramos um total de **58 engajamentos (cliques com submissão)**. Abaixo, listamos a distribuição exata de cliques por curso, em ordem decrescente de vulnerabilidade:

| Rank | Curso | Quantidade de Cliques | Porcentagem do Total |
| :---: | :--- | :---: | :---: |
| 1º | **Administração** | 20 | 34.5% |
| 2º | **Geografia** | 8 | 13.8% |
| 3º | **História** | 7 | 12.1% |
| 4º | **Letras - Português e Inglês** | 7 | 12.1% |
| 5º | **Sistemas de Informação** | 7 | 12.1% |
| 6º | **Matemática** | 4 | 6.9% |
| 7º | **Ciências Biológicas** | 3 | 5.2% |
| 8º | **Pedagogia** | 2 | 3.4% |
| 9º | **Serviço Social** | 0 | 0.0% |

### 🌟 Destaque de Segurança: Serviço Social
Gostaríamos de parabenizar publicamente a coordenação e os estudantes do curso de **Serviço Social**. 

> [!TIP]  
> **Taxa de Vulnerabilidade: 0.0%**  
> O curso de **Serviço Social** destacou-se de maneira excepcional, sendo o único curso cadastrado que registrou **zero submissões** durante toda a campanha. Isso sinaliza um comportamento exemplar de prevenção, desconfiança saudável em relação a ofertas suspeitas e alto discernimento sobre links externos. Parabéns aos envolvidos pelo ótimo hábito de segurança digital!

---

## 🔐 A Importância da Segurança da Informação no Meio Acadêmico

O phishing representa o ponto de partida para mais de **90% dos incidentes de cibersegurança** corporativos e governamentais. Ao explorar a boa-fé dos usuários com promessas de prêmios, os criminosos conseguem roubar credenciais e infectar redes inteiras.

A simulação demonstrou que a engenharia social é altamente eficaz, inclusive no meio acadêmico (onde até mesmo estudantes de tecnologia foram fisgados). Isso reforça que a melhor defesa não está apenas nos sistemas de antivírus, mas sim na **educação digital e conscientização contínua de toda a comunidade**.

Agradecemos a colaboração dos coordenadores e nos colocamos à disposição para apresentar os detalhes do projeto ou para auxiliar em futuras campanhas de conscientização interna.

Atenciosamente,

**Alunos e Orientadores do 3º Período de Sistemas de Informação**  
*Universidade do Estado de Minas Gerais (UEMG)*
