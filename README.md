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

Dados ambientais: registros identificados de 16 a 19/10/2026, com fontes, locais e horários diferentes. O registro de 19/10 é parcial. A média didática dos valores arredondados 140, 400, 150 e 50 é 185 µg/m³; esse conjunto não representa uma média diária de Manaus. É amodal. A interface distingue índice AQI, tamanho (µm), massa (µg) e concentração (µg/m³).

Interface prioritária para celular: largura máxima de 480 px, uma etapa por tela, rolagem interna quando necessária, fontes de leitura de 16 px e controles de toque de 48 px ou mais. Referência de interação: Brilliant, com identidade própria do professor.
