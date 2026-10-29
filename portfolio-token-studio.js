/* Portfolio design tokens. Tokens Studio legacy JSON format. */
const tokens = [
  ['color.canvas','배경','color','#F8F6F1','--canvas','페이지 배경'],
  ['color.surface','배경','color','#FFFEFA','--surface','카드 · 기본 표면'],
  ['color.text.primary','텍스트','color','#292722','--ink','제목 · 본문'],
  ['color.text.secondary','텍스트','color','#77746E','--muted','보조 설명'],
  ['color.brand.default','브랜드','color','#A45D45','--accent','버튼 · 그래프 · 강조'],
  ['color.brand.hover','브랜드','color','#854832','--accent-hover','버튼 호버'],
  ['color.brand.weak','브랜드','color','#EFDFD8','--soft','선택 영역 · 상태 배경'],
  ['color.border','테두리','color','#E7E2D9','--line','구분선 · 카드 테두리'],
  ['color.onBrand','텍스트','color','#FFFFFF','--on-brand','강조 버튼 위 텍스트'],
  ['color.illustration.sage','보조 팔레트','color','#DCE6DC','--sage','완료 상태 · 작품 이미지'],
  ['color.illustration.blue','보조 팔레트','color','#DCE6E8','--blue','정보 상태 · 작품 이미지'],
  ['color.illustration.lilac','보조 팔레트','color','#E6E0ED','--lilac','검토 상태 · 작품 이미지'],
  ['color.illustration.sand','보조 팔레트','color','#EDE5D6','--sand','작가 소개 · 강조 문구'],
  ['spacing.base','레이아웃','spacing','24px','--space','카드 사이 간격'],
  ['spacing.compact','레이아웃','spacing','12px','--space-compact','카드 안 여백 · 버튼'],
  ['spacing.section','레이아웃','spacing','48px','--space-section','페이지 · 섹션 여백'],
  ['typography.body','글자 크기','fontSizes','14px','--body-size','본문 · 카드 제목'],
  ['typography.display','글자 크기','fontSizes','43px','--heading-size','화면 제목'],
  ['typography.small','글자 크기','fontSizes','10px','--small-size','캡션 · 보조 정보'],
  ['typography.lineHeight','행간','lineHeights','22px','--body-line','본문 줄 높이'],
  ['typography.family.body','글꼴','fontFamilies','Malgun Gothic','--font-body','본문 글꼴'],
  ['typography.family.display','글꼴','fontFamilies','Georgia','--font-display','제목 글꼴'],
  ['typography.weight','글자 굵기','fontWeights',600,'--font-weight','카드 제목 · 버튼 굵기'],
  ['radius.card','모서리','borderRadius','22px','--r-card','카드 · 패널'],
  ['radius.pill','모서리','borderRadius','999px','--r-pill','버튼 · 상태 배지'],
  ['radius.artwork','모서리','borderRadius','4px','--r-artwork','작품 썸네일'],
  ['shadow.card','그림자','boxShadow',{x:'0px',y:'18px',blur:'50px',spread:'0px',color:'#33281A12',type:'dropShadow'},'--shadow','카드의 깊이'],
  ['motion.transition','모션','duration','200ms','--transition','호버 · 화면 전환']
].map(([id,group,type,value,css,usage]) => ({id,group,type,value,css,usage,category:type==='color'?'color':type==='spacing'?'spacing':type==='borderRadius'?'radius':type==='boxShadow'?'shadow':type==='duration'?'motion':'typography'}));
const clone = value => JSON.parse(JSON.stringify(value));
const baseline = Object.fromEntries(tokens.map(t => [t.id,clone(t.value)]));
const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const byId = new Map(tokens.map(t => [t.id,t]));
const aliases = {'color.accent':'color.brand.default','color.accent.hover':'color.brand.hover','color.accent.weak':'color.brand.weak'};
function validateToken(id, value) {
  const t=byId.get(id); if(!t) throw new Error('지원하지 않는 토큰입니다.');
  if(t.type==='color') {if(typeof value!=='string'||!/^#[\da-f]{6}([\da-f]{2})?$/i.test(value)) throw new Error('6자리 또는 8자리 HEX를 입력하세요.'); return value.toUpperCase();}
  if(t.type==='boxShadow') {
    if(!value||typeof value!=='object'||Array.isArray(value)) throw new Error('그림자의 오프셋, 흐림, 퍼짐과 색상을 입력하세요.');
    const result={}; for(const key of ['x','y','blur','spread']) {const match=String(value[key]).match(/^(-?\d+(?:\.\d+)?)px$/);if(!match||Math.abs(Number(match[1]))>200||key==='blur'&&Number(match[1])<0)throw new Error('그림자 크기는 -200~200px, 흐림은 0~200px입니다.');result[key]=value[key];}
    if(!/^#[\da-f]{6}([\da-f]{2})?$/i.test(value.color||'')) throw new Error('그림자 색상은 HEX로 입력하세요.'); result.color=value.color.toUpperCase(); result.type='dropShadow';return result;
  }
  if(t.type==='fontFamilies') {if(typeof value!=='string'||!value.trim()||value.length>80||/[{};<>\\]/.test(value))throw new Error('글꼴 이름을 입력하세요.');return value.trim();}
  if(t.type==='fontWeights') {const n=Number(value);if(!Number.isInteger(n)||n<100||n>900)throw new Error('굵기는 100~900 사이 정수입니다.');return n;}
  const unit=t.type==='duration'?'ms':'px'; const m=String(value).match(new RegExp('^(\\d+(?:\\.\\d+)?)'+unit+'$'));
  const n=m?Number(m[1]):-1; const max=t.type==='borderRadius'?9999:t.type==='duration'?2000:t.category==='typography'?120:160;
  if(n<0||n>max||t.category==='typography'&&n<6)throw new Error(`${t.category==='typography'?6:0}~${max}${unit} 사이 값을 입력하세요.`);return `${n}${unit}`;
}
function normalized(input) {
  const result=clone(baseline); if(!input||typeof input!=='object')throw new Error('토큰 객체가 필요합니다.');
  for(const [key,value] of Object.entries(input)) {const id=aliases[key]||key;if(!byId.has(id))continue;if(id==='shadow.card'&&typeof value==='string')continue;result[id]=validateToken(id,value);}
  return result;
}
function shadowCss(value) {return `${value.x} ${value.y} ${value.blur} ${value.spread} ${value.color}`;}
function exportTokenData(values) {
  const global={};for(const t of tokens){let node=global;const parts=t.id.split('.');for(const part of parts.slice(0,-1))node=node[part]??={};node[parts.at(-1)]={value:clone(values[t.id]),type:t.type,description:`김준희 포트폴리오 · ${t.usage}`};}
  return {global,$themes:[{id:'junhee-portfolio',name:'Portfolio',selectedTokenSets:{global:'enabled'}}],$metadata:{tokenSetOrder:['global']}};
}
function importTokenData(json) {
  if(!json||typeof json!=='object'||Array.isArray(json))throw new Error('Tokens Studio JSON 파일을 선택하세요.');
  const flat={};let found=0;function walk(node,path){if(!node||typeof node!=='object')return;if(Object.hasOwn(node,'value')||Object.hasOwn(node,'$value')){const id=aliases[path.join('.')]||path.join('.');if(!byId.has(id))throw new Error(`지원하지 않는 토큰: ${id}`);flat[id]=validateToken(id,node.value??node.$value);found++;return;}for(const [key,value] of Object.entries(node))if(!key.startsWith('$'))walk(value,[...path,key]);}
  if(json.global||json.light){for(const set of ['global','light'])if(json[set])walk(json[set],[]);}else walk(json,[]);
  if(!found)throw new Error('가져올 포트폴리오 토큰이 없습니다.');return normalized(flat);
}

// UI starts here. All edited values are validated before preview or export.
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
let values=clone(baseline),category='color',past=[],future=[],compare=false,saveTimer,toastTimer;
const storageKey='junhee-token-studio-v2';
try {const stored=JSON.parse(localStorage.getItem(storageKey)||localStorage.getItem('junhee-token-studio')||'null');if(stored?.values)values=normalized(stored.values);}catch{}
const preview=$('#preview'),frame=$('#portfolio-preview'),list=$('#token-list');
function portfolioCSS(v) {
  const mappings={'--paper':'color.canvas','--surface':'color.surface','--ink':'color.text.primary','--muted':'color.text.secondary','--line':'color.border','--rust':'color.brand.default','--rust-dark':'color.brand.hover','--sage':'color.illustration.sage','--blue':'color.illustration.blue','--rose':'color.brand.weak','--lilac':'color.illustration.lilac','--sand':'color.illustration.sand','--radius':'radius.card'};
  const props=Object.entries(mappings).map(([css,id])=>`${css}:${v[id]}`).join(';');
  const bodyFont=JSON.stringify(v['typography.family.body']),displayFont=JSON.stringify(v['typography.family.display']);
  return `:root{${props};--shadow:${shadowCss(v['shadow.card'])};--sans:${bodyFont},sans-serif;--serif:${displayFont},serif}body,.hero-copy,.about-copy>p,.contact-layout p{font-size:${v['typography.body']};line-height:${v['typography.lineHeight']}}.hero h1{font-size:clamp(34px,8vw,calc(${v['typography.display']} * 2))}.section-heading h2,.about-copy h2,.contact-layout h2{font-size:${v['typography.display']}}.hero,.about-section,.contact-layout{gap:${v['spacing.base']}}.section{padding:${v['spacing.section']} 0}.work-grid{gap:${v['spacing.base']}}.contact-card{padding:calc(${v['spacing.compact']} * 2);border-radius:${v['radius.card']};box-shadow:${shadowCss(v['shadow.card'])}}.button,.nav-contact,.filter{border-radius:${v['radius.pill']};padding:${v['spacing.compact']} calc(${v['spacing.compact']} * 1.5);font-weight:${v['typography.weight']}}.button:not(.ghost),.filter.active{background:var(--rust);border-color:var(--rust);color:${v['color.onBrand']}}.button:hover{background:var(--rust-dark)}.work-image{border-radius:${v['radius.artwork']}}.work-meta,.eyebrow,.contact-note,.detail-meta,.footer{font-size:${v['typography.small']}!important}.work-title{font-weight:${v['typography.weight']}}.work-card .work-image{box-shadow:${shadowCss(v['shadow.card'])}}.statement{background:var(--sand)}.hero-art,.about-art{background:linear-gradient(150deg,var(--sand),var(--sage),var(--blue))}.art-a,.art-b,.art-c,.art-d,.art-e{background:linear-gradient(140deg,var(--sand),var(--sage),var(--lilac))}.reveal{opacity:1;transform:none}.button,.work-image,.filter{transition-duration:${v['motion.transition']}}header{background:var(--paper)}.section-heading p,.hero-copy,.about-copy>p,.contact-layout p{color:var(--muted)}.contact-section{background:var(--sand)}.works-section{background:var(--paper)}.contact-card{background:var(--surface)}.art-caption,.art-label{z-index:1} @media(max-width:760px){.hero{padding:${v['spacing.section']} 0}.hero h1{font-size:calc(${v['typography.display']} * 1.45)}}`;
}
function apply() {
  const v=compare?baseline:values;
  for(const t of tokens)preview.style.setProperty(t.css,t.type==='boxShadow'?shadowCss(v[t.id]):t.type==='fontFamilies'?JSON.stringify(v[t.id]):v[t.id]);
  try {const doc=frame.contentDocument;if(doc?.head){let style=doc.getElementById('portfolio-token-style');if(!style){style=doc.createElement('style');style.id='portfolio-token-style';doc.head.append(style);}style.textContent=portfolioCSS(v);}}catch{}
  const changes=tokens.filter(t=>!same(values[t.id],baseline[t.id])).length;
  $('#token-count').textContent=tokens.length;$('#change-count').textContent=changes?`${changes}개 토큰 변경됨`:'변경된 토큰 없음';$('#change-summary').textContent=changes;
  $('#undo').disabled=!past.length;$('#redo').disabled=!future.length;$('#compare').classList.toggle('active',compare);$('#compare').setAttribute('aria-pressed',String(compare));$('#compare').textContent=compare?'편집본 보기':'원본 보기';
}
function persist() {clearTimeout(saveTimer);$('#save-status').textContent='저장 중…';saveTimer=setTimeout(()=>{try{localStorage.setItem(storageKey,JSON.stringify({values}));$('#save-status').textContent='브라우저에 저장됨';}catch{$('#save-status').textContent='저장 실패 · JSON으로 백업하세요';}},250);}
function render() {
  const query=$('#search').value.trim().toLowerCase(),changed=$('#changed-only').checked;
  const items=tokens.filter(t=>(query?`${t.id} ${t.group} ${t.usage}`.toLowerCase().includes(query):t.category===category)&&(!changed||!same(values[t.id],baseline[t.id])));
  let previous='';list.innerHTML=items.map(t=>{const heading=t.group!==previous?`<div class="group-label">${esc(t.group)}</div>`:'';previous=t.group;const value=values[t.id],dirty=!same(value,baseline[t.id]);
    let fields;if(t.type==='boxShadow'){fields=`<div class="shadow-fields">${['x','y','blur','spread','color'].map(key=>`<label>${{x:'X',y:'Y',blur:'흐림',spread:'퍼짐',color:'색상'}[key]}<input class="token-input" data-id="${t.id}" data-field="${key}" value="${esc(value[key])}" aria-label="${t.id} ${key}"></label>`).join('')}</div>`;}
    else fields=`${t.type==='color'?`<input class="color-picker" type="color" data-id="${t.id}" data-picker value="${value.slice(0,7)}" aria-label="${t.id} 색상 선택">`:''}<input class="token-input ${t.type==='fontFamilies'?'font-input':''}" data-id="${t.id}" value="${esc(value)}" aria-label="${t.id} 값" spellcheck="false">`;
    return `${heading}<div class="token-row ${dirty?'changed':''}" data-token="${t.id}"><div class="token-name">${esc(t.id)}<button class="individual-reset" data-reset="${t.id}" aria-label="${t.id} 기본값 복원" ${dirty?'':'disabled'}>↺</button></div><div class="token-controls">${fields}</div><small>${esc(t.usage)} · ${t.type}</small><div class="token-error" aria-live="polite"></div></div>`;
  }).join('')||'<div class="empty">표시할 토큰이 없어요.</div>';
}
function commit(next, message) {past.push(clone(values));if(past.length>100)past.shift();future=[];values=next;compare=false;apply();persist();if(message){render();toast(message);}}
list.addEventListener('input',event=>{
  const input=event.target,id=input.dataset.id;if(!id)return;let value=input.dataset.field?{...values[id],[input.dataset.field]:input.value}:input.value;
  if(input.hasAttribute('data-picker'))value=input.value.toUpperCase()+(values[id].length===9?values[id].slice(7):'');
  const row=input.closest('.token-row');try{value=validateToken(id,value);if(!same(value,values[id]))commit({...values,[id]:value});row.classList.toggle('changed',!same(value,baseline[id]));row.querySelector('[data-reset]').disabled=same(value,baseline[id]);row.querySelector('.token-error').textContent='';input.removeAttribute('aria-invalid');
    if(byId.get(id).type==='color'){row.querySelector('.color-picker').value=value.slice(0,7);if(input.hasAttribute('data-picker'))row.querySelector('.token-input').value=value;}
  }catch(error){input.setAttribute('aria-invalid','true');row.querySelector('.token-error').textContent=error.message;}
});
list.addEventListener('click',event=>{const button=event.target.closest('[data-reset]');if(button)commit({...values,[button.dataset.reset]:clone(baseline[button.dataset.reset])},'토큰을 기본값으로 복원했어요.');});
$$('.category-nav button').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.category;$('#search').value='';$$('.category-nav button').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});render();}));
$('#search').addEventListener('input',render);$('#changed-only').addEventListener('change',render);
$('#undo').addEventListener('click',()=>{if(!past.length)return;future.push(clone(values));values=past.pop();compare=false;apply();render();persist();});
$('#redo').addEventListener('click',()=>{if(!future.length)return;past.push(clone(values));values=future.pop();compare=false;apply();render();persist();});
$('#reset').addEventListener('click',()=>commit(clone(baseline),'전체 기본값으로 복원했어요. 실행 취소할 수 있습니다.'));
$('#compare').addEventListener('click',()=>{compare=!compare;apply();});
$$('[data-device]').forEach(button=>button.addEventListener('click',()=>{$$('[data-device]').forEach(b=>b.classList.toggle('active',b===button));$('.preview-shell').classList.toggle('mobile',button.dataset.device==='mobile');}));
$$('[data-view]').forEach(button=>button.addEventListener('click',()=>{const portfolio=button.dataset.view==='portfolio';$$('[data-view]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-selected',String(b===button));});preview.hidden=portfolio;frame.hidden=!portfolio;$('#preview-label').textContent=portfolio?'LIVE PREVIEW / PORTFOLIO':'LIVE PREVIEW / DASHBOARD';$('.browser-url').textContent=portfolio?'김준희 포트폴리오 / 작품 · 소개 · 연락':'김준희 스튜디오 / 대시보드 · 예시 데이터';apply();}));
frame.addEventListener('load',apply);
function showExport(){const data=exportTokenData(values);$('#json').textContent=JSON.stringify(data,null,2);$('#export-dialog').showModal();}
$('#export').addEventListener('click',showExport);$('#export-dialog .close').addEventListener('click',()=>$('#export-dialog').close());
$('#copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#json').textContent);toast('JSON을 복사했어요.');}catch{toast('JSON 다운로드를 사용해주세요.');}});
function download(name,content,type){const url=URL.createObjectURL(new Blob([content],{type})),link=document.createElement('a');link.href=url;link.download=name;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('#download').addEventListener('click',()=>{download('junhee-portfolio.tokens.json',JSON.stringify(exportTokenData(values),null,2),'application/json');toast('Figma용 JSON을 다운로드했어요.');});
$('#import-button').addEventListener('click',()=>$('#import-file').click());$('#import-file').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{commit(importTokenData(JSON.parse(await file.text())),'토큰을 가져왔어요.');}catch(error){toast(error.message);}event.target.value='';});
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3500);}
apply();render();

