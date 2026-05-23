import { supabase } from './src/lib/supabase';

async function fetchStats() {
  console.log("--- BUSCANDO ESTRUTURA DE MÉTRICAS DO BANCO ---");
  
  // 1. Obter campanha ativa
  const { data: campanhaAtiva, error: cErr } = await supabase
    .from('campanhas')
    .select('id, nome_campanha')
    .eq('ativa', true)
    .maybeSingle();

  if (cErr) {
    console.error("Erro ao buscar campanha ativa:", cErr.message);
    return;
  }

  if (!campanhaAtiva) {
    console.log("Nenhuma campanha ativa encontrada!");
    return;
  }

  console.log(`Campanha Ativa: ID ${campanhaAtiva.id} - "${campanhaAtiva.nome_campanha}"\n`);

  // 2. Obter todas as submissões desta campanha
  const { data: submissoes, error: sErr } = await supabase
    .from('submissoes')
    .select('curso_id')
    .eq('campanha_id', campanhaAtiva.id);

  if (sErr) {
    console.error("Erro ao buscar submissões:", sErr.message);
    return;
  }

  // 3. Obter todos os cursos cadastrados
  const { data: cursos, error: crErr } = await supabase
    .from('cursos')
    .select('id, nome_curso')
    .order('nome_curso', { ascending: true });

  if (crErr) {
    console.error("Erro ao buscar cursos:", crErr.message);
    return;
  }

  // 4. Calcular métricas
  const totalSubmissoes = submissoes?.length || 0;
  console.log(`Total de submissões registradas: ${totalSubmissoes}\n`);

  console.log("RESULTADOS POR CURSO:");
  console.log("----------------------------------------");
  
  const stats = cursos.map(curso => {
    const cliques = submissoes?.filter(s => Number(s.curso_id) === Number(curso.id)).length || 0;
    const porcentagem = totalSubmissoes > 0 ? ((cliques / totalSubmissoes) * 100).toFixed(1) : "0.0";
    return {
      nome: curso.nome_curso,
      cliques,
      porcentagem
    };
  }).sort((a, b) => b.cliques - a.cliques);

  stats.forEach(st => {
    console.log(`${st.nome}: ${st.cliques} cliques (${st.porcentagem}%)`);
  });
  console.log("----------------------------------------");
}

fetchStats();
