const defaultWorks = [
  { id: 'work-1', title: '돌이킬 수 없는 앨리스', category: 'painting', series: '궁전으로 갈 수도 있어', art: 'art-a', media: [] },
  { id: 'work-2', title: '안락한 번데기', category: 'painting', series: '궁전으로 갈 수도 있어', art: 'art-b', media: [] },
  { id: 'work-3', title: '궁전을 찾아 날아서', category: 'painting', series: '궁전으로 갈 수도 있어', art: 'art-c', media: [] },
  { id: 'work-4', title: '거울 속 내 모습', category: 'painting', series: '궁전으로 갈 수도 있어', art: 'art-d', media: [] },
  { id: 'work-5', title: '이불 아지트', category: 'painting', series: '궁전으로 갈 수도 있어', art: 'art-e', media: [] },
];
const defaultProfile = {
  bio: '저는 김준희입니다. 어른으로 살아가며 마주하는 책임과 사회의 시선, 그 안에서 여전히 장난치고 꿈꾸는 아이의 마음을 회화로 풀어냅니다.',
  education: '학력 및 졸업 시점 확인 후 기재',
  exhibitions: [{ year: '2026', name: '농카데미아 아트페어' }, { year: '2025', name: '아트쇼제주2025' }],
  email: '', instagram: '', musicUrl: '',
};
const categories = { painting: '회화', digital: '디지털 그림', character: '캐릭터 드로잉', study: '습작', goods: '굿즈', animation: '애니메이션' };
const storageKey = 'junhee-portfolio-content-v1';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const safeUrl = value => { try { const url = new URL(String(value || '')); return ['http:', 'https:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };

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
  if (saved?.profile) profile = { ...defaultProfile, ...saved.profile, exhibitions: Array.isArray(saved.profile.exhibitions) ? saved.profile.exhibitions : defaultProfile.exhibitions };
} catch { /* Ignore damaged local drafts; the supplied portfolio content stays available. */ }

function saveLocal() {
  try { localStorage.setItem(storageKey, JSON.stringify({ works, profile })); return true; }
  catch { alert('브라우저 저장 공간이 부족해요. 콘텐츠 JSON으로 백업해주세요.'); return false; }
}

function workMedia(work) { return [work.imageUrl, ...(work.media || [])].map(safeUrl).filter(Boolean); }

function cardMedia(work) {
  const url = safeUrl(work.imageUrl);
  if (url) return `<span class="work-image"><img class="cover" src="${esc(url)}" alt="${esc(work.title)}" loading="lazy"><span class="art-label">${work.media?.length ? 'IMAGE + MEDIA' : 'ARTWORK'}</span></span>`;
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
  if (contact[1]) contact[1].innerHTML = safeUrl(profile.instagram) ? `<a href="${esc(safeUrl(profile.instagram))}" target="_blank" rel="noreferrer">Instagram ↗</a>` : '공개 계정 준비 중';
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
    ? `<video class="media-item" src="${esc(url)}" controls playsinline preload="metadata" aria-label="${esc(currentWork.title)} 작품 영상"></video>`
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
  dialog.querySelector('.detail-meta').textContent = [currentWork.year || '연도 확인 중', currentWork.material || '재료 확인 중', currentWork.size || '크기 확인 중'].join('　·　');
  dialog.querySelector('.detail-caption').textContent = currentWork.caption || '작품 캡션 준비 중';
  dialog.querySelector('.detail-copy').textContent = currentWork.note || '작가 노트 준비 중';
  renderDetailMedia();
  dialog.showModal();
});

dialog.querySelectorAll('[data-media-step]').forEach(button => button.addEventListener('click', () => {
  const count = workMedia(currentWork).length;
  if (count > 1) { currentMedia = (currentMedia + Number(button.dataset.mediaStep) + count) % count; renderDetailMedia(); }
}));
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
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

