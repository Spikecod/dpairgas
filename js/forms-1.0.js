(window.t_forms__lang = (window.navigator.userLanguage || window.navigator.language).toUpperCase().slice(0, 2)),
    (window.scriptSysPayment = {}),
    (window.handlerSysPayment = {}),
    (window.isInitEventsZB = {}),
    (window.isInitEventsCustomMask = {}),
    (window.initForms = {}),
    (window.tildaForm = { versionLib: "02.001", endpoint: "forms.tildacdn.com", isRecaptchaScriptInit: !1, currentFormProccessing: !1 }),
    t_onReady(function () {
        var t = document.getElementById("allrecords");
        t && ((e = t.getAttribute("data-tilda-project-lang")) && (window.t_forms__lang = e), (r = t.getAttribute("data-tilda-root-zone")) && (window.tildaForm.endpoint = "forms.tildaapi." + r)), t_forms__initForms();
        var e = !!document.querySelector(".t706"),
            t = !!document.querySelector(".js-payment-systembox"),
            r = !!document.querySelector("input[name=tld_product]");
        (e || t || r) &&
            ((o = "tilda-forms-payments-1.0"),
            document.head.querySelector('script[src*="' + o + '"]') ||
                (((a = document.createElement("script")).type = "text/javascript"),
                (a.src = "https://static.tildacdn.com/js/" + o + ".min.js"),
                (a.onerror = function () {
                    console.error("Failed to load tilda-forms-payments: ", this.src);
                }),
                document.head.appendChild(a)));
        var o,
            a,
            r = window.t_forms__lang;
        "RU" !== r &&
            "EN" !== r &&
            ((o = "tilda-forms-dict-1.0"),
            document.head.querySelector('script[src*="' + o + '"]') ||
                (((a = document.createElement("script")).type = "text/javascript"),
                (a.src = "https://static.tildacdn.com/js/" + o + ".min.js"),
                (a.onerror = function () {
                    console.error("Failed to load tilda-forms-dictionary: ", this.src);
                }),
                document.head.appendChild(a)));
    }),
    (window.tildaForm.captchaCallback = function () {
        if (!window.tildaForm.currentFormProccessing || !window.tildaForm.currentFormProccessing.form) return !1;
        window.tildaForm.send(window.tildaForm.currentFormProccessing.form, window.tildaForm.currentFormProccessing.btn, window.tildaForm.currentFormProccessing.formtype, window.tildaForm.currentFormProccessing.formskey),
            (window.tildaForm.currentFormProccessing = !1);
    }),
    (window.tildaForm_customMasksLoad = function () {
        var t;
        !0 !== window.isInitEventsCustomMask &&
            (((t = document.createElement("script")).type = "text/javascript"),
            (t.src = "https://static.tildacdn.com/js/tilda-forms-custommask-1.0.min.js"),
            document.head.appendChild(t),
            (t.onload = function () {
                window.isInitEventsCustomMask = !0;
            }));
    }),
    (window.tildaForm_initMasks = function () {
        var t = document.querySelectorAll(".js-tilda-mask");
        if (t.length && !0 !== window.isInitEventsCustomMask)
            return (
                window.tildaForm_customMasksLoad(),
                void window.setTimeout(function () {
                    window.tildaForm_initMasks();
                }, 100)
            );
        !0 === window.isInitEventsCustomMask &&
            Array.prototype.forEach.call(t, function (t) {
                t_asyncLoad(t);
            });
    }),
    t_onReady(function () {
        window.tildaForm_initMasks();
    }),
    (window.tildaForm.validate = function (t) {
        t instanceof Element || (t = t[0]);
        for (var e, r, o = t.querySelectorAll(".js-tilda-rule"), a = [], n = !0, i = 0; i < o.length; i++) {
            var s = o[i],
                l = !!parseInt(s.getAttribute("data-tilda-req") || 0, 10),
                d = s.getAttribute("data-tilda-rule") || "none",
                c = "",
                u = "",
                m = s.getAttribute("data-tilda-rule-minlength") || 0,
                p = s.getAttribute("data-tilda-rule-maxlength") || 0,
                f = {},
                _ = s.value,
                w = "",
                y = s.getAttribute("type"),
                h = s.getAttribute("name"),
                g = t.getAttribute("data-formcart");
            (f.obj = s),
                (f.type = []),
                _ && _.length && ((w = _.replace(/[\s\u0000—\u001F\u2000-\u200F\uFEFF\u2028-\u202F\u205F-\u206F]/gi, "")), (_ = _.trim())),
                0 < _.length && (n = !1),
                (m = m && parseInt(m, 10)),
                (p = p && parseInt(p, 10));
            var b = !_.length && !w.length,
                y = "checkbox" === y || "radio" === y,
                h = !t.querySelectorAll('[name="' + h + '"]:checked').length;
            if (l && (b || (y && h))) f.type.push("req");
            else {
                switch (d) {
                    case "email":
                        (c = /^(?!\.)(?!.*\.\.)[a-zA-Zёа-яЁА-Я0-9\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD_\.\-\+]{0,63}[a-zA-Zёа-яЁА-Я0-9\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD_\-\+]@[a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéû0-9][a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéû0-9\.\-]{0,253}\.[a-zA-Zёа-яЁА-Я]{2,10}$/gi),
                            _.length && !_.match(c) && f.type.push("email");
                        break;
                    case "url":
                        (c = /^((https?|ftp):\/\/)?[a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéûşç0-9][a-zA-Zёа-яЁА-ЯЁёäöüÄÖÜßèéûşç0-9_\.\-]{0,253}\.[a-zA-Zёа-яЁА-Я]{2,10}\/?$/gi),
                            _.length && ((u = (u = (u = _.split("//")) && 1 < u.length ? u[1] : u[0]).split("/")) && u.length && u[0] ? (u = u[0]).match(c) || f.type.push("url") : ((u && !u[0]) || f.type.push("url"), (u = "")));
                        break;
                    case "phone":
                        var v = s.getAttribute("data-tilda-mask"),
                            E = "^[0-9()+-";
                        v && (-1 !== v.indexOf("*") ? (E += "a-zёа-я") : (-1 !== v.indexOf("a") && (E += "a-z"), -1 !== v.indexOf("а") && (E += "а-яё"))),
                            (E += "]+$"),
                            (c = new RegExp(E, "gi")),
                            ((w.length && !w.match(c)) ||
                                1 == (u = w.replace(/[^0-9]+/g, "")).indexOf("000") ||
                                (1 == u.indexOf("111") && "9" != u.substring(0, 1)) ||
                                (1 == u.indexOf("222") && "5" != u.substring(0, 1)) ||
                                1 == u.indexOf("333") ||
                                1 == u.indexOf("444") ||
                                (1 == u.indexOf("555") && "0" != u.substring(0, 1)) ||
                                (1 == u.indexOf("666") && "0" != u.substring(0, 1)) ||
                                (1 == u.indexOf("8888") && "4" != u.substring(0, 1))) &&
                                f.type.push("phone");
                        break;
                    case "number":
                        (c = /^[0-9]+$/gi), 0 < w.length && !w.match(c) && f.type.push("number");
                        break;
                    case "date":
                        0 < w.length &&
                            !w.match(
                                {
                                    "DD-MM-YYYY": /^(0[1-9]|1[0-9]|2[0-9]|3[01])[\-\.\/](0[1-9]|1[012])[\-\.\/][0-9]{4}$/,
                                    "MM-DD-YYYY": /^(0[1-9]|1[012])[\-\.\/](0[1-9]|1[0-9]|2[0-9]|3[01])[\-\.\/][0-9]{4}$/,
                                    "YYYY-MM-DD": /^[0-9]{4}[\-\.\/](0[1-9]|1[012])[\-\.\/](0[1-9]|1[0-9]|2[0-9]|3[01])$/,
                                }[s.getAttribute("data-tilda-dateformat")] || /^[0-9]{1,4}[\-\.\/][0-9]{1,2}[\-\.\/][0-9]{1,4}$/gi
                            ) &&
                            f.type.push("date");
                        break;
                    case "time":
                        (c = /^[0-9]{2}[:\.][0-9]{2}$/gi), 0 < w.length && !w.match(c) && f.type.push("time");
                        break;
                    case "name":
                        (c = /^([ЁёäöüÄÖÜßèéûҐґЄєІіЇїӐӑЙйК̆к̆Ӄ̆ӄ̆Ԛ̆ԛ̆Г̆г̆Ҕ̆ҕ̆ӖӗѢ̆ѣ̆ӁӂꚄ̆ꚅ̆ҊҋО̆о̆Ө̆ө̆Ꚍ̆ꚍ̆ЎўХ̆х̆Џ̆џ̆Ꚏ̆ꚏ̆Ꚇ̆ꚇ̆Ҽ̆ҽ̆Ш̆ш̆Ꚗ̆ꚗ̆Щ̆щ̆Ы̆ы̆Э̆э̆Ю̆ю̆Я̆я̆А́а́ЃѓД́д́Е́е́Ё́ёӘ́ә́З́з́И́и́І́і́Ї́ї́ЌќЛ́л́Н́н́О́о́Р́р́С́с́Т́т́У́у́Ӱ́ӱ́Ү́ү́Х́х́Ц́ц́Ы́ы́Э́э́Ӭ́ӭ́Ю́ю́Ю̈́ю̈́Я́я́Ѣ́ѣ́ҒғӺӻҒ̌ғ̌Ј̵ј̵ҞҟҜҝԞԟӨөҎҏҰұӾӿҸҹҌҍҢңҚқҒғӘәҺһІіҰұҮүӨөȺⱥꜺꜻƂƃɃƀȻȼꞒꞓƋƌĐđɆɇǤǥꞠꞡĦħƗɨƗ́ɨ́Ɨ̀ɨ̀Ɨ̂ɨ̂Ɨ̌ɨ̌Ɨ̃ɨ̃Ɨ̄ɨ̄Ɨ̈ɨ̈Ɨ̋ɨ̋Ɨ̏ɨ̏Ɨ̧ɨ̧Ɨ̧̀ɨ̧̀Ɨ̧̂ɨ̧̂Ɨ̧̌ɨ̧̌ᵼɈɉɟɟ̟ʄʄ̊ʄ̥K̵k̵ꝀꝁꝂꝃꝄꝅꞢꞣŁłł̓Ł̣ł̣ᴌȽƚⱠⱡꝈꝉƛƛ̓ꞤꞥꝊꝋØøǾǿØ̀ø̀Ø̂øØ̌ø̌Ø̄ø̄Ø̃ø̃Ø̨ø̨Ø᷎ø᷎ᴓⱣᵽꝐꝑꝖꝗꝘꝙɌɍꞦꞧꞨꞩẜẝŦŧȾⱦᵺꝤꝥꝦꝧɄʉɄ́ʉ́Ʉ̀ʉ̀Ʉ̂ʉ̂Ʉ̌ʉ̌Ʉ̄ʉ̄Ʉ̃ʉ̃Ʉ̃́ʉ̃́Ʉ̈ʉ̈ʉ̞ᵾU̸u̸ᵿꝞꝟw̸ɎɏƵƶA-Za-z\u00C0\u00C0-\u00C3\u00C8-\u00CA\u00CC\u00CD\u00D2-\u00D9\u00DA\u00DD\u00E0-\u00E3\u00E8\u00E9\u00EA\u00EC\u00ED\u00F2-\u00F5\u00F9\u00FA\u00FD\u0102\u0103\u0110\u0111\u0128\u0129\u0168\u0169\u01A0\u01A1\u01AF\u01B0\u1EA0\u1EA1-\u1EF9\u0027\u2019\u0300-\u03FF\u0400-\u04FF\u0500-\u05FF\u0600-\u06FF\u3040-\u30FF\u0041-\u007A\u00C0-\u02B8\uFB1D-\uFB1F\uFB2A-\uFB4E\u0E00-\u0E7F\u10A0-\u10FF\u3040-\u309F\u30A0-\u30FF\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD]{1,})([ЁёäöüÄÖÜßèéûҐґЄєІіЇїӐӑЙйК̆к̆Ӄ̆ӄ̆Ԛ̆ԛ̆Г̆г̆Ҕ̆ҕ̆ӖӗѢ̆ѣ̆ӁӂꚄ̆ꚅ̆ҊҋО̆о̆Ө̆ө̆Ꚍ̆ꚍ̆ЎўХ̆х̆Џ̆џ̆Ꚏ̆ꚏ̆Ꚇ̆ꚇ̆Ҽ̆ҽ̆Ш̆ш̆Ꚗ̆ꚗ̆Щ̆щ̆Ы̆ы̆Э̆э̆Ю̆ю̆Я̆я̆А́а́ЃѓД́д́Е́е́Ё́ёӘ́ә́З́з́И́и́І́і́Ї́ї́ЌќЛ́л́Н́н́О́о́Р́р́С́с́Т́т́У́у́Ӱ́ӱ́Ү́ү́Х́х́Ц́ц́Ы́ы́Э́э́Ӭ́ӭ́Ю́ю́Ю̈́ю̈́Я́я́Ѣ́ѣ́ҒғӺӻҒ̌ғ̌Ј̵ј̵ҞҟҜҝԞԟӨөҎҏҰұӾӿҸҹҌҍҢңҚқҒғӘәҺһІіҰұҮүӨөȺⱥꜺꜻƂƃɃƀȻȼꞒꞓƋƌĐđɆɇǤǥꞠꞡĦħƗɨƗ́ɨ́Ɨ̀ɨ̀Ɨ̂ɨ̂Ɨ̌ɨ̌Ɨ̃ɨ̃Ɨ̄ɨ̄Ɨ̈ɨ̈Ɨ̋ɨ̋Ɨ̏ɨ̏Ɨ̧ɨ̧Ɨ̧̀ɨ̧̀Ɨ̧̂ɨ̧̂Ɨ̧̌ɨ̧̌ᵼɈɉɟɟ̟ʄʄ̊ʄ̥K̵k̵ꝀꝁꝂꝃꝄꝅꞢꞣŁłł̓Ł̣ł̣ᴌȽƚⱠⱡꝈꝉƛƛ̓ꞤꞥꝊꝋØøǾǿØ̀ø̀Ø̂øØ̌ø̌Ø̄ø̄Ø̃ø̃Ø̨ø̨Ø᷎ø᷎ᴓⱣᵽꝐꝑꝖꝗꝘꝙɌɍꞦꞧꞨꞩẜẝŦŧȾⱦᵺꝤꝥꝦꝧɄʉɄ́ʉ́Ʉ̀ʉ̀Ʉ̂ʉ̂Ʉ̌ʉ̌Ʉ̄ʉ̄Ʉ̃ʉ̃Ʉ̃́ʉ̃́Ʉ̈ʉ̈ʉ̞ᵾU̸u̸ᵿꝞꝟw̸ɎɏƵƶA-Za-z\u00C0\u00C0-\u00C3\u00C8-\u00CA\u00CC\u00CD\u00D2-\u00D9\u00DA\u00DD\u00E0-\u00E3\u00E8\u00E9\u00EA\u00EC\u00ED\u00F2-\u00F5\u00F9\u00FA\u00FD\u0102\u0103\u0110\u0111\u0128\u0129\u0168\u0169\u01A0\u01A1\u01AF\u01B0\u1EA0\u1EA1-\u1EF9\u0041-\u007A\u00C0-\u02B8\u0300-\u03FF\u0400-\u04FF\u0500-\u05FF\u0600-\u06FF\u3040-\u30FF\uFB1D-\uFB1F\uFB2A-\uFB4E\u0E00-\u0E7F\u10A0-\u10FF\u3040-\u309F\u30A0-\u30FF\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD\-\'\‘\s\.]{0,})$/gi),
                            _.length && !_.match(c) && f.type.push("name");
                        break;
                    case "nameeng":
                        (c = /^([A-Za-z\s]{1,}((\-)?[A-Za-z\.\s](\')?){0,})*$/i), _.length && !_.match(c) && f.type.push("nameeng");
                        break;
                    case "namerus":
                        (c = /^([А-Яа-яЁё\s]{1,}((\-)?[А-Яа-яЁё\.\s](\')?){0,})*$/i), _.length && !_.match(c) && f.type.push("namerus");
                        break;
                    case "string":
                        (c = /^[A-Za-zА-Яа-я0-9ЁёЁёäöüÄÖÜßèéûӐӑЙйК̆к̆Ӄ̆ӄ̆Ԛ̆ԛ̆Г̆г̆Ҕ̆ҕ̆ӖӗѢ̆ѣ̆ӁӂꚄ̆ꚅ̆ҊҋО̆о̆Ө̆ө̆Ꚍ̆ꚍ̆ЎўХ̆х̆Џ̆џ̆Ꚏ̆ꚏ̆Ꚇ̆ꚇ̆Ҽ̆ҽ̆Ш̆ш̆Ꚗ̆ꚗ̆Щ̆щ̆Ы̆ы̆Э̆э̆Ю̆ю̆Я̆я̆А́а́ЃѓД́д́Е́е́Ё́ёӘ́ә́З́з́И́и́І́і́Ї́ї́ЌќЛ́л́Н́н́О́о́Р́р́С́с́Т́т́У́у́Ӱ́ӱ́Ү́ү́Х́х́Ц́ц́Ы́ы́Э́э́Ӭ́ӭ́Ю́ю́Ю̈́ю̈́Я́я́Ѣ́ѣ́ҒғӺӻҒ̌ғ̌Ј̵ј̵ҞҟҜҝԞԟӨөҎҏҰұӾӿҸҹҌҍҢңҚқҒғӘәҺһІіҰұҮүӨөȺⱥꜺꜻƂƃɃƀȻȼꞒꞓƋƌĐđɆɇǤǥꞠꞡĦħƗɨƗ́ɨ́Ɨ̀ɨ̀Ɨ̂ɨ̂Ɨ̌ɨ̌Ɨ̃ɨ̃Ɨ̄ɨ̄Ɨ̈ɨ̈Ɨ̋ɨ̋Ɨ̏ɨ̏Ɨ̧ɨ̧Ɨ̧̀ɨ̧̀Ɨ̧̂ɨ̧̂Ɨ̧̌ɨ̧̌ᵼɈɉɟɟ̟ʄʄ̊ʄ̥K̵k̵ꝀꝁꝂꝃꝄꝅꞢꞣŁłł̓Ł̣ł̣ᴌȽƚⱠⱡꝈꝉƛƛ̓ꞤꞥꝊꝋØøǾǿØ̀ø̀Ø̂øØ̌ø̌Ø̄ø̄Ø̃ø̃Ø̨ø̨Ø᷎ø᷎ᴓⱣᵽꝐꝑꝖꝗꝘꝙɌɍꞦꞧꞨꞩẜẝŦŧȾⱦᵺꝤꝥꝦꝧɄʉɄ́ʉ́Ʉ̀ʉ̀Ʉ̂ʉ̂Ʉ̌ʉ̌Ʉ̄ʉ̄Ʉ̃ʉ̃Ʉ̃́ʉ̃́Ʉ̈ʉ̈ʉ̞ᵾU̸u̸ᵿꝞꝟw̸ɎɏƵƶ\u0041-\u007A\u00C0-\u02B8\u0300-\u03FF\u0400-\u04FF\u0500-\u05FF\u0600-\u06FF\u3040-\u30FF\uFB1D-\uFB1F\uFB2A-\uFB4E\u0E00-\u0E7F\u10A0-\u10FF\u3040-\u309F\u30A0-\u30FF\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD,\.:;\"\'\`\-\_\+\?\!\%\$\@\*\&\^\s]$/i),
                            _.length && !_.match(c) && f.type.push("string");
                        break;
                    case "chosevalue":
                        "true" === s.getAttribute("data-option-selected") || f.type.push("chosevalue");
                        break;
                    case "promocode":
                        "y" !== g || !w.length || !window.tcart || (window.tcart.promocode && window.tcart.prodamount_discountsum) || f.type.push("promocode");
                        break;
                    case "deliveryreq":
                        f.type.push("deliveryreq");
                }
                0 < m && _.length && _.length < m && f.type.push("minlength"), 0 < p && _.length && _.length > p && f.type.push("maxlength");
            }
            f.type && f.type.length && (a[a.length] = f);
        }
        return (
            "y" === g &&
                ((e = void 0 !== window.tcart_minorder && 0 < window.tcart_minorder),
                (r = void 0 !== window.tcart_mincntorder && 0 < window.tcart_mincntorder),
                e && window.tcart.prodamount < window.tcart_minorder && ((f = { obj: {}, type: [] }).type.push("minorder"), a.push(f)),
                r && window.tcart.total < window.tcart_mincntorder && ((f = { obj: {}, type: [] }).type.push("minquantity"), a.push(f))),
            n && !a.length && (a = [{ obj: "none", type: ["emptyfill"] }]),
            a
        );
    }),
    (window.tildaForm.hideErrors = function (t) {
        var e, r, o, a, n, i, s;
        ("object" == typeof t && !t.length) ||
            (t instanceof Element || (t = t[0]),
            (e = t.querySelectorAll(".js-errorbox-all")),
            (r = t.querySelectorAll(".js-rule-error")),
            (o = t.querySelectorAll(".js-error-rule-all")),
            (a = t.querySelectorAll(".js-successbox")),
            (n = t.querySelectorAll(".js-error-control-box")),
            (i = t.querySelectorAll(".js-error-control-box .t-input-error")),
            (s = document.getElementById("tilda-popup-for-error")),
            Array.prototype.forEach.call(e, function (t) {
                t.style.display = "none";
            }),
            Array.prototype.forEach.call(r, function (t) {
                t.style.display = "none";
            }),
            Array.prototype.forEach.call(o, function (t) {
                t.innerHTML = "";
            }),
            Array.prototype.forEach.call(a, function (t) {
                t.style.display = "none";
            }),
            Array.prototype.forEach.call(i, function (t) {
                t.innerHTML = "";
            }),
            Array.prototype.forEach.call(n, function (t) {
                t_removeClass(t, "js-error-control-box");
            }),
            t_removeClass(t, "js-send-form-error"),
            t_removeClass(t, "js-send-form-success"),
            s && t_fadeOut(s));
    }),
    (window.tildaForm.showErrorInPopup = function (t, e) {
        if ((t instanceof Element || (t = t[0]), !e || !e.length)) return !1;
        var r,
            o = t.getAttribute("id"),
            a = (a = t.getAttribute("data-inputbox")) || ".blockinput",
            n = "",
            i = !1,
            s = "",
            l = "",
            d = "",
            c = document.getElementById("tilda-popup-for-error");
        c ||
            (document.body.insertAdjacentHTML(
                "beforeend",
                '<div id="tilda-popup-for-error" class="js-form-popup-errorbox tn-form__errorbox-popup" style="display: none;"> <div class="t-form__errorbox-text t-text t-text_xs"> error </div> <div class="tn-form__errorbox-close js-errorbox-close"> <div class="tn-form__errorbox-close-line tn-form__errorbox-close-line-left"></div> <div class="tn-form__errorbox-close-line tn-form__errorbox-close-line-right"></div> </div> </div>'
            ),
            t_addEventListener((c = document.getElementById("tilda-popup-for-error")), "click", function (t) {
                if (((t = t || window.event).target || t.srcElement).closest(".js-errorbox-close")) return t.preventDefault ? t.preventDefault() : (t.returnValue = !1), t_fadeOut(c), !1;
            }));
        for (var u, m, p = 0; p < e.length; p++)
            if (e[p] && e[p].obj) {
                if (0 === p && "none" === e[p].obj) {
                    d = '<p class="t-form__errorbox-item">' + t_forms__getMsg("emptyfill") + "</p>";
                    break;
                }
                var f = e[p].obj;
                f instanceof Element || (f = f[0]), f && (n = f.closest(a)), n && ((s = n.querySelectorAll(".t-input-error")), t_addClass(n, "js-error-control-box"), s.length && (i = !0));
                for (var _ = 0; _ < e[p].type.length; _++) {
                    var w = e[p].type[_],
                        y = t_forms__getMsg(w),
                        l = "";
                    (r = t.querySelector(".js-rule-error-" + w))
                        ? (r.textContent && r.innerText) || !y || -1 !== d.indexOf(y)
                            ? ((l = r.textContent || r.innerText), -1 === d.indexOf(y) && (d = d + '<p class="t-form__errorbox-item">' + l + "</p>"))
                            : (d = d + '<p class="t-form__errorbox-item">' + y + "</p>")
                        : y && -1 === d.indexOf(y) && (d = d + '<p class="t-form__errorbox-item">' + y + "</p>"),
                        i &&
                            (!l && t_forms__getMsg(w + "field") ? (l = t_forms__getMsg(w + "field")) : y && (l = y),
                            l &&
                                n &&
                                ((s = n.querySelectorAll(".t-input-error")),
                                Array.prototype.forEach.call(s, function (t) {
                                    (t.innerHTML = l), t_fadeIn(t);
                                })));
                }
            }
        function h(t) {
            "INPUT" === ((t = t || window.event).target || t.srcElement).tagName &&
                ((t = u.querySelectorAll("form .t-input-error")),
                t_fadeOut(c),
                Array.prototype.forEach.call(t, function (t) {
                    (t.innerHTML = ""), t_fadeOut(t);
                }),
                window.t_forms__errorTimerID && (window.clearTimeout(window.t_forms__errorTimerID), (window.t_forms__errorTimerID = 0)),
                (window.isInitEventsZB[o] = !0));
        }
        return (
            d &&
                ((c.querySelector(".t-form__errorbox-text").innerHTML = d),
                (m = c.querySelectorAll(".t-form__errorbox-item")),
                Array.prototype.forEach.call(m, function (t) {
                    t.style.display = "block";
                }),
                t_fadeIn(c)),
            window.t_forms__errorTimerID && window.clearTimeout(window.t_forms__errorTimerID),
            (window.t_forms__errorTimerID = window.setTimeout(function () {
                t_fadeOut(c),
                    (s = t.querySelectorAll(".t-input-error")),
                    Array.prototype.forEach.call(s, function (t) {
                        (t.innerHTML = ""), t_fadeOut(t);
                    }),
                    (window.t_forms__errorTimerID = 0);
            }, 1e4)),
            window.isInitEventsZB[o] ||
                ((u = t.closest(".r")),
                (m = "focus"),
                document.addEventListener || (m = "focusin"),
                t_removeEventListener(u, m, h),
                t_addEventListener(u, m, h, !0),
                t_removeEventListener(u, "change", h),
                t_addEventListener(u, "change", h, !0)),
            t_triggerEvent(t, "tildaform:aftererror"),
            !0
        );
    }),
    (window.tildaForm.showErrors = function (t, e) {
        if ((t instanceof Element || (t = t[0]), !e || !e.length)) return !1;
        if ("y" === t.getAttribute("data-error-popup")) return tildaForm.showErrorInPopup(t, e);
        for (var r = (r = t.getAttribute("data-inputbox")) || ".blockinput", o = "", a = !1, n = "", i = "", s = "", l = 0; l < e.length; l++)
            if (e[l] && e[l].obj) {
                if (0 === l && "none" === e[l].obj) {
                    n = t.querySelectorAll(".js-rule-error-all");
                    for (var d = 0; d < n.length; d++) (n[d].innerHTML = t_forms__getMsg("emptyfill")), (n[d].style.display = "block");
                    break;
                }
                var c = e[l].obj;
                c instanceof Element || (c = c[0]), c && (o = c.closest(r)), o && ((i = o.querySelectorAll(".t-input-error")), t_addClass(o, "js-error-control-box"), 0 < i.length && (a = !0));
                for (d = 0; d < e[l].type.length; d++) {
                    var u = e[l].type[d],
                        s = "";
                    if ((1, (n = t.querySelectorAll(".js-rule-error-" + u)).length))
                        for (var m = 0; m < n.length; m++)
                            n[m].getAttribute("data-rule-filled") || ((n[m].textContent && n[m].innerText) || !t_forms__getMsg(u) ? (s = n[0].textContent || n[0].innerText) : (n[m].innerHTML = t_forms__getMsg(u))),
                                (n[m].style.display = "block");
                    else if (t_forms__getMsg(u) && (n = t.querySelectorAll(".js-rule-error-all")).length) for (m = 0; m < n.length; m++) (n[m].innerHTML = t_forms__getMsg(u)), (n[m].style.display = "block");
                    a &&
                        (!s && t_forms__getMsg(u + "field") ? (s = t_forms__getMsg(u + "field")) : !s && t_forms__getMsg(u) && (s = t_forms__getMsg(u)),
                        s &&
                            o &&
                            ((i = o.querySelectorAll(".t-input-error")),
                            Array.prototype.forEach.call(i, function (t) {
                                t.innerHTML = s;
                            })));
                }
            }
        var p = t.querySelectorAll(".js-errorbox-all");
        return (
            Array.prototype.forEach.call(p, function (t) {
                t.style.display = "block";
            }),
            t_triggerEvent(t, "tildaform:aftererror"),
            !0
        );
    }),
    (window.tildaForm.addTildaCaptcha = function (t, e) {
        t instanceof Element || (t = t[0]);
        var r,
            o = document.getElementById("tildaformcaptchabox"),
            a = document.getElementById("js-tildaspec-captcha");
        o && t_removeEl(o), a && t_removeEl(a), t.insertAdjacentHTML("beforeend", '<input type="hidden" name="tildaspec-tildacaptcha" id="js-tildaspec-captcha">');
        try {
            r = new Date().getTime() + "=" + parseInt(8 * Math.random(), 10);
        } catch (t) {
            r = "rnd=" + parseInt(8 * Math.random(), 10);
        }
        e =
            '<div id="tildaformcaptchabox" style="z-index: 99999999999; position:fixed; text-align: center; vertical-align: middle; top: 0px; left:0px; bottom: 0px; right: 0px; background: rgba(255,255,255,0.97);"><iframe id="captchaIframeBox" src="//' +
            window.tildaForm.endpoint +
            "/procces/captcha/?tildaspec-formid=" +
            t.getAttribute("id") +
            "&tildaspec-formskey=" +
            e +
            "&" +
            r +
            '" frameborder="0" width="100%" height="100%"></iframe></div>';
        document.body.insertAdjacentHTML("beforeend", e), window.removeEventListener("message", checkVerifyTildaCaptcha), window.addEventListener("message", checkVerifyTildaCaptcha);
    }),
    (window.tildaForm.addMebersInfoToForm = function (t) {
        t instanceof Element || (t = t[0]);
        try {
            window.tildaForm.tildamember = {};
            var e = t.querySelector(".js-tilda-mauserinfo");
            if ((e && t_removeEl(e), !window.mauser || !window.mauser.code || !window.mauser.email)) return !1;
            window.mauser.name && (window.tildaForm.tildamember.name = window.mauser.name), (window.tildaForm.tildamember.email = window.mauser.email), (window.tildaForm.tildamember.code = window.mauser.code);
        } catch (t) {
            return console.log("addMebersInfoToForm exception: ", t), !1;
        }
        return !0;
    }),
    (window.tildaForm.closeSuccessPopup = function () {
        var t = document.getElementById("tildaformsuccesspopup");
        t && (t_removeClass(document.body, "t-body_success-popup-showed"), /iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream && window.tildaForm.unlockBodyScroll(), t_fadeOut(t));
    }),
    (window.tildaForm.lockBodyScroll = function () {
        var t,
            e = document.body;
        t_hasClass(e, "t-body_scroll-locked") ||
            ((t = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop),
            t_addClass(e, "t-body_scroll-locked"),
            (e.style.top = "-" + t + "px"),
            e.setAttribute("data-popup-scrolltop", t));
    }),
    (window.tildaForm.unlockBodyScroll = function () {
        var t,
            e = document.body;
        t_hasClass(e, "t-body_scroll-locked") &&
            ((t = e.getAttribute("data-popup-scrolltop")), t_removeClass(e, "t-body_scroll-locked"), (e.style.top = null), e.removeAttribute("data-popup-scrolltop"), (document.documentElement.scrollTop = parseInt(t)));
    }),
    (window.tildaForm.showSuccessPopup = function (t) {
        var e = "",
            r = document.getElementById("tildaformsuccesspopup"),
            o = document.getElementById("tildaformsuccesspopuptext"),
            a = document.body;
        r ||
            ((e +=
                '<style media="screen"> .t-form-success-popup { display: none; position: fixed; background-color: rgba(0,0,0,.8); top: 0px; left: 0px; width: 100%; height: 100%; z-index: 10000; overflow-y: auto; cursor: pointer; } .t-body_success-popup-showed { height: 100vh; min-height: 100vh; overflow: hidden; } .t-form-success-popup__window { width: 100%; max-width: 400px; position: absolute; top: 50%; -webkit-transform: translateY(-50%); transform: translateY(-50%); left: 0px; right: 0px; margin: 0 auto; padding: 20px; box-sizing: border-box; } .t-form-success-popup__wrapper { background-color: #fff; padding: 40px 40px 50px; box-sizing: border-box; border-radius: 5px; text-align: center; position: relative; cursor: default; } .t-form-success-popup__text { padding-top: 20px; } .t-form-success-popup__close-icon { position: absolute; top: 14px; right: 14px; cursor: pointer; } @media screen and (max-width: 480px) { .t-form-success-popup__text { padding-top: 10px; } .t-form-success-popup__wrapper { padding-left: 20px; padding-right: 20px; } } </style>'),
            (e +=
                '<div class="t-form-success-popup" style="display:none;" id="tildaformsuccesspopup"> <div class="t-form-success-popup__window"> <div class="t-form-success-popup__wrapper"> <svg class="t-form-success-popup__close-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" class="t657__icon-close" viewBox="0 0 23 23"> <g fill-rule="evenodd"> <path d="M0 1.41L1.4 0l21.22 21.21-1.41 1.42z"/> <path d="M21.21 0l1.42 1.4L1.4 22.63 0 21.21z"/> </g> </svg> <svg width="50" height="50" fill="#62C584"> <path d="M25.1 49.28A24.64 24.64 0 0 1 .5 24.68 24.64 24.64 0 0 1 25.1.07a24.64 24.64 0 0 1 24.6 24.6 24.64 24.64 0 0 1-24.6 24.61zm0-47.45A22.87 22.87 0 0 0 2.26 24.68 22.87 22.87 0 0 0 25.1 47.52a22.87 22.87 0 0 0 22.84-22.84A22.87 22.87 0 0 0 25.1 1.83z"/> <path d="M22.84 30.53l-4.44-4.45a.88.88 0 1 1 1.24-1.24l3.2 3.2 8.89-8.9a.88.88 0 1 1 1.25 1.26L22.84 30.53z"/> </svg> <div class="t-form-success-popup__text t-descr t-descr_sm" id="tildaformsuccesspopuptext"> Thank You! </div> </div> </div> </div>'),
            a.insertAdjacentHTML(
                "beforeend",
                '<style media="screen"> .t-form-success-popup { display: none; position: fixed; background-color: rgba(0,0,0,.8); top: 0px; left: 0px; width: 100%; height: 100%; z-index: 10000; overflow-y: auto; cursor: pointer; } .t-body_success-popup-showed { height: 100vh; min-height: 100vh; overflow: hidden; } .t-form-success-popup__window { width: 100%; max-width: 400px; position: absolute; top: 50%; -webkit-transform: translateY(-50%); transform: translateY(-50%); left: 0px; right: 0px; margin: 0 auto; padding: 20px; box-sizing: border-box; } .t-form-success-popup__wrapper { background-color: #fff; padding: 40px 40px 50px; box-sizing: border-box; border-radius: 5px; text-align: center; position: relative; cursor: default; } .t-form-success-popup__text { padding-top: 20px; } .t-form-success-popup__close-icon { position: absolute; top: 14px; right: 14px; cursor: pointer; } @media screen and (max-width: 480px) { .t-form-success-popup__text { padding-top: 10px; } .t-form-success-popup__wrapper { padding-left: 20px; padding-right: 20px; } } </style><div class="t-form-success-popup" style="display:none;" id="tildaformsuccesspopup"> <div class="t-form-success-popup__window"> <div class="t-form-success-popup__wrapper"> <svg class="t-form-success-popup__close-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" class="t657__icon-close" viewBox="0 0 23 23"> <g fill-rule="evenodd"> <path d="M0 1.41L1.4 0l21.22 21.21-1.41 1.42z"/> <path d="M21.21 0l1.42 1.4L1.4 22.63 0 21.21z"/> </g> </svg> <svg width="50" height="50" fill="#62C584"> <path d="M25.1 49.28A24.64 24.64 0 0 1 .5 24.68 24.64 24.64 0 0 1 25.1.07a24.64 24.64 0 0 1 24.6 24.6 24.64 24.64 0 0 1-24.6 24.61zm0-47.45A22.87 22.87 0 0 0 2.26 24.68 22.87 22.87 0 0 0 25.1 47.52a22.87 22.87 0 0 0 22.84-22.84A22.87 22.87 0 0 0 25.1 1.83z"/> <path d="M22.84 30.53l-4.44-4.45a.88.88 0 1 1 1.24-1.24l3.2 3.2 8.89-8.9a.88.88 0 1 1 1.25 1.26L22.84 30.53z"/> </svg> <div class="t-form-success-popup__text t-descr t-descr_sm" id="tildaformsuccesspopuptext"> Thank You! </div> </div> </div> </div>'
            ),
            (r = document.getElementById("tildaformsuccesspopup")),
            (o = document.getElementById("tildaformsuccesspopuptext")),
            (e = r.querySelector(".t-form-success-popup__close-icon")),
            t_addEventListener(r, "click", function (t) {
                ((t = t || window.event).target || t.srcElement) === this && window.tildaForm.closeSuccessPopup();
            }),
            t_addEventListener(e, "click", function () {
                window.tildaForm.closeSuccessPopup();
            }),
            t_addEventListener(a, "keydown", function (t) {
                27 == ((t = t || window.event).keyCode || t.which) && window.tildaForm.closeSuccessPopup();
            })),
            (o.innerHTML = t),
            t_fadeIn(r),
            t_addClass(a, "t-body_success-popup-showed"),
            /iPhone|iPad|iPod/i.test(navigator.userAgent) &&
                !window.MSStream &&
                setTimeout(function () {
                    window.tildaForm.lockBodyScroll();
                }, 500);
    }),
    (window.tildaForm.successEnd = function (form, successUrl, successCallback) {
        form instanceof Element || (form = form[0]);
        var successBox = form.querySelector(".js-successbox"),
            successStr = t_forms__getMsg("success"),
            dataSuccessMessage;
        successBox &&
            ((dataSuccessMessage = successBox.getAttribute("data-success-message")),
            dataSuccessMessage ? (successBox.innerHTML = dataSuccessMessage) : (successBox.textContent && successBox.innerText) || dataSuccessMessage || !successStr || (successBox.innerHTML = successStr),
            "y" === form.getAttribute("data-success-popup") ? window.tildaForm.showSuccessPopup(successBox.innerHTML) : (successBox.style.display = "block")),
            t_addClass(form, "js-send-form-success"),
            successCallback && 0 === successCallback.indexOf("window.") && (successCallback = successCallback.split(".")[1]),
            successCallback && "function" == typeof window[successCallback]
                ? "undefined" != typeof jQuery
                    ? eval(successCallback + "($(form))")
                    : eval(successCallback + "(form)")
                : successUrl &&
                  setTimeout(function () {
                      window.location.href = successUrl;
                  }, 500),
            window.tildaForm.clearTCart(form);
        var upwidgetRemoveBtns = form.querySelectorAll(".t-upwidget-container__data_table_actions_remove svg"),
            inputText = form.querySelectorAll('input[type="text"]'),
            inputPhone = form.querySelectorAll('input[type="tel"], input[type="hidden"][data-tilda-rule="phone"]'),
            inputTextarea = form.querySelectorAll("textarea");
        Array.prototype.forEach.call(upwidgetRemoveBtns, function (t) {
            t_triggerEvent(t, "click");
        }),
            Array.prototype.forEach.call(inputText, function (t) {
                t.value = "";
            }),
            Array.prototype.forEach.call(inputPhone, function (t) {
                t.value = "";
            }),
            Array.prototype.forEach.call(inputTextarea, function (t) {
                (t.innerHTML = ""), (t.value = "");
            }),
            "undefined" != typeof jQuery && jQuery(form).data("tildaformresult", { tranId: "0", orderId: "0" }),
            (form.tildaTranId = "0"),
            (form.tildaOrderId = "0");
    }),
    (window.tildaForm.clearTCart = function (t) {
        if ((t instanceof Element || (t = t[0]), "y" === t.getAttribute("data-formcart"))) {
            if (((window.clearTCart = !0), (window.tcart = { amount: 0, currency: "", system: "", products: [] }), (window.tcart.system = "none"), "object" == typeof localStorage))
                try {
                    localStorage.removeItem("tcart");
                } catch (t) {
                    console.error("Your web browser does not support localStorage. Code status: ", t);
                }
            try {
                delete window.tcart, tcart__loadLocalObj();
            } catch (t) {}
            window.tcart_success = "yes";
        }
    }),
    (window.tildaForm.send = function (form, btnSubmit, formType, formKey) {
        form instanceof Element || (form = form[0]), btnSubmit instanceof Element || (btnSubmit = btnSubmit[0]);
        var allRecords = document.getElementById("allrecords"),
            pageId = allRecords.getAttribute("data-tilda-page-id"),
            projectId = allRecords.getAttribute("data-tilda-project-id"),
            formId = form.getAttribute("id"),
            dataFormCart = form.getAttribute("data-formcart");
        (window.tildaForm.tildapayment = !1), ("y" !== dataFormCart && !form.closest(".t706__orderform")) || window.tildaForm.addPaymentInfoToForm(form);
        try {
            window.mauser && window.tildaForm.addMebersInfoToForm(form);
        } catch (error) {}
        var inputItsGood = form.querySelector('input[name="form-spec-comments"]');
        if (
            (inputItsGood ||
                form.insertAdjacentHTML(
                    "beforeend",
                    '<div style="position: absolute; left: -5000px; bottom: 0; display: none;"><input type="text" name="form-spec-comments" value="Its good" class="js-form-spec-comments" tabindex="-1" /></div>'
                ),
            2 === formType || (!formType && formKey))
        ) {
            var tildaSpecs = {
                "tildaspec-cookie": document.cookie,
                "tildaspec-referer": window.location.href,
                "tildaspec-formid": formId,
                "tildaspec-formskey": formKey,
                "tildaspec-version-lib": window.tildaForm.versionLib,
                "tildaspec-pageid": pageId,
                "tildaspec-projectid": projectId,
                "tildaspec-lang": window.t_forms__lang,
            };
            for (spec in tildaSpecs) {
                var hiddenInput = form.querySelector('input[name="' + spec + '"]');
                hiddenInput || (form.insertAdjacentHTML("beforeend", '<input type="hidden" name="' + spec + '" value="">'), (hiddenInput = form.querySelector('input[name="' + spec + '"]')), (hiddenInput.value = tildaSpecs[spec]));
            }
            try {
                (hiddenInput = form.querySelector("input[name=tildaspec-fp]")),
                    hiddenInput || (form.insertAdjacentHTML("beforeend", '<input type="hidden" name="tildaspec-fp" value="">'), (hiddenInput = form.querySelector("input[name=tildaspec-fp]"))),
                    window.tildastat
                        ? (hiddenInput.value = window.tildastat("fingerprint"))
                        : (hiddenInput.value = "st" + window.pageYOffset + "w" + window.innerWidth + "h" + window.innerHeight + "ft" + form.getBoundingClientRect().top + window.pageYOffset);
            } catch (error) {}
            (inputItsGood = form.querySelector(".js-form-spec-comments")), inputItsGood && (inputItsGood.value = "");
            var formUrl = "https://" + window.tildaForm.endpoint + "/procces/",
                dataForm = [],
                arrFilter = [];
            if (
                ((dataForm = t_serializeArray(form)),
                Array.prototype.forEach.call(dataForm, function (t) {
                    -1 === t.name.indexOf("tildadelivery-") && arrFilter.push(t);
                }),
                (dataForm = arrFilter),
                window.tildaForm.tildapayment && window.tildaForm.tildapayment.products)
            )
                dataForm.push({ name: "tildapayment", value: JSON.stringify(window.tildaForm.tildapayment) });
            else if (form.closest(".t706__orderform")) return !1;
            window.tildaForm.tildamember && window.tildaForm.tildamember.code && dataForm.push({ name: "tildamember", value: JSON.stringify(window.tildaForm.tildamember) }), (dataForm = t_forms__formData(dataForm));
            var startRequest = Date.now();
            t_triggerEvent(form, "tildaform:beforesend");
            var xhr = new XMLHttpRequest();
            return (
                xhr.open("POST", formUrl, !0),
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
                xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01"),
                (xhr.onreadystatechange = function () {
                    if (4 === xhr.readyState)
                        if (200 <= xhr.status && xhr.status < 400) {
                            var data = xhr.responseText;
                            if (data) {
                                var objData = JSON.parse(data);
                                if ("object" == typeof objData) {
                                    var dataSuccessUrl = form.getAttribute("data-success-url"),
                                        dataSuccessCallback = form.getAttribute("data-success-callback"),
                                        dataFormSendedCallback = form.getAttribute("data-formsended-callback");
                                    if ((t_removeClass(btnSubmit, "t-btn_sending"), (btnSubmit.tildaSendingStatus = "0"), objData && objData.error)) {
                                        (dataSuccessUrl = ""), (dataSuccessCallback = "");
                                        var msgContainers = t_forms__getErrorContainers(form, ""),
                                            errorBoxes = msgContainers.errorBoxes,
                                            allError = msgContainers.allError;
                                        Array.prototype.forEach.call(allError, function (t) {
                                            t.style.display = "block";
                                        }),
                                            Array.prototype.forEach.call(errorBoxes, function (t) {
                                                (t.innerHTML = objData.error), (t.style.display = "block");
                                            }),
                                            t_addClass(form, "js-send-form-error"),
                                            t_triggerEvent(form, "tildaform:aftererror"),
                                            window.t_cart__discounts && window.localStorage.removeItem("tcart_discounts");
                                    } else {
                                        if (objData && objData.needcaptcha) return formKey ? void window.tildaForm.addTildaCaptcha(form, formKey) : void alert("Server busy. Please try again later.");
                                        var formResult = {},
                                            strValue,
                                            strValue;
                                        objData && objData.results && objData.results[0]
                                            ? ((strValue = objData.results[0]),
                                              (strValue = strValue.split(":")),
                                              (formResult.tranId = strValue[0] + ":" + strValue[1]),
                                              (formResult.orderId = strValue[2] || "0"),
                                              formResult.orderId && "0" !== formResult.orderId && (window.tildaForm.orderIdForStat = formResult.orderId))
                                            : ((formResult.tranId = "0"), (formResult.orderId = "0")),
                                            "undefined" != typeof jQuery && jQuery(form).data("tildaformresult", formResult),
                                            (form.tildaTranId = formResult.tranId),
                                            (form.tildaOrderId = formResult.orderId);
                                        var dataEventName = form.getAttribute("data-tilda-event-name") || "",
                                            dataEventName =
                                                dataEventName ||
                                                ("y" === dataFormCart &&
                                                objData &&
                                                ((objData.next &&
                                                    objData.next.type &&
                                                    ("function" !== objData.next.type || (objData.next.value && ("stripev3" === objData.next.value.sysname || "outersite" === objData.next.value.installation)))) ||
                                                    !objData.next)
                                                    ? "/tilda/" + formId + "/payment/"
                                                    : "/tilda/" + formId + "/submitted/"),
                                            title = "Send data from form " + formId,
                                            price = 0,
                                            product = "",
                                            priceEl = form.querySelector(".js-tilda-price");
                                        if (window.Tilda && "function" == typeof window.Tilda.sendEventToStatistics) {
                                            window.tildaForm.tildapayment && window.tildaForm.tildapayment.amount
                                                ? ((price = window.tildaForm.tildapayment.amount), 0 < parseFloat(price) && (title = "Order " + formResult.orderId))
                                                : priceEl && ((price = priceEl.value), 0 < parseFloat(price) && (title = "Order " + formResult.orderId));
                                            try {
                                                window.Tilda.sendEventToStatistics(dataEventName, title, product, price);
                                            } catch (error) {
                                                console.error("Error while sending statistics. Code status: ", error);
                                            }
                                            window.dataLayer && window.dataLayer.push({ event: "submit_" + formId });
                                        } else {
                                            try {
                                                ga && "tilda" !== window.mainTracker && ga("send", { hitType: "pageview", page: dataEventName, title: title }),
                                                    window.mainMetrika && window[window.mainMetrika] && window[window.mainMetrika].hit(dataEventName, { title: title, referer: window.location.href });
                                            } catch (error) {
                                                console.error("Error while sending main metrica. Code status: ", error);
                                            }
                                            window.dataLayer && window.dataLayer.push({ event: "submit_" + formId });
                                        }
                                        try {
                                            t_triggerEvent(form, "tildaform:aftersuccess"),
                                                dataFormSendedCallback && "function" == typeof jQuery ? eval(dataFormSendedCallback + "($(form));") : dataFormSendedCallback && eval(dataFormSendedCallback + "(form);");
                                        } catch (error) {
                                            console.error("Error while call success callback. Code status: ", error);
                                        }
                                        if (objData && objData.next && objData.next.type) return window.tildaForm.payment(form, objData.next), (dataSuccessUrl = ""), !1;
                                        window.tildaForm.successEnd(form, dataSuccessUrl, dataSuccessCallback);
                                    }
                                }
                            }
                        } else {
                            var tsDelta = Date.now() - startRequest;
                            t_removeClass(btnSubmit), (btnSubmit.tildaSendingStatus = "0");
                            var msgContainers = t_forms__getErrorContainers(form, ""),
                                errorBoxes = msgContainers.errorBoxes,
                                allError = msgContainers.allError;
                            if (!xhr || (0 == xhr.status && tsDelta < 100))
                                Array.prototype.forEach.call(allError, function (t) {
                                    t.innerHTML = "Request error (sending form data). Please check internet connection...";
                                });
                            else {
                                if (xhr && (500 <= xhr.status || 408 == xhr.status || 410 == xhr.status || 429 == xhr.status || "timeout" == xhr.statusText) && -1 !== window.tildaForm.endpoint.indexOf("forms.tilda"))
                                    return (window.tildaForm.endpoint = "forms2.tildacdn.com"), window.tildaForm.send(form, btnSubmit, formType, formKey), !1;
                                xhr && xhr.responseText
                                    ? Array.prototype.forEach.call(allError, function (t) {
                                          t.innerHTML = "[" + xhr.status + "] " + xhr.responseText + ". Please, try again later.";
                                      })
                                    : xhr && xhr.statusText
                                    ? Array.prototype.forEach.call(allError, function (t) {
                                          t.innerHTML = "Error [" + xhr.status + ", " + xhr.statusText + "]. Please, try again later.";
                                      })
                                    : Array.prototype.forEach.call(allError, function (t) {
                                          t.innerHTML = "[" + xhr.status + "] Unknown error. Please, try again later.";
                                      });
                            }
                            Array.prototype.forEach.call(allError, function (t) {
                                t.style.display = "block";
                            }),
                                Array.prototype.forEach.call(errorBoxes, function (t) {
                                    t.style.display = "block";
                                }),
                                t_addClass(form, "js-send-form-error"),
                                t_triggerEvent(form, "tildaform:aftererror");
                        }
                }),
                xhr.send(dataForm),
                !1
            );
        }
        if ("y" !== form.getAttribute("data-is-formajax")) return -1 == form.getAttribute("action").indexOf(window.tildaForm.endpoint) && (t_removeClass(btnSubmit, "t-btn_sending"), (btnSubmit.tildaSendingStatus = "3"), form.submit(), !0);
        var dataForm = {};
        (dataForm = t_serializeArray(form)),
            window.tildaForm.tildapayment && window.tildaForm.tildapayment.amount && dataForm.push({ name: "tildapayment", value: JSON.stringify(window.tildaForm.tildapayment) }),
            (dataForm = t_forms__formData(dataForm));
        var xhr = new XMLHttpRequest();
        return (
            xhr.open("POST", form.getAttribute("action"), !0),
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
            xhr.setRequestHeader("Accept", "text/plain, */*; q=0.01"),
            (xhr.onreadystatechange = function () {
                if (4 === xhr.readyState)
                    if (200 <= xhr.status && xhr.status < 400) {
                        var t = form.querySelector(".js-successbox"),
                            e = form.getAttribute("data-success-url"),
                            r = form.getAttribute("data-success-callback");
                        if ((t_removeClass(btnSubmit, "t-btn_sending"), (btnSubmit.tildaSendingStatus = "0"), (l = xhr.responseText)))
                            if ("{" == l.substring(0, 1)) {
                                var o = JSON.parse(l);
                                if ("object" == typeof o)
                                    if (o && o.message && "OK" !== o.message) t.innerHTML = o.message;
                                    else if (o && o.error) {
                                        var a = (s = t_forms__getErrorContainers(form, "Unknown error. Please, try again later.")).errorBoxes,
                                            n = s.allError;
                                        return (
                                            Array.prototype.forEach.call(n, function (t) {
                                                (t.style.display = "block"), (t.innerHTML = o.error);
                                            }),
                                            Array.prototype.forEach.call(a, function (t) {
                                                t.style.display = "block";
                                            }),
                                            t_addClass(form, "js-send-form-error"),
                                            t_triggerEvent(form, "tildaform:aftererror"),
                                            !1
                                        );
                                    }
                            } else (t.innerHTML = l), t_parseScripts(t, "");
                        var i = "/tilda/" + formId + "/submitted/",
                            t = "Send data from form " + formId;
                        window.Tilda && "function" == typeof window.Tilda.sendEventToStatistics
                            ? window.Tilda.sendEventToStatistics(i, t, "", 0)
                            : "undefined" != typeof ga && "tilda" !== window.mainTracker
                            ? ga("send", { hitType: "pageview", page: i, title: t })
                            : "" < window.mainMetrika && window[window.mainMetrika] && window[window.mainMetrika].hit(i, { title: t, referer: window.location.href }),
                            t_triggerEvent(form, "tildaform:aftersuccess"),
                            window.tildaForm.successEnd(form, e, r);
                    } else {
                        t_removeClass(btnSubmit, "t-btn_sending"), (btnSubmit.tildaSendingStatus = "0");
                        var s,
                            a = (s = t_forms__getErrorContainers(form, "")).errorBoxes,
                            n = s.allError,
                            l = xhr.responseText;
                        Array.prototype.forEach.call(n, function (t) {
                            l
                                ? (t.innerHTML = l + ". Please, try again later. [" + xhr.status + "]")
                                : xhr.statusText
                                ? (t.innerHTML = "Error [" + xhr.statusText + "]. Please, try again later. [" + xhr.status + "]")
                                : (t.innerHTML = "Unknown error. Please, try again later. [" + xhr.status + "]"),
                                (t.style.display = "block");
                        }),
                            Array.prototype.forEach.call(a, function (t) {
                                t.style.display = "block";
                            }),
                            t_addClass(form, "js-send-form-error"),
                            t_triggerEvent(form, "tildaform:aftererror");
                    }
            }),
            xhr.send(dataForm),
            !1
        );
    }),
    (window.validateForm = function (t) {
        return window.tildaForm.validate(t);
    });
try {
    var TILDAPAGE_URL = window.location.href,
        TILDAPAGE_QUERY = "",
        TILDAPAGE_UTM = "";
    if (-1 !== TILDAPAGE_URL.toLowerCase().indexOf("utm_") && ((TILDAPAGE_URL = TILDAPAGE_URL.toLowerCase()), (TILDAPAGE_QUERY = TILDAPAGE_URL.split("?")), (TILDAPAGE_QUERY = TILDAPAGE_QUERY[1]), "string" == typeof TILDAPAGE_QUERY)) {
        var arPair,
            i,
            arParams = TILDAPAGE_QUERY.split("&"),
            date;
        for (i in arParams) "function" != typeof arParams[i] && ((arPair = arParams[i].split("=")), "utm_" == arPair[0].substring(0, 4) && (TILDAPAGE_UTM = TILDAPAGE_UTM + arParams[i] + "|||"));
        0 < TILDAPAGE_UTM.length &&
            (!window.tildastatcookie || "no" != window.tildastatcookie) &&
            ((date = new Date()), date.setDate(date.getDate() + 30), (document.cookie = "TILDAUTM=" + encodeURIComponent(TILDAPAGE_UTM) + "; path=/; expires=" + date.toUTCString()));
    }
} catch (error) {}
function t_forms__initForms() {
    var t = document.querySelectorAll(".r");
    (window.t_forms__inputData = {}),
        t_forms__addRecaptcha(),
        Array.prototype.forEach.call(t, function (t) {
            var e = t.id;
            window.initForms[e] ||
                (t_forms__initEventPlaceholder(t), t_forms__addInputItsGood(t), t_forms__addAttrAction(t), t_forms__onSubmit(t), t_forms__onClick(t), t_forms__onRender(t), t_forms__addFocusOnTab(t), (window.initForms[e] = !0));
        });
}
function t_forms__addFocusOnTab(t) {
    var e;
    window.isMobile ||
        ((t = t.querySelectorAll(".t-input, .t-select")) &&
            ((e = null),
            document.addEventListener("keydown", function () {
                e = "keyboard";
            }),
            document.addEventListener("mousedown", function () {
                e = "mouse";
            }),
            Array.prototype.forEach.call(t, function (t) {
                t.addEventListener("focus", function () {
                    "keyboard" === e && (t.classList.contains("t-input_pvis") && (t = t.parentElement), t.classList.add("t-focusable"), (e = null));
                }),
                    t.addEventListener("blur", function () {
                        t.classList.remove("t-focusable");
                    });
            })));
}
function t_forms__initEventPlaceholder(t) {
    var e = "focus",
        r = "blur";
    document.addEventListener || ((e = "focusin"), (r = "focusout")),
        t_removeEventListener(t, e, t_forms__removePlaceholder),
        t_addEventListener(t, e, t_forms__removePlaceholder, !0),
        t_removeEventListener(t, r, t_forms__addPlaceholder),
        t_addEventListener(t, r, t_forms__addPlaceholder, !0);
}
function t_forms__removePlaceholder(t) {
    var e,
        r,
        o = (t = t || window.event).target || t.srcElement;
    "INPUT" === o.tagName &&
        ((r = o.closest("[data-input-lid]")),
        (e = o.getAttribute("placeholder")),
        (t = ""),
        r ? (t = r.getAttribute("data-input-lid")) : (r = o.closest("form")) && (t = r.getAttribute("data-input-lid")),
        e && t && ((window.t_forms__inputData[t] = e), o.setAttribute("placeholder", "")));
}
function t_forms__addPlaceholder(t) {
    var e = (t = t || window.event).target || t.srcElement,
        r = e.closest("[data-input-lid]"),
        t = "";
    r ? (t = r.getAttribute("data-input-lid")) : (o = e.closest("form")) && (t = o.getAttribute("data-input-lid"));
    var o = window.t_forms__inputData[t] || "";
    o && t && (e.setAttribute("placeholder", o), (window.t_forms__inputData[t] = ""));
}
function t_forms__addInputItsGood(t) {
    t = t.querySelectorAll(".js-form-proccess[data-formactiontype]");
    Array.prototype.forEach.call(t, function (t) {
        var e = t.getAttribute("data-formactiontype"),
            r = t.querySelector('input[name="form-spec-comments"]');
        "1" === e ||
            r ||
            t.insertAdjacentHTML("beforeend", '<div style="position: absolute; left: -5000px; bottom: 0; display: none;"><input type="text" name="form-spec-comments" value="Its good" class="js-form-spec-comments" tabindex="-1" /></div>');
    });
}
function t_forms__addAttrAction(t) {
    t = t.querySelectorAll(".js-form-proccess");
    Array.prototype.forEach.call(t, function (t) {
        "2" === t.getAttribute("data-formactiontype") && t.setAttribute("action", "#");
    });
}
function t_forms__onSubmit(t) {
    t = t.querySelectorAll(".js-form-proccess");
    Array.prototype.forEach.call(t, function (t) {
        t_removeEventListener(t, "submit", t_forms__submitEvent), t_addEventListener(t, "submit", t_forms__submitEvent);
    });
}
function t_forms__onClick(t) {
    t_addEventListener(t, "dblclick", t_forms__initBtnDblClick), t_removeEventListener(t, "click", t_forms__initBtnClick), t_addEventListener(t, "click", t_forms__initBtnClick);
}
function t_forms__initBtnDblClick(t) {
    if (((t = t || window.event).target || t.srcElement).closest('[type="submit"]')) return t.preventDefault ? t.preventDefault() : (t.returnValue = !1), !1;
}
function t_forms__initBtnClick(t) {
    var e = (t = t || window.event).target || t.srcElement,
        r = !!e.closest('[type="submit"]') && e;
    if (r) {
        var o = r.closest(".js-form-proccess");
        if (o) {
            t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
            var a = o.getAttribute("id"),
                e = [],
                t = "";
            if ((r.tildaSendingStatus && (t = r.tildaSendingStatus), !((t && 1 <= t) || t_hasClass(r, "t706__submit_disable")))) {
                if ((t_addClass(r, "t-btn_sending"), (r.tildaSendingStatus = "1"), window.tildaForm.hideErrors(o), (e = window.tildaForm.validate(o)), window.tildaForm.showErrors(o, e)))
                    return t_removeClass(r, "t-btn_sending"), void (r.tildaSendingStatus = "0");
                (t = document.getElementById("allrecords").getAttribute("data-tilda-formskey")), (e = parseInt(o.getAttribute("data-formactiontype")));
                if (!o.querySelectorAll(".js-formaction-services").length && 1 !== e && !t) {
                    var n = t_forms__getErrorContainers(o, ""),
                        i = n.errorBoxes,
                        n = n.allError;
                    return (
                        Array.prototype.forEach.call(n, function (t) {
                            (t.innerHTML = "Please set receiver in block with forms"), (t.style.display = "block");
                        }),
                        Array.prototype.forEach.call(i, function (t) {
                            t.style.display = "block";
                        }),
                        t_addClass(o, "js-send-form-error"),
                        t_removeClass(r, "t-btn_sending"),
                        (r.tildaSendingStatus = "0"),
                        void t_triggerEvent(o, "tildaform:aftererror")
                    );
                }
                if (o.querySelector(".g-recaptcha") && grecaptcha) {
                    window.tildaForm.currentFormProccessing = { form: o, btn: r, formtype: e, formskey: t };
                    n = o.tildaCaptchaClientId;
                    return (
                        n
                            ? grecaptcha.reset(n)
                            : ((i = { size: "invisible", sitekey: o.getAttribute("data-tilda-captchakey"), callback: window.tildaForm.captchaCallback }), (n = grecaptcha.render(a + "recaptcha", i)), (o.tildaCaptchaClientId = n)),
                        void grecaptcha.execute(n)
                    );
                }
                window.tildaForm.send(o, r, e, t);
            }
        }
    }
}
function t_forms__onRender(t) {
    !t.querySelector(".t396") || (t_removeEventListener(t, "render", t_forms__renderEvent), t_addEventListener(t, "render", t_forms__renderEvent));
}
function t_forms__renderEvent() {
    t_forms__onSubmit(this);
}
function t_forms__submitEvent(t) {
    var e,
        r = t;
    t.target && (r = t.target),
        r &&
            ((e = ""),
            (r = r.querySelector('[type="submit"]')) && r.tildaSendingStatus && (e = r.tildaSendingStatus),
            e && "3" === e ? (r.tildaSendingStatus = "") : (r && !t_hasClass(r, "t706__submit_disable") && r.click(), t.preventDefault ? t.preventDefault() : (t.returnValue = !1)));
}
function t_asyncLoad(t) {
    var e = t.getAttribute("data-tilda-mask"),
        r = t.getAttribute("data-tilda-mask-holder"),
        o = t.getAttribute("data-tilda-mask-init");
    e &&
        !o &&
        (r
            ? t_onFuncLoad("t_customMask__mask", function () {
                  t_customMask__mask(t, e, { placeholder: r });
              })
            : t_onFuncLoad("t_customMask__mask", function () {
                  t_customMask__mask(t, e);
              }),
        t.setAttribute("data-tilda-mask-init", "1"));
}
function t_forms__getErrorContainers(t, e) {
    var r = t.querySelectorAll(".js-errorbox-all"),
        o = t.querySelectorAll(".js-errorbox-all .js-rule-error-all");
    return (
        r.length || (t.insertAdjacentHTML("afterbegin", '<div class="js-errorbox-all"></div>'), (r = t.querySelectorAll(".js-errorbox-all"))),
        o.length ||
            (Array.prototype.forEach.call(r, function (t) {
                t.insertAdjacentHTML("beforeend", '<p class="js-rule-error-all">' + e + "</p>");
            }),
            (o = t.querySelectorAll(".js-errorbox-all .js-rule-error-all"))),
        { errorBoxes: r, allError: o }
    );
}
function t_forms__addRecaptcha() {
    var t = document.querySelectorAll(".js-tilda-captcha");
    Array.prototype.forEach.call(t, function (t) {
        var e,
            r,
            o,
            a = t.getAttribute("data-tilda-captchakey");
        a
            ? ((e = t.getAttribute("id")),
              window.tildaForm.isRecaptchaScriptInit ||
                  ((r = document.head),
                  (o = document.createElement("script")),
                  (window.tildaForm.isRecaptchaScriptInit = !0),
                  (o.type = "text/javascript"),
                  (o.src = "https://www.google.com/recaptcha/api.js?render=explicit"),
                  (o.async = !0),
                  r.appendChild(o),
                  r.insertAdjacentHTML("beforeend", '<style type="text/css">.js-send-form-success .grecaptcha-badge {display: none;}</style>')),
              document.getElementById(e + "recaptcha") ||
                  t.insertAdjacentHTML("beforeend", '<div id="' + e + 'recaptcha" class="g-recaptcha" data-sitekey="' + a + '" data-callback="window.tildaForm.captchaCallback" data-size="invisible"></div>'))
            : t_removeClass(t, "js-tilda-captcha");
    });
}
function t_forms__getMsg(t) {
    var e = [],
        r = window.t_forms__lang;
    return (
        (e.EN = {
            success: "Thank you! Your data has been submitted.",
            successorder: "Thank you! Order created. Please wait while you are redirected to the payment page...",
            email: "Please enter a valid email address",
            url: "Please put a correct URL",
            phone: "Please put a correct phone number",
            number: "Please put a correct number",
            date: "Please put a correct date",
            time: "Please put a correct time (HH:mm)",
            name: "Please put a name",
            namerus: "Please put a correct name (only cyrillic letters)",
            nameeng: "Please put a correct name (only latin letters)",
            string: "You put incorrect symbols. Only letters, numbers and punctuation symbols are allowed",
            req: "Please fill out all required fields",
            reqfield: "Required field",
            minlength: "Value is too short",
            maxlength: "Value too big",
            emptyfill: "None of the fields are filled in",
            chosevalue: "Please select an address from the options",
            deliveryreq: "It is not possible to place an order without delivery. Please refresh the page and try again",
            promocode: "Please activate promo code or clear input field",
        }),
        (e.RU = {
            success: "Спасибо! Данные успешно отправлены.",
            successorder: "Спасибо! Заказ оформлен. Пожалуйста, подождите. Идет переход к оплате...",
            email: "Укажите, пожалуйста, корректный email",
            url: "Укажите, пожалуйста, корректный URL",
            phone: "Укажите, пожалуйста, корректный номер телефона",
            number: "Укажите, пожалуйста, корректный номер",
            date: "Укажите, пожалуйста, корректную дату",
            time: "Укажите, пожалуйста, корректное время (ЧЧ:ММ)",
            name: "Укажите, пожалуйста, имя",
            namerus: "Укажите, пожалуйста, имя (только кириллица)",
            nameeng: "Укажите, пожалуйста, имя (только латиница)",
            string: "Вы написали некорректные символы. Разрешены только буквы, числа и знаки пунктуации",
            req: "Пожалуйста, заполните все обязательные поля",
            reqfield: "Обязательное поле",
            minlength: "Слишком короткое значение",
            maxlength: "Слишком длинное",
            emptyfill: "Ни одно поле не заполнено",
            chosevalue: "Пожалуйста, выберите адрес из предложенных вариантов",
            deliveryreq: "Невозможно оформить заказ без доставки. Пожалуйста, перезагрузите страницу и попробуйте еще раз.",
            promocode: "Активируйте, пожалуйста, промокод или очистите поле",
        }),
        "function" == typeof t_forms__getDict && "RU" !== r && "EN" !== r && (e = t_forms__getDict()),
        (e[r] || e.EN)[t]
    );
}
function checkVerifyTildaCaptcha(t) {
    if (-1 !== (t = t || window.event).origin.indexOf(window.tildaForm.endpoint)) {
        var e = document.getElementById("js-tildaspec-captcha"),
            r = document.getElementById("tildaformcaptchabox");
        if ("closeiframe" == t.data) return r && t_removeEl(r), void (e && t_removeEl(e));
        t = t.data;
        e && ((e.value = t), r && t_removeEl(r), (e = e.closest("form")) && t_forms__submitEvent(e));
    }
}
function t_parseScripts(n, t) {
    t = n.querySelectorAll(t + "script");
    Array.prototype.forEach.call(t, function (t) {
        for (var e, r = document.createElement("script"), o = 0; o < t.attributes.length; o++) {
            var a = t.attributes[o];
            r.setAttribute(a.name, a.value);
        }
        t.innerHTML.length ? (r.appendChild(document.createTextNode(t.innerHTML)), t.parentNode.replaceChild(r, t)) : (((e = document.createElement("script")).src = t.attributes.src.value), n.appendChild(e), t_removeEl(t));
    });
}
function t_forms__onSuccess(t) {
    t instanceof Element || (t = t[0]);
    var e = t.closest(".r"),
        r = e.getAttribute("data-record-type"),
        o = t.querySelector(".t-form__inputsbox"),
        a = getComputedStyle(o, null),
        n = parseInt(a.paddingTop) || 0,
        i = parseInt(a.paddingBottom) || 0,
        s = o.clientHeight - (n + i) + (o.getBoundingClientRect().top + window.pageYOffset),
        l = t.querySelector(".t-form__successbox").getBoundingClientRect().top + window.pageYOffset,
        d = 0,
        a = window.innerHeight,
        n = document.body,
        i = document.documentElement,
        n = Math.max(n.scrollHeight, n.offsetHeight, i.clientHeight, i.scrollHeight, i.offsetHeight);
    121 != r || ((i = t.getAttribute("data-success-callback")) && (r = i.split("_onSuccess")[0].replace("t", "")));
    var c = "t" + r + "__inputsbox_hidden",
        u = [702, 708, 862, 945, 1014],
        m = !0,
        d = 960 < window.innerWidth ? l - 200 : l - 100,
        p = document.querySelector(".t-tildalabel");
    if (l > window.scrollY || n - s < a - 100)
        o.classList.add(c),
            n < a &&
                p &&
                setTimeout(function () {
                    t_fadeOut(p);
                }, 300);
    else {
        for (var f = 0; f < u.length; f++)
            if (u[f] == r) {
                m = !1;
                break;
            }
        m && t_forms__scrollBeginForm(d),
            setTimeout(function () {
                o.classList.add(c);
            }, 400);
    }
    var _ = t.getAttribute("data-success-url");
    _ &&
        setTimeout(function () {
            window.location.href = _;
        }, 500),
        (835 != r && 862 != r) || ((e = e.querySelector(".t835__btn_prev")) && (e.style.display = "none"));
}
function t_forms__scrollBeginForm(t) {
    var r = 400,
        o = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0),
        a = t - o,
        n = 0,
        i = 16;
    document.body.setAttribute("data-scrollable", "true"),
        (function t() {
            var e;
            (n += i), window.scrollTo(0, ((e = n), (e /= r / 2) < 1 ? (a / 2) * e * e * e + o : (a / 2) * ((e -= 2) * e * e + 2) + o)), n < r ? setTimeout(t, i) : document.body.removeAttribute("data-scrollable");
        })();
}
function t_removeEl(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
}
Array.prototype.some ||
    (Array.prototype.some = function (t) {
        "use strict";
        if (null == this) throw new TypeError("Array.prototype.some called on null or undefined");
        if ("function" != typeof t) throw new TypeError();
        for (var e = Object(this), r = e.length >>> 0, o = 2 <= arguments.length ? arguments[1] : void 0, a = 0; a < r; a++) if (a in e && t.call(o, e[a], a, e)) return !0;
        return !1;
    }),
    (function (t) {
        var e = t.matches || t.matchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector;
        t.matches = t.matchesSelector =
            e ||
            function (t) {
                var e = document.querySelectorAll(t),
                    r = this;
                return Array.prototype.some.call(e, function (t) {
                    return t === r;
                });
            };
    })(Element.prototype),
    Element.prototype.closest ||
        (Element.prototype.closest = function (t) {
            for (var e = this; e && 1 === e.nodeType; ) {
                if (Element.prototype.matches.call(e, t)) return e;
                e = e.parentElement || e.parentNode;
            }
            return null;
        }),
    String.prototype.trim ||
        (String.prototype.trim = function () {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        }),
    Array.prototype.indexOf ||
        (Array.prototype.indexOf = function (t, e) {
            "use strict";
            var r;
            if (null == this) throw new TypeError('"this" is null or not defined');
            var o = Object(this),
                a = o.length >>> 0;
            if (0 == a) return -1;
            e |= 0;
            if (a <= e) return -1;
            for (r = Math.max(0 <= e ? e : a - Math.abs(e), 0); r < a; r++) if (r in o && o[r] === t) return r;
            return -1;
        });
var t_forms__htmlEvents = { onblur: 1, onchange: 1, onfocus: 1, onsubmit: 1, onclick: 1, ondblclick: 1, onkeydown: 1, onkeypress: 1, onpaste: 1, oninput: 1 };
function t_removeEventListener(t, e, r) {
    t.removeEventListener ? t.removeEventListener(e, r, !1) : t.detachEvent && t_forms__htmlEvents["on" + e] ? t.detachEvent("on" + e, r) : (t["on" + e] = null);
}
function t_addEventListener(t, e, r, o) {
    t.addEventListener ? t.addEventListener(e, r, o) : t.attachEvent && t_forms__htmlEvents["on" + e] ? t.attachEvent("on" + e, r) : (t["on" + e] = r);
}
function t_serializeArray(t) {
    for (var e = [], r = t.querySelectorAll("input, textarea, button, select"), o = 0; o < r.length; o++)
        if (!(!r[o].name || r[o].disabled || -1 < ["file", "reset", "submit", "button"].indexOf(r[o].type)))
            if ("select-multiple" !== r[o].type) (-1 < ["checkbox", "radio"].indexOf(r[o].type) && !r[o].checked) || e.push({ name: r[o].name, value: r[o].value });
            else for (var a = r[o].options, n = 0; n < a.length; n++) a[n].selected && e.push({ name: a[n].name, value: a[n].value });
    return e;
}
function t_addClass(t, e) {
    document.body.classList ? t.classList.add(e) : (t.className += (t.className ? " " : "") + e);
}
function t_removeClass(t, e) {
    document.body.classList
        ? t.classList.remove(e)
        : (t.className = t.className
              .replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ")
              .replace(/^\s+/, "")
              .replace(/\s+$/, ""));
}
function t_hasClass(t, e) {
    return document.body.classList ? t.classList.contains(e) : new RegExp("(\\s|^)" + e + "(\\s|$)").test(t.className);
}
function t_forms__formData(t) {
    for (var e = "", r = 0; r < t.length; r++) "" !== e && (e += "&"), (e += encodeURIComponent(t[r].name) + "=" + encodeURIComponent(t[r].value));
    return e.replace(/%20/g, "+");
}
function t_fadeOut(t) {
    var e, r;
    "none" !== t.style.display &&
        ((e = 1),
        (r = setInterval(function () {
            (t.style.opacity = e), (e -= 0.1) <= 0.1 && (clearInterval(r), (t.style.display = "none"), (t.style.opacity = null));
        }, 30)));
}
function t_fadeIn(t) {
    var e, r;
    "block" !== t.style.display &&
        ((e = 0),
        (t.style.opacity = e),
        (t.style.display = "block"),
        (r = setInterval(function () {
            (t.style.opacity = e), 1 <= (e += 0.1) && clearInterval(r);
        }, 30)));
}
function t_triggerEvent(t, e) {
    var r;
    document.createEvent ? (r = document.createEvent("HTMLEvents")).initEvent(e, !0, !1) : document.createEventObject && ((r = document.createEventObject()).eventType = e),
        (r.eventName = e),
        t.dispatchEvent ? t.dispatchEvent(r) : t.fireEvent ? t.fireEvent("on" + r.eventType, r) : t[e] ? t[e]() : t["on" + e] && t["on" + e]();
}
