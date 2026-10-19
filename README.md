# Respira, Manaus! — atividade remota de 19/10/2026

Prof. Natanael · EETI Bilíngue Prof. Jacimar. Turmas: 2º ano 4, 3º ano 1 e 3º ano 2.

Prazo: 20/10/2026 às 23h59, horário de Manaus (fim exclusivo: 21/10/2026 00h00, UTC−4).

- `index.html`: atividade em 13 telas, com identificação e entrega.
- `professor.html`: painel autenticado, consulta automática.
- `consulta.html`: lista pública de alunos com situação Entregue/Pendente, filtro por turma e busca por nome.
- `plataforma.js`, `consulta-lista.js`, `paineis.css` e `mobile.css`: integração e interface para celulares.

Banco compartilhado: projeto Supabase `terceiroremota14`. Função: `jacimar-fumaca-1910`. A chave no navegador é pública; nenhuma chave de serviço está no site. Tabelas protegidas por RLS, com acesso direto bloqueado aos papéis públicos. A API verifica as sessões de aluno/família e a conta confirmada do professor.

Uma entrega por aluno e atividade. O comprovante é emitido pelo servidor; repetição do envio retorna a mesma entrega. A consulta da família não envia atividades. O progresso é salvo etapa a etapa. A trava do vídeo combina evento ENDED com sequência e verificação de tempo mínimo no servidor; uma aplicação no navegador não prova a atenção efetiva ao vídeo.

Os painéis consultam o servidor a cada 5 segundos quando visíveis. O primeiro acesso do professor requer criar a conta autorizada, confirmar o e-mail e entrar. Alunos selecionam turma e nome carregados do banco, sem código. Responsáveis e alunos consultam uma lista pública com nome, turma e status, sem login. Essa escolha não comprova a identidade da pessoa.

Dados para cálculo: média usa registros reais de 16–19/10, arredondados a 140,0; 400,0; 150,0; 50,0, com média185,0 µg/m³. Fontes e horários distintos, não uma média diária oficial. Moda usa uma série separada, explicitamente didática de 11–18/10: 150,0;180,0;150,0;120,0;210,0;150,0;240,0;240,0. Moda150,0 em3 dias. Evidências versionadas media-real-moda-didatica-7; anteriores preservadas.

Interface prioritária para celular: largura máxima de 480 px, uma etapa por tela, rolagem interna quando necessária, fontes de leitura de 16 px e controles de toque de 48 px ou mais. Referência de interação: Brilliant, com identidade própria do professor.

Repetição livre: após a primeira entrega, o aluno pode reiniciar para praticar. O status continua Entregue e o primeiro comprovante é preservado. Progresso de primeira realização continua no servidor. A repetição usa progresso por sessão no navegador, sem zerar o registro compartilhado. Sessões antigas em andamento retomam o progresso existente.
