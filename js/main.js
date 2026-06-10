/* ===== Contact Configuration ===== */
const CONTACT = {
  phone: "+962791122511",
  whatsapp: "962792810675",
  waMsg: "مرحباً، أود الاستفسار عن فلاتر المياه — مدار لتكنولوجيا المياه"
};

/* ===== Wire up all contact CTAs ===== */
(function initContact() {
  const telHref = "tel:" + CONTACT.phone.replace(/\s/g, "");

  document.querySelectorAll("[data-call]").forEach(function (a) {
    a.setAttribute("href", telHref);
  });

  document.querySelectorAll("[data-wa]").forEach(function (a) {
    var product = a.getAttribute("data-product");
    var msg = product
      ? "مرحباً، أود الاستفسار عن " + product + " — مدار لتكنولوجيا المياه"
      : CONTACT.waMsg;
    var href =
      "https://wa.me/" +
      CONTACT.whatsapp.replace(/[^0-9]/g, "") +
      "?text=" +
      encodeURIComponent(msg);
    a.setAttribute("href", href);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });
})();

/* ===== Header shadow on scroll ===== */
(function initHeader() {
  var hdr = document.getElementById("hdr");
  if (!hdr) return;
  function onScroll() {
    hdr.classList.toggle("scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

/* ===== Reveal on scroll (IntersectionObserver) ===== */
(function initReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("in");
    });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    io.observe(el);
  });
})();

/* ===== Rising water bubbles in hero ===== */
(function initBubbles() {
  var host = document.getElementById("heroBubbles");
  if (!host) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var N = 16;
  for (var i = 0; i < N; i++) {
    var b = document.createElement("span");
    b.className = "bubble";
    var size = 6 + Math.random() * 22;
    b.style.width = size + "px";
    b.style.height = size + "px";
    b.style.left = Math.random() * 100 + "%";
    b.style.animationDuration = 9 + Math.random() * 10 + "s";
    b.style.animationDelay = -Math.random() * 16 + "s";
    host.appendChild(b);
  }
})();
