# Respira, Manaus! — atividade remota de 19/10/2026

Prof. Natanael · EETI Bilíngue Prof. Jacimar. Turmas: 2º ano 4, 3º ano 1 e 3º ano 2.

Prazo: 20/10/2026 às 23h59, horário de Manaus (fim exclusivo: 21/10/2026 00h00, UTC−4).

- `index.html`: atividade em 13 telas, com identificação e entrega.
- `professor.html`: painel autenticado, consulta automática e distribuição de códigos individuais.
- `consulta.html`: consulta protegida do aluno e da família, comprovante e registro de ciência.
- `plataforma.js` e `paineis.css`: integração e aparência dos painéis.

Banco compartilhado: projeto Supabase `terceiroremota14`. Função: `jacimar-fumaca-1910`. A chave no navegador é pública; nenhuma chave de serviço está no site. Tabelas protegidas por RLS, com acesso direto bloqueado aos papéis públicos. A API verifica as sessões de aluno/família e a conta confirmada do professor.

Uma entrega por aluno e atividade. O comprovante é emitido pelo servidor; repetição do envio retorna a mesma entrega. A família usa um código distinto e não pode enviar. O progresso é salvo etapa a etapa. A trava do vídeo combina evento ENDED com sequência e verificação de tempo mínimo no servidor; uma aplicação no navegador não prova a atenção efetiva ao vídeo.

Os painéis consultam o servidor a cada 5 segundos quando visíveis. O primeiro acesso do professor requer criar a conta autorizada, confirmar o e-mail e entrar. Os códigos de alunos e famílias só são exibidos no painel autenticado.

Dados ambientais: registros identificados de 16 a 19/10/2026, com fontes, locais e horários diferentes. O registro de 19/10 é parcial. A média didática dos valores arredondados 140, 400, 150 e 50 é 185 µg/m³; esse conjunto não representa uma média diária de Manaus. É amodal. A interface distingue índice AQI, tamanho (µm), massa (µg) e concentração (µg/m³).
