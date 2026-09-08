/* ==========================================================================
   PORTFOLIO AI ASSISTANT — keyword-matched, fully local.
   Reads window.PORTFOLIO_KB (data/portfolio-data.js). No network calls.
   ========================================================================== */
(function () {
  const panel = document.getElementById('aiPanel');
  const btn   = document.getElementById('aiBtn');
  const body  = document.getElementById('aicBody');
  const form  = document.getElementById('aicForm');
  const input = document.getElementById('aicInput');
  const send  = document.getElementById('aicSend');
  const KB    = window.PORTFOLIO_KB;
  if (!panel || !btn || !body || !form || !input || !KB) return;

  let opened = false;

  const scroll = () => { body.scrollTop = body.scrollHeight; };

  const bubble = (html, who) => {
    const el = document.createElement('div');
    el.className = `aic__msg aic__msg--${who}`;
    el.innerHTML = html;
    body.appendChild(el);
    scroll();
    return el;
  };

  const chips = (list) => {
    const wrap = document.createElement('div');
    wrap.className = 'aic__chips';
    list.forEach((c) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'aic__chip'; b.textContent = c;
      b.addEventListener('click', () => ask(c));
      wrap.appendChild(b);
    });
    body.appendChild(wrap);
    scroll();
  };

  const answer = (q) => {
    const t = q.toLowerCase();
    let best = null, score = 0;
    for (const topic of KB.topics) {
      let s = 0;
      for (const k of topic.keys) if (t.includes(k)) s += k.length;
      if (s > score) { score = s; best = topic; }
    }
    return best ? best.answer : KB.fallback;
  };

  const ask = (q) => {
    q = q.trim();
    if (!q) return;
    bubble(q.replace(/</g, '&lt;'), 'me');
    input.value = '';
    send.disabled = true;
    autosize();

    const typing = document.createElement('div');
    typing.className = 'aic__typing';
    typing.innerHTML = '<i></i><i></i><i></i>';
    body.appendChild(typing);
    scroll();

    setTimeout(() => {
      typing.remove();
      bubble(answer(q), 'bot');
    }, 420 + Math.min(600, q.length * 12));
  };

  const open = () => {
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('lock');
    if (!opened) {
      opened = true;
      bubble(KB.greeting, 'bot');
      chips(KB.chips);
    }
    setTimeout(() => input.focus(), 60);
  };

  const close = () => {
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('lock');
    btn.focus();
  };

  const autosize = () => {
    input.style.height = 'auto';
    input.style.height = Math.min(110, input.scrollHeight) + 'px';
  };

  btn.addEventListener('click', open);
  panel.addEventListener('click', (e) => { if (e.target.closest('[data-ai-close]')) close(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });

  input.addEventListener('input', () => { send.disabled = !input.value.trim(); autosize(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(input.value); }
  });
  form.addEventListener('submit', (e) => { e.preventDefault(); ask(input.value); });
})();
