$(document).ready(function() {
    function e(e, a, i) {
        function s(e) {
            if (autoCompleteRegex() && 8 === e.which) {
                var t = this.selectionStart - 1,
                    a = this.selectionEnd,
                    i = a - t !== 1,
                    s = "",
                    n = "";
                if (t >= 0 && (s = this.value[t]), n < this.value.length && (n = this.value[a]), t > this.value.length || i) return;
                for (var r = 0, o = g.length; o > r; r++) {
                    var l = g[r];
                    if (s === l.left && n === l.right) return e.preventDefault(), e.stopPropagation(), this.value = this.value.slice(0, t) + this.value.slice(a + 1), this.selectionStart = this.selectionEnd = t, void $(this).trigger("input")
                }
            }
        }

        function n(e, t, a) {
            return t >= 0 && "\\" === e.charAt(t) ? n(e, t - 1, !a) : a
        }

        function r(e) {
            if (autoCompleteRegex()) {
                var t = this.selectionStart - 1,
                    a = this.selectionEnd,
                    i = a - t !== 1,
                    s = "",
                    r = "";
                if (t >= 0)
                    if (n(this.value, t - 1, !1)) t = "";
                    else {
                        if (n(this.value, t, !1)) return;
                        s = this.value.charAt(t)
                    } r < this.value.length && (r = this.value.charAt(a));
                for (var o = 0, l = g.length; l > o; o++) {
                    var c = g[o];
                    if (!i && e.which === c.skipCode && r === c.right) return e.preventDefault(), e.stopPropagation(), this.selectionStart = this.selectionEnd = this.selectionStart + 1, void $(this).trigger("input");
                    if (!i && c.allowSkip && e.which === c.trigger && s === c.left && r !== c.right) return;
                    if (!i && e.which === c.trigger && r === c.left) return;
                    if (c.trigger === e.which && (!c.extra || c.extra(this.selectionStart))) {
                        e.preventDefault(), e.stopPropagation();
                        var d = {
                                start: this.selectionStart,
                                end: this.selectionEnd
                            },
                            u = this.value;
                        return this.value = u.slice(0, d.start) + c.left + u.slice(d.start, d.end) + c.right + u.slice(d.end), this.selectionStart = d.start + 1, this.selectionEnd = d.end + 1, void $(this).trigger("input")
                    }
                }
            }
        }

        function o(t) {
            var s = Regex101Colorizer.colorize(e.value, a.value, getCaretPosition(e), i[textMethod], getFlavor(), t, !0);
            h = replaceHtml(h, s), updateTooltipData()
        }

        function l() {
            T = !1, y && clearTimeout(y), $(m).css("visiblity", "visible")
        }

        function c() {
            T = !0, y && clearTimeout(y), y = setTimeout(function() {
                $(m).css("visibility", "hidden")
            }, 0)
        }

        function d() {
            return y && clearTimeout(y), T || !$(e).is(":focus") ? void $(m).css("visibility", "hidden") : void(y = setTimeout(function() {
                "visible" === $(m).css("visibility") ? $(m).css("visibility", "hidden") : $(m).css("visibility", "visible"), d()
            }, 500))
        }
        var u = "#richtext_" + e.id + "_container",
            p = document.querySelector(u),
            m = u + " .caret";
        if (p) {
            $.browser.msie && $(u + " pre").append("&nbsp;");
            var v = 0,
                h = p.querySelector("#regex_colors span"),
                f = p.querySelector(".colorizer_height");
            $(e).on("keydown", _.debounce(function(t) {
                -1 !== arrowKeys.indexOf(t.keyCode) && o($(e).is(":focus"))
            }, 0)), $(e).on("formatRegex", function() {
                var t = e.value;
                if (e.value = Regex101Colorizer.formatRegex(e.value, a.value, getCaretPosition(e), i[textMethod], getFlavor(), !1), $(e).trigger("updateRegexColors"), t === e.value) {
                    var s = '<div id="dimmer-contents">';
                    s += '<div class="label">Nothing happened :(</div>', s += "I failed to do anything to your regex, which means one of the following:", s += '<ul style="margin: 4px 0;color: #285097;">', s += "<li>You have already clicked 'format regex' once already</li>", s += "<li>You have no block in your regex under the effect of (?x)</li>", s += "<li>You're already super good at formatting regex yourself</li>", s += "</ul>", s += "</div>", s += '<div id="button-area" class="button-area">', s += '<div id="permalink_close" class="button">close</div>', s += "</div>", q(s)
                }
            }), $(e).on("keypress", r), $(e).on("keydown", s);
            var g = [{
                left: "[",
                right: "]",
                trigger: 91,
                skipCode: 93,
                allowSkip: !1
            }, {
                left: "{",
                right: "}",
                trigger: 123,
                skipCode: 125,
                allowSkip: !1
            }, {
                left: "(",
                right: ")",
                trigger: 40,
                skipCode: 41,
                allowSkip: !1,
                extra: function(e) {
                    return Regex101Colorizer.hasUnmatchedParen() < e
                }
            }];
            $(e).on("keyup", function() {
                d(), v > 4 && t(!0), v = 0
            });
            var b, x, w = [],
                k = [],
                C = {
                    value: ""
                };
            $(e).on("keydown", function(t) {
                if (t.ctrlKey || t.metaKey) {
                    var a, i = !1;
                    if (t.shiftKey || 90 !== t.which ? (t.shiftKey && 90 === t.which || 89 === t.which) && (a = w.pop(), i = k) : (a = k.pop(), i = w), a) return t.preventDefault(), t.stopPropagation(), i.push(C), e.value = a.value, e.selectionStart = a.start, e.selectionEnd = a.end, C = a, void $(e).trigger("input")
                }
            }), $(e).on("updateRegexColors propertychange mousedown input", function(a) {
                f[textMethod] = e.value, wrapNewlines() || (f[textMethod] += " "), this.scrollLeft = 1, setTimeout(function() {
                    o($(e).is(":focus")), $("#sub").trigger("updateColors"), x && clearTimeout(x), x = setTimeout(function() {
                        e.value !== C.value && (k.length > 500 && w.push(k.shift()), k.push(C), C = {
                            value: e.value,
                            start: e.selectionStart,
                            end: e.selectionEnd
                        }, w = [])
                    }, 200)
                }, 0), d(), "updateRegexColors" === a.type ? t(!0) : "mousedown" !== a.type && (v > 4 ? cancelMatching(!0) : t(!0), v++)
            }), $(a).on("propertychange input", function() {
                b && clearTimeout(b), b = setTimeout(function() {
                    o(!1)
                }, 0)
            }), $(e).on("focusout", function() {
                setTimeout(function() {
                    c(), $(h).children().removeClass("selected_paren"), highlightInteraction() && $("#richtext_test_colors span").removeClass("selected_paren_test")
                }, 0)
            }), $(e).on("focusin", function() {
                setTimeout(function() {
                    l(), d(), o($(e).is(":focus"))
                }, 0)
            });
            var y, T = !1;
            $(e).focus(), $(e).trigger("updateRegexColors")
        }
    }

    function t(e) {
        Q && clearTimeout(Q), Q = setTimeout(function() {
            updateRegex(e)
        }, 0)
    }

    function a(t, a, i) {
        var s, n, r, o = t.replace("#", "");
        if (o != t) s = document.getElementById(o), n = document.getElementById(a.replace("#", "")), r = document.getElementById(i.replace("#", "")), void 0 !== typeof s && null !== s && e(s, n, r);
        else {
            s = document.querySelectorAll(t), n = document.querySelectorAll(a), r = document.querySelectorAll(i);
            for (var l = s.length; l--;) e(s[l], n[l], r[l])
        }
    }

    function i(e) {
        for (var t = document.querySelectorAll(e), a = t.length; a--;) {
            var i = t[a].children;
            replaceHtml(i[1], Regex101Colorizer.colorize(i[1][textMethod], i[3][textMethod], -1, i[0][textMethod], $(t[a]).attr("data-flavor-id"), !1, !1))
        }
    }

    function s(e) {
        for (var t = document.querySelectorAll(e), a = t.length; a--;) {
            var i = t[a].children;
            replaceHtml(i[1], Regex101Colorizer.colorize(i[1][textMethod], i[3][textMethod], -1, i[0][textMethod], $(t[a]).attr("data-flavor-id"), !1, !1));
            var s = $(t[a]).parent().find(".community_sub_box:not(.sub_null)");
            s.length > 0 && s.html(n(s.text()))
        }
    }

    function n(e) {
        var t, a, i = "",
            s = Regex101Colorizer.getCaptureData();
        switch (getFlavor()) {
            case FLAVOR.JS:
                a = subRegex.JS;
                break;
            case FLAVOR.PYTHON:
                a = subRegex.PYTHON;
                break;
            default:
                a = subRegex.PCRE
        }
        for (; t = a.exec(e);) i += parseSub(t[0], s, !1);
        return i
    }

    function r(e, t) {
        var a = $(e),
            i = "basic_richtext_" + a.attr("id");
        a.wrap('<div class="basic_richtext box_overflow_fix regex_colorizer" id="' + i + '"><div class="basic_richtext_scroller"></div></div>');
        var s = a.parent();
        s.prepend('<pre class="basic_richtext_pre box_overflow_fix"><span></span>&nbsp;</pre>');
        var n = s.find("span")[0];
        s.find("textarea, input").attr("data-focus", "#" + i), t.forEach(function(e) {
            a.on(e.trigger, function(t) {
                var i = e.triggerFunc;
                n = i(t, a[0], n)
            })
        }), a.trigger("updateColors")
    }

    function o() {
        var e = $("#settings_popup_contents .execution_limit input"),
            t = e.val();
        e.tipsy("hide"), "" === t ? (e.removeClass("errorize_box"), e.attr("title", "Empty = " + e.attr("placeholder") + "ms"), e.tipsy("show")) : /^\d+$/.test(t) ? (parseInt(t) < 500 && (e.attr("title", "Psst.. That isn't very long!"), e.tipsy("show")), e.removeClass("errorize_box"), W && clearTimeout(W), W = setTimeout(function() {
            setCookieData("max_exec", t), maxWorkerTimeout = parseInt(t)
        }, 500)) : (e.addClass("errorize_box").attr("title", "Only numeric values!"), e.tipsy("show"))
    }

    function l() {
        var e = $("#subst_result, #richtext_test pre, #richtext_test, #test_result_container .overflow_handler, #richtext_regex pre, #richtext_regex, #richtext_regex_container");
        wrapNewlines() ? (e.removeClass("nowrap"), $("#regex_string, #regex").attr("wrap", !0)) : (e.addClass("nowrap"), $("#regex_string, #regex").attr("wrap", !1))
    }

    function c() {
        $("#regex_treeview").hide(), $("#main_editor").hide()
    }

    function d() {
        $("#regex_treeview").show(), $("#main_editor").show()
    }

    function u() {
        $(".extension_menu:not(.donate_submenu)").hide(), $("#quiz, #regex_editor, #community, #account").hide(), replaceHtml("community", ""), replaceHtml("regex_debugger_window", ""), replaceHtml("account", ""), $("#header_nav .header_nav").removeClass("active"), $("#inline_menu .menu_item.fullscreen.active").click()
    }

    function p() {
        h(function(e) {
            if (void 0 !== e) {
                var t = $.parseJSON(e);
                if (t.added_user) {
                    var a = "";
                    a += '<div id="permalink_favorites">', a += '<label for="favorite_title">Title</label>', a += '<input id="favorite_title" class="box_overflow_fix" placeholder="optional title" maxlength="100">', a += '<label for="favorite_tags" style="margin-top: 5px;">Add tags</label>', a += '<input id="favorite_tags" class="box_overflow_fix" placeholder="optional tags (space separated)" maxlength="100">', a += '<i class="fa fa-arrow-up" id="perma_go_up"></i>', a += "</div>", a += '<div class="account_notice">', a += '<input type="checkbox" name="add_to_favorites" value="0" tabindex="9999">', a += '<label class="design_label" for="add_to_favorites"><span></span>Add to favorites?</label></div>', $("#dimmer-contents").append(a), D()
                }
                $("#permalink_input").val(t.permalink), $("#permalink_menu .large_menu").text("Update regex"), $("#permalink_menu i").removeClass("fa-save").addClass("fa-repeat"), $("#permalink_fork").show(), $("#permalink_menu").attr("data-permalink", t.permaid), $("#permalink_menu").attr("data-version", t.version), $("#version_container").show(), $("#version_selector option[selected=selected]").removeProp("selected"), $("#version_selector").append('<option selected="selected" value="' + t.permaid + "/" + t.version + '">version ' + t.version + " - " + t.date + "</option>"), window.history && window.history.pushState(null, document.title, t.permalink)
            } else $("#permalink_input").val(window.location.protocol + "//" + window.location.host + "/r/" + $("#permalink_menu").attr("data-permalink") + "/" + $("#permalink_menu").attr("data-version"));
            $("#permalink_input").focus(), $("#permalink_input").select(), v()
        }, function(e, t) {
            "abort" != t && $("#permalink_input").text("something went wrong! please try again")
        }, !1)
    }

    function m() {
        $("#permalink_menu").attr("data-permalink", ""), X = {}, h(function(e) {
            var t = $.parseJSON(e);
            $("#dimmer-contents").css("width", 480), $("#permalink_menu").attr("data-permalink", t.permaid), $("#permalink_menu").attr("data-version", t.version), window.history ? window.history.pushState(null, document.title, t.permalink) : window.location.href = t.permalink;
            var a = '<div id="dimmer-contents">';
            a += '<div id="permalink_data">', a += '<div class="label">Fork success!</div>', a += "The workspace has been successfully forked.<br>You can now continue working where you left off.", a += '<i class="fa fa-arrow-down" id="perma_go_down"></i>', a += "</div>", t.added_user && (a += '<div id="permalink_favorites">', a += '<label for="favorite_title">Title</label>', a += '<input id="favorite_title" class="box_overflow_fix" placeholder="optional title" maxlength="100">', a += '<label for="favorite_tags" style="margin-top: 5px;">Add tags</label>', a += '<input id="favorite_tags" class="box_overflow_fix" placeholder="optional tags (space separated)" maxlength="100">', a += '<i class="fa fa-arrow-up" id="perma_go_up"></i>', a += "</div>", a += '<div class="account_notice">', a += '<input type="checkbox" name="add_to_favorites" value="0" tabindex="9999">', a += '<label class="design_label" for="add_to_favorites"><span></span>Add to favorites?</label></div>', D()), a += "</div>", a += '<div id="button-area" class="button-area">', a += '<div id="permalink_close" class="button">close</div>', a += "</div>", q(a), t.added_user && D(), $("#version_selector").html('<option selected="selected" value="' + t.permaid + "/" + t.version + '">version ' + t.version + " - " + t.date + "</option>"), v()
        }, function(e, t, a) {
            var i = '<div id="dimmer-contents">';
            i += '<div class="label">Fork failed</div>', i += 'I could not complete your request due to an error: <span class="errorize_text">' + a + "</span> <br>Please report this to the administrator.", i += "</div>", i += '<div id="button-area" class="button-area">', i += '<div id="permalink_close" class="button">close</div>', i += "</div>", q(i)
        }, !0)
    }

    function v() {
        X = JSON.stringify({
            regex: $("#regex").val(),
            options: getOptions(),
            regexText: $("#regex_string").val(),
            isSub: sub_enabled(),
            sub: $("#sub").val(),
            delimiter: $("#delimiter_selector").text(),
            flavor: getFlavor(),
            permaid: $("#permalink_menu").attr("data-permalink"),
            unitTests: V(!1)
        })
    }

    function h(e, t, a) {
        j && "pending" == j.state() && j.abort();
        var i = {
                regex: $("#regex").val(),
                options: getOptions(),
                regexText: $("#regex_string").val(),
                isSub: sub_enabled(),
                sub: $("#sub").val(),
                delimiter: $("#delimiter_selector").text(),
                flavor: getFlavor(),
                permaid: $("#permalink_menu").attr("data-permalink"),
                unitTests: V(!1)
            },
            s = JSON.stringify(i);
        return s !== X || a ? (j = $.ajax({
            type: "POST",
            url: "/permalink.php",
            contentType: "application/json;charset=UTF-8",
            timeout: 1e4,
            data: s,
            success: e,
            error: t
        }), void $("#version_container span").remove()) : void e(void 0)
    }

    function f() {
        function e(e) {
            for (var t = 0, a = "", i = "", s = 0, n = e.length; n > s; s++) {
                var r = e.charAt(s);
                t % 2 !== 0 && "\\" === a && /^\d$/.test(r) && (i = i.slice(0, -1) + "$", t = 0), "\\" === r && t++, i += r, a = r
            }
            return i
        }
        var t = $("#regex_string").val().replace(/\n/g, "\\n").replace(/\r/g, "\\r"),
            a = $("#regex").val(),
            i = flags = escapeHtml(getOptions()),
            s = escapeHtml($("#delimiter_selector").text()),
            n = $("#sub").val(),
            r = $("#subst_parent").hasClass("subst_enabled"),
            o = -1 !== flags.indexOf("g");
        flags = escapeHtml(flags.replace("g", ""));
        var l = flags.replace("i", "re.IGNORECASE | ").replace("m", "re.MULTILINE | ").replace("s", "re.DOTALL | ").replace("u", "re.UNICODE | ").replace("x", "re.VERBOSE | ");
        l = l.substring(0, l.length - 3), l && (l = ", " + l);
        var c = [{
                lang: "PHP",
                normal: '$re = "' + s + escapeHtml(esc(a.replace(/\\/g, "\\\\"), '"')) + s + flags + '"; <br />$str = "' + escapeHtml(esc(esc(t, '"'), "$")) + '"; <br />&nbsp;<br />preg_match($re, $str, $matches);',
                global: '$re = "' + s + escapeHtml(esc(a.replace(/\\/g, "\\\\"), '"')) + s + flags + '"; <br />$str = "' + escapeHtml(esc(esc(t, '"'), "$")) + '"; <br />&nbsp;<br />preg_match_all($re, $str, $matches);',
                subst: '$re = "' + s + escapeHtml(esc(a.replace(/\\/g, "\\\\"), '"')) + s + flags + '"; <br />$str = "' + escapeHtml(esc(esc(t, '"'), "$")) + '"; <br />$subst = "' + escapeHtml(esc(e(n), '"')) + '"; <br />&nbsp;<br />$result = preg_replace($re, $subst, $str' + (o ? "" : ", 1") + ");"
            }, {
                lang: "Javascript",
                normal: "var re = /" + escapeHtml(esc(a, "/")) + "/" + i + "; <br />var str = '" + escapeHtml(esc(t, "'")) + "';<br />var m;<br />&nbsp;<br />" + (o ? "while" : "if") + " ((m = re.exec(str)) !== null) {<br />    if (m.index === re.lastIndex) {<br />        re.lastIndex++;<br />    }<br />    // View your result using the m-variable.<br />    // eg m[0] etc.<br />}",
                global: "var re = /" + escapeHtml(esc(a, "/")) + "/" + i + "; <br />var str = '" + escapeHtml(esc(t, "'")) + "';<br />var m;<br />&nbsp;<br />" + (o ? "while" : "if") + " ((m = re.exec(str)) !== null) {<br />    if (m.index === re.lastIndex) {<br />        re.lastIndex++;<br />    }<br />    // View your result using the m-variable.<br />    // eg m[0] etc.<br />}",
                subst: "var re = /" + escapeHtml(esc(a, "/")) + "/" + i + "; <br />var str = '" + escapeHtml(esc(t, "'")) + "';<br />var subst = '" + escapeHtml(esc(n, "'")) + "'; <br />&nbsp;<br />var result = str.replace(re, subst);"
            }, {
                lang: "Python",
                normal: "import re<br/>p = re.compile(ur'" + escapeHtml(esc(a, "'")) + "'" + l + ')<br />test_str = u"' + escapeHtml(esc(t, '"')) + '"<br />&nbsp;<br />re.search(p, test_str)',
                global: "import re<br/>p = re.compile(ur'" + escapeHtml(esc(a, "'")) + "'" + l + ')<br />test_str = u"' + escapeHtml(esc(t, '"')) + '"<br />&nbsp;<br />re.findall(p, test_str)',
                subst: "import re<br/>p = re.compile(ur'" + escapeHtml(esc(a, "'")) + "'" + l + ')<br />test_str = u"' + escapeHtml(esc(t, '"')) + '"<br />subst = u"' + escapeHtml(esc(n, '"')) + '"<br /> &nbsp;<br />result = re.sub(p, subst, test_str)'
            }],
            d = '<div class="code_sample_container navigation">';
        d += '<div id="code_nav">';
        for (var u = 0; u < c.length; u++) d += '<a href="#code_' + u + '">' + c[u].lang + "</a>";
        d += "</div>", d += "</div>";
        for (var u = 0; u < c.length; u++) {
            var p = c[u];
            d += '<div class="label">' + p.lang, d += "</div>", d += '<div class="code_sample_container hard_break" id="code_' + u + '">', d += "<pre>", d += r ? p.subst : o ? p.global : p.normal, d += "</pre>", d += "</div>"
        }
        $("#code_samples").html(d), $("#code_0 pre").snippet("PHP", {
            style: "vim-dark",
            showNum: !1
        }), $("#code_1 pre").snippet("Javascript", {
            style: "vim-dark",
            showNum: !1
        }), $("#code_2 pre").snippet("Python", {
            style: "vim-dark",
            showNum: !1
        })
    }

    function g() {
        setTimeout(function() {
            $("#quickref_filter").val("").trigger("updateQuickrefFilter"), $(".filter_mini").css("float", "right"), $(".filter_mini").find("div.filter_div").hide(), $(".filter_mini").parent().find("span").show()
        }, 0)
    }

    function b() {
        Y(), ie && "pending" == ie.state() && ie.abort(), ie = $.ajax({
            type: "POST",
            url: "/community_link.php",
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            timeout: 1e4,
            success: function(e) {
                $("#community").html(e), s("#community .community_regex_container"), $(".community_menu li").removeClass("disabled"), $(".community_menu").show(), $("#community_titles ul > li").first().click(), K()
            },
            error: function(e, t, a) {
                "abort" != t && $("#community").html('<div class="debugger_loader_padding">Something went wrong! Please <a href="https://github.com/firasdib/Regex101/issues">report</a> the following error: ' + a + "</div>").show()
            }
        })
    }

    function x() {
        function e(e) {
            return a && e === FLAVOR.PCRE ? !0 : i && e === FLAVOR.JS ? !0 : s && e === FLAVOR.PYTHON ? !0 : !1
        }
        for (var t = $("#regex_filter").val(), a = $("#filter_menu .flavor_pcre").hasClass("active"), i = $("#filter_menu .flavor_js").hasClass("active"), s = $("#filter_menu .flavor_python").hasClass("active"), n = document.querySelectorAll("#community_titles .menu_item"), r = 0, o = n.length; o > r; r++) {
            var l = n[r];
            l.style.display = e(l.getAttribute("data-flavor-id")) && -1 !== l[textMethod].toLowerCase().indexOf(t) ? "list-item" : "none"
        }
    }

    function w() {
        Y(), ne && "pending" == ne.state() && ne.abort(), ne = $.ajax({
            type: "POST",
            url: "/account.php",
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            timeout: 1e4,
            success: function(e) {
                replaceHtml("account", e), $("#account").show(), i("#account_submissions .account_regex"), O(), K()
            },
            error: function(e, t, a) {
                "abort" != t && ($("#account").html('<div class="debugger_loader_padding">Something went wrong! Please <a href="https://github.com/firasdib/Regex101/issues">report</a> the following error: ' + a + "</div>").show(), K())
            }
        })
    }

    function k(e, t, a, i, s, n) {
        var r = {
            permaid: e,
            version: t,
            state: a,
            action: "update_fav",
            title: i,
            tags: s
        };
        n ? $.post("/handle_favorites.php", r, function() {
            n()
        }) : $.post("/handle_favorites.php", r)
    }

    function C(e, t) {
        $.post("/handle_favorites.php", {
            permaid: e,
            version: t,
            action: "delete_fav"
        })
    }

    function y(e) {
        $.post("/handle_favorites.php", {
            permaid: e,
            delete_history: 1,
            action: "delete_fav"
        })
    }

    function T(e, t) {
        $.post("/handle_favorites.php", {
            permaid: e,
            version: t,
            action: "delete_fav_perm"
        })
    }

    function S(e, t) {
        $.post("/handle_favorites.php", {
            permaid: e,
            action: "privatize",
            state: t
        })
    }

    function O() {
        $(".account_entry.no_entries").hide();
        var e = $("#only_fav").hasClass("active"),
            t = $("#only_contrib").hasClass("active"),
            a = [];
        $("#account_filters .account_tag.active").each(function(e, t) {
            a.push(t[textMethod])
        });
        var i = a.length;
        $(".account_entry:not('.no_entries')").each(function(s, n) {
            var r = !1,
                o = $(n);
            (e && o.hasClass("account-favorite") || t && o.hasClass("account-contrib")) && (r = !0), i > 0 && r && (r = !1, o.find(".account_tag").each(function(e, t) {
                return -1 !== a.indexOf(t[textMethod]) ? void(r = !0) : void 0
            })), r ? o.show() : o.hide();
            var l = o.find(".account_regex");
            l[0].clientHeight < l[0].scrollHeight && l.addClass("overflow_bottom_fade")
        }), 0 === $(".account_entry:visible").length && $(".account_entry.no_entries").show()
    }

    function R() {
        var e = $("#permalink_menu").attr("data-permalink"),
            t = $("#permalink_menu").attr("data-version"),
            a = $("input[name=add_to_favorites]");
        k(e, t, a.is(":checked") ? 1 : 0, $("#favorite_title").val(), $("#favorite_tags").val())
    }

    function D() {
        function e(e) {
            return e.replace(/\S+| /g, function(e) {
                return " " === e ? "&nbsp;" : '<span class="account_tags_bg">' + e + "</span>"
            })
        }
        r("#favorite_tags", [{
            trigger: "input updateColors",
            triggerFunc: function(t, a, i) {
                return replaceHtml(i, e(a.value))
            }
        }, {
            trigger: "keypress",
            triggerFunc: function(e, t, a) {
                e.stopPropagation();
                var i = String.fromCharCode(e.which);
                return /^[a-z0-9_ \-]$/i.test(i) || e.preventDefault(), a
            }
        }])
    }

    function H() {
        submitCommunity && "pending" == submitCommunity.state() && submitCommunity.abort(), communityTimeout && clearTimeout(communityTimeout), re && (re(), re = void 0), $("#dimmer, #dimmer-popup").fadeOut(B)
    }

    function q(e) {
        $("#dimmer-popup").html(e), $("#dimmer, #dimmer-popup").show(), $("#dimmer-popup").css({
            top: "50%",
            left: "50%",
            marginTop: -1 * ($("#dimmer-popup").height() / 2),
            marginLeft: -1 * ($("#dimmer-popup").width() / 2)
        })
    }

    function E() {
        $("#dimmer-popup").animate({
            marginTop: -1 * ($("#dimmer-popup").height() / 2),
            marginLeft: -1 * ($("#dimmer-popup").width() / 2)
        }, 300)
    }

    function M(e, t, a, i, s, n, r) {
        function o(e) {
            h && clearTimeout(h), h = setTimeout(function() {
                for (var e = b.length; e--;) b[e].rects = b[e].getClientRects()
            }, e)
        }

        function l() {
            f && clearTimeout(f), f = setTimeout(function() {
                b = document.querySelectorAll(a + " " + i), o(0)
            }, 50)
        }

        function c(e, t) {
            var a = t.rects;
            if (a)
                for (ue = 0; ue < a.length; ue++) {
                    var i = a[ue];
                    if (i.top <= e.pageY && i.bottom >= e.pageY && i.left <= e.pageX && i.right >= e.pageX) return m !== t && p(), u(t, s, e.pageX, e.pageY, i), m = t, !0
                }
        }

        function d(e, t, a) {
            e /= 255, t /= 255, a /= 255;
            var i, s, n = Math.max(e, t, a),
                r = Math.min(e, t, a),
                o = (n + r) / 2;
            if (n == r) i = s = 0;
            else {
                var l = n - r;
                switch (s = o > .5 ? l / (2 - n - r) : l / (n + r), n) {
                    case e:
                        i = (t - a) / l + (a > t ? 6 : 0);
                        break;
                    case t:
                        i = (a - e) / l + 2;
                        break;
                    case a:
                        i = (e - t) / l + 4
                }
                i /= 6
            }
            return [Math.floor(360 * i), Math.floor(100 * s), Math.floor(100 * o)]
        }

        function u(e, t, a, i, s) {
            var n = $(e);
            if (e !== m) {
                var r = n.css("background-color"),
                    o = r.match(/\d+/g);
                if (null === o) return;
                var l = d(o[0], o[1], o[2]),
                    c = 1;
                o.length > 3 && (c = 0), n.css($("#dark_theme").is(":checked") ? {
                    outline: "hsl(" + l[0] + ", " + l[1] + "%, " + (l[2] + 30) + "%) solid 2px",
                    backgroundColor: "hsla(" + l[0] + ", " + l[1] + "%, " + Math.max(l[2] - 10, 0) + "%, " + c + ")"
                } : {
                    outline: "hsl(" + l[0] + ", " + l[1] + "%, " + (l[2] - 30) + "%) solid 2px",
                    backgroundColor: "hsla(" + l[0] + ", " + l[1] + "%, " + Math.min(100, l[2] + 5) + "%, " + c + ")"
                }), $("#tooltip-contents").html(t(e)), $("#match-tooltip-tip, #match-tooltip").fadeIn(80)
            }
            var u = $("#match-tooltip").width() / 2 + 8,
                p = $("#match-tooltip").height() + 16,
                h = 0,
                _ = 0;
            a - u > 0 ? (h = a - u, _ = u) : _ = a, a + u > v && (h = v - 2 * u, _ = a - h), $("#match-tooltip").css({
                left: Math.floor(h),
                top: Math.floor(s.top - p - 7)
            }), $("#match-tooltip-tip").css({
                left: Math.floor(_),
                top: Math.floor(p)
            })
        }

        function p() {
            $("#match-tooltip").stop().hide(), null !== m && (m.removeAttribute("style"), m = null, r && r())
        }
        var m = null,
            v = $(window).width();
        if ($(n).on("scroll resize", function() {
                o(50)
            }), $(window).on("resize scroll", function() {
                v = $(window).width(), p(), "" !== e && l()
            }), "" !== e) {
            var h, f;
            $(t).on("updateTooltip", function() {
                l(), p()
            }), $(e).on("mousemove", _.throttle(function(e) {
                if (le) return void p();
                for (var t = !1, a = b.length; a--;)
                    if (c(e, b[a])) {
                        t = !0;
                        break
                    } t || p()
            }, 10));
            var g;
            $(e).on("click", function() {
                m && (g && clearTimeout(g), g = setTimeout(function() {
                    if (m) {
                        var e = $(m).attr("data-tooltip").split(";"),
                            t = "#match" + e[0] + "_group" + e[3];
                        if (e[3] > 0) {
                            var a = $("#scroll_match .overflow_handler").scrollTop() + $(t).position().top;
                            $("#scroll_match .overflow_handler").scrollTop(a), $(t).highlight($("#scroll_match .overflow_handler"), a)
                        }
                    }
                }, 100))
            }), $(e).on("mouseout", function(e) {
                for (var e = e.toElement || e.relatedTarget; e && e.parentNode && e.parentNode !== window;) {
                    if (e.parentNode == this || e == this) return e.preventDefault && e.preventDefault(), !1;
                    e = e.parentNode
                }
                p()
            }), $(e).on("resize", function() {
                p(), o(50)
            }), $(n).on("scroll resize", function() {
                p(), o(50)
            });
            var b = [];
            l()
        } else {
            var x = null;
            $(document).on({
                mousemove: _.throttle(function(e) {
                    return e.preventDefault(), e.stopPropagation(), le ? void 0 : (x !== this && (this.rects = this.getClientRects(), x = this), c(e, this))
                }, 10),
                mouseout: function() {
                    setTimeout(function() {
                        x = null, p()
                    }, 0)
                }
            }, i)
        }
    }

    function P() {
        function e(e, t, a, i) {
            return '<option data-grpNum="' + i + '" value="' + e + '"' + (a ? 'selected="selected"' : "") + ">" + t + "</option>"
        }
        var t = "";
        t += e("regex", "regex", !0), t += e("group", "matched result", !1, 0);
        for (var a = Regex101Colorizer.getCaptureData(), i = 0; i < a.group_count; i++) t += e("group", "capture group " + (i + 1), !1, i + 1);
        $("#unit_type").html(t), $("#assert_type").html(A(ce.regex)), $("#assert_equals").hide(), z(), F()
    }

    function A(e) {
        return "<option>" + e.join("</option><option>") + "</option>"
    }

    function z() {
        $("#assert_equals, #unit_data").val("")
    }

    function N() {
        var e = $(".unit_test").length;
        $(".unit_result").removeClass("pass fail").text(e > 0 ? "0/" + e : "n/a")
    }

    function F() {
        hasUnitTests() ? ($("#unit_test_container .empty").remove(), $(".unit_test_player").show()) : ($("#unit_test_container").html('<div class="empty"><h2>Nothing here!</h2><span class="acount_no_entry_text">There are no unit tests for this regex. Add some!</span></div>'), $(".unit_test_player").hide(), stopUnitTests())
    }

    function V(e) {
        for (var t = $(".unit_test").toArray().reverse(), a = [], i = 0, s = t.length; s > i; i++) {
            var n = t[i],
                r = $(n),
                o = {},
                l = r.find("span.type");
            o.type = l.attr("data-src"), o.grpNum = l.attr("data-grpNum"), o.assertion = r.find("span.assert").attr("data-src"), o.testStr = r.find("span.data").eq(0).attr("data-src"), o.compareStr = r.find("span.data").eq(1).attr("data-src"), e && (o.element = r), a.push(o)
        }
        return a
    }

    function L(e, t, a, i, s, n, r) {
        function o(e, t, a, i) {
            e = e.substr(t, a), strlen = e.length;
            var s = 50;
            return strlen > s && (e = i ? "..." + e.substr(strlen - s) : e.substr(0, s) + "..."), e = white_space(escapeHtml(e))
        }

        function l(e, t, a) {
            return white_space(escapeHtml(e.substr(t, a)))
        }
        var c = {
            pstart: 0,
            pend: 0,
            sstart: 0,
            send: 0,
            data: !0
        };
        t > 0 && (c = debugData[e][t - 1]);
        var d = "";
        d += '<div class="debugger_match_child" data-step="' + t + '" data-matchid="' + e + '">', d += '<div class="debugger_line_num">' + (t === s ? "#" : t + 1) + "</div>";
        var u = debugData[e][t];
        if (u.data) {
            if (d += '<div class="debugger_child_data">', d += '<div class="debugger_regex_pos hard_brea"' + (r ? "" : ' style="display: none;"') + "><span>", d += $("#delimiter_selector").text(), d += white_space(escapeHtml(a.substring(0, u.pstart))), d += '<span class="hl">', u.pend > 0 && (d += white_space(escapeHtml(a.substr(u.pstart, u.pend)))), d += "</span>", d += white_space(escapeHtml(a.substring(u.pstart + u.pend))), d += $("#delimiter_selector").text() + getOptions(), d += "</div>", d += '<div class="debugger_regex_text hard_break">', u.send > 0) d += o(i, 0, u.sstart, !0), d += '<span class="match' + (t % 2 === 0 ? "alt" : "") + '">', d += l(i, u.sstart, u.send), d += "</span>", d += o(i, u.sstart + u.send, i.length, !1);
            else if (u.send < 0) {
                var p = u.sstart - Math.abs(u.send);
                d += o(i, 0, p, !0), d += '<span class="match' + (t % 2 === 0 ? "alt" : "") + '">', d += l(i, p, u.sstart - p), d += "</span>", d += o(i, u.sstart, i.length, !1)
            } else d += o(i, 0, u.sstart, !0), d += '<span class="match' + (t % 2 === 0 ? "alt" : "") + '"></span>', d += o(i, u.sstart, i.length, !1);
            (c.pstart > u.pstart || c.sstart > u.sstart || u.sstart == c.sstart && c.send > u.send && u.send > 0) && (d += '<span class="notice">BACKTRACK</span>'), d += "</div></div>"
        } else d += '<div class="debugger_child_data ' + (u.status >= 0 ? "matched" : "nomatch") + '">' + u.msg, n && (d += '<div class="debugger_paginator button-area"><a href="#" class="button debugger_next">Load more data</a></div>'), d += "</div>";
        return d += "</div>"
    }

    function I(e, t, a) {
        for (var i = 400, s = "", n = $("#regex").val(), r = $("#regex_string").val(), o = debugData[a].length, l = $("#show_regex_pos").is(":checked"), c = t, d = Math.min(t + i, o); d > c; c++) s += L(a, c, n, r, o - 1, !1, l);
        o > i && (s += L(a, o - 1, n, r, o - 1, !0, l)), e.append(s).show()
    }

    function U() {
        $("#debugger_label").text("Status: Fetching debug data..."), $("#regex_debugger_window").html('<div class="debugger_loader_padding">Please hold while we fetch the debug data. This might take some time.</div>');
        var e = {
            regex: $("#regex").val(),
            options: $("#options").val(),
            regexText: test_area.value,
            isSub: !1,
            delimiter: $("#delimiter_selector").text(),
            debugging: !0
        };
        return runDebugger(e), !1
    }

    function J() {
        $("#show_regex_pos").is(":checked") ? $(".debugger_regex_pos").show() : $(".debugger_regex_pos").hide()
    }

    function K() {
        $("#loading_screen").fadeOut(300, function() {
            $(this).hide()
        })
    }

    function Y() {
        $("#loading_screen").show()
    }
    var j = null,
        W = null,
        X = {},
        B = 200,
        G = 250;
    $(document).on("keydown", "#exported_data .contents, #subst_result", function(e) {
        -1 !== deadKeycodes.indexOf(e.which) || e.ctrlKey || e.metaKey || e.shiftKey || e.preventDefault()
    }), $(document).on("cut paste", "#exported_data .contents, #subst_result", function(e) {
        e.preventDefault()
    }), $("#options_helper").hover(function() {
        var e = $("#options_container").offset(),
            t = $("#content").offset(),
            a = $("#main_editor").width() - 4 - 20;
        $("#options_helper_contents").width(500 > a ? a : a > 800 ? 800 : a);
        var i = $("#options").attr("placeholder");
        $("#options_helper_contents").html('<div class="label">Modifier quick reference</div><ul id="quickref_flags">' + Regex101Explainer.explain_options(i) + "<li><em>All flags with further information can be found in the quick reference.</em></li></ul>"), $("#options_helper_contents").css({
            left: $("#main_editor").outerWidth() - $("#options_helper_contents").outerWidth() - 10,
            top: e.top - t.top + $("#options_container").outerHeight()
        }), $("#options_helper_contents").show()
    }, function() {
        $("#options_helper_contents").html(), $("#options_helper_contents").fadeOut(B)
    }), $(document).on("focusout blur", "[data-focus]", function() {
        $($(this).attr("data-focus")).removeClass("focus_border")
    }), $(document).on("focusin focus", "[data-focus]", function() {
        $($(this).attr("data-focus")).addClass("focus_border")
    }), $(".filter_parent").on("focusout blur", function() {
        $(".filter_input").removeClass("focus_border")
    }), $(".filter_parent").on("focusin focus", function() {
        $(".filter_input").addClass("focus_border")
    });
    var Q;
    a("#regex", "#options", "#delimiter_selector"), $("#scroll_match").on("click", ".export_matches", function() {
        function e(e) {
            return e.replace(/"/g, '""')
        }
        $(".tipsy").remove();
        var t = $("#match_info table tr"),
            a = [],
            i = {},
            s = "";
        t.each(function() {
            var e = $(this).children();
            if (1 === e.length) i.match && (a.push(i), i = {}), i.match = Math.floor($(e[0]).text().replace(/^MATCH /, "")), i.children = [];
            else {
                var t = {},
                    n = e[0][textMethod];
                if (t.group = n.replace(".", ""), t.group != n && (t.group = Math.floor(t.group)), e.length > 2) {
                    var r = e[1][textMethod].replace(/\[|\]/g, "").split("-");
                    t.start = Math.floor(r[0]), t.end = Math.floor(r[1]), t.value = e[2][textMethod].slice(1, -1)
                } else t.value = e[1][textMethod].slice(1, -1);
                i.children.push(t), s += t.value + "\n"
            }
        }), a.push(i);
        var n = '<div id="dimmer-contents">';
        n += '<div id="export_contents">', n += '<div id="export_format">', n += '<div class="label">Format</div>', n += "<ul>", n += '<li><a class="json active" href="#" data-id="JSON"><i class="fa fa-file-code-o"></i>json</a></li>', n += '<li><a class="csv" href="#" data-id="CSV"><i class="fa fa-list-alt"></i>csv</a></li>', n += '<li><a class="plain" href="#" data-id="plain"><i class="fa fa-file-text"></i>plain text</a></li>', n += "</ul>", n += "</div>", n += '<div id="exported_data">', n += '<div class="label">Result</div>', n += '<div contenteditable="true" class="contents monospace hard_break overflow_handler">', n += '<div class="json_data">' + escapeHtml(JSON.stringify(a, null, 2)) + "</div>", n += '<div class="csv_data">', n += "MATCH_NUM,GROUP,", getFlavor() == FLAVOR.PCRE && (n += "START,END,"), n += "VALUE\n";
        for (var r = 0, o = a.length; o > r; r++)
            for (var l = a[r], c = 0, d = l.children.length; d > c; c++) {
                var u = l.children[c];
                n += l.match + ",", n += (Math.floor(u.group) == u.group ? u.group : '"' + u.group + '"') + ",", getFlavor() == FLAVOR.PCRE && (n += u.start + ",", n += u.end + ","), n += '"' + escapeHtml(e(u.value)) + '"\n'
            }
        n += "</div>", n += '<div class="plain_text">', n += escapeHtml(s), n += "</div>", n += "</div>", n += "</div>", n += "</div>", n += "</div>", n += '<div id="button-area" class="button-area">', n += '<div id="permalink_close" class="button">close</div>', n += "</div>", q(n)
    }), $(document).on("click", "#export_format a", function() {
        switch ($("#export_contents a").removeClass("active"), $("#exported_data .contents div").hide(), $(this).addClass("active"), $(this).attr("data-id")) {
            case "JSON":
                $(".json_data").show();
                break;
            case "CSV":
                $(".csv_data").show();
                break;
            case "plain":
                $(".plain_text").show()
        }
        E()
    });
    var Z = 0;
    $("#regex_string").on("input", function() {
        test_height_element[textMethod] = test_area.value, this.scrollLeft = 1, wrapNewlines() || (test_height_element[textMethod] += " "), 5 > Z ? t(!1) : cancelMatching(!0), Z++
    }), $("#regex_string").on("keydown", function(e) {
        if (!(9 !== e.keyCode || e.shiftKey || e.ctrlKey || e.metaKey || e.altKey)) {
            if (this.setSelectionRange) {
                var a = this.selectionStart,
                    i = this.selectionEnd,
                    s = a + 1;
                this.value = this.value.substring(0, a) + "	" + this.value.substring(i), this.setSelectionRange(s, s)
            } else if (document.selection) {
                var n = document.selection.createRange();
                n.text = "	", n.select()
            }
            e.preventDefault(), t(!1)
        }
    }), $("#regex_string").on("keyup", function() {
        Z > 4 && t(!1), Z = 0
    }), $("#options").on("input", function() {
        t(!0)
    }), $("#sub").on("input", function() {
        t(!0)
    });
    var ee = {
        JS: {
            sub: /^\s*s(\/)((?:\\.|(?!\1).)+)\1((?:\\.|(?!\1).)*)\1([gmi]*)$/,
            match: /^\s*(\/)([\s\S]+)\/([gmi]*)$/
        },
        PCRE: {
            sub: /^\s*s([\/@~;%,])((?:\\.|(?!\1).)+)\1((?:\\.|(?!\1).)*)\1([xXsiuUmgADJ]*)$/,
            match: /^\s*([\/@~;%,])([\s\S]+)\1([xXsiuUmgADJ]*)$/
        }
    };
    $("#regex").on("paste", function() {
        setTimeout(function() {
            var e, t, a = $("#regex").val(),
                i = getFlavor();

            switch (i) {
                case FLAVOR.JS:
                    e = ee.JS.match, t = ee.JS.sub;
                    break;
                case FLAVOR.PCRE:
                    e = ee.PCRE.match, t = ee.PCRE.sub
            }
            if (void 0 !== e && void 0 !== t) {
                var s = a.match(e);
                if (s) $(".slash").text(s[1]), $("#regex").val(s[2]), $("#options").val(s[3]);
                else {
                    var n = a.match(t);
                    n && ($(".slash").text(n[1]), $("#regex").val(n[2]), $("label[for=sub].collapsed").click(), $("#sub").val(n[3]), $("#options").val(n[4]))
                }
            }
        }, 0)
    }), r("#sub", [{
        trigger: "input updateColors",
        triggerFunc: function(e, t, a) {
            return replaceHtml(a, n(t.value))
        }
    }]), $("#subst_parent .expander").click(function() {
        $("#subst_container").is(":visible") ? ($("#subst_container").hide(), $("#subst_parent").removeClass("subst_enabled"), $("#test_result_container").removeClass("subst_enabled")) : ($("#subst_container").show(), $("#subst_parent").addClass("subst_enabled"), $("#test_result_container").addClass("subst_enabled"), t(!1))
    }), $("#quickref .expander").click(function() {
        var e = $("#quickref_data");
        e.is(":visible") ? ($("#quickref").addClass("flex-minimized"), e.hide()) : ($("#quickref").removeClass("flex-minimized"), e.show()), setCookieData("quickref", e.is(":visible"))
    }), $("#match_label").click(function() {
        var e = $("#scroll_match .overflow_handler");
        e.is(":visible") ? ($("#scroll_match").addClass("flex-minimized"), e.hide()) : ($("#scroll_match").removeClass("flex-minimized"), e.show()), setCookieData("match_info", e.is(":visible"))
    }), $("#explainer_label").click(function() {
        var e = $("#scroll_treeview .overflow_handler");
        e.is(":visible") ? ($("#scroll_treeview").addClass("flex-minimized"), e.hide()) : ($("#scroll_treeview").removeClass("flex-minimized"), e.show()), setCookieData("explainer", e.is(":visible"))
    }), $(".expander").click(function() {
        var e = $(this).find("span"),
            t = "fa-plus-circle",
            a = "fa-minus-circle";
        e.hasClass(t) ? (e.removeClass(t).addClass(a), e.parent().not(".menu_item").removeClass("collapsed")) : (e.removeClass(a).addClass(t), e.parent().not(".menu_item").addClass("collapsed"))
    });
    var te = !1;
    $("#treeview_resizer").on("mousedown", function(e) {
        $("body").addClass("disable_selection"), te = !0, lastX = e.pageX, $("#regex_treeview").hasClass("treeview_hidden") && ($("#treeview_resizer").attr("original-title", "Drag left"), $("#treeview_resizer").tipsy("show"))
    }), $(document).on("mouseup", function() {
        if (te) {
            if (te = !1, updateTooltipData(), lastX = void 0, $("body").removeClass("disable_selection"), $("#regex_treeview").hasClass("treeview_hidden")) setCookieData("show_sidebar", 0);
            else {
                var e = $("#regex_editor").width(),
                    t = Math.round($("#regex_treeview").width() / e * 100),
                    a = 100 - t;
                $("#regex_treeview").css("width", t + "%"), $("#main_editor").css("width", a + "%"), setCookieData("show_sidebar", t)
            }
            $("#treeview_resizer").tipsy("hide")
        }
    }), $(document).on("mousemove", _.throttle(function(e) {
        if (te) {
            var t = $("#regex_treeview").width(),
                a = $("#main_editor").width(),
                i = $(window).width() - e.pageX,
                s = a - (i - t);
            if (s > 500)
                if (G > i) {
                    $("#regex_treeview, #main_editor").addClass("treeview_hidden"), $("#treeview_resizer").tipsy("show");
                    var n = "Keep dragging: " + Math.max(0, Math.floor(i / G * 100)) + "%";
                    $("#treeview_resizer").attr("original-title", n)
                } else $("#regex_treeview, #main_editor").removeClass("treeview_hidden"), $("#regex_treeview").width(i), $("#main_editor").width(s), $("#treeview_resizer").tipsy("hide")
        }
    }, 10)), $("#treeview_resizer").tipsy({
        gravity: "e",
        trigger: "manual"
    }), $("#header_nav .header_nav").click(function() {
        var e = $(this).attr("data-id"),
            t = $(this).hasClass("active");
        switch (e) {
            case "40":
                t ? $("#inline_menu .menu_item.fullscreen.active").not($(this)).click() : (u(), $(this).addClass("active"), $("#main_menu, #tools_menu, .regex_menu, #regex_editor").show(), $(".fullscreen_disable").addClass("disabled"));
                break;
            case "43":
                t || (u(), $(this).addClass("active"), b(), $("#community").show(), $("#filter_menu .menu_item").addClass("active"));
                break;
            case "44":
                t || (u(), $(".account_submenu").show(), $(this).addClass("active"), w())
        }
    }), $("#inline_menu .menu_item").click(function() {
        function e() {
            $(".flavor_python, .flavor_js, .flavor_pcre").removeClass("active")
        }

        function t(t, a) {
            e(), t.addClass("active"), setFlavor(a), $("#regex").trigger("updateRegexColors"), $("#quickref_filter").is(":visible") ? $("#quickref_filter").trigger("input") : $("#first_menu .active").click()
        }

        function a(e) {
            $(".extension_menu:not(.donate_submenu) .menu_item").each(function() {
                var e = $(this);
                e.hasClass("disabled") || (e.addClass("disabled"), e.addClass("fullscreen_disable"))
            }), e.removeClass("disabled fullscreen_disable")
        }

        function i() {
            $("#inline_menu .menu_item.disabled.fullscreen_disable").each(function() {
                $(this).removeClass("disabled"), $(this).removeClass("fullscreen_disable")
            })
        }
        if ($(this).hasClass("disabled")) return !1;
        var s = $(this).attr("data-id"),
            n = $(this).hasClass("active");
        switch (s) {
            case "20":
                t($(this), FLAVOR.PCRE);
                break;
            case "21":
                t($(this), FLAVOR.JS);
                break;
            case "22":
                t($(this), FLAVOR.PYTHON);
                break;
            case "3":
                var r = '<div id="dimmer-contents">';
                r += '<div id="permalink_data"><label for="permalink_input">Your unique link</label>', r += '<input id="permalink_input" class="box_overflow_fix" placeholder="fetching data.. please hold" maxlength="200">', r += '<i class="fa fa-arrow-down" id="perma_go_down"></i>', r += "</div>", r += "</div>", r += '<div id="button-area" class="button-area">', r += '<div id="permalink_close" class="button">close</div>', r += "</div>", q(r), p();
                break;
            case "900":
                m();
                break;
            case "4":
                var r = '<div id="dimmer-contents"><label for="community_title">Title *</label>';
                r += '<input id="community_title" class="box_overflow_fix" placeholder="input mandatory title" maxlength="70">', r += '<label for="community_desc">Description</label>', r += '<textarea id="community_desc" cols="70" rows="5" class="box_overflow_fix" name="community_desc" placeholder="', r += "input an optional description of the pattern here", r += '"></textarea>', r += '<label for="community_author">Author</label>', r += '<input id="community_author" placeholder="optional name of the author" class="box_overflow_fix" name="community_author" maxlength="70">', r += '</div><div id="button-area" class="button-area">', r += '<div class="button disabled" id="community_send">submit</div> <div id="permalink_close" class="button">close</div>', r += "</div>", q(r), $("#community_title").focus();
                break;
            case "8":
                n ? ($(this).removeClass("active"), $("#code_samples").fadeOut(B), d(), i()) : ($(this).addClass("active"), c(), f(), $("#code_samples").show(), a($(this)));
                break;
            case "7":
                n ? ($(this).removeClass("active"), $("#regex_debugger").fadeOut(B), d(), i(), $("#options").val(getOptions()), $("#internal_opt").prop("checked", !1), replaceHtml("regex_debugger_window", "")) : ($(this).addClass("active"), c(), U(), $("#regex_debugger").show(), a($(this)));
                break;
            case "100":
            case "101":
            case "102":
                n ? $(this).removeClass("active") : $(this).addClass("active"), x();
                break;
            case "50":
                $("#regex").trigger("formatRegex");
                break;
            case "300":
            case "301":
            case "310":
            case "311":
            case "312":
            case "301":
                n ? $(this).removeClass("active") : $(this).addClass("active"), O();
                break;
            case "99":
                n ? ($(this).removeClass("active"), $("#unit_tests_list, #unit_tests_builder").hide(), $("#subst_parent, #test_result_container").show()) : ($(this).addClass("active"), $("#subst_parent, #test_result_container").hide(), P(), $("#unit_tests_list, #unit_tests_builder").show())
        }
    }), $("#inline_menu .donate_submenu").on("mouseenter mouseleave", function() {
        var e = $(this).find(".large_menu"),
            t = e.text();
        e.text(e.attr("data-txt")), e.attr("data-txt", t)
    });
    var ae = $("#settings_popup_contents");
    $(document).on("mouseup", function() {
        ae.is(":visible") && ($("#settings_popup #settings").click(), t(!1))
    }), $("#sign_in_out .fa-sign-in").on("click", function() {
        $(".tipsy").remove();
        var e = '<div id="dimmer-contents">';
        e += '<div class="label">Login to regex101</div><div id="login_contents">', e += "Please select a login method below:", e += "<ul>", e += "<li><a href=\"#\" onclick=\"window.open('/google.php', '', 'width=500, height=400');\"><i class=\"fa fa-google\"></i>Google</a></li>", e += "<li><a href=\"#\" onclick=\"window.open('/github.php?action=login', '', 'width=800, height=400');\"><i class=\"fa fa-github-square\"></i>Github</a></li>", e += '</ul><span id="login_warning"><strong>Note:</strong> Logging in will reload the page! Any unsaved data will be lost.</span></div>', e += "</div>", e += '<div id="button-area" class="button-area">', e += '<div id="permalink_close" class="button">close</div>', e += "</div>", q(e)
    }), $("#sign_in_out .fa-sign-out").on("click", function() {
        window.location = "/logout"
    }), $("#settings_popup #settings").on("click", function(e) {
        e.stopPropagation(), $(".tipsy").remove();
        var t = ae.is(":visible");
        t ? (ae.fadeOut(B), $(this).removeClass("active")) : ($(".execution_limit input").val(maxWorkerTimeout), ae.show(), $(this).addClass("active"))
    }), $("#settings_popup_contents").on("mouseup", function(e) {
        e.stopPropagation()
    }), $("#settings_popup_contents select").on("change", function() {
        resetTheme(!1), $("body").addClass($(this).val()), setCookieData("regex_theme", getTheme() + "," + $(this).val())
    }), $("#settings_popup_contents input").on("click", function() {
        var e = $(this).is(":checked"),
            t = $(this).attr("data-id");
        switch (t) {
            case "1":
                setCookieData("display_whitespace", displayWhitespace()), s("#community .community_regex_container"), i("#account .account_regex"), $("#regex").trigger("updateRegexColors");
                break;
            case "9":
                setCookieData("colorize_regex", colorizeRegex()), $("#regex").trigger("updateRegexColors"), s("#community .community_regex_container"), i("#account .account_regex");
                break;
            case "10":
                l(), setCookieData("wrap_newlines", wrapNewlines());
                break;
            case "200":
                $("body").removeClass("light").addClass("dark"), setCookieData("dark_theme", !0), setDefaultTheme();
                break;
            case "203":
                $("body").addClass("light").removeClass("dark"), setCookieData("dark_theme", !1), setDefaultTheme();
                break;
            case "201":
                e ? ($("#content").addClass("mini_menu"), $("#inline_menu").addClass("small_menu"), $("#large_header").hide(), $("#small_header").show(), $("#header .large_menu").hide(), $("#header_nav").addClass("no_i_margin")) : ($("#content").removeClass("mini_menu"), $("#inline_menu").removeClass("small_menu"), $("#small_header").hide(), $("#large_header").show(), $("#header .large_menu").show(), $("#header_nav").removeClass("no_i_margin")), setCookieData("small_menu", e), updateTooltipData();
                break;
            case "210":
                setCookieData("smart_complete", autoCompleteRegex());
                break;
            case "220":
                setCookieData("highlight_interaction", highlightInteraction());
                break;
            case "221":
                setCookieData("display_nonpart", displayNonParticipatingGroups())
        }
    }), $("#settings_popup_contents .select_themes a").on("click", function(e) {
        e.preventDefault(), q("fool!")
    }), $("#settings_popup_contents .execution_limit input").on("input", function() {
        o()
    }), $("#settings_popup_contents .execution_limit input").on("focus", function() {
        o()
    }), $("#settings_popup_contents .execution_limit input").on("blur", function() {
        $(this).tipsy("hide")
    }), $("#settings_popup_contents .execution_limit input").tipsy({
        trigger: "manual",
        gravity: "s"
    }), $(".dropdown-index a").on("click", function() {
        $(".slash").text($(this).text()), $("#regex").trigger("updateRegexColors")
    }), $(document).on("keydown", function(e) {
        if (e.ctrlKey || e.metaKey && !e.altKey && !e.ctrlKey) switch (e.which) {
            case 83:
                !onIndexPage() || $("#permalink_menu").hasClass("active") || $("#dimmer-popup").is(":visible") || (e.preventDefault(), $("#permalink_menu").click());
                break;
            case 75:
                e.preventDefault(), $(".run_tests").first().click()
        } else 27 === e.which && ($("#dimmer-popup").is(":visible") ? H() : $(".menu_item.active.fullscreen:not(.main_menu)").length > 0 ? $(".main_menu.active").click() : $("#quickref_data .filter_mini input").is(":focus") && g())
    }), $("#scroll_treeview").on("click", ".hitarea", function() {
        $(this).hasClass("collapsable") ? ($(this).removeClass("collapsable"), $(this).addClass("expandable"), $(this).next().next().hide(), $(this).find("i").removeClass("fa-caret-down"), $(this).find("i").addClass("fa-caret-right")) : ($(this).removeClass("expandable"), $(this).addClass("collapsable"), $(this).next().next().show(), $(this).find("i").addClass("fa-caret-down"), $(this).find("i").removeClass("fa-caret-right"))
    }), $("#first_menu li").click(function() {
        if (!$(this).hasClass("disabled") && !$(this).hasClass("menu_notice")) {
            var e = $(this).attr("data-id");
            if (void 0 !== e) {
                $("#first_menu li").each(function() {
                    $(this).removeClass("active")
                }), $(this).addClass("active");
                var t = getFlavor(),
                    a = [];
                if ("basic" === e || "fullref" === e)
                    for (var i in quickref) a = a.concat(quickref[i]);
                else a = quickref[e];
                for (var s = '<li class="menu_notice">' + $(this).text() + "</li>", n = 0; n < a.length; n++) {
                    var r = a[n];
                    ("basic" !== e || r.basic) && -1 !== r.flavors.indexOf(t) && (s += '<li class="menu_item box_overflow_fix" data-id="' + n + '">', s += "<div>", s += escapeHtml(r.token), s += "</div>", s += '<div class="text_overflow">' + r.desc + "</div>", s += "</li>", s += '<li class="submenu">', s += escapeHtml(r.info), r.example && (s += '<div class="quickref_label">/' + escapeHtml(r.example_re) + "/</div>", s += '<div class="quickref_regex hard_break">' + r.example + "</div>"), s += "</li>")
                }
                $("#second_menu ul").html(s)
            }
        }
    }), $("#quickref").on("click", "#second_menu li", function() {
        if (!$(this).hasClass("disabled") && $(this).hasClass("menu_item")) {
            var e = $(this).hasClass("active");
            $("#quickref .submenu").hide(), $("#second_menu li").removeClass("active"), e ? $(this).removeClass("active") : ($(this).next(".submenu").show(), $(this).addClass("active"))
        }
    }), $("#quickref_filter").on("input updateQuickrefFilter", _.debounce(function() {
        var e = $(this).val().toLowerCase();
        if ("" === e) $("#first_menu li").show(), $("#second_menu .menu_item").show(), $("#quickref_search").hide(), $("#first_menu .menu_item.active").click();
        else {
            $("#first_menu li").not("#first_menu li:first-child").hide(), $("#quickref_search").show(), $("#quickref_search").addClass("active");
            var t = [];
            for (var a in quickref) t = t.concat(quickref[a]);
            for (var i = '<li class="menu_notice">Full search result</li>', s = !1, n = 0; n < t.length; n++) {
                var r = t[n]; - 1 === r.flavors.indexOf(getFlavor()) || -1 === r.token.toLowerCase().indexOf(e) && -1 === r.desc.toLowerCase().indexOf(e) || (s = !0, i += '<li class="menu_item box_overflow_fix" data-id="' + n + '">', i += "<div>", i += escapeHtml(r.token), i += "</div>", i += '<div class="text_overflow">' + r.desc + "</div>", i += "</li>", i += '<li class="submenu">', i += escapeHtml(r.info), r.example && (i += '<div class="quickref_label">/' + escapeHtml(r.example_re) + "/</div>", i += '<div class="quickref_regex hard_break">' + r.example + "</div>"), i += "</li>")
            }
            s || (i += '<li class="menu_item disabled">No result.</li>'), $("#second_menu ul").html(i)
        }
    }, 100)), $("#scroll_treeview").on("mouseenter mouseleave", ".treeview_error", function(e) {
        var t = $(".treeview_pattern").find("b.err").eq($(this).index() - 1),
            a = $("#regex_colors span").find("b.err").eq($(this).index() - 1);
        "mouseenter" === e.type ? (t.addClass("selected_paren"), a.addClass("selected_paren")) : (t.removeClass("selected_paren"), a.removeClass("selected_paren"))
    });
    var ie = null;
    $("#content").on("click", "#community_titles li", function() {
        $(this).hasClass("menu_notice") || ($("#community_default").hide(), $("#community_data > div:not(#community_default)").hide(), $($(this).attr("data-id")).show(), $("#community_titles li").removeClass("active"), $(this).addClass("active"))
    }), $("#content").on("click", ".vote_up, .vote_down", function() {
        function e() {
            "up" == i ? r.removeClass("voted_up").addClass("vote_up") : n.removeClass("voted_down").addClass("vote_down")
        }
        var t = $(this).attr("class"),
            a = $(this).attr("data-id"),
            i = "",
            s = $(this).parent().find("i"),
            n = s[0],
            r = s[1],
            o = $(this).parent().find("span")[0],
            l = parseInt($(o).text()); - 1 !== t.indexOf("voted") ? $(this).is(r) ? (i = "up", $(this).removeClass("voted_up"), l--) : (i = "down", $(this).removeClass("voted_down"), l++) : $(this).is(r) ? (l++, i = "up", $(this).addClass("voted_up"), $(n).hasClass("voted_down") && (l++, $(n).removeClass("voted_down"))) : (l--, i = "down", $(this).addClass("voted_down"), $(r).hasClass("voted_up") && (l--, $(r).removeClass("voted_up")));
        var c = "";
        c = l > 0 ? "+" + l : 0 > l ? "-" + l : l, $(o).text(c);
        var d = {
            id: a,
            type: i
        };
        vote = $.ajax({
            type: "POST",
            url: "/vote_regex.php",
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            timeout: 3e3,
            data: d,
            success: function(t) {
                var a = $.parseJSON(t);
                1 == a.error && e()
            },
            error: function() {
                e()
            }
        })
    });
    var se;
    $("#content").on("input", "#regex_filter", function() {
        se && clearTimeout(se), se = setTimeout(function() {
            x()
        }, 200)
    });
    var ne = null;
    $("#dimmer-popup").on("click", "label[for=add_to_favorites]", function() {
        var e = $("input[name=add_to_favorites]");
        e.click(), e.is(":checked") ? ($("#permalink_data").slideUp(500), $("#permalink_favorites").slideDown(500, E), re = R, $("#permalink_close").text("save and close")) : ($("#permalink_favorites").slideUp(500), $("#permalink_data").slideDown(500, E), $("#perma_go_down").hide(), $("#permalink_close").text("close"), re = void 0)
    }), $("#dimmer-popup").on("click", "#perma_go_down", function() {
        $("#permalink_data").slideUp(500), $("#permalink_favorites").slideDown(500, E)
    }), $("#dimmer-popup").on("click", "#perma_go_up", function() {
        $("#permalink_favorites").slideUp(500), $("#permalink_data").slideDown(500, E), $("#perma_go_down").show()
    }), $("#content").on("click", ".fa-star.fav, .fa-star-o.nofav", function() {
        var e = $(this).parents(".account_entry"),
            t = e.attr("data-permaid"),
            a = e.attr("data-version");
        $(this).hasClass("fav") ? (k(t, a, 0), $(this).removeClass("fav fa-star").addClass("nofav fa-star-o").attr("title", "Add to favorites"), e.removeClass("account-favorite").addClass("account-contrib")) : (k(t, a, 1), $(this).removeClass("nofav fa-star-o").addClass("fav fa-star").attr("title", "Remove from favorites"), e.addClass("account-favorite").removeClass("account-contrib")), O()
    }), $("#content").on("click", ".fa-times", function() {
        var e = $(this).parents(".account_entry"),
            t = e.attr("data-permaid"),
            a = e.attr("data-version");
        $(this).hasClass("del_history") ? y(t) : C(t, a), $(".tipsy").remove(), e.slideUp(300, function() {
            e.remove(), O()
        })
    }), $("#content").on("click", ".private_permalink", function(e) {
        e.preventDefault(), e.stopPropagation();
        var t = $(this).parents(".account_entry").attr("data-permaid");
        $(this).hasClass("fa-lock") ? ($(this).removeClass("fa-lock").addClass("fa-unlock"), S(t, 0)) : ($(this).removeClass("fa-unlock").addClass("fa-lock"), S(t, 1));
        var a = $(this).attr("original-title");
        $(this).attr("title", $(this).attr("data-title-bk")), $(this).attr("data-title-bk", a), $(".tipsy").remove()
    }), $("#content").on("click", ".fa-trash", function() {
        var e = $(this).parents(".account_entry"),
            t = e.attr("data-permaid"),
            a = e.attr("data-version");
        T(t, a), $(".tipsy").remove(), $(".account_entry[data-permaid=" + t + "]").slideUp(300, function() {
            $(this).remove(), O()
        })
    }), $("#content").on("click", "#account_filters .account_tag", function() {
        var e = $(this);
        e.hasClass("active") ? e.removeClass("active") : e.addClass("active"), O()
    }), $("#content").on("click", "#account_submissions .account-edit-entry", function(e) {
        e.preventDefault(), e.stopPropagation();
        var t = $(this).parents(".account_entry"),
            a = t.attr("data-permaid"),
            i = t.attr("data-version"),
            s = t.find(".account_title").text(),
            n = t.find(".account_tags").text().replace(/\s{2,}/g, " ").replace(/^\s+|\s+$/g, ""),
            r = '<div id="dimmer-contents" style="width: 350px;">';
        r += '<label for="favorite_title">Title</label>', r += '<input id="favorite_title" class="box_overflow_fix" placeholder="optional title" maxlength="100">', r += '<label for="favorite_tags" style="margin-top: 5px;">Add tags</label>', r += '<input id="favorite_tags" class="box_overflow_fix" placeholder="optional tags (space separated)" maxlength="100">', r += "</div>", r += '<div id="button-area" class="button-area">', r += '<div id="permalink_close" class="button">save</div>', r += '<div id="permalink_close_v2" class="button">close</div>', r += "</div>";
        var o = t.find(".account_entry_menu .fav");
        re = function() {
            k(a, i, o.length > 0 ? 1 : 0, $("#favorite_title").val(), $("#favorite_tags").val(), function() {
                w()
            })
        }, q(r), D(), $("#favorite_title").val(s), $("#favorite_tags").val(n).trigger("input")
    }), $("#content").on("click", "#account .expander a", function(e) {
        e.stopPropagation()
    }), $("#content").on("click", "#account .expander", function() {
        var e = $(this).find(".expand_button"),
            t = "fa-plus-circle",
            a = "fa-minus-circle",
            i = e.parents(".account_entry");
        e.hasClass(t) ? (e.removeClass(t).addClass(a), i.find(".account_regex, .account_tags, .flavor_date, .account_entry_menu i:not(.fav):not(.nofav)").show()) : (e.removeClass(a).addClass(t), i.find(".account_regex, .account_tags, .flavor_date, .account_entry_menu i:not(.fav):not(.nofav)").hide())
    }), $("#dimmer").click(function() {
        re = void 0, H()
    });
    var re;
    $("#dimmer-popup").on("click", "#permalink_close", function() {
        H()
    }), $("#dimmer-popup").on("click", "#permalink_close_v2", function() {
        re = void 0, H()
    }), $("#dimmer-popup").on("input", "#community_title", function() {
        "" != $(this).val() ? $("#community_send").removeClass("disabled") : $("#community_send").addClass("disabled")
    }), $("#dimmer-popup").on("click", "#community_send", function() {
        if (!$(this).hasClass("disabled")) {
            $("#community_send").text("submitting.."), submitCommunity && "pending" == submitCommunity.state() && submitCommunity.abort();
            var e = {
                regexText: $("#regex_string").val(),
                title: $("#community_title").val(),
                desc: $("#community_desc").val(),
                regex: $("#regex").val(),
                options: getOptions(),
                name: $("#community_author").val(),
                isSub: sub_enabled(),
                sub: $("#sub").val(),
                flavor: getFlavor(),
                delimiter: $("#delimiter_selector").text(),
                unitTests: V(!1)
            };
            submitCommunity = $.ajax({
                type: "POST",
                url: "/submit_regex.php",
                contentType: "application/json;charset=UTF-8",
                timeout: 1e4,
                data: JSON.stringify(e),
                success: function(e) {
                    e.length > 0 ? $("#community_send").text("error") : ($("#community_send").addClass("disabled").text("done!"), communityTimeout && clearTimeout(communityTimeout), communityTimeout = setTimeout(H, 2500))
                },
                error: function(e, t) {
                    "abort" != t && $("#community_send").text("error")
                }
            })
        }
    });
    var oe = window.location.hash; - 1 !== oe.indexOf("#javascript") ? $(".regex_menu .flavor_js").click() : -1 !== oe.indexOf("#python") ? $(".regex_menu .flavor_python").click() : -1 !== oe.indexOf("#pcre") && $(".regex_menu .flavor_pcre").click(), sub_enabled() && ($("#subst_menu").removeClass("active"), $("#subst_menu").click()), $("#first_menu .menu_item").first().click(), $("#header_nav .main_menu").tipsy({
        gravity: "n",
        title: function() {
            var e = $(this).find("span.large_menu");
            return e.text()
        },
        trigger: "manual"
    }), $("#inline_menu .menu_item").tipsy({
        gravity: "w",
        title: function() {
            var e = $(this).find("span.large_menu");
            return e.text()
        },
        trigger: "manual"
    }), $("#header_menu a").tipsy({
        gravity: "e",
        title: function() {
            var e = $(this).find("span.large_menu");
            return e.text()
        },
        trigger: "manual"
    }), $("#inline_menu .menu_item, #header_menu a, #header_nav .main_menu").mouseenter(function() {
        var e = $(this).find("span.large_menu");
        (!e.is(":visible") || $(this)[0].scrollWidth > $(this).innerWidth()) && $(this).tipsy("show")
    }), $("#inline_menu .menu_item, #header_menu a, #header_nav .main_menu").mouseleave(function() {
        $(this).tipsy("hide")
    }), $(".account_entry_menu i, .private_permalink").tipsy({
        gravity: "w",
        live: !0
    }), $("#settings_popup > span").tipsy({
        gravity: "e",
        live: !0
    }), $("#match_info .export_matches").tipsy({
        gravity: "e",
        live: !0
    });
    var le = !1;
    $(document).on("mousedown", function() {
        le = !0
    }), $(document).on("mouseup", function() {
        le = !1
    }), setTimeout(function() {
        M("#richtext_test", "#regex_string, #regex", "#richtext_test_colors", "[data-tooltip]", function(e) {
            var t = $(e),
                a = t.attr("data-tooltip").split(";"),
                i = '<div class="tooltip-match">Match <span>#' + (Math.floor(a[0]) + 1) + "</span></div>",
                s = a[4],
                n = a[3],
                r = "#" + n;
            return void 0 !== s && isNaN(s) && (r += " " + s), highlightInteraction() && $("#regex_colors").find("[data-groupNum=" + n + "]").addClass("selected_paren"), i += '<div class="hard_break text_overflow"><span>group <span>' + r + "</span>:</span> <span>" + white_space_nohtml(escapeHtml(t.text())) + "</span></div>", i += "<div><span>pos:</span> <span>" + a[1] + "-" + a[2] + "</span></div>"
        }, "#test_result_container .overflow_handler", function() {
            highlightInteraction() && $("#regex_colors b").removeClass("selected_paren")
        });
        var e = function(e) {
            var t = $(e).attr("data-tooltip").split(";"),
                a = "";
            if ("true" === t[1]) {
                var i = Math.floor(t[2]);
                a = Regex101Explainer.explainError(i)
            } else {
                var s = t[3];
                "undefined" === s && (s = ""), a = Regex101Explainer.quickExplain(e, Math.floor(t[0]), s)
            }
            var n = "<div>" + a + "</div>";
            return n
        };
        M("#richtext_regex_container", "#regex", "#regex_colors", "[data-tooltip]", e, "#richtext_regex_container");
        var t = function(e) {
            return e.getAttribute("data-tooltip")
        };
        M("#basic_richtext_sub", "#sub", "#basic_richtext_sub pre", "b", t, "#basic_richtext_sub"), M("", "", "", "#community .community_regex_container [data-tooltip]", e, "#community"), M("", "", "", "#community .community_sub_box [data-tooltip]", t, "#community"), M("", "", "", "#account [data-tooltip]", e, "#account"), M("", "", "", "#scroll_treeview [data-tooltip]", e, "#scroll_treeview")
    }, 0);
    var ce = {
        group: ["starts with", "ends with", "contains", "equals"],
        regex: ["matches", "does not match"]
    };
    $("#unit_test_creator").on("change", "#unit_type", function() {
        var e = $(this).val();
        switch (e) {
            case "group":
                $("#assert_equals").show();
                break;
            case "regex":
                $("#assert_equals").hide()
        }
        $("#assert_type").html(A(ce[e]))
    }), $("#unit_tests_builder a.button").on("click", function() {
        function e(e, a, i) {
            return i || (i = ""), '<span class="' + e + '" data-src="' + escapeHtml(a) + '"' + i + ">" + t(escapeHtml(a)) + "</span>"
        }

        function t(e) {
            return "" == e ? "<em>nothing</em>" : e
        }
        if (!$(this).hasClass("disabled")) {
            var a = $("#unit_type").val(),
                i = $("#unit_type").find(":selected"),
                s = $("#assert_type").find(":selected"),
                n = '<div class="unit_test">';
            return n += '<div class="table_cell small icon space"><i class="fa fa-trash" title="Delete test"></i></div>', n += '<div class="table_cell space wrong_value_parent">', n += "<table><tbody><tr>", n += '<td>given the string</td><td class="data">' + e("data hard_break", $("#unit_data").val()) + "</td><td>assert that</td>", n += "<td>" + e("type", i.text(), 'data-grpNum="' + i.attr("data-grpNum") + '"') + "</td>", n += "<td>" + e("assert", s.text()) + "</td>", "group" === a && (n += '<td class="data">' + e("data hard_break", $("#assert_equals").val()) + "</td>"), n += "</tr></tbody></table>", n += "</div>", n += '<div class="table_cell small space align-right">', n += e("right result_box", "n/a"), n += "</div>", n += "</div>", $("#unit_test_container").append(n), F(), z(), N(), !1
        }
    }), $(".all_tests i, .run_tests").tipsy({
        live: !0,
        gravity: $.fn.tipsy.autoSE
    }), $(".all_tests").on("click", "i.fa-trash", function() {
        $(".tipsy").remove(), $(this).parents(".unit_test").remove(), N(), F()
    }), $(".run_tests").on("click", function(e) {
        function t() {
            if (!n.length) return a(), void s();
            var e = n.pop(),
                i = e.element,
                c = -1;
            if ($(".unit_progress").width($(".unit_test_player").width() / r * (r - n.length)), Regex101Colorizer.hasError()) return i.find(".result_box").text("pattern error").addClass("fail"), void t();
            var d = e.type,
                u = e.assertion,
                p = e.testStr,
                m = e.compareStr;
            if ("regex" !== d && (c = e.grpNum, c > l.group_count)) return i.find(".result_box").text("capture group non-existent").addClass("fail"), void t();
            var v = {
                regex: $("#regex").val(),
                options: getOptions().replace("g", ""),
                regexText: p,
                isSub: !1,
                sub: "",
                delimiter: $("#delimiter_selector").text()
            };
            getFlavor() === FLAVOR.PYTHON && (v.regex = sanitizePython(v.regex)), runUnitTests(v, function(e, a) {
                if (a.running = !1, e.catastrophic) i.find(".result_box").text("catastrophic").addClass("fail");
                else {
                    var s = !1;
                    if (-1 === c) "matches" == u ? e.result.length > 0 && (o++, s = !0) : 0 === e.result.length && (o++, s = !0);
                    else if (e.result.length > 0) {
                        var n;
                        n = e.result[0].length > c ? e.result[0][c].content : "";
                        var r;
                        switch (u.toLowerCase()) {
                            case "starts with":
                                r = n.substring(0, m.length), r === m && (s = !0, o++);
                                break;
                            case "ends with":
                                r = n.slice(-1 * m.length), r === m && (s = !0, o++);
                                break;
                            case "contains":
                                n.indexOf(m) > -1 && (s = !0, o++);
                                break;
                            case "equals":
                                r = n, r === m && (s = !0, o++)
                        }
                    }
                    if (s) i.find(".result_box").removeClass("fail pass").addClass("pass").text("pass");
                    else if (i.find(".result_box").removeClass("fail pass").addClass("fail").text("fail"), void 0 !== r) {
                        m = m ? escapeHtml(m) : "<em>nothing</em>", r = r ? escapeHtml(r) : "<em>nothing</em>";
                        var l = '<div class="wrong_value"><strong>error:</strong> expected <span class="data">' + m + '</span> but got <span class="data">' + r + "</span> instead.</div>";
                        i.find(".wrong_value_parent").append(l)
                    }
                }
                cancelUnitTest(), t()
            }, function() {
                i.find(".result_box").text("timeout").addClass("fail"), t()
            }), a()
        }

        function a() {
            $(".unit_result").text(o + "/" + r), o === r ? $(".unit_result").removeClass("fail").addClass("pass") : $(".unit_result").removeClass("pass").addClass("fail")
        }

        function i() {
            $(".run_tests").removeClass("fa-play").addClass("fa-pause"), $(".run_tests").attr("original-title", "Stop tests"), $(".test_builder a.button").addClass("disabled"), $(".unit_test span.right").removeClass("fail pass").text("n/a"), $(".wrong_value").remove(), $(".unit_progress").show()
        }

        function s() {
            $(".run_tests").removeClass("fa-pause").addClass("fa-play"), $(".run_tests").attr("original-title", "Run tests (CTRL+K)"), $(".test_builder a.button").removeClass("disabled"), cancelUnitTest(), $(".unit_progress").hide()
        }
        if (!$(this).parents("li").hasClass("disabled"))
            if (e.stopPropagation(), $(".tipsy").remove(), $(this).hasClass("fa-play")) {
                i();
                var n = V(!0),
                    r = n.length,
                    o = 0,
                    l = Regex101Colorizer.getCaptureData();
                t()
            } else s()
    }), F(), $(".filter_mini i").click(function() {
        var e = $(this).parent();
        e.find("div.filter_div").show(), e.css("float", "none"), e.find("input").focus(), $(".filter_mini").parent().find("span").hide()
    }), $(".filter_mini input").on("focusout blur", function() {
        "" === $(this).val() && g()
    }), $("#regex_debugger").on("click", ".debugger_paginator", function() {
        var e = $(this).parent().parent().parent();
        e.find(".debugger_match_child:last-child").remove();
        var t = e.find(".debugger_match_child:last-child"),
            a = parseInt(t.attr("data-matchid")),
            i = parseInt(t.attr("data-step"));
        return I(e, i + 1, a), !1
    }), updateDebugger = function() {
        for (var e = "", t = 0, a = 0, i = debugData.length; i > a; a++) {
            var s = debugData[a].length;
            e += '<div class="debugger_match" match_id="' + a + '">';
            var n = debugData[a][s - 1].status < 0 ? "nomatch" : "match";
            e += '<div class="debugger_title label expander ' + n + '" match_id="' + a + '">', e += '<span class="fa fa-plus-circle"></span>', e += "Match " + (a + 1) + " - finished in " + (s - 1) + " steps", e += "</div>", e += '<div class="debugger_data" id="debugger_match_' + a + '">', e += "</div>", e += "</div>", t += s - 1
        }
        t = Math.round(t / debugData.length), 0 === debugData.length && (e = '<div class="debugger_notice">Your match failed outright. What this means is the engine, due to its internal optimizations, understood that your pattern would never match at any position, and thus did not even attempt to. If you want to see what would have happened if it tried, disable them with the checkbox above.</div>'), $("#debugger_hide_temp").show(), $("#regex_debugger_window").html(e), J(), $("#hide_match_failures").is(":checked") && $(".debugger_title.match2").hide(), $("#debugger_label").html('Status: Done! <span class="right">Average steps taken: <strong>' + (t || "N/A") + "</strong></span>")
    }, $("#debugger_collapse").click(function() {
        return $(".debugger_data").html("").hide(), $("#regex_debugger_window .debugger_title span.fa").removeClass("fa-minus-circle").addClass("fa-plus-circle"), !1
    }), $("#show_regex_pos").click(function() {
        J()
    }), $("#regex_debugger").on("click", ".debugger_title", function() {
        var e = $(this).attr("match_id"),
            t = $("#debugger_match_" + e),
            a = $(this).find("span.fa");
        a.hasClass("fa-plus-circle") ? (a.removeClass("fa-plus-circle").addClass("fa-minus-circle"), I(t, 0, e)) : (a.removeClass("fa-minus-circle").addClass("fa-plus-circle"), t.html("").hide())
    }), $("#internal_opt").click(function() {
        $("#options").val($(this).is(":checked") ? getOptions() + "Y" : getOptions()), U()
    }), $("#regex_container").on("change", "#version_selector", function() {
        var e = window.location.protocol + "//" + window.location.host + "/r/" + $(this).val();
        window.location.href = e
    }), $("#version_selector").on("click", function(e) {
        e.preventDefault(), e.stopPropagation()
    }), v(), !$.browser.webkit && !$.browser.msie && parseInt($.browser.version) < 29 && $("#test_result_container, #regex_container").addClass("firefox_sucks");
    for (var de = [{
            name: "colorize_regex",
            trigger: function() {
                he && $("#colorize_regex").click()
            },
            notExistsValue: !0
        }, {
            name: "small_menu",
            trigger: function() {
                he && $("#small_menu").click()
            },
            notExistsValue: !1
        }, {
            name: "display_whitespace",
            trigger: function() {
                he && $("#display_whitespace").click()
            },
            notExistsValue: !1
        }, {
            name: "wrap_newlines",
            trigger: function() {
                he && $("#wrap_newlines").prop("checked", !0), l()
            },
            notExistsValue: !0
        }, {
            name: "dark_theme",
            trigger: function() {
                he && $("#dark_theme").click()
            },
            notExistsValue: !1
        }, {
            name: "explainer",
            trigger: function() {
                he ? $("#explainer_label span").addClass("fa-minus-circle") : ($("#scroll_treeview").addClass("flex-minimized"), $("#explainer_label").addClass("collapsed"), $("#explainer_label span").addClass(he ? "fa-minus-circle" : "fa-plus-circle"));

            },
            notExistsValue: !0
        }, {
            name: "match_info",
            trigger: function() {
                he ? $("#match_label span").addClass("fa-minus-circle") : ($("#scroll_match").addClass("flex-minimized"), $("#match_label").addClass("collapsed"), $("#match_label span").addClass("fa-plus-circle"))
            },
            notExistsValue: !0
        }, {
            name: "quickref",
            trigger: function() {
                he ? $("#quickref > .label span").addClass("fa-minus-circle") : ($("#quickref").addClass("flex-minimized"), $("#quickref > .label").addClass("collapsed"), $("#quickref > .label span").addClass(he ? "fa-minus-circle" : "fa-plus-circle"))
            },
            notExistsValue: !0
        }, {
            name: "show_sidebar",
            trigger: function() {
                Math.floor(ve) == ve && 90 > ve && ($("#regex_editor").width() * (ve / 100) < G ? $("#regex_treeview, #main_editor").addClass("treeview_hidden") : ($("#regex_treeview").css("width", ve + "%"), $("#main_editor").css("width", 100 - ve + "%")))
            },
            notExistsValue: !0
        }, {
            name: "regex_theme",
            trigger: function() {
                if (ve) {
                    resetTheme(!0);
                    var e = ve.split(",");
                    getTheme() === e[0] ? ($("body").addClass(e[1]), $("#settings_popup_contents ." + getTheme() + "_themes option[value=" + e[1] + "]").prop("selected", !0)) : $("body").addClass("default")
                }
            },
            notExistsValue: !1
        }, {
            name: "smart_complete",
            trigger: function() {
                he && $("#smart_completion").click()
            },
            notExistsValue: !0
        }, {
            name: "max_exec",
            trigger: function() {
                maxWorkerTimeout = parseInt(ve || he), /^\d+$/.test(maxWorkerTimeout) || (maxWorkerTimeout = 2e3), $("#settings_popup_contents .execution_limit input").val(maxWorkerTimeout)
            },
            notExistsValue: 2e3
        }, {
            name: "highlight_interaction",
            trigger: function() {
                he && $("#highlight_interaction").click()
            },
            notExistsValue: !1
        }, {
            name: "display_nonpart",
            trigger: function() {
                he && $("#display_nonpart").click()
            },
            notExistsValue: !1
        }], ue = 0, pe = de.length; pe > ue; ue++) {
        var me = de[ue],
            ve = readCookie(me.name),
            he = null === ve ? me.notExistsValue : "true" === ve;
        null === ve && setCookieData(me.name, me.notExistsValue), me.trigger()
    }
    window.addEventListener("offline", function() {
        H();
        var e = '<div id="dimmer-contents">';
        e += '<div class="label">You have gone offline!</div>', e += '<div id="offline_message">You seem to have lost your internet connection. It might be a good idea to wait until it comes back before proceeding. ', e += "This popup will automatically close once you have regained internet access, but you are of course free to close it at any time.", e += "</div>", e += "</div>", e += '<div id="button-area" class="button-area">', e += '<div id="permalink_close" class="button">close</div>', e += "</div>", q(e)
    }), window.addEventListener("online", function() {
        $("#offline_message").is(":visible") && H()
    }), invalid_browser || !window.Worker ? $("#old_browser").show() : $("#header_nav").show(), $("#splash").fadeOut(600, function() {
        $(this).hide()
    }), window.addEventListener("beforeunload", function(e) {
        var t = {
                regex: $("#regex").val(),
                options: getOptions(),
                regexText: $("#regex_string").val(),
                isSub: sub_enabled(),
                sub: $("#sub").val(),
                delimiter: $("#delimiter_selector").text(),
                flavor: getFlavor(),
                permaid: $("#permalink_menu").attr("data-permalink"),
                unitTests: V(!1)
            },
            a = JSON.stringify(t);
        if (a !== X) {
            var i = "Your most recent changes have not been saved. ";
            return i += "If you leave before saving, your changes will be lost.", (e || window.event).returnValue = i, i
        }
    })
});