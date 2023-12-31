if (
    ((window.t_zeroForms__browserLang = (window.navigator.userLanguage || window.navigator.language).toUpperCase().slice(0, 2)),
    (window.t_zeroForms__isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
    (window.t_zeroForms__isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)),
    (window.t_zeroForms__isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)),
    (window.t_zeroForms__iOSMajorVersion = ""),
    window.t_zeroForms__isiOS)
) {
    var version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    null !== version && (window.t_zeroForms__iOSMajorVersion = parseInt(version[1], 10));
}
function t_zeroForms__init(recid, elemid, formObjectEls) {
    var rec = document.getElementById("rec" + recid),
        zeroForm = rec ? rec.querySelector('.tn-elem[data-elem-id="' + elemid + '"]') : null;
    if (zeroForm) {
        var tildamode = t_zeroForms__getTildaMode(),
            isOldPage = document.querySelector('script[src*="tilda-blocks-2.7"]');
        t_zeroForms__waitForTN(function () {
            t_zeroForms__renderForm(zeroForm, formObjectEls, recid, tildamode);
        }),
            t_zeroForms__onFuncLoad("t396_elem__renderViewOneField", function () {
                t396_elem__renderViewOneField(isOldPage ? $(zeroForm) : zeroForm, "left"), t396_elem__renderViewOneField(isOldPage ? $(zeroForm) : zeroForm, "top");
            });
    }
}
function t_zeroForms__waitForTN(cb) {
    window.tn && window.tn.curResolution
        ? cb()
        : setTimeout(function () {
              t_zeroForms__waitForTN(cb);
          }, 300);
}
function t_zeroForms__renderForm(zeroForm, formObjectEls, recid, tildamode) {
    if (((zeroForm = t_zeroForms__getEl(zeroForm)), tildamode || (tildamode = t_zeroForms__getTildaMode()), recid || (recid = t_zeroForms__getRecID(zeroForm)), "string" == typeof formObjectEls))
        try {
            formObjectEls = JSON.parse(formObjectEls);
        } catch (err) {}
    var record = document.querySelector(".t-records"),
        isEditMode = !!record && "edit" === record.getAttribute("data-tilda-mode"),
        rec;
    if (
        (isEditMode || (isEditMode = "published" !== tildamode), !zeroForm.classList.contains("zero-form-rendered") || isEditMode) &&
        ((!t_zeroForms__isRecordHidden(zeroForm.closest(".r")) && !t_zeroForms__isFormOutside(zeroForm)) || "published" !== tildamode)
    ) {
        if (!formObjectEls) {
            var textarea = zeroForm.querySelector(".tn-atom__inputs-textarea");
            if (textarea && textarea.value)
                try {
                    formObjectEls = JSON.parse(textarea.value);
                } catch (err) {
                    formObjectEls = {};
                }
            else formObjectEls = {};
        }
        var arrayOfElements = t_zeroForms__fromObjToArray(formObjectEls),
            zeroFormAtom = zeroForm.querySelector(".tn-atom");
        if ("zero" === tildamode || "edit" === tildamode) zeroFormAtom.innerHTML = "";
        else if (zeroFormAtom.querySelector(".t-form")) return;
        var form = t_zeroForms__createForm(recid, tildamode, arrayOfElements, zeroForm);
        if (form) {
            zeroFormAtom.insertAdjacentElement("beforeend", form);
            var customElEvent = document.createEvent("Event");
            customElEvent.initEvent("render", !0, !0), zeroForm.dispatchEvent(customElEvent), zeroForm.classList.add("zero-form-rendered"), t_zeroForms__initMaskAfterRender(zeroForm), t_zeroForms__updateTopPosition(zeroForm);
        }
    }
}
function t_zeroForms__initMaskAfterRender(form) {
    t_zeroForms__onRender(form, !0, function () {
        var hasMask;
        form.querySelector(".js-tilda-mask") &&
            t_zeroForms__onFuncLoad("tildaForm_initMasks", function () {
                setTimeout(function () {
                    var hasNotInitedMask;
                    form.querySelector('.js-tilda-mask:not([data-tilda-mask-init="1"])') && tildaForm_initMasks();
                }, 500);
            });
    });
}
function t_zeroForms__createForm(recid, tildamode, arrayOfElements, zeroForm) {
    tildamode || (tildamode = t_zeroForms__getTildaMode());
    var formObj = t_zeroForms__createFormObj(zeroForm),
        isPublished = "published" === tildamode,
        arrayOfElsWithoutHiddenFiels = arrayOfElements.filter(function (field) {
            return "y" !== field.loff && "hd" !== field.li_type;
        }),
        form = document.createElement(isPublished ? "form" : "div"),
        formReceiversArr;
    if (
        (form.classList.add("t-form"),
        form.classList.add("t-form_inputs-total_" + arrayOfElsWithoutHiddenFiels.length),
        formObj.inputsstyle && form.classList.add("t-form_bbonly"),
        "h" === formObj.inputpos && form.classList.add("tn-form_horiz"),
        isPublished &&
            ((form.id = "form" + recid),
            (form.name = "form" + recid),
            (form.action = "https://forms.tildacdn.com/procces/"),
            (form.method = "POST"),
            form.classList.add("js-form-proccess"),
            form.setAttribute("role", "form"),
            form.setAttribute("data-formactiontype", "2"),
            form.setAttribute("data-inputbox", ".t-input-group"),
            form.setAttribute("data-success-callback", "t396_onSuccess"),
            form.setAttribute("data-success-popup", "y"),
            form.setAttribute("data-error-popup", "y"),
            formObj.formmsgurl && form.setAttribute("data-success-url", formObj.formmsgurl)),
        (formObj.receivers ? formObj.receivers.split(",") : []).forEach(function (receiverValue) {
            var hiddenInput = t_zeroForms__createHiddenField(receiverValue, "formservices[]", "js-formaction-services");
            form.insertAdjacentElement("beforeend", hiddenInput);
        }),
        formObj.formname)
    ) {
        var formNameInput = t_zeroForms__createHiddenField(formObj.formname, "tildaspec-formname", "");
        form.insertAdjacentElement("beforeend", formNameInput);
    }
    var successBox = document.createElement("div");
    successBox.classList.add("js-successbox"),
        successBox.classList.add("t-form__successbox"),
        successBox.classList.add("t-text"),
        successBox.classList.add("t-text_sm"),
        (successBox.style.display = "none"),
        (successBox.innerHTML = formObj.formmsgsuccess),
        form.insertAdjacentElement("beforeend", successBox);
    var titleStyles = {
            color: formObj.inputtitlecolor || "",
            fontWeight: formObj.inputtitlefontweight || "",
            fontFamily: formObj.inputfontfamily || "",
            fontSize: formObj.inputtitlefontsize || "",
            paddingBottom: formObj.inputtitlemargbottom || "",
        },
        inputsBlock = t_zeroForms__generateInputsBlock(recid, zeroForm, arrayOfElements, formObj, titleStyles);
    form.insertAdjacentElement("beforeend", inputsBlock);
    var formID = zeroForm.getAttribute("data-elem-id"),
        commonStyle;
    if (formObj.formbottomtext) {
        var bottomText = document.createElement("div");
        (bottomText.style.textAlign = "center" === formObj.buttonalign ? "center" : "left"),
            (bottomText.style.color = titleStyles.color),
            (bottomText.style.fontWeight = titleStyles.fontWeight),
            (bottomText.style.fontFamily = titleStyles.fontFamily),
            (bottomText.style.marginTop = "15px"),
            (bottomText.style.fontSize = "13px");
        var bottomBLock = t_zeroForms__getBottomText(formID, formObj, recid, zeroForm);
        bottomText.appendChild(bottomBLock), form.insertAdjacentElement("beforeend", bottomText);
    }
    form.insertAdjacentElement("beforeend", t_zeroForms__createErrorBox(formObj, "bottom")),
        form.insertAdjacentElement("beforeend", t_zeroForms__createCommentField()),
        t_zeroForms__createInputPlaceholderStyles(formID, formObj, recid, zeroForm),
        ("h" !== formObj.inputpos && "zero" !== tildamode) || t_zeroForms__setScriptOrStyle("t-zero-form-h-styles", "tilda-zero-form-horizontal.min.css", "", "link", !1),
        t_zeroForms__setScriptOrStyle("t-zero-form-c-styles", "", ".tn-atom .t-input-block {position: relative;}", "style", zeroForm),
        "y" === formObj.inputsstyle2 &&
            t_zeroForms__onRender(zeroForm, !1, function () {
                t_zeroForms__animateInputs(zeroForm, formObj, recid, formID);
            });
    var fieldFontFamilyID = "t-zero-form-font-family-" + recid + "-" + formID;
    if (formObj.fieldfontfamily) {
        var fontFamilySelector = t_zeroForms__createSelector(recid, formID, ""),
            selectorList = ['input[type="text"]', 'input[type="tel"]', ".t-input-phonemask__select", "textarea", "select", ".t-input__vis-ph"],
            fontFamilyStyles;
        t_zeroForms__setScriptOrStyle(
            fieldFontFamilyID,
            "",
            (selectorList = selectorList.reduce(function (prev, next, i) {
                return (prev += fontFamilySelector + ".t-input-block " + next), i !== selectorList.length - 1 && (prev += ", "), prev;
            }, "")) +
                ' {font-family: "' +
                formObj.fieldfontfamily +
                '";}',
            "style",
            zeroForm
        );
    } else {
        var fieldFontFamilyStyles = document.getElementById(fieldFontFamilyID);
        fieldFontFamilyStyles && fieldFontFamilyStyles.parentElement && fieldFontFamilyStyles.parentElement.removeChild(fieldFontFamilyStyles);
    }
    if (
        (("preview" !== tildamode && "published" !== tildamode) ||
            t_zeroForms__onFuncLoad("tildaForm_initMasks", function () {
                tildaForm_initMasks();
            }),
        "published" === tildamode)
    ) {
        var multiLandingBlocks = document.querySelectorAll('[data-record-type="803"]');
        Array.prototype.forEach.call(multiLandingBlocks, function (multiLandingBlock) {
            var multiLandingID = multiLandingBlock.id.replace("rec", "");
            t_zeroForms__onFuncLoad("t803_init", function () {
                t803_init(multiLandingID);
            });
        });
    }
    var event = window.t_zeroForms__isMobile || "ontouchend" in document ? "orientationchange" : "resize",
        tildaMode = t_zeroForms__getTildaMode(),
        timerID = 0;
    return (
        window.addEventListener(event, function () {
            timerID ||
                (timerID = setTimeout(function () {
                    t_zeroForms__updateCurrentResolution(recid, tildaMode), t_zeroForms__updateStylesOnResize(recid, zeroForm), clearTimeout(timerID), (timerID = 0);
                }, 600));
        }),
        form
    );
}
function t_zeroForms__updateCurrentResolution(recid, tildaMode) {
    if (void 0 !== window.t396_detectResolution && void 0 !== window.t396_switchResolution && "edit" !== tildaMode) {
        var resolution = t396_detectResolution(recid);
        t396_switchResolution(recid, resolution);
    }
}
function t_zeroForms__updateStylesOnResize(recid, zeroForm) {
    var formObj = t_zeroForms__createFormObj(zeroForm),
        formID = zeroForm.getAttribute("data-elem-id"),
        formEl = zeroForm.querySelector(".t-form"),
        inputFontWeight = "variation" === formObj.inputfontweight ? formObj.inputvariationweight : formObj.inputfontweight,
        phoneMaskInputs = document.querySelectorAll(".t-input-phonemask__wrap");
    Array.prototype.forEach.call(phoneMaskInputs, function (phoneMaskInput) {
        phoneMaskInput.classList.add("t-input-inline-styles");
    }),
        "h" === formObj.inputpos
            ? (formEl && formEl.classList.add("tn-form_horiz"), t_zeroForms__setScriptOrStyle("t-zero-form-h-styles", "tilda-zero-form-horizontal.min.css", "", "link", !1))
            : formEl && formEl.classList.remove("tn-form_horiz");
    var inputStyles = t_zeroForms__initInputStyles(formObj, inputFontWeight),
        inputs = zeroForm.querySelectorAll(".t-input-inline-styles");
    Array.prototype.forEach.call(inputs, function (input) {
        t_zeroForms__appendStylesToField(input, inputStyles);
        var rows = input.getAttribute("data-rows");
        if (rows) {
            var textAreaRowHeight = 25,
                textAreaPadding = 10;
            input.style.height = 25 * rows + 10 + "px";
        }
    });
    var titleStyles = {
            color: formObj.inputtitlecolor || "",
            fontWeight: formObj.inputtitlefontweight || "",
            fontFamily: formObj.inputfontfamily || "",
            fontSize: formObj.inputtitlefontsize || "",
            paddingBottom: formObj.inputtitlemargbottom || "",
        },
        titleFontWeight = "variation" === formObj.inputtitlefontweight ? formObj.inputtitlevariationweight : formObj.inputtitlefontweight,
        titleList = zeroForm.querySelectorAll(".t-input-title");
    Array.prototype.forEach.call(titleList, function (title) {
        t_zeroForms__setTitleStyles(title, titleStyles, titleFontWeight);
    });
    var inputGroup = zeroForm.querySelectorAll(".t-input-group"),
        inputPosStyles = formObj.inputmargbottom ? "margin-bottom:" + formObj.inputmargbottom + "px;" : "";
    (inputPosStyles += formObj.inputmargright && "h" === formObj.inputpos ? "padding-right:" + formObj.inputmargright + "px;" : "") &&
        Array.prototype.forEach.call(inputGroup, function (inputBlock) {
            inputBlock.style = inputPosStyles;
        });
    var submitBtn = zeroForm.querySelector(".t-submit");
    if (submitBtn) {
        t_zeroForms__setBtnInlineStyles(formObj, submitBtn), t_zeroForms__generateBtnStyles(submitBtn, recid, formID, formObj, zeroForm);
        var submitBtnWrapper = submitBtn.closest(".tn-form__submit");
        submitBtnWrapper && ((submitBtnWrapper.style.textAlign = formObj.buttonalign), (submitBtnWrapper.style.marginTop = formObj.buttonmargtop + "px"), t_zeroForms__updateTopPosition(zeroForm));
    }
}
function t_zeroForms__updateTopPosition(zeroForm) {
    var axisY;
    void 0 !== window.t396_elem__getFieldValue && void 0 !== window.t396_elem__renderViewOneField && "top" !== t396_elem__getFieldValue(zeroForm, "axisy") && t396_elem__renderViewOneField(zeroForm, "top");
}
function t_zeroForms__createCommentField() {
    var commentField = document.createElement("div");
    (commentField.style.position = "absolute"), (commentField.style.left = "-5000px"), (commentField.style.bottom = "0"), (commentField.style.display = "none");
    var commentInput = document.createElement("input");
    return (
        (commentInput.type = "text"),
        (commentInput.name = "form-spec-comments"),
        (commentInput.value = "Its good"),
        commentInput.classList.add("js-form-spec-comments"),
        (commentInput.tabIndex = -1),
        commentField.insertAdjacentElement("beforeend", commentInput),
        commentField
    );
}
function t_zeroForms__generateInputsBlock(recid, zeroForm, arrayOfElements, formObj, titleStyles) {
    var formID = zeroForm.getAttribute("data-elem-id"),
        filteredArrayOfEls = arrayOfElements.filter(function (elementObj) {
            return "y" !== elementObj.loff && elementObj.li_type;
        }),
        inputsBlock = document.createElement("div");
    return (
        inputsBlock.classList.add("t-form__inputsbox"),
        filteredArrayOfEls.forEach(function (elementObj) {
            var parsedHTMLElement = t_zeroForms__parseIntoElement(recid, zeroForm, elementObj, formObj, titleStyles, formID);
            parsedHTMLElement && inputsBlock.insertAdjacentElement("beforeend", parsedHTMLElement);
        }),
        inputsBlock.insertAdjacentElement("beforeend", t_zeroForms__createErrorBox(formObj, "middle")),
        inputsBlock.insertAdjacentElement("beforeend", t_zeroForms__createFormButton(recid, zeroForm, formID, formObj)),
        inputsBlock
    );
}
function t_zeroForms__parseIntoElement(recid, zeroForm, elementObj, formObj, titleStyles, formID) {
    var isHiddenInput;
    if ("hd" === elementObj.li_type) return t_zeroForms__createHiddenField(elementObj.li_value, elementObj.li_nm, "");
    var inputPosStyles = formObj.inputmargbottom ? "margin-bottom:" + formObj.inputmargbottom + "px;" : "";
    inputPosStyles += formObj.inputmargright && "h" === formObj.inputpos ? "padding-right:" + formObj.inputmargright + "px;" : "";
    var inputGroup = document.createElement("div");
    inputGroup.classList.add("t-input-group"), inputGroup.classList.add("t-input-group_" + elementObj.li_type), inputGroup.setAttribute("data-input-lid", elementObj.lid), inputPosStyles && (inputGroup.style = inputPosStyles);
    var inputFontWeight = "variation" === formObj.inputfontweight ? formObj.inputvariationweight : formObj.inputfontweight,
        textFontWeight = "variation" === formObj.inputelsfontweight ? formObj.inputelsvariationweight : formObj.inputelsfontweight,
        titleFontWeight = "variation" === formObj.inputtitlefontweight ? formObj.inputtitlevariationweight : formObj.inputtitlefontweight;
    elementObj.li_title && t_zeroForms__generateTitle(elementObj, titleStyles, inputGroup, titleFontWeight), elementObj.li_subtitle && t_zeroForms__generateSubtitle(elementObj, titleStyles, inputGroup);
    var inputStyles = t_zeroForms__initInputStyles(formObj, inputFontWeight),
        labelStyles = { fontSize: formObj.inputelsfontsize || "", fontWeight: textFontWeight || "" },
        inputPreferences = {
            name: elementObj.li_nm,
            placeholder: elementObj.li_ph || "",
            secondaryClassName: formObj.inputsstyle ? "t-input_bbonly" : "",
            require: "y" === elementObj.li_req,
            rule: elementObj.li_rule || "",
            mask: elementObj.li_mask || "",
        },
        inputBlock = document.createElement("div"),
        generatedField;
    switch ((inputBlock.classList.add("t-input-block"), elementObj.li_type)) {
        case "em":
            generatedField = t_zeroForms__createInput(elementObj, inputStyles, inputPreferences, "email");
            break;
        case "ph":
            (generatedField = t_zeroForms__createPhoneInput(recid, elementObj, inputStyles, inputPreferences)),
                "a" === elementObj.li_masktype &&
                    (t_zeroForms__setScriptOrStyle("t-zero-phonemask", "tilda-phone-mask-1.1.min.js", "", "script", !1),
                    t_zeroForms__onRender(zeroForm, !0, function () {
                        t_zeroForms__onFuncLoad("t_form_phonemask_load", function () {
                            var selector = "#rec" + recid + ' .js-phonemask-input[data-phonemask-lid="' + elementObj.lid + '"]',
                                currentPhoneInput = document.querySelector(selector);
                            currentPhoneInput && t_form_phonemask_load(currentPhoneInput);
                        });
                    }));
            break;
        case "nm":
            generatedField = t_zeroForms__createInput(elementObj, inputStyles, inputPreferences, "name");
            break;
        case "in":
            generatedField = t_zeroForms__createInput(elementObj, inputStyles, inputPreferences, "oneline");
            break;
        case "ta":
            generatedField = t_zeroForms__createInput(elementObj, inputStyles, inputPreferences, "textarea");
            break;
        case "sb":
            var hasBBOnly = "y" === formObj.inputsstyle;
            if (((generatedField = t_zeroForms__createSelect(elementObj, inputStyles, inputPreferences, hasBBOnly)), (formObj.inputsstyle && formObj.inputelscolor) || inputStyles.color)) {
                var styles = document.createElement("style"),
                    selector = t_zeroForms__createSelector(recid, formID, ".t-select__wrapper:after"),
                    selectorWrapperColor = formObj.inputsstyle ? formObj.inputelscolor : inputStyles.color;
                (styles.textContent = selector + "{border-top-color:" + selectorWrapperColor + ";}"), generatedField.insertAdjacentElement("beforeend", styles);
            }
            break;
        case "rd":
            generatedField = t_zeroForms__createRadio(elementObj, formObj, inputPreferences, labelStyles);
            var inputType = "cb" === elementObj.li_radcb ? "checkbox" : "radio";
            t_zeroForms__setIndicatorStyles(recid, formID, formObj.inputelscolor, inputType, generatedField);
            var fieldSetStyles = recid ? "#rec" + recid + " " : "";
            t_zeroForms__setScriptOrStyle("t-zero-form-fieldset-" + recid, "", (fieldSetStyles += "fieldset {padding: 0; margin: 0; border: none;}"), "style", zeroForm),
                "checkbox" === inputType &&
                    t_zeroForms__onRender(zeroForm, !1, function () {
                        var inputWrapper = zeroForm.querySelector('[data-input-lid="' + elementObj.lid + '"]'),
                            checkboxList;
                        inputWrapper &&
                            Array.prototype.slice.call(inputWrapper.querySelectorAll(".t-checkbox")).forEach(function (checkbox) {
                                checkbox.addEventListener("input", t_zeroForms__updateCheckboxesValues);
                            });
                    });
            break;
        case "ri":
            (generatedField = t_zeroForms__createRadioImage(elementObj, formObj, inputPreferences)),
                t_zeroForms__setIndicatorStyles(recid, formID, formObj.inputelscolor, "img-select", generatedField),
                t_zeroForms__setScriptOrStyle("t-zero-img-select-styles", "tilda-img-select-1.0.min.css", "", "link", !1),
                t_zeroForms__setScriptOrStyle("t-zero-img-select-script", "tilda-img-select-1.0.min.js", "", "script", !1),
                t_zeroForms__onRender(zeroForm, !1, function () {
                    t_zeroForms__onFuncLoad("t_input_imgselect_init", function () {
                        t_input_imgselect_init(recid, elementObj.lid), t_input_imgselect_invertColor(recid);
                    });
                });
            break;
        case "cb":
            (generatedField = t_zeroForms__createCheckbox(elementObj, labelStyles, formObj, inputPreferences)), t_zeroForms__setIndicatorStyles(recid, formID, formObj.inputelscolor, "checkbox", generatedField);
            break;
        case "uw":
            (generatedField = t_zeroForms__createUploadField(elementObj, inputPreferences, "uw")),
                "published" === window.tildamode &&
                    t_zeroForms__onRender(zeroForm, !0, function () {
                        t_zeroForms__onFuncLoad("t_upwidget__init", function () {
                            t_upwidget__init();
                        });
                    });
            break;
        case "uc":
            generatedField = t_zeroForms__createUploadField(elementObj, inputPreferences, "uc");
            var scriptContent = 'UPLOADCARE_LOCALE ="' + elementObj.li_inp + '";';
            t_zeroForms__setScriptOrStyle("t-zero-uploadcare-" + formID, "", (scriptContent += 'UPLOADCARE_TABS = "all";'), "script", !1);
            break;
        case "da":
            (generatedField = t_zeroForms__createDateField(elementObj, inputPreferences, inputStyles, formObj)),
                t_zeroForms__onRender(zeroForm, !0, function () {
                    t_zeroForms__onFuncLoad("t_datepicker_init", function () {
                        t_datepicker_init(recid, elementObj.lid, formID);
                    });
                });
            break;
        case "tm":
            generatedField = t_zeroForms__createInput(elementObj, inputStyles, inputPreferences, "time");
            break;
        case "qn":
            (generatedField = t_zeroForms__createQuantityField(elementObj, inputStyles, formObj.inputelscolor, inputPreferences)),
                zeroForm.removeEventListener("click", t_zeroForms__initQuanityClickCount),
                zeroForm.addEventListener("click", t_zeroForms__initQuanityClickCount);
            break;
        case "rg":
            if (((generatedField = t_zeroForms__createQuantityRange(elementObj, inputStyles, formObj, inputPreferences)), formObj.inputelscolor)) {
                var rangeStyles = document.createElement("style"),
                    rangeSelector = t_zeroForms__createSelector(recid, formID, ".t-range"),
                    rangePostfix;
                ["::-webkit-slider-thumb", "::-moz-range-thumb", "::-ms-thumb"].forEach(function (postfix) {
                    rangeStyles.textContent += rangeSelector + postfix + "{background:" + formObj.inputelscolor + ";}";
                }),
                    generatedField.insertAdjacentElement("beforeend", rangeStyles);
            }
            t_zeroForms__onRender(zeroForm, !1, function () {
                t_zeroForms__onFuncLoad("t_input_range_init", function () {
                    try {
                        t_input_range_init(recid, elementObj.lid);
                    } catch (err) {
                        console.log(err);
                    }
                });
            });
            break;
        case "ur":
            generatedField = t_zeroForms__createInput(elementObj, inputStyles, inputPreferences, "url");
            break;
        case "tx":
            (generatedField = document.createElement("div")).classList.add("t-text"),
                generatedField.setAttribute("field", "li_text__" + elementObj.lid),
                (generatedField.style.fontWeight = labelStyles.fontWeight),
                (generatedField.style.fontSize = labelStyles.fontSize + "px"),
                (generatedField.style.fontFamily = titleStyles.fontFamily),
                (generatedField.style.color = titleStyles.color),
                (generatedField.innerHTML = elementObj.li_text || "");
            break;
        case "ws":
            (generatedField = document.createElement("div")).innerHTML = "&nbsp";
            var WhiteSpaceRowHeight = 34;
            elementObj.li_rows && (generatedField.style.height = 34 * elementObj.li_rows + "px");
            break;
        case "fr":
            if (((generatedField = t_zeroForms__createCalculation(elementObj, inputStyles, inputPreferences, titleStyles)), formObj.inputfrbgcolor)) {
                var calcStyles = document.createElement("style"),
                    calcSelector = t_zeroForms__createSelector(recid, formID, ".t-input-group_fr");
                (calcStyles.textContent = calcSelector + "{background-color:" + formObj.inputfrbgcolor + "; padding: 20px 30px 25px;}"), generatedField.insertAdjacentElement("beforeend", calcStyles);
            }
            t_zeroForms__onRender(zeroForm, !1, function () {
                t_zeroForms__onFuncLoad("tcalc__init", function () {
                    t_zeroForms__waitCalcFields(recid, elementObj, zeroForm);
                });
            });
    }
    generatedField && inputBlock.appendChild(generatedField);
    var errorBox = document.createElement("div");
    return errorBox.classList.add("t-input-error"), inputBlock.insertAdjacentElement("beforeend", errorBox), inputGroup.insertAdjacentElement("beforeend", inputBlock), inputGroup;
}
function t_zeroForms__waitCalcFields(recid, elementObj, zeroForm) {
    var inputNameList = t_zeroForms__removeStringQuotes(elementObj.li_expr).match(/[A-z0-9_]+/gi),
        isFieldsInsideCurrentForm;
    inputNameList &&
        ((inputNameList = inputNameList.filter(function (name) {
            return isNaN(parseInt(name, 10));
        })).every(function (name) {
            return zeroForm.querySelector('[name="' + name + '"]');
        })
            ? tcalc__init(recid, elementObj.lid)
            : setTimeout(function () {
                  tcalc__init(recid, elementObj.lid);
              }, 500));
}
function t_zeroForms__generateSubtitle(elementObj, titleStyles, inputGroup) {
    var exceptTypes,
        isExceptType = ["rd", "ri", "uw", "uc", "fr", "cb"].some(function (type) {
            return type === elementObj.li_type;
        }),
        text = document.createElement(elementObj.li_title || isExceptType ? "div" : "label");
    "LABEL" === text.tagName && (text.style.display = "block"),
        "LABEL" === text.tagName && text.setAttribute("for", elementObj.li_type + "-" + elementObj.lid),
        text.classList.add("t-input-subtitle"),
        text.classList.add("t-descr"),
        text.classList.add("t-descr_xxs"),
        text.classList.add("t-opacity_70"),
        text.setAttribute("field", "nullli_subtitle__" + elementObj.lid),
        t_zeroForms__setTitleStyles(text, titleStyles, ""),
        (text.textContent = elementObj.li_subtitle),
        inputGroup.insertAdjacentElement("beforeend", text);
}
function t_zeroForms__generateTitle(elementObj, titleStyles, inputGroup, titleFontWeight) {
    var exceptTypes,
        isExceptType = ["rd", "ri", "uw", "uc", "fr", "cb"].some(function (type) {
            return type === elementObj.li_type;
        }),
        title = document.createElement(isExceptType ? "div" : "label");
    "LABEL" === title.tagName && (title.style.display = "block"),
        "LABEL" === title.tagName && title.setAttribute("for", elementObj.li_type + "-" + elementObj.lid),
        title.classList.add("t-input-title"),
        title.setAttribute("data-redactor-toolbar", "no"),
        title.setAttribute("field", "nullli_title__" + elementObj.lid),
        t_zeroForms__setTitleStyles(title, titleStyles, titleFontWeight),
        (title.textContent = elementObj.li_title),
        inputGroup.insertAdjacentElement("beforeend", title);
}
function t_zeroForms__createPhoneInput(recid, elementObj, inputStyles, inputPreferences) {
    var maskType = elementObj.li_masktype,
        input = document.createElement("input");
    if (
        (elementObj.li_title || elementObj.li_subtitle ? (input.id = elementObj.li_type + "-" + elementObj.lid) : (input.ariaLabel = "phone"),
        t_zeroForms__appendMainSettingToField(input, inputPreferences, "tel", ""),
        "a" === maskType ? input.classList.add("js-phonemask-input") : elementObj.li_mask && input.classList.add("js-tilda-mask"),
        "a" === maskType)
    ) {
        var browserLangCode = "RU" === window.t_zeroForms__browserLang ? "+7" : "+1";
        (input.placeholder = browserLangCode + "(999)999-9999"),
            input.setAttribute("data-phonemask-init", "no"),
            input.setAttribute("data-phonemask-id", recid),
            input.setAttribute("data-phonemask-lid", elementObj.lid),
            elementObj.li_maskcountry && input.setAttribute("data-phonemask-maskcountry", elementObj.li_maskcountry),
            inputPreferences.secondaryClassName && input.classList.add(inputPreferences.secondaryClassName),
            inputPreferences.require && input.setAttribute("data-tilda-req", "1");
    } else t_zeroForms__appendAttributes(input, inputPreferences), input.setAttribute("data-tilda-rule", "phone"), inputPreferences.mask && input.setAttribute("data-tilda-mask", inputPreferences.mask);
    return t_zeroForms__appendStylesToField(input, inputStyles), input;
}
function t_zeroForms__createInput(elementObj, inputStyles, inputPreferences, type) {
    var input = document.createElement("textarea" === type ? "textarea" : "input"),
        tildaRuleTypes,
        isTildaRuleType,
        textAreaStyleContent;
    (elementObj.li_title || elementObj.li_subtitle ? (input.id = elementObj.li_type + "-" + elementObj.lid) : (input.ariaLabel = type),
    t_zeroForms__appendMainSettingToField(input, inputPreferences, "textarea" === type ? "" : "text", ""),
    ["name", "time", "url", "email"].some(function (tildaRuleType) {
        return tildaRuleType === type;
    }) && input.setAttribute("data-tilda-rule", type),
    "time" === type && (input.setAttribute("data-tilda-mask", "99:99"), input.classList.add("t-inputtime")),
    ("time" === type || ("oneline" === type && elementObj.li_mask)) && input.classList.add("js-tilda-mask"),
    "oneline" === type && (inputPreferences.rule && input.setAttribute("data-tilda-rule", inputPreferences.rule), inputPreferences.mask && input.setAttribute("data-tilda-mask", inputPreferences.mask)),
    t_zeroForms__appendAttributes(input, inputPreferences),
    t_zeroForms__appendStylesToField(input, inputStyles),
    "textarea" === type) &&
        (t_zeroForms__setScriptOrStyle("zero-forms-textarea-styles", "", ".t396__elem .t-input-group_ta textarea.t-input {padding-top:10px; vertical-align: bottom; resize: none;}", "style", !1),
        t_zeroForms__setTextareaHeight(elementObj, input));
    return input;
}
function t_zeroForms__setTextareaHeight(elementObj, textarea) {
    var textAreaRowHeight = 25,
        textAreaPadding = 10;
    elementObj.li_rows > 1 && ((textarea.style.height = 25 * elementObj.li_rows + 10 + "px"), textarea.setAttribute("data-rows", elementObj.li_rows)), (textarea.rows = parseInt(elementObj.li_rows, 10) || 3);
}
function t_zeroForms__createSelect(elementObj, inputStyles, inputPreferences, hasBBOnly) {
    var options = elementObj.li_variants ? elementObj.li_variants.split("\n") : [],
        selectedOption = parseInt(elementObj.li_defselitem, 10),
        inputWrapper = document.createElement("div");
    inputWrapper.classList.add("t-select__wrapper"), inputPreferences.secondaryClassName && inputWrapper.classList.add("t-select__wrapper_bbonly");
    var input = document.createElement("select");
    if (
        ((input.id = elementObj.li_type + "-" + elementObj.lid),
        t_zeroForms__appendMainSettingToField(input, inputPreferences, "", "t-select"),
        inputPreferences.secondaryClassName && input.classList.add("t-select_bbonly"),
        inputPreferences.require && input.setAttribute("data-tilda-req", "1"),
        t_zeroForms__appendStylesToField(input, inputStyles),
        elementObj.li_selfirstvar)
    ) {
        var firstOption = document.createElement("option");
        (firstOption.textContent = elementObj.li_selfirstvar), firstOption.setAttribute("value", ""), input.insertAdjacentElement("beforeend", firstOption);
    }
    var optionHasColor = inputStyles && inputStyles.color && !hasBBOnly;
    return (
        options.forEach(function (option, i) {
            var optionEl = document.createElement("option");
            (optionEl.value = option),
                (optionEl.textContent = option),
                optionHasColor && (optionEl.style.color = inputStyles.color),
                selectedOption && selectedOption === i + 1 && (optionEl.selected = !0),
                input.insertAdjacentElement("beforeend", optionEl);
        }),
        inputWrapper.insertAdjacentElement("beforeend", input),
        inputWrapper
    );
}
function t_zeroForms__createRadio(elementObj, formObj, inputPreferences, labelStyles) {
    var radioOptions = elementObj.li_variants ? elementObj.li_variants.split("\n") : [],
        isCheckbox = "cb" === elementObj.li_radcb,
        selectedOption = parseInt(elementObj.li_defselitem, 10),
        fragment = document.createDocumentFragment(),
        wrapperClassName,
        wrapper = t_zeroForms__createWrapper((isCheckbox ? "t-checkboxes" : "t-radio") + "__wrapper");
    isCheckbox && fragment.appendChild(t_zeroForms__createNameFieldForCheckbox(inputPreferences, wrapper, "checkboxes")), fragment.appendChild(wrapper);
    var inputType = isCheckbox ? "checkbox" : "radio",
        fieldSet = document.createElement("fieldset");
    return (
        wrapper.insertAdjacentElement("beforeend", fieldSet),
        radioOptions.forEach(function (radioOption, i) {
            var label = t_zeroForms__createLabel(inputType, labelStyles, formObj),
                input = document.createElement("input");
            (input.type = inputType), (input.value = radioOption), input.classList.add("t-" + inputType), isCheckbox || input.classList.add("js-tilda-rule"), isCheckbox || (input.name = inputPreferences.name);
            var inputDescription = elementObj.li_title || elementObj.li_subtitle;
            !isCheckbox && inputDescription && (input.ariaLabel = inputDescription),
                selectedOption && selectedOption === i + 1 && (input.checked = !0),
                inputPreferences.require && input.setAttribute("data-tilda-req", "1"),
                label.insertAdjacentElement("beforeend", input);
            var indicator = t_zeroForms__createIndicator(inputType, formObj.inputelscolor, !1);
            label.insertAdjacentElement("beforeend", indicator);
            var textValue = document.createElement("span");
            (textValue.textContent = radioOption), label.insertAdjacentElement("beforeend", textValue), fieldSet.insertAdjacentElement("beforeend", label);
        }),
        fragment
    );
}
function t_zeroForms__createRadioImage(elementObj, formObj, inputPreferences) {
    var isCheckbox = "cb" === elementObj.li_radcb,
        galleryOptions;
    if (elementObj.li_gallery)
        try {
            galleryOptions = JSON.parse(elementObj.li_gallery);
        } catch (err) {}
    if (galleryOptions) {
        var arrayOfOptions = t_zeroForms__fromObjToArray(galleryOptions),
            selectedOption = parseInt(elementObj.li_defselitem, 10),
            fragment = document.createDocumentFragment(),
            wrapper = t_zeroForms__createWrapper("t-img-select__container");
        wrapper.setAttribute("data-check-bgcolor", formObj.inputelscolor || "#000"), isCheckbox && fragment.appendChild(t_zeroForms__createNameFieldForCheckbox(inputPreferences, wrapper, "img-select")), fragment.appendChild(wrapper);
        var inputType = isCheckbox ? "checkbox" : "radio",
            ratio,
            imgRatioClass = "t-img-select__indicator_" + (elementObj.li_imgratio ? elementObj.li_imgratio.replace("_", "-") : "1-1");
        return (
            arrayOfOptions.forEach(function (imgOption, i) {
                var label = t_zeroForms__createLabel("img-select", "", !1),
                    input = document.createElement("input");
                (input.type = inputType),
                    (input.value = imgOption.alt || imgOption.img),
                    input.classList.add("t-img-select"),
                    isCheckbox || (input.name = elementObj.li_nm),
                    isCheckbox || input.classList.add("js-tilda-rule"),
                    selectedOption && selectedOption === i + 1 && (input.checked = !0),
                    inputPreferences.require && input.setAttribute("data-tilda-req", "1"),
                    label.insertAdjacentElement("beforeend", input);
                var indicator = t_zeroForms__createIndicator("img-select", !1, { ratio: imgRatioClass, img: imgOption.img });
                if (
                    (indicator.classList.add("t-bgimg"),
                    indicator.classList.add("t-img-select__indicator"),
                    indicator.classList.add(imgRatioClass),
                    indicator.setAttribute("data-original", imgOption.img),
                    (indicator.style.backgroundImage = 'url("' + imgOption.img + '")'),
                    label.insertAdjacentElement("beforeend", indicator),
                    imgOption.alt)
                ) {
                    var textElement = document.createElement("div");
                    textElement.classList.add("t-img-select__text"),
                        textElement.classList.add("t-text"),
                        textElement.classList.add("t-text_xs"),
                        (textElement.textContent = imgOption.alt),
                        formObj.inputtitlecolor && (textElement.style.color = formObj.inputtitlecolor),
                        label.insertAdjacentElement("beforeend", textElement);
                }
                wrapper.insertAdjacentElement("beforeend", label);
            }),
            fragment
        );
    }
}
function t_zeroForms__createCheckbox(elementObj, labelStyles, formObj, inputPreferences) {
    var label = t_zeroForms__createLabel("checkbox", labelStyles, formObj),
        input = document.createElement("input");
    t_zeroForms__appendMainSettingToField(input, inputPreferences, "checkbox", "t-checkbox"),
        (input.value = "yes"),
        elementObj.li_checked && (input.checked = !0),
        inputPreferences.require && input.setAttribute("data-tilda-req", "1"),
        label.insertAdjacentElement("beforeend", input);
    var indicator = t_zeroForms__createIndicator("checkbox", formObj.inputelscolor, !1);
    label.insertAdjacentElement("beforeend", indicator);
    var labelText = document.createElement("span");
    return labelText.classList.add("t-checkbox__labeltext"), (labelText.innerHTML = elementObj.li_label), label.insertAdjacentElement("beforeend", labelText), label;
}
function t_zeroForms__createUploadField(elementObj, inputPreferences, type) {
    var isUpldWidget = "uw" === type;
    if ("published" !== window.tildamode) {
        var styles = "color:#fff;background-color:#000; padding:10px 20px; display:inline-block; margin-bottom:10px;",
            editorFileInput = document.createElement("div");
        editorFileInput.setAttribute("style", styles);
        var isNeedKey = isUpldWidget && "" === elementObj.li_uwkey;
        return (editorFileInput.textContent = isNeedKey ? "Please set the key" : "Upload button will be here"), editorFileInput;
    }
    var selector = isUpldWidget ? "t-upwidget" : "t-uploadcare",
        wrapper = t_zeroForms__createWrapper(selector),
        wrapperStyles = isUpldWidget ? "margin-bottom:5px;min-height:38px;" : "margin-bottom:10px;";
    wrapper.setAttribute("style", wrapperStyles);
    var input = document.createElement("input"),
        path;
    return (
        t_zeroForms__appendMainSettingToField(input, inputPreferences, "hidden", ""),
        input.setAttribute("role", isUpldWidget ? "upwidget-uploader" : "uploadcare-uploader"),
        inputPreferences.require && input.setAttribute("data-tilda-req", "1"),
        (input.style.display = "none"),
        isUpldWidget
            ? (input.setAttribute("data-tilda-upwidget-key", elementObj.li_uwkey || ""), "y" === elementObj.li_multiupl && input.setAttribute("data-tilda-upwidget-multiple", "1"))
            : input.setAttribute("data-public-key", elementObj.li_uckey || "demopublickey"),
        wrapper.insertAdjacentElement("beforeend", input),
        t_zeroForms__setScriptOrStyle(selector + "-zero-form", isUpldWidget ? "tilda-upwidget-1.1.min.js" : "uploadcare-3.x.min.js", "", "script", !1),
        wrapper
    );
}
function t_zeroForms__createDateField(elementObj, inputPreferences, inputStyles, formObj) {
    var wrapper = t_zeroForms__createWrapper("t-datepicker__wrapper"),
        input = document.createElement("input"),
        datepickerRestrictions =
            (elementObj.li_dateUnavailPast ? "past," : "") +
            (elementObj.li_dateUnavailMo ? "mo," : "") +
            (elementObj.li_dateUnavailTu ? "tu," : "") +
            (elementObj.li_dateUnavailWe ? "we," : "") +
            (elementObj.li_dateUnavailTh ? "th," : "") +
            (elementObj.li_dateUnavailFr ? "fr," : "") +
            (elementObj.li_dateUnavailSa ? "sa," : "") +
            (elementObj.li_dateUnavailSu ? "su," : "") +
            (elementObj.li_dateUnavailFuture ? "future," : "") +
            (elementObj.li_dateUnavailToday ? "today," : "");
    datepickerRestrictions.length && "," === datepickerRestrictions[datepickerRestrictions.length - 1] && (datepickerRestrictions = datepickerRestrictions.slice(0, -1)),
        t_zeroForms__appendMainSettingToField(input, inputPreferences, "text", ["t-input", "t-datepicker", "js-tilda-mask"]),
        t_zeroForms__appendAttributes(input, inputPreferences),
        t_zeroForms__appendStylesToField(input, inputStyles),
        input.setAttribute("data-tilda-rule", "date"),
        input.setAttribute("data-tilda-dateformat", elementObj.li_dateformat),
        input.setAttribute("data-tilda-datediv", elementObj.li_datediv),
        input.setAttribute("data-tilda-mask", elementObj.li_datemask),
        input.setAttribute("data-tilda-dateunvailable", datepickerRestrictions),
        (input.id = elementObj.li_type + "-" + elementObj.lid),
        wrapper.insertAdjacentElement("beforeend", input);
    var svgIconColor,
        svgIcon =
            '<svg class="t-datepicker__icon" fill="' +
            (formObj.inputsstyle ? formObj.inputelscolor : inputStyles.color) +
            '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69.5 76.2" style="width:25px;"><path d="M9.6 42.9H21V31.6H9.6v11.3zm3-8.3H18v5.3h-5.3v-5.3zm16.5 8.3h11.3V31.6H29.1v11.3zm3-8.3h5.3v5.3h-5.3v-5.3zM48 42.9h11.3V31.6H48v11.3zm3-8.3h5.3v5.3H51v-5.3zM9.6 62H21V50.6H9.6V62zm3-8.4H18V59h-5.3v-5.4zM29.1 62h11.3V50.6H29.1V62zm3-8.4h5.3V59h-5.3v-5.4zM48 62h11.3V50.6H48V62zm3-8.4h5.3V59H51v-5.4z"></path><path d="M59.7 6.8V5.3c0-2.9-2.4-5.3-5.3-5.3s-5.3 2.4-5.3 5.3v1.5H40V5.3C40 2.4 37.6 0 34.7 0s-5.3 2.4-5.3 5.3v1.5h-9.1V5.3C20.3 2.4 18 0 15 0c-2.9 0-5.3 2.4-5.3 5.3v1.5H0v69.5h69.5V6.8h-9.8zm-7.6-1.5c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3v7.1c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3V5.3zm-19.7 0c0-1.3 1-2.3 2.3-2.3S37 4 37 5.3v7.1c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3V5.3zm-19.6 0C12.8 4 13.8 3 15 3c1.3 0 2.3 1 2.3 2.3v7.1c0 1.3-1 2.3-2.3 2.3-1.3 0-2.3-1-2.3-2.3V5.3zm53.7 67.9H3V9.8h6.8v2.6c0 2.9 2.4 5.3 5.3 5.3s5.3-2.4 5.3-5.3V9.8h9.1v2.6c0 2.9 2.4 5.3 5.3 5.3s5.3-2.4 5.3-5.3V9.8h9.1v2.6c0 2.9 2.4 5.3 5.3 5.3s5.3-2.4 5.3-5.3V9.8h6.8l-.1 63.4z"></path></svg>';
    return (
        wrapper.insertAdjacentHTML("beforeend", svgIcon),
        t_zeroForms__setScriptOrStyle("t-zero-date-styles", "tilda-date-picker-1.0.min.css", "", "link", !1),
        t_zeroForms__setScriptOrStyle("t-zero-date-script", "tilda-date-picker-1.0.min.js", "", "script", !1),
        wrapper
    );
}
function t_zeroForms__createQuantityField(elementObj, inputStyles, color, inputPreferences) {
    var wrapper = t_zeroForms__createWrapper("t-inputquantity__wrapper"),
        minusBtn = t_zeroForms__createQuantityBtn("minus", color),
        plusBtn = t_zeroForms__createQuantityBtn("plus", color),
        input = document.createElement("input");
    return (
        t_zeroForms__appendMainSettingToField(input, inputPreferences, "text", ["t-input", "t-inputquantity"]),
        t_zeroForms__appendAttributes(input, inputPreferences),
        t_zeroForms__appendStylesToField(input, inputStyles),
        (input.value = elementObj.li_value || ""),
        (input.id = elementObj.li_type + "-" + elementObj.lid),
        input.setAttribute("data-tilda-rule", "number"),
        wrapper.insertAdjacentElement("beforeend", minusBtn),
        wrapper.insertAdjacentElement("beforeend", input),
        wrapper.insertAdjacentElement("beforeend", plusBtn),
        wrapper
    );
}
function t_zeroForms__createQuantityBtn(type, color) {
    var btn = document.createElement("span");
    return btn.classList.add("t-inputquantity__btn"), btn.classList.add("t-inputquantity__btn-" + type), color && (btn.style.color = color), (btn.innerHTML = "minus" === type ? "&ndash;" : "+"), btn;
}
function t_zeroForms__createQuantityRange(elementObj, inputStyles, formObj, inputPreferences) {
    var wrapper = t_zeroForms__createWrapper("t-range__wrapper"),
        input = document.createElement("input");
    t_zeroForms__appendMainSettingToField(input, inputPreferences, "range", "t-range"),
        formObj.inputelscolor && input.setAttribute("data-range-color", formObj.inputelscolor),
        (input.min = elementObj.li_vmin || "0"),
        (input.max = elementObj.li_vmax || "10"),
        (input.step = elementObj.li_step || "1"),
        (input.value = elementObj.li_value),
        (input.style.width = "100%"),
        elementObj.li_title || elementObj.li_subtitle ? (input.id = elementObj.li_type + "-" + elementObj.lid) : (input.ariaLabel = "range"),
        wrapper.insertAdjacentElement("beforeend", input);
    var textField = document.createElement("div");
    textField.classList.add("t-range__value-txt"), textField.classList.add("t-descr"), textField.classList.add("t-descr_xxs"), (textField.style.display = "none"), wrapper.insertAdjacentElement("beforeend", textField);
    var textWrapper = document.createElement("div");
    textWrapper.classList.add("t-range__interval-txt-wrapper");
    var minValueField = t_zeroForms__createRangeField("min", formObj.inputtitlecolor, elementObj.li_vmin || "0"),
        maxValueField = t_zeroForms__createRangeField("max", formObj.inputtitlecolor, elementObj.li_vmax || "10");
    return (
        textWrapper.insertAdjacentElement("beforeend", minValueField),
        textWrapper.insertAdjacentElement("beforeend", maxValueField),
        wrapper.insertAdjacentElement("beforeend", textWrapper),
        t_zeroForms__setScriptOrStyle("t-zero-range-script", "tilda-range-1.0.min.js", "", "script", !1),
        t_zeroForms__setScriptOrStyle("t-zero-range-styles", "tilda-range-1.0.min.css", "", "link", !1),
        wrapper
    );
}
function t_zeroForms__createRangeField(type, color, value) {
    var textField = document.createElement("div");
    return (
        textField.classList.add("t-range__interval-txt"),
        textField.classList.add("t-range__interval-txt_" + type),
        textField.classList.add("t-descr"),
        textField.classList.add("t-descr_xxs"),
        color && (textField.style.color = color),
        (textField.textContent = value),
        textField
    );
}
function t_zeroForms__createCalculation(elementObj, inputStyles, inputPreferences, titleStyles) {
    var fragment = document.createDocumentFragment(),
        hiddenInput = document.createElement("input");
    t_zeroForms__appendMainSettingToField(hiddenInput, inputPreferences, "hidden", "t-calc__hiddeninput"), (hiddenInput.tabIndex = -1), (hiddenInput.value = "0"), fragment.appendChild(hiddenInput);
    var wrapper = t_zeroForms__createWrapper(["t-calc__wrapper", "t-name", "t-name_md"]);
    (wrapper.style.color = inputStyles.color),
        (wrapper.style.fontFamily = titleStyles.fontFamily),
        (wrapper.style.fontSize = inputStyles.fontSize),
        (wrapper.style.fontWeight = inputStyles.fontWeight),
        t_zeroForms__createCalcTextField(elementObj.li_prefix, "prefix", wrapper);
    var valueField = document.createElement("span");
    if (
        (valueField.classList.add("t-calc"),
        valueField.setAttribute("data-calc-expr", t_zeroForms__removeStringQuotes(elementObj.li_expr)),
        (valueField.textContent = "0"),
        wrapper.insertAdjacentElement("beforeend", valueField),
        t_zeroForms__createCalcTextField(elementObj.li_postfix, "postfix", wrapper),
        t_zeroForms__setScriptOrStyle("t-zero-calc", "tilda-calc-1.0.min.js", "", "script", !1),
        fragment.appendChild(wrapper),
        "y" !== elementObj.li_addtocart)
    )
        return fragment;
    if (elementObj.li_prod_title) {
        var titleInput = t_zeroForms__createHiddenField(elementObj.li_prod_title, "prod_title", "t-calc__hidden__prod_title");
        wrapper.insertAdjacentElement("beforeend", titleInput);
    }
    if (elementObj.li_prod_img) {
        var productIMG = t_zeroForms__createHiddenField(elementObj.li_prod_img, "prod_img", "t-calc__hidden__prod_img");
        wrapper.insertAdjacentElement("beforeend", productIMG);
    }
    return fragment;
}
function t_zeroForms__createCalcTextField(value, type, wrapper) {
    if (value) {
        var postfix = document.createElement("span");
        postfix.classList.add("t-calc__" + type + "-text"), (postfix.textContent = value), wrapper.insertAdjacentElement("beforeend", postfix);
    }
}
function t_zeroForms__createFormButton(recid, zeroForm, formID, formObj) {
    var btnWrapper = document.createElement("div");
    btnWrapper.classList.add("tn-form__submit"), (btnWrapper.style.textAlign = formObj.buttonalign), (btnWrapper.style.marginTop = formObj.buttonmargtop + "px");
    var btn = document.createElement("button");
    (btn.type = "submit"), btn.classList.add("t-submit"), (btn.style.padding = "0 15px"), (btn.style.display = "block");
    var title = formObj.buttontitle;
    return (
        title && (-1 !== title.indexOf("<br") ? (btn.innerHTML = title) : (btn.textContent = title)),
        t_zeroForms__setBtnInlineStyles(formObj, btn),
        btnWrapper.insertAdjacentElement("beforeend", btn),
        "zero" === window.tildamode || "edit" === window.tildamode
            ? (window.tn && window.tn.curResolution < 640 && (btn.style.whiteSpace = "normal"), t_zeroForms__generateBtnStyles(btn, recid, formID, formObj, zeroForm))
            : t_zeroForms__onRender(zeroForm, !0, function () {
                  t_zeroForms__generateBtnStyles(btn, recid, formID, formObj, zeroForm);
              }),
        btnWrapper
    );
}
function t_zeroForms__setBtnInlineStyles(formObj, btn) {
    var btnFontWeight = "variation" === formObj.buttonfontweight ? formObj.buttonvariationweight : formObj.buttonfontweight;
    (btn.style.width = formObj.buttonwidth ? formObj.buttonwidth + "px" : "100%"),
        btnFontWeight && (btn.style.fontWeight = btnFontWeight),
        formObj.buttonheight && (btn.style.height = formObj.buttonheight + "px"),
        "center" === formObj.buttonalign ? ((btn.style.marginLeft = "auto"), (btn.style.marginRight = "auto")) : ((btn.style.marginLeft = ""), (btn.style.marginRight = "")),
        (formObj.buttonshadowsize || formObj.buttonshadowopacity) &&
            (btn.style.boxShadow = "0px 0px " + (formObj.buttonshadowsize ? formObj.buttonshadowsize + "px" : "10px") + " 0px rgba(0, 0, 0, " + (formObj.buttonshadowopacity ? formObj.buttonshadowopacity / 100 : "0.3") + ")");
}
function t_zeroForms__generateBtnStyles(btn, recid, formID, formObj, zeroForm) {
    var btnFontFamily,
        buttonStyles = t_zeroForms__generateButtonStyles(formObj, window.getComputedStyle(btn).fontFamily),
        buttonHoverStyles = t_zeroForms__generateButtonHoverStyles(formObj),
        hasUploadCare = document.getElementById("t-uploadcare-zero-form"),
        hasUploadWidget = document.getElementById("t-upwidget-zero-form"),
        baseSelector = t_zeroForms__createSelector(recid, formID, ""),
        selector = baseSelector + ".t-submit";
    hasUploadCare && ((selector += ", "), (selector += baseSelector + ".uploadcare--widget__button.uploadcare--widget__button_type_open")),
        hasUploadWidget && ((selector += ", "), (selector += baseSelector + ".t-upwidget-container__button"));
    var transition,
        styleValue = selector + "{" + buttonStyles + (buttonHoverStyles ? "transition: 0.3s ease all;" : "") + "}",
        btnStylesID = "t-zero-form-btn-styles-" + formID + "-" + recid,
        btnStyles = document.getElementById(btnStylesID);
    if ((btnStyles && btnStyles.parentElement && btnStyles.parentElement.removeChild(btnStyles), t_zeroForms__setScriptOrStyle(btnStylesID, "", styleValue, "style", zeroForm), buttonHoverStyles)) {
        var hoverSelector = selector.split(", ").map(function (selectorPart) {
                return selectorPart + ":hover";
            }),
            styleHoverValue = (hoverSelector = hoverSelector.join(", ")) + "{" + buttonHoverStyles + "}",
            btnHoverStylesID = "t-zero-form-btn-hover-styles-" + formID + "-" + recid,
            btnHoverStyles = document.getElementById(btnHoverStylesID);
        btnHoverStyles && btnHoverStyles.parentElement && btnHoverStyles.parentElement.removeChild(btnHoverStyles), t_zeroForms__setScriptOrStyle(btnHoverStylesID, "", styleHoverValue, "style", zeroForm);
    }
}
function t_zeroForms__generateButtonStyles(formObj, btnFontFamily) {
    var buttonStyles = {
            color: formObj.buttoncolor || "",
            border: formObj.buttonbordersize ? formObj.buttonbordersize + "px solid " + (formObj.buttonbordercolor || "transparent") : "",
            "border-radius": formObj.buttonradius || "0",
            "font-size": formObj.buttonfontsize || "",
            "font-family": formObj.buttonfontfamily || btnFontFamily,
            cursor: "pointer",
        },
        stylesString = "",
        pxValues = ["font-size", "height", "border-radius"];
    for (var k in buttonStyles) {
        var isPxContains;
        if (buttonStyles[k])
            pxValues.some(function (key) {
                return key === k.toString();
            }) && (buttonStyles[k] += "px"),
                (stylesString += k + ":" + buttonStyles[k] + ";");
    }
    return (stylesString += t_zeroForms__processButtonBG(formObj.buttonbgcolor, !1));
}
function t_zeroForms__processButtonBG(buttonBG, isHover) {
    if (!buttonBG) return isHover ? "" : "background-color: transparent;";
    if (-1 !== buttonBG.indexOf("-gradient(")) return "background-image: " + buttonBG + ";";
    var colorStyle = "background-color: " + buttonBG + ";";
    return isHover && (colorStyle += "background-image: none;"), colorStyle;
}
function t_zeroForms__generateButtonHoverStyles(formObj) {
    if (!(formObj.buttonhovercolor || formObj.buttonhoverbordercolor || formObj.buttonhoverbgcolor || formObj.buttonhovershadowsize)) return "";
    var buttonHoverStyles = { color: formObj.buttonhovercolor || "", "border-color": formObj.buttonhoverbordercolor || "" };
    (formObj.buttonhovershadowsize || formObj.buttonshadowopacity) &&
        (buttonHoverStyles["box-shadow"] =
            "0px 0px " + (formObj.buttonhovershadowsize ? formObj.buttonhovershadowsize + "px" : "10px") + " 0px rgba(0, 0, 0, " + (formObj.buttonshadowopacity ? formObj.buttonshadowopacity / 100 : "0.3") + ")");
    var stylesString = "";
    for (var k in buttonHoverStyles) buttonHoverStyles[k] && (stylesString += k + ":" + buttonHoverStyles[k] + ";");
    return (stylesString += t_zeroForms__processButtonBG(formObj.buttonhoverbgcolor, !0));
}
function t_zeroForms__createErrorBox(formObj, direction) {
    var errorBox = document.createElement("div");
    errorBox.classList.add("t-form__errorbox-" + direction);
    var wrapper = document.createElement("div");
    wrapper.classList.add("js-errorbox-all"), wrapper.classList.add("t-form__errorbox-wrapper"), (wrapper.style.display = "none"), errorBox.insertAdjacentElement("beforeend", wrapper);
    var textWrapper = document.createElement("div"),
        fields;
    textWrapper.classList.add("t-form__errorbox-text"),
        textWrapper.classList.add("t-text_xs"),
        textWrapper.classList.add("t-text"),
        ["all", "req", "email", "name", "phone", "string"].forEach(function (field) {
            var text = document.createElement("p");
            text.classList.add("t-form__errorbox-item"),
                text.classList.add("js-rule-error"),
                text.classList.add("js-rule-error-" + field),
                "all" !== field && "string" !== field && (text.textContent = formObj["formerr" + field]),
                textWrapper.insertAdjacentElement("beforeend", text);
        }),
        wrapper.insertAdjacentElement("beforeend", textWrapper);
    var errorBoxCloseBtn = document.createElement("div");
    return (
        errorBoxCloseBtn.classList.add("tn-form__errorbox-close"),
        errorBoxCloseBtn.classList.add("js-errorbox-close"),
        errorBoxCloseBtn.insertAdjacentElement("beforeend", t_zeroForms__createErrorBoxBtn("left")),
        errorBoxCloseBtn.insertAdjacentElement("beforeend", t_zeroForms__createErrorBoxBtn("right")),
        wrapper.insertAdjacentElement("beforeend", errorBoxCloseBtn),
        document.removeEventListener("click", t_zeroForms__initErrorBoxClose),
        document.addEventListener("click", t_zeroForms__initErrorBoxClose),
        t_zeroForms__setScriptOrStyle("t-zero-form-errorbox-styles", "tilda-zero-form-errorbox.min.css", "", "link", !1),
        errorBox
    );
}
function t_zeroForms__createErrorBoxBtn(position) {
    var errorBoxEl = document.createElement("div");
    return errorBoxEl.classList.add("tn-form__errorbox-close-line"), errorBoxEl.classList.add("tn-form__errorbox-close-line-" + position), errorBoxEl;
}
function t_zeroForms__getBottomText(formID, formObj, recid, zeroForm) {
    var checkboxList, isCheckbox;
    if (
        ["cb", "cbx"].some(function (cb) {
            return formObj.formbottomcb === cb;
        })
    ) {
        var label = t_zeroForms__createLabel("checkbox", "", !1);
        label.classList.add("t-text"), label.classList.add("t-text_xxs"), formObj.inputtitlecolor && (label.style.color = formObj.inputtitlecolor);
        var input = document.createElement("input"),
            inputPreferences;
        t_zeroForms__appendMainSettingToField(input, { name: "form_bottom_checkbox" }, "checkbox", "t-checkbox"),
            input.setAttribute("data-tilda-req", "1"),
            "cbx" === formObj.formbottomcb && (input.checked = !0),
            label.insertAdjacentElement("beforeend", input);
        var indicator = t_zeroForms__createIndicator("checkbox", formObj.inputelscolor, !1);
        (indicator.style.width = "15px"), (indicator.style.height = "15px"), (indicator.style.marginRight = "5px"), label.insertAdjacentElement("beforeend", indicator);
        var labelText = document.createElement("span");
        labelText.classList.add("t-checkbox__labeltext"), (labelText.innerHTML = formObj.formbottomtext), label.insertAdjacentElement("beforeend", labelText);
        var selector = t_zeroForms__createSelector(recid, formID, ".t-form__bottom-text .t-checkbox__indicator:after"),
            styles = formObj.inputelscolor ? "color: " + formObj.inputelscolor + ";" : "";
        return t_zeroForms__setScriptOrStyle("t-zero-form-btn-styles-" + formID, "", selector + "{" + (styles += "left:3px;top:0;height:6px;") + "}", "style", zeroForm), label;
    }
    var span = document.createElement("span");
    return (span.innerHTML = formObj.formbottomtext), span;
}
function t_zeroForms__animateInputs(zeroForm, formObj, recid, formID) {
    var mainSelector = t_zeroForms__createSelector(recid, formID, ""),
        styles = mainSelector + ".t-input-group:not(.t-input-group_da):not(.t-input-group_ph):not(.t-input-group_uw):not(.t-input-group_ri):not(.t-input-group_cb):not(.t-input-group_rg) .t-input-block, .t-datepicker__wrapper";
    (styles += "{position: relative; overflow: hidden;}"),
        formObj.inputcolor && ((styles += mainSelector + ".t-input__vis-ph"), (styles += "{color:" + formObj.inputcolor + ";}")),
        t_zeroForms__setScriptOrStyle("t-zero-form-anim-styles-" + recid + "-" + formID, "", styles, "style", zeroForm);
    var topOffset = (Number(formObj.inputheight) - Number(formObj.inputfontsize)) / 2,
        fontWeight = "variation" === formObj.inputfontweight ? formObj.inputvariationweight : formObj.inputfontweight,
        selector = mainSelector + ".t-input:not(.t-inputquantity):not(.t-input-phonemask__wrap):not(.t-input-phonemask)",
        inputList;
    if (
        (Array.prototype.slice.call(document.querySelectorAll(selector)).forEach(function (input) {
            input.classList.add("t-input_pvis"),
                input.addEventListener("blur", function (e) {
                    "1" === e.target.getAttribute("data-tilda-mask-init")
                        ? setTimeout(function () {
                              e.target.value ? e.target.classList.add("t-input_has-content") : e.target.classList.remove("t-input_has-content");
                          })
                        : e.target.value
                        ? e.target.classList.add("t-input_has-content")
                        : e.target.classList.remove("t-input_has-content");
                });
            var placeholder = input.getAttribute("placeholder");
            if (placeholder) {
                var animField = document.createElement("div");
                animField.classList.add("t-input__vis-ph"),
                    topOffset && (animField.style.top = topOffset + "px"),
                    fontWeight && (animField.style.fontWeight = fontWeight),
                    formObj.inputfontsize && ((animField.style.fontSize = formObj.inputfontsize + "px"), (animField.style.height = parseInt(formObj.inputfontsize, 10) + 1 + "px")),
                    (animField.textContent = placeholder),
                    input.insertAdjacentElement("afterend", animField),
                    input.removeAttribute("placeholder");
            }
        }),
        window.t_zeroForms__isiOS && window.t_zeroForms__iOSMajorVersion < 13)
    ) {
        var textareaNotBBOnly = zeroForm.querySelectorAll("textarea:not(.t-input_bbonly)"),
            textareaBBOnly = zeroForm.querySelectorAll("textarea.t-input_bbonly");
        Array.prototype.forEach.call(textareaNotBBOnly, function (textarea) {
            textarea.style.paddingLeft = "17px";
        }),
            Array.prototype.forEach.call(textareaBBOnly, function (textarea) {
                textarea.style.textIndent = "-3px";
            });
    }
}
function t_zeroForms__appendAttributes(input, inputPreferences) {
    inputPreferences.secondaryClassName && input.classList.add(inputPreferences.secondaryClassName),
        inputPreferences.placeholder && (input.placeholder = inputPreferences.placeholder),
        inputPreferences.require && input.setAttribute("data-tilda-req", "1");
}
function t_zeroForms__appendStylesToField(input, inputStyles) {
    for (var k in (input.classList.contains("t-input-inline-styles") || input.classList.add("t-input-inline-styles"), inputStyles)) input.style[k] = inputStyles[k];
    if (input.classList.contains("t-input-phonemask__wrap")) {
        var phoneMaskSelect = input.querySelector(".t-input-phonemask__select-code");
        phoneMaskSelect && (phoneMaskSelect.style.fontSize = inputStyles.fontSize), phoneMaskSelect && (phoneMaskSelect.style.fontWeight = inputStyles.fontWeight);
        var phoneMaskInput = input.querySelector(".t-input-phonemask");
        phoneMaskInput && (phoneMaskInput.style.fontSize = inputStyles.fontSize), phoneMaskInput && (phoneMaskInput.style.fontWeight = inputStyles.fontWeight);
    }
}
function t_zeroForms__setIndicatorStyles(recid, formID, color, type, field) {
    if (color && field) {
        var selector = ".t-" + type + "__indicator:after",
            currentStyle = "checkbox" === type ? "border-color" : "background-color",
            styles = document.createElement("style"),
            mainSelector = t_zeroForms__createSelector(recid, formID, selector);
        (styles.textContent = mainSelector + "{" + currentStyle + ":" + color + ";}"), field.appendChild(styles);
    }
}
function t_zeroForms__createInputPlaceholderStyles(formID, formObj, recid, zeroForm) {
    var postfixList = ["::-webkit-input-placeholder", "::-moz-placeholder", ":-moz-placeholder", ":-ms-input-placeholder"],
        elements = ["input", "textarea"],
        selector = t_zeroForms__createSelector(recid, formID, ""),
        styles = "",
        stylesID;
    elements.forEach(function (element) {
        postfixList.forEach(function (postfix) {
            styles += selector + element + postfix + "{color:" + formObj.inputcolor + ";opacity:0.5;}";
        });
    }),
        t_zeroForms__setScriptOrStyle("t-zero-placeholder-" + recid + "-" + formID, "", styles, "style", zeroForm);
}
function t_zeroForms__setScriptOrStyle(id, path, content, type, zeroForm) {
    if (!document.getElementById(id)) {
        var location = "https://static.tildacdn.com",
            element = document.createElement(type);
        content
            ? (element.textContent = content)
            : ("script" === type ? ((element.src = location + "/js/" + path), (element.async = !0), (element.charset = "utf-8")) : "link" === type && ((element.href = location + "/css/" + path), (element.rel = "stylesheet")),
              (element.onerror = function () {
                  t_zeroForms__onFuncLoad("t_fallback__reloadSRC", function () {
                      t_fallback__reloadSRC(element);
                  });
              })),
            (element.id = id);
        var atomEl = "style" === type && zeroForm ? zeroForm.querySelector(".tn-atom") : null,
            appendParent;
        ("style" === type && atomEl ? atomEl : document.body).insertAdjacentElement("beforeend", element);
    }
}
function t_zeroForms__createLabel(type, labelStyles, formObj) {
    var label = document.createElement("label");
    return (
        label.classList.add("t-" + type + "__control"),
        labelStyles && labelStyles.fontSize && (label.style.fontSize = labelStyles.fontSize + "px"),
        labelStyles && (label.style.fontWeight = labelStyles.fontWeight),
        formObj && formObj.inputtitlecolor && (label.style.color = formObj.inputtitlecolor),
        formObj && formObj.inputfontfamily && (label.style.fontFamily = formObj.inputfontfamily),
        label
    );
}
function t_zeroForms__createIndicator(type, colorStyle, imgIndicatorOpts) {
    var indicator = document.createElement("div");
    return (
        indicator.classList.add("t-" + type + "__indicator"),
        colorStyle && (indicator.style.borderColor = colorStyle),
        "img-select" === type && (indicator.classList.add("t-bgimg"), indicator.classList.add(imgIndicatorOpts.ratio), indicator.setAttribute("data-original", imgIndicatorOpts.img), (indicator.style.backgroundImage = imgIndicatorOpts.img)),
        indicator
    );
}
function t_zeroForms__createNameFieldForCheckbox(inputPreferences, wrapper, type) {
    var hiddenInput = document.createElement("input");
    return t_zeroForms__appendMainSettingToField(hiddenInput, inputPreferences, "hidden", "t-" + type + "__hiddeninput"), (hiddenInput.tabIndex = -1), inputPreferences.require && hiddenInput.setAttribute("data-tilda-req", "1"), hiddenInput;
}
function t_zeroForms__createHiddenField(value, name, fieldClass) {
    var input = document.createElement("input");
    return (input.type = "hidden"), (input.tabIndex = -1), value && (input.value = value), name && (input.name = name), fieldClass && input.classList.add(fieldClass), input;
}
function t_zeroForms__createWrapper(ListOfClasses) {
    var wrapper = document.createElement("div");
    return (
        "string" == typeof ListOfClasses
            ? wrapper.classList.add(ListOfClasses)
            : ListOfClasses.forEach(function (className) {
                  wrapper.classList.add(className);
              }),
        wrapper
    );
}
function t_zeroForms__appendMainSettingToField(input, inputPreferences, type, supportClassList) {
    type && "select" !== type && (input.type = type),
        (input.name = inputPreferences.name || ""),
        supportClassList || input.classList.add("t-input"),
        supportClassList &&
            ("object" == typeof supportClassList
                ? supportClassList.forEach(function (className) {
                      input.classList.add(className);
                  })
                : "string" == typeof supportClassList && input.classList.add(supportClassList)),
        input.classList.add("js-tilda-rule");
}
function t_zeroForms__initInputStyles(formObj, inputFontWeight) {
    var inputStyles = {
            color: formObj.inputcolor || "",
            border: formObj.inputbordersize ? formObj.inputbordersize + "px solid " + (formObj.inputbordercolor || "#000") : "",
            backgroundColor: formObj.inputbgcolor || "transparent",
            borderRadius: formObj.inputradius || "",
            fontSize: formObj.inputfontsize || "",
            fontWeight: inputFontWeight || "",
            height: formObj.inputheight || "",
        },
        pxValues = ["fontSize", "height", "borderRadius"];
    for (var k in inputStyles) {
        var isPxContains;
        if (inputStyles[k])
            pxValues.some(function (key) {
                return key === k.toString();
            }) && (inputStyles[k] += "px");
        else delete inputStyles[k];
    }
    return inputStyles;
}
function t_zeroForms__setTitleStyles(textEl, titleStyles, titleFontWeight) {
    var isTitle = textEl.classList.contains("t-input-title");
    (textEl.style.color = titleStyles.color || ""),
        (textEl.style.fontFamily = titleStyles.fontFamily || ""),
        (textEl.style.paddingBottom = titleStyles.paddingBottom ? titleStyles.paddingBottom + "px" : ""),
        isTitle && (textEl.style.fontSize = titleStyles.fontSize ? titleStyles.fontSize + "px" : ""),
        isTitle && titleFontWeight && (textEl.style.fontWeight = titleFontWeight);
}
function t_zeroForms__isRecordHidden(rec) {
    return (
        !!rec &&
        "yes" === rec.getAttribute("data-connect-with-tab") &&
        ["t397__off", "t395__off", "t400__off"].some(function (className) {
            return rec.classList.contains(className);
        })
    );
    var classList;
}
function t_zeroForms__isFormOutside(form) {
    var artBoard = form.closest(".t396__artboard");
    if (!artBoard || form.hasAttribute("data-animate-sbs-opts")) return !1;
    var artBoardPos = artBoard.getBoundingClientRect(),
        formPos = form.getBoundingClientRect(),
        artBoardRightPos = artBoardPos.right + window.pageXOffset;
    if (formPos.right < 0 && artBoardRightPos > 0) return !0;
    var overflowValue = !!artBoard && artBoard.getAttribute("data-artboard-ovrflw"),
        isOverflowNotHidden;
    if ("auto" === overflowValue || "visible" === overflowValue) return !1;
    var isScaled = artBoard.classList.contains("t396__artboard_scale");
    isScaled || (isScaled = "window" === t_zeroForms__getFieldValue(artBoard, "data-artboard", "upscale"));
    var isOnlyScalable = -1 !== navigator.userAgent.search("Firefox") || Boolean((window.opr && window.opr.addons) || window.opera || -1 !== navigator.userAgent.indexOf(" OPR/")),
        formLeftPos = formPos.left,
        formTopPos = form.style.top;
    formTopPos && formTopPos.indexOf("px") && (formTopPos = parseInt(formTopPos, 10)),
        (formTopPos = "number" == typeof formTopPos ? formTopPos : 0) < 0 && formTopPos > -50 && (formTopPos = 0),
        isScaled && !isOnlyScalable && ((formLeftPos *= window.tn_scale_factor), (formTopPos *= window.tn_scale_factor));
    var hasFixedAnimation = form.hasAttribute("data-animate-fix"),
        hasParallax = "scroll" === form.getAttribute("data-animate-prx"),
        isVerticalTopOutside = formTopPos < 0 && !hasFixedAnimation && !hasParallax,
        isVerticalBotttomOutside = artBoardPos.height > 0 && formTopPos > artBoardPos.height && !hasParallax;
    return isVerticalTopOutside || isVerticalBotttomOutside || formLeftPos > artBoardRightPos;
}
function t_zeroForms__getFieldValue(element, attrName, prop) {
    if (element && void 0 !== window.tn) {
        var artBoard,
            abResObj = t_zeroForms__getResOpts(element.closest(".t396__artboard, .tn-artboard")),
            postfix = "data-field" === attrName ? "-value" : "",
            desktopAttr = t_zeroForms__generateAttribute(attrName, prop, postfix, !1);
        if (abResObj.res === abResObj.resMax) return element.getAttribute(desktopAttr);
        var responsiveAttr = t_zeroForms__generateAttribute(attrName, prop, postfix, abResObj.res),
            currentValue = element.getAttribute(responsiveAttr);
        return "string" == typeof currentValue
            ? currentValue
            : (abResObj.breakpoints.forEach(function (breakpoint) {
                  if (!(breakpoint <= abResObj.res || "string" == typeof currentValue)) {
                      var curBreakpointAttr = t_zeroForms__generateAttribute(attrName, prop, postfix, breakpoint);
                      currentValue = element.getAttribute(curBreakpointAttr);
                  }
              }),
              "string" == typeof currentValue ? currentValue : element.getAttribute(desktopAttr) || "");
    }
}
function t_zeroForms__getEl(el) {
    return window.jQuery && el instanceof jQuery && el.length ? el.get(0) : el;
}
function t_zeroForms__generateAttribute(preffix, value, postfix, res) {
    var attribute = preffix + "-" + value;
    return res && (attribute += "-res-" + res), (attribute += postfix);
}
function t_zeroForms__getResOpts(artBoard) {
    var recid = t_zeroForms__getRecID(artBoard);
    return recid && window.tn["ab" + recid]
        ? { res: window.t396_detectResolution ? t396_detectResolution(recid) : window.tn["ab" + recid].curResolution, resMax: window.tn["ab" + recid].curResolution_max, breakpoints: window.tn["ab" + recid].screens.slice(0, -1) }
        : window.tn.screens
        ? { res: window.tn.curResolution, resMax: window.tn.topResolution, breakpoints: window.tn.screens.slice(0, -1) }
        : { res: window.tn.curResolution, resMax: 1200, breakpoints: [320, 480, 640, 960] };
}
function t_zeroForms__getRecID(elem) {
    var artBoard = elem.closest(".t396__artboard, .tn-artboard");
    return artBoard ? artBoard.getAttribute("data-artboard-recid") || artBoard.getAttribute("data-record-id") : "";
}
function t_zeroForms__createSelector(recid, formID, selector) {
    var recIdSelector;
    return ("zero" === window.tildamode ? '[data-record-id="' + recid + '"]' : "#rec" + recid) + ' [data-elem-id="' + formID + '"] ' + selector;
}
function t_zeroForms__removeStringQuotes(str) {
    return str ? str.replace(/"/g, "&quot;").replace(/'/g, "&apos;") : "";
}
function t_zeroForms__fromObjToArray(object) {
    var isSupportedObjValues = void 0 !== Object.values,
        arrayOfOptions = isSupportedObjValues ? Object.values(object) : [];
    if (!isSupportedObjValues) for (var k in object) arrayOfOptions.push(object[k]);
    return arrayOfOptions;
}
function t_zeroForms__updateCheckboxesValues() {
    var inputWrapper = this.closest("[data-input-lid]"),
        checkedCheckboxes = Array.prototype.slice.call(inputWrapper.querySelectorAll(".t-checkbox:checked")),
        value = "";
    checkedCheckboxes.forEach(function (checkbox) {
        value && (value += "; "), (value += checkbox.value);
    });
    var hiddenInput = inputWrapper.querySelector(".t-checkboxes__hiddeninput");
    hiddenInput && (hiddenInput.value = value);
}
function t_zeroForms__initQuanityClickCount(e) {
    var quantityBtn = e.target.closest(".t-inputquantity__btn");
    if (quantityBtn) {
        var currentParent,
            currentInput = quantityBtn.closest("[data-input-lid]").querySelector(".t-inputquantity"),
            isMinusBtn = quantityBtn.closest(".t-inputquantity__btn-minus"),
            event = document.createEvent("Event");
        event.initEvent("input", !0, !0),
            isMinusBtn
                ? currentInput.value > 0 && ((currentInput.value = Number(currentInput.value) - 1), currentInput.dispatchEvent(event))
                : currentInput.value >= 0 && ((currentInput.value = Number(currentInput.value) + 1), currentInput.dispatchEvent(event));
    }
}
function t_zeroForms__initErrorBoxClose(e) {
    var closeBtn = e.target.closest(".js-errorbox-close");
    closeBtn && (closeBtn.parentElement.style.display = "none");
}
function t_zeroForms__onReady(func) {
    "loading" !== document.readyState ? func() : document.addEventListener("DOMContentLoaded", func);
}
function t_zeroForms__onRender(form, modeChecked, callback) {
    (("edit" !== window.tildamode && "zero" !== window.tildamode) || !modeChecked) &&
        t_zeroForms__onReady(function () {
            form.classList.contains("zero-form-rendered") ? callback() : form.addEventListener("render", callback);
        });
}
function t_zeroForms__getTildaMode() {
    if (void 0 !== window.tildamode) return window.tildamode;
    var allRec = document.getElementById("allrecords");
    if (allRec)
        switch (allRec.getAttribute("data-tilda-mode")) {
            case "edit":
                window.tildamode = "edit";
                break;
            case "preview":
                window.tildamode = "preview";
                break;
            default:
                window.tildamode = "published";
        }
    return window.tildamode;
}
function t_zeroForms__createFormObj(zeroForm) {
    var formObj = {},
        fields;
    return (
        [
            "inputpos",
            "inputfontfamily",
            "fieldfontfamily",
            "inputfontsize",
            "inputfontweight",
            "inputvariationweight",
            "inputcolor",
            "inputbgcolor",
            "inputbordercolor",
            "inputbordersize",
            "inputradius",
            "inputheight",
            "inputmargbottom",
            "inputmargright",
            "inputtitlefontsize",
            "inputtitlefontweight",
            "inputtitlevariationweight",
            "inputtitlecolor",
            "inputelscolor",
            "inputelsfontsize",
            "inputelsfontweight",
            "inputelsvariationweight",
            "inputtitlemargbottom",
            "inputsstyle",
            "inputsstyle2",
            "buttontitle",
            "buttonalign",
            "buttoncolor",
            "buttonbgcolor",
            "buttonbordercolor",
            "buttonbordersize",
            "buttonradius",
            "buttonmargtop",
            "buttonwidth",
            "buttonheight",
            "buttonshadowsize",
            "buttonshadowopacity",
            "buttonfontfamily",
            "buttonfontsize",
            "buttonfontweight",
            "buttonvariationweight",
            "buttonuppercase",
            "buttonbgcolorhover",
            "buttoncolorhover",
            "buttonbordercolorhover",
            "buttonshadowsizehover",
            "buttonshadowopacityhover",
            "buttonspeedhover",
            "formmsgsuccess",
            "formmsgurl",
            "formerrreq",
            "formerremail",
            "formerrphone",
            "formerrname",
            "formbottomtext",
            "formbottomcb",
            "formname",
            "receivers",
            "buttonhovercolor",
            "buttonhoverbgcolor",
            "buttonhoverbordercolor",
            "buttonhovershadowsize",
        ].forEach(function (field) {
            formObj[field] = t_zeroForms__getFieldValue(zeroForm, "data-field", field);
        }),
        formObj
    );
}
function t_zeroForms__onFuncLoad(funcName, okFunc) {
    if ("function" == typeof window[funcName]) okFunc();
    else {
        var startTime = Date.now(),
            error = new Error(funcName + " is undefined"),
            callbackError = function () {
                throw error;
            };
        setTimeout(function checkFuncExist() {
            var currentTime = Date.now();
            "function" != typeof window[funcName] ? ("complete" === document.readyState && currentTime - startTime > 7e3 && "function" != typeof window[funcName] && callbackError(), setTimeout(checkFuncExist, 100)) : okFunc();
        });
    }
}
t_zeroForms__onReady(function () {
    var allrecords = document.getElementById("allrecords");
    if (allrecords) {
        var projectLang = allrecords.getAttribute("data-tilda-project-lang");
        projectLang && (window.t_zeroForms__browserLang = projectLang);
    }
});
