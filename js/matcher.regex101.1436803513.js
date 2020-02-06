function updateRegex(e) {
    var r = getFlavor(),
        t = {
            regex: $("#regex").val(),
            options: $("#options").val(),
            regexText: test_area.value,
            isSub: sub_enabled(),
            sub: $("#sub").val(),
            delimiter: $("#delimiter_selector").text(),
            flavor: r
        };
    if (r === FLAVOR.PYTHON && (t.regex = sanitizePython(t.regex)), 0 === t.regex.length) {
        var o = white_space(escapeHtml(test_area.value));
        test_color_element = replaceHtml(test_color_element, o), replaceHtml("treeview", "An explanation of your regex will be automatically generated as you type."), replaceHtml("match_info", "Detailed match information will be displayed here automatically."), replaceHtml("subst_result", o), display_info("no match", "no_match"), clearTimeout(matchTimer), clearTimeout(treeview_timer), $("#debugger_menu, #sample_menu, #permalink_menu, #community_submit, #format_regex").removeClass("active").addClass("disabled"), $("#permalink_data").hide(), stopUnitTests(), updateTooltipData()
    } else {
        if ($("#unit_tests:not(.fullscreen_disable), #sample_menu:not(.fullscreen_disable), #permalink_menu:not(.fullscreen_disable), #format_regex:not(.fullscreen_disable)").removeClass("disabled"), hasUnitTests() && $(".unit_test_player").show(), Regex101Colorizer.hasError()) $("#community_submit").addClass("disabled"), showError(), cancelMatching(!0);
        else switch ($("#community_submit:not(.fullscreen_disable)").removeClass("disabled"), t.debugging || (t.regexText.length > 0 && void 0 !== debugData && debugData.length > 0 ? $("#debugger_menu:not(.fullscreen_disable)").removeClass("disabled") : $("#debugger_menu").removeClass("active").addClass("disabled"), textHighlightTimeout && clearTimeout(textHighlightTimeout), textHighlightTimeout = setTimeout(function() {
            test_color_element = replaceHtml(test_color_element, "")
        }, 500)), r) {
            case FLAVOR.JS:
                updateJavascript(t);
                break;
            case FLAVOR.PYTHON:
            case FLAVOR.PCRE:
                updatePCRE(t)
        }
        if (e) {
            if (!Regex101Colorizer.justParsed()) return;
            treeview_timer && clearTimeout(treeview_timer), treeview_timer = setTimeout(function() {
                replaceHtml("treeview", Regex101Explainer.explain(t))
            }, treeview_match_timeout)
        }
    }
    return !1
}

function showError(e, r) {
    if (!r) {
        $("#debugger_menu").removeClass("active"), $("#debugger_menu").addClass("disabled");
        var r = "error"
    }
    setTimeout(function() {
        test_color_element = replaceHtml(test_color_element, white_space(escapeHtml(test_area.value))), sub_enabled() && replaceHtml("subst_result", white_space(escapeHtml(test_area.value)))
    }, 0), matchTimer && clearTimeout(matchTimer), matchTimer = setTimeout(function() {
        $("#match_info").html(e || "Your expression contains an error, please see the treeview above."), display_info(r, "error")
    }, treeview_match_timeout), updateTooltipData()
}

function display_info(e, r) {
    infoTimeout && clearTimeout(infoTimeout), infoTimeout = setTimeout(function() {
        $("#result_indicator").removeClass("no_match error found_match").addClass(r).text(e)
    }, 250)
}

function compute_matches(e) {
    for (var r = "<table>", t = 1, o = 0, o = 0, a = 0; a < e.length; a++) {
        var i = e[a].length;
        if (i > 1) {
            for (var s = !1, n = "<tr " + (a > 0 ? 'class="bottom_match_space"' : "") + '><td colspan="2" class="match_num">MATCH ' + t + "</td></tr>", u = 1; i > u; u++) {
                var c, l = e[a][u],
                    m = void 0 !== l.name ? l.name : u + ".",
                    g = void 0 !== l.start;
                if (void 0 !== l.content && -1 !== l.start) {
                    var d = "match" + o + "_group" + u;
                    c = "`" + white_space(escapeHtml(l.content), !1) + "`", n += '<tr id="' + d + '"><td class="match_group_name"><span class="match' + (u % PAREN_COUNT || PAREN_COUNT) + '">' + m + "</span></td>", g && (n += '<td class="match_group_pos">[' + l.start + "-" + l.end + "]</td>")
                } else {
                    if (!displayNonParticipatingGroups()) continue;
                    c = "group did not participate in match", n += '<tr class="treeview_regex_warning"><td class="match_group_name"><span class="match' + (u % PAREN_COUNT || PAREN_COUNT) + '">' + m + "</span></td>", g && (n += '<td class="match_group_pos">n/a</td>')
                }
                n += '<td class="hard_break match_group_data">' + c + "</td>", s = !0
            }
            n += "</tr>", s && (r += n), t++
        }
        o++
    }
    r += "</tbody></table>", r.length < 40 ? r = e.length > 0 ? '<div class="regex_colorizer">No match groups were extracted.<br /><br />This means that your pattern matches but there were no <b class="g1">(</b>capturing <b class="g2">(</b>groups<b class="g2">)</b><b class="g1">)</b> in it that matched anything in the subject string.</div>' : '<div>Your pattern does <strong class="errorize_text">not</strong> match the subject string.</div>' : r += '<i title="Export matches..." class="export_matches fa fa-external-link-square"></i>', replaceHtml("match_info", r)
}

function updateMatchResult(e, r) {
    var t = "";
    if (r && (t = " - " + r + (r > 1 ? " steps" : " step")), e) {
        var o = e + (e > 1 ? " matches" : " match") + t;
        display_info(o, "found_match")
    } else display_info("no match" + t, "no_match")
}

function timeoutError() {
    $("#debugger_menu").addClass("disabled"), matcherError('<strong class="errorize_text">Your expression took too long to evaluate.</strong><br><br>The script has halted execution as it exceeded a maximum execution time of ' + maxWorkerTimeout / 1e3 + 's. This would likely occur when your expression results in what is known as <a target="_blank" href="http://www.regular-expressions.info/catastrophic.html">catastrophic backtracking</a>. I have halted the execution for you and will resume it after you have modified your expression or match string.<br><br>You can always increase this timeout and let the match continue, in order to gather enough data for the debugger.', "timeout")
}

function matcherError(e, r) {
    test_color_element = replaceHtml(test_color_element, ""), showError(e, r)
}

function runDebugger(e) {
    function r(e, r) {
        return r.running = !1, void 0 !== e.error ? (debugData = debugHtml = void 0, matcherError('<strong class="errorize_text">An unhandled error occured:</strong><br/>' + e.error + "<br><br>If this error seems out of order, feel free to report it <a href='https://github.com/firasdib/Regex101/issues'>here</a>.", "error"), $("#debugger_menu").addClass("disabled"), void(isDebugging() && $("#debuger_menu").click())) : (debugData = e.callout_data, debugHtml = e.callout_html, e.catastrophic && (debugTimeout && clearTimeout(debugTimeout), debugWorker.worker.terminate(), debugWorker = {}), void updateDebugger())
    }
    debugWorker.running && (clearTimeout(debugTimeout), debugWorker.worker.terminate(), debugWorker = {}), debugWorker.worker || (debugWorker.worker = new Worker("/js/pcre.regex101.js"), debugWorker.worker.onmessage = function(e) {
        "onload" === e.data ? (debugWorker.running = !0, debugTimeout && clearTimeout(debugTimeout), debugTimeout = setTimeout(function() {
            debugWorker.worker.terminate(), debugWorker.timeout(), debugWorker = {}
        }, maxWorkerTimeout)) : (clearTimeout(debugTimeout), debugWorker.callback(e.data, debugWorker))
    }), debugWorker.callback = r, debugWorker.timeout = timeoutError, debugWorker.running = !1, debugWorker.worker.postMessage(e)
}

function cancelMatching(e) {
    jsTimeout && clearTimeout(jsTimeout), pcreTimeout && clearTimeout(pcreTimeout), jsWorker.worker && jsWorker.worker.terminate(), pcreWorker.worker && pcreWorker.worker.terminate(), jsWorker = pcreWorker = {}, e && (test_color_element = replaceHtml(test_color_element, ""))
}

function updatePCRE(e) {
    function r(r, t) {
        return t.running = !1, void 0 !== r.error ? (debugData = debugHtml = void 0, matcherError('<strong class="errorize_text">An unhandled error occured:</strong><br/>' + r.error + "<br><br>If this error seems out of order, feel free to report it <a href='https://github.com/firasdib/Regex101/issues'>here</a>.", "error"), void $("#debugger_menu").addClass("disabled")) : r.catastrophic ? (cancelMatching(!1), matcherError("<strong class=\"errorize_text\">Catastrophic backtracking</strong><br/>Catastrophic backtracking has been detected and the execution of your expression has been halted. To find out more what this is, please read the following article: <a href='http://www.regular-expressions.info/catastrophic.html'>Runaway Regular Expressions</a>.<br><br>I recommend you launch the debugger in the menu to the left and analyze the data to find out the cause.", "error"), void $("#debugger_menu").removeClass("disabled")) : (updateMatchResult(r.result.length, r.steps), highlightMatchResult(e, r.highlighter), handleSubResult(e, r.sub, r.result), $("#regex").trigger("mousedown"), matchTimer && clearTimeout(matchTimer), matchTimer = setTimeout(function() {
            compute_matches(r.result)
        }, treeview_match_timeout), updateTooltipData(), void $("#debugger_menu:not(.fullscreen_disable)").removeClass("disabled"))
    }
    pcreWorker.running && (clearTimeout(pcreTimeout), pcreWorker.worker.terminate(), pcreWorker = {}), pcreWorker.worker || (pcreWorker.worker = new Worker("js/pcre.regex101.js"), pcreWorker.worker.onmessage = function(e) {
        "onload" === e.data ? (pcreWorker.running = !0, pcreTimeout && clearTimeout(pcreTimeout), pcreTimeout = setTimeout(function() {
            pcreWorker.worker.terminate(), pcreWorker.timeout(), pcreWorker = {}
        }, maxWorkerTimeout), display_info("processing...", "no_match")) : (clearTimeout(pcreTimeout), pcreWorker.callback(e.data, pcreWorker))
    }), pcreWorker.callback = r, pcreWorker.timeout = timeoutError, pcreWorker.running = !1, pcreWorker.worker.postMessage(e)
}

function sanitizePython(e) {
    var r = e;
    return r = r.replace(/(\\[^ckgGXCKPpuzVhHRLlUNQE])|\\([ckgGXCKPpuzVhHRLlUNQE])/g, "$1$2"), r = r.replace(/\\.|\[:(.*?):\]/g, function(e, r) {
        return "\\" === e.charAt(0) ? e : "[\\:" + r + "\\:]"
    })
}

function updateJavascript(e) {
    function r(r, t) {
        t.running = !1, updateMatchResult(r.result.length), highlightMatchResult(e, r.hl);
        var o = "";
        if (e.isSub) {
            var a = [Math.random().toString(36).substring(7), Math.random().toString(36).substring(7), Math.random().toString(36).substring(7)];
            e.sub = e.sub.replace(/\\./g, whitespaceCallback);
            var i = white_space(escapeHtml(e.regexText.replace(new RegExp(e.regex, e.options), a[0] + e.sub + a[1])));
            o = i.replace(new RegExp(a[0], "g"), '<span class="match0">').replace(new RegExp(a[1], "g"), "</span>")
        }
        replaceHtml("subst_result", o), matchTimer && clearTimeout(matchTimer), matchTimer = setTimeout(function() {
            compute_matches(r.result)
        }, treeview_match_timeout), updateTooltipData()
    }
    jsWorker.running && (clearTimeout(jsTimeout), jsWorker.worker.terminate(), jsWorker = {}), jsWorker.worker || (jsWorker.worker = new Worker("js/javascript.regex101.js"), jsWorker.worker.onmessage = function(e) {
        "onload" === e.data ? (jsWorker.running = !0, jsTimeout = setTimeout(function() {
            jsWorker.worker.terminate(), jsWorker.timeout(), jsWorker = {}
        }, maxWorkerTimeout), display_info("processing...", "no_match")) : (clearTimeout(jsTimeout), jsWorker.callback(e.data, jsWorker))
    }), jsWorker.callback = r, jsWorker.timeout = timeoutError, jsWorker.running = !1, jsWorker.worker.postMessage(e)
}

function whitespaceCallback(e) {
    return "\\n" === e ? String.fromCharCode(10) : "\\r" === e ? String.fromCharCode(13) : "\\f" === e ? String.fromCharCode(14) : "\\t" === e ? String.fromCharCode(9) : e
}

function highlightMatchResult(e, r) {
    textHighlightTimeout && clearTimeout(textHighlightTimeout);
    var t = "",
        o = e.regexText.length;
    Object.keys(r).sort(function(e, r) {
        return e - r
    }).reverse().forEach(function(a) {
        t = r[a] + white_space(escapeHtml(e.regexText.substring(a, o))) + t, o = Math.floor(a)
    }), test_color_element = replaceHtml(test_color_element, white_space(escapeHtml(e.regexText.substring(0, o))) + t)
}

function handleSubResult(e, r, t) {
    if (e.isSub) {
        for (var o = Regex101Colorizer.getCaptureData(), a = !1, i = e.sub, s = "", n = 0, u = 0, c = r.length; c > u; u++) {
            var l = i.replace(subRegex.PCRE, function(e) {
                var r = parseSub(e, o, !0, t[u]);
                return r === !1 && (a = !0), r
            });
            if (a) break;
            var m = r[u];
            s += white_space(escapeHtml(e.regexText.substring(n, m.start))) + m.tag + white_space(escapeHtml(l)) + "</span>", n = m.end
        }
        a ? replaceHtml("subst_result", white_space(escapeHtml(e.regexText)) + "\n") : (s += white_space(escapeHtml(e.regexText.substring(n, e.regexText.length))), replaceHtml("subst_result", s + "\n"))
    }
}

function cancelUnitTest() {
    unitTimeout && clearTimeout(unitTimeout), unitWorker.worker && unitWorker.worker.terminate(), unitWorker = {}
}

function runUnitTests(e, r, t) {
    unitWorker.running && cancelUnitTest(), unitWorker.worker || (unitWorker.worker = new Worker(getFlavor() === FLAVOR.JS ? "/js/javascript.regex101.js" : "/js/pcre.regex101.js"), unitWorker.worker.onmessage = function(e) {
        "onload" === e.data ? (unitWorker.running = !0, unitTimeout && clearTimeout(unitTimeout), unitTimeout = setTimeout(function() {
            unitWorker.worker.terminate();
            var e = unitWorker.timeout;
            unitWorker = {}, e()
        }, maxWorkerTimeout)) : (clearTimeout(unitTimeout), unitWorker.callback(e.data, unitWorker))
    }, unitWorker.callback = r, unitWorker.timeout = t, unitWorker.running = !1, unitWorker.worker.postMessage(e))
}
var treeview_match_timeout = 500,
    treeview_timer, maxWorkerTimeout, matchTimer, textHighlightTimeout, infoTimeout, debugWorker = {},
    debugTimeout, pcreWorker = {},
    pcreTimeout, jsWorker = {},
    jsTimeout, unitTimeout, unitWorker = {};