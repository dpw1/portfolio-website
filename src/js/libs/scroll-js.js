function __awaiter(e, o, n, t) {
  return new (n || (n = Promise))(function(i, l) {
    function r(e) {
      try {
        c(t.next(e));
      } catch (e) {
        l(e);
      }
    }
    function s(e) {
      try {
        c(t.throw(e));
      } catch (e) {
        l(e);
      }
    }
    function c(e) {
      e.done
        ? i(e.value)
        : new n(function(o) {
            o(e.value);
          }).then(r, s);
    }
    c((t = t.apply(e, o || [])).next());
  });
}
function scrollTo(e, o = {}) {
  return __awaiter(this, void 0, void 0, function*() {
    if (!(e instanceof Element || e instanceof Window))
      throw new Error(
        `element passed to scrollTo() must be either the window or a DOM element, you passed ${e}!`
      );
    o = sanitizeScrollOptions(o);
    const n = (o, t, i, l, r = 300, s, c) => {
        window.requestAnimationFrame(() => {
          const a = Date.now(),
            u = Math.min(1, (a - l) / r);
          if (o === t) return c ? c() : null;
          setScrollPosition(e, s(u) * (t - o) + o),
            u < 1 ? n(o, t, i, l, r, s, c) : c && c();
        });
      },
      t = getScrollPosition(e),
      i = getScrollPropertyByElement(e);
    return new Promise(e => {
      n(
        t,
        "number" == typeof o.top ? o.top : t,
        i,
        Date.now(),
        o.duration,
        getEasing(o.easing),
        e
      );
    });
  });
}
function scrollIntoView(e, o, n) {
  validateElement(e), !o || o instanceof Element || ((n = o), (o = void 0));
  const { duration: t, easing: i } = sanitizeScrollOptions(n);
  o = o || utils.getDocument().body;
  let l = 0,
    r = e ? e.offsetTop : 0;
  const s = utils.getDocument();
  return (
    (o !== s.body && o !== s.documentElement) ||
      ((l = window.pageYOffset), (r = e.getBoundingClientRect().top + l)),
    scrollTo(o, { top: r, left: 0, duration: t, easing: i })
  );
}
function validateElement(e) {
  if (void 0 === e) {
    throw new Error("The element passed to scrollIntoView() was undefined.");
  }
  if (!(e instanceof HTMLElement))
    throw new Error(
      `The element passed to scrollIntoView() must be a valid element. You passed ${e}.`
    );
}
function getScrollPropertyByElement(e) {
  const o = {
    window: { y: "scrollY", x: "scrollX" },
    element: { y: "scrollTop", x: "scrollLeft" }
  };
  return e instanceof Window ? o.window.y : o.element.y;
}
function sanitizeScrollOptions(e = {}) {
  return (
    "smooth" === e.behavior && ((e.easing = "ease-in-out"), (e.duration = 300)),
    "auto" === e.behavior && ((e.duration = 0), (e.easing = "linear")),
    e
  );
}
function getScrollPosition(e) {
  const o = utils.getDocument();
  return e === o.body || e === o.documentElement || e instanceof Window
    ? o.body.scrollTop || o.documentElement.scrollTop
    : e.scrollTop;
}
function setScrollPosition(e, o) {
  const n = utils.getDocument();
  e === n.body || e === n.documentElement || e instanceof Window
    ? ((n.body.scrollTop = o), (n.documentElement.scrollTop = o))
    : (e.scrollTop = o);
}
const utils = { getDocument: () => document },
  easingMap = {
    linear: e => e,
    "ease-in": e => e * e,
    "ease-out": e => e * (2 - e),
    "ease-in-out": e => (e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1)
  },
  getEasing = e => {
    const o = easingMap[e || "linear"];
    if (!o) {
      const o = Object.keys(easingMap).join(",");
      throw new Error(
        `Scroll error: scroller does not support an easing option of "${e}". Supported options are ${o}`
      );
    }
    return o;
  };
export { scrollTo, scrollIntoView, utils, easingMap };
