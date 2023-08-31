function t_animationSBS__checkVisibilityPage() {
    "visible" === document.visibilityState && (t_animationSBS__onReady(t_animationSBS__init), document.removeEventListener("visibilitychange", t_animationSBS__checkVisibilityPage));
}
function t_animationSBS__onReady(t) {
    "loading" !== document.readyState ? t() : document.addEventListener("DOMContentLoaded", t);
}
function t_animationSBS__init() {
    var t = document.getElementById("allrecords"),
        e = (e = t ? "edit" === t.getAttribute("data-tilda-mode") : null) || Boolean(document.getElementById("for_redactor_toolbar"));
    /Bot/i.test(navigator.userAgent) ||
        document.documentMode < 11 ||
        e ||
        (document.querySelector('[data-animate-sbs-event="scroll"]') && (t.style.overflowX = "hidden"),
        t_animationSBS__isZeroBlocksRendered(function () {
            t_animationSBS_isInstagramRendered(function () {
                t_animationSBS__wrapAndUpdateEls(Array.prototype.slice.call(document.querySelectorAll("[data-animate-sbs-event]"))), t_animationSBS__initAllRes(e);
            });
        }));
}
function t_animationSBS__isZeroBlocksRendered(e) {
    var n,
        i,
        a = t_animationSBS__getArtboards("396");
    (a = a.length ? a : t_animationSBS__getArtboards("121")).length &&
        ((n = !1),
        a.every(function (t) {
            return t.classList.contains("rendered");
        })
            ? e()
            : document.querySelectorAll('script[src*="tilda-blocks-2"], script[src*="tilda-blocks-1"]').length
            ? t_animationSBS__backwardCompatibilityWait(a, Date.now(), e)
            : ((i = a.filter(function (t) {
                  return t.classList.contains("rendered");
              })),
              a.forEach(function (t) {
                  t.classList.contains("rendered") ||
                      t.addEventListener("artBoardRendered", function () {
                          i.push(t), i.length !== a.length || n || e();
                      });
              }),
              setTimeout(function () {
                  (n = !0), i.length !== a.length && e();
              }, 3e3)));
}
function t_animationSBS__getArtboards(t) {
    return Array.prototype.slice.call(document.querySelectorAll('.r[data-record-type="' + t + '"]:not(.t397__off):not(.t395__off):not(.t400__off) .t396__artboard'));
}
function t_animationSBS__backwardCompatibilityWait(t, e, n) {
    t.every(function (t) {
        return t.classList.contains("rendered");
    })
        ? n()
        : 1e4 < Date.now() - e
        ? console.warn("all zero-blocks can't be rendered")
        : setTimeout(function () {
              t_animationSBS__backwardCompatibilityWait(t, e, n);
          }, 500);
}
function t_animationSBS_isInstagramRendered(t) {
    var e;
    window.animationSBS__isIOS && -1 !== navigator.userAgent.indexOf("Instagram")
        ? (e = setTimeout(function () {
              window.innerWidth !== screen.width && window.innerHeight > window.innerWidth ? t_animationSBS_isInstagramRendered(t) : (clearTimeout(e), t());
          }, 100))
        : t();
}
function t_animationSBS__wrapAndUpdateEls(t) {
    var o = -1 !== navigator.userAgent.indexOf("Chrome");
    t.forEach(function (t) {
        var e,
            n,
            i,
            a,
            r = t.querySelector(".tn-atom");
        r &&
            (-1 === navigator.userAgent.indexOf("Chrome") && ((r.style.WebkitBackfaceVisibility = "hidden"), (r.style.backfaceVisibility = "hidden")),
            (e = r.closest(".tn-atom__sbs-anim-wrapper")),
            (n = t_animationSBS__getAnimOptions(t, "published", null)),
            !e &&
                n &&
                ((n = r.closest(".tn-atom__scale-wrapper")),
                (i = t.style.transform) &&
                    -1 !== i.indexOf("matrix(") &&
                    (t_animationSBS__wrapEl(n || r, "tn-atom__sbs-transform-wrapper"), ((a = t.querySelector(".tn-atom__sbs-transform-wrapper")).style.transform = i), (t.style.transform = "")),
                t_animationSBS__wrapEl((a = t.querySelector(".tn-atom__sbs-transform-wrapper")) || n || r, "tn-atom__sbs-anim-wrapper"),
                (e = (r = t.querySelector(".tn-atom")).closest(".tn-atom__sbs-anim-wrapper")),
                t_animationSBS__updateStylesAfterWrapping(t, a || e, o)));
    });
}
function t_animationSBS__wrapAndUpdateElOnResize(t) {
    !t.length ||
        ((t = t.filter(function (t) {
            return !t.querySelector(".tn-atom__sbs-anim-wrapper");
        })).length &&
            t_animationSBS__wrapAndUpdateEls(t));
}
function t_animationSBS__updateStylesAfterWrapping(e, n, i) {
    var t = e.getAttribute("data-elem-type"),
        a = getComputedStyle(e),
        r = a.getPropertyValue("border-radius"),
        t = (("shape" !== t && "button" !== t) || !parseInt(r, 10) || (n.style.borderRadius = r), ["filter", "backdrop-filter"]),
        o =
            ((t = (t = t.map(function (t) {
                var e = "-webkit-" + t,
                    n = a.getPropertyValue(t);
                if ("none" !== (n = "none" !== n && "" !== n ? n : a.getPropertyValue(e)) && "" !== n) return { filter: t, webkitFilter: e, value: n };
            })).filter(function (t) {
                return t;
            })),
            e.querySelector(".tn-atom")),
        s = getComputedStyle(o).transform,
        r =
            (t.forEach(function (t) {
                window.t_animationSBS__isFirefox && (n.style.backfaceVisibility = "visible"),
                    (n.style[t.webkitFilter] = t.value),
                    (n.style[t.filter] = t.value),
                    (e.style[t.webkitFilter] = "none"),
                    (e.style[t.filter] = "none"),
                    i && "backdrop-filter" === t.filter && ((o.style[t.webkitFilter] = "inherit"), (o.style[t.filter] = "inherit")),
                    "none" === s && (o.style.transform = "translateZ(0)");
            }),
            t.some(function (t) {
                return "backdrop-filter" === t.filter;
            }));
    i && r && t_animationSBS__chromeFixBackdropFilter(o, n);
}
function t_animationSBS__chromeFixBackdropFilter(t, e) {
    var n = getComputedStyle(t),
        i = n.getPropertyValue("background-color"),
        a = n.getPropertyValue("opacity"),
        n = n.getPropertyValue("box-shadow");
    "rgba(0, 0, 0, 0)" !== i &&
        "1" !== a &&
        ((i = i.substring(i.indexOf("(") + 1, i.indexOf(")"))),
        (n = t_animationSBS__processBoxShadowRGB(n, a)) && ((e.style.boxShadow = n), (t.style.boxShadow = "none")),
        (e.style.backgroundColor = "rgba(" + i + "," + a + ")"),
        (t.style.opacity = "1"),
        (t.style.backgroundColor = "transparent"));
}
function t_animationSBS__processBoxShadowRGB(t, e) {
    if (!t) return !1;
    if ((-1 === t.indexOf("rgba") && -1 === t.indexOf("rgb")) || "1" === e) return !1;
    var n = t.substring(t.indexOf("(") + 1, t.indexOf(")")),
        i = n.split(", "),
        e = (3 === i.length ? i.push(e) : (i[3] *= e), t.replace(n, i.join(", ")));
    return (e = -1 !== e.indexOf("rgb(") ? e.replace("rgb(", "rgba(") : e);
}
function t_animationSBS__initAllRes(t) {
    var e,
        n,
        i,
        a = { elements: Array.prototype.slice.call(document.querySelectorAll("[data-animate-sbs-event]")), scrollTop: window.pageYOffset, isEditMode: t, clickedTriggerEls: [], hoverTriggerEls: [] };
    function r() {
        clearTimeout(n),
            (n = setTimeout(function () {
                var t = Array.prototype.slice.call(document.querySelectorAll("[data-animate-sbs-event]"));
                t_animationSBS__updateAnimatedObjectState(a, "elements", t),
                    t_animationSBS__wrapAndUpdateElOnResize(a.elements),
                    t_animationSBS__cacheAndSetData(a),
                    t_animationSBS__triggerScrollAnim(a),
                    (e = t_animationSBS__getAnimElsOnView(a.elements)),
                    t_animationSBS__triggerNoScrollAnimation(a, e),
                    t_animationSBS__generateKeyframes(a);
            }, 500));
    }
    a.elements.length &&
        (t_animationSBS__cacheAndSetData(a),
        t_animationSBS__generateKeyframes(a),
        (t = !!(t = document.getElementById("allrecords")) && "yes" === t.getAttribute("data-tilda-lazy")),
        ("y" !== window.lazy && !t) ||
            t_onFuncLoad("t_lazyload_update", function () {
                t_lazyload_update();
            }),
        (e = t_animationSBS__getAnimElsOnView(a.elements)),
        (t = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
        "ResizeObserver" in window
            ? t_animationSBS__createResizeObserver({ breakpoints: (i = t_animationSBS__getAllBreakpoints()), currentRes: t_animationSBS__getCurrentRes(i, t), isMobile: t }, r)
            : t
            ? window.addEventListener("orientationchange", function () {
                  setTimeout(function () {
                      r();
                  }, 300);
              })
            : window.addEventListener("resize", r),
        (i = document.querySelectorAll(".t396")),
        Array.prototype.forEach.call(i, function (t) {
            t.addEventListener("displayChanged", r);
        }),
        window.t_animationSBS__isSafari &&
            window.addEventListener("scroll", function t() {
                0 !== window.pageYOffset && r();
                window.removeEventListener("scroll", t);
            }),
        t_animationSBS__triggerNoScrollAnimation(a, e),
        document.querySelectorAll('[data-animate-sbs-event="scroll"]').length && (t_animationSBS__triggerScrollAnim(a), t_animationSBS__checkFrame(a)),
        window.addEventListener("load", function () {
            t_animationSBS__changeElValues(a);
        }),
        setTimeout(function () {
            "complete" !== document.readyState && t_animationSBS__changeElValues(a);
        }, 3e3));
}
function t_animationSBS__getAnimElsOnView(t) {
    return t.filter(function (t) {
        var e = "data-animate-sbs-event";
        return "intoview" === t.getAttribute(e) || "blockintoview" === t.getAttribute(e);
    });
}
function t_animationSBS__getAllBreakpoints() {
    var t = Array.prototype.slice.call(document.querySelectorAll(".r .t396__artboard")),
        n = [];
    return (
        t.forEach(function (t) {
            var t = t_animationSBS__getResOpts(t),
                e = t.breakpoints.filter(function (t) {
                    return -1 === n.indexOf(t);
                });
            -1 === (n = n.concat(e)).indexOf(t.resMax) && n.push(t.resMax);
        }),
        n.sort(function (t, e) {
            return e - t;
        })
    );
}
function t_animationSBS__getCurrentRes(t, e) {
    var n = e || ("ontouchend" in document && -1 !== navigator.userAgent.indexOf("AppleWebKit")) ? document.documentElement.clientWidth : window.innerWidth;
    return t.find(function (t) {
        return t < n;
    });
}
function t_animationSBS__updateAnimatedObjectState(t, e, n) {
    t[e] = n;
}
function t_animationSBS__setKeyForAnimatedObject(t, e, n) {
    t[e] || t_animationSBS__updateAnimatedObjectState(t, e, n);
}
function t_animationSBS__createResizeObserver(n, i) {
    var a = document.body.getClientRects(),
        r = a[0].height;
    new ResizeObserver(function (t) {
        t.forEach(function (t) {
            var e;
            document.body.classList.contains("t-body_scroll-locked") || ((e = t_animationSBS__getCurrentRes(n.breakpoints, n.isMobile)), (t.contentRect.height === r && n.currentRes === e) || ((n.currentRes = e), (r = a[0].height), i()));
        });
    }).observe(document.body);
}
function t_animationSBS__changeElValues(e) {
    e.elements.forEach(function (t) {
        t_animationSBS__setAndCacheElTopPos(t, e), "scroll" === t.animType && t_animationSBS__updateStepsValues(t);
    });
}
function t_animationSBS__checkFrame(t) {
    "function" == typeof window.requestAnimationFrame &&
        (t_animationSBS__checkPosChanges(t) && t_animationSBS__triggerScrollAnim(t),
        requestAnimationFrame(function () {
            t_animationSBS__checkFrame(t);
        }));
}
function t_animationSBS__checkPosChanges(t) {
    var e = t.scrollTop,
        n = window.pageYOffset;
    return t_animationSBS__updateAnimatedObjectState(t, "scrollTop", (n = n < 0 && window.t_animationSBS__isSafari ? 0 : n)), e !== n;
}
function t_animationSBS__triggerScrollAnim(n) {
    n.elements.forEach(function (t) {
        var e;
        "scroll" === t.animType &&
            (t_animationSBS__scrollAnimationCheckSteps(n, t, (e = { opacity: 1, blur: 0, fix: !1, fixedShiftY: 0, translateX: 0, translateY: 0, scaleX: 1, scaleY: 1, rotate: 0 })), t_animationSBS__scrollAnimationUpdateTransform(t, e));
    });
}
function t_animationSBS__scrollAnimationCheckSteps(s, l, _) {
    l.steps.forEach(function (t, e) {
        var n = s.scrollTop + l.triggerOffset,
            i = (l.scaledDifference && (n += l.scaledDifference), n >= t.start),
            a = n < t.start,
            r = t.end <= n,
            o = t.end > n;
        i &&
            o &&
            ((t.state = "started"),
            l.wrapperEl && (l.wrapperEl.style.willChange = "transform"),
            (i = n - t.start),
            (o = 0 === t.dist ? 1 : i / t.dist),
            (_.prevUnfixedDist = t.prevUnfixedDist),
            t_animationSBS__scrollAnimationCalcStepStyles(_, t, o, e)),
            r && ((t.state = "finished"), l.wrapperEl && (l.wrapperEl.style.willChange = ""), t_animationSBS__scrollAnimationCalcStepStyles(_, t, 1, e)),
            !a || ("started" !== t.state && "finished" !== t.state) || ((t.state = "unactive"), l.wrapperEl && (l.wrapperEl.style.willChange = ""), t_animationSBS__scrollAnimationCalcStepStyles(_, t, 0, e));
    }),
        l.classList.remove("t396__elem--anim-hidden"),
        l.steps[1] && 0 === l.steps[1].dist && 0 === l.steps[1].styles.opacity && "unactive" === l.steps[1].state && (_.opacity = 0);
}
function t_animationSBS__scrollAnimationCalcStepStyles(t, e, n, i) {
    if ((!0 === e.styles.fix && "started" === e.state && ((t.fix = !0), (t.fixedShiftY = 0)), !0 === e.styles.fix && "finished" === e.state && ((t.fix = !1), (t.fixedShiftY += e.dist)), !0 === e.styles.fix && "unactive" === e.state)) {
        if (0 < i && !0 === t.fix) return;
        t.fix = !1;
    }
    (t.opacity += n * (e.styles.opacity - t.opacity)),
        (t.blur += n * (e.styles.blur - t.blur)),
        (t.translateX += n * e.styles.moveX),
        (t.translateY += n * e.styles.moveY),
        (t.scaleX += n * (e.styles.scaleX - t.scaleX)),
        (t.scaleY += n * (e.styles.scaleY - t.scaleY)),
        (t.rotate += n * e.styles.rotate);
}
function t_animationSBS__scrollAnimationUpdateTransform(t, e) {
    var n, i, a;
    t.wrapperEl &&
        ((n = t_animationSBS__getZoom(t)),
        (a = getComputedStyle(t).willChange),
        window.t_animationSBS__isOnlyScalable && (n = 1 / n),
        !0 === e.fix &&
            "fixed" !== t.wrapperEl.style.position &&
            ((i = t.triggerOffset - e.prevUnfixedDist),
            window.t_animationSBS__isOnlyScalable || (i /= n),
            (t.wrapperEl.style.top = i + (t.scaledDifference || 0) + "px"),
            (t.wrapperEl.style.position = "fixed"),
            a && "auto" !== a && (t.style.willChange = "unset"),
            t.zIndex && (t.wrapperEl.style.zIndex = t.zIndex)),
        !1 === e.fix && "fixed" === t.wrapperEl.style.position && ((t.wrapperEl.style.position = ""), (t.wrapperEl.style.top = ""), (t.wrapperEl.style.zIndex = ""), t.zIndex && (t.style.zIndex = t.zIndex), (t.style.willChange = "")),
        (t.wrapperEl.style.opacity = e.opacity.toString()),
        (i = ""),
        e.translateX && ((a = e.translateX), window.t_animationSBS__isOnlyScalable && (a /= n), (i += "translateX(" + a + "px)")),
        (0 === e.translateY && 0 === e.fixedShiftY) || ((a = e.translateY + e.fixedShiftY), window.t_animationSBS__isOnlyScalable || (a /= n), (i += "translateY(" + a + "px)")),
        (1 === e.scaleX && 1 === e.scaleY) || (i += "scale(" + e.scaleX + "," + e.scaleY + ")"),
        0 !== e.rotate && (i += "rotate(" + e.rotate + "deg)"),
        (t.wrapperEl.style.transform = i || "scale(1)"));
}
function t_animationSBS__generateKeyframes(t) {
    var a = "";
    if (
        (t.elements.forEach(function (t) {
            var e, n, i;
            "scroll" !== t.animType &&
                ((e = { timeDuration: 0 }),
                (n = []),
                (i = t_animationSBS__createEmptyStyleOptionsForKeyframes(t.steps)),
                t_animationSBS__generateKeyframes__combineObjects(t.steps, n, e, i),
                t_animationSBS__generateKeyframes__correctFrames(n),
                t_animationSBS__generateKeyframes__countPercent(n, e),
                t_animationSBS__generateKeyframes__correctOpacityOnFirstStep(t, n),
                (i = t_animationSBS__generateKeyframes__getTxtStyles(t, n)),
                (e.timeDuration /= 1e3),
                i &&
                    ((a += t_animationSBS__generateKeyframes__getFinalCss(t, e, i)),
                    ("hover" !== t.animType && "click" !== t.animType) || (t.loop && "loopwithreverse" !== t.loop) || (a += t_animationSBS__generateKeyframes__getReverseAnim(t))));
        }),
        a)
    ) {
        if (t.isEditMode) return a;
        t = document.querySelector(".sbs-anim-keyframes");
        t ? t.textContent !== a && (t.textContent = a) : ((t = document.createElement("style")).classList.add("sbs-anim-keyframes"), (t.textContent = a), document.head.insertAdjacentElement("beforeend", t));
    }
}
function t_animationSBS__createEmptyStyleOptionsForKeyframes(t) {
    return {
        moveX: t.every(function (t) {
            return 0 === t.styles.moveX;
        }),
        moveY: t.every(function (t) {
            return 0 === t.styles.moveY;
        }),
        scaleX: t.every(function (t) {
            return 1 === t.styles.scaleX;
        }),
        scaleY: t.every(function (t) {
            return 1 === t.styles.scaleY;
        }),
        rotate: t.every(function (t) {
            return 0 === t.styles.rotate;
        }),
        blur: t.every(function (t) {
            return 0 === t.styles.blur;
        }),
        opacity: t.every(function (t) {
            return 1 === t.styles.opacity;
        }),
        fix: t.every(function (t) {
            return !1 === t.styles.fix;
        }),
    };
}
function t_animationSBS__generateKeyframes__combineObjects(a, r, o, s) {
    a.forEach(function (t, e) {
        var n,
            i = {};
        for (n in ((i.styles = t.styles), s)) s[n] && delete i.styles[n];
        "{}" !== JSON.stringify(i.styles) && ((i.time = +t.time || 0), e !== a.length - 1 && (i.ease = a[e + 1].ease), r.push(i), (o.timeDuration += i.time));
    });
}
function t_animationSBS__generateKeyframes__correctFrames(s) {
    s.forEach(function (t, e) {
        var n,
            i = e === s.length - 1,
            a = 0 === e,
            r = i ? null : s[e + 1],
            o = a ? null : s[e - 1];
        for (n in t.styles)
            a || n in o.styles || t_animationSBS__generateKeyframes__addStyleToKeyframe(t, o, n, 0),
                i || (n in r.styles ? ("moveX" !== n && "moveY" !== n && "rotate" !== n) || t_animationSBS__generateKeyframes__recalculateValue(t, r, n) : t_animationSBS__generateKeyframes__addStyleToKeyframe(t, r, n, 1));
    });
}
function t_animationSBS__generateKeyframes__addStyleToKeyframe(t, e, n, i) {
    ("blur" !== n && "rotate" !== n && "moveX" !== n && "moveY" !== n) || (e.styles[n] = 0 === i ? 0 : t.styles[n]), ("opacity" !== n && "scaleX" !== n && "scaleY" !== n) || (e.styles[n] = 0 === i ? 1 : t.styles[n]);
}
function t_animationSBS__generateKeyframes__recalculateValue(t, e, n) {
    switch (n) {
        case "rotate":
            e.styles.rotate += t.styles.rotate;
            break;
        case "moveX":
            e.styles.moveX += t.styles.moveX;
            break;
        case "moveY":
            e.styles.moveY += t.styles.moveY;
    }
}
function t_animationSBS__generateKeyframes__countPercent(t, e) {
    for (var n = 0; n < t.length; n++) {
        var i,
            a = t[n];
        if (0 === n) 0 === e.timeDuration ? (a.percent = 0) : ((i = ((100 * a.time) / e.timeDuration).toFixed(2)), (a.percent = parseInt(i, 10)));
        else if (n === t.length - 1) a.percent = 100;
        else {
            var r = t[n - 1].percent;
            if (0 === e.timeDuration) a.percent = 0;
            else {
                if (((i = ((100 * a.time) / e.timeDuration + r).toFixed(2)), 100 === parseInt(i, 10) && n === t.length - 2 && 0 !== n)) continue;
                a.percent = parseInt(i, 10);
            }
            a.percent === r && (a.percent += 1), 100 < a.percent && (a.percent = 99);
        }
    }
}
function t_animationSBS__generateKeyframes__correctOpacityOnFirstStep(t, e) {
    var n = e[1];
    t && t.classList.remove("t396__elem--anim-hidden"), n && 0 === n.time && 0 === n.styles.opacity && ((n = t ? t.querySelector(".tn-atom__sbs-anim-wrapper") : null) && (n.style.opacity = "0"), (e[0].styles.opacity = 0));
}
function t_animationSBS__generateKeyframes__getTxtStyles(e, t) {
    var n = "";
    return (
        t.forEach(function (t) {
            t.changes || (t.changes = t_animationSBS__generateKeyframes__getFrameChanges(e, t)), (n += "number" == typeof t.percent ? t.percent + "% {" + t.changes + "}\n" : "");
        }),
        n
    );
}
function t_animationSBS__generateKeyframes__getFrameChanges(t, e) {
    var n,
        i = "",
        a = "",
        r = { x: 1, y: 1, changed: !1 },
        o = window.t_animationSBS__isOnlyScalable ? t_animationSBS__getZoom(t) : 1;
    for (n in e.styles)
        switch (n) {
            case "opacity":
                i += "opacity:" + e.styles.opacity + ";";
                break;
            case "scaleX":
                (r.x = e.styles.scaleX), (r.changed = !0);
                break;
            case "scaleY":
                (r.y = e.styles.scaleY), (r.changed = !0);
                break;
            case "moveX":
                a += "translateX(" + e.styles.moveX * o + "px)";
                break;
            case "moveY":
                a += "translateY(" + e.styles.moveY * o + "px)";
                break;
            case "rotate":
                a += "rotate(" + e.styles.rotate + "deg)";
        }
    if ((!0 === r.changed && (a += "scale(" + r.x + "," + r.y + ")"), "" !== a && (i += "transform:" + a + ";"), void 0 !== e.ease))
        switch (((i += "animation-timing-function:"), e.ease)) {
            case "easeIn":
                i += "ease-in;";
                break;
            case "easeOut":
                i += "ease-out;";
                break;
            case "easeInOut":
                i += "ease-in-out;";
                break;
            case "bounceFin":
                i += "cubic-bezier(0.34,1.61,0.7,1);";
                break;
            default:
                i += "" === e.ease.trim() ? "linear;" : e.ease + ";";
        }
    return i;
}
function t_animationSBS__generateKeyframes__getFinalCss(t, e, n) {
    var i = "",
        a = t.uniqueID,
        r = ".t-sbs-anim_started #" + t.uniqueID;
    "published" !== window.tildamode && (t.timeDuration = e.timeDuration);
    i += r + " {\nanimation: " + a + " " + (0 === e.timeDuration ? 1e-5 : e.timeDuration) + "s";
    r = t.loop && -1 !== t.loop.indexOf("loop");
    return r && (i += " infinite"), (i += " linear"), r ? "loopwithreverse" === t.loop && (i += " alternate") : (i += " forwards"), (i += ";\nbackface-visibility: hidden;\n}\n\n@keyframes " + a + " {\n" + n + "}\n\n");
}
function t_animationSBS__generateKeyframes__getReverseAnim(t) {
    var e = t.getAttribute("data-elem-id"),
        n = "";
    return (
        (n += "#" + (t.closest(".t-rec") ? t.closest(".t-rec").getAttribute("id") : "") + " ") +
        ('[data-elem-id="' + e + '"].t-sbs-anim_started.t-sbs-anim_reversed .tn-atom__sbs-anim-wrapper') +
        "{\n-webkit-animation-direction: reverse;\nanimation-direction: reverse;\n}\n\n"
    );
}
function t_animationSBS__getAnimOptions(e, t, n) {
    if (!e) return "";
    var i = ["sbs", "opts"],
        a = ((n = n || ("edit" === t ? i.join("") : i.join("-"))), "edit" === t ? "field" : "animate"),
        r = "edit" === t ? "-value" : "",
        i = "y" === e.getAttribute("edit" === t ? "data-field-animmobile-value" : "data-animate-mobile"),
        o = t_animationSBS__getResOpts(e.closest(".t396__artboard")),
        s = t_animationSBS__generateAttr(a, n, r, !1);
    if (o.res === o.resMax) return e.getAttribute(s);
    if (!i && "edit" !== t && o.res < 1200) return (e.style.transition = "none"), e.classList.remove("t396__elem--anim-hidden"), "";
    var i = t_animationSBS__generateAttr(a, n, r, o.res),
        l = e.getAttribute(i);
    return (
        l ||
        (o.breakpoints.forEach(function (t) {
            t <= o.res || l || ((t = t_animationSBS__generateAttr(a, n, r, t)), (l = e.getAttribute(t)));
        }),
        l || e.getAttribute(s) || "")
    );
}
function t_animationSBS__generateAttr(t, e, n, i) {
    t = "data-" + t + "-" + e;
    return i && (t += "-res-" + i), (t += n);
}
function t_animationSBS__getResOpts(t) {
    var e, n;
    if (!window.tn)
        return (
            (n = window.innerWidth),
            [1200, 960, 640, 480, 320].forEach(function (t) {
                e || (t <= n && (e = t));
            }),
            { res: e || 320, resMax: 1200, breakpoints: [320, 480, 640, 960] }
        );
    t = t ? t.getAttribute("data-artboard-recid") : "";
    return t && window.tn["ab" + t]
        ? { res: window.t396_detectResolution ? t396_detectResolution(t) : window.tn["ab" + t].curResolution, resMax: window.tn["ab" + t].curResolution_max, breakpoints: window.tn["ab" + t].screens.slice(0, -1) }
        : window.tn.screens
        ? { res: window.tn.curResolution, resMax: window.tn.topResolution, breakpoints: window.tn.screens.slice(0, -1) }
        : { res: window.tn.curResolution, resMax: 1200, breakpoints: [320, 480, 640, 960] };
}
function t_animationSBS__cacheAndSetData(n) {
    n.elements.forEach(function (i) {
        var t,
            a,
            r,
            e = i.closest(".t396__artboard");
        ("scroll" === i.animType && e && "fixed" === t396_ab__getFieldValue(e, "pos")) ||
            ((e = n.isEditMode ? "data-field-sbsevent-value" : "data-animate-sbs-event"),
            (i.animType = i.getAttribute(e)),
            (e = n.isEditMode ? "data-field-sbstrg-value" : "data-animate-sbs-trg"),
            (i.trigger = parseFloat(i.getAttribute(e))),
            isNaN(i.trigger) && (i.trigger = 1),
            (i.triggerElems = t_animationSBS__getAnimOptions(i, "published", "sbs-trgels")),
            (i.wrapperEl = i.querySelector(".tn-atom__sbs-anim-wrapper")),
            (e = t_animationSBS__getAnimOptions(i, n.isEditMode ? "edit" : "published", null)),
            (i.status = e ? "active" : "innactive"),
            "innactive" !== i.status &&
                (-1 !== e.indexOf("fixed") && (i.zIndex = getComputedStyle(i).getPropertyValue("z-index")),
                (e = e.replace(/'/g, '"')),
                t_animationSBS__addDelayToSteps((e = JSON.parse(e))),
                (t = n.isEditMode ? "data-field-sbsloop-value" : "data-animate-sbs-loop"),
                (i.loop = i.getAttribute(t) || ""),
                t_animationSBS__setAndCacheElTopPos(i, n),
                (a = t_animationSBS__getZoom(i)),
                (i.steps = []),
                (r = 0),
                e.forEach(function (t, e) {
                    var n = { state: "unactive" };
                    (n.styles = t_animationSBS__createStepStyles(t)),
                        "scroll" === i.animType
                            ? ((n.prevUnfixedDist = r), (n.dist = t.di * a), !1 === n.styles.fix && (r += n.dist), (n.start = 0 === e ? i.topOffset : i.steps[e - 1].end), (n.end = n.start + n.dist))
                            : ((n.time = t.ti), (n.ease = t.ea)),
                        i.steps.push(n);
                }),
                i.wrapperEl && !i.wrapperEl.id && t_animationSBS__generateUniqueIDForEl(i),
                t_animationSBS__updateInfoOnImgLoad(i, n),
                t_animationSBS__updateMoveAndRotateStepsStyles(i.steps)));
    });
    var t = n.elements.filter(function (t) {
        return (
            "innactive" === t.status &&
                (t.wrapperEl && t.wrapperEl.removeAttribute("style"), t.wrapperEl && (t.wrapperEl.style.display = "table"), t.wrapperEl && (t.wrapperEl.style.width = "inherit"), t.wrapperEl && (t.wrapperEl.style.height = "inherit")),
            "innactive" !== t.status
        );
    });
    t_animationSBS__updateAnimatedObjectState(n, "elements", t);
}
function t_animationSBS__generateUniqueIDForEl(t) {
    var e = t.closest(".r") ? t.closest(".r").id.replace("rec", "") : "",
        n = t.getAttribute("data-elem-id");
    (t.uniqueID = "sbs-" + e + "-" + n), (t.wrapperEl.id = t.uniqueID);
}
function t_animationSBS__updateInfoOnImgLoad(t, e) {
    var n = t.querySelector("img");
    n &&
        (n.addEventListener("load", function () {
            t_animationSBS__updateValuesAterIMGLoading(t, e);
        }),
        n.complete && t_animationSBS__updateValuesAterIMGLoading(t, e));
}
function t_animationSBS__updateValuesAterIMGLoading(t, e) {
    t_animationSBS__setAndCacheElTopPos(t, e), "scroll" === t.animType && t_animationSBS__updateStepsValues(t);
}
function t_animationSBS__updateStepsValues(n) {
    n.steps.forEach(function (t, e) {
        (t.start = 0 === e ? n.topOffset : n.steps[e - 1].end), (t.end = t.start + t.dist);
    });
}
function t_animationSBS__setAndCacheElTopPos(e, t) {
    var n,
        i = t_animationSBS__getZoom(e),
        a = ["scroll", "intoview", "blockintoview"].every(function (t) {
            return e.animType !== t;
        });
    t.isEditMode ||
        a ||
        ((t = parseInt(e.style.top, 10)),
        ("scroll" !== e.animType && "intoview" !== e.animType) || window.t_animationSBS__isOnlyScalable || (t *= i),
        (n = (a = e.closest(".r")) ? a.getBoundingClientRect().top + window.pageYOffset : 0),
        (a = (a && parseInt(a.style.paddingTop, 10)) || 0),
        (e.parentRecTopPos = n),
        (e.topOffset = n + t + a),
        (n = e.wrapperEl ? e.wrapperEl.getBoundingClientRect().height : 0),
        (t = Math.abs((n * i - n) / 2)),
        window.t_animationSBS__isOnlyScalable && e.wrapperEl && "fixed" !== window.getComputedStyle(e.wrapperEl).position && 0 < t && !e.scaledDifference && (e.scaledDifference = t),
        t_animationSBS__setTriggerOffset(e));
}
function t_animationSBS__addDelayToSteps(t) {
    for (var e = 0; e < t.length; e++) {
        var n,
            i = t[e];
        0 !== e && (parseInt(i.dd, 10) || parseInt(i.dt, 10)) && ((n = Object.create(t[e - 1])), void 0 !== i.dt ? (n.ti = i.dt) : (n.di = i.dd), t.splice(e, 0, n), e++);
    }
}
function t_animationSBS__updateMoveAndRotateStepsStyles(t) {
    var e = t[0].styles.moveX,
        n = t[0].styles.moveY,
        i = t[0].styles.rotate;
    t.forEach(function (t) {
        t = t.styles;
        (t.moveX -= e), (e += t.moveX), (t.moveY -= n), (n += t.moveY), (t.rotate -= i), (i += t.rotate);
    });
}
function t_animationSBS__createStepStyles(t) {
    return {
        moveX: parseInt(t.mx, 10) || 0,
        moveY: parseInt(t.my, 10) || 0,
        scaleX: isNaN(parseFloat(t.sx)) ? 1 : parseFloat(t.sx),
        scaleY: isNaN(parseFloat(t.sy)) ? 1 : parseFloat(t.sy),
        opacity: isNaN(parseFloat(t.op)) ? 1 : parseFloat(t.op),
        rotate: parseInt(t.ro, 10) || 0,
        blur: parseInt(t.bl, 10) || 0,
        fix: "fixed" === t.fi,
    };
}
function t_animationSBS__setTriggerOffset(t) {
    var e = window.innerHeight,
        n = t_animationSBS__getZoom(t);
    (t.triggerOffset = parseInt(t_animationSBS__getAnimOptions(t, "published", "sbs-trgofst"), 10)),
        (!window.t_animationSBS__isOnlyScalable && "scroll" !== t.animType) || (t.triggerOffset *= n),
        t.triggerOffset || (t.triggerOffset = 0),
        (0.5 !== t.trigger && 1 !== t.trigger) ||
            ((t.triggerOffset += e * t.trigger),
            ("intoview" === t.animType || "scroll" === t.animType) &&
                t.triggerOffset > t.topOffset &&
                t.triggerOffset <= e * t.trigger &&
                ((t.triggerOffset = t.topOffset), t.triggerOffset < 0 && t.scaledDifference && (t.scaledDifference = 0)),
            "blockintoview" === t.animType && t.triggerOffset > t.parentRecTopPos && t.triggerOffset <= e * t.trigger && (t.triggerOffset = t.parentRecTopPos));
}
function t_animationSBS__triggerNoScrollAnimation(t, e) {
    t_animationSBS__processElsIntoView(t, e), t_animationSBS__removeHoverClickTriggers(t), t_animationSBS__initClickTriggers(t), t_animationSBS__initHoverTriggers(t);
}
function t_animationSBS__processElsIntoView(t, e) {
    t_animationSBS__updateIntoViewElsState(e);
    var n = 0;
    t_animationSBS__setKeyForAnimatedObject(t, "onScrollUpdateElsIntoView", function () {
        n =
            n ||
            setTimeout(function () {
                t_animationSBS__updateIntoViewElsState(e), (n = 0);
            }, 200);
    }),
        window.removeEventListener("scroll", t.onScrollUpdateElsIntoView),
        window.addEventListener("scroll", t.onScrollUpdateElsIntoView);
}
function t_animationSBS__removeHoverClickTriggers(t) {
    var n = ["js-sbs-anim-trigger_click", "js-sbs-anim-trigger_hover"],
        e = document.querySelectorAll("." + n.join(", ."));
    e.length &&
        ((e = Array.prototype.slice.call(e)).forEach(function (e) {
            n.forEach(function (t) {
                e.classList.remove(t);
            });
        }),
        t.clickedTriggerEls.forEach(function (t) {
            t.removeEventListener("click", t_animationSBS__initClickCallback), t_animationSBS__removeTriggerList(t, "click");
        }),
        t.hoverTriggerEls.forEach(function (t) {
            t.removeEventListener("click", t_animationSBS__initHoverTrigger),
                t.removeEventListener("mouseenter", t_animationSBS__initHoverTrigger),
                t.removeEventListener("mouseleave", t_animationSBS__initHoverTrigger),
                t_animationSBS__removeTriggerList(t, "hover");
        }),
        t_animationSBS__updateAnimatedObjectState(t, "clickedTriggerEls", []),
        t_animationSBS__updateAnimatedObjectState(t, "hoverTriggerEls", []));
}
function t_animationSBS__removeTriggerList(t, e) {
    t["triggerList-on-" + e] && (t["triggerList-on-" + e] = []), t["triggerOnceList-on-" + e] && (t["triggerOnceList-on-" + e] = []);
}
function t_animationSBS__initClickTriggers(t) {
    var e,
        n = t.elements.filter(function (t) {
            return "click" === t.getAttribute("data-animate-sbs-event");
        });
    n.length &&
        (t_animationSBS__connectTriggersWithAnimEls(n),
        (n = Array.prototype.slice.call(document.querySelectorAll(".js-sbs-anim-trigger_click"))).length &&
            (document.getElementById("js-sbs-anim-trigger-styles") ||
                (((e = document.createElement("style")).id = "js-sbs-anim-trigger-styles"), (e.textContent = ".js-sbs-anim-trigger_click { cursor: pointer; }"), document.head.insertAdjacentElement("beforeend", e)),
            (t.clickedTriggerEls = n).forEach(function (t) {
                t_animationSBS__preventAnimatedParentTrigger(t), t.removeEventListener("click", t_animationSBS__initClickCallback), t.addEventListener("click", t_animationSBS__initClickCallback);
            })));
}
function t_animationSBS__initClickCallback() {
    var t = this["triggerList-on-click"],
        e = this["triggerOnceList-on-click"];
    ((t && t.length) || (e && e.length)) &&
        (t_animationSBS__playOnceAnimation(this, e, "click"),
        t && t.length && ((e = t[0]) && e.classList.contains("t-sbs-anim_started") && !e.classList.contains("t-sbs-anim_reversed") ? t_animationSBS__actionOnEnd : t_animationSBS__actionOnStart)(t));
}
function t_animationSBS__playOnceAnimation(t, e, n) {
    var i;
    e &&
        e.length &&
        (t_animationSBS__actionOnStart(e),
        (i = document.createEvent("Event")).initEvent("updateAnimOnce", !0, !0),
        e.forEach(function (t) {
            t.dispatchEvent(i);
        }),
        (t["triggerOnceList-on-" + n] = []));
}
function t_animationSBS__initHoverTriggers(t) {
    var e = t.elements.filter(function (t) {
        return "hover" === t.getAttribute("data-animate-sbs-event");
    });
    e.length &&
        (t_animationSBS__connectTriggersWithAnimEls(e),
        (e = document.querySelectorAll(".js-sbs-anim-trigger_hover")),
        (e = Array.prototype.slice.call(e)),
        (t.hoverTriggerEls = e).forEach(function (t) {
            t_animationSBS__preventAnimatedParentTrigger(t),
                window.animationSBS__isIOS
                    ? (t.removeEventListener("click", t_animationSBS__initHoverTrigger), t.addEventListener("click", t_animationSBS__initHoverTrigger))
                    : (t.removeEventListener("mouseenter", t_animationSBS__initHoverTrigger),
                      t.removeEventListener("mouseleave", t_animationSBS__initHoverTrigger),
                      t.addEventListener("mouseenter", t_animationSBS__initHoverTrigger),
                      t.addEventListener("mouseleave", t_animationSBS__initHoverTrigger));
        }));
}
function t_animationSBS__preventAnimatedParentTrigger(t) {
    var e;
    "none" !== getComputedStyle(t).pointerEvents && ((e = t.querySelector(".tn-atom")), (t.style.pointerEvents = "none"), (e.style.pointerEvents = "auto"));
}
function t_animationSBS__initHoverTrigger(t) {
    var e = t.currentTarget,
        n = t.currentTarget["triggerList-on-hover"],
        i = t.currentTarget["triggerOnceList-on-hover"];
    function a(t) {
        e !== t.target.closest(".t396__elem") && (t_animationSBS__actionOnEnd(n), e.classList.remove("t-hover-mob-active"), document.removeEventListener("click", a));
    }
    ((n && n.length) || (i && i.length)) &&
        (t_animationSBS__playOnceAnimation(e, i, "hover"),
        n &&
            n.length &&
            ("mouseenter" === t.type && t_animationSBS__actionOnStart(n),
            "mouseleave" === t.type && t_animationSBS__actionOnEnd(n),
            "click" !== t.type ||
                e.classList.contains("t-hover-mob-active") ||
                (setTimeout(function () {
                    t_animationSBS__actionOnStart(n), e.classList.add("t-hover-mob-active");
                }),
                setTimeout(function () {
                    document.addEventListener("click", a);
                }))));
}
function t_animationSBS__connectTriggersWithAnimEls(t) {
    var a = t[0].getAttribute("data-animate-sbs-event");
    t.forEach(function (e) {
        var t,
            n,
            i = e.triggerElems;
        i
            ? ((i = i ? i.split(",") : []),
              (t = e.closest(".t396__artboard")),
              (n = t ? t.getAttribute("data-artboard-recid") : ""),
              i.forEach(function (t) {
                  t_animationSBS__processTriggersElemList(document.querySelector(".tn-elem__" + (n + t)), e, a);
              }))
            : t_animationSBS__processTriggersElemList(e.querySelector(".tn-atom__sbs-anim-wrapper"), e, a);
    });
}
function t_animationSBS__processTriggersElemList(t, e, n) {
    t && ("once" === e.loop ? e.classList.contains("t-sbs-anim_started") || t_animationSBS__initTriggersList(t, "triggerOnceList", n, e) : t_animationSBS__initTriggersList(t, "triggerList", n, e));
}
function t_animationSBS__initTriggersList(t, e, n, i) {
    t[e + "-on-" + n] ? -1 === t[e + "-on-" + n].indexOf(i) && t[e + "-on-" + n].push(i) : (t[e + "-on-" + n] = [i]),
        t[e + "-on-" + n].length && !t.classList.contains("js-sbs-anim-trigger_" + n) && t.classList.add("js-sbs-anim-trigger_" + n),
        i.addEventListener("updateAnimOnce", function () {
            (t[e + "-on-" + n] = t[e + "-on-" + n].filter(function (t) {
                return t !== i;
            })),
                (t["triggerList-on-" + n] && t["triggerList-on-" + n].length) || t.classList.remove("js-sbs-anim-trigger_" + n);
        });
}
function t_animationSBS__actionOnStart(t) {
    t.forEach(function (t) {
        t.classList.contains("t-sbs-anim_playing") ? t.setAttribute("data-planned-dir", "play") : t_animationSBS__playAnimation(t, !1);
    });
}
function t_animationSBS__actionOnEnd(t) {
    t.forEach(function (t) {
        var e = t.loop,
            n = "noreverse" === e && "hover" === t.getAttribute("data-animate-sbs-event");
        e && -1 !== e.indexOf("loop")
            ? t.addEventListener("animationiteration", t_animationSBS__setIterationAnimation)
            : t.classList.contains("t-sbs-anim_playing") && !n
            ? t.setAttribute("data-planned-dir", "reverse")
            : n || t_animationSBS__playAnimation(t, !0);
    });
}
function t_animationSBS__setIterationAnimation(t) {
    var e = t.target.closest(".t396__elem");
    if (e) {
        if ("loopwithreverse" === e.loop) {
            var n = t_animationSBS__getAnimationFullTime(e, !0);
            if (((1e3 * t.elapsedTime) / n) % 2 != 0) return;
        }
        e.classList.remove("t-sbs-anim_started"), e.classList.remove("t-sbs-anim_reversed"), e.classList.remove("t-sbs-anim_playing"), e.removeEventListener("animationiteration", t_animationSBS__setIterationAnimation);
    }
}
function t_animationSBS__animationEnd(t) {
    t.removeEventListener("animationend", t_animationSBS__animationEndingEvent), t.addEventListener("animationend", t_animationSBS__animationEndingEvent);
}
function t_animationSBS__animationEndingEvent() {
    this.classList.remove("t-sbs-anim_playing");
    var t = this.getAttribute("data-planned-dir");
    "play" === t && this.classList.contains("t-sbs-anim_reversed") ? t_animationSBS__playAnimation(this, !1) : "reverse" !== t || this.classList.contains("t-sbs-anim_reversed") || t_animationSBS__playAnimation(this, !0),
        this.setAttribute("data-planned-dir", "");
}
function t_animationSBS__getAnimationFullTime(t, n) {
    return t.getAttribute("data-animate-sbs-opts")
        ? JSON.parse(t.getAttribute("data-animate-sbs-opts").split("'").join('"')).reduce(function (t, e) {
              return n && (t += parseInt(e.dt, 10) || 0), t + (parseInt(e.ti, 10) || 0);
          }, 0)
        : 0;
}
function t_animationSBS__playAnimation(e, t) {
    e.classList.remove("t-sbs-anim_started"), t || e.classList.remove("t-sbs-anim_reversed"), t_animationSBS__forceRepaint(e);
    var n = t_animationSBS__getAnimationFullTime(e, !1),
        i = ["t-sbs-anim_started"];
    t && i.push("t-sbs-anim_reversed"),
        0 < n && i.push("t-sbs-anim_playing"),
        i.forEach(function (t) {
            e.classList.add(t);
        }),
        t_animationSBS__animationEnd(e);
}
function t_animationSBS__forceRepaint(t) {
    t.offsetWidth;
}
function t_animationSBS__updateIntoViewElsState(t) {
    t &&
        t.length &&
        t.forEach(function (t) {
            var e = window.pageYOffset + t.triggerOffset,
                e = "blockintoview" === t.animType ? e >= t.parentRecTopPos : e >= t.topOffset,
                n = t.closest(".t396").parentElement,
                i = ["t397__off", "t395__off", "t400__off"].some(function (t) {
                    return n.classList.contains(t);
                });
            !e || i || t.classList.contains("t-sbs-anim_started") || t.classList.add("t-sbs-anim_started");
        });
}
function t_animationSBS__getZoom(t) {
    t = t.closest(".t396__artboard");
    if (!t) return 1;
    var e = t.getAttribute("data-artboard-recid");
    return t.classList.contains("t396__artboard_scale") || (!window.animationSBS__isOldPage && "undefined" != typeof t396_ab__getFieldValue && "window" === t396_ab__getFieldValue(t, "upscale"))
        ? (e && window.tn["ab" + e] && window.tn["ab" + e].scaleFactor) || window.tn_scale_factor
        : 1;
}
function t_animateSbs__wrapAtomEls() {
    var t = document.querySelectorAll("[data-animate-sbs-event]");
    Array.prototype.forEach.call(t, function (t) {
        var e,
            n = t.querySelector(".tn-atom");
        n &&
            !n.closest(".tn-atom__sbs-anim-wrapper") &&
            (t_animationSBS__wrapEl(n, "tn-atom__sbs-anim-wrapper"),
            (n = t.getAttribute("data-elem-type")),
            (e = window.getComputedStyle(t).getPropertyValue("border-radius")),
            "shape" === n && e && parseInt(e) && (n = t.querySelector(".tn-atom__sbs-anim-wrapper")) && (n.style.borderRadius = e));
    });
}
function t_animateSbs__cashElsInfo(o) {
    var t = o.els;
    (o.triggerElemsAttrName = "edit" === o.mode ? "data-field-sbstrgels-value" : "data-animate-sbs-trgels"),
        Array.prototype.forEach.call(t, function (t) {
            if (
                ((t.state = "unactive"),
                (t.animType = "edit" === o.mode ? t.getAttribute("data-field-sbsevent-value") : t.getAttribute("data-animate-sbs-event")),
                (t.changeType = "scroll" === t.animType ? "scroll" : "time"),
                (t.trigger = "edit" === o.mode ? t.getAttribute("data-field-sbstrg-value") : t.getAttribute("data-animate-sbs-trg")),
                (t.trigger = t.trigger || 1),
                (t.triggerElems = t.getAttribute(o.triggerElemsAttrName)),
                (t.wrapperEl = t.querySelector(".tn-atom__sbs-anim-wrapper")),
                (t.steps = []),
                (e = "edit" === o.mode ? t.getAttribute("data-field-sbsopts-value") : t.getAttribute("data-animate-sbs-opts")))
            ) {
                -1 !== e.indexOf("fixed") && (t.zIndex = window.getComputedStyle(t).getPropertyValue("z-index"));
                for (
                    var e = e.replace(/'/g, '"'),
                        n = JSON.parse(e),
                        i = (t_animationSBS__addDelayToSteps(n), (t.loop = "edit" === o.mode ? t.getAttribute("data-field-sbsloop-value") : t.getAttribute("data-animate-sbs-loop")), t_animationSBS__setAndCacheElTopPos(t, o), 0),
                        a = 0;
                    a < n.length;
                    a++
                ) {
                    var r = { state: "unactive" };
                    (r.styles = t_animationSBS__createStepStyles(n[a])),
                        "scroll" === t.changeType
                            ? ((r.prevUnfixedDist = i), (r.dist = n[a].di), !1 === r.styles.fix && (i += Number(r.dist)), (r.start = 0 === a ? t.topOffset : t.steps[a - 1].end), (r.end = r.start + +r.dist))
                            : ((r.time = n[a].ti), (r.ease = n[a].ea)),
                        t.steps.push(r);
                }
                t_animationSBS__updateInfoOnImgLoad(t, o), t_animationSBS__updateMoveAndRotateStepsStyles(t.steps);
            }
        });
}
function t_animateSbs__reset(t) {
    for (var e = t.els, n = 0; n < e.length; n++) {
        var i = e[n].animType;
        "intoview" === i || "blockintoview" === i || "click" === i || "hover" === i
            ? (e[n].classList.remove("t-sbs-anim_started"), (i = e[n].querySelector(".tn-atom__sbs-anim-wrapper")) && (i.style.opacity = ""))
            : ((e[n].state = "reseted"), (i = e[n].wrapperEl) && ((i.style.transform = ""), (i.style.position = ""), (i.style.top = ""), (i.style.opacity = "")));
    }
}
function t_animationSBS__wrapEl(t, e) {
    if (!t) return !1;
    var n = t.parentNode,
        i = document.createElement("div");
    i.classList.add(e), (i.style.display = "table"), (i.style.width = "inherit"), (i.style.height = "inherit"), i.appendChild(t), n && n.appendChild(i);
}
(window.t_animationSBS__isFirefox = -1 !== navigator.userAgent.search("Firefox")),
    (window.t_animationSBS__isOnlyScalable = Boolean(window.t_animationSBS__isFirefox || Boolean((window.opr && window.opr.addons) || window.opera || -1 !== navigator.userAgent.indexOf(" OPR/")))),
    (window.t_animationSBS__isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)),
    (window.animationSBS__isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) || ("ontouchend" in document && /Macintosh/.test(navigator.userAgent))),
    (window.animationSBS__isOldPage = Boolean(document.querySelector('script[src*="tilda-blocks-2.7"]'))),
    "visible" === document.visibilityState
        ? "loading" !== document.readyState
            ? t_animationSBS__init()
            : document.addEventListener("DOMContentLoaded", t_animationSBS__init)
        : document.addEventListener("visibilitychange", t_animationSBS__checkVisibilityPage);
