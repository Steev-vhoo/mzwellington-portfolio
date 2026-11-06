(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // Header shadow + back-to-top
  const header = $("#header");
  const toTop = $("#to-top");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 10);
    toTop.classList.toggle("show", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = $("#burger");
  const nav = $("#nav");
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  // Active nav link on scroll
  const links = $$(".nav__link");
  const sections = links.map((l) => $(l.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  // Typed roles
  const roles = ["Growth Marketer", "Digital Marketer", "Data Analyst", "Biostatistician", "SEO Strategist", "Content Strategist"];
  const typed = $("#typed");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typed && !reduce) {
    let r = 0, i = roles[0].length, deleting = true;
    const tick = () => {
      const word = roles[r];
      i += deleting ? -1 : 1;
      typed.textContent = word.slice(0, i);
      let delay = deleting ? 45 : 85;
      if (!deleting && i === word.length) { deleting = true; delay = 1800; }
      else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 300; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 2200);
  }

  // Reveal on scroll + skill bars + counters
  const countUp = (el) => {
    const target = +el.dataset.count;
    const dur = 1400, start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$(".bars", en.target).forEach((b) => b.classList.add("in"));
        $$("[data-count]", en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    },
    { threshold: 0.15 }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  // Portfolio filter
  const filters = $$(".filter");
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filters.forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });
      $$(".project").forEach((p) => {
        const show = f === "all" || p.dataset.cat === f;
        p.classList.toggle("hide", !show);
        if (show) p.classList.add("in");
      });
    })
  );

  // Intro video (plays with sound on click, inside the blob frame)
  const video = $("#intro-video");
  const playBtn = $("#play-btn");
  if (video && playBtn) {
    const wrap = video.closest(".about__video");
    const toggle = () => (video.paused ? video.play() : video.pause());
    playBtn.addEventListener("click", toggle);
    video.addEventListener("click", toggle);
    video.addEventListener("play", () => {
      wrap.classList.add("playing");
      playBtn.setAttribute("aria-label", "Pause video introduction");
    });
    const stopped = () => {
      wrap.classList.remove("playing");
      playBtn.setAttribute("aria-label", "Play my video introduction");
    };
    video.addEventListener("pause", stopped);
    video.addEventListener("ended", stopped);
  }

  // Contact form
  // By default this opens the visitor's email app with the message pre-filled.
  // To receive messages without email apps, create a free form at https://formspree.io
  // and paste its endpoint below (e.g. "https://formspree.io/f/abcdwxyz").
  const FORM_ENDPOINT = "";
  const CONTACT_EMAIL = "hello@mzwellington.com";

  const form = $("#contact-form");
  const status = $("#form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";
    let valid = true;
    $$("[required]", form).forEach((f) => {
      const ok = f.value.trim() && (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
      f.closest(".field").classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      status.textContent = "Please fill in your name, a valid email and a message.";
      status.classList.add("err");
      return;
    }
    const data = Object.fromEntries(new FormData(form));

    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error();
        form.reset();
        status.textContent = "Thank you! Your message has been sent.";
        status.classList.add("ok");
      } catch {
        status.textContent = "Something went wrong. Please email me directly at " + CONTACT_EMAIL + ".";
        status.classList.add("err");
      }
      return;
    }

    const subject = encodeURIComponent(`New enquiry: ${data.service} — ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    status.textContent = "Opening your email app…";
    status.classList.add("ok");
  });

  $("#year").textContent = new Date().getFullYear();
})();
