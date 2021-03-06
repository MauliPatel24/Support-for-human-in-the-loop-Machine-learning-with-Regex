function putPrefix(e, n, t) {
    e[n] || (e[n] = ""), e[n] = t + e[n]
}

function putSuffix(e, n, t) {
    e[n] || (e[n] = ""), e[n] += t
}

function jsMatch(e) {
    for (var n, t = new RegExp(e.regex, e.options), s = [], a = !0, i = -1 === e.options.indexOf("g"), f = 0, x = []; n = t.exec(e.regexText);) {
        n.index == t.lastIndex && t.lastIndex++;
        for (var o = [], p = 0; p < n.length; p++) o.push({
            content: n[p]
        });
        if (s[f++] = o, "" === n[0]) putPrefix(x, n.index, '<span class="match_99">&nbsp;</span>');
        else {
            var l = (a = !a) ? "match0_2" : "match0",
                r = s.length - 1 + ";" + n.index + ";" + (n.index + n[0].length) + ";0;";
            putSuffix(x, n.index, '<span data-tooltip="' + r + '" class="' + l + '">'), putPrefix(x, n.index + n[0].length, "</span>")
        }
        if (i) break
    }
    return {
        result: s,
        hl: x
    }
}
self.onmessage = function(e) {
    self.postMessage("onload"), self.postMessage(jsMatch(e.data))
};