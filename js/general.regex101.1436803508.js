function isGroupType(e) {
    return e > 499
}

function getFlavor() {
    return $(".regex_menu .flavor_pcre").hasClass("active") ? FLAVOR.PCRE : $(".regex_menu .flavor_js").hasClass("active") ? FLAVOR.JS : $(".regex_menu .flavor_python").hasClass("active") ? FLAVOR.PYTHON : void 0
}

function setFlavor(e) {
    var t = "substitution; \\num = backreference, \\n = newline, \\t = tab";
    switch (debugHtml = debugData = {}, e) {
        case FLAVOR.JS:
            $(".slash_menu").attr("data-dropdown", ""), $("#sub").attr("placeholder", t.replace("\\num", "$num")), $("#options").attr("placeholder", "gmi"), $(".slash").text("/"), window.location.hash = "javascript", $("#debugger_menu, #format_regex").hide();
            break;
        case FLAVOR.PCRE:
            $(".slash_menu").attr("data-dropdown", ".delimiter-dropdown"), $("#options").attr("placeholder", "gmixXsuUAJ"), $("#sub").attr("placeholder", t), /^([\/~@;%`])\1$/.test($(".slash").text()) || $(".slash").text("/"), window.location.hash = "pcre", $("#format_regex, #debugger_menu").show(), $("#debugger_menu").addClass("disabled");
            break;
        case FLAVOR.PYTHON:
            $("#sub").attr("placeholder", t), $("#options").attr("placeholder", "gmixsu"), $(".slash").text('"'), $(".slash_menu").attr("data-dropdown", ""), window.location.hash = "python", $("#format_regex, #debugger_menu").show(), $("#debugger_menu").addClass("disabled")
    }
    cancelMatching(!0)
}

function escapeHtml(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

function isVisibleInViewport(e) {
    var t = e.getBoundingClientRect();
    return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth)
}

function getCaretPosition(e) {
    if (void 0 !== e.selectionStart) return e.selectionStart;
    if (document.selection) {
        var t = document.selection.createRange();
        if (null == t) return 0;
        var a = e.createTextRange(),
            n = a.duplicate();
        return a.moveToBookmark(t.getBookmark()), n.setEndPoint("EndToStart", a), n.text.length
    }
    return 0
}

function setCaretPosition(e, t) {
    if (null != e)
        if (e.createTextRange) {
            var a = e.createTextRange();
            a.move("character", t), a.select()
        } else e.selectionStart || 0 == e.selectionStart ? (e.focus(), e.setSelectionRange(t, t)) : e.focus()
}

function esc(e, t) {
    var a, n, r = "",
        o = 0;
    for (a = 0; a < e.length; a++) n = e.charAt(a), "\\" === n ? o++ : o % 2 == 0 ? n === t && (r += "\\") : n === t && 0 === o ? r += "\\" : o = 0, r += n;
    return r.replace(/((?:^|[^\\])(?:\\\\)*\\)$/g, "$1\\")
}

function replaceNewlines(e) {
    return e
}

function replaceNewlines_html(e, t) {
    return e.replace(/(\r\n|\n|\r)/g, '<span class="regex_newline">&not;</span>' + (t ? "$1" : "")).replace(/\f/g, "↡")
}

function replaceBackslash(e) {
    return e.replace(/\\(.)/g, "$1")
}

function screwSpamBots() {
    return "contact@regex101.com"
}

function grabSelection(e) {
    var t, a = document.getElementById(e);
    if (void 0 != document.selection) {
        a.focus();
        var n = document.selection.createRange();
        t = n.text
    } else if (void 0 != a.selectionStart) {
        var r = a.selectionStart,
            o = a.selectionEnd;
        t = a.value.substring(r, o)
    }
    return t
}

function replaceHtml(e, t) {
    var a = "string" == typeof e ? document.getElementById(e) : e;
    if ($.browser.msie) return a.innerHTML = t, a;
    var n = a.cloneNode(!1);
    return n.innerHTML = t, a.parentNode.replaceChild(n, a), n
}

function white_space(e) {
    return displayWhitespace() ? e.replace(/ /g, "<ins> </ins>").replace(/(\r|\n|\r\n)/g, "<s>$1</s>").replace(/\t/g, "<q>	</q>") : e
}

function white_space_nohtml(e) {
    return displayWhitespace() ? e.replace(/ /g, "&middot;").replace(/\r?\n/g, "&not;") : e.replace(/\r?\n/g, "&not;")
}

function displayNonParticipatingGroups() {
    return displayNonParticipatingGroupsElem.checked
}

function displayWhitespace() {
    return displayWhitespaceElem.checked
}

function colorizeRegex() {
    return colorizeRegexElem.checked
}

function wrapNewlines() {
    return wrapNewlinesElem.checked
}

function onIndexPage() {
    return $("#regex").length > 0 && $("#regex").is(":visible")
}

function autoCompleteRegex() {
    return autoCompleteRegexElem.checked
}

function highlightInteraction() {
    return highlightInteractionElem.checked
}

function sub_enabled() {
    return $("#subst_parent").hasClass("subst_enabled")
}

function getTheme() {
    return $("body").hasClass("dark") ? "dark" : "light"
}

function isDebugging() {
    return debugger_element.hasClass("active")
}

function setDefaultTheme() {
    resetTheme(!0), $("body").addClass("default")
}

function resetTheme(e) {
    $("#settings_popup_contents select option").each(function() {
        $("body").removeClass($(this).val()), e && $(this).prop("selected", "default" === $(this).val())
    })
}

function hasUnitTests() {
    return $(".all_tests .unit_test").length > 0
}

function stopUnitTests() {
    $(".run_tests").removeClass("fa-pause").addClass("fa-play"), $(".run_tests").attr("original-title", "Run tests"), $(".test_builder a.button").removeClass("disabled"), $(".unit_test span.right, .unit_result").removeClass("fail pass").text("n/a"), cancelUnitTest()
}

function getOptions() {
    return $("#options").val().replace(/[YC]/g, "")
}

function closePopup() {
    submitCommunity && "pending" == submitCommunity.state() && submitCommunity.abort(), communityTimeout && clearTimeout(communityTimeout), $("#dimmer, #dimmer-popup").hide()
}

function showPopup(e) {
    $("#dimmer-popup").html(e), $("#dimmer, #dimmer-popup").show(), $("#dimmer-popup").css({
        top: "50%",
        left: "50%",
        marginTop: -1 * ($("#dimmer-popup").height() / 2),
        marginLeft: -1 * ($("#dimmer-popup").width() / 2)
    })
}

function updateTooltipData() {
    $("#regex, #regex_string, #sub").trigger("updateTooltip")
}

function repeat(e, t) {
    return Array(t + 1).join(e)
}

function setCookieData(e, t) {
    var a = new Date;
    a.setTime(a.getTime() + 31536e6);
    var n = e + "=" + t;
    n += "; path=/; expires=" + a.toGMTString(), document.cookie = n
}

function readCookie(e) {
    for (var t = document.cookie.split(/; */), a = 0, n = t.length; n > a; a++) {
        var r = t[a].split("=");
        if (r[0] === e) return r[1]
    }
    return null
}

function ord(e) {
    var t = ["th", "st", "nd", "rd"],
        a = e % 100;
    return e + (t[(a - 20) % 10] || t[a] || t[0])
}

function login_callback(e) {
    e.close(), location.reload()
}

function parseSub(e, t, a, n) {
    function r(t, n) {
        return a ? t : colorizeRegex() ? '<b data-tooltip="' + n + '">' + t + "</b>" : e
    }

    function o(t, n) {
        return a ? !1 : colorizeRegex() ? '<b class="err" data-tooltip="' + n + '">' + t + "</b>" : e
    }

    function s(e, t) {
        return "<b>" + e + "</b>. " + t
    }
    var i = e.charAt(0),
        c = e.charAt(1);
    if (/^\\\d+$/.test(e) && getFlavor() !== FLAVOR.JS || /^\$\d+$/.test(e) && getFlavor() !== FLAVOR.PYTHON) {
        var l = Math.floor(e.slice(1));
        if (t.group_count < l) return o(e, "Subpattern reference does not exist.");
        if (a) return n.length > l ? n[l].content : "";
        var h = "Replace with content captured in the <i>" + ord(l) + "</i> subpattern.";
        return 0 === l && (h = "Replace with the overall match result."), r(e, s("Backreference", h))
    }
    if ("$&" === e) return r(e, s("Backreference", "Replace with the overall match result."));
    if ("$`" === e) return r(e, s("Backreference", "Replace with the portion of the source string that precedes the match."));
    if ("$'" === e) return r(e, s("Backreference", "Replace with the portion of the source string that follows the match."));
    if (/^(?:\\g<\w+>|[\$\\]{\w+})$/.test(e)) {
        var f = e.replace(/^\\g|\W/g, ""),
            u = Math.floor(f);
        if (u == f) {
            if (t.group_count < u) return o(e, "Subpattern reference does not exist.");
            if (a) return n.length > u ? n[u].content : "";
            var h = "Replace with content captured in the <i>" + ord(u) + "</i> subpattern.";
            return 0 === l && (h = "Replace with the overall match result."), r(e, s("Backreference", h))
        }
        if (-1 !== t.subpatterns.indexOf(f)) {
            if (a)
                for (var d = 0, p = n.length; p > d; d++)
                    if (n[d].name === f) return n[d].content;
            return r(e, s("Backreference", "Replace with content captured in the subpttern named `<i>" + f + "</i>`."))
        }
        return o(e, "Subpattern reference does not exist.")
    }
    if (/^\\[trnf]$/.test(e)) {
        var h;
        if ("n" === c) {
            if (a) return "\n";
            h = "A newline character."
        } else if ("t" === c) {
            if (a) return "	";
            h = "A tab character."
        } else if ("r" === c) {
            if (a) return "\r";
            h = "A carriage return."
        } else if ("f" === c) {
            if (a) return "\f";
            h = "A form-feed character."
        }
        return r(e, s("Shorthand", h))
    }
    if ("x" === c && e.length > 2) {
        var b = String.fromCharCode(parseInt(e.replace(/[^0-9a-f]/gi, ""), 16));
        if (a) return b;
        var h = s("HEX", "Matches character `" + white_space_nohtml(escapeHtml(b)) + "`");
        return r(e, h)
    }
    if (c && "\\" === i) {
        if (a) return c;
        var h = s("Literal", "Escaped literal `<i>" + white_space_nohtml(escapeHtml(c)) + "</i>`");
        return colorizeRegex() ? '<b class="et" data-tooltip="' + h + '">' + e + "</b>" : e
    }
    return "\\" === e ? o(e, "Incomplete token.") : a ? e : white_space(escapeHtml(e))
}
var detector = document.createElement("detect"),
    flexTypes = ["-webkit-box", "-moz-box", "-ms-flexbox", "-ms-flex", "-moz-flex", "-webkit-flex", "flex"],
    invalid_browser = !0;
flexTypes.forEach(function(e) {
        return detector.style.display = e, detector.style.display === e ? void(invalid_browser = !1) : void 0
    }),
    function() {
        var e, t;
        jQuery.uaMatch = function(e) {
            e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return {
                browser: t[1] || "",
                version: t[2] || "0"
            }
        }, e = jQuery.uaMatch(navigator.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), jQuery.browser = t
    }();
var deadKeycodes = [16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145],
    arrowKeys = [33, 34, 35, 36, 37, 38, 39, 40],
    textMethod = "textContent" in document.createElement("div") ? "textContent" : "innerText",
    debugData = {},
    debugHtml = {};
$.browser.msie = $.browser.msie || !!/Trident\/7\./.test(navigator.userAgent);
var regex_type = {
        NONE: 0,
        TEXT: 1,
        CHARCLASS: 2,
        GROUP: 500,
        NAMED_GROUP: 501,
        NAMED_P_GROUP: 502,
        CONDITIONAL: 503,
        META: 7,
        QUANTIFIER: 8,
        GROUP_QUANTIFIER: 9,
        MODIFIERS: 10,
        VERB: 11,
        ALTERNATOR: 12,
        GROUP_COMMENT: 13,
        COMMENT: 14,
        QUOTE: 15,
        RANGE_HYPHEN: 16,
        POSIX: 17,
        REFERNCE_GROUP: 18,
        OCTAL: 20,
        HEX: 21,
        LOOKBEHIND: 504,
        LOOKAHEAD: 505,
        CAPTURING_GROUP: 506,
        SUBPATTERN_GROUP: 508,
        DEFINE: 509,
        NUM_BACKREF: 22,
        NAME_BACKREF: 23,
        ESCAPED_TEXT: 24,
        GROUP_MODIFIER: 510,
        QUOTE_TEXT: 30
    },
    error_type = {
        TRUNCATING_ALTERNATOR: 1,
        DUPLICATE_SUBPATTERN: 2,
        INVALID_GROUP_STRUCTURE: 3,
        UNSUPPORTED_TOKEN: 4,
        INCOMPLETE_TOKEN: 5,
        NOT_QUANTIFIABLE: 6,
        BAD_QUANTIFIER_RANGE: 7,
        TOO_LARGE_QUANTIFIER: 8,
        LOOKBEHIND_QUANTIFIER: 9,
        UNBALANCED_PAREN: 10,
        INVALID_POSIX: 11,
        TOO_MANY_ALTERNATIONS: 12,
        VERB_INVALID_LOCATION: 13,
        UNKNOWN_VERB: 14,
        UNKNOWN_SCRIPT: 15,
        UNBALANCED_GROUP: 16,
        UNESCAPED_DELIMITER: 17,
        INVALID_BACKREF: 18,
        X_MODE: 19,
        INCOMPLETE_CHARCLASS: 20,
        BAD_TEXT_RANGE: 21,
        NON_EXISTENT_REFERENCE: 22,
        BAD_RANGE: 23,
        TRUNCATING_ALTERNATOR_GROUP: 24,
        INVALID_POSIX_LOCATION: 25,
        BAD_SUBPATTERN_INDEX_NAME: 26,
        BACKREF_IN_LOOKBEHIND: 27,
        TOO_LARGE_OFFSET: 28,
        UNICODE_OVERFLOW: 29,
        NOT_FIXED_WIDTH: 30,
        SURROGATE: 31,
        INVALID_GROUP_NAME: 32,
        INVALID_TEXT_RANGE: 33
    },
    test_height_element = document.getElementById("richtext_test_size"),
    test_color_element = document.getElementById("test_color_element"),
    test_area = document.getElementById("regex_string"),
    FLAVOR = {
        PCRE: "1",
        JS: "2",
        PYTHON: "3",
        1: "PCRE (PHP)",
        2: "Javascript",
        3: "Python",
        pcre: "1",
        python: "3",
        javascript: "2"
    },
    quickref = {
        other: [{
            token: "\\n",
            desc: "Newline",
            info: "Matches a newline character",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\r",
            desc: "Carriage return",
            info: "Matches a carriage return character",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\t",
            desc: "Tab",
            info: "Matches a tab character",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\0",
            desc: "Null character",
            info: "Matches a null character",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }],
        charclass: [{
            token: "[abc]",
            basic: !0,
            desc: "A single character of: a, b or c",
            example: "<b>a</b> <b>bb</b> <b>ccc</b>",
            example_re: "[abc]+",
            info: "Matches either an a, b or c character",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "[^abc]",
            basic: !0,
            desc: "A character except: a, b or c",
            example: "<b>Anything </b>b<b>ut </b>abc<b>.</b>",
            example_re: "[^abc]+",
            info: "Matches any character except for an a, b or c",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "[a-z]",
            basic: !0,
            desc: "A character in the range: a-z",
            example: "O<b>nly</b> <b>a</b>-<b>z</b>",
            example_re: "[a-z]+",
            info: "Matches any characters between a and z, including a and z",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "[^a-z]",
            basic: !0,
            desc: "A character not in the range: a-z",
            example: "<b>A</b>nything<b> </b>but<b> </b>a<b>-</b>z<b>.</b>",
            example_re: "[^a-z]+",
            info: "Matches any characters except one in the range a-z",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "[a-zA-Z]",
            basic: !0,
            desc: "A character in the range: a-z or A-Z",
            example: "<b>abc</b>123<b>DEF</b>",
            example_re: "[a-zA-Z]+",
            info: "Matches any characters between a-z or A-Z. You can combine as much as you please.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "[[:alnum:]]",
            desc: "Letters and digits",
            example: "<b>1st</b>, <b>2nd</b>, <b>and</b> <b>3rd</b>.",
            example_re: "[[:alnum:]]",
            info: "An alternate way to match any letter or digit",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "[[:alpha:]]",
            desc: "Letters",
            example: "<b>hello</b>, <b>there</b>!",
            example_re: "[[:alpha:]]+",
            info: "An alternate way to match alpanumeric letters",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "[[:ascii:]]",
            desc: "Ascii codes 0-127",
            info: "Matches any character in the valid ASCII range",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "[[:blank:]]",
            desc: "Space or tab only",
            example: "a<b> </b>b<b> </b>c",
            example_re: "[[:blank:]]",
            info: "Matches spaces and tabs (but not newlines)",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "[[:cntrl:]]",
            desc: "Control characters",
            info: "Matches characters that are often used to control text presentation, including newlines, null characters, tabs and the escape character. Equivalent to [\\x00-\\x1F\\x7F].",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "[[:digit:]]",
            desc: "Decimal digits",
            example: "one: <b>1</b>, two: <b>2</b>",
            example_re: "[[:digit:]]",
            info: "Matches decimal digits. Equivalent to [0-9].",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "[[:graph:]]",
            desc: "Visible characters (not space)",
            info: "Matches printable, non-whitespace characters only.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "[[:lower:]]",
            desc: "Lowercase letters",
            example: "<b>abc</b>DEF<b>ghi</b>",
            example_re: "[[:lower:]]+",
            info: "Matches lowercase letters. Equivalent to [a-z].",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "[[:print:]]",
            desc: "Visible characters",
            info: "Matches printable characters, such as letters and spaces, without including control characters.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "[[:punct:]]",
            desc: "Visible punctuation characters",
            example: "hello<b>,</b> regex user<b>!</b>",
            example_re: "[[:punct:]]",
            info: "Matches characters that are not whitespace, letters or numbers.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "[[:space:]]",
            desc: "Whitespace",
            example_re: "[[:space:]]+",
            example: "any<b> </b>whitespace<b> </b>character",
            info: "Matches whitespace characters. Equivalent to \\s.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "[[:upper:]]",
            desc: "Uppercase letters",
            example: "<b>ABC</b>abc<b>DEF</b>",
            example_re: "[[:upper:]]+",
            info: "Matches uppercase letters. Equivalent to [A-Z].",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "[[:word:]]",
            desc: "Word characters",
            example_re: "[[:word:]]+",
            example: "<b>any</b> <b>word</b> <b>character</b>",
            info: "Matches letters, numbers and underscores. Equivalent to \\w",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "[[:xdigit:]]",
            desc: "Hexadecimal digits",
            example: "h<b>e</b>x<b>123</b>!",
            example_re: "[[:xdigit:]]+",
            info: "Matches hexadecimal digits. Equivalent to [0-9a-fA-F].",
            flavors: [FLAVOR.PCRE]
        }],
        meta: [{
            token: ".",
            basic: !0,
            desc: "Any single character",
            example: "<b>a b c</b>",
            example_re: ".+",
            info: "Matches any character other than newline (or including newline with the /s flag)",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\s",
            basic: !0,
            desc: "Any whitespace character",
            example: "any<b> </b>whitespace<b> </b>character",
            example_re: "\\s",
            info: "Matches any space, tab or newline character.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\S",
            basic: !0,
            desc: "Any non-whitespace character",
            example: "<b>any</b> <b>non-whitespace</b>",
            example_re: "\\S+",
            info: "Matches anything other than a space, tab or newline.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\d",
            basic: !0,
            desc: "Any digit",
            example: "one: <b>1</b>, two: <b>2</b>",
            example_re: "\\d",
            info: "Matches any decimal digit. Equivalent to [0-9].",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\D",
            basic: !0,
            desc: "Any non-digit",
            example: "<b>one: </b>1<b>, two: </b>2",
            example_re: "\\D+",
            info: "Matches anything other than a decimal digit.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\w",
            basic: !0,
            desc: "Any word character",
            example: "<b>any</b> <b>word</b> <b>character</b>",
            example_re: "\\w+",
            info: "Matches any letter, number or underscore.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\W",
            basic: !0,
            desc: "Any non-word character",
            example: "any<b> </b>word<b> </b>character",
            example_re: "\\W+",
            info: "Matches anything other than a letter, number or underscore.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\X",
            desc: "Any unicode sequences",
            info: "Matches any valid unicode sequence",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\C",
            desc: "Match one data unit",
            info: "Matches exactly one data unit of input",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\R",
            desc: "Unicode newlines",
            info: "Matches any unicode newline character.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\v",
            desc: "Vertical whitespace character",
            info: "Matches newlines and vertical tabs. Works with unicode.",
            flavors: [FLAVOR.PCRE, FLAVOR.JS, FLAVOR.PYTHON]
        }, {
            token: "\\V",
            desc: "Negation of \\v",
            info: "Matches anything not matched by \\v",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\h",
            desc: "Horizontal whitespace character",
            example: "a<b> </b>b<b> </b>c",
            example_re: "\\h",
            info: "Matches spaces and horizontal tabs. Works with unicode.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\H",
            desc: "Negation of \\h",
            example: "<b>a</b> <b>b</b> <b>c</b>",
            example_re: "\\H",
            info: "Matches anything not matched by \\H.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\K",
            desc: "Reset match",
            info: 'Sets the given position in the regex as the new "start" of the match. This means that nothing preceding the \\K will be captured in the overall match.',
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\n",
            desc: "Match nth subpattern",
            info: "Usually referred to as a `backreference`, this will match a repeat of the text captured in a previous set of parentheses.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON, FLAVOR.JS]
        }, {
            token: "\\pX",
            desc: "Unicode property X",
            example: "<b>any</b> <b>letter</b>!",
            example_re: "\\pL+",
            info: "Matches a unicode character with the given property.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\p{...}",
            desc: "Unicode property",
            example: "<b>any</b> <b>letter</b>!",
            example_re: "\\p{L}+",
            info: "Matches a unicode character with the given group of properties.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\PX",
            desc: "Negation of \\p",
            example: "any<b> </b>letter<b>!</b>",
            example_re: "\\PL",
            info: "Matches a unicode character without the given property.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\P{...}",
            desc: "Negation of \\p",
            example: "any<b> </b>letter<b>!</b>",
            example_re: "\\P{L}",
            info: "Matches a unicode character that doesn't have any of the given properties.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\Q...\\E",
            desc: "Quote; treat as literals",
            example: "<b>everything \\w is ^ literal</b>",
            example_re: "\\Qeverything \\w is ^ literal\\E",
            info: "Any characters between \\Q and \\E, including metacharacters, will be treated as literals.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\k<name>",
            desc: "Match subpattern `name`",
            info: "Matches the text matched by a previously named capture group.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\k'name'",
            desc: "Match subpattern `name`",
            info: "This is an alternate syntax for \\k<name>.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\k{name}",
            desc: "Match subpattern `name`",
            info: "This is an alternate syntax for \\k<name>.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\gn",
            desc: "Match nth subpattern",
            info: "This matches the text captured in the nth group. n can contain more than one digit, if necessary. This may be useful in order to avoid ambiguity with octal characters.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\g{n}",
            desc: "Match nth subpattern",
            info: "This is an alternate syntax for \\gn. It can be useful in a situation where a literal number needs to be matched immediately after a \\gn in the regex.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\g{-n}",
            desc: "Match nth relative subpattern",
            info: "This matches the text captured in the nth group before the current position in the regex.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\g'name'",
            desc: "Recurse subpattern `name`",
            info: "Recursively matches the given named subpattern.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\g<n>",
            desc: "Recurse nth subpattern",
            info: "Recursively matches the given subpattern.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\g'n'",
            desc: "Recurse nth subpattern",
            info: "Alternate syntax for \\g<n>",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\g<+n>",
            desc: "Recurse nth relative subpattern",
            info: "Recursively matches the nth pattern ahead of the current position in the regex.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\g'+n'",
            desc: "Recurse nth relative subpattern",
            info: "Alternate syntax for \\g<+n>",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\uYYYY",
            desc: "Hex character YYYY",
            info: "Matches the unicode character with the given hex value.",
            flavors: [FLAVOR.JS]
        }, {
            token: "\\xYY",
            desc: "Hex character YY",
            example: "match<b> </b>all<b> </b>spaces",
            example_re: "\\x20",
            info: "Matches the 8-bit character with the given hex value.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\x{YYYY}",
            desc: "Hex character YYYY",
            info: "Matches the 16-bit character with the given hex value.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\ddd",
            desc: "Octal character ddd",
            example: "ocal escape<b>!</b>",
            example_re: "\\041",
            info: "Matches the 8-bit character with the given octal value.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\cY",
            desc: "Control character Y",
            info: "Matches ASCII characters typically associated with the Control+A through Control+Z: \\x01 through \\x1A",
            flavors: [FLAVOR.JS, FLAVOR.PCRE]
        }, {
            token: "[\\b]",
            desc: "Backspace character",
            info: "Matches the backspace control character.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\",
            desc: "Makes any character literal",
            example: "match <b>\\w</b> literally",
            example_re: "\\\\w",
            info: "This may be used to obtain the literal value of any metacharacter.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }],
        groups: [{
            token: "(...)",
            basic: !0,
            desc: "Capture everything enclosed",
            example: "<b>hehe</b>h <b>he</b> <b>he</b>h",
            example_re: "(he)+",
            info: "Parts of the regex enclosed in parentheses may be referred to later in the expression or extracted from the results of a successful match.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "(a|b)",
            basic: !0,
            desc: "Match either a or b",
            info: "Matches the a or the b part of the subexpression.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "(?:...)",
            desc: "Match everything enclosed",
            example: "<b>hehe</b>h <b>he</b> <b>he</b>h",
            example_re: "(?:he)+",
            info: "This construct is similar to (...), but won't create a capture group.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "(?>...)",
            desc: "Atomic group",
            info: "Matches the longest possible substring in the group and doesn't allow later backtracking to reevaluate the group.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "(?|...)",
            desc: "Duplicate subpattern group",
            info: "Any subpatterns in (...) in such a group share the same number.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "(?#...)",
            desc: "Comment",
            info: "Any text appearing in this group is ignored in the regex.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "(?'name'...)",
            desc: "Named capturing group",
            info: "This capturing group can be referred to using the given name instead of a number.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "(?<name>...)",
            desc: "Named capturing group",
            info: "This capturing group can be referred to using the given name instead of a number.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "(?P<name>...)",
            desc: "Named capturing group",
            info: "This capturing group can be referred to using the given name instead of a number.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "(?imsxXU)",
            desc: "Inline modifiers",
            example_re: "a(?i)a",
            example: "<b>aA</b> Aa <b>aa</b> AA",
            info: "These enable setting regex flags within the expression itself.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "(?(...)|)",
            desc: "Conditional statement",
            info: "If the given pattern matches, matches the pattern before the vertical bar. Otherwise, matches the pattern after the vertical bar.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "(?R)",
            desc: "Recurse entire pattern",
            info: "Recursively match the entire expression.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "(?1)",
            desc: "Recurse first subpattern",
            info: "Recursively match the first subpattern.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "(?+1)",
            desc: "Recurse first relative subpattern",
            info: "Recursively match the first pattern following the given position in the expression.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "(?&name)",
            desc: "Recurse subpattern `name`",
            info: "Recursively matches the given named subpattern.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "(?P=name)",
            desc: "Match subpattern `name`",
            info: "Matches the text matched by a previously named capture group.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "(?P>name)",
            desc: "Recurse subpattern `name`",
            info: "Recursively matches the given named subpattern.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "(?=...)",
            desc: "Positive lookahead",
            example: "<b>foo</b>bar foobaz",
            example_re: "foo(?=bar)",
            info: "Matches the given subpattern without consuming characters",
            flavors: [FLAVOR.PCRE, FLAVOR.JS, FLAVOR.PYTHON]
        }, {
            token: "(?!...)",
            desc: "Negative lookahead",
            example: "foobar <b>foo</b>baz",
            example_re: "foo(?!bar)",
            info: "Starting at the current position in the expression, ensures that the given pattern will not match. Does not consume characters.",
            flavors: [FLAVOR.PCRE, FLAVOR.JS, FLAVOR.PYTHON]
        }, {
            token: "(?<=...)",
            desc: "Positive lookbehind",
            example: "foo<b>bar</b> foobaz",
            example_re: "(?<=foo)bar",
            info: "Ensures that the given pattern will match, ending at the current position in the expression. Does not consume any characters.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "(?<!...)",
            desc: "Negative lookbehind",
            example: "not foo but <b>foo</b>",
            example_re: "(?<!not )foo",
            info: "Ensures that the given pattern would not match and end at the current position in the expression. Does not consume characters.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "(*UTF16)",
            desc: "Verbs",
            info: "Verbs allow for advanced control of the regex engine. Full specs can be found in pcre.txt",
            flavors: [FLAVOR.PCRE]
        }],
        quantifiers: [{
            token: "a?",
            basic: !0,
            desc: "Zero or one of a",
            example: "<b>ba</b> <b>b</b> a",
            example_re: "ba?",
            info: "Matches an `a` character or nothing.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "a*",
            basic: !0,
            desc: "Zero or more of a",
            example: "a <b>ba</b> <b>baa</b> aaa <b>ba</b> <b>b</b>",
            example_re: "ba*",
            info: "Matches zero or more consecutive `a` characters.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "a+",
            basic: !0,
            desc: "One or more of a",
            example_re: "a+",
            example: "<b>a</b> <b>aa</b> <b>aaa</b> <b>aaaa</b> b<b>a</b>b b<b>aa</b>b",
            info: "Matches one or more consecutive `a` characters.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "a{3}",
            basic: !0,
            desc: "Exactly 3 of a",
            example: "a aa <b>aaa</b> <b>aaa</b>a",
            example_re: "a{3}",
            info: "Matches exactly 3 consecutive `a` characters.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "a{3,}",
            basic: !0,
            desc: "3 or more of a",
            example_re: "a{3,}",
            example: "a aa <b>aaa</b> <b>aaaa</b> <b>aaaaaa</b>",
            info: "Matches at least 3 consecutive `a` characters.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "a{3,6}",
            basic: !0,
            desc: "Between 3 and 6 of a",
            example_re: "a{3,6}",
            example: "a aa <b>aaa</b> <b>aaaa</b> <b>aaaaaa</b>aaaa",
            info: "Matches between 3 and 6 (inclusive) consecutive `a` characters.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "a*",
            desc: "Greedy quantifier",
            example: "greedy c<b>an be dangerous a</b>t times",
            example_re: "a.*a",
            info: "Matches as many characters as possible.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "a*?",
            desc: "Lazy quantifier",
            example: "<b>r</b> <b>r</b>e <b>r</b>egex",
            example_re: "r\\w*?",
            info: "Matches as few characters as possible.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "a*+",
            desc: "Possessive quantifier",
            info: "Matches as many characers as possible; backtracking can't reduce the number of characters matched.",
            flavors: [FLAVOR.PCRE]
        }],
        anchors: [{
            token: "\\G",
            desc: "Start of match",
            info: "This will match at the position the previous successful match ended. Useful with the /g flag.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "^",
            basic: !0,
            desc: "Start of string",
            example: "<b>start</b> of string",
            example_re: "^\\w+",
            info: "Matches the start of a string without consuming any characters. If multiline mode is used, this will also match immediately after a newline character.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "$",
            basic: !0,
            desc: "End of string",
            example: "end of <b>string</b>",
            example_re: "\\w+$",
            info: "Matches the end of a string without consuming any characters. If multiline mode is used, this will also match immediately before a newline character.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\A",
            desc: "Start of string",
            example: "<b>start</b> of string",
            example_re: "\\A\\w+",
            info: "Matches the start of a string only. Unlike ^, this is not affected by multiline mode.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "\\Z",
            desc: "End of string",
            example: "end of <b>string</b>",
            example_re: "\\w+\\Z",
            info: "Matches the end of a string only. Unlike $, this is not affected by multiline mode.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "\\z",
            desc: "Absolute end of string",
            example: "absolute end of <b>string</b>",
            example_re: "\\w+\\z",
            info: "Matches the end of a string only. Unlike $, this is not affected by multiline mode, and, in contrast to \\Z, will not match before a trailing newline at the end of a string.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "\\b",
            basic: !0,
            desc: "A word boundary",
            example: "wor<b>d</b> boundaries are od<b>d</b>",
            example_re: "d\\b",
            info: "Matches, without consuming any characters, immediately between a character matched by \\w and a character not matched by \\w (in either order).",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "\\B",
            basic: !0,
            desc: "Non-word boundary",
            example: "<b>r</b>egex is <b>r</b>eally cool",
            example_re: "r\\B",
            info: "Matches, without consuming any characters, at the position between two characters matched by \\w.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }],
        modifiers: [{
            token: "g",
            desc: "Global",
            info: "Tells the engine not to stop after the first match has been found, but rather to continue until no more matches can be found.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "m",
            desc: "Multiline",
            info: "The ^ and $ anchors now match at the beginning/end of each line respectively, instead of beginning/end of the entire string.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "i",
            desc: "Case insensitive",
            info: "A case insensitive match is performed, meaning capital letters will be matched by non-capital letters and vice versa.",
            flavors: [FLAVOR.JS, FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "x",
            desc: "Ignore whitespace",
            info: 'This flag tells the engine to ignore all whitespace and allow for comments in the regex. Comments are indicated by a starting "#"-character.',
            flavors: [FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "s",
            desc: "Single line",
            info: "The dot (.) metacharacter will with this flag enabled also match new lines.",
            flavors: [FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "u",
            desc: "Unicode",
            info: "Pattern strings will be treated as UTF-16.",
            flavors: [FLAVOR.PYTHON, FLAVOR.PCRE]
        }, {
            token: "X",
            desc: "eXtended",
            info: "Any character following a \\ that is not a valid meta sequence will be faulted and raise an error.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "U",
            desc: "Ungreedy",
            info: "The engine will per default do lazy matching, instead of greedy. This means that a ? following a quantifier instead makes it greedy.",
            flavors: [FLAVOR.PCRE]
        }, {
            token: "A",
            desc: "Anchor",
            info: "The pattern is forced to become anchored, equal to ^.",
            flavors: [FLAVOR.PCRE]
        }],
        subst: [{
            token: "\\0",
            desc: "Complete match contents",
            info: "This will return a string with the complete match result from the regex.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "\\1",
            desc: "Contents in capture group 1",
            info: "This will return a string with the contents from the first capture group. The number, in this case 1, can be any number as long as it corresponds to a valid capture group.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "$1",
            desc: "Contents in capture group 1",
            info: "This will return a string with the contents from the first capture group. The number, in this case 1, can be any number as long as it corresponds to a valid capture group.",
            flavors: [FLAVOR.JS, FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "$`",
            desc: "Contents before match",
            info: "This will return a portion of the source string that precedes the match.",
            flavors: [FLAVOR.JS]
        }, {
            token: "$'",
            desc: "Contents after match",
            info: "This will return a portion of the source string that follows the match.",
            flavors: [FLAVOR.JS]
        }, {
            token: "$&",
            desc: "Complete match contents",
            info: "This will return a string with the complete match result from the regex.",
            flavors: [FLAVOR.JS]
        }, {
            token: "${foo}",
            desc: "Contents in capture group `foo`",
            info: "This will return a string with the contents from the capture group named `foo`. Any name can be used as long as it is defined in the regex. This syntax is made up and specific to only Regex101. If the J-flag is specified, content will be taken from the first capture group with the same name.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "\\{foo}",
            desc: "Contents in capture group `foo`",
            info: "This will return a string with the contents from the capture group named `foo`. Any name can be used as long as it is defined in the regex. This syntax is made up and specific to only Regex101. If the J-flag is specified, content will be taken from the first capture group with the same name.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "\\g<foo>",
            desc: "Contents in capture group `foo`",
            info: "This will return a string with the contents from the capture group named `foo`. Any name can be used as long as it is defined in the regex. If the J-flag is specified, content will be taken from the first capture group with the same name.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "\\g<1>",
            desc: "Contents in capture group 1",
            info: "This will return a string with the contents from the first capture group. The number, in this case 1, can be any number as long as it corresponds to a valid capture group.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON]
        }, {
            token: "\\x20",
            desc: "Hexadecimal replacement values",
            info: "You can use hexadecimals to insert any character into the replacement string using the standard syntax.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON, FLAVOR.JS]
        }, {
            token: "\\x{06fa}",
            desc: "Hexadecimal replacement values",
            info: "You can use hexadecimals to insert any character into the replacement string using the standard syntax.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON, FLAVOR.JS]
        }, {
            token: "\\t",
            desc: "Tab",
            info: "Insert a tab character.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON, FLAVOR.JS]
        }, {
            token: "\\r",
            desc: "Carriage return",
            info: "Insert a carriage return character.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON, FLAVOR.JS]
        }, {
            token: "\\n",
            desc: "Newline",
            info: "Insert a newline character.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON, FLAVOR.JS]
        }, {
            token: "\\f",
            desc: "Form-feed",
            info: "Insert a form-feed character.",
            flavors: [FLAVOR.PCRE, FLAVOR.PYTHON, FLAVOR.JS]
        }]
    };
"indexOf" in Array.prototype || (Array.prototype.indexOf = function(e, t) {
    void 0 === t && (t = 0), 0 > t && (t += this.length), 0 > t && (t = 0);
    for (var a = this.length; a > t; t++)
        if (t in this && this[t] === e) return t;
    return -1
});
var displayNonParticipatingGroupsElem = document.getElementById("display_nonpart"),
    displayWhitespaceElem = document.getElementById("display_whitespace"),
    colorizeRegexElem = document.getElementById("colorize_regex"),
    wrapNewlinesElem = document.getElementById("wrap_newlines"),
    autoCompleteRegexElem = document.getElementById("smart_completion"),
    highlightInteractionElem = document.getElementById("highlight_interaction"),
    debugger_element = $("#debugger_menu"),
    updateDebugger;
PAREN_COUNT = 10, jQuery.fn.reverse = [].reverse;
var submitCommunity = null,
    communityTimeout = null;
jQuery.fn.highlight = function(e, t) {
    $(this).each(function() {
        var a = $(this),
            n = {
                height: a.outerHeight(),
                width: a.outerWidth(),
                position: "absolute",
                left: a.position().left,
                top: t,
                "background-color": "#4d91e2",
                opacity: ".3",
                "z-index": 0
            };
        $("<div/>").css(n).appendTo(e).fadeOut(1e3).queue(function() {
            $(this).remove()
        })
    })
};
var subRegex = {
    PCRE: /\\(?:\d+|{\w+}|g<\w+>|[trnf]|x(?:[0-9A-Fa-f]{2}|{[0-9A-Fa-f]+})|[\s\S])|\$(?:\d+|{\w+})|[\s\S]/g,
    PYTHON: /\\(?:\d+|{\w+}|g<\w+>|[trnf]|x(?:[0-9A-Fa-f]{2}|{[0-9A-Fa-f]+})|[\s\S])|\${\w+}|[\s\S]/g,
    JS: /\\(?:[trnf]|x(?:[0-9A-Fa-f]{2}|{[0-9A-Fa-f]+})|[\s\S])|\$(?:\d+|[`&'])|[\s\S]/g
};
String.fromCodePoint || ! function() {
    var e = function() {
            try {
                var e = {},
                    t = Object.defineProperty,
                    a = t(e, e, e) && t
            } catch (e) {}
            return a
        }(),
        t = String.fromCharCode,
        a = Math.floor,
        n = function() {
            var e, n, r = 16384,
                o = [],
                s = -1,
                i = arguments.length;
            if (!i) return "";
            for (var c = ""; ++s < i;) {
                var l = Number(arguments[s]);
                if (!isFinite(l) || 0 > l || l > 1114111 || a(l) != l) throw RangeError("Invalid code point: " + l);
                65535 >= l ? o.push(l) : (l -= 65536, e = (l >> 10) + 55296, n = l % 1024 + 56320, o.push(e, n)), (s + 1 == i || o.length > r) && (c += t.apply(null, o), o.length = 0)
            }
            return c
        };
    e ? e(String, "fromCodePoint", {
        value: n,
        configurable: !0,
        writable: !0
    }) : String.fromCodePoint = n
}();