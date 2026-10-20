
        /* =========================================================================
           1. ROSTERS OFICIAIS (EETI BILÍNGUE JACIMAR GAMA: 3º 1, 3º 2, 2º 4)
           ========================================================================= */
        let currentTurma = "";
        let currentStudentName = "";
        let currentStage = 0;
        const totalStages = 10;
        let quizScores = { 5: null, 6: null, 7: null, 8: null, 9: null };
        let isSubmitted = false;

        /* =========================================================================
           4. NAVEGAÇÃO ENTRE ETAPAS (TELA POR VEZ, MOBILE COMPACT)
           ========================================================================= */
        function goToStage(idx) {
            document.querySelectorAll('.lesson-stage').forEach(s => s.classList.remove('active'));
            const target = document.getElementById('stage-' + idx);
            if (target) target.classList.add('active');

            const steps = document.querySelectorAll('.progress-step');
            steps.forEach((s, i) => {
                s.classList.toggle('active', i === idx);
            });

            currentStage = idx;
            document.getElementById('hudStageBadge').textContent = `Etapa ${idx + 1} de ${totalStages}`;
            document.getElementById('prevBtn').disabled = (currentStage === 0);
            
            const nextBtn = document.getElementById('nextBtn');
            if (currentStage === totalStages - 1) {
                nextBtn.innerText = isSubmitted ? 'Comprovante Concluído ✓' : 'Entregar e Finalizar ✔';
                nextBtn.classList.add('next');
            } else {
                nextBtn.innerText = 'Próxima Etapa →';
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function changeStage(dir) {
            if ((currentStage === 0 || currentStage === 1 || currentStage === 4) && dir === 1) {
                markStepComplete(currentStage);
            }
            if (currentStage === totalStages - 1 && dir === 1) {
                finalizeAndDeliver();
                return;
            }
            const next = currentStage + dir;
            if (next >= 0 && next < totalStages) {
                goToStage(next);
            }
        }

        function markStepComplete(idx) {
            const steps = document.querySelectorAll('.progress-step');
            if (steps[idx]) steps[idx].classList.add('completed');
        }

        /* =========================================================================
           5. INTERATIVIDADES: SLIDER, SORTABLE & QUIZ
           ========================================================================= */
        function updateSimulation(val) {
            const fridayVal = parseInt(val);
            document.getElementById('slider-val-label').innerText = fridayVal + ' µg/m³';
            
            const fridayBlock = document.getElementById('sim-friday-block');
            fridayBlock.innerHTML = `${fridayVal}<span class="unit">Sex</span>`;
            
            const sum = 20 + 25 + 25 + 30 + fridayVal;
            const mean = (sum / 5).toFixed(0);

            document.getElementById('sim-num').innerText = `20 + 25 + 25 + 30 + ${fridayVal}`;
            document.getElementById('sim-sum').innerText = sum;
            document.getElementById('sim-mean-res').innerText = mean;
            document.getElementById('card-mean').innerText = mean;
        }

        // SortableJS para ordenação touch mobile
        const oddList = document.getElementById('odd-list');
        const evenList = document.getElementById('even-list');

        if(window.Sortable)Sortable.create(oddList, {
            animation: 200,
            ghostClass: 'sortable-ghost',
            onStart: () => clearHighlights(oddList)
        });

        if(window.Sortable)Sortable.create(evenList, {
            animation: 200,
            ghostClass: 'sortable-ghost',
            onStart: () => clearHighlights(evenList)
        });

        function clearHighlights(listEl) {
            listEl.querySelectorAll('.smoke-block').forEach(b => b.classList.remove('median-highlight'));
        }

        function verifyOddOrder() {
            const blocks = Array.from(oddList.querySelectorAll('.smoke-block'));
            const values = blocks.map(b => parseInt(b.getAttribute('data-val')));
            const feedback = document.getElementById('odd-feedback');
            
            let isSorted = true;
            for (let i = 0; i < values.length - 1; i++) {
                if (values[i] > values[i + 1]) {
                    isSorted = false;
                    break;
                }
            }

            clearHighlights(oddList);

            if (isSorted) {
                blocks[3].classList.add('median-highlight');
                feedback.className = 'feedback-box success';
                feedback.innerHTML = '🎉 <strong>Ordem Crescente Perfeita!</strong> O 4º bloco (<strong>40</strong>) está cravado exatamente no centro da lista!';
                document.getElementById('odd-math-reveal').classList.remove('hidden');
                markStepComplete(2);
            } else {
                feedback.className = 'feedback-box error';
                feedback.innerHTML = '⚠️ <strong>Ainda fora de ordem!</strong> Arraste do menor ao maior: <strong>30, 30, 35, 40, 45, 50, 150</strong>.';
            }
        }

        function verifyEvenOrder() {
            const blocks = Array.from(evenList.querySelectorAll('.smoke-block'));
            const values = blocks.map(b => parseInt(b.getAttribute('data-val')));
            const feedback = document.getElementById('even-feedback');
            
            let isSorted = true;
            for (let i = 0; i < values.length - 1; i++) {
                if (values[i] > values[i + 1]) {
                    isSorted = false;
                    break;
                }
            }

            clearHighlights(evenList);

            if (isSorted) {
                blocks[3].classList.add('median-highlight');
                blocks[4].classList.add('median-highlight');
                feedback.className = 'feedback-box success';
                feedback.innerHTML = '🔥 <strong>Ordem Perfeita!</strong> Com 8 blocos (par), destacamos os dois centrais (<strong>35 e 40</strong>) e calculamos a média!';
                document.getElementById('even-math-reveal').classList.remove('hidden');
                markStepComplete(3);
            } else {
                feedback.className = 'feedback-box error';
                feedback.innerHTML = '⚠️ <strong>Atenção à ordem!</strong> Coloque do menor ao maior: <strong>20, 30, 30, 35, 40, 45, 50, 150</strong>.';
            }
        }

        function checkQuiz(stageIdx, isCorrect, btnEl, explanation) {
            const parent = btnEl.parentElement;
            parent.querySelectorAll('.option-btn').forEach(b => {
                b.classList.remove('correct', 'wrong');
            });

            const feedback = document.getElementById('quiz-feedback-' + stageIdx);
            quizScores[stageIdx] = isCorrect;

            if (isCorrect) {
                btnEl.classList.add('correct');
                feedback.className = 'feedback-box success';
                feedback.innerHTML = '✔ <strong>Correto!</strong> ' + explanation;
                markStepComplete(stageIdx);
            } else {
                btnEl.classList.add('wrong');
                feedback.className = 'feedback-box error';
                feedback.innerHTML = '✖ <strong>Tente novamente:</strong> ' + explanation;
            }
        }

        /* =========================================================================
           6. SUBMISSÃO AO BANCO SUPABASE (https://bxvuqwnmqooxaoexnjty.supabase.co)
           ========================================================================= */

const MEDIANA_API='https://bxvuqwnmqooxaoexnjty.supabase.co/functions/v1/jacimar-mediana-2010';
const MEDIANA_KEY='sb_publishable_gv_lK9K2hrReKQvC-5Ou7Q_vI9c1NwI';
let cloud=null,cloudToken='',studentRows=[],cloudBusy=false,loadRevision=0,restartKey='';
const evidence={};
try{cloudToken=JSON.parse(localStorage.getItem('jacimar-mediana-2010')||'{}').token||''}catch{}
function saveCloudToken(){try{localStorage.setItem('jacimar-mediana-2010',JSON.stringify({token:cloudToken}))}catch{}}
function notice(text,where){let el=document.getElementById('cloud-notice');if(!el){el=document.createElement('p');el.id='cloud-notice';el.className='network-message';el.setAttribute('role','alert')}const host=where||document.querySelector('#stage-'+currentStage+' .card')||document.querySelector('.student-select-card');host.append(el);el.textContent=text;el.hidden=!text;return el}
async function cloudRequest(route,body){const r=await fetch(MEDIANA_API+'/'+route,{method:body?'POST':'GET',headers:{apikey:MEDIANA_KEY,'Content-Type':'application/json',...(cloudToken?{'x-session':cloudToken}:{})},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(18000)});const d=await r.json();if(!r.ok)throw Error(d.error||'Não foi possível confirmar. Tente novamente.');return d}
const turmaCodigo=t=>t.replace('º ','º T');
async function selectClass(turma){const rev=++loadRevision;currentTurma=turma;currentStudentName='';document.querySelectorAll('.turma-btn').forEach(b=>b.classList.toggle('active',b.textContent.includes(turma)));document.getElementById('student-name-container').style.display='block';document.getElementById('student-name-label').textContent='2. Selecione seu nome ('+turma+'):';const select=document.getElementById('studentSelect');select.replaceChildren(new Option('Carregando nomes…',''));select.disabled=true;document.getElementById('btnStartLesson').disabled=true;document.getElementById('customNameBox').style.display='none';try{const d=await cloudRequest('alunos?turma='+encodeURIComponent(turmaCodigo(turma)));if(rev!==loadRevision)return;studentRows=d.alunos;select.replaceChildren(new Option('Selecione seu nome',''));for(const a of studentRows)select.add(new Option(a.nome,a.id));select.disabled=false;notice('',document.querySelector('.student-select-card'))}catch(e){if(rev===loadRevision)notice(e.message+' Toque na turma para tentar novamente.',document.querySelector('.student-select-card'))}}
function handleStudentSelect(){validateStartReady()}
function validateStartReady(){const id=document.getElementById('studentSelect').value;const student=studentRows.find(a=>a.id===id);currentStudentName=student?.nome||'';document.getElementById('btnStartLesson').disabled=!currentTurma||!student||cloudBusy}
function showLesson(){document.getElementById('welcome-screen').style.display='none';for(const id of ['lesson-header','lesson-content-area','bottomNav'])document.getElementById(id).classList.add('visible');document.getElementById('hudStudentBadge').textContent='👤 '+currentTurma+' • '+currentStudentName;goToStage(Math.min(cloud.etapa,9));if(cloud.entrega)showServerReceipt()}
async function startLesson(){if(cloudBusy||!currentStudentName)return;cloudBusy=true;validateStartReady();try{cloud=await cloudRequest('entrar',{turma:turmaCodigo(currentTurma),aluno_id:document.getElementById('studentSelect').value});cloudToken=cloud.token;saveCloudToken();restoreCloud();showLesson()}catch(e){notice(e.message,document.querySelector('.student-select-card'))}finally{cloudBusy=false;validateStartReady()}}
const originalGoToStage=goToStage;
goToStage=function(idx){if(!cloud||idx<0||idx>Math.min(cloud.etapa,9))return;originalGoToStage(idx);if(idx===9)document.getElementById('nextBtn').textContent=cloud.entrega?'Entrega confirmada ✓':'Confirmar entrega ✔'};
function stageEvidence(){if([0,1,4].includes(currentStage))return {leu:true};if(currentStage===2||currentStage===3){const values=Array.from((currentStage===2?oddList:evenList).children).map(el=>Number(el.dataset.val));const expected=currentStage===2?[30,30,35,40,45,50,150]:[20,30,30,35,40,45,50,150];if(JSON.stringify(values)!==JSON.stringify(expected))throw Error('Organize os blocos do menor para o maior antes de continuar.');return {ordem:values}}if(!quizScores[currentStage]||!evidence[currentStage])throw Error('Responda corretamente à questão antes de continuar.');return evidence[currentStage]}
async function saveStage(){if(currentStage<cloud.etapa)return;cloud=await cloudRequest('avancar',{tentativa:cloud.tentativa,etapa:currentStage,evidencia:stageEvidence()});markStepComplete(currentStage)}
changeStage=async function(dir){if(cloudBusy)return;if(dir<0){goToStage(currentStage-1);return}if(currentStage===9){await finalizeAndDeliver();return}cloudBusy=true;document.getElementById('nextBtn').disabled=true;try{await saveStage();notice('');goToStage(currentStage+1)}catch(e){notice(e.message)}finally{cloudBusy=false;document.getElementById('nextBtn').disabled=false}};
const originalCheckQuiz=checkQuiz;
checkQuiz=function(stage,correct,button,explanation){if(cloudBusy||cloud?.entrega)return;const options=Array.from(button.parentElement.querySelectorAll('.option-btn'));evidence[stage]={opcao:options.indexOf(button)};originalCheckQuiz(stage,correct,button,explanation)};
function restoreCloud(){isSubmitted=Boolean(cloud.entrega);currentStudentName=cloud.aluno.nome;currentTurma=cloud.aluno.turma.replace('º T','º ');for(const k of Object.keys(evidence))delete evidence[k];quizScores={5:null,6:null,7:null,8:null,9:null};document.querySelectorAll('.progress-step').forEach((el,i)=>el.classList.toggle('completed',i<cloud.etapa));(cloud.respostas||[]).forEach((e,i)=>{evidence[i]=e;if(i>=5){quizScores[i]=true;const button=document.querySelectorAll('#stage-'+i+' .option-btn')[e.opcao];if(button)button.classList.add('correct')}if(e.ordem){const list=i===2?oddList:evenList;const items=Array.from(list.children);for(const val of e.ordem){const j=items.findIndex(el=>Number(el.dataset.val)===val);if(j>=0)list.append(items.splice(j,1)[0])}}})}
function showServerReceipt(){const d=cloud.entrega;if(!d)return;isSubmitted=true;document.getElementById('delivery-receipt-container').classList.remove('hidden');document.getElementById('receipt-student-line').textContent='Estudante: '+cloud.aluno.nome+' • '+cloud.aluno.turma;document.getElementById('receipt-score-line').textContent='5 de 5 desafios concluídos · Tentativa '+cloud.tentativa;document.getElementById('receipt-time-line').textContent='Recebido em: '+new Date(d.enviada_em).toLocaleString('pt-BR',{timeZone:'America/Manaus'})+' · Manaus';document.getElementById('receipt-code-val').textContent='Comprovante: '+d.protocolo;let area=document.getElementById('repeat-area');if(!area){area=document.createElement('div');area.id='repeat-area';area.innerHTML='<p>Vale a última entrega confirmada dentro do prazo.</p><button class="btn-primary" id="repeat-lesson">Refazer atividade</button><p><a href="consulta.html">Consultar entregas da turma</a> · <a href="index.html">Trocar aluno</a></p><p id="repeat-error" role="alert"></p>';document.getElementById('delivery-receipt-container').append(area)}document.getElementById('nextBtn').textContent='Entrega confirmada ✓';document.getElementById('repeat-lesson').onclick=repeatLesson;document.getElementById('delivery-receipt-container').scrollIntoView({behavior:'smooth'})}
async function finalizeAndDeliver(){if(cloudBusy||cloud.entrega)return;cloudBusy=true;const button=document.getElementById('nextBtn');button.disabled=true;button.textContent='Confirmando no servidor…';try{await saveStage();cloud=await cloudRequest('entregar',{tentativa:cloud.tentativa});if(!cloud.entrega)throw Error('Entrega não confirmada. Tente novamente.');showServerReceipt();notice('')}catch(e){notice(e.message);button.textContent='Tentar confirmar entrega'}finally{cloudBusy=false;button.disabled=false}}
async function repeatLesson(){if(cloudBusy)return;cloudBusy=true;const b=document.getElementById('repeat-lesson');b.disabled=true;try{restartKey=restartKey||crypto.randomUUID();cloud=await cloudRequest('reiniciar',{tentativa:cloud.tentativa,reinicio:restartKey});restartKey='';document.getElementById('delivery-receipt-container').classList.add('hidden');document.querySelectorAll('.option-btn').forEach(el=>el.classList.remove('correct','wrong'));document.querySelectorAll('.feedback-box').forEach(el=>{el.className='feedback-box';el.textContent=''});document.getElementById('odd-math-reveal').classList.add('hidden');document.getElementById('even-math-reveal').classList.add('hidden');clearHighlights(oddList);clearHighlights(evenList);restoreCloud();goToStage(0)}catch(e){document.getElementById('repeat-error').textContent=e.message}finally{cloudBusy=false;b.disabled=false}}
// Alternativa ao arrasto para telas pequenas e para eventual falha no CDN.
for(const list of [oddList,evenList]){let chosen=null;const controls=document.createElement('div');controls.className='sort-controls';controls.innerHTML='<span style="width:100%;font-size:14px">Ou toque num bloco e use as setas:</span><button type="button" aria-label="Mover bloco para esquerda">←</button><button type="button" aria-label="Mover bloco para direita">→</button>';list.after(controls);for(const el of list.children){el.tabIndex=0;el.setAttribute('role','button');el.setAttribute('aria-label','Selecionar bloco '+el.dataset.val);el.onclick=()=>{chosen=el;for(const sibling of list.children)sibling.style.outline='';el.style.outline='3px solid #fbbf24'};el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click()}}}controls.children[1].onclick=()=>{if(chosen?.previousElementSibling)list.insertBefore(chosen,chosen.previousElementSibling);clearHighlights(list)};controls.children[2].onclick=()=>{if(chosen?.nextElementSibling)list.insertBefore(chosen.nextElementSibling,chosen);clearHighlights(list)}}
if(cloudToken)cloudRequest('situacao').then(d=>{cloud=d;restoreCloud();const continueButton=document.createElement('button');continueButton.className='btn-start-lesson';continueButton.textContent='Continuar: '+d.aluno.nome;continueButton.onclick=showLesson;document.querySelector('.student-select-card').prepend(continueButton)}).catch(()=>{cloudToken='';saveCloudToken()});

