(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', context => {
    document.documentElement.classList.add('gsap-motion');
    const removers = [];
    const on = (element, type, handler) => {
      if (!element) return;
      element.addEventListener(type, handler);
      removers.push(() => element.removeEventListener(type, handler));
    };
    gsap.timeline({ defaults: { ease: 'power2.out' } })
      .from('.cover-kicker', { autoAlpha: 0, y: 10, duration: .7 }, 0)
      .from('.cover-byline > *', { autoAlpha: 0, y: 12, stagger: .12, duration: .8 }, 2.15);

    const reveal = element => gsap.fromTo(element, { autoAlpha: 0, y: 24 }, {
      autoAlpha: 1, y: 0, duration: .85, ease: 'power2.out',
      scrollTrigger: { trigger: element, start: 'top 92%', once: true },
      clearProps: 'opacity,visibility,transform'
    });
    document.querySelectorAll('.reveal:not(.work-card)').forEach(reveal);

    let gridTriggers = [];
    const grid = document.getElementById('work-grid');
    const revealCards = context.add('revealCards', () => {
      gridTriggers.forEach(trigger => trigger.kill());
      const cards = gsap.utils.toArray('#work-grid .work-card');
      gsap.set(cards, { autoAlpha: 0, y: 20 });
      gridTriggers = ScrollTrigger.batch(cards, {
        start: 'top 96%', once: true, interval: .08,
        onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: .055,
          duration: .6, ease: 'power2.out', clearProps: 'opacity,visibility,transform' })
      });
      ScrollTrigger.refresh();
    });
    revealCards();
    const mutations = new MutationObserver(revealCards);
    mutations.observe(grid, { childList: true });

    context.add('hoverCard', (card, active) => {
      if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
      gsap.to(card.querySelector('.work-image'), { y: active ? -6 : 0,
        duration: active ? .35 : .5, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(card.querySelector('.work-title > span:last-child'), {
        x: active ? 3 : 0, y: active ? -3 : 0,
        duration: .3, ease: 'power2.out', overwrite: 'auto' });
    });
    on(grid, 'pointerover', event => {
      const card = event.target.closest('.work-card');
      if (card && !card.contains(event.relatedTarget)) context.hoverCard(card, true);
    });
    on(grid, 'pointerout', event => {
      const card = event.target.closest('.work-card');
      if (card && !card.contains(event.relatedTarget)) context.hoverCard(card, false);
    });
    context.add('dialogEnter', dialog => {
      if (dialog.open) gsap.fromTo(dialog, { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: .3, ease: 'power2.out', clearProps: 'opacity,transform' });
    });
    document.querySelectorAll('dialog').forEach(dialog => on(dialog, 'toggle', () => context.dialogEnter(dialog)));
    on(window, 'load', () => ScrollTrigger.refresh());
    return () => {
      removers.forEach(remove => remove());
      mutations.disconnect();
      gridTriggers.forEach(trigger => trigger.kill());
      document.documentElement.classList.remove('gsap-motion');
    };
  });
})();
