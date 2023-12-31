function t_popup__trapFocus(t) {
    var t = t.querySelectorAll('a, button, input:not([type="hidden"]):not(.js-form-spec-comments), select, textarea, video, iframe'),
        o = t[0],
        p = t[t.length - 1];
    document.addEventListener("keydown", function (t) {
        var e;
        !document.body.classList.contains("t-body_popupshowed") ||
            (((e = "Tab" === t.key || 9 === t.keyCode) || (e && t.shiftKey)) &&
                (t.shiftKey ? (document.activeElement.classList.contains("t-popup_show") && p.focus(), document.activeElement === o && (p.focus(), t.preventDefault())) : document.activeElement === p && (o.focus(), t.preventDefault())));
    });
}
function t_popup__addAttributesForAccessibility(t) {
    t = document.querySelectorAll('a[href="' + t + '"]');
    Array.prototype.forEach.call(t, function (t) {
        t && (t.setAttribute("role", "button"), t.setAttribute("aria-haspopup", "dialog"));
    });
}
function t_popup__resizePopup(t) {
    var e,
        o,
        p = document.getElementById("rec" + t);
    !p ||
        ((e = p.querySelector(".t-popup__container")) &&
            ((o = getComputedStyle(e, null)),
            (t = parseInt(o.paddingTop) || 0),
            (o = parseInt(o.paddingBottom) || 0),
            (t = e.clientHeight - (t + o)),
            (o = 120),
            (364 !== (p = Number(p.getAttribute("data-record-type"))) && 365 !== p) || (o = 30),
            (868 !== p && 331 !== p && 358 !== p && 1013 !== p && 746 !== p) || (o = 0),
            t > window.innerHeight - o ? e.classList.add("t-popup__container-static") : e.classList.remove("t-popup__container-static")));
}
function t_popup__showPopup(e) {
    e && (e.style.display = "block"),
        setTimeout(function () {
            e.focus();
            var t = e ? e.querySelector(".t-popup__container") : null;
            t && t.classList.add("t-popup__container-animated"),
                e && e.classList.add("t-popup_show"),
                t_onFuncLoad("t_popup__trapFocus", function () {
                    t_popup__trapFocus(e);
                });
        }, 50);
}
function t_popup__addClassOnTriggerButton(t, e) {
    var o = document.querySelectorAll(".t-popup__triggered-btn");
    Array.prototype.forEach.call(o, function (t) {
        t.classList.remove("t-popup__triggered-btn");
    }),
        t.addEventListener("keydown", function (t) {
            13 !== t.keyCode || ((t = !!(t = t.target).closest('a[href="' + e + '"]') && t) && (window.isMobile || t.classList.add("t-popup__triggered-btn")));
        });
}
function t_popup__addFocusOnTriggerButton() {
    var t = document.querySelector(".t-popup__triggered-btn");
    t && (t.focus(), t.classList.remove("t-popup__triggered-btn"));
}
Element.prototype.matches ||
    (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector),
    Element.prototype.closest ||
        (Element.prototype.closest = function (t) {
            for (var e = this; e && 1 === e.nodeType; ) {
                if (Element.prototype.matches.call(e, t)) return e;
                e = e.parentElement || e.parentNode;
            }
            return null;
        });
