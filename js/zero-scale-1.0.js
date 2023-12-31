function t396_scaleBlock(e) {
    var u,
        t,
        l,
        h = t396_isOnlyScalableBrowser(),
        g = t396_detectResolution(e),
        o = document.getElementById("rec" + e),
        _ = o ? o.querySelectorAll(".t396__elem") : [],
        y = o ? o.querySelector(".t396__artboard") : null;
    y &&
        ((u = (u = window.tn && window.tn["ab" + e] && window.tn["ab" + e].scaleFactor) || window.tn_scale_factor),
        (o = y.clientWidth),
        (l = t396_ab__getFieldValue(y, "height")),
        (l = Math.floor(l * u)),
        (t = t396_ab__getFieldValue(y, "height_vh")),
        (window.tn_scale_offset = (o * u - o) / 2),
        t && ((o = t396_ab__getFieldValue(y, "height")), (l = (t = t396_ab__getHeight(y)) <= (o = o * u) ? o : t)),
        y.classList.add("t396__artboard_scale"),
        y.insertAdjacentHTML(
            "beforeend",
            '<style class="t396__scale-style">.t-rec#rec' +
                e +
                " { overflow: visible; }#rec" +
                e +
                " .t396__carrier,#rec" +
                e +
                " .t396__filter,#rec" +
                e +
                " .t396__artboard {height: " +
                l +
                "px !important;width: 100vw !important;max-width: 100%;}</style>"
        )),
        Array.prototype.forEach.call(_, function (e) {
            var t = e.querySelector(".tn-atom"),
                l = t396_elem__getFieldValue(e, "container"),
                o = e.getAttribute("data-elem-type");
            if ("grid" === l)
                if (h) {
                    t && ((s = t.parentNode), (d = document.createElement("div")).classList.add("tn-atom__scale-wrapper"), (d.style.transform = "scale(" + u + ")"), s && s.removeChild(t), d.appendChild(t), s && s.appendChild(d)),
                        "none" === e.style.backdropFilter && (e.style.backdropFilter = "");
                    var l = getComputedStyle(e).backdropFilter,
                        l = (l && t && d && ((e.style.backdropFilter = "none"), (d.style.backdropFilter = l), "0px" !== (l = getComputedStyle(t).borderRadius) && (d.style.borderRadius = l)), e.querySelector(".t-bgimg"));
                    l &&
                        "fixed" === window.getComputedStyle(l).backgroundAttachment &&
                        (e.removeChild(l.parentNode),
                        e.appendChild(l),
                        (n = t396_elem__getFieldValue(e, "height")),
                        (n = t396_elem__getHeight(e, n)),
                        (n = t396_elem__convertPosition__Local__toAbsolute(e, "height", n)),
                        (c = t396_elem__getFieldValue(e, "width")),
                        (c = t396_elem__getWidth(e, c)),
                        (c = t396_elem__convertPosition__Local__toAbsolute(e, "width", c)),
                        (m = parseFloat(t396_elem__getFieldValue(e, "top"))),
                        (p = parseFloat(t396_elem__getFieldValue(e, "left"))),
                        (e.style.top = m * u + "px"),
                        (e.style.left = p * u + "px"),
                        (e.style.height = n * u + "px"),
                        (e.style.width = c * u + "px"),
                        e.setAttribute("data-scale-off", "yes"));
                } else {
                    var l = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
                        _ =
                            (("text" !== o && "button" !== o) ||
                                !l ||
                                ((i = t396_elem__getCorrectStylesForSafari(e, "fontSize")),
                                (_ = t.style.webkitTextSizeAdjust),
                                (t.style.webkitTextSizeAdjust = "none"),
                                (e.style.zoom = u),
                                (a = parseFloat(getComputedStyle(t).fontSize)),
                                (a = Math.round(a)),
                                (a = Math.abs(i - a)),
                                (t.style.webkitTextSizeAdjust = _),
                                1 <= a && ((t.style.fontSize = i * u + "px"), (t.style.webkitTextSizeAdjust = "none"))),
                            (e.style.zoom = u),
                            e.querySelector("iframe")),
                        a = e.getAttribute("data-animate-style"),
                        i = e.getAttribute("data-animate-sbs-event"),
                        r = y.classList.contains("t396_resizechange");
                    if ("video" !== o && _ && !a && !i && !r) {
                        e.style.removeProperty("zoom");
                        var s,
                            d,
                            n = t396_elem__getFieldValue(e, "height"),
                            c = ((n = t396_elem__getHeight(e, n)), (n = t396_elem__convertPosition__Local__toAbsolute(e, "height", n)), t396_elem__getFieldValue(e, "width")),
                            m = ((c = t396_elem__getWidth(e, c)), (c = t396_elem__convertPosition__Local__toAbsolute(e, "width", c)), parseFloat(t396_elem__getFieldValue(e, "top"))),
                            p = ((m = (m = t396_elem__convertPosition__Local__toAbsolute(e, "top", m)) * u + (n * u - n) / 2), parseFloat(t396_elem__getFieldValue(e, "left")));
                        for (
                            p = (p = t396_elem__convertPosition__Local__toAbsolute(e, "left", p)) * u + (c * u - c) / 2,
                                e.style.top = m + "px",
                                e.style.left = p + "px",
                                (s = t.parentNode) && s.classList.contains("tn-atom__scale-wrapper") && (s = s.parentNode),
                                (d = document.createElement("div")).classList.add("tn-atom__scale-wrapper"),
                                d.style.transform = "scale(" + u + ")";
                            s.firstChild;

                        )
                            s.removeChild(s.firstChild);
                        d.appendChild(t), s && s.appendChild(d), e.setAttribute("data-scale-off", "yes");
                    }
                    "shape" === o &&
                        ((n = t396_elem__getFieldValue(e, "height")),
                        (n = t396_elem__getHeight(e, n)),
                        (n = t396_elem__convertPosition__Local__toAbsolute(e, "height", n)),
                        (c = t396_elem__getFieldValue(e, "width")),
                        (c = t396_elem__getWidth(e, c)),
                        (c = t396_elem__convertPosition__Local__toAbsolute(e, "width", c)),
                        (m = parseFloat(t396_elem__getFieldValue(e, "top"))),
                        (m = t396_elem__convertPosition__Local__toAbsolute(e, "top", m)),
                        (p = parseFloat(t396_elem__getFieldValue(e, "left"))),
                        (p = t396_elem__convertPosition__Local__toAbsolute(e, "left", p)),
                        (i = (_ = window.getComputedStyle(t)).borderWidth),
                        (r = "none" !== _.backgroundImage),
                        (a = e.getAttribute("data-animate-sbs-event")),
                        !(n <= 2 || c <= 2) ||
                            "0px" !== i ||
                            r ||
                            a ||
                            (e.style.removeProperty("zoom"),
                            (d = c * u),
                            (_ = n * u),
                            (i = m * u),
                            (r = p * u),
                            (e.style.width = parseFloat(d) + "px"),
                            (e.style.height = parseFloat(_) + "px"),
                            (e.style.top = Math.round(i) + "px"),
                            (e.style.left = Math.round(r) + "px"),
                            e.setAttribute("data-scale-off", "yes"))),
                        "text" === o && g < 1200 && t && !l && (t.style.webkitTextSizeAdjust = "auto"),
                        t && (t.style.transformOrigin = "center");
                }
        });
}
window.t396_initialScale || (window.t396_initialScale = function () {});
