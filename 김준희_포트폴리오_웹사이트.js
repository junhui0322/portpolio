const defaultWorks = [
  { id: 'work-1', title: '돌이킬 수 없는 앨리스', category: 'painting', year: '2026', series: '궁전으로 갈 수도 있어', art: 'art-a', imageUrl: './alice-kim-junhee.jpg', media: [] },
  { id: 'work-2', title: '안락한 번데기', category: 'painting', year: '2026', series: '궁전으로 갈 수도 있어', art: 'art-b', imageUrl: './cozy-chrysalis-kim-junhee.jpg', media: [] },
  { id: 'work-3', title: '궁전을 찾아 날아서', category: 'painting', year: '2026', series: '궁전으로 갈 수도 있어', art: 'art-c', imageUrl: './flying-to-the-palace-kim-junhui.jpg', media: [] },
  { id: 'work-4', title: '거울 속 내 모습', category: 'painting', year: '2026', series: '궁전으로 갈 수도 있어', art: 'art-d', imageUrl: './my-reflection-kim-junhui.jpg', media: [] },
  { id: 'work-5', title: '이불 아지트 1', category: 'painting', year: '2026', series: '이불 아지트', art: 'art-e', imageUrl: './blanket-hideout-1-kim-junhee.jpg', media: [] },
  { id: 'work-6', title: '이불 아지트 2', category: 'painting', year: '2026', series: '이불 아지트', art: 'art-e', imageUrl: './blanket-hideout-2-kim-junhee.jpg', media: [] },
  { id: 'work-7', title: '이불 아지트 3', category: 'painting', year: '2026', series: '이불 아지트', art: 'art-e', imageUrl: './blanket-hideout-3-kim-junhee.jpg', media: [] },
  { id: 'work-8', title: '소원 Candy 탑', category: 'painting', year: '2026', series: '정물', art: 'art-a', imageUrl: './wish-candy-tower-kim-junhui.jpg', media: [] },
  { id: 'work-9', title: '푸른 Medicine을 선택해', category: 'painting', year: '2026', series: '정물', art: 'art-b', imageUrl: './choose-blue-medicine-kim-junhui.jpg', media: [] },
  { id: 'work-10', title: '옷장 너머의 나니아', category: 'painting', year: '2026', series: '이불', art: 'art-c', imageUrl: './narnia-beyond-the-wardrobe-kim-junhui.jpg', media: [] },
  { id: 'work-11', title: '이불 아지트 4', category: 'painting', year: '2026', series: '이불 아지트', art: 'art-e', imageUrl: './blanket-hideout-4-kim-junhui.jpg', media: [] },
];
const deckArtworkSizes = {
  'work-1': '80.3 × 116.7 cm', 'work-2': '130.3 × 97.0 cm',
  'work-3': '80.3 × 100.0 cm', 'work-4': '91.0 × 72.7 cm',
  'work-5': '50.0 × 72.7 cm', 'work-6': '50.0 × 72.7 cm',
  'work-7': '50.0 × 72.7 cm', 'work-8': '53.0 × 45.5 cm',
  'work-9': '53.0 × 45.5 cm', 'work-10': '45.5 × 53.0 cm',
  'work-11': '50.0 × 72.7 cm',
};
const artworkDisplayOrder = ['work-1', 'work-2', 'work-3', 'work-4', 'work-5', 'work-6', 'work-7', 'work-11', 'work-8', 'work-9', 'work-10'];
for (const work of defaultWorks) {
  work.order = artworkDisplayOrder.indexOf(work.id) + 1;
  work.material = 'Oil on Canvas';
  work.size = deckArtworkSizes[work.id];
  if (work.id === 'work-3') work.title = '궁전을 찾아 날아';
  work.caption = `${work.title}, ${work.year}, ${work.material}, ${work.size}`;
}
const artistNotes = {
  'work-1': '몸은 장난감 집에 비해 터무니없이 커서 무릎이 가슴팍까지 올라와 비좁고 불편해 보인다. 하지만 동시에 작은 장난감 집에 들어간 사실에서 오는 묘한 포근함과 뻔뻔함이 섞여 있다.',
  'work-2': '많은 천에 감싸져 비좁아 보이는 공간에 있지만 오히려 이곳에 있는 것을 원한다. 압박되어 있지만 오히려 편안하다. 성인을 나비로 보고 그전의 상태를 번데기로 본다. 이 공간은 현실 세계와 단절되고 싶어 하는 나의 의지이자 번데기 안이다. 성인이자 나비인 나는 바깥세상이 아닌 번데기 안에서 머무르며 나오지 않는다.',
  'work-3': '닿지 않으며 더 이상 존재하지 않는 어린 시절인 궁전으로 가고 싶어 하는 작품이다. 꿈꾸며 공상하는 것처럼 표현하기 위해 구름 속에서 날고 있으며 번데기 안에서 나가 날개를 펼쳐 훨훨 날아 성을 찾아다닌다.',
  'work-4': '소녀의 화장대에서 거울을 보며 실제로 보이는 자신의 모습은 곰돌이 인형이다. 자기 자신을 한 성인이 아닌 아이로 스스로 여기고 있으며, 그것을 어린아이들이 가지고 다니는 곰돌이 인형으로 자신의 얼굴을 받아들이는 그림이다.',
};
const blanketArtistNote = '아이의 이불 아지트로 보이는 작은 공간에서 요새를 짓고 나오지 않는 모습을 표현한다. 사적인 공간이 아닌 공공의 공간이나 회사, 도보 등 타인들이 섞여 나 자신에게 영향을 끼칠 수 있는 곳에서 아이의 아지트가 이질적이게 놓여있다.';
artistNotes['work-8'] = '소원을 비는 탑을 만들 때 돌이 아닌 소녀의 사탕으로 대신 소원 돌탑을 만든다. 달콤한 냄새가 날 것 같은 소원 candy 탑을 보며 소녀는 궁전으로 가고 싶은 소원을 빌 것이다.';
artistNotes['work-9'] = '현실과 이상을 선택하는 순간이다. 이상적인 자신의 세계를 위해 푸른 약을 선택한 소녀는 푸른 약 또는 사탕들을 손 안에 골라내어 궁전을 향하기 위한 준비를 한다.';
artistNotes['work-10'] = '옷장 너머의 환상의 나니아 세계로 도망치고 싶어하는 그림이다. 옷장 너머로 나비가 들어오며 소녀가 세계에 홀린 듯이 눈을 반짝이고 있다. 그림에선 나니아 세계를 다 보여주지 않으며 보는 사람마다 각각의 유토피아를 상상해볼 수 있는 그림이다. 나니아를 보고 있는 것은 그림 속의 소녀이지만 분명 관람객은 자신만의 나니아 세계가 눈 너머에 보여지고 있을 것이다.';
for (const id of ['work-5', 'work-6', 'work-7', 'work-11']) artistNotes[id] = blanketArtistNote;
for (const work of defaultWorks) work.note = artistNotes[work.id] || '';

defaultWorks.push({
  id: 'work-12', title: '궁전으로 갈 수도 있어.', category: 'animation', year: '2026',
  material: 'Video animation', size: '1280 × 720 , 30s', series: '애니메이션', order: 12,
  imageUrl: './palace-animation-poster.png', media: ['./palace-animation.mp4'],
  caption: '2026\nVideo animation\n1280 × 720 , 30s',
  note: '캔버스끼리 이어지는 작가의 확장된 세계를 보여주고자 한다.',
});
const defaultProfile = {
  bio: '저는 김준희입니다. 어른으로 살아가며 마주하는 책임과 사회의 시선, 그 안에서 여전히 장난치고 꿈꾸는 아이의 마음을 회화로 풀어냅니다.',
  education: '대구가톨릭대학교 미술대학 인터미디어아트과 졸업',
  exhibitions: [{ year: '2026', name: '농카데미아 아트페어' }, { year: '2025', name: '아트쇼제주2025' }],
  email: 'kws020322@naver.com', instagram: 'https://www.instagram.com/junhuiart/', musicUrl: '',
};
const categories = { painting: '회화', digital: '디지털 그림', character: '캐릭터 드로잉', study: '습작', goods: '굿즈', animation: '애니메이션' };
const storageKey = 'junhee-portfolio-content-v1';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const safeUrl = value => { try { const url = new URL(String(value || ''), document.baseURI); if (!value) return ''; return ['http:', 'https:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };

let works = defaultWorks.map(work => ({ ...work }));
let profile = { ...defaultProfile, exhibitions: defaultProfile.exhibitions.map(item => ({ ...item })) };
let selectedWork = -1;
let currentWork = null;
let currentMedia = 0;
const grid = $('#work-grid');
const dialog = $('.detail-dialog');
const manager = $('.manage-dialog');
const audio = $('#background-audio');

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
  if (saved && Array.isArray(saved.works)) {
    works = saved.works.map((work, i) => ({ ...defaultWorks[i % defaultWorks.length], ...work, id: String(work.id || `work-${i + 1}`), media: Array.isArray(work.media) ? work.media : [] }));
  }
  if (saved?.profile) profile = { ...defaultProfile, ...saved.profile, email: saved.profile.email || defaultProfile.email, instagram: saved.profile.instagram || defaultProfile.instagram, exhibitions: Array.isArray(saved.profile.exhibitions) ? saved.profile.exhibitions : defaultProfile.exhibitions };
} catch { /* Ignore damaged local drafts; the supplied portfolio content stays available. */ }

if (!profile.education || profile.education === '학력 및 졸업 시점 확인 후 기재') profile.education = defaultProfile.education;
// Supply the published artwork for older drafts that still contain a placeholder.
works = works.map(work => defaultWorks.some(item => item.id === work.id) ? { ...work, year: '2026' } : work);
works = works.map(work => {
  if (work.id === 'work-5' && work.title === '이불 아지트' && !work.imageUrl && !(work.media || []).length) {
    return { ...work, ...defaultWorks.find(item => item.id === 'work-5') };
  }
  const published = defaultWorks.find(item => item.id === work.id && item.title === work.title);
  return !work.imageUrl && published?.imageUrl ? { ...work, imageUrl: published.imageUrl } : work;
});
for (const published of defaultWorks.filter(work => ['work-6', 'work-7', 'work-8', 'work-9', 'work-10', 'work-11', 'work-12'].includes(work.id))) {
  if (!works.some(work => work.id === published.id || work.title === published.title)) works.push({ ...published });
}

works = works.map(work => {
  const published = defaultWorks.find(item => item.id === work.id);
  if (!published) return work;
  return { ...work, material: published.material, size: published.size, order: published.order,
    caption: !work.caption || work.caption === '작품 캡션 준비 중' ? published.caption : work.caption,
    ...(work.id === 'work-3' && work.title === '궁전을 찾아 날아서' ? { title: published.title, imageUrl: work.imageUrl || published.imageUrl } : {}) };
});

// Fill notes in existing browser drafts as well as the default artwork list.
works = works.map(work => artistNotes[work.id] && (!work.note || work.note === '작가 노트 준비 중')
  ? { ...work, note: artistNotes[work.id] }
  : work);

function saveLocal() {
  try { localStorage.setItem(storageKey, JSON.stringify({ works, profile })); return true; }
  catch { alert('브라우저 저장 공간이 부족해요. 콘텐츠 JSON으로 백업해주세요.'); return false; }
}

function workMedia(work) { return (work.category === 'animation' && work.media?.length ? work.media : [work.imageUrl, ...(work.media || [])]).map(safeUrl).filter(Boolean); }

function cardMedia(work) {
  const url = safeUrl(work.imageUrl);
  const original = defaultWorks.find(item => item.id === work.id);
  const localOriginal = original && safeUrl(original.imageUrl) === url && /^\.\/.+\.jpg$/.test(original.imageUrl);
  const responsive = localOriginal
    ? ` srcset="${[400,800,1200].map(width => `${esc(safeUrl(original.imageUrl.replace(/\.jpg$/, `-preview-${width}.jpg`)))} ${width}w`).join(', ')}" sizes="(max-width:760px) 44vw, (max-width:1380px) 29vw, 400px"`
    : '';
  if (url) return `<span class="work-image artwork-photo"><img class="cover" src="${esc(url)}"${responsive} alt="${esc(work.title)}" loading="lazy" decoding="async">${work.category === 'animation' ? '<span class="video-play-badge" aria-hidden="true">▶ VIDEO · 30s</span>' : ''}<span class="art-label">${work.media?.length ? 'IMAGE + MEDIA' : 'ARTWORK'}</span></span>`;
  const art = /^art-[a-e]$/.test(work.art) ? work.art : 'art-a';
  return `<span class="work-image ${art}" role="img" aria-label="${esc(work.title)} 이미지 미리보기"><span class="art-label">이미지 준비 중 · 미리보기</span></span>`;
}

function render(filter = 'all') {
  const visible = works.map((work, index) => ({ ...work, _index: index }))
    .filter(work => filter === 'all' || work.category === filter)
    .sort((a, b) => (Number(a.order) || a._index + 1) - (Number(b.order) || b._index + 1));
  grid.innerHTML = visible.length
    ? visible.map(work => `<button class="work-card reveal visible" data-work="${work._index}" aria-label="${esc(work.title || '제목 미정')} 작품 상세 열기">${cardMedia(work)}<span class="work-title"><span>${esc(work.title || '제목 미정')}</span><span>↗</span></span><span class="work-meta">${esc(categories[work.category] || '분류 미정')}　·　${esc(work.year || '연도 확인 중')}</span></button>`).join('')
    : '<p class="empty-works">이 분류에 공개된 작품이 없습니다. 작가 관리에서 작품을 추가할 수 있어요.</p>';
}

function renderProfile() {
  const paragraphs = $$('.about-copy > p');
  if (paragraphs[0]) paragraphs[0].textContent = profile.bio;
  const education = $$('.bio-list dd')[3];
  if (education) education.textContent = profile.education || '학력 확인 후 기재';
  $('.exhibitions').innerHTML = '<h3>Selected exhibitions</h3>' + profile.exhibitions.map(item => `<p><span>${esc(item.year)}</span> ${esc(item.name)}</p>`).join('');
  const contact = $$('.contact-row b');
  if (contact[0]) contact[0].innerHTML = profile.email ? `<a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>` : '공개 주소 준비 중';
  if (contact[1]) contact[1].innerHTML = safeUrl(profile.instagram) ? `<a href="${esc(safeUrl(profile.instagram))}" target="_blank" rel="noreferrer">${esc(profile.instagram.replace(/\/$/, '').split('/').pop().replace(/^/, '@'))} ↗</a>` : '공개 계정 준비 중';
  const firstImage = works.find(work => safeUrl(work.imageUrl));
  const hero = $('#hero-art');
  if (firstImage) { hero.style.backgroundImage = `url("${safeUrl(firstImage.imageUrl)}")`; hero.style.backgroundSize = 'cover'; hero.style.backgroundPosition = 'center'; }
  else hero.style.backgroundImage = '';
  const musicUrl = safeUrl(profile.musicUrl);
  if (musicUrl) audio.src = musicUrl; else audio.removeAttribute('src');
  const musicButton = $('#music-button');
  if (musicButton) musicButton.textContent = musicUrl ? '♫ 배경음악 재생' : '♫ 배경음악 선택';
}

function renderDetailMedia() {
  if (!currentWork) return;
  const sources = workMedia(currentWork);
  const stage = dialog.querySelector('.media-stage');
  const nav = dialog.querySelector('.media-nav');
  if (!sources.length) {
    const art = /^art-[a-e]$/.test(currentWork.art) ? currentWork.art : 'art-a';
    stage.innerHTML = `<div class="work-image ${art} media-item preview" role="img" aria-label="${esc(currentWork.title)} 작품 이미지 미리보기"><span class="art-label">실제 작품 이미지 준비 중</span></div>`;
    nav.hidden = true;
    return;
  }
  currentMedia = (currentMedia + sources.length) % sources.length;
  const url = sources[currentMedia];
  const video = /\.(mp4|webm|ogg)(?:[?#]|$)/i.test(url);
  stage.innerHTML = video
    ? `<video class="media-item" src="${esc(url)}" poster="${esc(safeUrl(currentWork.imageUrl))}" controls playsinline preload="metadata" aria-label="${esc(currentWork.title)} 작품 영상"></video>`
    : `<img class="media-item" src="${esc(url)}" alt="${esc(currentWork.title)} 작품 이미지 ${currentMedia + 1}" decoding="async">`;
  nav.hidden = sources.length < 2;
  dialog.querySelector('.media-count').textContent = `${currentMedia + 1} / ${sources.length}`;
}

render();
renderProfile();

$('.filters').addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  $$('.filter').forEach(item => item.classList.toggle('active', item === button));
  render(button.dataset.filter);
});

grid.addEventListener('click', event => {
  const card = event.target.closest('[data-work]');
  if (!card) return;
  currentWork = works[Number(card.dataset.work)];
  currentMedia = 0;
  dialog.querySelector('.detail-index').textContent = `${categories[currentWork.category] || '작품'}　/　${currentWork.series || 'Selected works'}`;
  dialog.querySelector('h2').textContent = currentWork.title || '제목 미정';
  dialog.querySelector('.detail-caption').textContent = currentWork.caption || [currentWork.title, currentWork.year, currentWork.material, currentWork.size].filter(Boolean).join(', ');
  dialog.querySelector('.detail-copy').textContent = currentWork.note || '작가 노트 준비 중';
  renderDetailMedia();
  dialog.showModal();
});

dialog.querySelectorAll('[data-media-step]').forEach(button => button.addEventListener('click', () => {
  const count = workMedia(currentWork).length;
  if (count > 1) { currentMedia = (currentMedia + Number(button.dataset.mediaStep) + count) % count; renderDetailMedia(); }
}));
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => dialog.querySelectorAll('video').forEach(video => video.pause()));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

const zoom = $('.zoom-dialog');
dialog.querySelector('.zoom-open').addEventListener('click', () => {
  const item = dialog.querySelector('.media-stage .media-item');
  if (!item) return;
  zoom.querySelector('.zoom-stage').replaceChildren(item.cloneNode(true));
  zoom.showModal();
});
zoom.querySelector('.zoom-close').addEventListener('click', () => zoom.close());
zoom.addEventListener('click', event => { if (event.target === zoom) zoom.close(); });

const menu = $('.menu-button');
const nav = $('.nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? '×' : '☰';
});
nav.addEventListener('click', event => {
  if (event.target.closest('a, #manage-open')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = '☰'; }
});

function fillWorkForm(index) {
  selectedWork = index;
  const work = works[index];
  $('#work-title-input').value = work?.title || '';
  $('#work-category-input').value = work?.category || 'painting';
  $('#work-year-input').value = work?.year || '';
  $('#work-material-input').value = work?.material || '';
  $('#work-size-input').value = work?.size || '';
  $('#work-order-input').value = work?.order || index + 1 || '';
  $('#work-image-input').value = work?.imageUrl || '';
  $('#work-media-input').value = (work?.media || []).join('\n');
  $('#work-caption-input').value = work?.caption || '';
  $('#work-note-input').value = work?.note || '';
  renderManageList();
}

function renderManageList() {
  $('#manage-list').innerHTML = works.map((work, index) => `<button class="manage-item" type="button" data-manage-work="${index}"><span>${esc(work.title || '제목 미정')}</span><small>${esc(categories[work.category] || '분류 미정')}</small></button>`).join('');
}

$('#manage-open').addEventListener('click', () => {
  renderManageList();
  $('#bio-input').value = profile.bio;
  $('#education-input').value = profile.education;
  $('#exhibition-input').value = profile.exhibitions.map(item => `${item.year} | ${item.name}`).join('\n');
  $('#email-input').value = profile.email;
  $('#instagram-input').value = profile.instagram;
  $('#music-url-input').value = profile.musicUrl;
  manager.showModal();
});
$('.manage-close').addEventListener('click', () => manager.close());
manager.addEventListener('click', event => { if (event.target === manager) manager.close(); });
$('#manage-list').addEventListener('click', event => {
  const button = event.target.closest('[data-manage-work]');
  if (button) fillWorkForm(Number(button.dataset.manageWork));
});

$('#new-work').addEventListener('click', () => {
  selectedWork = -1;
  $('#work-title-input').value = '';
  $('#work-category-input').value = 'painting';
  $('#work-year-input').value = '';
  $('#work-material-input').value = '';
  $('#work-size-input').value = '';
  $('#work-order-input').value = works.length + 1;
  $('#work-image-input').value = '';
  $('#work-media-input').value = '';
  $('#work-caption-input').value = '';
  $('#work-note-input').value = '';
  $('#work-title-input').focus();
});

$('#save-work').addEventListener('click', () => {
  const title = $('#work-title-input').value.trim();
  if (!title) { alert('작품명을 입력해주세요.'); return; }
  const imageUrl = $('#work-image-input').value.trim();
  const media = $('#work-media-input').value.split(/\r?\n/).map(value => value.trim()).filter(Boolean);
  if ((imageUrl && !safeUrl(imageUrl)) || media.some(value => !safeUrl(value))) { alert('이미지와 영상 주소는 HTTPS 또는 HTTP URL로 입력해주세요.'); return; }
  const old = selectedWork >= 0 ? works[selectedWork] : null;
  const next = {
    ...(old || {}), id: old?.id || `work-${Date.now()}`, title, category: $('#work-category-input').value,
    series: old?.series || 'Selected works', year: $('#work-year-input').value.trim(),
    material: $('#work-material-input').value.trim(), size: $('#work-size-input').value.trim(),
    order: Number($('#work-order-input').value) || works.length + 1, imageUrl, media,
    caption: $('#work-caption-input').value.trim(), note: $('#work-note-input').value.trim(),
    art: old?.art || `art-${String.fromCharCode(97 + (works.length % 5))}`,
  };
  if (selectedWork < 0) { works.push(next); selectedWork = works.length - 1; }
  else works[selectedWork] = next;
  saveLocal(); render(); renderProfile(); fillWorkForm(selectedWork);
});

$('#delete-work').addEventListener('click', () => {
  if (selectedWork < 0) return;
  if (!confirm('이 작품 정보를 목록에서 삭제할까요? 삭제 전에 콘텐츠 JSON을 백업할 수 있습니다.')) return;
  works.splice(selectedWork, 1); selectedWork = -1; saveLocal(); render(); renderManageList();
  ['work-title-input', 'work-year-input', 'work-material-input', 'work-size-input', 'work-image-input', 'work-media-input', 'work-caption-input', 'work-note-input'].forEach(id => { $(`#${id}`).value = ''; });
});

$('#save-profile').addEventListener('click', () => {
  const email = $('#email-input').value.trim();
  const instagram = $('#instagram-input').value.trim();
  const musicUrl = $('#music-url-input').value.trim();
  if ((instagram && !safeUrl(instagram)) || (musicUrl && !safeUrl(musicUrl))) { alert('SNS와 음원 주소는 HTTPS 또는 HTTP URL로 입력해주세요.'); return; }
  profile = {
    bio: $('#bio-input').value.trim(), education: $('#education-input').value.trim(),
    exhibitions: $('#exhibition-input').value.split(/\r?\n/).map(line => { const [year, ...name] = line.split('|'); return { year: year.trim(), name: name.join('|').trim() }; }).filter(item => item.year || item.name),
    email, instagram, musicUrl,
  };
  saveLocal(); renderProfile();
});

function downloadJson(name, data) {
  const link = document.createElement('a');
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  link.href = url; link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
$('#export-content').addEventListener('click', () => downloadJson('junhee-portfolio-content.json', { works, profile }));
$('#import-content-file').addEventListener('change', async event => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!Array.isArray(data.works) || !data.profile) throw new Error('invalid shape');
    works = data.works.map((work, index) => ({ ...defaultWorks[index % defaultWorks.length], ...work, id: String(work.id || `work-${index + 1}`), media: Array.isArray(work.media) ? work.media : [] }));
    profile = { ...defaultProfile, ...data.profile, exhibitions: Array.isArray(data.profile.exhibitions) ? data.profile.exhibitions : [] };
    saveLocal(); render(); renderProfile(); $('#manage-open').click();
  } catch { alert('포트폴리오 콘텐츠 백업 JSON 형식이 올바르지 않습니다.'); }
  finally { event.target.value = ''; }
});

$('#music-button').addEventListener('click', async () => {
  if (!safeUrl(profile.musicUrl)) {
    manager.showModal(); $('#music-url-input').focus();
    alert('작가 관리에서 공개 가능한 음원 URL을 먼저 입력해주세요. 음악은 직접 재생을 눌렀을 때만 시작합니다.');
    return;
  }
  if (audio.paused) {
    try { await audio.play(); $('#music-button').classList.add('playing'); $('#music-button').textContent = '♫ 배경음악 끄기'; $('#music-button').setAttribute('aria-pressed', 'true'); }
    catch { alert('이 음원을 재생할 수 없습니다. 공개 주소와 권한을 확인해주세요.'); }
  } else {
    audio.pause(); $('#music-button').classList.remove('playing'); $('#music-button').textContent = '♫ 배경음악 재생'; $('#music-button').setAttribute('aria-pressed', 'false');
  }
});
audio.addEventListener('ended', () => { $('#music-button').classList.remove('playing'); $('#music-button').textContent = '♫ 배경음악 재생'; $('#music-button').setAttribute('aria-pressed', 'false'); });

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));





