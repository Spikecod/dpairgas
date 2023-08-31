(window.Tilda = window.Tilda || {}),
    (function () {
        function e() {
            var e = navigator.userAgent.toLowerCase(),
                t = -1 !== e.indexOf("msie") && parseInt(e.split("msie")[1]);
            if (8 === t || 9 === t) {
                var r = document.querySelectorAll(".t-btn");
                Array.prototype.forEach.call(r, function (e) {
                    var t = e.getAttribute("href");
                    e.querySelector("table") &&
                        t &&
                        -1 === t.indexOf("#popup:") &&
                        -1 === t.indexOf("#price:") &&
                        e.addEventListener("click", function (e) {
                            var t = e.target.getAttribute("href");
                            e.preventDefault(), (window.location.href = t);
                        });
                });
            }
            try {
                var a = document.getElementById("allrecords"),
                    i = a ? a.getAttribute("data-tilda-cookie") : null;
                (a && "no" === i) || Tilda.saveUTM();
            } catch (e) {}
            var o = document.querySelectorAll(".r");
            function d(e) {
                var t = e.target.closest("a.js-click-stat") || e.target.closest(".js-click-zero-stat");
                if (e.target && t) {
                    var r = t.getAttribute("data-tilda-event-name"),
                        a = t.textContent,
                        i = t.getAttribute("href") || "",
                        o = t.getAttribute("target");
                    if (!r) {
                        var d = t.closest(".r"),
                            c;
                        r = "/tilda/click/" + (d ? d.getAttribute("id") : "") + "/?url=" + i;
                    }
                    if ((Tilda.sendEventToStatistics(r, a), "http" === i.substring(0, 4) && -1 === i.indexOf(".typeform.com/")))
                        return (
                            window.setTimeout(function () {
                                var e = "",
                                    t = "";
                                if ("_blank" === o) {
                                    if (
                                        (-1 !== i.indexOf("?") && ((e = i.split("?")), (i = e[0]), -1 !== (e = e[1]).indexOf("#") && ((e = e.split("#")), (i = i + "#" + e[1]), (e = e[0])), (e = e.split("&"))),
                                        document.getElementById("tildaredirectform")
                                            ? (document.getElementById("tildaredirectform").setAttribute("method", "GET"), document.getElementById("tildaredirectform").setAttribute("action", i))
                                            : document.body.insertAdjacentHTML("beforeend", '<form id="tildaredirectform" target="_blank" method="GET" action="' + i + '" style="display:none;"></form>'),
                                        (t = ""),
                                        e.length > 0)
                                    )
                                        for (var r in e) {
                                            var a = e[r].indexOf("=");
                                            if (a > -1) {
                                                var d = e[r].substring(0, a),
                                                    c = e[r].substring(a + 1);
                                                d && (t += '<input type="hidden" name="' + d + '" value="' + c + '">');
                                            }
                                        }
                                    if ("" === t) window.open(i, "_blank");
                                    else {
                                        var n = document.getElementById("tildaredirectform");
                                        n && ((n.innerHTML = t), n.submit());
                                    }
                                } else window.location.href = i;
                            }, 300),
                            e.preventDefault(),
                            !1
                        );
                }
            }
            Array.prototype.forEach.call(o, function (e) {
                e.removeEventListener("click", d), e.addEventListener("click", d);
            });
            var c = document.querySelectorAll("input.js-amount");
            Array.prototype.forEach.call(c, function (e) {
                var t = e.value;
                (t = t.replace(/,/g, ".")), (t = parseFloat(t.replace(/[^0-9\.]/g, ""))), (e.value = t);
            });
        }
        (Tilda.sendEcommerceEvent = function (e, t) {
            if (void 0 === t || 0 === t.length) return !1;
            if (void 0 === e || ("add" !== e && "remove" !== e && "purchase" !== e && "detail" !== e)) return !1;
            for (var r, a = "", i = 0, o = [], d, c, n = "", m = "", l = "", u = 0; u < t.length; u++) {
                a > "" && (a += ", "),
                    (a += (c = t[u]).name),
                    (i += c.price),
                    (d = ""),
                    void 0 !== c.options &&
                        c.options.length > 0 &&
                        Array.prototype.forEach.call(c.options, function (e) {
                            d += e.option + ": " + e.variant + "; ";
                        });
                var p = { name: c.name, price: c.price, variant: d, quantity: 1 };
                c.id && c.id > 0 && ((id = c.id), (p.id = c.id)),
                    c.uid && c.uid > 0 && ((m = c.uid), (p.uid = c.uid)),
                    c.recid && c.recid > 0 && ((n = c.recid), (p.recid = c.recid)),
                    c.lid && c.lid > 0 && ((l = c.lid), (p.lid = c.lid)),
                    c.sku && c.sku > 0 && (p.sku = c.sku),
                    (o[o.length] = p);
            }
            var p;
            ("add" !== e && "remove" !== e) || ((r = "/tilda/cart/" + e + "/"), n > 0 && (r += "" + n), m > 0 ? (r += "-u" + m) : l > 0 && (r += "-" + l)),
                "detail" === e && ((r = "/tilda/product/detail/"), m > 0 ? (r += m + "/") : (n > 0 && (r += "r" + n), l > 0 && (r += "-l" + l))),
                "purchase" === e && (r = "/tilda/rec" + n + "/payment/"),
                ((p = { ecommerce: {} }).ecommerce[e] = { products: o }),
                Tilda.sendEventToStatistics(r, a, p, i);
        }),
            (Tilda.sendEventToStatistics = function (e, t, r, a) {
                var i = "/" === e.substring(0, 1),
                    o = [],
                    d,
                    c;
                (d = document.getElementById("allrecords")) &&
                    (c = null !== d.getAttribute("data-fb-event") ? d.getAttribute("data-fb-event") : window.jQuery && void 0 !== $("#allrecords").data("fb-event") ? $("#allrecords").data("fb-event") : null);
                var n = !(!c || "nosend" !== c),
                    m = d ? d.getAttribute("data-vk-event") : null;
                d && (m = null !== d.getAttribute("data-vk-event") ? d.getAttribute("data-vk-event") : window.jQuery && void 0 !== $("#allrecords").data("vk-event") ? $("#allrecords").data("vk-event") : null);
                var l = !(!m || "nosend" !== m),
                    u = "",
                    p = document.querySelector(".t706");
                if (
                    ((u = d.getAttribute("data-tilda-currency") ? d.getAttribute("data-tilda-currency") : p && p.getAttribute("data-project-currency-code") ? p.getAttribute("data-project-currency-code") : "RUB"),
                    r || (r = window.location.href),
                    (a = a ? parseFloat(a) : 0) > 0)
                )
                    if ((window.dataLayer || (window.dataLayer = []), -1 !== e.indexOf("/tilda/") && -1 !== e.indexOf("/payment/") && window.tildaForm && window.tildaForm.orderIdForStat > ""))
                        (r = { ecommerce: { purchase: { actionField: { id: window.tildaForm.orderIdForStat, revenue: window.tildaForm.amountForStat }, products: window.tildaForm.arProductsForStat } } }),
                            window.tildaForm.tildapayment && window.tildaForm.tildapayment.promocode && (r.ecommerce.purchase.actionField.coupon = window.tildaForm.tildapayment.promocode),
                            (r.event = "purchase");
                    else if (
                        r &&
                        r.ecommerce &&
                        (r.ecommerce.add && r.ecommerce.add.products
                            ? (o = r.ecommerce.add.products)
                            : r.ecommerce.remove && r.ecommerce.remove.products
                            ? (o = r.ecommerce.remove.products)
                            : r.ecommerce.detail && r.ecommerce.detail.products && (o = r.ecommerce.detail.products),
                        o && o.length > 0)
                    ) {
                        for (var s = 0; s < o.length; s++) o[s].id || (o[s].sku ? (o[s].id = o[s].sku) : o[s].uid ? (o[s].id = o[s].uid) : o[s].recid && o[s].lid && (o[s].id = o[s].recid + "_" + o[s].lid));
                        r.ecommerce.add && r.ecommerce.add.products
                            ? ((r.ecommerce.add.products = o), (r.event = "addToCart"))
                            : r.ecommerce.remove && r.ecommerce.remove.products
                            ? ((r.ecommerce.remove.products = o), (r.event = "removeFromCart"))
                            : r.ecommerce.detail && r.ecommerce.detail.products
                            ? ((r.ecommerce.detail.products = o), (r.event = "viewProduct"))
                            : (i ? ((r.event = "pageView"), (r.eventAction = e)) : (r.event = e), (r.title = t), (r.value = a));
                    }
                void 0 !== window.dataLayer &&
                    (i
                        ? a > 0
                            ? r && r.ecommerce
                                ? window.dataLayer.push(r)
                                : window.dataLayer.push({ event: "pageView", eventAction: e, title: t, value: a, product: r })
                            : window.dataLayer.push({ event: "pageView", eventAction: e, title: t, referer: r })
                        : r && r.ecommerce
                        ? window.dataLayer.push(r)
                        : window.dataLayer.push({ event: e, eventAction: t, value: a, referer: r }));
                try {
                    var v;
                    if (window.gtagTrackerID && "gtag" === window.mainTracker)
                        if (i)
                            if (r && r.event)
                                if ("purchase" === r.event) {
                                    for (var o = r.ecommerce.purchase.products, w = 0, f = 0; f < o.length; f++)
                                        if ("delivery" === o[f].id) {
                                            w = o[f];
                                            break;
                                        }
                                    gtag("event", "purchase", { transaction_id: r.ecommerce.purchase.actionField.id, value: parseFloat(a).toFixed(2), currency: u, shipping: w, items: r.ecommerce.purchase.products });
                                } else
                                    "addToCart" === r.event && r.ecommerce.add
                                        ? gtag("event", "add_to_cart", { items: r.ecommerce.add.products })
                                        : "removeFromCart" === r.event && r.ecommerce.remove
                                        ? gtag("event", "remove_from_cart", { items: r.ecommerce.remove.products })
                                        : "viewProduct" === r.event && r.ecommerce.detail && gtag("event", "view_item", { items: r.ecommerce.detail.products });
                            else
                                !!window.gtagTrackerID && -1 !== window.gtagTrackerID.indexOf("UA-")
                                    ? gtag("config", window.gtagTrackerID, { page_title: t, page_path: e })
                                    : gtag("event", window.gtagTrackerID, { page_title: t, page_path: e, send_to: window.gtagTrackerID });
                        else gtag("event", e, { event_category: "tilda", event_label: t, value: a });
                } catch (e) {}
                if (window.ga && "tilda" !== window.mainTracker && "gtag" !== window.mainTracker)
                    if (i)
                        if (r && r.event) {
                            try {
                                if ((window.Tilda.isLoadGAEcommerce || ((window.Tilda.isLoadGAEcommerce = !0), ga("require", "ec")), ga("set", "currencyCode", u), "purchase" === r.event)) {
                                    for (var g, y = r.ecommerce.purchase.products.length, f = 0; f < y; f++)
                                        (g = r.ecommerce.purchase.products[f]), ga("ec:addProduct", { id: g.id || f, name: g.name, price: parseFloat(g.price).toFixed(2), quantity: g.quantity });
                                    ga("ec:setAction", "purchase", { id: r.ecommerce.purchase.actionField.id, revenue: parseFloat(a).toFixed(2) });
                                } else if ("addToCart" === r.event && r.ecommerce.add) {
                                    for (var g, y = r.ecommerce.add.products.length, f = 0; f < y; f++)
                                        (g = r.ecommerce.add.products[f]), ga("ec:addProduct", { id: g.id || f, name: g.name, price: parseFloat(g.price).toFixed(2), quantity: g.quantity });
                                    ga("ec:setAction", "add");
                                } else if ("removeFromCart" === r.event && r.ecommerce.remove) {
                                    for (var g, y = r.ecommerce.remove.products.length, f = 0; f < y; f++)
                                        (g = r.ecommerce.remove.products[f]), ga("ec:addProduct", { id: g.id || f, name: g.name, price: parseFloat(g.price).toFixed(2), quantity: g.quantity });
                                    ga("ec:setAction", "remove");
                                } else if ("viewProduct" === r.event && r.ecommerce.detail) {
                                    for (var g, y = r.ecommerce.detail.products.length, f = 0; f < y; f++)
                                        (g = r.ecommerce.detail.products[f]), ga("ec:addProduct", { id: g.id || f, name: g.name, price: parseFloat(g.price).toFixed(2), quantity: g.quantity });
                                    ga("ec:setAction", "detail");
                                }
                            } catch (e) {}
                            ga("send", { hitType: "pageview", page: e, title: t, params: r });
                        } else ga("send", { hitType: "pageview", page: e, title: t });
                    else ga("send", { hitType: "event", eventCategory: "tilda", eventAction: e, eventLabel: t, eventValue: a });
                if (window.mainMetrikaId && window.mainMetrikaId > 0 && "function" == typeof ym)
                    if (i) {
                        var h = { title: t };
                        a > 0 ? ((h.params = { order_price: a }), u && (h.params.currency = u), ym(window.mainMetrikaId, "hit", e, h)) : ym(window.mainMetrikaId, "hit", e, h);
                    } else a > 0 ? ((h = { order_price: a }), u && (h.currency = u), ym(window.mainMetrikaId, "reachGoal", e, h)) : ym(window.mainMetrikaId, "reachGoal", e);
                if (
                    (window.mainMetrika > "" &&
                        window[window.mainMetrika] &&
                        (i
                            ? a > 0
                                ? window[window.mainMetrika].hit(e, { title: t, order_price: a, params: r })
                                : window[window.mainMetrika].hit(e, { title: t })
                            : a > 0
                            ? window[window.mainMetrika].reachGoal(e, { title: t, params: r, order_price: a })
                            : window[window.mainMetrika].reachGoal(e, { title: t, referer: r })),
                    void 0 !== window.fbq && !1 === n)
                )
                    try {
                        if (i)
                            if (-1 === e.indexOf("tilda/") || (-1 === e.indexOf("/payment/") && -1 === e.indexOf("/submitted/")))
                                if (r && r.event && a > 0)
                                    if ("addToCart" === r.event && r.ecommerce.add) {
                                        for (var g, y = r.ecommerce.add.products.length, k = [], f = 0; f < y; f++) (g = r.ecommerce.add.products[f]), k.push(g.id || g.uid || g.name);
                                        window.fbq("track", "AddToCart", { content_ids: k, content_type: "product", value: a, currency: u });
                                    } else if ("viewProduct" === r.event && r.ecommerce.detail) {
                                        for (var g, y = r.ecommerce.detail.products.length, k = [], f = 0; f < y; f++) (g = r.ecommerce.detail.products[f]), k.push(g.id || g.uid || g.name);
                                        window.fbq("track", "ViewContent", { content_ids: k, content_type: "product", value: a, currency: u });
                                    } else e.indexOf("tilda/popup"), window.fbq("track", "ViewContent", { content_name: t, content_category: e });
                                else e.indexOf("tilda/popup"), window.fbq("track", "ViewContent", { content_name: t, content_category: e });
                            else a > 0 && u ? window.fbq("track", "InitiateCheckout", { content_name: t, content_category: e, value: a, currency: u }) : window.fbq("track", "Lead", { content_name: t, content_category: e });
                        else window.fbq("track", e, { content_name: t, value: a });
                    } catch (e) {}
                if (void 0 !== window.VK && void 0 !== window.VK.Retargeting && !1 === l)
                    try {
                        if (i) {
                            var d,
                                b = (d = document.getElementById("allrecords")) ? d.getAttribute("data-vk-price-list-id") : null,
                                _ = (b && parseInt(b)) || 0,
                                T = "",
                                A = !1,
                                E,
                                E,
                                E,
                                E,
                                E;
                            if (r && r.event)
                                if (((A = { products: [], currency_code: "", total_price: 0 }), "purchase" === r.event && r.ecommerce.purchase))
                                    if (a > 0 && _ > 0) {
                                        var g;
                                        A.currency_code = u;
                                        for (var y = r.ecommerce.purchase.products.length, k = [], f = 0; f < y; f++)
                                            (g = r.ecommerce.purchase.products[f]), A.products.push({ id: g.id || g.uid || g.name, price: g.price ? g.price : 0 }), (A.total_price = a);
                                        T = "init_checkout";
                                    } else T = "t-purchase";
                                else if ("addToCart" === r.event && r.ecommerce.add)
                                    if (a > 0 && _ > 0) {
                                        var g;
                                        A.currency_code = u;
                                        for (var y = r.ecommerce.add.products.length, k = [], f = 0; f < y; f++)
                                            (g = r.ecommerce.add.products[f]), A.products.push({ id: g.id || g.uid || g.name, price: g.price ? g.price : 0 }), (A.total_price = a);
                                        T = "add_to_cart";
                                    } else (T = "t-add-to-cart"), r.ecommerce.add[0] && r.ecommerce.add[0].uid && (T += "-" + r.ecommerce.add[0].uid);
                                else if ("viewProduct" === r.event && r.ecommerce.detail)
                                    if (a > 0 && _ > 0) {
                                        var g;
                                        A.currency_code = u;
                                        for (var y = r.ecommerce.detail.products.length, k = [], f = 0; f < y; f++)
                                            (g = r.ecommerce.detail.products[f]), A.products.push({ id: g.id || g.uid || g.name, price: g.price ? g.price : 0 }), (A.total_price = a);
                                        T = "view_product";
                                    } else (T = "t-view-product"), r.ecommerce.detail[0] && r.ecommerce.detail[0].uid && (T += "-" + r.ecommerce.detail[0].uid);
                                else if ("removeFromCart" === r.event && r.ecommerce.remmove)
                                    if (a > 0 && _ > 0) {
                                        var g;
                                        A.currency_code = u;
                                        for (var y = r.ecommerce.remove.products.length, k = [], f = 0; f < y; f++)
                                            (g = r.ecommerce.remove.products[f]), A.products.push({ id: g.id || g.uid || g.name, price: g.price ? g.price : 0 }), (A.total_price = a);
                                        T = "remove_from_cart";
                                    } else (T = "t-remove-product"), r.ecommerce.remove[0] && r.ecommerce.remove[0].uid && (T += "-" + r.ecommerce.remove[0].uid);
                                else T = r.event;
                            else if (-1 !== e.indexOf("tilda/") && -1 !== e.indexOf("/payment/")) T = "t-purchase-" + (E = (E = (E = e.replace("/tilda/", "")).replace("tilda/", "")).replace("/payment/", ""));
                            else if (-1 !== e.indexOf("tilda/") && -1 !== e.indexOf("/submitted/")) T = "t-lead-" + (E = (E = (E = e.replace("/tilda/", "")).replace("tilda/", "")).replace("/submitted/", ""));
                            else if (-1 !== e.indexOf("tilda/popup")) T = "t-" + (E = (E = e.replace("/tilda/", "")).replace("/", "-"));
                            else if (-1 !== e.indexOf("tilda/click")) T = "t-" + (E = (E = e.replace("/tilda/", "")).replace("/", "-"));
                            else T = "t-" + (E = e.replace("/", "-"));
                            _ > 0 && A && A.currency_code
                                ? (VK.Retargeting.Event("purchase"), VK.Retargeting.ProductEvent(_, T, A))
                                : (VK.Retargeting.Event(T), "t-purchase" === T.substring(0, 10) ? VK.Goal("purchase") : "t-lead" === T.substring(0, 6) && VK.Goal("lead"));
                        } else VK.Retargeting.Event(e);
                    } catch (e) {}
                if (window.mainMailruId > "0") {
                    var F = window._tmr || (window._tmr = []);
                    i
                        ? a > 0
                            ? F.push({ id: "" + window.mainMailruId, type: "pageView", url: e, value: a, start: new Date().getTime() })
                            : F.push({ id: "" + window.mainMailruId, type: "pageView", url: e, start: new Date().getTime() })
                        : a > 0
                        ? F.push({ id: "" + window.mainMailruId, type: "reachGoal", goal: e, value: a })
                        : F.push({ id: "" + window.mainMailruId, type: "reachGoal", goal: e });
                }
                "function" == typeof window.tildastat &&
                    (i ? (e.indexOf("payment") > 0 && e.indexOf("tilda/form") > -1 && (e = e.replace("tilda/form", "tilda/rec")), window.tildastat("pageview", { page: e })) : window.tildastat("pageview", { page: "/tilda/event/" + e }));
            }),
            (Tilda.saveUTM = function () {
                try {
                    var e = window.location.href,
                        t = "",
                        r = "";
                    if (-1 !== e.toLowerCase().indexOf("utm_") && "string" == typeof (t = (t = (e = e.toLowerCase()).split("?"))[1])) {
                        var a,
                            i = t.split("&");
                        for (var o in i) "amp;" === (a = i[o].split("="))[0].substring(0, 4) && (a[0] = a[0].substring(4)), "utm_" === a[0].substring(0, 4) && (r = r + i[o] + "|||");
                        if (r.length > 0) {
                            var d = new Date();
                            d.setDate(d.getDate() + 30), (document.cookie = "TILDAUTM=" + encodeURIComponent(r) + "; path=/; expires=" + d.toUTCString());
                        }
                    }
                } catch (e) {}
            }),
            "loading" !== document.readyState ? e() : document.addEventListener("DOMContentLoaded", e);
    })(),
    Element.prototype.matches ||
        (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector),
    Element.prototype.closest ||
        (Element.prototype.closest = function (e) {
            for (var t = this; t && 1 === t.nodeType; ) {
                if (Element.prototype.matches.call(t, e)) return t;
                t = t.parentElement || t.parentNode;
            }
            return null;
        });
