var Regex101Explainer = function() {
    "use strict";

    function e(t) {
        for (var r = 0; r < t.length; r++) {
            var a = t[r];
            if (a.type === regex_type.CHARCLASS)
                for (var n = 1; n < a.children.length - 1; n++) {
                    var i = a.children[n - 1],
                        s = a.children[n],
                        c = a.children[n + 1],
                        o = 1;
                    if (s.type === regex_type.RANGE_HYPHEN) {
                        var h = i.contents,
                            p = c.contents;
                        if ("\\Q" === p) {
                            p = "";
                            var l = a.children[n + 2];
                            void 0 !== l && "\\E" !== l.contents && (p = l.contents.charAt(0), o = -1)
                        }
                        i.type === regex_type.TEXT ? (h = i.contents.slice(-1), i.contents = i.contents.slice(0, -1), "" === i.contents && (a.children.splice(n - 1, 1), n--)) : (a.children.splice(n - 1, 1), n--), -1 !== o && (c.type === regex_type.TEXT ? (p = c.contents.charAt(0), c.contents = c.contents.slice(1), "" === c.contents && a.children.splice(n + o, 1)) : a.children.splice(n + o, 1)), s.contents = h + s.contents + p, s.range_from = h, s.range_to = p
                    }
                }
            isGroupType(a.type) && a.children.length > 0 && e(a.children)
        }
    }

    function t(e) {
        for (var r, a = 0; a < e.length; a++) {
            var n = e[a];
            n.type !== regex_type.TEXT || n.quantifier || /^(?:\r\n|\r|\n)$/.test(n.contents) ? r = void 0 : void 0 === r ? r = n : (r.contents += n.contents, e.splice(a, 1), a--), n.children && t(n.children)
        }
    }

    function r(e, t) {
        for (var a = !1, n = 0; n < e.length; n++) {
            var i = e[n],
                s = {
                    children: [],
                    group_contents: "",
                    contents: "|",
                    type: regex_type.ALTERNATOR,
                    quantifiable: !1,
                    error: !1,
                    modifiers: t.modifiers,
                    lookbehind: t.lookbehind
                };
            t.type === regex_type.CONDITIONAL ? (s.branch = !0, e.shift(), e.unshift(s)) : i.type !== regex_type.ALTERNATOR || a || (e.unshift(s), a = !0), isGroupType(i.type) && r(i.children, i)
        }
    }

    function a(e, t) {
        for (var r, n = 0; n < e.length; n++) {
            var i = e[n];
            (i.type !== regex_type.TEXT || -1 === i.modifiers.indexOf("x") || "" !== i.contents) && (i.type === regex_type.ALTERNATOR ? r = i : void 0 !== r && i.type !== regex_type.QUANTIFIER && i.type !== regex_type.GROUP_QUANTIFIER && i.type !== regex_type.COMMENT && (r.children.push(i), r.group_contents += i.group_contents || i.contents, !i.group_contents && i.quantifier && (r.group_contents += i.quantifier), e.splice(n, 1), n--), void 0 !== i.children && a(i.children, t))
        }
    }

    function n(e, t) {
        for (var r = "", a = 1, i = 0; i < e.length; i++) {
            var o = e[i],
                f = h(o, t);
            if (isGroupType(o.type)) {
                switch (r += D(d(o)), r += "<ul>", f && (r += M(C("Quantifier:") + " " + T(o.quantifier) + " " + f, !1), "{0}" !== o.quantifier && "{1}" !== o.quantifier && "{0,0}" !== o.quantifier && "{1,1}" !== o.quantifier && (o.type === regex_type.NAMED_GROUP || o.type === regex_type.NAMED_P_GROUP || "(" === o.contents) && (r += M(F(P("Note:") + " A repeated capturing group will only capture the last iteration. Put a capturing group around the repeated group to capture all iterations or use a non-capturing group instead if you're not interested in the data"), !1))), o.type) {
                    case regex_type.SUBPATTERN_GROUP:
                        o.currentCapturingGroupCount = V, r += M(F(P("Note:") + " Subpatterns declared within each alternative of this construct will start over from the same index"), !1);
                        break;
                    case regex_type.GROUP_MODIFIER:
                        /^\(\?-+:/.test(o.contents) ? r += M(F(P("Note:") + " This group has no modifiers declared, rendering the structure useless. I suggest you remove the unnecessary declaration."), !1) : (r += D("Match the remainder of the group with the following options:"), r += "<ul>", r += g(o.contents.slice(2, -1)), r += "</ul>");
                        break;
                    case regex_type.CONDITIONAL:
                        r += D("Evaluate the condition below and proceed accordingly"), r += "<ul>", r += M(s(o.condition, o), !1), r += "</ul>"
                }
                r += o.children.length > 0 ? n(o.children, o) : M("(null, matches any position)"), r += "</ul>"
            } else if (o.type === regex_type.CHARCLASS) r += D(c(o)), r += "<ul>", f && (r += M(C("Quantifier:") + " " + T(o.quantifier) + " " + f, !1)), W == FLAVOR.JS && "[^]" === o.group_contents ? r += F(P("Note:") + " Avoid this construct, use " + b(".") + " or " + N("[\\s\\S]") + " instead.") : o.children && (r += n(o.children, o)), r += "</ul>";
            else if (o.type === regex_type.ALTERNATOR) {
                t.type === regex_type.SUBPATTERN_GROUP && (V = t.currentCapturingGroupCount);
                var m = o.group_contents;
                if (0 === m.length && (m = "(null, matches any position)"), r += D(t.type === regex_type.CONDITIONAL ? L(o.branch ? "TRUE" : "FALSE", o.branch ? 1 : 2) + ": " + k(escapeHtml(m)) : S(ord(a++)) + " Alternative: " + k(white_space(escapeHtml(m)))), r += "<ul>", o.children.length > 0) r += n(o.children, o);
                else {
                    var y = " An empty alternative effectively truncates the regex at this point because it will always find a zero-width match";
                    isGroupType(t.type) && (y = " An empty alternative effectively makes this group optional which suggests the alternative is completely redundant"), r += M(F(P("Warning:") + y), !1)
                }
                r += "</ul>"
            } else if (o.type === regex_type.QUOTE) "\\Q" === o.contents ? (r += D("Begin " + b("\\Q...\\E") + " sequence"), r += "<ul>") : r += "</ul>";
            else if (o.type === regex_type.RANGE_HYPHEN) {
                var _ = o.range_from,
                    E = o.range_to,
                    v = -1 !== t.modifiers.indexOf("i"),
                    w = "";
                1 === _.length && 1 === E.length ? (w = b(o.contents) + " a single character in the range between " + A(_) + " and " + A(E), w += l(_ + E, v), r += M(w)) : (r += D(b(o.contents) + " a single character in the range between the following two characters"), r += "<ul>", r += M(b(_) + p(_, v)), r += M(b(E) + p(E, v)), r += "</ul>")
            } else if (o.type !== regex_type.QUANTIFIER && o.type !== regex_type.GROUP_QUANTIFIER) {
                if (void 0 !== o.modifiers && -1 !== o.modifiers.indexOf("x") && "" === o.contents.replace(/\s+/g, "")) continue;
                f ? (r += D(u(o, t)), r += "<ul>", r += M(C("Quantifier:") + " " + T(o.quantifier) + " " + f), r += "</ul>") : r += M(u(o, t), !1)
            }
        }
        return r
    }

    function i(e) {
        return e.toUpperCase() !== e.toLowerCase()
    }

    function s(e, t) {
        if (regex_type.LOOKBEHIND === e.type || regex_type.LOOKAHEAD === e.type) return n([e], t);
        var r = e.reference,
            a = escapeHtml(e.group_contents);
        return -1 !== a.indexOf("R") ? parseInt(r) == r ? b(a) + " check if the " + L(ord(r), r) + " subroutine matches" : "(R)" === a ? b(a) + " check if overall pattern recursion is successful" : b(a) + " check if the subroutine " + L(r, 1) + " matches" : parseInt(r) == r ? b(a) + " check if the " + L(ord(r), r) + " capturing group matched when it was last attempted" : b(a) + " check if the named group " + L(r, 1) + " matched when it was last attempted"
    }

    function c(e) {
        var t = N(escapeHtml(e.group_contents));
        return W == FLAVOR.JS && "[^]" === e.group_contents ? t += " match any character" : (t += " match a single character ", t += "^" === e.contents.charAt(1) ? "not present" : "present", t += " in the list below"), t
    }

    function o(e) {
        var t = e.replace("^", "");
        return t !== e ? "matches the negation of " + P(t) : "[:ascii:]" === t ? "matches characters with " + C("ASCII") + " value " + P("0") + " through " + P("127") : "[:alnum:]" === t ? "matches alphanumeric characters" : "[:word:]" === t ? "matches alphanumeric characters plus " + P("_") : "[:alpha:]" === t ? "matches alphabetic characters" : "[:blank:]" === t ? "matches space and tab" : "[:cntrl:]" === t ? "matches control characters" : "[:digit:]" === t ? "matches digits" : "[:graph:]" === t ? "matches visible characters" : "[:lower:]" === t ? "matches lowercase letters" : "[:print:]" === t ? "matches visible characters and the space character" : "[:punct:]" === t ? "matches punctuation characters" : "[:space:]" === t ? "matches white space characters" : "[:upper:]" === t ? "matches uppercase letters" : "[:xdigit:]" === t ? "matches hexadecimal digits" : "[:space:]" === t ? "matches whitespace characters" : void 0
    }

    function h(e, t) {
        var r = "",
            a = e.quantifier;
        if (a) {
            r = "Between ";
            var n = a.charAt(0),
                i = a.charAt(1),
                s = -1 !== t.modifiers.indexOf("U");
            "{" === n && (i = a.slice(-1));
            var c = s ? "few" : "many";
            switch ("?" === i && (c = s ? "many" : "few"), n) {
                case "*":
                    r += O("zero") + " and " + O("unlimited") + " times, as " + c + " times as possible";
                    break;
                case "+":
                    r += O("one") + " and " + O("unlimited") + " times, as " + c + " times as possible";
                    break;
                case "?":
                    r += O("zero") + " and " + O("one") + " time, as " + c + " times as possible";
                    break;
                case "{":
                    var o = e.from,
                        h = e.to;
                    if (o === h) {
                        var p = "Exactly " + O(o) + " time" + (o > 1 || 0 == o ? "s" : "");
                        return 0 == o ? p += " (causing the token to be ignored)" : 1 == o && (p += " (meaningless quantifier)"), p
                    }
                    h || (h = "unlimited"), r += O(o) + " and " + O(h) + " times, as " + c + " times as possible"
            }
            r += "+" === i ? ", without giving back " + P("[possessive]") : "?" === i ? s ? ", giving back as needed " + P("[greedy]") : ", expanding as needed " + P("[lazy]") : s ? ", expanding as needed " + P("[lazy]") : ", giving back as needed " + P("[greedy]")
        }
        return r
    }

    function p(e, t) {
        if (/^\\x/.test(e)) var r = e.substring(2).replace(/[{}]/g, ""),
            a = parseInt(r, 16),
            n = String.fromCodePoint(a),
            i = " the character " + A(escapeHtml(n)) + " with position " + C("0x" + r) + " (" + C(a) + " decimal or " + C(a.toString(8)) + " octal) in the character set";
        else if (/^\\\d/.test(e)) var r = e.substring(1),
            s = parseInt(r, 8),
            n = String.fromCodePoint(s),
            i = " the character " + A(escapeHtml(n)) + " with octal index " + C(r) + " (" + C(s) + " decimal or " + C(s.toString(16).toUpperCase()) + " hexadecimal) in the character set";
        else var n = e.replace(/^\\(?=.)/, ""),
            i = " the literal character " + A(escapeHtml(n));
        return i += l(n, t)
    }

    function l(e, t) {
        return i(e) ? t ? " (case insensitive)" : " (case sensitive)" : ""
    }

    function u(e, t) {
        var r = e.modifiers,
            a = -1 !== r.indexOf("s"),
            n = -1 !== r.indexOf("u"),
            i = -1 !== r.indexOf("m"),
            s = -1 !== r.indexOf("x"),
            c = -1 !== r.indexOf("i"),
            h = e.contents,
            p = h,
            d = t.type === regex_type.CHARCLASS,
            m = escapeHtml(p),
            y = white_space(escapeHtml(p + (e.quantifier ? e.quantifier : "")));
        switch (s && e.type !== regex_type.ESCAPED_TEXT && (m = m.replace(/\s/g, "")), e.type) {
            case regex_type.POSIX:
                return b(y) + " " + o(p) + " " + C("[POSIX]");
            case regex_type.HEX:
                var v = p.substring(2).replace(/[{}]/g, ""),
                    w = parseInt(v, 16);
                return b(y) + " matches the character " + A(white_space(escapeHtml(String.fromCodePoint(w)))) + " with position " + C("0x" + v) + " (" + C(w) + " decimal or " + C(w.toString(8)) + " octal) in the character set";
            case regex_type.META:
                if (/^\\u.{4}$/.test(p)) return b(y) + "matches the Unicode character " + A(white_space(escapeHtml(String.fromCodePoint(parseInt(p.slice(2), 16)))));
                if (/^\\[pP]/.test(p)) {
                    var R = e.contents.substring(2).replace(/[{}]/g, ""),
                        I = "P" === p.charAt(1);
                    return void 0 !== Y[R] ? I ? b(y) + " matches any characters that " + P("\\p" + escapeHtml(p.substring(2))) + " does not" : b(y) + " matches " + Y[R] : I ? b(y) + " matches any characters but those in the " + P(R) + " script" : b(y) + " matches characters in the " + P(R) + " script"
                }
                return /^\\c/.test(p) ? b(y) + " matches " + P("Ctrl+" + escapeHtml(p.substring(2))) + " " + C("(ASCII " + (64 ^ p.substring(2).toUpperCase().charCodeAt(0)) + ")") : "." === p ? b(y) + " matches any character" + (a ? "" : " (except newline)") + (n ? " " + C("[unicode]") : "") : "^" === p ? b(y) + " assert position at start of " + (i ? "a line" : "the string") : "$" === p ? b(y) + " assert position at end of " + (i ? "a line" : "the string") : "\\b" === p ? d ? b(y) + " a backspace character " + P("(ASCII 8)") : b(y) + " assert position at a word boundary " + P("(^\\w|\\w$|\\W\\w|\\w\\W)") : "\\B" === p ? d ? u({
                    contents: p,
                    type: regex_type.ESCAPED_TEXT,
                    modifiers: t.modifiers
                }, t) : b(y) + " assert position where " + P("\\b") + " doesn't match" : "\\A" === p ? b(y) + " assert position at start of the string" : "\\Z" === p ? b(y) + " assert position at end of the string" : "\\z" === p ? b(y) + " assert position at the very end of the string" : "\\G" === p ? b(y) + " assert position at the end of the previous match or the start of the string for the first match" : "\\K" === p ? b(y) + " resets the starting point of the reported match. Any previously consumed characters are no longer included in the final match" : "\\d" === p ? n ? b(y) + " match a digit zero through nine in any script except ideographic scripts " + P("\\p{Nd}") : b(y) + " match a digit " + N("[0-9]") : "\\D" === p ? n ? b(y) + " match any non-numeric character in any script " + P("\\P{Nd}") : b(y) + " match any character that's not a digit " + N("[^0-9]") : "\\w" === p ? n ? b(y) + " match any word character in any script " + N("[\\p{L}\\p{N}_]") : b(y) + " match any word character " + N("[a-zA-Z0-9_]") : "\\W" === p ? n ? b(y) + " match any non-word character in any script " + N("[\\P{L}\\P{N}]") : b(y) + " match any non-word character " + N("[^a-zA-Z0-9_]") : "\\s" === p ? n ? b(y) + " match any kind of invisible character " + N("[\\p{Z}\\h\\v]") : b(y) + " match any white space character " + N("[\\r\\n\\t\\f ]") : "\\S" === p ? n ? b(y) + " match any kind of visible character " + N("[\\P{Z}\\H\\V]") : b(y) + " match any non-white space character " + N("[^\\r\\n\\t\\f ]") : "\\h" === p ? b(y) + " matches any horizontal whitespace character (equal to " + N("[[:blank:]]") + ")" : "\\H" === p ? b(y) + " matches any character that's not a horizontal whitespace character" : "\\v" === p ? b(y) + " matches any vertical whitespace character" : "\\V" === p ? b(y) + " matches any character that's not a vertical whitespace character" : "\\N" === p ? b(y) + " matches any non-newline character" : "\\R" === p ? b(y) + " matches any Unicode newline sequence; can be modified using verbs" : "\\C" === p ? b(y) + " matches one data unit, even in " + P("UTF") + " mode (best avoided)" : "\\X" === p ? b(y) + " matches any number of Unicode characters that form an extended Unicode sequence" : "\\t" === p ? b(y) + " Tab " + P("(ASCII 9)") : "\\r" === p ? b(y) + " matches a carriage return " + P("(ASCII 13)") : "\\n" === p ? b(y) + " matches a line-feed (newline) character " + P("(ASCII 10)") : "\\f" === p ? b(y) + " matches a form-feed character " + P("(ASCII 12)") : "\\a" === p ? b(y) + " matches the bell character " + P("(ASCII 7)") : "\\e" === p ? b(y) + " matches esc " + P("(ASCII 27)") : /^\\[kg]/.test(p) ? b(y) + "bla" : u({
                    contents: p,
                    type: regex_type.ESCAPED_TEXT,
                    modifiers: t.modifiers
                }, t);
            case regex_type.QUOTE_TEXT:
            case regex_type.TEXT:
                var O = "<em>null</em>";
                if (d) {
                    var T = escapeHtml(_.uniq(p).join("")),
                        k = b("" === y ? O : y);
                    return k += T.length > 1 ? " a single character in the list " + A(replaceBackslash(T)) + " literally" : " the literal character " + A(replaceBackslash("" === T ? O : T)), k += l(T, c)
                }
                if ("\n" === h) return b("&not;") + " matches a line-feed (newline) character " + P("(ASCII 10)");
                if ("\r" === h) return b("&not;") + " matches a carriage return " + P("(ASCII 13)");
                var S = "" === m ? O : m;
                e.type !== regex_type.QUOTE_TEXT && (S = replaceBackslash(S));
                var G = b("" === y ? O : y) + " matches the character" + (m.length > 1 ? "s " : " ") + A(S) + " literally";
                return G += l(h, c);
            case regex_type.ESCAPED_TEXT:
                var T = b(y) + " matches the character " + A(replaceBackslash(m)) + " literally";
                return T += l(h, c);
            case regex_type.MODIFIERS:
                var H = "";
                return H += D(E(y) + " Match the remainder of the pattern with the following options:"), H += "<ul>", H += /^\(\?-*\)$/.test(p) ? M(F(P("Note:") + " Empty group with no modifiers specified - very useless"), !1) : g(p.slice(2, -1)), H += "</ul>";
            case regex_type.VERB:
                return b(y) + " " + f(p);
            case regex_type.GROUP_COMMENT:
                return U("Comment:") + " " + y.slice(3, -1);
            case regex_type.COMMENT:
                return U("Comment:") + " " + escapeHtml(e.contents).slice(1).replace(/[\r\n]/g, "");
            case regex_type.OCTAL:
                var v = p.substring(1),
                    B = parseInt(v, 8);
                return b(y) + " matches the character " + A(String.fromCodePoint(B)) + " with octal index " + C(v) + " (" + C(B) + " decimal or " + C(B.toString(16).toUpperCase()) + " hexadecimal) in the character set";
            case regex_type.NUM_BACKREF:
                return b(y) + " matches the same text as most recently matched by the " + L(ord(e.reference), e.reference) + " capturing group";
            case regex_type.NAME_BACKREF:
                return b(y) + " matches the same text as most recently matched by the capturing group named " + x(e.reference, 1);
            case regex_type.REFERNCE_GROUP:
                var q = e.reference;
                return "(?R)" === p || "(?0)" === p ? b(y) + " recurses the entire pattern" : parseInt(q) == q && -1 === Regex101Colorizer.getCaptureData().subpatterns.indexOf(q) ? b(y) + " recurses the " + L(ord(q), q) + " subpattern" : b(y) + " recurses the subpattern named " + L(q, 1)
        }
    }

    function d(e) {
        var t = e.contents,
            r = white_space(escapeHtml(e.group_contents));
        if ("(" === t) return V++, L(ord(V), V) + " Capturing group " + E(r);
        if (e.type === regex_type.CONDITIONAL) return "IF Clause " + w(r);
        if (e.type === regex_type.DEFINE) return "DEFINE construct " + w(r) + " (only for reference)";
        if (e.type === regex_type.LOOKBEHIND || e.type === regex_type.LOOKAHEAD) {
            var a = "<" === t.charAt(2) ? "Lookbehind" : "Lookahead";
            return -1 === t.indexOf("!") ? v(r) + " Positive " + a + " - Assert that the regex below can be matched" : v(r) + " Negative " + a + " - Assert that it is impossible to match the regex below"
        }
        return "(?>" === t ? E(r) + " Atomic Group" : e.type === regex_type.GROUP || e.type === regex_type.SUBPATTERN_GROUP || e.type === regex_type.GROUP_MODIFIER ? E(r) + " Non-capturing group" : e.type === regex_type.NAMED_GROUP ? (V++, E(r) + " Named capturing group " + L(escapeHtml(t.slice(3, -1)), e.ref_num)) : e.type === regex_type.NAMED_P_GROUP ? (V++, E(r) + " Named capturing group " + L(escapeHtml(t.slice(4, -1)), e.ref_num)) : void 0
    }

    function g(e) {
        for (var t = "", r = "", a = !0, n = 0; n < e.length; n++) {
            var i = e.charAt(n);
            "-" !== i ? ("g" === i ? (r = "<strong>g</strong>lobal. All matches (don't return on first match)", Q = !0) : "J" === i ? a ? (r = "Allow duplicate subpattern names", z = !0) : (z = !1, r = "Disallow duplicate subpattern names") : "i" === i ? a ? (q = !0, r = "<strong>i</strong>nsensitive. Case insensitive match (ignores case of " + N("[a-zA-Z]") + ")") : (q = !1, r = "-<strong>i</strong>nsensitive. Case sensitive match") : "s" === i ? a ? (B = !0, r = "<strong>s</strong>ingle line. Dot matches newline characters") : (B = !1, r = "-<strong>s</strong>ingle line. A dot won't match " + P("\n")) : "S" === i ? r = "Enables extra analysis to help you debug your expression" : "m" === i ? a ? (H = !0, r = "<strong>m</strong>ulti-line. Causes " + P("^") + " and " + P("$") + " to match the begin/end of each line (not only begin/end of string)") : (H = !1, r = "-<strong>m</strong>ulti-line. " + P("^") + " and " + P("$") + " match not only begin/end of line") : "x" === i ? a ? (G = !0, r = "e<strong>x</strong>tended. Spaces and text after a " + P("#") + " in the pattern are ignored") : (G = !1, r = "-e<strong>x</strong>tended. Whitespaces in pattern are literal whitespaces") : "X" === i ? r = "e<strong>X</strong>tra. A " + P("\\") + " followed by a letter with no special meaning is faulted" : "A" === i ? r = "<strong>A</strong>nchored. Pattern is forced to " + P("^") : "U" === i ? a ? (X = !0, r = "<strong>U</strong>ngreedy. The match becomes lazy by default. Now a " + P("?") + " following a quantifier makes it greedy") : (X = !1, r = "-<strong>U</strong>ngreedy. The match becomes greedy by default") : r = "u" === i ? "<strong>u</strong>nicode: Pattern strings are treated as " + P("UTF-16") + ". Also causes escape sequences to match unicode characters" : "D" === i ? "A dollar metacharacter in the pattern matches only at the end of the subject string" : "no description for it yet", t += M(R(i + " modifier" + (a ? "" : " off") + ":") + " " + r, !1)) : a = !1
        }
        return t
    }

    function f(e) {
        var t = I("Undescribed specific verb; No description for it yet (nothing's perfect)");
        return "(*UTF" === e.substring(0, 5) ? t = "sets the property mode to " + P("UTF-" + e.replace(/\D+/g, "")) : "(*UCP)" === e ? t = "sets the property mode to Unicode" : "(*NO_START_OPT)" === e ? t = "suppresses the start-of-match optimizations that are otherwise run by " + P("PERL") : "(*CR)" === e ? t = "specifies a newline convention: carriage return" : "(*LF)" === e ? t = "specifies a newline convention: line-feed" : "(*CRLF)" === e ? t = "specifies a newline convention: " + P("(*CR)") + ", followed by " + P("(*LF)") : "(*ANYCRLF)" === e ? t = "specifies a newline convention: " + P("(*CR)") + ", " + P("(*LF)") + " or " + P("(*CRLF)") : "(*ANY)" === e ? t = "specifies a newline convention: all Unicode newline sequences" : "(*BSR_ANYCRLF)" === e ? t = "specifies a newline convention: " + P("(*CR)") + ", " + P("(*LF)") + " or " + P("(*CRLF)") + " only" : "(*BSR_UNICODE)" === e ? t = "specifies a newline convention: any Unicode newline sequence" : /\(\*(?:MARK)?:[^:]+\)/.test(e) ? t = "marker verb whose main purpose is to track how a match was arrived at" : "(*FAIL)" === e ? t = "verb synonymous with " + P("(?!)") + ". Forces a matching failure at the given position in the pattern" : "(*F)" === e ? t = "shorthand for (*FAIL)" : /\(\*PRUNE(?::[^:]+)?\)/.test(e) ? t = "this verb causes the match to fail at the current starting position in the subject if the rest of the pattern does not match" : "(*COMMIT)" === e ? t = "causes the whole match to fail outright if the rest of the pattern does not match" : /\(\*THEN(?::[^:]+)?\)/.test(e) ? t = "causes a skip to the next innermost alternative if the rest of the pattern does not match" : /\(\*SKIP(?::[^:]+)?\)/.test(e) ? t = "acts like (*PRUNE), except that if the  pattern  is unanchored, the " + P("bumpalong") + " advance is not to the next character, but to the position in the subject where " + P("(*SKIP)") + " was encountered" : "(*ACCEPT)" === e && (t = "this verb causes the match to end successfully, skipping the remainder of the pattern"), t
    }

    function m(e) {
        for (var t = "", r = 0; r < e.length; r++) {
            var a = e[r];
            a.error && (t += '<li class="treeview_error hard_break">' + I(white_space(escapeHtml(a.contents))) + " " + Z.explainError(a.error_type, a) + "</li>"), a.children && (t += m(a.children)), a.error && isGroupType(a.type) && !a.unmatched && (t += '<li class="treeview_error hard_break">' + I(")") + " Unmatched parenthesis</li>")
        }
        return t
    }

    function y(e, t) {
        return '<span class="' + t + '">' + e + "</span>"
    }

    function b(e) {
        return y(e, "token")
    }

    function A(e) {
        return y(white_space(e), "literal")
    }

    function E(e) {
        return y(e, "group")
    }

    function v(e) {
        return y(e, "assertion")
    }

    function w(e) {
        return y(e, "conditional")
    }

    function x(e) {
        return y(e, "name")
    }

    function R(e) {
        return y(e, "modifier")
    }

    function N(e) {
        return y(e, "treeCharclass")
    }

    function I(e) {
        return y(e, "tokenError")
    }

    function O(e) {
        return y(e, "quantifier")
    }

    function T(e) {
        return y(e, "inner-quantifier")
    }

    function C(e) {
        return y(e, "note")
    }

    function P(e) {
        return y(e, "misc")
    }

    function U(e) {
        return y(e, "treeComment")
    }

    function k(e) {
        return y(e, "alternation")
    }

    function S(e) {
        return y(e, "alt_token")
    }

    function L(e, t) {
        return y(e, "capturinggrooup match" + (t % 10 || 10))
    }

    function D(e) {
        return '<li><div class="hitarea collapsable"><i class="fa fa-caret-down"></i></div><div class="folder">' + e + "</div>"
    }

    function M(e, t) {
        var r = "file";
        return t && (r += " treeview_bold"), '<li><div class="' + r + '">' + e + "</div></li>"
    }

    function F(e) {
        return '<div class="treeview_regex_warning">' + e + "</div>"
    }
    var G, H, B, q, X, z, Q, V, K, W, $, Z = {},
        Y = {
            L: "any kind of letter from any language",
            Ll: "a lowercase letter that has an uppercase variant",
            Lu: "an uppercase letter that has a lowercase variant",
            Lt: "a letter that appears at the start of a word when only the first letter of the word is capitalized",
            "L&": "a letter that exists in lowercase and uppercase variants (combination of " + P("Ll") + ", " + P("Lu") + " and " + P("Lt") + ")",
            Lm: "a special character that is used like a letter",
            Lo: "a letter or ideograph that does not have lowercase and uppercase variants",
            M: "a character intended to be combined with another character (e.g. accents, umlauts, enclosing boxes, etc.)",
            Mn: "a character intended to be combined with another character without taking up extra space (e.g. accents, umlauts, etc.)",
            Mc: "a character intended to be combined with another character that takes up extra space (vowel signs in many Eastern languages)",
            Me: "a character that encloses the character is is combined with (circle, square, keycap, etc.)",
            Z: "any kind of whitespace or invisible separator",
            Zs: "a whitespace character that is invisible, but does take up space",
            Zl: "Line separator character " + P("U+2028"),
            Zp: "paragraph separator character " + P("U+2029"),
            S: "math symbols, currency signs, dingbats, box-drawing characters, etc",
            Sm: "any mathematical symbol",
            Sc: "any currency sign",
            Sk: "a combining character (mark) as a full character on its own",
            So: "Various symbols that are not math symbols, currency signs, or combining characters",
            N: "any kind of numeric character in any script",
            Nd: "a digit zero through nine in any script except ideographic scripts",
            Nl: "a number that looks like a letter, such as a Roman numeral",
            No: "a superscript or subscript digit, or a number that is not a digit " + N("[0-9]") + " (excluding numbers from ideographic scripts)",
            P: "any kind of punctuation character",
            Pd: "any kind of hyphen or dash",
            Ps: "any kind of opening bracket",
            Pe: "any kind of closing bracket",
            Pi: "any kind of opening quote",
            Pf: "any kind of closing quote",
            Pc: "a punctuation character such as an underscore that connects words",
            Po: "any kind of punctuation character that is not a dash, bracket, quote or connector",
            C: "invisible control characters and unused code points",
            Cc: "an ASCII " + N("[\x00-]") + " or Latin-1 " + N("[-]") + " control character",
            Cf: "invisible formatting indicator",
            Co: "any code point reserved for private use",
            Cs: "one half of a surrogate pair in " + P("UTF-16") + " encoding",
            Cn: "any code point to which no character has been assigned"
        },
        j = "";
    return Z.hasError = function() {
        return K
    }, Z.explain = function(i) {
        W = i.flavor ? i.flavor : FLAVOR.PCRE;
        var s;
        switch (W) {
            case FLAVOR.JS:
                s = /^[img]$/, j = "Javascript";
                break;
            case FLAVOR.PYTHON:
                s = /^[imgsxu]$/, j = "Python";
                break;
            case FLAVOR.PCRE:
            default:
                s = /^[xXsiuUmgAD]$/, j = "PCRE (PHP)"
        }
        var c = Regex101Colorizer.returnTokens(),
            o = "<li>";
        Regex101Colorizer.hasError() || (o += '<div class="hitarea collapsable"><i class="fa fa-caret-down"></i></div>'), o += '<div class="first-folder" class="folder"><div><span class="expslash">' + escapeHtml(i.delimiter) + '</span><span class="treeview_pattern regex_colorizer">' + Regex101Colorizer.makeHtml(c[0].children, !0, !0) + '</span><span class="expslash">' + escapeHtml(i.delimiter) + '</span><span class="treeview_pattern treeview_options">' + escapeHtml(i.options) + "</span></div></div>";
        var h = '<ul id="regexExplainer" class="filetree treeview">' + o + "<ul>";
        if (Regex101Colorizer.hasError()) {
            h += '<li class="treeview_error_root">Errors are explained from left to right. Move the mouse cursor over them to see the error highlighted in your pattern</li>', h += m(c[0].children);
            for (var p = _.uniq(i.options), l = i.options, u = 0; u < p.length; u++) s.test(p[u]) || (h += '<li class="treeview_error">' + I(p[u]) + "-modifier does not exist in " + FLAVOR[W] + " (or is not yet supported by regex101.com)</li>"), l = l.replace(p[u], "");
            l = _.uniq(l);
            for (var u = 0; u < l.length; u++) h += '<li class="treeview_error">Duplicate modifier: ' + I(l[u]) + "</li>"
        } else V = 0, $ = Regex101Colorizer.getCaptureData(), e(c[0].children), r(c[0].children, c[0]), a(c[0].children, c[0]), t(c[0].children), h += n(c[0].children, c[0]), h += g(i.options);
        return h += "</ul></ul>"
    }, Z.quickTokenExplain = function(e, t) {
        return u({
            token: e,
            type: t
        })
    }, Z.explain_options = function(e) {
        return K ? "<li>Your pattern contains an error, please fix it first.</li>" : g(e)
    }, Z.explainError = function(e, t) {
        switch (e) {
            case error_type.TRUNCATING_ALTERNATOR:
                return "Alternator at this position effectively truncates the entire pattern, rendering any other tokens beyond this point useless";
            case error_type.TRUNCATING_ALTERNATOR_GROUP:
                return "Alternator at this position effectively truncates the group, rendering any other tokens beyond this point useless";
            case error_type.DUPLICATE_SUBPATTERN:
                return "Subpattern name declared more than once";
            case error_type.INVALID_GROUP_STRUCTURE:
                return "Invalid group structure";
            case error_type.UNSUPPORTED_TOKEN:
                return void 0 === t ? "This token is not supported in the selected flavor" : "The token " + b(t.contents) + " is not supported in " + j;
            case error_type.INCOMPLETE_TOKEN:
                return "Incomplete token";
            case error_type.NOT_QUANTIFIABLE:
                return "Preceding token is not quantifiable";
            case error_type.BAD_QUANTIFIER_RANGE:
                return "Quantifier range is out of order";
            case error_type.TOO_LARGE_QUANTIFIER:
                return "Quantifier range is too large";
            case error_type.LOOKBEHIND_QUANTIFIER:
                return "Lookbehinds need to be zero-width, thus quantifiers are not allowed";
            case error_type.UNBALANCED_PAREN:
                return "Unbalanced parenthesis";
            case error_type.INVALID_POSIX:
                return "Invalid POSIX set";
            case error_type.TOO_MANY_ALTERNATIONS:
                return "Too many alternatives within the parent structure";
            case error_type.VERB_INVALID_LOCATION:
                return "Verb placed at an invalid location";
            case error_type.UNKNOWN_VERB:
                return "Unknown verb";
            case error_type.UNKNOWN_SCRIPT:
                return "Unknown unicode script";
            case error_type.UNBALANCED_GROUP:
                return "Unbalanced group";
            case error_type.UNESCAPED_DELIMITER:
                return "Unescaped delimiter";
            case error_type.INVALID_BACKREF:
                return "Invalid backreference";
            case error_type.X_MODE:
                return "Due to the X-modifier, this token is invalid. Any character following a \\ without special meaning is faulted";
            case error_type.INCOMPLETE_CHARCLASS:
                return "Incomplete character class";
            case error_type.BAD_TEXT_RANGE:
                return "Text range out of order";
            case error_type.BAD_RANGE:
                return "Can not form ranges with shorthand properties";
            case error_type.NON_EXISTENT_REFERENCE:
                return "Reference to non-existent subpattern";
            case error_type.INVALID_POSIX_LOCATION:
                return "POSIX named classes are only supported within a character class";
            case error_type.BAD_SUBPATTERN_INDEX_NAME:
                return "Different names for subpatterns of the same index is not allowed";
            case error_type.NOT_FIXED_WIDTH:
                return "Lookbehind assertion is not fixed width";
            case error_type.BACKREF_IN_LOOKBEHIND:
                return "Subpattern references are not allowed within a lookbehind assertion";
            case error_type.TOO_LARGE_OFFSET:
                return "Character offset is too large. Reduce it to 4 hexadecimal characters or enable " + P("UTF-16") + " (" + R("u-modifier") + ")";
            case error_type.UNICODE_OVERFLOW:
                return "Hex values may not be larger than " + b("10FFFF") + " in " + P("UTF-16") + ".";
            case error_type.SURROGATE:
                return "Surrogates are not allowed in " + P("UTF16");
            case error_type.INVALID_GROUP_NAME:
                return "Group names must not begin with digits";
            case error_type.INVALID_TEXT_RANGE:
                return "Invalid range";
            default:
                return "Hmm.. No error message for this it seems. Please create a permalink and submit to contact@regex101.com"
        }
    }, Z.quickExplain = function(e, t, r) {
        for (var a = "", n = 0; n < e.childNodes.length; n++) 3 === e.childNodes[n].nodeType && (a += e.childNodes[n][textMethod]);
        var i = a.slice(0, 2);
        switch (t) {
            case regex_type.NONE:
                return "n/a";
            case regex_type.CHARCLASS:
                switch (a) {
                    case "[":
                        return "<b>Charclass.</b> Start of character class";
                    case "[^":
                        return "<b>Charclass.</b> Start of negated character class";
                    case "]":
                        return "<b>Charclass.</b> End of character class"
                }
                case regex_type.GROUP:
                    switch (a) {
                        case ")":
                            return "<b>Group.</b> End of non-capturing group";
                        default:
                            return "<b>Group.</b> Start of non-capturing group"
                    }
                    case regex_type.NAMED_P_GROUP:
                        return "(" === a.charAt(0) ? "<b>Group.</b> Start of capturing group `<i>" + a.replace(/^\(\?P<|>$/g, "") + "</i>`" : "End of named capturing group";
                    case regex_type.NAMED_GROUP:
                        return "(" === a.charAt(0) ? "<b>Group.</b> Start of capturing group `<i>" + a.replace(/\W/g, "") + "</i>`" : "End of named capturing group";
                    case regex_type.CONDITIONAL:
                        return ")" === a ? "End of IF statement" : "Start of IF statement";
                    case regex_type.QUANTIFIER:
                    case regex_type.GROUP_QUANTIFIER:
                        var s = -1 !== r.indexOf("U"),
                            c = "<b>Quantifier.</b> Repeat previous token ";
                        switch (a.charAt(0)) {
                            case "+":
                                c += "<i>one</i> to <i>infinite</i> times";
                                break;
                            case "*":
                                c += "<i>zero</i> to <i>infinite</i> times";
                                break;
                            case "?":
                                c += "<i>one</i> or <i>zero</i> times";
                                break;
                            case "{":
                                var o = a.split(",").map(function(e) {
                                    return e.replace(/[\{\}*?]/g, "")
                                });
                                if (2 !== o.length) return c += "exactly <i>" + o[0] + "</i> times";
                                c += "<i>" + o[0] + "</i> to <i>" + (o[1] ? o[1] : "infinite") + "</i> times"
                        }
                        if (a.length > 1 && "}" !== a.slice(-1)) switch (a.slice(-1)) {
                            case "+":
                                c += ", without giving back";
                                break;
                            case "?":
                                if (!s) {
                                    c += ", as few times as possible";
                                    break
                                }
                                c += ", as many times as possible"
                        } else c += s ? ", as few times as possible" : ", as many times as possible";
                        return c;
                    case regex_type.MODIFIERS:
                        return "<b>Modifiers.</b> Inline modifiers (applied from this point on)";
                    case regex_type.VERB:
                        var h = f(a);
                        return "<b>Verbs.</b> " + h.slice(0, 1).toUpperCase() + h.slice(1);
                    case regex_type.ALTERNATOR:
                        return "Alternation";
                    case regex_type.GROUP_COMMENT:
                    case regex_type.COMMENT:
                        return "Comment";
                    case regex_type.QUOTE:
                        switch (a) {
                            case "\\E":
                                return "<b>Quoted literals.</b> End of quoted literals";
                            default:
                                return "<b>Quoted literals</b>: Matches the following characters, until the end or <i>\\E</i>, literally"
                        }
                        case regex_type.RANGE_HYPHEN:
                            return "<b>Character range.</b> Creates a character range with the adjacent tokens";
                        case regex_type.POSIX:
                            return "<b>Character classes.</b> POSIX character set";
                        case regex_type.REFERNCE_GROUP:
                            var p = "<b>Recursion.</b> ",
                                o = a.replace(/^\\[gk]|^\(\?P[=>]|[^a-z\d+\-\+_]/gi, "");
                            if ("(?R)" === a || "(?0)" === a) return p + "Recurses the entire pattern";
                            if (-1 !== Regex101Colorizer.getCaptureData().subpatterns.indexOf(o)) return p + "Subpattern reference to group named `<i>" + o + "</i>`";
                            var l = o.charAt(0);
                            return "+" === l || "-" === l ? p + "Reference to the <i>" + ord(parseInt(o.slice(1))) + "</i> subpattern declared, seen from the " + ("+" === l ? "right" : "left") + " of this token" : p + "Reference to the <i>" + ord(parseInt(o)) + "</i> subpattern";
                        case regex_type.OCTAL:
                            return "<b>Octal.</b> Matches character `<i>" + white_space_nohtml(escapeHtml(String.fromCodePoint(parseInt(a.slice(1), 8)))) + "</i>`";
                        case regex_type.HEX:
                            return "<b>HEX.</b> Matches character `<i>" + white_space_nohtml(escapeHtml(String.fromCodePoint(parseInt(a.replace(/[^\da-f]/gi, ""), 16)))) + "</i>`";
                        case regex_type.LOOKBEHIND:
                            switch (a) {
                                case ")":
                                    return "<b>Lookbehind.</b> End of lookbehind assertion";
                                default:
                                    return "<b>Lookbehind.</b> Start of " + (-1 === a.indexOf("!") ? "positive" : "negative") + " lookbehind assertion"
                            }
                            case regex_type.LOOKAHEAD:
                                switch (a) {
                                    case ")":
                                        return "<b>Lookahead.</b> End of lookahead assertion";
                                    default:
                                        return "<b>Lookahead.</b> Start of " + (-1 === a.indexOf("!") ? "positive" : "negative") + " lookahead assertion"
                                }
                                case regex_type.CAPTURING_GROUP:
                                    switch (a) {
                                        case "(":
                                            return "<b>Group.</b> Start of capturing group";
                                        case ")":
                                            return "<b>Group.</b> End of capturing group"
                                    }
                                    case regex_type.SUBPATTERN_GROUP:
                                        switch (a) {
                                            case ")":
                                                return "<b>Group.</b> End of duplicate subpattern group";
                                            default:
                                                return "<b>Group.</b> Start of duplicate subpattern group"
                                        }
                                        case regex_type.DEFINE:
                                            return "DEFINE construct";
                                        case regex_type.NUM_BACKREF:
                                            return "<b>Backreference.</b> Reference to the <i>" + ord(parseInt(a.replace(/\D/g, ""))) + "</i> subpattern";
                                        case regex_type.NAME_BACKREF:
                                            return "<b>Backreference.</b> Reference to group `<i>" + a.slice(3, -1) + "</i>`";
                                        case regex_type.ESCAPED_TEXT:
                                            return "<b>Literal.</b> Escaped literal `<i>" + a.slice(1) + "</i>`";
                                        case regex_type.GROUP_MODIFIER:
                                            switch (a) {
                                                case ")":
                                                    return "<b>Group.</b> End of non-capturing group with specific modifiers";
                                                default:
                                                    return "<b>Group.</b> Start of non-capturing group with specific modifiers"
                                            }
                                            case regex_type.META:
                                                switch (i) {
                                                    case "^":
                                                        return "<b>Anchor.</b> Anchor to beginning of " + (-1 === r.indexOf("m") ? "string" : "line");
                                                    case "$":
                                                        return "<b>Anchor.</b> Anchor to end of " + (-1 === r.indexOf("m") ? "string" : "line");
                                                    case ".":
                                                        return "<b>Dot.</b> Matches any character" + (-1 === r.indexOf("s") ? " except newline" : "");
                                                    case "\\G":
                                                        return "<b>Meta character.</b> Next match continues where the old one ended";
                                                    case "\\D":
                                                        return "<b>Meta character.</b> Any non-digit";
                                                    case "\\d":
                                                        return "<b>Meta character.</b> Any digit";
                                                    case "\\H":
                                                        return "<b>Meta character.</b> Any non-horizontal whitespace character";
                                                    case "\\h":
                                                        return "<b>Meta character.</b> Any horizontal whitespace character";
                                                    case "\\S":
                                                        return "<b>Meta character.</b> Any non-whitespace character";
                                                    case "\\s":
                                                        return "<b>Meta character.</b> Any whitespace character";
                                                    case "\\V":
                                                        return "<b>Meta character.</b> Any non-vertical whitespace character";
                                                    case "\\v":
                                                        return "<b>Meta character.</b> Any vertical whitespace character";
                                                    case "\\W":
                                                        return "<b>Meta character.</b> Any non-word character";
                                                    case "\\w":
                                                        return "<b>Meta character.</b> Any word character";
                                                    case "\\a":
                                                        return "<b>Meta character.</b> Bell";
                                                    case "\\e":
                                                        return "<b>Meta character.</b> Esc";
                                                    case "\\f":
                                                        return "<b>Meta character.</b> Form-feed";
                                                    case "\\n":
                                                        return "<b>Meta character.</b> Newline";
                                                    case "\\r":
                                                        return "<b>Meta character.</b> Carriage return";
                                                    case "\\t":
                                                        return "<b>Meta character.</b> Tab";
                                                    case "\\B":
                                                        return "<b>Anchor.</b> Negated word boundary. Matches where <i>\\b</i> does not.";
                                                    case "\\b":
                                                        return "<b>Anchor.</b> Word boundary. Matches between <i>(^\\w|\\w$|\\W\\w|\\w\\W)</i>";
                                                    case "\\K":
                                                        return "<b>Meta character.</b> Resets the starting point of the reported match. Any previously consumed characters are no longer included in the final match";
                                                    case "\\p":
                                                        return "<b>Unicode.</b> Any character in the unicode set named `<i>" + a.slice(2).replace(/\W/g, "") + "</i>`";
                                                    case "\\P":
                                                        return "<b>Unicode.</b> Any character not in the unicode set named `<i>" + a.slice(2).replace(/\W/g, "") + "</i>`";
                                                    default:
                                                        return "u" === a.charAt(1) ? "<b>Unicode.</b> Matches the character `<i>" + white_space_nohtml(escapeHtml(String.fromCodePoint(parseInt(a.slice(2), 16)))) + "</i>`" : -1 === "GDdHhSsVvWwaefnrtXAZzBbRKCulLUcxNkg0pPEQNu".indexOf(a.slice(1)) ? "<b>Literal.</b> Escaped literal `<i>" + a.slice(1) + "</i>`" : "Predefined shorthand. See treeview for full explanation."
                                                }
                                                return "Meta character";
                                            default:
                                                return "I don't seem to have an explanation for this. Please report this and look at the treeview to the right for the time being."
        }
    }, Z
}();