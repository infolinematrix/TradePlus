!function (e) {
    if ("object" == typeof exports && "undefined" != typeof module)module.exports = e(); else if ("function" == typeof define && define.amd)define([], e); else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.SimpleMDE = e()
    }
}(function () {
    var e;
    return function t(e, n, i) {
        function r(a, s) {
            if (!n[a]) {
                if (!e[a]) {
                    var l = "function" == typeof require && require;
                    if (!s && l)return l(a, !0);
                    if (o)return o(a, !0);
                    var c = new Error("Cannot find module '" + a + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var u = n[a] = {exports: {}};
                e[a][0].call(u.exports, function (t) {
                    var n = e[a][1][t];
                    return r(n ? n : t)
                }, u, u.exports, t, e, n, i)
            }
            return n[a].exports
        }

        for (var o = "function" == typeof require && require, a = 0; a < i.length; a++)r(i[a]);
        return r
    }({
        1: [function (e, t, n) {
            "use strict";
            function i() {
                for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = 0, n = e.length; n > t; ++t)l[t] = e[t], c[e.charCodeAt(t)] = t;
                c["-".charCodeAt(0)] = 62, c["_".charCodeAt(0)] = 63
            }

            function r(e) {
                var t, n, i, r, o, a, s = e.length;
                if (s % 4 > 0)throw new Error("Invalid string. Length must be a multiple of 4");
                o = "=" === e[s - 2] ? 2 : "=" === e[s - 1] ? 1 : 0, a = new u(3 * s / 4 - o), i = o > 0 ? s - 4 : s;
                var l = 0;
                for (t = 0, n = 0; i > t; t += 4, n += 3)r = c[e.charCodeAt(t)] << 18 | c[e.charCodeAt(t + 1)] << 12 | c[e.charCodeAt(t + 2)] << 6 | c[e.charCodeAt(t + 3)], a[l++] = r >> 16 & 255, a[l++] = r >> 8 & 255, a[l++] = 255 & r;
                return 2 === o ? (r = c[e.charCodeAt(t)] << 2 | c[e.charCodeAt(t + 1)] >> 4, a[l++] = 255 & r) : 1 === o && (r = c[e.charCodeAt(t)] << 10 | c[e.charCodeAt(t + 1)] << 4 | c[e.charCodeAt(t + 2)] >> 2, a[l++] = r >> 8 & 255, a[l++] = 255 & r), a
            }

            function o(e) {
                return l[e >> 18 & 63] + l[e >> 12 & 63] + l[e >> 6 & 63] + l[63 & e]
            }

            function a(e, t, n) {
                for (var i, r = [], a = t; n > a; a += 3)i = (e[a] << 16) + (e[a + 1] << 8) + e[a + 2], r.push(o(i));
                return r.join("")
            }

            function s(e) {
                for (var t, n = e.length, i = n % 3, r = "", o = [], s = 16383, c = 0, u = n - i; u > c; c += s)o.push(a(e, c, c + s > u ? u : c + s));
                return 1 === i ? (t = e[n - 1], r += l[t >> 2], r += l[t << 4 & 63], r += "==") : 2 === i && (t = (e[n - 2] << 8) + e[n - 1], r += l[t >> 10], r += l[t >> 4 & 63], r += l[t << 2 & 63], r += "="), o.push(r), o.join("")
            }

            n.toByteArray = r, n.fromByteArray = s;
            var l = [], c = [], u = "undefined" != typeof Uint8Array ? Uint8Array : Array;
            i()
        }, {}],
        2: [function (e, t, n) {
        }, {}],
        3: [function (e, t, n) {
            (function (t) {
                "use strict";
                function i() {
                    try {
                        var e = new Uint8Array(1);
                        return e.foo = function () {
                            return 42
                        }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                    } catch (t) {
                        return !1
                    }
                }

                function r() {
                    return a.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
                }

                function o(e, t) {
                    if (r() < t)throw new RangeError("Invalid typed array length");
                    return a.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = a.prototype) : (null === e && (e = new a(t)), e.length = t), e
                }

                function a(e, t, n) {
                    if (!(a.TYPED_ARRAY_SUPPORT || this instanceof a))return new a(e, t, n);
                    if ("number" == typeof e) {
                        if ("string" == typeof t)throw new Error("If encoding is specified then the first argument must be a string");
                        return u(this, e)
                    }
                    return s(this, e, t, n)
                }

                function s(e, t, n, i) {
                    if ("number" == typeof t)throw new TypeError('"value" argument must not be a number');
                    return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? f(e, t, n, i) : "string" == typeof t ? d(e, t, n) : p(e, t)
                }

                function l(e) {
                    if ("number" != typeof e)throw new TypeError('"size" argument must be a number')
                }

                function c(e, t, n, i) {
                    return l(t), 0 >= t ? o(e, t) : void 0 !== n ? "string" == typeof i ? o(e, t).fill(n, i) : o(e, t).fill(n) : o(e, t)
                }

                function u(e, t) {
                    if (l(t), e = o(e, 0 > t ? 0 : 0 | m(t)), !a.TYPED_ARRAY_SUPPORT)for (var n = 0; t > n; n++)e[n] = 0;
                    return e
                }

                function d(e, t, n) {
                    if ("string" == typeof n && "" !== n || (n = "utf8"), !a.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');
                    var i = 0 | v(t, n);
                    return e = o(e, i), e.write(t, n), e
                }

                function h(e, t) {
                    var n = 0 | m(t.length);
                    e = o(e, n);
                    for (var i = 0; n > i; i += 1)e[i] = 255 & t[i];
                    return e
                }

                function f(e, t, n, i) {
                    if (t.byteLength, 0 > n || t.byteLength < n)throw new RangeError("'offset' is out of bounds");
                    if (t.byteLength < n + (i || 0))throw new RangeError("'length' is out of bounds");
                    return t = void 0 === i ? new Uint8Array(t, n) : new Uint8Array(t, n, i), a.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = a.prototype) : e = h(e, t), e
                }

                function p(e, t) {
                    if (a.isBuffer(t)) {
                        var n = 0 | m(t.length);
                        return e = o(e, n), 0 === e.length ? e : (t.copy(e, 0, 0, n), e)
                    }
                    if (t) {
                        if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t)return "number" != typeof t.length || K(t.length) ? o(e, 0) : h(e, t);
                        if ("Buffer" === t.type && J(t.data))return h(e, t.data)
                    }
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                }

                function m(e) {
                    if (e >= r())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r().toString(16) + " bytes");
                    return 0 | e
                }

                function g(e) {
                    return +e != e && (e = 0), a.alloc(+e)
                }

                function v(e, t) {
                    if (a.isBuffer(e))return e.length;
                    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer))return e.byteLength;
                    "string" != typeof e && (e = "" + e);
                    var n = e.length;
                    if (0 === n)return 0;
                    for (var i = !1; ;)switch (t) {
                        case"ascii":
                        case"binary":
                        case"raw":
                        case"raws":
                            return n;
                        case"utf8":
                        case"utf-8":
                        case void 0:
                            return $(e).length;
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return 2 * n;
                        case"hex":
                            return n >>> 1;
                        case"base64":
                            return V(e).length;
                        default:
                            if (i)return $(e).length;
                            t = ("" + t).toLowerCase(), i = !0
                    }
                }

                function y(e, t, n) {
                    var i = !1;
                    if ((void 0 === t || 0 > t) && (t = 0), t > this.length)return "";
                    if ((void 0 === n || n > this.length) && (n = this.length), 0 >= n)return "";
                    if (n >>>= 0, t >>>= 0, t >= n)return "";
                    for (e || (e = "utf8"); ;)switch (e) {
                        case"hex":
                            return E(this, t, n);
                        case"utf8":
                        case"utf-8":
                            return _(this, t, n);
                        case"ascii":
                            return A(this, t, n);
                        case"binary":
                            return D(this, t, n);
                        case"base64":
                            return M(this, t, n);
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return O(this, t, n);
                        default:
                            if (i)throw new TypeError("Unknown encoding: " + e);
                            e = (e + "").toLowerCase(), i = !0
                    }
                }

                function b(e, t, n) {
                    var i = e[t];
                    e[t] = e[n], e[n] = i
                }

                function x(e, t, n, i) {
                    function r(e, t) {
                        return 1 === o ? e[t] : e.readUInt16BE(t * o)
                    }

                    var o = 1, a = e.length, s = t.length;
                    if (void 0 !== i && (i = String(i).toLowerCase(), "ucs2" === i || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
                        if (e.length < 2 || t.length < 2)return -1;
                        o = 2, a /= 2, s /= 2, n /= 2
                    }
                    for (var l = -1, c = 0; a > n + c; c++)if (r(e, n + c) === r(t, -1 === l ? 0 : c - l)) {
                        if (-1 === l && (l = c), c - l + 1 === s)return (n + l) * o
                    } else-1 !== l && (c -= c - l), l = -1;
                    return -1
                }

                function w(e, t, n, i) {
                    n = Number(n) || 0;
                    var r = e.length - n;
                    i ? (i = Number(i), i > r && (i = r)) : i = r;
                    var o = t.length;
                    if (o % 2 !== 0)throw new Error("Invalid hex string");
                    i > o / 2 && (i = o / 2);
                    for (var a = 0; i > a; a++) {
                        var s = parseInt(t.substr(2 * a, 2), 16);
                        if (isNaN(s))return a;
                        e[n + a] = s
                    }
                    return a
                }

                function k(e, t, n, i) {
                    return Y($(t, e.length - n), e, n, i)
                }

                function C(e, t, n, i) {
                    return Y(q(t), e, n, i)
                }

                function S(e, t, n, i) {
                    return C(e, t, n, i)
                }

                function L(e, t, n, i) {
                    return Y(V(t), e, n, i)
                }

                function T(e, t, n, i) {
                    return Y(G(t, e.length - n), e, n, i)
                }

                function M(e, t, n) {
                    return 0 === t && n === e.length ? X.fromByteArray(e) : X.fromByteArray(e.slice(t, n))
                }

                function _(e, t, n) {
                    n = Math.min(e.length, n);
                    for (var i = [], r = t; n > r;) {
                        var o = e[r], a = null, s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                        if (n >= r + s) {
                            var l, c, u, d;
                            switch (s) {
                                case 1:
                                    128 > o && (a = o);
                                    break;
                                case 2:
                                    l = e[r + 1], 128 === (192 & l) && (d = (31 & o) << 6 | 63 & l, d > 127 && (a = d));
                                    break;
                                case 3:
                                    l = e[r + 1], c = e[r + 2], 128 === (192 & l) && 128 === (192 & c) && (d = (15 & o) << 12 | (63 & l) << 6 | 63 & c, d > 2047 && (55296 > d || d > 57343) && (a = d));
                                    break;
                                case 4:
                                    l = e[r + 1], c = e[r + 2], u = e[r + 3], 128 === (192 & l) && 128 === (192 & c) && 128 === (192 & u) && (d = (15 & o) << 18 | (63 & l) << 12 | (63 & c) << 6 | 63 & u, d > 65535 && 1114112 > d && (a = d))
                            }
                        }
                        null === a ? (a = 65533, s = 1) : a > 65535 && (a -= 65536, i.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), i.push(a), r += s
                    }
                    return N(i)
                }

                function N(e) {
                    var t = e.length;
                    if (Q >= t)return String.fromCharCode.apply(String, e);
                    for (var n = "", i = 0; t > i;)n += String.fromCharCode.apply(String, e.slice(i, i += Q));
                    return n
                }

                function A(e, t, n) {
                    var i = "";
                    n = Math.min(e.length, n);
                    for (var r = t; n > r; r++)i += String.fromCharCode(127 & e[r]);
                    return i
                }

                function D(e, t, n) {
                    var i = "";
                    n = Math.min(e.length, n);
                    for (var r = t; n > r; r++)i += String.fromCharCode(e[r]);
                    return i
                }

                function E(e, t, n) {
                    var i = e.length;
                    (!t || 0 > t) && (t = 0), (!n || 0 > n || n > i) && (n = i);
                    for (var r = "", o = t; n > o; o++)r += U(e[o]);
                    return r
                }

                function O(e, t, n) {
                    for (var i = e.slice(t, n), r = "", o = 0; o < i.length; o += 2)r += String.fromCharCode(i[o] + 256 * i[o + 1]);
                    return r
                }

                function I(e, t, n) {
                    if (e % 1 !== 0 || 0 > e)throw new RangeError("offset is not uint");
                    if (e + t > n)throw new RangeError("Trying to access beyond buffer length")
                }

                function B(e, t, n, i, r, o) {
                    if (!a.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (t > r || o > t)throw new RangeError('"value" argument is out of bounds');
                    if (n + i > e.length)throw new RangeError("Index out of range")
                }

                function P(e, t, n, i) {
                    0 > t && (t = 65535 + t + 1);
                    for (var r = 0, o = Math.min(e.length - n, 2); o > r; r++)e[n + r] = (t & 255 << 8 * (i ? r : 1 - r)) >>> 8 * (i ? r : 1 - r)
                }

                function R(e, t, n, i) {
                    0 > t && (t = 4294967295 + t + 1);
                    for (var r = 0, o = Math.min(e.length - n, 4); o > r; r++)e[n + r] = t >>> 8 * (i ? r : 3 - r) & 255
                }

                function H(e, t, n, i, r, o) {
                    if (n + i > e.length)throw new RangeError("Index out of range");
                    if (0 > n)throw new RangeError("Index out of range")
                }

                function W(e, t, n, i, r) {
                    return r || H(e, t, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), Z.write(e, t, n, i, 23, 4), n + 4
                }

                function F(e, t, n, i, r) {
                    return r || H(e, t, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), Z.write(e, t, n, i, 52, 8), n + 8
                }

                function z(e) {
                    if (e = j(e).replace(ee, ""), e.length < 2)return "";
                    for (; e.length % 4 !== 0;)e += "=";
                    return e
                }

                function j(e) {
                    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                }

                function U(e) {
                    return 16 > e ? "0" + e.toString(16) : e.toString(16)
                }

                function $(e, t) {
                    t = t || 1 / 0;
                    for (var n, i = e.length, r = null, o = [], a = 0; i > a; a++) {
                        if (n = e.charCodeAt(a), n > 55295 && 57344 > n) {
                            if (!r) {
                                if (n > 56319) {
                                    (t -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                if (a + 1 === i) {
                                    (t -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                r = n;
                                continue
                            }
                            if (56320 > n) {
                                (t -= 3) > -1 && o.push(239, 191, 189), r = n;
                                continue
                            }
                            n = (r - 55296 << 10 | n - 56320) + 65536
                        } else r && (t -= 3) > -1 && o.push(239, 191, 189);
                        if (r = null, 128 > n) {
                            if ((t -= 1) < 0)break;
                            o.push(n)
                        } else if (2048 > n) {
                            if ((t -= 2) < 0)break;
                            o.push(n >> 6 | 192, 63 & n | 128)
                        } else if (65536 > n) {
                            if ((t -= 3) < 0)break;
                            o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                        } else {
                            if (!(1114112 > n))throw new Error("Invalid code point");
                            if ((t -= 4) < 0)break;
                            o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                        }
                    }
                    return o
                }

                function q(e) {
                    for (var t = [], n = 0; n < e.length; n++)t.push(255 & e.charCodeAt(n));
                    return t
                }

                function G(e, t) {
                    for (var n, i, r, o = [], a = 0; a < e.length && !((t -= 2) < 0); a++)n = e.charCodeAt(a), i = n >> 8, r = n % 256, o.push(r), o.push(i);
                    return o
                }

                function V(e) {
                    return X.toByteArray(z(e))
                }

                function Y(e, t, n, i) {
                    for (var r = 0; i > r && !(r + n >= t.length || r >= e.length); r++)t[r + n] = e[r];
                    return r
                }

                function K(e) {
                    return e !== e
                }

                var X = e("base64-js"), Z = e("ieee754"), J = e("isarray");
                n.Buffer = a, n.SlowBuffer = g, n.INSPECT_MAX_BYTES = 50, a.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : i(), n.kMaxLength = r(), a.poolSize = 8192, a._augment = function (e) {
                    return e.__proto__ = a.prototype, e
                }, a.from = function (e, t, n) {
                    return s(null, e, t, n)
                }, a.TYPED_ARRAY_SUPPORT && (a.prototype.__proto__ = Uint8Array.prototype, a.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && a[Symbol.species] === a && Object.defineProperty(a, Symbol.species, {
                    value: null,
                    configurable: !0
                })), a.alloc = function (e, t, n) {
                    return c(null, e, t, n)
                }, a.allocUnsafe = function (e) {
                    return u(null, e)
                }, a.allocUnsafeSlow = function (e) {
                    return u(null, e)
                }, a.isBuffer = function (e) {
                    return !(null == e || !e._isBuffer)
                }, a.compare = function (e, t) {
                    if (!a.isBuffer(e) || !a.isBuffer(t))throw new TypeError("Arguments must be Buffers");
                    if (e === t)return 0;
                    for (var n = e.length, i = t.length, r = 0, o = Math.min(n, i); o > r; ++r)if (e[r] !== t[r]) {
                        n = e[r], i = t[r];
                        break
                    }
                    return i > n ? -1 : n > i ? 1 : 0
                }, a.isEncoding = function (e) {
                    switch (String(e).toLowerCase()) {
                        case"hex":
                        case"utf8":
                        case"utf-8":
                        case"ascii":
                        case"binary":
                        case"base64":
                        case"raw":
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, a.concat = function (e, t) {
                    if (!J(e))throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === e.length)return a.alloc(0);
                    var n;
                    if (void 0 === t)for (t = 0, n = 0; n < e.length; n++)t += e[n].length;
                    var i = a.allocUnsafe(t), r = 0;
                    for (n = 0; n < e.length; n++) {
                        var o = e[n];
                        if (!a.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');
                        o.copy(i, r), r += o.length
                    }
                    return i
                }, a.byteLength = v, a.prototype._isBuffer = !0, a.prototype.swap16 = function () {
                    var e = this.length;
                    if (e % 2 !== 0)throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var t = 0; e > t; t += 2)b(this, t, t + 1);
                    return this
                }, a.prototype.swap32 = function () {
                    var e = this.length;
                    if (e % 4 !== 0)throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var t = 0; e > t; t += 4)b(this, t, t + 3), b(this, t + 1, t + 2);
                    return this
                }, a.prototype.toString = function () {
                    var e = 0 | this.length;
                    return 0 === e ? "" : 0 === arguments.length ? _(this, 0, e) : y.apply(this, arguments)
                }, a.prototype.equals = function (e) {
                    if (!a.isBuffer(e))throw new TypeError("Argument must be a Buffer");
                    return this === e || 0 === a.compare(this, e)
                }, a.prototype.inspect = function () {
                    var e = "", t = n.INSPECT_MAX_BYTES;
                    return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">"
                }, a.prototype.compare = function (e, t, n, i, r) {
                    if (!a.isBuffer(e))throw new TypeError("Argument must be a Buffer");
                    if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === i && (i = 0), void 0 === r && (r = this.length), 0 > t || n > e.length || 0 > i || r > this.length)throw new RangeError("out of range index");
                    if (i >= r && t >= n)return 0;
                    if (i >= r)return -1;
                    if (t >= n)return 1;
                    if (t >>>= 0, n >>>= 0, i >>>= 0, r >>>= 0, this === e)return 0;
                    for (var o = r - i, s = n - t, l = Math.min(o, s), c = this.slice(i, r), u = e.slice(t, n), d = 0; l > d; ++d)if (c[d] !== u[d]) {
                        o = c[d], s = u[d];
                        break
                    }
                    return s > o ? -1 : o > s ? 1 : 0
                }, a.prototype.indexOf = function (e, t, n) {
                    if ("string" == typeof t ? (n = t, t = 0) : t > 2147483647 ? t = 2147483647 : -2147483648 > t && (t = -2147483648), t >>= 0, 0 === this.length)return -1;
                    if (t >= this.length)return -1;
                    if (0 > t && (t = Math.max(this.length + t, 0)), "string" == typeof e && (e = a.from(e, n)), a.isBuffer(e))return 0 === e.length ? -1 : x(this, e, t, n);
                    if ("number" == typeof e)return a.TYPED_ARRAY_SUPPORT && "function" === Uint8Array.prototype.indexOf ? Uint8Array.prototype.indexOf.call(this, e, t) : x(this, [e], t, n);
                    throw new TypeError("val must be string, number or Buffer")
                }, a.prototype.includes = function (e, t, n) {
                    return -1 !== this.indexOf(e, t, n)
                }, a.prototype.write = function (e, t, n, i) {
                    if (void 0 === t)i = "utf8", n = this.length, t = 0; else if (void 0 === n && "string" == typeof t)i = t, n = this.length, t = 0; else {
                        if (!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        t = 0 | t, isFinite(n) ? (n = 0 | n, void 0 === i && (i = "utf8")) : (i = n, n = void 0)
                    }
                    var r = this.length - t;
                    if ((void 0 === n || n > r) && (n = r), e.length > 0 && (0 > n || 0 > t) || t > this.length)throw new RangeError("Attempt to write outside buffer bounds");
                    i || (i = "utf8");
                    for (var o = !1; ;)switch (i) {
                        case"hex":
                            return w(this, e, t, n);
                        case"utf8":
                        case"utf-8":
                            return k(this, e, t, n);
                        case"ascii":
                            return C(this, e, t, n);
                        case"binary":
                            return S(this, e, t, n);
                        case"base64":
                            return L(this, e, t, n);
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return T(this, e, t, n);
                        default:
                            if (o)throw new TypeError("Unknown encoding: " + i);
                            i = ("" + i).toLowerCase(), o = !0
                    }
                }, a.prototype.toJSON = function () {
                    return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
                };
                var Q = 4096;
                a.prototype.slice = function (e, t) {
                    var n = this.length;
                    e = ~~e, t = void 0 === t ? n : ~~t, 0 > e ? (e += n, 0 > e && (e = 0)) : e > n && (e = n), 0 > t ? (t += n, 0 > t && (t = 0)) : t > n && (t = n), e > t && (t = e);
                    var i;
                    if (a.TYPED_ARRAY_SUPPORT)i = this.subarray(e, t), i.__proto__ = a.prototype; else {
                        var r = t - e;
                        i = new a(r, (void 0));
                        for (var o = 0; r > o; o++)i[o] = this[o + e]
                    }
                    return i
                }, a.prototype.readUIntLE = function (e, t, n) {
                    e = 0 | e, t = 0 | t, n || I(e, t, this.length);
                    for (var i = this[e], r = 1, o = 0; ++o < t && (r *= 256);)i += this[e + o] * r;
                    return i
                }, a.prototype.readUIntBE = function (e, t, n) {
                    e = 0 | e, t = 0 | t, n || I(e, t, this.length);
                    for (var i = this[e + --t], r = 1; t > 0 && (r *= 256);)i += this[e + --t] * r;
                    return i
                }, a.prototype.readUInt8 = function (e, t) {
                    return t || I(e, 1, this.length), this[e]
                }, a.prototype.readUInt16LE = function (e, t) {
                    return t || I(e, 2, this.length), this[e] | this[e + 1] << 8
                }, a.prototype.readUInt16BE = function (e, t) {
                    return t || I(e, 2, this.length), this[e] << 8 | this[e + 1]
                }, a.prototype.readUInt32LE = function (e, t) {
                    return t || I(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
                }, a.prototype.readUInt32BE = function (e, t) {
                    return t || I(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
                }, a.prototype.readIntLE = function (e, t, n) {
                    e = 0 | e, t = 0 | t, n || I(e, t, this.length);
                    for (var i = this[e], r = 1, o = 0; ++o < t && (r *= 256);)i += this[e + o] * r;
                    return r *= 128, i >= r && (i -= Math.pow(2, 8 * t)), i
                }, a.prototype.readIntBE = function (e, t, n) {
                    e = 0 | e, t = 0 | t, n || I(e, t, this.length);
                    for (var i = t, r = 1, o = this[e + --i]; i > 0 && (r *= 256);)o += this[e + --i] * r;
                    return r *= 128, o >= r && (o -= Math.pow(2, 8 * t)), o
                }, a.prototype.readInt8 = function (e, t) {
                    return t || I(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                }, a.prototype.readInt16LE = function (e, t) {
                    t || I(e, 2, this.length);
                    var n = this[e] | this[e + 1] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, a.prototype.readInt16BE = function (e, t) {
                    t || I(e, 2, this.length);
                    var n = this[e + 1] | this[e] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, a.prototype.readInt32LE = function (e, t) {
                    return t || I(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
                }, a.prototype.readInt32BE = function (e, t) {
                    return t || I(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
                }, a.prototype.readFloatLE = function (e, t) {
                    return t || I(e, 4, this.length), Z.read(this, e, !0, 23, 4)
                }, a.prototype.readFloatBE = function (e, t) {
                    return t || I(e, 4, this.length), Z.read(this, e, !1, 23, 4)
                }, a.prototype.readDoubleLE = function (e, t) {
                    return t || I(e, 8, this.length), Z.read(this, e, !0, 52, 8)
                }, a.prototype.readDoubleBE = function (e, t) {
                    return t || I(e, 8, this.length), Z.read(this, e, !1, 52, 8)
                }, a.prototype.writeUIntLE = function (e, t, n, i) {
                    if (e = +e, t = 0 | t, n = 0 | n, !i) {
                        var r = Math.pow(2, 8 * n) - 1;
                        B(this, e, t, n, r, 0)
                    }
                    var o = 1, a = 0;
                    for (this[t] = 255 & e; ++a < n && (o *= 256);)this[t + a] = e / o & 255;
                    return t + n
                }, a.prototype.writeUIntBE = function (e, t, n, i) {
                    if (e = +e, t = 0 | t, n = 0 | n, !i) {
                        var r = Math.pow(2, 8 * n) - 1;
                        B(this, e, t, n, r, 0)
                    }
                    var o = n - 1, a = 1;
                    for (this[t + o] = 255 & e; --o >= 0 && (a *= 256);)this[t + o] = e / a & 255;
                    return t + n
                }, a.prototype.writeUInt8 = function (e, t, n) {
                    return e = +e, t = 0 | t, n || B(this, e, t, 1, 255, 0), a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
                }, a.prototype.writeUInt16LE = function (e, t, n) {
                    return e = +e, t = 0 | t, n || B(this, e, t, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : P(this, e, t, !0), t + 2
                }, a.prototype.writeUInt16BE = function (e, t, n) {
                    return e = +e, t = 0 | t, n || B(this, e, t, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : P(this, e, t, !1), t + 2
                }, a.prototype.writeUInt32LE = function (e, t, n) {
                    return e = +e, t = 0 | t, n || B(this, e, t, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : R(this, e, t, !0), t + 4
                }, a.prototype.writeUInt32BE = function (e, t, n) {
                    return e = +e, t = 0 | t, n || B(this, e, t, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : R(this, e, t, !1), t + 4
                }, a.prototype.writeIntLE = function (e, t, n, i) {
                    if (e = +e, t = 0 | t, !i) {
                        var r = Math.pow(2, 8 * n - 1);
                        B(this, e, t, n, r - 1, -r)
                    }
                    var o = 0, a = 1, s = 0;
                    for (this[t] = 255 & e; ++o < n && (a *= 256);)0 > e && 0 === s && 0 !== this[t + o - 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
                    return t + n
                }, a.prototype.writeIntBE = function (e, t, n, i) {
                    if (e = +e, t = 0 | t, !i) {
                        var r = Math.pow(2, 8 * n - 1);
                        B(this, e, t, n, r - 1, -r)
                    }
                    var o = n - 1, a = 1, s = 0;
                    for (this[t + o] = 255 & e; --o >= 0 && (a *= 256);)0 > e && 0 === s && 0 !== this[t + o + 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
                    return t + n
                }, a.prototype.writeInt8 = function (e, t, n) {
                    return e = +e, t = 0 | t, n || B(this, e, t, 1, 127, -128), a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), 0 > e && (e = 255 + e + 1), this[t] = 255 & e, t + 1
                }, a.prototype.writeInt16LE = function (e, t, n) {
                    return e = +e, t = 0 | t, n || B(this, e, t, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : P(this, e, t, !0), t + 2
                }, a.prototype.writeInt16BE = function (e, t, n) {
                    return e = +e, t = 0 | t, n || B(this, e, t, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : P(this, e, t, !1), t + 2
                }, a.prototype.writeInt32LE = function (e, t, n) {
                    return e = +e, t = 0 | t, n || B(this, e, t, 4, 2147483647, -2147483648), a.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : R(this, e, t, !0), t + 4
                }, a.prototype.writeInt32BE = function (e, t, n) {
                    return e = +e, t = 0 | t, n || B(this, e, t, 4, 2147483647, -2147483648), 0 > e && (e = 4294967295 + e + 1), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : R(this, e, t, !1), t + 4
                }, a.prototype.writeFloatLE = function (e, t, n) {
                    return W(this, e, t, !0, n)
                }, a.prototype.writeFloatBE = function (e, t, n) {
                    return W(this, e, t, !1, n)
                }, a.prototype.writeDoubleLE = function (e, t, n) {
                    return F(this, e, t, !0, n)
                }, a.prototype.writeDoubleBE = function (e, t, n) {
                    return F(this, e, t, !1, n)
                }, a.prototype.copy = function (e, t, n, i) {
                    if (n || (n = 0), i || 0 === i || (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && n > i && (i = n), i === n)return 0;
                    if (0 === e.length || 0 === this.length)return 0;
                    if (0 > t)throw new RangeError("targetStart out of bounds");
                    if (0 > n || n >= this.length)throw new RangeError("sourceStart out of bounds");
                    if (0 > i)throw new RangeError("sourceEnd out of bounds");
                    i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
                    var r, o = i - n;
                    if (this === e && t > n && i > t)for (r = o - 1; r >= 0; r--)e[r + t] = this[r + n]; else if (1e3 > o || !a.TYPED_ARRAY_SUPPORT)for (r = 0; o > r; r++)e[r + t] = this[r + n]; else Uint8Array.prototype.set.call(e, this.subarray(n, n + o), t);
                    return o
                }, a.prototype.fill = function (e, t, n, i) {
                    if ("string" == typeof e) {
                        if ("string" == typeof t ? (i = t, t = 0, n = this.length) : "string" == typeof n && (i = n, n = this.length), 1 === e.length) {
                            var r = e.charCodeAt(0);
                            256 > r && (e = r)
                        }
                        if (void 0 !== i && "string" != typeof i)throw new TypeError("encoding must be a string");
                        if ("string" == typeof i && !a.isEncoding(i))throw new TypeError("Unknown encoding: " + i)
                    } else"number" == typeof e && (e = 255 & e);
                    if (0 > t || this.length < t || this.length < n)throw new RangeError("Out of range index");
                    if (t >= n)return this;
                    t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0);
                    var o;
                    if ("number" == typeof e)for (o = t; n > o; o++)this[o] = e; else {
                        var s = a.isBuffer(e) ? e : $(new a(e, i).toString()), l = s.length;
                        for (o = 0; n - t > o; o++)this[o + t] = s[o % l]
                    }
                    return this
                };
                var ee = /[^+\/0-9A-Za-z-_]/g
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {"base64-js": 1, ieee754: 15, isarray: 16}],
        4: [function (e, t, n) {
            "use strict";
            function i(e) {
                return e = e || {}, "function" != typeof e.codeMirrorInstance || "function" != typeof e.codeMirrorInstance.defineMode ? void 0 : (String.prototype.includes || (String.prototype.includes = function () {
                    return -1 !== String.prototype.indexOf.apply(this, arguments)
                }), void e.codeMirrorInstance.defineMode("spell-checker", function (t) {
                    if (!i.aff_loading) {
                        i.aff_loading = !0;
                        var n = new XMLHttpRequest;
                        n.open("GET", "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.aff", !0), n.onload = function () {
                            4 === n.readyState && 200 === n.status && (i.aff_data = n.responseText, i.num_loaded++, 2 == i.num_loaded && (i.typo = new r("en_US", i.aff_data, i.dic_data, {platform: "any"})))
                        }, n.send(null)
                    }
                    if (!i.dic_loading) {
                        i.dic_loading = !0;
                        var o = new XMLHttpRequest;
                        o.open("GET", "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.dic", !0), o.onload = function () {
                            4 === o.readyState && 200 === o.status && (i.dic_data = o.responseText, i.num_loaded++, 2 == i.num_loaded && (i.typo = new r("en_US", i.aff_data, i.dic_data, {platform: "any"})))
                        }, o.send(null)
                    }
                    var a = '!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ ', s = {
                        token: function (e) {
                            var t = e.peek(), n = "";
                            if (a.includes(t))return e.next(), null;
                            for (; null != (t = e.peek()) && !a.includes(t);)n += t, e.next();
                            return i.typo && !i.typo.check(n) ? "spell-error" : null
                        }
                    }, l = e.codeMirrorInstance.getMode(t, t.backdrop || "text/plain");
                    return e.codeMirrorInstance.overlayMode(l, s, !0)
                }))
            }

            var r = e("typo-js");
            i.num_loaded = 0, i.aff_loading = !1, i.dic_loading = !1, i.aff_data = "", i.dic_data = "", i.typo, t.exports = i
        }, {"typo-js": 18}],
        5: [function (t, n, i) {
            !function (r) {
                "object" == typeof i && "object" == typeof n ? r(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], r) : r(CodeMirror)
            }(function (e) {
                "use strict";
                function t(e) {
                    var t = e.getWrapperElement();
                    e.state.fullScreenRestore = {
                        scrollTop: window.pageYOffset,
                        scrollLeft: window.pageXOffset,
                        width: t.style.width,
                        height: t.style.height
                    }, t.style.width = "", t.style.height = "auto", t.className += " CodeMirror-fullscreen", document.documentElement.style.overflow = "hidden", e.refresh()
                }

                function n(e) {
                    var t = e.getWrapperElement();
                    t.className = t.className.replace(/\s*CodeMirror-fullscreen\b/, ""), document.documentElement.style.overflow = "";
                    var n = e.state.fullScreenRestore;
                    t.style.width = n.width, t.style.height = n.height, window.scrollTo(n.scrollLeft, n.scrollTop), e.refresh()
                }

                e.defineOption("fullScreen", !1, function (i, r, o) {
                    o == e.Init && (o = !1), !o != !r && (r ? t(i) : n(i))
                })
            })
        }, {"../../lib/codemirror": 10}],
        6: [function (t, n, i) {
            !function (r) {
                "object" == typeof i && "object" == typeof n ? r(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], r) : r(CodeMirror)
            }(function (e) {
                function t(e) {
                    e.state.placeholder && (e.state.placeholder.parentNode.removeChild(e.state.placeholder), e.state.placeholder = null)
                }

                function n(e) {
                    t(e);
                    var n = e.state.placeholder = document.createElement("pre");
                    n.style.cssText = "height: 0; overflow: visible", n.className = "CodeMirror-placeholder";
                    var i = e.getOption("placeholder");
                    "string" == typeof i && (i = document.createTextNode(i)), n.appendChild(i), e.display.lineSpace.insertBefore(n, e.display.lineSpace.firstChild)
                }

                function i(e) {
                    o(e) && n(e)
                }

                function r(e) {
                    var i = e.getWrapperElement(), r = o(e);
                    i.className = i.className.replace(" CodeMirror-empty", "") + (r ? " CodeMirror-empty" : ""), r ? n(e) : t(e)
                }

                function o(e) {
                    return 1 === e.lineCount() && "" === e.getLine(0)
                }

                e.defineOption("placeholder", "", function (n, o, a) {
                    var s = a && a != e.Init;
                    if (o && !s)n.on("blur", i), n.on("change", r), n.on("swapDoc", r), r(n); else if (!o && s) {
                        n.off("blur", i), n.off("change", r), n.off("swapDoc", r), t(n);
                        var l = n.getWrapperElement();
                        l.className = l.className.replace(" CodeMirror-empty", "")
                    }
                    o && !n.hasFocus() && i(n)
                })
            })
        }, {"../../lib/codemirror": 10}],
        7: [function (t, n, i) {
            !function (r) {
                "object" == typeof i && "object" == typeof n ? r(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], r) : r(CodeMirror)
            }(function (e) {
                "use strict";
                var t = /^(\s*)(>[> ]*|[*+-]\s|(\d+)([.)]))(\s*)/, n = /^(\s*)(>[> ]*|[*+-]|(\d+)[.)])(\s*)$/, i = /[*+-]\s/;
                e.commands.newlineAndIndentContinueMarkdownList = function (r) {
                    if (r.getOption("disableInput"))return e.Pass;
                    for (var o = r.listSelections(), a = [], s = 0; s < o.length; s++) {
                        var l = o[s].head, c = r.getStateAfter(l.line), u = c.list !== !1, d = 0 !== c.quote, h = r.getLine(l.line), f = t.exec(h);
                        if (!o[s].empty() || !u && !d || !f)return void r.execCommand("newlineAndIndent");
                        if (n.test(h))r.replaceRange("", {line: l.line, ch: 0}, {
                            line: l.line,
                            ch: l.ch + 1
                        }), a[s] = "\n"; else {
                            var p = f[1], m = f[5], g = i.test(f[2]) || f[2].indexOf(">") >= 0 ? f[2] : parseInt(f[3], 10) + 1 + f[4];
                            a[s] = "\n" + p + g + m
                        }
                    }
                    r.replaceSelections(a)
                }
            })
        }, {"../../lib/codemirror": 10}],
        8: [function (t, n, i) {
            !function (r) {
                "object" == typeof i && "object" == typeof n ? r(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], r) : r(CodeMirror)
            }(function (e) {
                "use strict";
                e.overlayMode = function (t, n, i) {
                    return {
                        startState: function () {
                            return {
                                base: e.startState(t),
                                overlay: e.startState(n),
                                basePos: 0,
                                baseCur: null,
                                overlayPos: 0,
                                overlayCur: null,
                                streamSeen: null
                            }
                        }, copyState: function (i) {
                            return {
                                base: e.copyState(t, i.base),
                                overlay: e.copyState(n, i.overlay),
                                basePos: i.basePos,
                                baseCur: null,
                                overlayPos: i.overlayPos,
                                overlayCur: null
                            }
                        }, token: function (e, r) {
                            return (e != r.streamSeen || Math.min(r.basePos, r.overlayPos) < e.start) && (r.streamSeen = e, r.basePos = r.overlayPos = e.start), e.start == r.basePos && (r.baseCur = t.token(e, r.base), r.basePos = e.pos), e.start == r.overlayPos && (e.pos = e.start, r.overlayCur = n.token(e, r.overlay), r.overlayPos = e.pos), e.pos = Math.min(r.basePos, r.overlayPos), null == r.overlayCur ? r.baseCur : null != r.baseCur && r.overlay.combineTokens || i && null == r.overlay.combineTokens ? r.baseCur + " " + r.overlayCur : r.overlayCur
                        }, indent: t.indent && function (e, n) {
                            return t.indent(e.base, n)
                        }, electricChars: t.electricChars, innerMode: function (e) {
                            return {state: e.base, mode: t}
                        }, blankLine: function (e) {
                            t.blankLine && t.blankLine(e.base), n.blankLine && n.blankLine(e.overlay)
                        }
                    }
                }
            })
        }, {"../../lib/codemirror": 10}],
        9: [function (t, n, i) {
            !function (r) {
                "object" == typeof i && "object" == typeof n ? r(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], r) : r(CodeMirror)
            }(function (e) {
                "use strict";
                function t(e) {
                    e.operation(function () {
                        a(e)
                    })
                }

                function n(e) {
                    e.state.markedSelection.length && e.operation(function () {
                        r(e)
                    })
                }

                function i(e, t, n, i) {
                    if (0 != c(t, n))for (var r = e.state.markedSelection, o = e.state.markedSelectionStyle, a = t.line; ;) {
                        var u = a == t.line ? t : l(a, 0), d = a + s, h = d >= n.line, f = h ? n : l(d, 0), p = e.markText(u, f, {className: o});
                        if (null == i ? r.push(p) : r.splice(i++, 0, p), h)break;
                        a = d
                    }
                }

                function r(e) {
                    for (var t = e.state.markedSelection, n = 0; n < t.length; ++n)t[n].clear();
                    t.length = 0
                }

                function o(e) {
                    r(e);
                    for (var t = e.listSelections(), n = 0; n < t.length; n++)i(e, t[n].from(), t[n].to())
                }

                function a(e) {
                    if (!e.somethingSelected())return r(e);
                    if (e.listSelections().length > 1)return o(e);
                    var t = e.getCursor("start"), n = e.getCursor("end"), a = e.state.markedSelection;
                    if (!a.length)return i(e, t, n);
                    var l = a[0].find(), u = a[a.length - 1].find();
                    if (!l || !u || n.line - t.line < s || c(t, u.to) >= 0 || c(n, l.from) <= 0)return o(e);
                    for (; c(t, l.from) > 0;)a.shift().clear(), l = a[0].find();
                    for (c(t, l.from) < 0 && (l.to.line - t.line < s ? (a.shift().clear(), i(e, t, l.to, 0)) : i(e, t, l.from, 0)); c(n, u.to) < 0;)a.pop().clear(), u = a[a.length - 1].find();
                    c(n, u.to) > 0 && (n.line - u.from.line < s ? (a.pop().clear(), i(e, u.from, n)) : i(e, u.to, n))
                }

                e.defineOption("styleSelectedText", !1, function (i, a, s) {
                    var l = s && s != e.Init;
                    a && !l ? (i.state.markedSelection = [], i.state.markedSelectionStyle = "string" == typeof a ? a : "CodeMirror-selectedtext", o(i), i.on("cursorActivity", t), i.on("change", n)) : !a && l && (i.off("cursorActivity", t), i.off("change", n), r(i), i.state.markedSelection = i.state.markedSelectionStyle = null)
                });
                var s = 8, l = e.Pos, c = e.cmpPos
            })
        }, {"../../lib/codemirror": 10}],
        10: [function (t, n, i) {
            !function (t) {
                if ("object" == typeof i && "object" == typeof n)n.exports = t(); else {
                    if ("function" == typeof e && e.amd)return e([], t);
                    (this || window).CodeMirror = t()
                }
            }(function () {
                "use strict";
                function e(n, i) {
                    if (!(this instanceof e))return new e(n, i);
                    this.options = i = i ? Rr(i) : {}, Rr(ea, i, !1), f(i);
                    var r = i.value;
                    "string" == typeof r && (r = new Sa(r, i.mode, null, i.lineSeparator)), this.doc = r;
                    var o = new e.inputStyles[i.inputStyle](this), a = this.display = new t(n, r, o);
                    a.wrapper.CodeMirror = this, c(this), s(this), i.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), i.autofocus && !No && a.input.focus(), v(this), this.state = {
                        keyMaps: [],
                        overlays: [],
                        modeGen: 0,
                        overwrite: !1,
                        delayingBlurEvent: !1,
                        focused: !1,
                        suppressEdits: !1,
                        pasteIncoming: !1,
                        cutIncoming: !1,
                        selectingText: !1,
                        draggingText: !1,
                        highlight: new Ar,
                        keySeq: null,
                        specialChars: null
                    };
                    var l = this;
                    bo && 11 > xo && setTimeout(function () {
                        l.display.input.reset(!0)
                    }, 20), jt(this), Kr(), xt(this), this.curOp.forceUpdate = !0, Xi(this, r), i.autofocus && !No || l.hasFocus() ? setTimeout(Hr(vn, this), 20) : yn(this);
                    for (var u in ta)ta.hasOwnProperty(u) && ta[u](this, i[u], na);
                    k(this), i.finishInit && i.finishInit(this);
                    for (var d = 0; d < aa.length; ++d)aa[d](this);
                    kt(this), wo && i.lineWrapping && "optimizelegibility" == getComputedStyle(a.lineDiv).textRendering && (a.lineDiv.style.textRendering = "auto")
                }

                function t(e, t, n) {
                    var i = this;
                    this.input = n, i.scrollbarFiller = jr("div", null, "CodeMirror-scrollbar-filler"), i.scrollbarFiller.setAttribute("cm-not-content", "true"), i.gutterFiller = jr("div", null, "CodeMirror-gutter-filler"), i.gutterFiller.setAttribute("cm-not-content", "true"), i.lineDiv = jr("div", null, "CodeMirror-code"), i.selectionDiv = jr("div", null, null, "position: relative; z-index: 1"), i.cursorDiv = jr("div", null, "CodeMirror-cursors"), i.measure = jr("div", null, "CodeMirror-measure"), i.lineMeasure = jr("div", null, "CodeMirror-measure"), i.lineSpace = jr("div", [i.measure, i.lineMeasure, i.selectionDiv, i.cursorDiv, i.lineDiv], null, "position: relative; outline: none"), i.mover = jr("div", [jr("div", [i.lineSpace], "CodeMirror-lines")], null, "position: relative"), i.sizer = jr("div", [i.mover], "CodeMirror-sizer"), i.sizerWidth = null, i.heightForcer = jr("div", null, null, "position: absolute; height: " + Ba + "px; width: 1px;"), i.gutters = jr("div", null, "CodeMirror-gutters"), i.lineGutter = null, i.scroller = jr("div", [i.sizer, i.heightForcer, i.gutters], "CodeMirror-scroll"), i.scroller.setAttribute("tabIndex", "-1"), i.wrapper = jr("div", [i.scrollbarFiller, i.gutterFiller, i.scroller], "CodeMirror"), bo && 8 > xo && (i.gutters.style.zIndex = -1, i.scroller.style.paddingRight = 0), wo || go && No || (i.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(i.wrapper) : e(i.wrapper)), i.viewFrom = i.viewTo = t.first, i.reportedViewFrom = i.reportedViewTo = t.first, i.view = [], i.renderedView = null, i.externalMeasured = null, i.viewOffset = 0, i.lastWrapHeight = i.lastWrapWidth = 0, i.updateLineNumbers = null, i.nativeBarWidth = i.barHeight = i.barWidth = 0, i.scrollbarsClipped = !1, i.lineNumWidth = i.lineNumInnerWidth = i.lineNumChars = null, i.alignWidgets = !1, i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null, i.maxLine = null, i.maxLineLength = 0, i.maxLineChanged = !1, i.wheelDX = i.wheelDY = i.wheelStartX = i.wheelStartY = null,
                        i.shift = !1, i.selForContextMenu = null, i.activeTouch = null, n.init(i)
                }

                function n(t) {
                    t.doc.mode = e.getMode(t.options, t.doc.modeOption), i(t)
                }

                function i(e) {
                    e.doc.iter(function (e) {
                        e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
                    }), e.doc.frontier = e.doc.first, We(e, 100), e.state.modeGen++, e.curOp && Bt(e)
                }

                function r(e) {
                    e.options.lineWrapping ? (Ja(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (Za(e.display.wrapper, "CodeMirror-wrap"), h(e)), a(e), Bt(e), st(e), setTimeout(function () {
                        y(e)
                    }, 100)
                }

                function o(e) {
                    var t = yt(e.display), n = e.options.lineWrapping, i = n && Math.max(5, e.display.scroller.clientWidth / bt(e.display) - 3);
                    return function (r) {
                        if (ki(e.doc, r))return 0;
                        var o = 0;
                        if (r.widgets)for (var a = 0; a < r.widgets.length; a++)r.widgets[a].height && (o += r.widgets[a].height);
                        return n ? o + (Math.ceil(r.text.length / i) || 1) * t : o + t
                    }
                }

                function a(e) {
                    var t = e.doc, n = o(e);
                    t.iter(function (e) {
                        var t = n(e);
                        t != e.height && er(e, t)
                    })
                }

                function s(e) {
                    e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), st(e)
                }

                function l(e) {
                    c(e), Bt(e), setTimeout(function () {
                        w(e)
                    }, 20)
                }

                function c(e) {
                    var t = e.display.gutters, n = e.options.gutters;
                    Ur(t);
                    for (var i = 0; i < n.length; ++i) {
                        var r = n[i], o = t.appendChild(jr("div", null, "CodeMirror-gutter " + r));
                        "CodeMirror-linenumbers" == r && (e.display.lineGutter = o, o.style.width = (e.display.lineNumWidth || 1) + "px")
                    }
                    t.style.display = i ? "" : "none", u(e)
                }

                function u(e) {
                    var t = e.display.gutters.offsetWidth;
                    e.display.sizer.style.marginLeft = t + "px"
                }

                function d(e) {
                    if (0 == e.height)return 0;
                    for (var t, n = e.text.length, i = e; t = mi(i);) {
                        var r = t.find(0, !0);
                        i = r.from.line, n += r.from.ch - r.to.ch
                    }
                    for (i = e; t = gi(i);) {
                        var r = t.find(0, !0);
                        n -= i.text.length - r.from.ch, i = r.to.line, n += i.text.length - r.to.ch
                    }
                    return n
                }

                function h(e) {
                    var t = e.display, n = e.doc;
                    t.maxLine = Zi(n, n.first), t.maxLineLength = d(t.maxLine), t.maxLineChanged = !0, n.iter(function (e) {
                        var n = d(e);
                        n > t.maxLineLength && (t.maxLineLength = n, t.maxLine = e)
                    })
                }

                function f(e) {
                    var t = Or(e.gutters, "CodeMirror-linenumbers");
                    -1 == t && e.lineNumbers ? e.gutters = e.gutters.concat(["CodeMirror-linenumbers"]) : t > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0), e.gutters.splice(t, 1))
                }

                function p(e) {
                    var t = e.display, n = t.gutters.offsetWidth, i = Math.round(e.doc.height + $e(e.display));
                    return {
                        clientHeight: t.scroller.clientHeight,
                        viewHeight: t.wrapper.clientHeight,
                        scrollWidth: t.scroller.scrollWidth,
                        clientWidth: t.scroller.clientWidth,
                        viewWidth: t.wrapper.clientWidth,
                        barLeft: e.options.fixedGutter ? n : 0,
                        docHeight: i,
                        scrollHeight: i + Ge(e) + t.barHeight,
                        nativeBarWidth: t.nativeBarWidth,
                        gutterWidth: n
                    }
                }

                function m(e, t, n) {
                    this.cm = n;
                    var i = this.vert = jr("div", [jr("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), r = this.horiz = jr("div", [jr("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
                    e(i), e(r), Aa(i, "scroll", function () {
                        i.clientHeight && t(i.scrollTop, "vertical")
                    }), Aa(r, "scroll", function () {
                        r.clientWidth && t(r.scrollLeft, "horizontal")
                    }), this.checkedZeroWidth = !1, bo && 8 > xo && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
                }

                function g() {
                }

                function v(t) {
                    t.display.scrollbars && (t.display.scrollbars.clear(), t.display.scrollbars.addClass && Za(t.display.wrapper, t.display.scrollbars.addClass)), t.display.scrollbars = new e.scrollbarModel[t.options.scrollbarStyle](function (e) {
                        t.display.wrapper.insertBefore(e, t.display.scrollbarFiller), Aa(e, "mousedown", function () {
                            t.state.focused && setTimeout(function () {
                                t.display.input.focus()
                            }, 0)
                        }), e.setAttribute("cm-not-content", "true")
                    }, function (e, n) {
                        "horizontal" == n ? on(t, e) : rn(t, e)
                    }, t), t.display.scrollbars.addClass && Ja(t.display.wrapper, t.display.scrollbars.addClass)
                }

                function y(e, t) {
                    t || (t = p(e));
                    var n = e.display.barWidth, i = e.display.barHeight;
                    b(e, t);
                    for (var r = 0; 4 > r && n != e.display.barWidth || i != e.display.barHeight; r++)n != e.display.barWidth && e.options.lineWrapping && D(e), b(e, p(e)), n = e.display.barWidth, i = e.display.barHeight
                }

                function b(e, t) {
                    var n = e.display, i = n.scrollbars.update(t);
                    n.sizer.style.paddingRight = (n.barWidth = i.right) + "px", n.sizer.style.paddingBottom = (n.barHeight = i.bottom) + "px", n.heightForcer.style.borderBottom = i.bottom + "px solid transparent", i.right && i.bottom ? (n.scrollbarFiller.style.display = "block", n.scrollbarFiller.style.height = i.bottom + "px", n.scrollbarFiller.style.width = i.right + "px") : n.scrollbarFiller.style.display = "", i.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block", n.gutterFiller.style.height = i.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = ""
                }

                function x(e, t, n) {
                    var i = n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop;
                    i = Math.floor(i - Ue(e));
                    var r = n && null != n.bottom ? n.bottom : i + e.wrapper.clientHeight, o = nr(t, i), a = nr(t, r);
                    if (n && n.ensure) {
                        var s = n.ensure.from.line, l = n.ensure.to.line;
                        o > s ? (o = s, a = nr(t, ir(Zi(t, s)) + e.wrapper.clientHeight)) : Math.min(l, t.lastLine()) >= a && (o = nr(t, ir(Zi(t, l)) - e.wrapper.clientHeight), a = l)
                    }
                    return {from: o, to: Math.max(a, o + 1)}
                }

                function w(e) {
                    var t = e.display, n = t.view;
                    if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
                        for (var i = S(t) - t.scroller.scrollLeft + e.doc.scrollLeft, r = t.gutters.offsetWidth, o = i + "px", a = 0; a < n.length; a++)if (!n[a].hidden) {
                            e.options.fixedGutter && n[a].gutter && (n[a].gutter.style.left = o);
                            var s = n[a].alignable;
                            if (s)for (var l = 0; l < s.length; l++)s[l].style.left = o
                        }
                        e.options.fixedGutter && (t.gutters.style.left = i + r + "px")
                    }
                }

                function k(e) {
                    if (!e.options.lineNumbers)return !1;
                    var t = e.doc, n = C(e.options, t.first + t.size - 1), i = e.display;
                    if (n.length != i.lineNumChars) {
                        var r = i.measure.appendChild(jr("div", [jr("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt")), o = r.firstChild.offsetWidth, a = r.offsetWidth - o;
                        return i.lineGutter.style.width = "", i.lineNumInnerWidth = Math.max(o, i.lineGutter.offsetWidth - a) + 1, i.lineNumWidth = i.lineNumInnerWidth + a, i.lineNumChars = i.lineNumInnerWidth ? n.length : -1, i.lineGutter.style.width = i.lineNumWidth + "px", u(e), !0
                    }
                    return !1
                }

                function C(e, t) {
                    return String(e.lineNumberFormatter(t + e.firstLineNumber))
                }

                function S(e) {
                    return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
                }

                function L(e, t, n) {
                    var i = e.display;
                    this.viewport = t, this.visible = x(i, e.doc, t), this.editorIsHidden = !i.wrapper.offsetWidth, this.wrapperHeight = i.wrapper.clientHeight, this.wrapperWidth = i.wrapper.clientWidth, this.oldDisplayWidth = Ve(e), this.force = n, this.dims = O(e), this.events = []
                }

                function T(e) {
                    var t = e.display;
                    !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Ge(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Ge(e) + "px", t.scrollbarsClipped = !0)
                }

                function M(e, t) {
                    var n = e.display, i = e.doc;
                    if (t.editorIsHidden)return Rt(e), !1;
                    if (!t.force && t.visible.from >= n.viewFrom && t.visible.to <= n.viewTo && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && 0 == zt(e))return !1;
                    k(e) && (Rt(e), t.dims = O(e));
                    var r = i.first + i.size, o = Math.max(t.visible.from - e.options.viewportMargin, i.first), a = Math.min(r, t.visible.to + e.options.viewportMargin);
                    n.viewFrom < o && o - n.viewFrom < 20 && (o = Math.max(i.first, n.viewFrom)), n.viewTo > a && n.viewTo - a < 20 && (a = Math.min(r, n.viewTo)), Ro && (o = xi(e.doc, o), a = wi(e.doc, a));
                    var s = o != n.viewFrom || a != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth;
                    Ft(e, o, a), n.viewOffset = ir(Zi(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px";
                    var l = zt(e);
                    if (!s && 0 == l && !t.force && n.renderedView == n.view && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo))return !1;
                    var c = qr();
                    return l > 4 && (n.lineDiv.style.display = "none"), I(e, n.updateLineNumbers, t.dims), l > 4 && (n.lineDiv.style.display = ""), n.renderedView = n.view, c && qr() != c && c.offsetHeight && c.focus(), Ur(n.cursorDiv), Ur(n.selectionDiv), n.gutters.style.height = n.sizer.style.minHeight = 0, s && (n.lastWrapHeight = t.wrapperHeight, n.lastWrapWidth = t.wrapperWidth, We(e, 400)), n.updateLineNumbers = null, !0
                }

                function _(e, t) {
                    for (var n = t.viewport, i = !0; (i && e.options.lineWrapping && t.oldDisplayWidth != Ve(e) || (n && null != n.top && (n = {top: Math.min(e.doc.height + $e(e.display) - Ye(e), n.top)}), t.visible = x(e.display, e.doc, n), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && M(e, t); i = !1) {
                        D(e);
                        var r = p(e);
                        Ie(e), y(e, r), A(e, r)
                    }
                    t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo)
                }

                function N(e, t) {
                    var n = new L(e, t);
                    if (M(e, n)) {
                        D(e), _(e, n);
                        var i = p(e);
                        Ie(e), y(e, i), A(e, i), n.finish()
                    }
                }

                function A(e, t) {
                    e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + Ge(e) + "px"
                }

                function D(e) {
                    for (var t = e.display, n = t.lineDiv.offsetTop, i = 0; i < t.view.length; i++) {
                        var r, o = t.view[i];
                        if (!o.hidden) {
                            if (bo && 8 > xo) {
                                var a = o.node.offsetTop + o.node.offsetHeight;
                                r = a - n, n = a
                            } else {
                                var s = o.node.getBoundingClientRect();
                                r = s.bottom - s.top
                            }
                            var l = o.line.height - r;
                            if (2 > r && (r = yt(t)), (l > .001 || -.001 > l) && (er(o.line, r), E(o.line), o.rest))for (var c = 0; c < o.rest.length; c++)E(o.rest[c])
                        }
                    }
                }

                function E(e) {
                    if (e.widgets)for (var t = 0; t < e.widgets.length; ++t)e.widgets[t].height = e.widgets[t].node.parentNode.offsetHeight
                }

                function O(e) {
                    for (var t = e.display, n = {}, i = {}, r = t.gutters.clientLeft, o = t.gutters.firstChild, a = 0; o; o = o.nextSibling, ++a)n[e.options.gutters[a]] = o.offsetLeft + o.clientLeft + r, i[e.options.gutters[a]] = o.clientWidth;
                    return {
                        fixedPos: S(t),
                        gutterTotalWidth: t.gutters.offsetWidth,
                        gutterLeft: n,
                        gutterWidth: i,
                        wrapperWidth: t.wrapper.clientWidth
                    }
                }

                function I(e, t, n) {
                    function i(t) {
                        var n = t.nextSibling;
                        return wo && Ao && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), n
                    }

                    for (var r = e.display, o = e.options.lineNumbers, a = r.lineDiv, s = a.firstChild, l = r.view, c = r.viewFrom, u = 0; u < l.length; u++) {
                        var d = l[u];
                        if (d.hidden); else if (d.node && d.node.parentNode == a) {
                            for (; s != d.node;)s = i(s);
                            var h = o && null != t && c >= t && d.lineNumber;
                            d.changes && (Or(d.changes, "gutter") > -1 && (h = !1), B(e, d, c, n)), h && (Ur(d.lineNumber), d.lineNumber.appendChild(document.createTextNode(C(e.options, c)))), s = d.node.nextSibling
                        } else {
                            var f = U(e, d, c, n);
                            a.insertBefore(f, s)
                        }
                        c += d.size
                    }
                    for (; s;)s = i(s)
                }

                function B(e, t, n, i) {
                    for (var r = 0; r < t.changes.length; r++) {
                        var o = t.changes[r];
                        "text" == o ? W(e, t) : "gutter" == o ? z(e, t, n, i) : "class" == o ? F(t) : "widget" == o && j(e, t, i)
                    }
                    t.changes = null
                }

                function P(e) {
                    return e.node == e.text && (e.node = jr("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), bo && 8 > xo && (e.node.style.zIndex = 2)), e.node
                }

                function R(e) {
                    var t = e.bgClass ? e.bgClass + " " + (e.line.bgClass || "") : e.line.bgClass;
                    if (t && (t += " CodeMirror-linebackground"), e.background)t ? e.background.className = t : (e.background.parentNode.removeChild(e.background), e.background = null); else if (t) {
                        var n = P(e);
                        e.background = n.insertBefore(jr("div", null, t), n.firstChild)
                    }
                }

                function H(e, t) {
                    var n = e.display.externalMeasured;
                    return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure, n.built) : Hi(e, t)
                }

                function W(e, t) {
                    var n = t.text.className, i = H(e, t);
                    t.text == t.node && (t.node = i.pre), t.text.parentNode.replaceChild(i.pre, t.text), t.text = i.pre, i.bgClass != t.bgClass || i.textClass != t.textClass ? (t.bgClass = i.bgClass, t.textClass = i.textClass, F(t)) : n && (t.text.className = n)
                }

                function F(e) {
                    R(e), e.line.wrapClass ? P(e).className = e.line.wrapClass : e.node != e.text && (e.node.className = "");
                    var t = e.textClass ? e.textClass + " " + (e.line.textClass || "") : e.line.textClass;
                    e.text.className = t || ""
                }

                function z(e, t, n, i) {
                    if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
                        var r = P(t);
                        t.gutterBackground = jr("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) + "px; width: " + i.gutterTotalWidth + "px"), r.insertBefore(t.gutterBackground, t.text)
                    }
                    var o = t.line.gutterMarkers;
                    if (e.options.lineNumbers || o) {
                        var r = P(t), a = t.gutter = jr("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) + "px");
                        if (e.display.input.setUneditable(a), r.insertBefore(a, t.text), t.line.gutterClass && (a.className += " " + t.line.gutterClass), !e.options.lineNumbers || o && o["CodeMirror-linenumbers"] || (t.lineNumber = a.appendChild(jr("div", C(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + i.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), o)for (var s = 0; s < e.options.gutters.length; ++s) {
                            var l = e.options.gutters[s], c = o.hasOwnProperty(l) && o[l];
                            c && a.appendChild(jr("div", [c], "CodeMirror-gutter-elt", "left: " + i.gutterLeft[l] + "px; width: " + i.gutterWidth[l] + "px"))
                        }
                    }
                }

                function j(e, t, n) {
                    t.alignable && (t.alignable = null);
                    for (var i, r = t.node.firstChild; r; r = i) {
                        var i = r.nextSibling;
                        "CodeMirror-linewidget" == r.className && t.node.removeChild(r)
                    }
                    $(e, t, n)
                }

                function U(e, t, n, i) {
                    var r = H(e, t);
                    return t.text = t.node = r.pre, r.bgClass && (t.bgClass = r.bgClass), r.textClass && (t.textClass = r.textClass), F(t), z(e, t, n, i), $(e, t, i), t.node
                }

                function $(e, t, n) {
                    if (q(e, t.line, t, n, !0), t.rest)for (var i = 0; i < t.rest.length; i++)q(e, t.rest[i], t, n, !1)
                }

                function q(e, t, n, i, r) {
                    if (t.widgets)for (var o = P(n), a = 0, s = t.widgets; a < s.length; ++a) {
                        var l = s[a], c = jr("div", [l.node], "CodeMirror-linewidget");
                        l.handleMouseEvents || c.setAttribute("cm-ignore-events", "true"), G(l, c, n, i), e.display.input.setUneditable(c), r && l.above ? o.insertBefore(c, n.gutter || n.text) : o.appendChild(c), Sr(l, "redraw")
                    }
                }

                function G(e, t, n, i) {
                    if (e.noHScroll) {
                        (n.alignable || (n.alignable = [])).push(t);
                        var r = i.wrapperWidth;
                        t.style.left = i.fixedPos + "px", e.coverGutter || (r -= i.gutterTotalWidth, t.style.paddingLeft = i.gutterTotalWidth + "px"), t.style.width = r + "px"
                    }
                    e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -i.gutterTotalWidth + "px"))
                }

                function V(e) {
                    return Ho(e.line, e.ch)
                }

                function Y(e, t) {
                    return Wo(e, t) < 0 ? t : e
                }

                function K(e, t) {
                    return Wo(e, t) < 0 ? e : t
                }

                function X(e) {
                    e.state.focused || (e.display.input.focus(), vn(e))
                }

                function Z(e, t, n, i, r) {
                    var o = e.doc;
                    e.display.shift = !1, i || (i = o.sel);
                    var a = e.state.pasteIncoming || "paste" == r, s = o.splitLines(t), l = null;
                    if (a && i.ranges.length > 1)if (Fo && Fo.text.join("\n") == t) {
                        if (i.ranges.length % Fo.text.length == 0) {
                            l = [];
                            for (var c = 0; c < Fo.text.length; c++)l.push(o.splitLines(Fo.text[c]))
                        }
                    } else s.length == i.ranges.length && (l = Ir(s, function (e) {
                        return [e]
                    }));
                    for (var c = i.ranges.length - 1; c >= 0; c--) {
                        var u = i.ranges[c], d = u.from(), h = u.to();
                        u.empty() && (n && n > 0 ? d = Ho(d.line, d.ch - n) : e.state.overwrite && !a ? h = Ho(h.line, Math.min(Zi(o, h.line).text.length, h.ch + Er(s).length)) : Fo && Fo.lineWise && Fo.text.join("\n") == t && (d = h = Ho(d.line, 0)));
                        var f = e.curOp.updateInput, p = {
                            from: d,
                            to: h,
                            text: l ? l[c % l.length] : s,
                            origin: r || (a ? "paste" : e.state.cutIncoming ? "cut" : "+input")
                        };
                        Tn(e.doc, p), Sr(e, "inputRead", e, p)
                    }
                    t && !a && Q(e, t), Hn(e), e.curOp.updateInput = f, e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = !1
                }

                function J(e, t) {
                    var n = e.clipboardData && e.clipboardData.getData("text/plain");
                    return n ? (e.preventDefault(), t.isReadOnly() || t.options.disableInput || Nt(t, function () {
                        Z(t, n, 0, null, "paste")
                    }), !0) : void 0
                }

                function Q(e, t) {
                    if (e.options.electricChars && e.options.smartIndent)for (var n = e.doc.sel, i = n.ranges.length - 1; i >= 0; i--) {
                        var r = n.ranges[i];
                        if (!(r.head.ch > 100 || i && n.ranges[i - 1].head.line == r.head.line)) {
                            var o = e.getModeAt(r.head), a = !1;
                            if (o.electricChars) {
                                for (var s = 0; s < o.electricChars.length; s++)if (t.indexOf(o.electricChars.charAt(s)) > -1) {
                                    a = Fn(e, r.head.line, "smart");
                                    break
                                }
                            } else o.electricInput && o.electricInput.test(Zi(e.doc, r.head.line).text.slice(0, r.head.ch)) && (a = Fn(e, r.head.line, "smart"));
                            a && Sr(e, "electricInput", e, r.head.line)
                        }
                    }
                }

                function ee(e) {
                    for (var t = [], n = [], i = 0; i < e.doc.sel.ranges.length; i++) {
                        var r = e.doc.sel.ranges[i].head.line, o = {anchor: Ho(r, 0), head: Ho(r + 1, 0)};
                        n.push(o), t.push(e.getRange(o.anchor, o.head))
                    }
                    return {text: t, ranges: n}
                }

                function te(e) {
                    e.setAttribute("autocorrect", "off"), e.setAttribute("autocapitalize", "off"), e.setAttribute("spellcheck", "false")
                }

                function ne(e) {
                    this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new Ar, this.inaccurateSelection = !1, this.hasSelection = !1, this.composing = null
                }

                function ie() {
                    var e = jr("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none"), t = jr("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
                    return wo ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), _o && (e.style.border = "1px solid black"), te(e), t
                }

                function re(e) {
                    this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new Ar, this.gracePeriod = !1
                }

                function oe(e, t) {
                    var n = Qe(e, t.line);
                    if (!n || n.hidden)return null;
                    var i = Zi(e.doc, t.line), r = Xe(n, i, t.line), o = rr(i), a = "left";
                    if (o) {
                        var s = co(o, t.ch);
                        a = s % 2 ? "right" : "left"
                    }
                    var l = nt(r.map, t.ch, a);
                    return l.offset = "right" == l.collapse ? l.end : l.start, l
                }

                function ae(e, t) {
                    return t && (e.bad = !0), e
                }

                function se(e, t, n) {
                    var i;
                    if (t == e.display.lineDiv) {
                        if (i = e.display.lineDiv.childNodes[n], !i)return ae(e.clipPos(Ho(e.display.viewTo - 1)), !0);
                        t = null, n = 0
                    } else for (i = t; ; i = i.parentNode) {
                        if (!i || i == e.display.lineDiv)return null;
                        if (i.parentNode && i.parentNode == e.display.lineDiv)break
                    }
                    for (var r = 0; r < e.display.view.length; r++) {
                        var o = e.display.view[r];
                        if (o.node == i)return le(o, t, n)
                    }
                }

                function le(e, t, n) {
                    function i(t, n, i) {
                        for (var r = -1; r < (u ? u.length : 0); r++)for (var o = 0 > r ? c.map : u[r], a = 0; a < o.length; a += 3) {
                            var s = o[a + 2];
                            if (s == t || s == n) {
                                var l = tr(0 > r ? e.line : e.rest[r]), d = o[a] + i;
                                return (0 > i || s != t) && (d = o[a + (i ? 1 : 0)]), Ho(l, d)
                            }
                        }
                    }

                    var r = e.text.firstChild, o = !1;
                    if (!t || !Ya(r, t))return ae(Ho(tr(e.line), 0), !0);
                    if (t == r && (o = !0, t = r.childNodes[n], n = 0, !t)) {
                        var a = e.rest ? Er(e.rest) : e.line;
                        return ae(Ho(tr(a), a.text.length), o)
                    }
                    var s = 3 == t.nodeType ? t : null, l = t;
                    for (s || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (s = t.firstChild, n && (n = s.nodeValue.length)); l.parentNode != r;)l = l.parentNode;
                    var c = e.measure, u = c.maps, d = i(s, l, n);
                    if (d)return ae(d, o);
                    for (var h = l.nextSibling, f = s ? s.nodeValue.length - n : 0; h; h = h.nextSibling) {
                        if (d = i(h, h.firstChild, 0))return ae(Ho(d.line, d.ch - f), o);
                        f += h.textContent.length
                    }
                    for (var p = l.previousSibling, f = n; p; p = p.previousSibling) {
                        if (d = i(p, p.firstChild, -1))return ae(Ho(d.line, d.ch + f), o);
                        f += h.textContent.length
                    }
                }

                function ce(e, t, n, i, r) {
                    function o(e) {
                        return function (t) {
                            return t.id == e
                        }
                    }

                    function a(t) {
                        if (1 == t.nodeType) {
                            var n = t.getAttribute("cm-text");
                            if (null != n)return "" == n && (n = t.textContent.replace(/\u200b/g, "")), void(s += n);
                            var u, d = t.getAttribute("cm-marker");
                            if (d) {
                                var h = e.findMarks(Ho(i, 0), Ho(r + 1, 0), o(+d));
                                return void(h.length && (u = h[0].find()) && (s += Ji(e.doc, u.from, u.to).join(c)))
                            }
                            if ("false" == t.getAttribute("contenteditable"))return;
                            for (var f = 0; f < t.childNodes.length; f++)a(t.childNodes[f]);
                            /^(pre|div|p)$/i.test(t.nodeName) && (l = !0)
                        } else if (3 == t.nodeType) {
                            var p = t.nodeValue;
                            if (!p)return;
                            l && (s += c, l = !1), s += p
                        }
                    }

                    for (var s = "", l = !1, c = e.doc.lineSeparator(); a(t), t != n;)t = t.nextSibling;
                    return s
                }

                function ue(e, t) {
                    this.ranges = e, this.primIndex = t
                }

                function de(e, t) {
                    this.anchor = e, this.head = t
                }

                function he(e, t) {
                    var n = e[t];
                    e.sort(function (e, t) {
                        return Wo(e.from(), t.from())
                    }), t = Or(e, n);
                    for (var i = 1; i < e.length; i++) {
                        var r = e[i], o = e[i - 1];
                        if (Wo(o.to(), r.from()) >= 0) {
                            var a = K(o.from(), r.from()), s = Y(o.to(), r.to()), l = o.empty() ? r.from() == r.head : o.from() == o.head;
                            t >= i && --t, e.splice(--i, 2, new de(l ? s : a, l ? a : s))
                        }
                    }
                    return new ue(e, t)
                }

                function fe(e, t) {
                    return new ue([new de(e, t || e)], 0)
                }

                function pe(e, t) {
                    return Math.max(e.first, Math.min(t, e.first + e.size - 1))
                }

                function me(e, t) {
                    if (t.line < e.first)return Ho(e.first, 0);
                    var n = e.first + e.size - 1;
                    return t.line > n ? Ho(n, Zi(e, n).text.length) : ge(t, Zi(e, t.line).text.length)
                }

                function ge(e, t) {
                    var n = e.ch;
                    return null == n || n > t ? Ho(e.line, t) : 0 > n ? Ho(e.line, 0) : e
                }

                function ve(e, t) {
                    return t >= e.first && t < e.first + e.size
                }

                function ye(e, t) {
                    for (var n = [], i = 0; i < t.length; i++)n[i] = me(e, t[i]);
                    return n
                }

                function be(e, t, n, i) {
                    if (e.cm && e.cm.display.shift || e.extend) {
                        var r = t.anchor;
                        if (i) {
                            var o = Wo(n, r) < 0;
                            o != Wo(i, r) < 0 ? (r = n, n = i) : o != Wo(n, i) < 0 && (n = i)
                        }
                        return new de(r, n)
                    }
                    return new de(i || n, n)
                }

                function xe(e, t, n, i) {
                    Te(e, new ue([be(e, e.sel.primary(), t, n)], 0), i)
                }

                function we(e, t, n) {
                    for (var i = [], r = 0; r < e.sel.ranges.length; r++)i[r] = be(e, e.sel.ranges[r], t[r], null);
                    var o = he(i, e.sel.primIndex);
                    Te(e, o, n)
                }

                function ke(e, t, n, i) {
                    var r = e.sel.ranges.slice(0);
                    r[t] = n, Te(e, he(r, e.sel.primIndex), i)
                }

                function Ce(e, t, n, i) {
                    Te(e, fe(t, n), i)
                }

                function Se(e, t, n) {
                    var i = {
                        ranges: t.ranges, update: function (t) {
                            this.ranges = [];
                            for (var n = 0; n < t.length; n++)this.ranges[n] = new de(me(e, t[n].anchor), me(e, t[n].head))
                        }, origin: n && n.origin
                    };
                    return Oa(e, "beforeSelectionChange", e, i), e.cm && Oa(e.cm, "beforeSelectionChange", e.cm, i), i.ranges != t.ranges ? he(i.ranges, i.ranges.length - 1) : t
                }

                function Le(e, t, n) {
                    var i = e.history.done, r = Er(i);
                    r && r.ranges ? (i[i.length - 1] = t, Me(e, t, n)) : Te(e, t, n)
                }

                function Te(e, t, n) {
                    Me(e, t, n), dr(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n)
                }

                function Me(e, t, n) {
                    (_r(e, "beforeSelectionChange") || e.cm && _r(e.cm, "beforeSelectionChange")) && (t = Se(e, t, n));
                    var i = n && n.bias || (Wo(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
                    _e(e, Ae(e, t, i, !0)), n && n.scroll === !1 || !e.cm || Hn(e.cm)
                }

                function _e(e, t) {
                    t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0, Mr(e.cm)), Sr(e, "cursorActivity", e))
                }

                function Ne(e) {
                    _e(e, Ae(e, e.sel, null, !1), Ra)
                }

                function Ae(e, t, n, i) {
                    for (var r, o = 0; o < t.ranges.length; o++) {
                        var a = t.ranges[o], s = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o], l = Ee(e, a.anchor, s && s.anchor, n, i), c = Ee(e, a.head, s && s.head, n, i);
                        (r || l != a.anchor || c != a.head) && (r || (r = t.ranges.slice(0, o)), r[o] = new de(l, c))
                    }
                    return r ? he(r, t.primIndex) : t
                }

                function De(e, t, n, i, r) {
                    var o = Zi(e, t.line);
                    if (o.markedSpans)for (var a = 0; a < o.markedSpans.length; ++a) {
                        var s = o.markedSpans[a], l = s.marker;
                        if ((null == s.from || (l.inclusiveLeft ? s.from <= t.ch : s.from < t.ch)) && (null == s.to || (l.inclusiveRight ? s.to >= t.ch : s.to > t.ch))) {
                            if (r && (Oa(l, "beforeCursorEnter"), l.explicitlyCleared)) {
                                if (o.markedSpans) {
                                    --a;
                                    continue
                                }
                                break
                            }
                            if (!l.atomic)continue;
                            if (n) {
                                var c, u = l.find(0 > i ? 1 : -1);
                                if ((0 > i ? l.inclusiveRight : l.inclusiveLeft) && (u = Oe(e, u, -i, u && u.line == t.line ? o : null)), u && u.line == t.line && (c = Wo(u, n)) && (0 > i ? 0 > c : c > 0))return De(e, u, t, i, r)
                            }
                            var d = l.find(0 > i ? -1 : 1);
                            return (0 > i ? l.inclusiveLeft : l.inclusiveRight) && (d = Oe(e, d, i, d.line == t.line ? o : null)), d ? De(e, d, t, i, r) : null
                        }
                    }
                    return t
                }

                function Ee(e, t, n, i, r) {
                    var o = i || 1, a = De(e, t, n, o, r) || !r && De(e, t, n, o, !0) || De(e, t, n, -o, r) || !r && De(e, t, n, -o, !0);
                    return a ? a : (e.cantEdit = !0, Ho(e.first, 0))
                }

                function Oe(e, t, n, i) {
                    return 0 > n && 0 == t.ch ? t.line > e.first ? me(e, Ho(t.line - 1)) : null : n > 0 && t.ch == (i || Zi(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? Ho(t.line + 1, 0) : null : new Ho(t.line, t.ch + n)
                }

                function Ie(e) {
                    e.display.input.showSelection(e.display.input.prepareSelection())
                }

                function Be(e, t) {
                    for (var n = e.doc, i = {}, r = i.cursors = document.createDocumentFragment(), o = i.selection = document.createDocumentFragment(), a = 0; a < n.sel.ranges.length; a++)if (t !== !1 || a != n.sel.primIndex) {
                        var s = n.sel.ranges[a];
                        if (!(s.from().line >= e.display.viewTo || s.to().line < e.display.viewFrom)) {
                            var l = s.empty();
                            (l || e.options.showCursorWhenSelecting) && Pe(e, s.head, r), l || Re(e, s, o)
                        }
                    }
                    return i
                }

                function Pe(e, t, n) {
                    var i = ft(e, t, "div", null, null, !e.options.singleCursorHeightPerLine), r = n.appendChild(jr("div", " ", "CodeMirror-cursor"));
                    if (r.style.left = i.left + "px", r.style.top = i.top + "px", r.style.height = Math.max(0, i.bottom - i.top) * e.options.cursorHeight + "px", i.other) {
                        var o = n.appendChild(jr("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
                        o.style.display = "", o.style.left = i.other.left + "px", o.style.top = i.other.top + "px", o.style.height = .85 * (i.other.bottom - i.other.top) + "px"
                    }
                }

                function Re(e, t, n) {
                    function i(e, t, n, i) {
                        0 > t && (t = 0), t = Math.round(t), i = Math.round(i), s.appendChild(jr("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; width: " + (null == n ? u - e : n) + "px; height: " + (i - t) + "px"))
                    }

                    function r(t, n, r) {
                        function o(n, i) {
                            return ht(e, Ho(t, n), "div", d, i)
                        }

                        var s, l, d = Zi(a, t), h = d.text.length;
                        return eo(rr(d), n || 0, null == r ? h : r, function (e, t, a) {
                            var d, f, p, m = o(e, "left");
                            if (e == t)d = m, f = p = m.left; else {
                                if (d = o(t - 1, "right"), "rtl" == a) {
                                    var g = m;
                                    m = d, d = g
                                }
                                f = m.left, p = d.right
                            }
                            null == n && 0 == e && (f = c), d.top - m.top > 3 && (i(f, m.top, null, m.bottom), f = c, m.bottom < d.top && i(f, m.bottom, null, d.top)), null == r && t == h && (p = u), (!s || m.top < s.top || m.top == s.top && m.left < s.left) && (s = m), (!l || d.bottom > l.bottom || d.bottom == l.bottom && d.right > l.right) && (l = d), c + 1 > f && (f = c), i(f, d.top, p - f, d.bottom)
                        }), {start: s, end: l}
                    }

                    var o = e.display, a = e.doc, s = document.createDocumentFragment(), l = qe(e.display), c = l.left, u = Math.max(o.sizerWidth, Ve(e) - o.sizer.offsetLeft) - l.right, d = t.from(), h = t.to();
                    if (d.line == h.line)r(d.line, d.ch, h.ch); else {
                        var f = Zi(a, d.line), p = Zi(a, h.line), m = yi(f) == yi(p), g = r(d.line, d.ch, m ? f.text.length + 1 : null).end, v = r(h.line, m ? 0 : null, h.ch).start;
                        m && (g.top < v.top - 2 ? (i(g.right, g.top, null, g.bottom), i(c, v.top, v.left, v.bottom)) : i(g.right, g.top, v.left - g.right, g.bottom)), g.bottom < v.top && i(c, g.bottom, null, v.top)
                    }
                    n.appendChild(s)
                }

                function He(e) {
                    if (e.state.focused) {
                        var t = e.display;
                        clearInterval(t.blinker);
                        var n = !0;
                        t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function () {
                            t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden"
                        }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden")
                    }
                }

                function We(e, t) {
                    e.doc.mode.startState && e.doc.frontier < e.display.viewTo && e.state.highlight.set(t, Hr(Fe, e))
                }

                function Fe(e) {
                    var t = e.doc;
                    if (t.frontier < t.first && (t.frontier = t.first), !(t.frontier >= e.display.viewTo)) {
                        var n = +new Date + e.options.workTime, i = la(t.mode, je(e, t.frontier)), r = [];
                        t.iter(t.frontier, Math.min(t.first + t.size, e.display.viewTo + 500), function (o) {
                            if (t.frontier >= e.display.viewFrom) {
                                var a = o.styles, s = o.text.length > e.options.maxHighlightLength, l = Ii(e, o, s ? la(t.mode, i) : i, !0);
                                o.styles = l.styles;
                                var c = o.styleClasses, u = l.classes;
                                u ? o.styleClasses = u : c && (o.styleClasses = null);
                                for (var d = !a || a.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), h = 0; !d && h < a.length; ++h)d = a[h] != o.styles[h];
                                d && r.push(t.frontier), o.stateAfter = s ? i : la(t.mode, i)
                            } else o.text.length <= e.options.maxHighlightLength && Pi(e, o.text, i), o.stateAfter = t.frontier % 5 == 0 ? la(t.mode, i) : null;
                            return ++t.frontier, +new Date > n ? (We(e, e.options.workDelay), !0) : void 0
                        }), r.length && Nt(e, function () {
                            for (var t = 0; t < r.length; t++)Pt(e, r[t], "text")
                        })
                    }
                }

                function ze(e, t, n) {
                    for (var i, r, o = e.doc, a = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), s = t; s > a; --s) {
                        if (s <= o.first)return o.first;
                        var l = Zi(o, s - 1);
                        if (l.stateAfter && (!n || s <= o.frontier))return s;
                        var c = Fa(l.text, null, e.options.tabSize);
                        (null == r || i > c) && (r = s - 1, i = c)
                    }
                    return r
                }

                function je(e, t, n) {
                    var i = e.doc, r = e.display;
                    if (!i.mode.startState)return !0;
                    var o = ze(e, t, n), a = o > i.first && Zi(i, o - 1).stateAfter;
                    return a = a ? la(i.mode, a) : ca(i.mode), i.iter(o, t, function (n) {
                        Pi(e, n.text, a);
                        var s = o == t - 1 || o % 5 == 0 || o >= r.viewFrom && o < r.viewTo;
                        n.stateAfter = s ? la(i.mode, a) : null, ++o
                    }), n && (i.frontier = o), a
                }

                function Ue(e) {
                    return e.lineSpace.offsetTop
                }

                function $e(e) {
                    return e.mover.offsetHeight - e.lineSpace.offsetHeight
                }

                function qe(e) {
                    if (e.cachedPaddingH)return e.cachedPaddingH;
                    var t = $r(e.measure, jr("pre", "x")), n = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle, i = {
                        left: parseInt(n.paddingLeft),
                        right: parseInt(n.paddingRight)
                    };
                    return isNaN(i.left) || isNaN(i.right) || (e.cachedPaddingH = i), i
                }

                function Ge(e) {
                    return Ba - e.display.nativeBarWidth
                }

                function Ve(e) {
                    return e.display.scroller.clientWidth - Ge(e) - e.display.barWidth
                }

                function Ye(e) {
                    return e.display.scroller.clientHeight - Ge(e) - e.display.barHeight
                }

                function Ke(e, t, n) {
                    var i = e.options.lineWrapping, r = i && Ve(e);
                    if (!t.measure.heights || i && t.measure.width != r) {
                        var o = t.measure.heights = [];
                        if (i) {
                            t.measure.width = r;
                            for (var a = t.text.firstChild.getClientRects(), s = 0; s < a.length - 1; s++) {
                                var l = a[s], c = a[s + 1];
                                Math.abs(l.bottom - c.bottom) > 2 && o.push((l.bottom + c.top) / 2 - n.top)
                            }
                        }
                        o.push(n.bottom - n.top)
                    }
                }

                function Xe(e, t, n) {
                    if (e.line == t)return {map: e.measure.map, cache: e.measure.cache};
                    for (var i = 0; i < e.rest.length; i++)if (e.rest[i] == t)return {
                        map: e.measure.maps[i],
                        cache: e.measure.caches[i]
                    };
                    for (var i = 0; i < e.rest.length; i++)if (tr(e.rest[i]) > n)return {
                        map: e.measure.maps[i],
                        cache: e.measure.caches[i],
                        before: !0
                    }
                }

                function Ze(e, t) {
                    t = yi(t);
                    var n = tr(t), i = e.display.externalMeasured = new Ot(e.doc, t, n);
                    i.lineN = n;
                    var r = i.built = Hi(e, i);
                    return i.text = r.pre, $r(e.display.lineMeasure, r.pre), i
                }

                function Je(e, t, n, i) {
                    return tt(e, et(e, t), n, i)
                }

                function Qe(e, t) {
                    if (t >= e.display.viewFrom && t < e.display.viewTo)return e.display.view[Ht(e, t)];
                    var n = e.display.externalMeasured;
                    return n && t >= n.lineN && t < n.lineN + n.size ? n : void 0
                }

                function et(e, t) {
                    var n = tr(t), i = Qe(e, n);
                    i && !i.text ? i = null : i && i.changes && (B(e, i, n, O(e)), e.curOp.forceUpdate = !0), i || (i = Ze(e, t));
                    var r = Xe(i, t, n);
                    return {line: t, view: i, rect: null, map: r.map, cache: r.cache, before: r.before, hasHeights: !1}
                }

                function tt(e, t, n, i, r) {
                    t.before && (n = -1);
                    var o, a = n + (i || "");
                    return t.cache.hasOwnProperty(a) ? o = t.cache[a] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (Ke(e, t.view, t.rect), t.hasHeights = !0), o = it(e, t, n, i), o.bogus || (t.cache[a] = o)), {
                        left: o.left,
                        right: o.right,
                        top: r ? o.rtop : o.top,
                        bottom: r ? o.rbottom : o.bottom
                    }
                }

                function nt(e, t, n) {
                    for (var i, r, o, a, s = 0; s < e.length; s += 3) {
                        var l = e[s], c = e[s + 1];
                        if (l > t ? (r = 0, o = 1, a = "left") : c > t ? (r = t - l, o = r + 1) : (s == e.length - 3 || t == c && e[s + 3] > t) && (o = c - l, r = o - 1, t >= c && (a = "right")), null != r) {
                            if (i = e[s + 2], l == c && n == (i.insertLeft ? "left" : "right") && (a = n), "left" == n && 0 == r)for (; s && e[s - 2] == e[s - 3] && e[s - 1].insertLeft;)i = e[(s -= 3) + 2], a = "left";
                            if ("right" == n && r == c - l)for (; s < e.length - 3 && e[s + 3] == e[s + 4] && !e[s + 5].insertLeft;)i = e[(s += 3) + 2], a = "right";
                            break
                        }
                    }
                    return {node: i, start: r, end: o, collapse: a, coverStart: l, coverEnd: c}
                }

                function it(e, t, n, i) {
                    var r, o = nt(t.map, n, i), a = o.node, s = o.start, l = o.end, c = o.collapse;
                    if (3 == a.nodeType) {
                        for (var u = 0; 4 > u; u++) {
                            for (; s && zr(t.line.text.charAt(o.coverStart + s));)--s;
                            for (; o.coverStart + l < o.coverEnd && zr(t.line.text.charAt(o.coverStart + l));)++l;
                            if (bo && 9 > xo && 0 == s && l == o.coverEnd - o.coverStart)r = a.parentNode.getBoundingClientRect(); else if (bo && e.options.lineWrapping) {
                                var d = $a(a, s, l).getClientRects();
                                r = d.length ? d["right" == i ? d.length - 1 : 0] : $o
                            } else r = $a(a, s, l).getBoundingClientRect() || $o;
                            if (r.left || r.right || 0 == s)break;
                            l = s, s -= 1, c = "right"
                        }
                        bo && 11 > xo && (r = rt(e.display.measure, r))
                    } else {
                        s > 0 && (c = i = "right");
                        var d;
                        r = e.options.lineWrapping && (d = a.getClientRects()).length > 1 ? d["right" == i ? d.length - 1 : 0] : a.getBoundingClientRect()
                    }
                    if (bo && 9 > xo && !s && (!r || !r.left && !r.right)) {
                        var h = a.parentNode.getClientRects()[0];
                        r = h ? {left: h.left, right: h.left + bt(e.display), top: h.top, bottom: h.bottom} : $o
                    }
                    for (var f = r.top - t.rect.top, p = r.bottom - t.rect.top, m = (f + p) / 2, g = t.view.measure.heights, u = 0; u < g.length - 1 && !(m < g[u]); u++);
                    var v = u ? g[u - 1] : 0, y = g[u], b = {
                        left: ("right" == c ? r.right : r.left) - t.rect.left,
                        right: ("left" == c ? r.left : r.right) - t.rect.left,
                        top: v,
                        bottom: y
                    };
                    return r.left || r.right || (b.bogus = !0), e.options.singleCursorHeightPerLine || (b.rtop = f, b.rbottom = p), b
                }

                function rt(e, t) {
                    if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !Qr(e))return t;
                    var n = screen.logicalXDPI / screen.deviceXDPI, i = screen.logicalYDPI / screen.deviceYDPI;
                    return {left: t.left * n, right: t.right * n, top: t.top * i, bottom: t.bottom * i}
                }

                function ot(e) {
                    if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))for (var t = 0; t < e.rest.length; t++)e.measure.caches[t] = {}
                }

                function at(e) {
                    e.display.externalMeasure = null, Ur(e.display.lineMeasure);
                    for (var t = 0; t < e.display.view.length; t++)ot(e.display.view[t])
                }

                function st(e) {
                    at(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
                }

                function lt() {
                    return window.pageXOffset || (document.documentElement || document.body).scrollLeft
                }

                function ct() {
                    return window.pageYOffset || (document.documentElement || document.body).scrollTop
                }

                function ut(e, t, n, i) {
                    if (t.widgets)for (var r = 0; r < t.widgets.length; ++r)if (t.widgets[r].above) {
                        var o = Li(t.widgets[r]);
                        n.top += o, n.bottom += o
                    }
                    if ("line" == i)return n;
                    i || (i = "local");
                    var a = ir(t);
                    if ("local" == i ? a += Ue(e.display) : a -= e.display.viewOffset, "page" == i || "window" == i) {
                        var s = e.display.lineSpace.getBoundingClientRect();
                        a += s.top + ("window" == i ? 0 : ct());
                        var l = s.left + ("window" == i ? 0 : lt());
                        n.left += l, n.right += l
                    }
                    return n.top += a, n.bottom += a, n
                }

                function dt(e, t, n) {
                    if ("div" == n)return t;
                    var i = t.left, r = t.top;
                    if ("page" == n)i -= lt(), r -= ct(); else if ("local" == n || !n) {
                        var o = e.display.sizer.getBoundingClientRect();
                        i += o.left, r += o.top;
                    }
                    var a = e.display.lineSpace.getBoundingClientRect();
                    return {left: i - a.left, top: r - a.top}
                }

                function ht(e, t, n, i, r) {
                    return i || (i = Zi(e.doc, t.line)), ut(e, i, Je(e, i, t.ch, r), n)
                }

                function ft(e, t, n, i, r, o) {
                    function a(t, a) {
                        var s = tt(e, r, t, a ? "right" : "left", o);
                        return a ? s.left = s.right : s.right = s.left, ut(e, i, s, n)
                    }

                    function s(e, t) {
                        var n = l[t], i = n.level % 2;
                        return e == to(n) && t && n.level < l[t - 1].level ? (n = l[--t], e = no(n) - (n.level % 2 ? 0 : 1), i = !0) : e == no(n) && t < l.length - 1 && n.level < l[t + 1].level && (n = l[++t], e = to(n) - n.level % 2, i = !1), i && e == n.to && e > n.from ? a(e - 1) : a(e, i)
                    }

                    i = i || Zi(e.doc, t.line), r || (r = et(e, i));
                    var l = rr(i), c = t.ch;
                    if (!l)return a(c);
                    var u = co(l, c), d = s(c, u);
                    return null != as && (d.other = s(c, as)), d
                }

                function pt(e, t) {
                    var n = 0, t = me(e.doc, t);
                    e.options.lineWrapping || (n = bt(e.display) * t.ch);
                    var i = Zi(e.doc, t.line), r = ir(i) + Ue(e.display);
                    return {left: n, right: n, top: r, bottom: r + i.height}
                }

                function mt(e, t, n, i) {
                    var r = Ho(e, t);
                    return r.xRel = i, n && (r.outside = !0), r
                }

                function gt(e, t, n) {
                    var i = e.doc;
                    if (n += e.display.viewOffset, 0 > n)return mt(i.first, 0, !0, -1);
                    var r = nr(i, n), o = i.first + i.size - 1;
                    if (r > o)return mt(i.first + i.size - 1, Zi(i, o).text.length, !0, 1);
                    0 > t && (t = 0);
                    for (var a = Zi(i, r); ;) {
                        var s = vt(e, a, r, t, n), l = gi(a), c = l && l.find(0, !0);
                        if (!l || !(s.ch > c.from.ch || s.ch == c.from.ch && s.xRel > 0))return s;
                        r = tr(a = c.to.line)
                    }
                }

                function vt(e, t, n, i, r) {
                    function o(i) {
                        var r = ft(e, Ho(n, i), "line", t, c);
                        return s = !0, a > r.bottom ? r.left - l : a < r.top ? r.left + l : (s = !1, r.left)
                    }

                    var a = r - ir(t), s = !1, l = 2 * e.display.wrapper.clientWidth, c = et(e, t), u = rr(t), d = t.text.length, h = io(t), f = ro(t), p = o(h), m = s, g = o(f), v = s;
                    if (i > g)return mt(n, f, v, 1);
                    for (; ;) {
                        if (u ? f == h || f == ho(t, h, 1) : 1 >= f - h) {
                            for (var y = p > i || g - i >= i - p ? h : f, b = i - (y == h ? p : g); zr(t.text.charAt(y));)++y;
                            var x = mt(n, y, y == h ? m : v, -1 > b ? -1 : b > 1 ? 1 : 0);
                            return x
                        }
                        var w = Math.ceil(d / 2), k = h + w;
                        if (u) {
                            k = h;
                            for (var C = 0; w > C; ++C)k = ho(t, k, 1)
                        }
                        var S = o(k);
                        S > i ? (f = k, g = S, (v = s) && (g += 1e3), d = w) : (h = k, p = S, m = s, d -= w)
                    }
                }

                function yt(e) {
                    if (null != e.cachedTextHeight)return e.cachedTextHeight;
                    if (null == zo) {
                        zo = jr("pre");
                        for (var t = 0; 49 > t; ++t)zo.appendChild(document.createTextNode("x")), zo.appendChild(jr("br"));
                        zo.appendChild(document.createTextNode("x"))
                    }
                    $r(e.measure, zo);
                    var n = zo.offsetHeight / 50;
                    return n > 3 && (e.cachedTextHeight = n), Ur(e.measure), n || 1
                }

                function bt(e) {
                    if (null != e.cachedCharWidth)return e.cachedCharWidth;
                    var t = jr("span", "xxxxxxxxxx"), n = jr("pre", [t]);
                    $r(e.measure, n);
                    var i = t.getBoundingClientRect(), r = (i.right - i.left) / 10;
                    return r > 2 && (e.cachedCharWidth = r), r || 10
                }

                function xt(e) {
                    e.curOp = {
                        cm: e,
                        viewChanged: !1,
                        startHeight: e.doc.height,
                        forceUpdate: !1,
                        updateInput: null,
                        typing: !1,
                        changeObjs: null,
                        cursorActivityHandlers: null,
                        cursorActivityCalled: 0,
                        selectionChanged: !1,
                        updateMaxLine: !1,
                        scrollLeft: null,
                        scrollTop: null,
                        scrollToPos: null,
                        focus: !1,
                        id: ++Go
                    }, qo ? qo.ops.push(e.curOp) : e.curOp.ownsGroup = qo = {ops: [e.curOp], delayedCallbacks: []}
                }

                function wt(e) {
                    var t = e.delayedCallbacks, n = 0;
                    do {
                        for (; n < t.length; n++)t[n].call(null);
                        for (var i = 0; i < e.ops.length; i++) {
                            var r = e.ops[i];
                            if (r.cursorActivityHandlers)for (; r.cursorActivityCalled < r.cursorActivityHandlers.length;)r.cursorActivityHandlers[r.cursorActivityCalled++].call(null, r.cm)
                        }
                    } while (n < t.length)
                }

                function kt(e) {
                    var t = e.curOp, n = t.ownsGroup;
                    if (n)try {
                        wt(n)
                    } finally {
                        qo = null;
                        for (var i = 0; i < n.ops.length; i++)n.ops[i].cm.curOp = null;
                        Ct(n)
                    }
                }

                function Ct(e) {
                    for (var t = e.ops, n = 0; n < t.length; n++)St(t[n]);
                    for (var n = 0; n < t.length; n++)Lt(t[n]);
                    for (var n = 0; n < t.length; n++)Tt(t[n]);
                    for (var n = 0; n < t.length; n++)Mt(t[n]);
                    for (var n = 0; n < t.length; n++)_t(t[n])
                }

                function St(e) {
                    var t = e.cm, n = t.display;
                    T(t), e.updateMaxLine && h(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new L(t, e.mustUpdate && {
                                top: e.scrollTop,
                                ensure: e.scrollToPos
                            }, e.forceUpdate)
                }

                function Lt(e) {
                    e.updatedDisplay = e.mustUpdate && M(e.cm, e.update)
                }

                function Tt(e) {
                    var t = e.cm, n = t.display;
                    e.updatedDisplay && D(t), e.barMeasure = p(t), n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Je(t, n.maxLine, n.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + Ge(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - Ve(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection(e.focus))
                }

                function Mt(e) {
                    var t = e.cm;
                    null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && on(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
                    var n = e.focus && e.focus == qr() && (!document.hasFocus || document.hasFocus());
                    e.preparedSelection && t.display.input.showSelection(e.preparedSelection, n), (e.updatedDisplay || e.startHeight != t.doc.height) && y(t, e.barMeasure), e.updatedDisplay && A(t, e.barMeasure), e.selectionChanged && He(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), n && X(e.cm)
                }

                function _t(e) {
                    var t = e.cm, n = t.display, i = t.doc;
                    if (e.updatedDisplay && _(t, e.update), null == n.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (n.wheelStartX = n.wheelStartY = null), null == e.scrollTop || n.scroller.scrollTop == e.scrollTop && !e.forceScroll || (i.scrollTop = Math.max(0, Math.min(n.scroller.scrollHeight - n.scroller.clientHeight, e.scrollTop)), n.scrollbars.setScrollTop(i.scrollTop), n.scroller.scrollTop = i.scrollTop), null == e.scrollLeft || n.scroller.scrollLeft == e.scrollLeft && !e.forceScroll || (i.scrollLeft = Math.max(0, Math.min(n.scroller.scrollWidth - n.scroller.clientWidth, e.scrollLeft)), n.scrollbars.setScrollLeft(i.scrollLeft), n.scroller.scrollLeft = i.scrollLeft, w(t)), e.scrollToPos) {
                        var r = In(t, me(i, e.scrollToPos.from), me(i, e.scrollToPos.to), e.scrollToPos.margin);
                        e.scrollToPos.isCursor && t.state.focused && On(t, r)
                    }
                    var o = e.maybeHiddenMarkers, a = e.maybeUnhiddenMarkers;
                    if (o)for (var s = 0; s < o.length; ++s)o[s].lines.length || Oa(o[s], "hide");
                    if (a)for (var s = 0; s < a.length; ++s)a[s].lines.length && Oa(a[s], "unhide");
                    n.wrapper.offsetHeight && (i.scrollTop = t.display.scroller.scrollTop), e.changeObjs && Oa(t, "changes", t, e.changeObjs), e.update && e.update.finish()
                }

                function Nt(e, t) {
                    if (e.curOp)return t();
                    xt(e);
                    try {
                        return t()
                    } finally {
                        kt(e)
                    }
                }

                function At(e, t) {
                    return function () {
                        if (e.curOp)return t.apply(e, arguments);
                        xt(e);
                        try {
                            return t.apply(e, arguments)
                        } finally {
                            kt(e)
                        }
                    }
                }

                function Dt(e) {
                    return function () {
                        if (this.curOp)return e.apply(this, arguments);
                        xt(this);
                        try {
                            return e.apply(this, arguments)
                        } finally {
                            kt(this)
                        }
                    }
                }

                function Et(e) {
                    return function () {
                        var t = this.cm;
                        if (!t || t.curOp)return e.apply(this, arguments);
                        xt(t);
                        try {
                            return e.apply(this, arguments)
                        } finally {
                            kt(t)
                        }
                    }
                }

                function Ot(e, t, n) {
                    this.line = t, this.rest = bi(t), this.size = this.rest ? tr(Er(this.rest)) - n + 1 : 1, this.node = this.text = null, this.hidden = ki(e, t)
                }

                function It(e, t, n) {
                    for (var i, r = [], o = t; n > o; o = i) {
                        var a = new Ot(e.doc, Zi(e.doc, o), o);
                        i = o + a.size, r.push(a)
                    }
                    return r
                }

                function Bt(e, t, n, i) {
                    null == t && (t = e.doc.first), null == n && (n = e.doc.first + e.doc.size), i || (i = 0);
                    var r = e.display;
                    if (i && n < r.viewTo && (null == r.updateLineNumbers || r.updateLineNumbers > t) && (r.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= r.viewTo)Ro && xi(e.doc, t) < r.viewTo && Rt(e); else if (n <= r.viewFrom)Ro && wi(e.doc, n + i) > r.viewFrom ? Rt(e) : (r.viewFrom += i, r.viewTo += i); else if (t <= r.viewFrom && n >= r.viewTo)Rt(e); else if (t <= r.viewFrom) {
                        var o = Wt(e, n, n + i, 1);
                        o ? (r.view = r.view.slice(o.index), r.viewFrom = o.lineN, r.viewTo += i) : Rt(e)
                    } else if (n >= r.viewTo) {
                        var o = Wt(e, t, t, -1);
                        o ? (r.view = r.view.slice(0, o.index), r.viewTo = o.lineN) : Rt(e)
                    } else {
                        var a = Wt(e, t, t, -1), s = Wt(e, n, n + i, 1);
                        a && s ? (r.view = r.view.slice(0, a.index).concat(It(e, a.lineN, s.lineN)).concat(r.view.slice(s.index)), r.viewTo += i) : Rt(e)
                    }
                    var l = r.externalMeasured;
                    l && (n < l.lineN ? l.lineN += i : t < l.lineN + l.size && (r.externalMeasured = null))
                }

                function Pt(e, t, n) {
                    e.curOp.viewChanged = !0;
                    var i = e.display, r = e.display.externalMeasured;
                    if (r && t >= r.lineN && t < r.lineN + r.size && (i.externalMeasured = null), !(t < i.viewFrom || t >= i.viewTo)) {
                        var o = i.view[Ht(e, t)];
                        if (null != o.node) {
                            var a = o.changes || (o.changes = []);
                            -1 == Or(a, n) && a.push(n)
                        }
                    }
                }

                function Rt(e) {
                    e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0
                }

                function Ht(e, t) {
                    if (t >= e.display.viewTo)return null;
                    if (t -= e.display.viewFrom, 0 > t)return null;
                    for (var n = e.display.view, i = 0; i < n.length; i++)if (t -= n[i].size, 0 > t)return i
                }

                function Wt(e, t, n, i) {
                    var r, o = Ht(e, t), a = e.display.view;
                    if (!Ro || n == e.doc.first + e.doc.size)return {index: o, lineN: n};
                    for (var s = 0, l = e.display.viewFrom; o > s; s++)l += a[s].size;
                    if (l != t) {
                        if (i > 0) {
                            if (o == a.length - 1)return null;
                            r = l + a[o].size - t, o++
                        } else r = l - t;
                        t += r, n += r
                    }
                    for (; xi(e.doc, n) != n;) {
                        if (o == (0 > i ? 0 : a.length - 1))return null;
                        n += i * a[o - (0 > i ? 1 : 0)].size, o += i
                    }
                    return {index: o, lineN: n}
                }

                function Ft(e, t, n) {
                    var i = e.display, r = i.view;
                    0 == r.length || t >= i.viewTo || n <= i.viewFrom ? (i.view = It(e, t, n), i.viewFrom = t) : (i.viewFrom > t ? i.view = It(e, t, i.viewFrom).concat(i.view) : i.viewFrom < t && (i.view = i.view.slice(Ht(e, t))), i.viewFrom = t, i.viewTo < n ? i.view = i.view.concat(It(e, i.viewTo, n)) : i.viewTo > n && (i.view = i.view.slice(0, Ht(e, n)))), i.viewTo = n
                }

                function zt(e) {
                    for (var t = e.display.view, n = 0, i = 0; i < t.length; i++) {
                        var r = t[i];
                        r.hidden || r.node && !r.changes || ++n
                    }
                    return n
                }

                function jt(e) {
                    function t() {
                        r.activeTouch && (o = setTimeout(function () {
                            r.activeTouch = null
                        }, 1e3), a = r.activeTouch, a.end = +new Date)
                    }

                    function n(e) {
                        if (1 != e.touches.length)return !1;
                        var t = e.touches[0];
                        return t.radiusX <= 1 && t.radiusY <= 1
                    }

                    function i(e, t) {
                        if (null == t.left)return !0;
                        var n = t.left - e.left, i = t.top - e.top;
                        return n * n + i * i > 400
                    }

                    var r = e.display;
                    Aa(r.scroller, "mousedown", At(e, Vt)), bo && 11 > xo ? Aa(r.scroller, "dblclick", At(e, function (t) {
                        if (!Tr(e, t)) {
                            var n = Gt(e, t);
                            if (n && !Jt(e, t) && !qt(e.display, t)) {
                                Ma(t);
                                var i = e.findWordAt(n);
                                xe(e.doc, i.anchor, i.head)
                            }
                        }
                    })) : Aa(r.scroller, "dblclick", function (t) {
                        Tr(e, t) || Ma(t)
                    }), Bo || Aa(r.scroller, "contextmenu", function (t) {
                        bn(e, t)
                    });
                    var o, a = {end: 0};
                    Aa(r.scroller, "touchstart", function (t) {
                        if (!Tr(e, t) && !n(t)) {
                            clearTimeout(o);
                            var i = +new Date;
                            r.activeTouch = {
                                start: i,
                                moved: !1,
                                prev: i - a.end <= 300 ? a : null
                            }, 1 == t.touches.length && (r.activeTouch.left = t.touches[0].pageX, r.activeTouch.top = t.touches[0].pageY)
                        }
                    }), Aa(r.scroller, "touchmove", function () {
                        r.activeTouch && (r.activeTouch.moved = !0)
                    }), Aa(r.scroller, "touchend", function (n) {
                        var o = r.activeTouch;
                        if (o && !qt(r, n) && null != o.left && !o.moved && new Date - o.start < 300) {
                            var a, s = e.coordsChar(r.activeTouch, "page");
                            a = !o.prev || i(o, o.prev) ? new de(s, s) : !o.prev.prev || i(o, o.prev.prev) ? e.findWordAt(s) : new de(Ho(s.line, 0), me(e.doc, Ho(s.line + 1, 0))), e.setSelection(a.anchor, a.head), e.focus(), Ma(n)
                        }
                        t()
                    }), Aa(r.scroller, "touchcancel", t), Aa(r.scroller, "scroll", function () {
                        r.scroller.clientHeight && (rn(e, r.scroller.scrollTop), on(e, r.scroller.scrollLeft, !0), Oa(e, "scroll", e))
                    }), Aa(r.scroller, "mousewheel", function (t) {
                        an(e, t)
                    }), Aa(r.scroller, "DOMMouseScroll", function (t) {
                        an(e, t)
                    }), Aa(r.wrapper, "scroll", function () {
                        r.wrapper.scrollTop = r.wrapper.scrollLeft = 0
                    }), r.dragFunctions = {
                        enter: function (t) {
                            Tr(e, t) || Na(t)
                        }, over: function (t) {
                            Tr(e, t) || (tn(e, t), Na(t))
                        }, start: function (t) {
                            en(e, t)
                        }, drop: At(e, Qt), leave: function (t) {
                            Tr(e, t) || nn(e)
                        }
                    };
                    var s = r.input.getField();
                    Aa(s, "keyup", function (t) {
                        pn.call(e, t)
                    }), Aa(s, "keydown", At(e, hn)), Aa(s, "keypress", At(e, mn)), Aa(s, "focus", Hr(vn, e)), Aa(s, "blur", Hr(yn, e))
                }

                function Ut(t, n, i) {
                    var r = i && i != e.Init;
                    if (!n != !r) {
                        var o = t.display.dragFunctions, a = n ? Aa : Ea;
                        a(t.display.scroller, "dragstart", o.start), a(t.display.scroller, "dragenter", o.enter), a(t.display.scroller, "dragover", o.over), a(t.display.scroller, "dragleave", o.leave), a(t.display.scroller, "drop", o.drop)
                    }
                }

                function $t(e) {
                    var t = e.display;
                    t.lastWrapHeight == t.wrapper.clientHeight && t.lastWrapWidth == t.wrapper.clientWidth || (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize())
                }

                function qt(e, t) {
                    for (var n = wr(t); n != e.wrapper; n = n.parentNode)if (!n || 1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events") || n.parentNode == e.sizer && n != e.mover)return !0
                }

                function Gt(e, t, n, i) {
                    var r = e.display;
                    if (!n && "true" == wr(t).getAttribute("cm-not-content"))return null;
                    var o, a, s = r.lineSpace.getBoundingClientRect();
                    try {
                        o = t.clientX - s.left, a = t.clientY - s.top
                    } catch (t) {
                        return null
                    }
                    var l, c = gt(e, o, a);
                    if (i && 1 == c.xRel && (l = Zi(e.doc, c.line).text).length == c.ch) {
                        var u = Fa(l, l.length, e.options.tabSize) - l.length;
                        c = Ho(c.line, Math.max(0, Math.round((o - qe(e.display).left) / bt(e.display)) - u))
                    }
                    return c
                }

                function Vt(e) {
                    var t = this, n = t.display;
                    if (!(Tr(t, e) || n.activeTouch && n.input.supportsTouch())) {
                        if (n.shift = e.shiftKey, qt(n, e))return void(wo || (n.scroller.draggable = !1, setTimeout(function () {
                            n.scroller.draggable = !0
                        }, 100)));
                        if (!Jt(t, e)) {
                            var i = Gt(t, e);
                            switch (window.focus(), kr(e)) {
                                case 1:
                                    t.state.selectingText ? t.state.selectingText(e) : i ? Yt(t, e, i) : wr(e) == n.scroller && Ma(e);
                                    break;
                                case 2:
                                    wo && (t.state.lastMiddleDown = +new Date), i && xe(t.doc, i), setTimeout(function () {
                                        n.input.focus()
                                    }, 20), Ma(e);
                                    break;
                                case 3:
                                    Bo ? bn(t, e) : gn(t)
                            }
                        }
                    }
                }

                function Yt(e, t, n) {
                    bo ? setTimeout(Hr(X, e), 0) : e.curOp.focus = qr();
                    var i, r = +new Date;
                    Uo && Uo.time > r - 400 && 0 == Wo(Uo.pos, n) ? i = "triple" : jo && jo.time > r - 400 && 0 == Wo(jo.pos, n) ? (i = "double", Uo = {
                        time: r,
                        pos: n
                    }) : (i = "single", jo = {time: r, pos: n});
                    var o, a = e.doc.sel, s = Ao ? t.metaKey : t.ctrlKey;
                    e.options.dragDrop && es && !e.isReadOnly() && "single" == i && (o = a.contains(n)) > -1 && (Wo((o = a.ranges[o]).from(), n) < 0 || n.xRel > 0) && (Wo(o.to(), n) > 0 || n.xRel < 0) ? Kt(e, t, n, s) : Xt(e, t, n, i, s)
                }

                function Kt(e, t, n, i) {
                    var r = e.display, o = +new Date, a = At(e, function (s) {
                        wo && (r.scroller.draggable = !1), e.state.draggingText = !1, Ea(document, "mouseup", a), Ea(r.scroller, "drop", a), Math.abs(t.clientX - s.clientX) + Math.abs(t.clientY - s.clientY) < 10 && (Ma(s), !i && +new Date - 200 < o && xe(e.doc, n), wo || bo && 9 == xo ? setTimeout(function () {
                            document.body.focus(), r.input.focus()
                        }, 20) : r.input.focus())
                    });
                    wo && (r.scroller.draggable = !0), e.state.draggingText = a, r.scroller.dragDrop && r.scroller.dragDrop(), Aa(document, "mouseup", a), Aa(r.scroller, "drop", a)
                }

                function Xt(e, t, n, i, r) {
                    function o(t) {
                        if (0 != Wo(g, t))if (g = t, "rect" == i) {
                            for (var r = [], o = e.options.tabSize, a = Fa(Zi(c, n.line).text, n.ch, o), s = Fa(Zi(c, t.line).text, t.ch, o), l = Math.min(a, s), f = Math.max(a, s), p = Math.min(n.line, t.line), m = Math.min(e.lastLine(), Math.max(n.line, t.line)); m >= p; p++) {
                                var v = Zi(c, p).text, y = za(v, l, o);
                                l == f ? r.push(new de(Ho(p, y), Ho(p, y))) : v.length > y && r.push(new de(Ho(p, y), Ho(p, za(v, f, o))))
                            }
                            r.length || r.push(new de(n, n)), Te(c, he(h.ranges.slice(0, d).concat(r), d), {
                                origin: "*mouse",
                                scroll: !1
                            }), e.scrollIntoView(t)
                        } else {
                            var b = u, x = b.anchor, w = t;
                            if ("single" != i) {
                                if ("double" == i)var k = e.findWordAt(t); else var k = new de(Ho(t.line, 0), me(c, Ho(t.line + 1, 0)));
                                Wo(k.anchor, x) > 0 ? (w = k.head, x = K(b.from(), k.anchor)) : (w = k.anchor, x = Y(b.to(), k.head))
                            }
                            var r = h.ranges.slice(0);
                            r[d] = new de(me(c, x), w), Te(c, he(r, d), Ha)
                        }
                    }

                    function a(t) {
                        var n = ++y, r = Gt(e, t, !0, "rect" == i);
                        if (r)if (0 != Wo(r, g)) {
                            e.curOp.focus = qr(), o(r);
                            var s = x(l, c);
                            (r.line >= s.to || r.line < s.from) && setTimeout(At(e, function () {
                                y == n && a(t)
                            }), 150)
                        } else {
                            var u = t.clientY < v.top ? -20 : t.clientY > v.bottom ? 20 : 0;
                            u && setTimeout(At(e, function () {
                                y == n && (l.scroller.scrollTop += u, a(t))
                            }), 50)
                        }
                    }

                    function s(t) {
                        e.state.selectingText = !1, y = 1 / 0, Ma(t), l.input.focus(), Ea(document, "mousemove", b), Ea(document, "mouseup", w), c.history.lastSelOrigin = null
                    }

                    var l = e.display, c = e.doc;
                    Ma(t);
                    var u, d, h = c.sel, f = h.ranges;
                    if (r && !t.shiftKey ? (d = c.sel.contains(n), u = d > -1 ? f[d] : new de(n, n)) : (u = c.sel.primary(), d = c.sel.primIndex), Do ? t.shiftKey && t.metaKey : t.altKey)i = "rect", r || (u = new de(n, n)), n = Gt(e, t, !0, !0), d = -1; else if ("double" == i) {
                        var p = e.findWordAt(n);
                        u = e.display.shift || c.extend ? be(c, u, p.anchor, p.head) : p
                    } else if ("triple" == i) {
                        var m = new de(Ho(n.line, 0), me(c, Ho(n.line + 1, 0)));
                        u = e.display.shift || c.extend ? be(c, u, m.anchor, m.head) : m
                    } else u = be(c, u, n);
                    r ? -1 == d ? (d = f.length, Te(c, he(f.concat([u]), d), {
                        scroll: !1,
                        origin: "*mouse"
                    })) : f.length > 1 && f[d].empty() && "single" == i && !t.shiftKey ? (Te(c, he(f.slice(0, d).concat(f.slice(d + 1)), 0), {
                        scroll: !1,
                        origin: "*mouse"
                    }), h = c.sel) : ke(c, d, u, Ha) : (d = 0, Te(c, new ue([u], 0), Ha), h = c.sel);
                    var g = n, v = l.wrapper.getBoundingClientRect(), y = 0, b = At(e, function (e) {
                        kr(e) ? a(e) : s(e)
                    }), w = At(e, s);
                    e.state.selectingText = w, Aa(document, "mousemove", b), Aa(document, "mouseup", w)
                }

                function Zt(e, t, n, i) {
                    try {
                        var r = t.clientX, o = t.clientY
                    } catch (t) {
                        return !1
                    }
                    if (r >= Math.floor(e.display.gutters.getBoundingClientRect().right))return !1;
                    i && Ma(t);
                    var a = e.display, s = a.lineDiv.getBoundingClientRect();
                    if (o > s.bottom || !_r(e, n))return xr(t);
                    o -= s.top - a.viewOffset;
                    for (var l = 0; l < e.options.gutters.length; ++l) {
                        var c = a.gutters.childNodes[l];
                        if (c && c.getBoundingClientRect().right >= r) {
                            var u = nr(e.doc, o), d = e.options.gutters[l];
                            return Oa(e, n, e, u, d, t), xr(t)
                        }
                    }
                }

                function Jt(e, t) {
                    return Zt(e, t, "gutterClick", !0)
                }

                function Qt(e) {
                    var t = this;
                    if (nn(t), !Tr(t, e) && !qt(t.display, e)) {
                        Ma(e), bo && (Vo = +new Date);
                        var n = Gt(t, e, !0), i = e.dataTransfer.files;
                        if (n && !t.isReadOnly())if (i && i.length && window.FileReader && window.File)for (var r = i.length, o = Array(r), a = 0, s = function (e, i) {
                            if (!t.options.allowDropFileTypes || -1 != Or(t.options.allowDropFileTypes, e.type)) {
                                var s = new FileReader;
                                s.onload = At(t, function () {
                                    var e = s.result;
                                    if (/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), o[i] = e, ++a == r) {
                                        n = me(t.doc, n);
                                        var l = {
                                            from: n,
                                            to: n,
                                            text: t.doc.splitLines(o.join(t.doc.lineSeparator())),
                                            origin: "paste"
                                        };
                                        Tn(t.doc, l), Le(t.doc, fe(n, Qo(l)))
                                    }
                                }), s.readAsText(e)
                            }
                        }, l = 0; r > l; ++l)s(i[l], l); else {
                            if (t.state.draggingText && t.doc.sel.contains(n) > -1)return t.state.draggingText(e), void setTimeout(function () {
                                t.display.input.focus()
                            }, 20);
                            try {
                                var o = e.dataTransfer.getData("Text");
                                if (o) {
                                    if (t.state.draggingText && !(Ao ? e.altKey : e.ctrlKey))var c = t.listSelections();
                                    if (Me(t.doc, fe(n, n)), c)for (var l = 0; l < c.length; ++l)En(t.doc, "", c[l].anchor, c[l].head, "drag");
                                    t.replaceSelection(o, "around", "paste"), t.display.input.focus()
                                }
                            } catch (e) {
                            }
                        }
                    }
                }

                function en(e, t) {
                    if (bo && (!e.state.draggingText || +new Date - Vo < 100))return void Na(t);
                    if (!Tr(e, t) && !qt(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !Lo)) {
                        var n = jr("img", null, null, "position: fixed; left: 0; top: 0;");
                        n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", So && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop), t.dataTransfer.setDragImage(n, 0, 0), So && n.parentNode.removeChild(n)
                    }
                }

                function tn(e, t) {
                    var n = Gt(e, t);
                    if (n) {
                        var i = document.createDocumentFragment();
                        Pe(e, n, i), e.display.dragCursor || (e.display.dragCursor = jr("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), $r(e.display.dragCursor, i)
                    }
                }

                function nn(e) {
                    e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null)
                }

                function rn(e, t) {
                    Math.abs(e.doc.scrollTop - t) < 2 || (e.doc.scrollTop = t, go || N(e, {top: t}), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t), e.display.scrollbars.setScrollTop(t), go && N(e), We(e, 100))
                }

                function on(e, t, n) {
                    (n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) || (t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), e.doc.scrollLeft = t, w(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t))
                }

                function an(e, t) {
                    var n = Xo(t), i = n.x, r = n.y, o = e.display, a = o.scroller, s = a.scrollWidth > a.clientWidth, l = a.scrollHeight > a.clientHeight;
                    if (i && s || r && l) {
                        if (r && Ao && wo)e:for (var c = t.target, u = o.view; c != a; c = c.parentNode)for (var d = 0; d < u.length; d++)if (u[d].node == c) {
                            e.display.currentWheelTarget = c;
                            break e
                        }
                        if (i && !go && !So && null != Ko)return r && l && rn(e, Math.max(0, Math.min(a.scrollTop + r * Ko, a.scrollHeight - a.clientHeight))), on(e, Math.max(0, Math.min(a.scrollLeft + i * Ko, a.scrollWidth - a.clientWidth))), (!r || r && l) && Ma(t), void(o.wheelStartX = null);
                        if (r && null != Ko) {
                            var h = r * Ko, f = e.doc.scrollTop, p = f + o.wrapper.clientHeight;
                            0 > h ? f = Math.max(0, f + h - 50) : p = Math.min(e.doc.height, p + h + 50), N(e, {
                                top: f,
                                bottom: p
                            })
                        }
                        20 > Yo && (null == o.wheelStartX ? (o.wheelStartX = a.scrollLeft, o.wheelStartY = a.scrollTop, o.wheelDX = i, o.wheelDY = r, setTimeout(function () {
                            if (null != o.wheelStartX) {
                                var e = a.scrollLeft - o.wheelStartX, t = a.scrollTop - o.wheelStartY, n = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;
                                o.wheelStartX = o.wheelStartY = null, n && (Ko = (Ko * Yo + n) / (Yo + 1), ++Yo)
                            }
                        }, 200)) : (o.wheelDX += i, o.wheelDY += r))
                    }
                }

                function sn(e, t, n) {
                    if ("string" == typeof t && (t = ua[t], !t))return !1;
                    e.display.input.ensurePolled();
                    var i = e.display.shift, r = !1;
                    try {
                        e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), r = t(e) != Pa
                    } finally {
                        e.display.shift = i, e.state.suppressEdits = !1
                    }
                    return r
                }

                function ln(e, t, n) {
                    for (var i = 0; i < e.state.keyMaps.length; i++) {
                        var r = ha(t, e.state.keyMaps[i], n, e);
                        if (r)return r
                    }
                    return e.options.extraKeys && ha(t, e.options.extraKeys, n, e) || ha(t, e.options.keyMap, n, e)
                }

                function cn(e, t, n, i) {
                    var r = e.state.keySeq;
                    if (r) {
                        if (fa(t))return "handled";
                        Zo.set(50, function () {
                            e.state.keySeq == r && (e.state.keySeq = null, e.display.input.reset())
                        }), t = r + " " + t
                    }
                    var o = ln(e, t, i);
                    return "multi" == o && (e.state.keySeq = t), "handled" == o && Sr(e, "keyHandled", e, t, n), "handled" != o && "multi" != o || (Ma(n), He(e)), r && !o && /\'$/.test(t) ? (Ma(n), !0) : !!o
                }

                function un(e, t) {
                    var n = pa(t, !0);
                    return !!n && (t.shiftKey && !e.state.keySeq ? cn(e, "Shift-" + n, t, function (t) {
                            return sn(e, t, !0)
                        }) || cn(e, n, t, function (t) {
                            return ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) ? sn(e, t) : void 0
                        }) : cn(e, n, t, function (t) {
                            return sn(e, t)
                        }))
                }

                function dn(e, t, n) {
                    return cn(e, "'" + n + "'", t, function (t) {
                        return sn(e, t, !0)
                    })
                }

                function hn(e) {
                    var t = this;
                    if (t.curOp.focus = qr(), !Tr(t, e)) {
                        bo && 11 > xo && 27 == e.keyCode && (e.returnValue = !1);
                        var n = e.keyCode;
                        t.display.shift = 16 == n || e.shiftKey;
                        var i = un(t, e);
                        So && (Jo = i ? n : null, !i && 88 == n && !is && (Ao ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), 18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || fn(t)
                    }
                }

                function fn(e) {
                    function t(e) {
                        18 != e.keyCode && e.altKey || (Za(n, "CodeMirror-crosshair"), Ea(document, "keyup", t), Ea(document, "mouseover", t))
                    }

                    var n = e.display.lineDiv;
                    Ja(n, "CodeMirror-crosshair"), Aa(document, "keyup", t), Aa(document, "mouseover", t)
                }

                function pn(e) {
                    16 == e.keyCode && (this.doc.sel.shift = !1), Tr(this, e)
                }

                function mn(e) {
                    var t = this;
                    if (!(qt(t.display, e) || Tr(t, e) || e.ctrlKey && !e.altKey || Ao && e.metaKey)) {
                        var n = e.keyCode, i = e.charCode;
                        if (So && n == Jo)return Jo = null, void Ma(e);
                        if (!So || e.which && !(e.which < 10) || !un(t, e)) {
                            var r = String.fromCharCode(null == i ? n : i);
                            dn(t, e, r) || t.display.input.onKeyPress(e)
                        }
                    }
                }

                function gn(e) {
                    e.state.delayingBlurEvent = !0, setTimeout(function () {
                        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, yn(e))
                    }, 100)
                }

                function vn(e) {
                    e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (Oa(e, "focus", e), e.state.focused = !0, Ja(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), wo && setTimeout(function () {
                        e.display.input.reset(!0)
                    }, 20)), e.display.input.receivedFocus()), He(e))
                }

                function yn(e) {
                    e.state.delayingBlurEvent || (e.state.focused && (Oa(e, "blur", e), e.state.focused = !1, Za(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function () {
                        e.state.focused || (e.display.shift = !1)
                    }, 150))
                }

                function bn(e, t) {
                    qt(e.display, t) || xn(e, t) || Tr(e, t, "contextmenu") || e.display.input.onContextMenu(t)
                }

                function xn(e, t) {
                    return !!_r(e, "gutterContextMenu") && Zt(e, t, "gutterContextMenu", !1)
                }

                function wn(e, t) {
                    if (Wo(e, t.from) < 0)return e;
                    if (Wo(e, t.to) <= 0)return Qo(t);
                    var n = e.line + t.text.length - (t.to.line - t.from.line) - 1, i = e.ch;
                    return e.line == t.to.line && (i += Qo(t).ch - t.to.ch), Ho(n, i)
                }

                function kn(e, t) {
                    for (var n = [], i = 0; i < e.sel.ranges.length; i++) {
                        var r = e.sel.ranges[i];
                        n.push(new de(wn(r.anchor, t), wn(r.head, t)))
                    }
                    return he(n, e.sel.primIndex)
                }

                function Cn(e, t, n) {
                    return e.line == t.line ? Ho(n.line, e.ch - t.ch + n.ch) : Ho(n.line + (e.line - t.line), e.ch)
                }

                function Sn(e, t, n) {
                    for (var i = [], r = Ho(e.first, 0), o = r, a = 0; a < t.length; a++) {
                        var s = t[a], l = Cn(s.from, r, o), c = Cn(Qo(s), r, o);
                        if (r = s.to, o = c, "around" == n) {
                            var u = e.sel.ranges[a], d = Wo(u.head, u.anchor) < 0;
                            i[a] = new de(d ? c : l, d ? l : c)
                        } else i[a] = new de(l, l)
                    }
                    return new ue(i, e.sel.primIndex)
                }

                function Ln(e, t, n) {
                    var i = {
                        canceled: !1, from: t.from, to: t.to, text: t.text, origin: t.origin, cancel: function () {
                            this.canceled = !0
                        }
                    };
                    return n && (i.update = function (t, n, i, r) {
                        t && (this.from = me(e, t)), n && (this.to = me(e, n)), i && (this.text = i), void 0 !== r && (this.origin = r)
                    }), Oa(e, "beforeChange", e, i), e.cm && Oa(e.cm, "beforeChange", e.cm, i), i.canceled ? null : {
                        from: i.from,
                        to: i.to,
                        text: i.text,
                        origin: i.origin
                    }
                }

                function Tn(e, t, n) {
                    if (e.cm) {
                        if (!e.cm.curOp)return At(e.cm, Tn)(e, t, n);
                        if (e.cm.state.suppressEdits)return
                    }
                    if (!(_r(e, "beforeChange") || e.cm && _r(e.cm, "beforeChange")) || (t = Ln(e, t, !0))) {
                        var i = Po && !n && li(e, t.from, t.to);
                        if (i)for (var r = i.length - 1; r >= 0; --r)Mn(e, {
                            from: i[r].from,
                            to: i[r].to,
                            text: r ? [""] : t.text
                        }); else Mn(e, t)
                    }
                }

                function Mn(e, t) {
                    if (1 != t.text.length || "" != t.text[0] || 0 != Wo(t.from, t.to)) {
                        var n = kn(e, t);
                        cr(e, t, n, e.cm ? e.cm.curOp.id : NaN), An(e, t, n, oi(e, t));
                        var i = [];
                        Ki(e, function (e, n) {
                            n || -1 != Or(i, e.history) || (br(e.history, t), i.push(e.history)), An(e, t, null, oi(e, t))
                        })
                    }
                }

                function _n(e, t, n) {
                    if (!e.cm || !e.cm.state.suppressEdits) {
                        for (var i, r = e.history, o = e.sel, a = "undo" == t ? r.done : r.undone, s = "undo" == t ? r.undone : r.done, l = 0; l < a.length && (i = a[l], n ? !i.ranges || i.equals(e.sel) : i.ranges); l++);
                        if (l != a.length) {
                            for (r.lastOrigin = r.lastSelOrigin = null; i = a.pop(), i.ranges;) {
                                if (hr(i, s), n && !i.equals(e.sel))return void Te(e, i, {clearRedo: !1});
                                o = i
                            }
                            var c = [];
                            hr(o, s), s.push({
                                changes: c,
                                generation: r.generation
                            }), r.generation = i.generation || ++r.maxGeneration;
                            for (var u = _r(e, "beforeChange") || e.cm && _r(e.cm, "beforeChange"), l = i.changes.length - 1; l >= 0; --l) {
                                var d = i.changes[l];
                                if (d.origin = t, u && !Ln(e, d, !1))return void(a.length = 0);
                                c.push(ar(e, d));
                                var h = l ? kn(e, d) : Er(a);
                                An(e, d, h, si(e, d)), !l && e.cm && e.cm.scrollIntoView({from: d.from, to: Qo(d)});
                                var f = [];
                                Ki(e, function (e, t) {
                                    t || -1 != Or(f, e.history) || (br(e.history, d), f.push(e.history)), An(e, d, null, si(e, d))
                                })
                            }
                        }
                    }
                }

                function Nn(e, t) {
                    if (0 != t && (e.first += t, e.sel = new ue(Ir(e.sel.ranges, function (e) {
                            return new de(Ho(e.anchor.line + t, e.anchor.ch), Ho(e.head.line + t, e.head.ch))
                        }), e.sel.primIndex), e.cm)) {
                        Bt(e.cm, e.first, e.first - t, t);
                        for (var n = e.cm.display, i = n.viewFrom; i < n.viewTo; i++)Pt(e.cm, i, "gutter")
                    }
                }

                function An(e, t, n, i) {
                    if (e.cm && !e.cm.curOp)return At(e.cm, An)(e, t, n, i);
                    if (t.to.line < e.first)return void Nn(e, t.text.length - 1 - (t.to.line - t.from.line));
                    if (!(t.from.line > e.lastLine())) {
                        if (t.from.line < e.first) {
                            var r = t.text.length - 1 - (e.first - t.from.line);
                            Nn(e, r), t = {
                                from: Ho(e.first, 0),
                                to: Ho(t.to.line + r, t.to.ch),
                                text: [Er(t.text)],
                                origin: t.origin
                            }
                        }
                        var o = e.lastLine();
                        t.to.line > o && (t = {
                            from: t.from,
                            to: Ho(o, Zi(e, o).text.length),
                            text: [t.text[0]],
                            origin: t.origin
                        }), t.removed = Ji(e, t.from, t.to), n || (n = kn(e, t)), e.cm ? Dn(e.cm, t, i) : Gi(e, t, i), Me(e, n, Ra)
                    }
                }

                function Dn(e, t, n) {
                    var i = e.doc, r = e.display, a = t.from, s = t.to, l = !1, c = a.line;
                    e.options.lineWrapping || (c = tr(yi(Zi(i, a.line))), i.iter(c, s.line + 1, function (e) {
                        return e == r.maxLine ? (l = !0, !0) : void 0
                    })), i.sel.contains(t.from, t.to) > -1 && Mr(e), Gi(i, t, n, o(e)), e.options.lineWrapping || (i.iter(c, a.line + t.text.length, function (e) {
                        var t = d(e);
                        t > r.maxLineLength && (r.maxLine = e, r.maxLineLength = t, r.maxLineChanged = !0, l = !1)
                    }), l && (e.curOp.updateMaxLine = !0)), i.frontier = Math.min(i.frontier, a.line), We(e, 400);
                    var u = t.text.length - (s.line - a.line) - 1;
                    t.full ? Bt(e) : a.line != s.line || 1 != t.text.length || qi(e.doc, t) ? Bt(e, a.line, s.line + 1, u) : Pt(e, a.line, "text");
                    var h = _r(e, "changes"), f = _r(e, "change");
                    if (f || h) {
                        var p = {from: a, to: s, text: t.text, removed: t.removed, origin: t.origin};
                        f && Sr(e, "change", e, p), h && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(p)
                    }
                    e.display.selForContextMenu = null
                }

                function En(e, t, n, i, r) {
                    if (i || (i = n), Wo(i, n) < 0) {
                        var o = i;
                        i = n, n = o
                    }
                    "string" == typeof t && (t = e.splitLines(t)), Tn(e, {from: n, to: i, text: t, origin: r})
                }

                function On(e, t) {
                    if (!Tr(e, "scrollCursorIntoView")) {
                        var n = e.display, i = n.sizer.getBoundingClientRect(), r = null;
                        if (t.top + i.top < 0 ? r = !0 : t.bottom + i.top > (window.innerHeight || document.documentElement.clientHeight) && (r = !1), null != r && !Mo) {
                            var o = jr("div", "​", null, "position: absolute; top: " + (t.top - n.viewOffset - Ue(e.display)) + "px; height: " + (t.bottom - t.top + Ge(e) + n.barHeight) + "px; left: " + t.left + "px; width: 2px;");
                            e.display.lineSpace.appendChild(o), o.scrollIntoView(r), e.display.lineSpace.removeChild(o)
                        }
                    }
                }

                function In(e, t, n, i) {
                    null == i && (i = 0);
                    for (var r = 0; 5 > r; r++) {
                        var o = !1, a = ft(e, t), s = n && n != t ? ft(e, n) : a, l = Pn(e, Math.min(a.left, s.left), Math.min(a.top, s.top) - i, Math.max(a.left, s.left), Math.max(a.bottom, s.bottom) + i), c = e.doc.scrollTop, u = e.doc.scrollLeft;
                        if (null != l.scrollTop && (rn(e, l.scrollTop), Math.abs(e.doc.scrollTop - c) > 1 && (o = !0)), null != l.scrollLeft && (on(e, l.scrollLeft), Math.abs(e.doc.scrollLeft - u) > 1 && (o = !0)), !o)break
                    }
                    return a
                }

                function Bn(e, t, n, i, r) {
                    var o = Pn(e, t, n, i, r);
                    null != o.scrollTop && rn(e, o.scrollTop), null != o.scrollLeft && on(e, o.scrollLeft)
                }

                function Pn(e, t, n, i, r) {
                    var o = e.display, a = yt(e.display);
                    0 > n && (n = 0);
                    var s = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : o.scroller.scrollTop, l = Ye(e), c = {};
                    r - n > l && (r = n + l);
                    var u = e.doc.height + $e(o), d = a > n, h = r > u - a;
                    if (s > n)c.scrollTop = d ? 0 : n; else if (r > s + l) {
                        var f = Math.min(n, (h ? u : r) - l);
                        f != s && (c.scrollTop = f)
                    }
                    var p = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : o.scroller.scrollLeft, m = Ve(e) - (e.options.fixedGutter ? o.gutters.offsetWidth : 0), g = i - t > m;
                    return g && (i = t + m), 10 > t ? c.scrollLeft = 0 : p > t ? c.scrollLeft = Math.max(0, t - (g ? 0 : 10)) : i > m + p - 3 && (c.scrollLeft = i + (g ? 0 : 10) - m), c
                }

                function Rn(e, t, n) {
                    null == t && null == n || Wn(e), null != t && (e.curOp.scrollLeft = (null == e.curOp.scrollLeft ? e.doc.scrollLeft : e.curOp.scrollLeft) + t), null != n && (e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + n)
                }

                function Hn(e) {
                    Wn(e);
                    var t = e.getCursor(), n = t, i = t;
                    e.options.lineWrapping || (n = t.ch ? Ho(t.line, t.ch - 1) : t, i = Ho(t.line, t.ch + 1)), e.curOp.scrollToPos = {
                        from: n,
                        to: i,
                        margin: e.options.cursorScrollMargin,
                        isCursor: !0
                    }
                }

                function Wn(e) {
                    var t = e.curOp.scrollToPos;
                    if (t) {
                        e.curOp.scrollToPos = null;
                        var n = pt(e, t.from), i = pt(e, t.to), r = Pn(e, Math.min(n.left, i.left), Math.min(n.top, i.top) - t.margin, Math.max(n.right, i.right), Math.max(n.bottom, i.bottom) + t.margin);
                        e.scrollTo(r.scrollLeft, r.scrollTop)
                    }
                }

                function Fn(e, t, n, i) {
                    var r, o = e.doc;
                    null == n && (n = "add"), "smart" == n && (o.mode.indent ? r = je(e, t) : n = "prev");
                    var a = e.options.tabSize, s = Zi(o, t), l = Fa(s.text, null, a);
                    s.stateAfter && (s.stateAfter = null);
                    var c, u = s.text.match(/^\s*/)[0];
                    if (i || /\S/.test(s.text)) {
                        if ("smart" == n && (c = o.mode.indent(r, s.text.slice(u.length), s.text), c == Pa || c > 150)) {
                            if (!i)return;
                            n = "prev"
                        }
                    } else c = 0, n = "not";
                    "prev" == n ? c = t > o.first ? Fa(Zi(o, t - 1).text, null, a) : 0 : "add" == n ? c = l + e.options.indentUnit : "subtract" == n ? c = l - e.options.indentUnit : "number" == typeof n && (c = l + n), c = Math.max(0, c);
                    var d = "", h = 0;
                    if (e.options.indentWithTabs)for (var f = Math.floor(c / a); f; --f)h += a, d += "\t";
                    if (c > h && (d += Dr(c - h)), d != u)return En(o, d, Ho(t, 0), Ho(t, u.length), "+input"), s.stateAfter = null, !0;
                    for (var f = 0; f < o.sel.ranges.length; f++) {
                        var p = o.sel.ranges[f];
                        if (p.head.line == t && p.head.ch < u.length) {
                            var h = Ho(t, u.length);
                            ke(o, f, new de(h, h));
                            break
                        }
                    }
                }

                function zn(e, t, n, i) {
                    var r = t, o = t;
                    return "number" == typeof t ? o = Zi(e, pe(e, t)) : r = tr(t), null == r ? null : (i(o, r) && e.cm && Pt(e.cm, r, n), o)
                }

                function jn(e, t) {
                    for (var n = e.doc.sel.ranges, i = [], r = 0; r < n.length; r++) {
                        for (var o = t(n[r]); i.length && Wo(o.from, Er(i).to) <= 0;) {
                            var a = i.pop();
                            if (Wo(a.from, o.from) < 0) {
                                o.from = a.from;
                                break
                            }
                        }
                        i.push(o)
                    }
                    Nt(e, function () {
                        for (var t = i.length - 1; t >= 0; t--)En(e.doc, "", i[t].from, i[t].to, "+delete");
                        Hn(e)
                    })
                }

                function Un(e, t, n, i, r) {
                    function o() {
                        var t = s + n;
                        return !(t < e.first || t >= e.first + e.size) && (s = t, u = Zi(e, t))
                    }

                    function a(e) {
                        var t = (r ? ho : fo)(u, l, n, !0);
                        if (null == t) {
                            if (e || !o())return !1;
                            l = r ? (0 > n ? ro : io)(u) : 0 > n ? u.text.length : 0
                        } else l = t;
                        return !0
                    }

                    var s = t.line, l = t.ch, c = n, u = Zi(e, s);
                    if ("char" == i)a(); else if ("column" == i)a(!0); else if ("word" == i || "group" == i)for (var d = null, h = "group" == i, f = e.cm && e.cm.getHelper(t, "wordChars"), p = !0; !(0 > n) || a(!p); p = !1) {
                        var m = u.text.charAt(l) || "\n", g = Wr(m, f) ? "w" : h && "\n" == m ? "n" : !h || /\s/.test(m) ? null : "p";
                        if (!h || p || g || (g = "s"), d && d != g) {
                            0 > n && (n = 1, a());
                            break
                        }
                        if (g && (d = g), n > 0 && !a(!p))break
                    }
                    var v = Ee(e, Ho(s, l), t, c, !0);
                    return Wo(t, v) || (v.hitSide = !0), v
                }

                function $n(e, t, n, i) {
                    var r, o = e.doc, a = t.left;
                    if ("page" == i) {
                        var s = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
                        r = t.top + n * (s - (0 > n ? 1.5 : .5) * yt(e.display))
                    } else"line" == i && (r = n > 0 ? t.bottom + 3 : t.top - 3);
                    for (; ;) {
                        var l = gt(e, a, r);
                        if (!l.outside)break;
                        if (0 > n ? 0 >= r : r >= o.height) {
                            l.hitSide = !0;
                            break
                        }
                        r += 5 * n
                    }
                    return l
                }

                function qn(t, n, i, r) {
                    e.defaults[t] = n, i && (ta[t] = r ? function (e, t, n) {
                        n != na && i(e, t, n)
                    } : i)
                }

                function Gn(e) {
                    for (var t, n, i, r, o = e.split(/-(?!$)/), e = o[o.length - 1], a = 0; a < o.length - 1; a++) {
                        var s = o[a];
                        if (/^(cmd|meta|m)$/i.test(s))r = !0; else if (/^a(lt)?$/i.test(s))t = !0; else if (/^(c|ctrl|control)$/i.test(s))n = !0; else {
                            if (!/^s(hift)$/i.test(s))throw new Error("Unrecognized modifier name: " + s);
                            i = !0
                        }
                    }
                    return t && (e = "Alt-" + e), n && (e = "Ctrl-" + e), r && (e = "Cmd-" + e), i && (e = "Shift-" + e), e
                }

                function Vn(e) {
                    return "string" == typeof e ? da[e] : e
                }

                function Yn(e, t, n, i, r) {
                    if (i && i.shared)return Kn(e, t, n, i, r);
                    if (e.cm && !e.cm.curOp)return At(e.cm, Yn)(e, t, n, i, r);
                    var o = new va(e, r), a = Wo(t, n);
                    if (i && Rr(i, o, !1), a > 0 || 0 == a && o.clearWhenEmpty !== !1)return o;
                    if (o.replacedWith && (o.collapsed = !0, o.widgetNode = jr("span", [o.replacedWith], "CodeMirror-widget"), i.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), i.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
                        if (vi(e, t.line, t, n, o) || t.line != n.line && vi(e, n.line, t, n, o))throw new Error("Inserting collapsed marker partially overlapping an existing one");
                        Ro = !0
                    }
                    o.addToHistory && cr(e, {from: t, to: n, origin: "markText"}, e.sel, NaN);
                    var s, l = t.line, c = e.cm;
                    if (e.iter(l, n.line + 1, function (e) {
                            c && o.collapsed && !c.options.lineWrapping && yi(e) == c.display.maxLine && (s = !0), o.collapsed && l != t.line && er(e, 0), ni(e, new Qn(o, l == t.line ? t.ch : null, l == n.line ? n.ch : null)), ++l
                        }), o.collapsed && e.iter(t.line, n.line + 1, function (t) {
                            ki(e, t) && er(t, 0)
                        }), o.clearOnEnter && Aa(o, "beforeCursorEnter", function () {
                            o.clear()
                        }), o.readOnly && (Po = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++ga, o.atomic = !0), c) {
                        if (s && (c.curOp.updateMaxLine = !0), o.collapsed)Bt(c, t.line, n.line + 1); else if (o.className || o.title || o.startStyle || o.endStyle || o.css)for (var u = t.line; u <= n.line; u++)Pt(c, u, "text");
                        o.atomic && Ne(c.doc), Sr(c, "markerAdded", c, o)
                    }
                    return o
                }

                function Kn(e, t, n, i, r) {
                    i = Rr(i), i.shared = !1;
                    var o = [Yn(e, t, n, i, r)], a = o[0], s = i.widgetNode;
                    return Ki(e, function (e) {
                        s && (i.widgetNode = s.cloneNode(!0)), o.push(Yn(e, me(e, t), me(e, n), i, r));
                        for (var l = 0; l < e.linked.length; ++l)if (e.linked[l].isParent)return;
                        a = Er(o)
                    }), new ya(o, a)
                }

                function Xn(e) {
                    return e.findMarks(Ho(e.first, 0), e.clipPos(Ho(e.lastLine())), function (e) {
                        return e.parent
                    })
                }

                function Zn(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n], r = i.find(), o = e.clipPos(r.from), a = e.clipPos(r.to);
                        if (Wo(o, a)) {
                            var s = Yn(e, o, a, i.primary, i.primary.type);
                            i.markers.push(s), s.parent = i
                        }
                    }
                }

                function Jn(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t], i = [n.primary.doc];
                        Ki(n.primary.doc, function (e) {
                            i.push(e)
                        });
                        for (var r = 0; r < n.markers.length; r++) {
                            var o = n.markers[r];
                            -1 == Or(i, o.doc) && (o.parent = null, n.markers.splice(r--, 1))
                        }
                    }
                }

                function Qn(e, t, n) {
                    this.marker = e, this.from = t, this.to = n
                }

                function ei(e, t) {
                    if (e)for (var n = 0; n < e.length; ++n) {
                        var i = e[n];
                        if (i.marker == t)return i
                    }
                }

                function ti(e, t) {
                    for (var n, i = 0; i < e.length; ++i)e[i] != t && (n || (n = [])).push(e[i]);
                    return n
                }

                function ni(e, t) {
                    e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e)
                }

                function ii(e, t, n) {
                    if (e)for (var i, r = 0; r < e.length; ++r) {
                        var o = e[r], a = o.marker, s = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);
                        if (s || o.from == t && "bookmark" == a.type && (!n || !o.marker.insertLeft)) {
                            var l = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);
                            (i || (i = [])).push(new Qn(a, o.from, l ? null : o.to))
                        }
                    }
                    return i
                }

                function ri(e, t, n) {
                    if (e)for (var i, r = 0; r < e.length; ++r) {
                        var o = e[r], a = o.marker, s = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);
                        if (s || o.from == t && "bookmark" == a.type && (!n || o.marker.insertLeft)) {
                            var l = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);
                            (i || (i = [])).push(new Qn(a, l ? null : o.from - t, null == o.to ? null : o.to - t))
                        }
                    }
                    return i
                }

                function oi(e, t) {
                    if (t.full)return null;
                    var n = ve(e, t.from.line) && Zi(e, t.from.line).markedSpans, i = ve(e, t.to.line) && Zi(e, t.to.line).markedSpans;
                    if (!n && !i)return null;
                    var r = t.from.ch, o = t.to.ch, a = 0 == Wo(t.from, t.to), s = ii(n, r, a), l = ri(i, o, a), c = 1 == t.text.length, u = Er(t.text).length + (c ? r : 0);
                    if (s)for (var d = 0; d < s.length; ++d) {
                        var h = s[d];
                        if (null == h.to) {
                            var f = ei(l, h.marker);
                            f ? c && (h.to = null == f.to ? null : f.to + u) : h.to = r
                        }
                    }
                    if (l)for (var d = 0; d < l.length; ++d) {
                        var h = l[d];
                        if (null != h.to && (h.to += u), null == h.from) {
                            var f = ei(s, h.marker);
                            f || (h.from = u, c && (s || (s = [])).push(h))
                        } else h.from += u, c && (s || (s = [])).push(h)
                    }
                    s && (s = ai(s)), l && l != s && (l = ai(l));
                    var p = [s];
                    if (!c) {
                        var m, g = t.text.length - 2;
                        if (g > 0 && s)for (var d = 0; d < s.length; ++d)null == s[d].to && (m || (m = [])).push(new Qn(s[d].marker, null, null));
                        for (var d = 0; g > d; ++d)p.push(m);
                        p.push(l)
                    }
                    return p
                }

                function ai(e) {
                    for (var t = 0; t < e.length; ++t) {
                        var n = e[t];
                        null != n.from && n.from == n.to && n.marker.clearWhenEmpty !== !1 && e.splice(t--, 1)
                    }
                    return e.length ? e : null
                }

                function si(e, t) {
                    var n = mr(e, t), i = oi(e, t);
                    if (!n)return i;
                    if (!i)return n;
                    for (var r = 0; r < n.length; ++r) {
                        var o = n[r], a = i[r];
                        if (o && a)e:for (var s = 0; s < a.length; ++s) {
                            for (var l = a[s], c = 0; c < o.length; ++c)if (o[c].marker == l.marker)continue e;
                            o.push(l)
                        } else a && (n[r] = a)
                    }
                    return n
                }

                function li(e, t, n) {
                    var i = null;
                    if (e.iter(t.line, n.line + 1, function (e) {
                            if (e.markedSpans)for (var t = 0; t < e.markedSpans.length; ++t) {
                                var n = e.markedSpans[t].marker;
                                !n.readOnly || i && -1 != Or(i, n) || (i || (i = [])).push(n)
                            }
                        }), !i)return null;
                    for (var r = [{
                        from: t,
                        to: n
                    }], o = 0; o < i.length; ++o)for (var a = i[o], s = a.find(0), l = 0; l < r.length; ++l) {
                        var c = r[l];
                        if (!(Wo(c.to, s.from) < 0 || Wo(c.from, s.to) > 0)) {
                            var u = [l, 1], d = Wo(c.from, s.from), h = Wo(c.to, s.to);
                            (0 > d || !a.inclusiveLeft && !d) && u.push({
                                from: c.from,
                                to: s.from
                            }), (h > 0 || !a.inclusiveRight && !h) && u.push({
                                from: s.to,
                                to: c.to
                            }), r.splice.apply(r, u), l += u.length - 1
                        }
                    }
                    return r
                }

                function ci(e) {
                    var t = e.markedSpans;
                    if (t) {
                        for (var n = 0; n < t.length; ++n)t[n].marker.detachLine(e);
                        e.markedSpans = null
                    }
                }

                function ui(e, t) {
                    if (t) {
                        for (var n = 0; n < t.length; ++n)t[n].marker.attachLine(e);
                        e.markedSpans = t
                    }
                }

                function di(e) {
                    return e.inclusiveLeft ? -1 : 0
                }

                function hi(e) {
                    return e.inclusiveRight ? 1 : 0
                }

                function fi(e, t) {
                    var n = e.lines.length - t.lines.length;
                    if (0 != n)return n;
                    var i = e.find(), r = t.find(), o = Wo(i.from, r.from) || di(e) - di(t);
                    if (o)return -o;
                    var a = Wo(i.to, r.to) || hi(e) - hi(t);
                    return a ? a : t.id - e.id
                }

                function pi(e, t) {
                    var n, i = Ro && e.markedSpans;
                    if (i)for (var r, o = 0; o < i.length; ++o)r = i[o], r.marker.collapsed && null == (t ? r.from : r.to) && (!n || fi(n, r.marker) < 0) && (n = r.marker);
                    return n
                }

                function mi(e) {
                    return pi(e, !0)
                }

                function gi(e) {
                    return pi(e, !1)
                }

                function vi(e, t, n, i, r) {
                    var o = Zi(e, t), a = Ro && o.markedSpans;
                    if (a)for (var s = 0; s < a.length; ++s) {
                        var l = a[s];
                        if (l.marker.collapsed) {
                            var c = l.marker.find(0), u = Wo(c.from, n) || di(l.marker) - di(r), d = Wo(c.to, i) || hi(l.marker) - hi(r);
                            if (!(u >= 0 && 0 >= d || 0 >= u && d >= 0) && (0 >= u && (l.marker.inclusiveRight && r.inclusiveLeft ? Wo(c.to, n) >= 0 : Wo(c.to, n) > 0) || u >= 0 && (l.marker.inclusiveRight && r.inclusiveLeft ? Wo(c.from, i) <= 0 : Wo(c.from, i) < 0)))return !0
                        }
                    }
                }

                function yi(e) {
                    for (var t; t = mi(e);)e = t.find(-1, !0).line;
                    return e
                }

                function bi(e) {
                    for (var t, n; t = gi(e);)e = t.find(1, !0).line, (n || (n = [])).push(e);
                    return n
                }

                function xi(e, t) {
                    var n = Zi(e, t), i = yi(n);
                    return n == i ? t : tr(i)
                }

                function wi(e, t) {
                    if (t > e.lastLine())return t;
                    var n, i = Zi(e, t);
                    if (!ki(e, i))return t;
                    for (; n = gi(i);)i = n.find(1, !0).line;
                    return tr(i) + 1
                }

                function ki(e, t) {
                    var n = Ro && t.markedSpans;
                    if (n)for (var i, r = 0; r < n.length; ++r)if (i = n[r], i.marker.collapsed) {
                        if (null == i.from)return !0;
                        if (!i.marker.widgetNode && 0 == i.from && i.marker.inclusiveLeft && Ci(e, t, i))return !0
                    }
                }

                function Ci(e, t, n) {
                    if (null == n.to) {
                        var i = n.marker.find(1, !0);
                        return Ci(e, i.line, ei(i.line.markedSpans, n.marker))
                    }
                    if (n.marker.inclusiveRight && n.to == t.text.length)return !0;
                    for (var r, o = 0; o < t.markedSpans.length; ++o)if (r = t.markedSpans[o], r.marker.collapsed && !r.marker.widgetNode && r.from == n.to && (null == r.to || r.to != n.from) && (r.marker.inclusiveLeft || n.marker.inclusiveRight) && Ci(e, t, r))return !0
                }

                function Si(e, t, n) {
                    ir(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Rn(e, null, n)
                }

                function Li(e) {
                    if (null != e.height)return e.height;
                    var t = e.doc.cm;
                    if (!t)return 0;
                    if (!Ya(document.body, e.node)) {
                        var n = "position: relative;";
                        e.coverGutter && (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (n += "width: " + t.display.wrapper.clientWidth + "px;"), $r(t.display.measure, jr("div", [e.node], null, n))
                    }
                    return e.height = e.node.parentNode.offsetHeight
                }

                function Ti(e, t, n, i) {
                    var r = new ba(e, n, i), o = e.cm;
                    return o && r.noHScroll && (o.display.alignWidgets = !0), zn(e, t, "widget", function (t) {
                        var n = t.widgets || (t.widgets = []);
                        if (null == r.insertAt ? n.push(r) : n.splice(Math.min(n.length - 1, Math.max(0, r.insertAt)), 0, r), r.line = t, o && !ki(e, t)) {
                            var i = ir(t) < e.scrollTop;
                            er(t, t.height + Li(r)), i && Rn(o, null, r.height), o.curOp.forceUpdate = !0
                        }
                        return !0
                    }), r
                }

                function Mi(e, t, n, i) {
                    e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), ci(e), ui(e, n);
                    var r = i ? i(e) : 1;
                    r != e.height && er(e, r)
                }

                function _i(e) {
                    e.parent = null, ci(e)
                }

                function Ni(e, t) {
                    if (e)for (; ;) {
                        var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                        if (!n)break;
                        e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
                        var i = n[1] ? "bgClass" : "textClass";
                        null == t[i] ? t[i] = n[2] : new RegExp("(?:^|s)" + n[2] + "(?:$|s)").test(t[i]) || (t[i] += " " + n[2])
                    }
                    return e
                }

                function Ai(t, n) {
                    if (t.blankLine)return t.blankLine(n);
                    if (t.innerMode) {
                        var i = e.innerMode(t, n);
                        return i.mode.blankLine ? i.mode.blankLine(i.state) : void 0
                    }
                }

                function Di(t, n, i, r) {
                    for (var o = 0; 10 > o; o++) {
                        r && (r[0] = e.innerMode(t, i).mode);
                        var a = t.token(n, i);
                        if (n.pos > n.start)return a
                    }
                    throw new Error("Mode " + t.name + " failed to advance stream.")
                }

                function Ei(e, t, n, i) {
                    function r(e) {
                        return {
                            start: d.start,
                            end: d.pos,
                            string: d.current(),
                            type: o || null,
                            state: e ? la(a.mode, u) : u
                        }
                    }

                    var o, a = e.doc, s = a.mode;
                    t = me(a, t);
                    var l, c = Zi(a, t.line), u = je(e, t.line, n), d = new ma(c.text, e.options.tabSize);
                    for (i && (l = []); (i || d.pos < t.ch) && !d.eol();)d.start = d.pos, o = Di(s, d, u), i && l.push(r(!0));
                    return i ? l : r()
                }

                function Oi(e, t, n, i, r, o, a) {
                    var s = n.flattenSpans;
                    null == s && (s = e.options.flattenSpans);
                    var l, c = 0, u = null, d = new ma(t, e.options.tabSize), h = e.options.addModeClass && [null];
                    for ("" == t && Ni(Ai(n, i), o); !d.eol();) {
                        if (d.pos > e.options.maxHighlightLength ? (s = !1, a && Pi(e, t, i, d.pos), d.pos = t.length, l = null) : l = Ni(Di(n, d, i, h), o), h) {
                            var f = h[0].name;
                            f && (l = "m-" + (l ? f + " " + l : f))
                        }
                        if (!s || u != l) {
                            for (; c < d.start;)c = Math.min(d.start, c + 5e4), r(c, u);
                            u = l
                        }
                        d.start = d.pos
                    }
                    for (; c < d.pos;) {
                        var p = Math.min(d.pos, c + 5e4);
                        r(p, u), c = p
                    }
                }

                function Ii(e, t, n, i) {
                    var r = [e.state.modeGen], o = {};
                    Oi(e, t.text, e.doc.mode, n, function (e, t) {
                        r.push(e, t)
                    }, o, i);
                    for (var a = 0; a < e.state.overlays.length; ++a) {
                        var s = e.state.overlays[a], l = 1, c = 0;
                        Oi(e, t.text, s.mode, !0, function (e, t) {
                            for (var n = l; e > c;) {
                                var i = r[l];
                                i > e && r.splice(l, 1, e, r[l + 1], i), l += 2, c = Math.min(e, i)
                            }
                            if (t)if (s.opaque)r.splice(n, l - n, e, "cm-overlay " + t), l = n + 2; else for (; l > n; n += 2) {
                                var o = r[n + 1];
                                r[n + 1] = (o ? o + " " : "") + "cm-overlay " + t
                            }
                        }, o)
                    }
                    return {styles: r, classes: o.bgClass || o.textClass ? o : null}
                }

                function Bi(e, t, n) {
                    if (!t.styles || t.styles[0] != e.state.modeGen) {
                        var i = je(e, tr(t)), r = Ii(e, t, t.text.length > e.options.maxHighlightLength ? la(e.doc.mode, i) : i);
                        t.stateAfter = i, t.styles = r.styles, r.classes ? t.styleClasses = r.classes : t.styleClasses && (t.styleClasses = null), n === e.doc.frontier && e.doc.frontier++
                    }
                    return t.styles
                }

                function Pi(e, t, n, i) {
                    var r = e.doc.mode, o = new ma(t, e.options.tabSize);
                    for (o.start = o.pos = i || 0, "" == t && Ai(r, n); !o.eol();)Di(r, o, n), o.start = o.pos
                }

                function Ri(e, t) {
                    if (!e || /^\s*$/.test(e))return null;
                    var n = t.addModeClass ? ka : wa;
                    return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"))
                }

                function Hi(e, t) {
                    var n = jr("span", null, null, wo ? "padding-right: .1px" : null), i = {
                        pre: jr("pre", [n], "CodeMirror-line"),
                        content: n,
                        col: 0,
                        pos: 0,
                        cm: e,
                        splitSpaces: (bo || wo) && e.getOption("lineWrapping")
                    };
                    t.measure = {};
                    for (var r = 0; r <= (t.rest ? t.rest.length : 0); r++) {
                        var o, a = r ? t.rest[r - 1] : t.line;
                        i.pos = 0, i.addToken = Fi, Jr(e.display.measure) && (o = rr(a)) && (i.addToken = ji(i.addToken, o)), i.map = [];
                        var s = t != e.display.externalMeasured && tr(a);
                        $i(a, i, Bi(e, a, s)), a.styleClasses && (a.styleClasses.bgClass && (i.bgClass = Vr(a.styleClasses.bgClass, i.bgClass || "")), a.styleClasses.textClass && (i.textClass = Vr(a.styleClasses.textClass, i.textClass || ""))), 0 == i.map.length && i.map.push(0, 0, i.content.appendChild(Zr(e.display.measure))), 0 == r ? (t.measure.map = i.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(i.map), (t.measure.caches || (t.measure.caches = [])).push({}))
                    }
                    if (wo) {
                        var l = i.content.lastChild;
                        (/\bcm-tab\b/.test(l.className) || l.querySelector && l.querySelector(".cm-tab")) && (i.content.className = "cm-tab-wrap-hack")
                    }
                    return Oa(e, "renderLine", e, t.line, i.pre), i.pre.className && (i.textClass = Vr(i.pre.className, i.textClass || "")), i
                }

                function Wi(e) {
                    var t = jr("span", "•", "cm-invalidchar");
                    return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t
                }

                function Fi(e, t, n, i, r, o, a) {
                    if (t) {
                        var s = e.splitSpaces ? t.replace(/ {3,}/g, zi) : t, l = e.cm.state.specialChars, c = !1;
                        if (l.test(t))for (var u = document.createDocumentFragment(), d = 0; ;) {
                            l.lastIndex = d;
                            var h = l.exec(t), f = h ? h.index - d : t.length - d;
                            if (f) {
                                var p = document.createTextNode(s.slice(d, d + f));
                                bo && 9 > xo ? u.appendChild(jr("span", [p])) : u.appendChild(p), e.map.push(e.pos, e.pos + f, p), e.col += f, e.pos += f
                            }
                            if (!h)break;
                            if (d += f + 1, "\t" == h[0]) {
                                var m = e.cm.options.tabSize, g = m - e.col % m, p = u.appendChild(jr("span", Dr(g), "cm-tab"));
                                p.setAttribute("role", "presentation"), p.setAttribute("cm-text", "\t"), e.col += g
                            } else if ("\r" == h[0] || "\n" == h[0]) {
                                var p = u.appendChild(jr("span", "\r" == h[0] ? "␍" : "␤", "cm-invalidchar"));
                                p.setAttribute("cm-text", h[0]), e.col += 1
                            } else {
                                var p = e.cm.options.specialCharPlaceholder(h[0]);
                                p.setAttribute("cm-text", h[0]), bo && 9 > xo ? u.appendChild(jr("span", [p])) : u.appendChild(p), e.col += 1
                            }
                            e.map.push(e.pos, e.pos + 1, p), e.pos++
                        } else {
                            e.col += t.length;
                            var u = document.createTextNode(s);
                            e.map.push(e.pos, e.pos + t.length, u), bo && 9 > xo && (c = !0), e.pos += t.length
                        }
                        if (n || i || r || c || a) {
                            var v = n || "";
                            i && (v += i), r && (v += r);
                            var y = jr("span", [u], v, a);
                            return o && (y.title = o), e.content.appendChild(y)
                        }
                        e.content.appendChild(u)
                    }
                }

                function zi(e) {
                    for (var t = " ", n = 0; n < e.length - 2; ++n)t += n % 2 ? " " : " ";
                    return t += " "
                }

                function ji(e, t) {
                    return function (n, i, r, o, a, s, l) {
                        r = r ? r + " cm-force-border" : "cm-force-border";
                        for (var c = n.pos, u = c + i.length; ;) {
                            for (var d = 0; d < t.length; d++) {
                                var h = t[d];
                                if (h.to > c && h.from <= c)break
                            }
                            if (h.to >= u)return e(n, i, r, o, a, s, l);
                            e(n, i.slice(0, h.to - c), r, o, null, s, l), o = null, i = i.slice(h.to - c), c = h.to
                        }
                    }
                }

                function Ui(e, t, n, i) {
                    var r = !i && n.widgetNode;
                    r && e.map.push(e.pos, e.pos + t, r), !i && e.cm.display.input.needsContentAttribute && (r || (r = e.content.appendChild(document.createElement("span"))), r.setAttribute("cm-marker", n.id)), r && (e.cm.display.input.setUneditable(r), e.content.appendChild(r)), e.pos += t
                }

                function $i(e, t, n) {
                    var i = e.markedSpans, r = e.text, o = 0;
                    if (i)for (var a, s, l, c, u, d, h, f = r.length, p = 0, m = 1, g = "", v = 0; ;) {
                        if (v == p) {
                            l = c = u = d = s = "", h = null, v = 1 / 0;
                            for (var y, b = [], x = 0; x < i.length; ++x) {
                                var w = i[x], k = w.marker;
                                "bookmark" == k.type && w.from == p && k.widgetNode ? b.push(k) : w.from <= p && (null == w.to || w.to > p || k.collapsed && w.to == p && w.from == p) ? (null != w.to && w.to != p && v > w.to && (v = w.to, c = ""), k.className && (l += " " + k.className), k.css && (s = (s ? s + ";" : "") + k.css), k.startStyle && w.from == p && (u += " " + k.startStyle), k.endStyle && w.to == v && (y || (y = [])).push(k.endStyle, w.to), k.title && !d && (d = k.title), k.collapsed && (!h || fi(h.marker, k) < 0) && (h = w)) : w.from > p && v > w.from && (v = w.from)
                            }
                            if (y)for (var x = 0; x < y.length; x += 2)y[x + 1] == v && (c += " " + y[x]);
                            if (!h || h.from == p)for (var x = 0; x < b.length; ++x)Ui(t, 0, b[x]);
                            if (h && (h.from || 0) == p) {
                                if (Ui(t, (null == h.to ? f + 1 : h.to) - p, h.marker, null == h.from), null == h.to)return;
                                h.to == p && (h = !1)
                            }
                        }
                        if (p >= f)break;
                        for (var C = Math.min(f, v); ;) {
                            if (g) {
                                var S = p + g.length;
                                if (!h) {
                                    var L = S > C ? g.slice(0, C - p) : g;
                                    t.addToken(t, L, a ? a + l : l, u, p + L.length == v ? c : "", d, s)
                                }
                                if (S >= C) {
                                    g = g.slice(C - p), p = C;
                                    break
                                }
                                p = S, u = ""
                            }
                            g = r.slice(o, o = n[m++]), a = Ri(n[m++], t.cm.options)
                        }
                    } else for (var m = 1; m < n.length; m += 2)t.addToken(t, r.slice(o, o = n[m]), Ri(n[m + 1], t.cm.options))
                }

                function qi(e, t) {
                    return 0 == t.from.ch && 0 == t.to.ch && "" == Er(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
                }

                function Gi(e, t, n, i) {
                    function r(e) {
                        return n ? n[e] : null
                    }

                    function o(e, n, r) {
                        Mi(e, n, r, i), Sr(e, "change", e, t)
                    }

                    function a(e, t) {
                        for (var n = e, o = []; t > n; ++n)o.push(new xa(c[n], r(n), i));
                        return o
                    }

                    var s = t.from, l = t.to, c = t.text, u = Zi(e, s.line), d = Zi(e, l.line), h = Er(c), f = r(c.length - 1), p = l.line - s.line;
                    if (t.full)e.insert(0, a(0, c.length)), e.remove(c.length, e.size - c.length); else if (qi(e, t)) {
                        var m = a(0, c.length - 1);
                        o(d, d.text, f), p && e.remove(s.line, p), m.length && e.insert(s.line, m)
                    } else if (u == d)if (1 == c.length)o(u, u.text.slice(0, s.ch) + h + u.text.slice(l.ch), f); else {
                        var m = a(1, c.length - 1);
                        m.push(new xa(h + u.text.slice(l.ch), f, i)), o(u, u.text.slice(0, s.ch) + c[0], r(0)), e.insert(s.line + 1, m)
                    } else if (1 == c.length)o(u, u.text.slice(0, s.ch) + c[0] + d.text.slice(l.ch), r(0)), e.remove(s.line + 1, p); else {
                        o(u, u.text.slice(0, s.ch) + c[0], r(0)), o(d, h + d.text.slice(l.ch), f);
                        var m = a(1, c.length - 1);
                        p > 1 && e.remove(s.line + 1, p - 1), e.insert(s.line + 1, m)
                    }
                    Sr(e, "change", e, t)
                }

                function Vi(e) {
                    this.lines = e, this.parent = null;
                    for (var t = 0, n = 0; t < e.length; ++t)e[t].parent = this, n += e[t].height;
                    this.height = n
                }

                function Yi(e) {
                    this.children = e;
                    for (var t = 0, n = 0, i = 0; i < e.length; ++i) {
                        var r = e[i];
                        t += r.chunkSize(), n += r.height, r.parent = this
                    }
                    this.size = t, this.height = n, this.parent = null
                }

                function Ki(e, t, n) {
                    function i(e, r, o) {
                        if (e.linked)for (var a = 0; a < e.linked.length; ++a) {
                            var s = e.linked[a];
                            if (s.doc != r) {
                                var l = o && s.sharedHist;
                                n && !l || (t(s.doc, l), i(s.doc, e, l))
                            }
                        }
                    }

                    i(e, null, !0)
                }

                function Xi(e, t) {
                    if (t.cm)throw new Error("This document is already in use.");
                    e.doc = t, t.cm = e, a(e), n(e), e.options.lineWrapping || h(e), e.options.mode = t.modeOption, Bt(e)
                }

                function Zi(e, t) {
                    if (t -= e.first, 0 > t || t >= e.size)throw new Error("There is no line " + (t + e.first) + " in the document.");
                    for (var n = e; !n.lines;)for (var i = 0; ; ++i) {
                        var r = n.children[i], o = r.chunkSize();
                        if (o > t) {
                            n = r;
                            break
                        }
                        t -= o
                    }
                    return n.lines[t]
                }

                function Ji(e, t, n) {
                    var i = [], r = t.line;
                    return e.iter(t.line, n.line + 1, function (e) {
                        var o = e.text;
                        r == n.line && (o = o.slice(0, n.ch)), r == t.line && (o = o.slice(t.ch)), i.push(o), ++r
                    }), i
                }

                function Qi(e, t, n) {
                    var i = [];
                    return e.iter(t, n, function (e) {
                        i.push(e.text)
                    }), i
                }

                function er(e, t) {
                    var n = t - e.height;
                    if (n)for (var i = e; i; i = i.parent)i.height += n
                }

                function tr(e) {
                    if (null == e.parent)return null;
                    for (var t = e.parent, n = Or(t.lines, e), i = t.parent; i; t = i, i = i.parent)for (var r = 0; i.children[r] != t; ++r)n += i.children[r].chunkSize();
                    return n + t.first
                }

                function nr(e, t) {
                    var n = e.first;
                    e:do {
                        for (var i = 0; i < e.children.length; ++i) {
                            var r = e.children[i], o = r.height;
                            if (o > t) {
                                e = r;
                                continue e
                            }
                            t -= o, n += r.chunkSize()
                        }
                        return n
                    } while (!e.lines);
                    for (var i = 0; i < e.lines.length; ++i) {
                        var a = e.lines[i], s = a.height;
                        if (s > t)break;
                        t -= s
                    }
                    return n + i
                }

                function ir(e) {
                    e = yi(e);
                    for (var t = 0, n = e.parent, i = 0; i < n.lines.length; ++i) {
                        var r = n.lines[i];
                        if (r == e)break;
                        t += r.height
                    }
                    for (var o = n.parent; o; n = o, o = n.parent)for (var i = 0; i < o.children.length; ++i) {
                        var a = o.children[i];
                        if (a == n)break;
                        t += a.height
                    }
                    return t
                }

                function rr(e) {
                    var t = e.order;
                    return null == t && (t = e.order = ss(e.text)), t
                }

                function or(e) {
                    this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1
                }

                function ar(e, t) {
                    var n = {from: V(t.from), to: Qo(t), text: Ji(e, t.from, t.to)};
                    return fr(e, n, t.from.line, t.to.line + 1), Ki(e, function (e) {
                        fr(e, n, t.from.line, t.to.line + 1)
                    }, !0), n
                }

                function sr(e) {
                    for (; e.length;) {
                        var t = Er(e);
                        if (!t.ranges)break;
                        e.pop()
                    }
                }

                function lr(e, t) {
                    return t ? (sr(e.done), Er(e.done)) : e.done.length && !Er(e.done).ranges ? Er(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), Er(e.done)) : void 0
                }

                function cr(e, t, n, i) {
                    var r = e.history;
                    r.undone.length = 0;
                    var o, a = +new Date;
                    if ((r.lastOp == i || r.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && e.cm && r.lastModTime > a - e.cm.options.historyEventDelay || "*" == t.origin.charAt(0))) && (o = lr(r, r.lastOp == i))) {
                        var s = Er(o.changes);
                        0 == Wo(t.from, t.to) && 0 == Wo(t.from, s.to) ? s.to = Qo(t) : o.changes.push(ar(e, t))
                    } else {
                        var l = Er(r.done);
                        for (l && l.ranges || hr(e.sel, r.done), o = {
                            changes: [ar(e, t)],
                            generation: r.generation
                        }, r.done.push(o); r.done.length > r.undoDepth;)r.done.shift(), r.done[0].ranges || r.done.shift()
                    }
                    r.done.push(n), r.generation = ++r.maxGeneration, r.lastModTime = r.lastSelTime = a, r.lastOp = r.lastSelOp = i, r.lastOrigin = r.lastSelOrigin = t.origin, s || Oa(e, "historyAdded")
                }

                function ur(e, t, n, i) {
                    var r = t.charAt(0);
                    return "*" == r || "+" == r && n.ranges.length == i.ranges.length && n.somethingSelected() == i.somethingSelected() && new Date - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500)
                }

                function dr(e, t, n, i) {
                    var r = e.history, o = i && i.origin;
                    n == r.lastSelOp || o && r.lastSelOrigin == o && (r.lastModTime == r.lastSelTime && r.lastOrigin == o || ur(e, o, Er(r.done), t)) ? r.done[r.done.length - 1] = t : hr(t, r.done), r.lastSelTime = +new Date, r.lastSelOrigin = o, r.lastSelOp = n, i && i.clearRedo !== !1 && sr(r.undone)
                }

                function hr(e, t) {
                    var n = Er(t);
                    n && n.ranges && n.equals(e) || t.push(e)
                }

                function fr(e, t, n, i) {
                    var r = t["spans_" + e.id], o = 0;
                    e.iter(Math.max(e.first, n), Math.min(e.first + e.size, i), function (n) {
                        n.markedSpans && ((r || (r = t["spans_" + e.id] = {}))[o] = n.markedSpans), ++o
                    })
                }

                function pr(e) {
                    if (!e)return null;
                    for (var t, n = 0; n < e.length; ++n)e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
                    return t ? t.length ? t : null : e
                }

                function mr(e, t) {
                    var n = t["spans_" + e.id];
                    if (!n)return null;
                    for (var i = 0, r = []; i < t.text.length; ++i)r.push(pr(n[i]));
                    return r
                }

                function gr(e, t, n) {
                    for (var i = 0, r = []; i < e.length; ++i) {
                        var o = e[i];
                        if (o.ranges)r.push(n ? ue.prototype.deepCopy.call(o) : o); else {
                            var a = o.changes, s = [];
                            r.push({changes: s});
                            for (var l = 0; l < a.length; ++l) {
                                var c, u = a[l];
                                if (s.push({
                                        from: u.from,
                                        to: u.to,
                                        text: u.text
                                    }), t)for (var d in u)(c = d.match(/^spans_(\d+)$/)) && Or(t, Number(c[1])) > -1 && (Er(s)[d] = u[d], delete u[d])
                            }
                        }
                    }
                    return r
                }

                function vr(e, t, n, i) {
                    n < e.line ? e.line += i : t < e.line && (e.line = t, e.ch = 0)
                }

                function yr(e, t, n, i) {
                    for (var r = 0; r < e.length; ++r) {
                        var o = e[r], a = !0;
                        if (o.ranges) {
                            o.copied || (o = e[r] = o.deepCopy(), o.copied = !0);
                            for (var s = 0; s < o.ranges.length; s++)vr(o.ranges[s].anchor, t, n, i), vr(o.ranges[s].head, t, n, i)
                        } else {
                            for (var s = 0; s < o.changes.length; ++s) {
                                var l = o.changes[s];
                                if (n < l.from.line)l.from = Ho(l.from.line + i, l.from.ch), l.to = Ho(l.to.line + i, l.to.ch); else if (t <= l.to.line) {
                                    a = !1;
                                    break
                                }
                            }
                            a || (e.splice(0, r + 1), r = 0)
                        }
                    }
                }

                function br(e, t) {
                    var n = t.from.line, i = t.to.line, r = t.text.length - (i - n) - 1;
                    yr(e.done, n, i, r), yr(e.undone, n, i, r)
                }

                function xr(e) {
                    return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
                }

                function wr(e) {
                    return e.target || e.srcElement
                }

                function kr(e) {
                    var t = e.which;
                    return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), Ao && e.ctrlKey && 1 == t && (t = 3), t
                }

                function Cr(e, t, n) {
                    var i = e._handlers && e._handlers[t];
                    return n ? i && i.length > 0 ? i.slice() : Da : i || Da
                }

                function Sr(e, t) {
                    function n(e) {
                        return function () {
                            e.apply(null, o)
                        }
                    }

                    var i = Cr(e, t, !1);
                    if (i.length) {
                        var r, o = Array.prototype.slice.call(arguments, 2);
                        qo ? r = qo.delayedCallbacks : Ia ? r = Ia : (r = Ia = [], setTimeout(Lr, 0));
                        for (var a = 0; a < i.length; ++a)r.push(n(i[a]))
                    }
                }

                function Lr() {
                    var e = Ia;
                    Ia = null;
                    for (var t = 0; t < e.length; ++t)e[t]()
                }

                function Tr(e, t, n) {
                    return "string" == typeof t && (t = {
                        type: t, preventDefault: function () {
                            this.defaultPrevented = !0
                        }
                    }), Oa(e, n || t.type, e, t), xr(t) || t.codemirrorIgnore
                }

                function Mr(e) {
                    var t = e._handlers && e._handlers.cursorActivity;
                    if (t)for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), i = 0; i < t.length; ++i)-1 == Or(n, t[i]) && n.push(t[i])
                }

                function _r(e, t) {
                    return Cr(e, t).length > 0
                }

                function Nr(e) {
                    e.prototype.on = function (e, t) {
                        Aa(this, e, t)
                    }, e.prototype.off = function (e, t) {
                        Ea(this, e, t)
                    }
                }

                function Ar() {
                    this.id = null
                }

                function Dr(e) {
                    for (; ja.length <= e;)ja.push(Er(ja) + " ");
                    return ja[e]
                }

                function Er(e) {
                    return e[e.length - 1]
                }

                function Or(e, t) {
                    for (var n = 0; n < e.length; ++n)if (e[n] == t)return n;
                    return -1
                }

                function Ir(e, t) {
                    for (var n = [], i = 0; i < e.length; i++)n[i] = t(e[i], i);
                    return n
                }

                function Br() {
                }

                function Pr(e, t) {
                    var n;
                    return Object.create ? n = Object.create(e) : (Br.prototype = e, n = new Br), t && Rr(t, n), n
                }

                function Rr(e, t, n) {
                    t || (t = {});
                    for (var i in e)!e.hasOwnProperty(i) || n === !1 && t.hasOwnProperty(i) || (t[i] = e[i]);
                    return t
                }

                function Hr(e) {
                    var t = Array.prototype.slice.call(arguments, 1);
                    return function () {
                        return e.apply(null, t)
                    }
                }

                function Wr(e, t) {
                    return t ? !!(t.source.indexOf("\\w") > -1 && Ga(e)) || t.test(e) : Ga(e)
                }

                function Fr(e) {
                    for (var t in e)if (e.hasOwnProperty(t) && e[t])return !1;
                    return !0
                }

                function zr(e) {
                    return e.charCodeAt(0) >= 768 && Va.test(e)
                }

                function jr(e, t, n, i) {
                    var r = document.createElement(e);
                    if (n && (r.className = n), i && (r.style.cssText = i), "string" == typeof t)r.appendChild(document.createTextNode(t)); else if (t)for (var o = 0; o < t.length; ++o)r.appendChild(t[o]);
                    return r
                }

                function Ur(e) {
                    for (var t = e.childNodes.length; t > 0; --t)e.removeChild(e.firstChild);
                    return e
                }

                function $r(e, t) {
                    return Ur(e).appendChild(t)
                }

                function qr() {
                    for (var e = document.activeElement; e && e.root && e.root.activeElement;)e = e.root.activeElement;
                    return e
                }

                function Gr(e) {
                    return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
                }

                function Vr(e, t) {
                    for (var n = e.split(" "), i = 0; i < n.length; i++)n[i] && !Gr(n[i]).test(t) && (t += " " + n[i]);
                    return t
                }

                function Yr(e) {
                    if (document.body.getElementsByClassName)for (var t = document.body.getElementsByClassName("CodeMirror"), n = 0; n < t.length; n++) {
                        var i = t[n].CodeMirror;
                        i && e(i)
                    }
                }

                function Kr() {
                    Qa || (Xr(), Qa = !0)
                }

                function Xr() {
                    var e;
                    Aa(window, "resize", function () {
                        null == e && (e = setTimeout(function () {
                            e = null, Yr($t)
                        }, 100))
                    }), Aa(window, "blur", function () {
                        Yr(yn)
                    })
                }

                function Zr(e) {
                    if (null == Ka) {
                        var t = jr("span", "​");
                        $r(e, jr("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Ka = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(bo && 8 > xo))
                    }
                    var n = Ka ? jr("span", "​") : jr("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
                    return n.setAttribute("cm-text", ""), n
                }

                function Jr(e) {
                    if (null != Xa)return Xa;
                    var t = $r(e, document.createTextNode("AخA")), n = $a(t, 0, 1).getBoundingClientRect();
                    if (!n || n.left == n.right)return !1;
                    var i = $a(t, 1, 2).getBoundingClientRect();
                    return Xa = i.right - n.right < 3
                }

                function Qr(e) {
                    if (null != rs)return rs;
                    var t = $r(e, jr("span", "x")), n = t.getBoundingClientRect(), i = $a(t, 0, 1).getBoundingClientRect();
                    return rs = Math.abs(n.left - i.left) > 1
                }

                function eo(e, t, n, i) {
                    if (!e)return i(t, n, "ltr");
                    for (var r = !1, o = 0; o < e.length; ++o) {
                        var a = e[o];
                        (a.from < n && a.to > t || t == n && a.to == t) && (i(Math.max(a.from, t), Math.min(a.to, n), 1 == a.level ? "rtl" : "ltr"), r = !0)
                    }
                    r || i(t, n, "ltr")
                }

                function to(e) {
                    return e.level % 2 ? e.to : e.from
                }

                function no(e) {
                    return e.level % 2 ? e.from : e.to
                }

                function io(e) {
                    var t = rr(e);
                    return t ? to(t[0]) : 0
                }

                function ro(e) {
                    var t = rr(e);
                    return t ? no(Er(t)) : e.text.length
                }

                function oo(e, t) {
                    var n = Zi(e.doc, t), i = yi(n);
                    i != n && (t = tr(i));
                    var r = rr(i), o = r ? r[0].level % 2 ? ro(i) : io(i) : 0;
                    return Ho(t, o)
                }

                function ao(e, t) {
                    for (var n, i = Zi(e.doc, t); n = gi(i);)i = n.find(1, !0).line, t = null;
                    var r = rr(i), o = r ? r[0].level % 2 ? io(i) : ro(i) : i.text.length;
                    return Ho(null == t ? tr(i) : t, o)
                }

                function so(e, t) {
                    var n = oo(e, t.line), i = Zi(e.doc, n.line), r = rr(i);
                    if (!r || 0 == r[0].level) {
                        var o = Math.max(0, i.text.search(/\S/)), a = t.line == n.line && t.ch <= o && t.ch;
                        return Ho(n.line, a ? 0 : o)
                    }
                    return n
                }

                function lo(e, t, n) {
                    var i = e[0].level;
                    return t == i || n != i && n > t
                }

                function co(e, t) {
                    as = null;
                    for (var n, i = 0; i < e.length; ++i) {
                        var r = e[i];
                        if (r.from < t && r.to > t)return i;
                        if (r.from == t || r.to == t) {
                            if (null != n)return lo(e, r.level, e[n].level) ? (r.from != r.to && (as = n), i) : (r.from != r.to && (as = i), n);
                            n = i
                        }
                    }
                    return n
                }

                function uo(e, t, n, i) {
                    if (!i)return t + n;
                    do t += n; while (t > 0 && zr(e.text.charAt(t)));
                    return t
                }

                function ho(e, t, n, i) {
                    var r = rr(e);
                    if (!r)return fo(e, t, n, i);
                    for (var o = co(r, t), a = r[o], s = uo(e, t, a.level % 2 ? -n : n, i); ;) {
                        if (s > a.from && s < a.to)return s;
                        if (s == a.from || s == a.to)return co(r, s) == o ? s : (a = r[o += n], n > 0 == a.level % 2 ? a.to : a.from);
                        if (a = r[o += n], !a)return null;
                        s = n > 0 == a.level % 2 ? uo(e, a.to, -1, i) : uo(e, a.from, 1, i)
                    }
                }

                function fo(e, t, n, i) {
                    var r = t + n;
                    if (i)for (; r > 0 && zr(e.text.charAt(r));)r += n;
                    return 0 > r || r > e.text.length ? null : r
                }

                var po = navigator.userAgent, mo = navigator.platform, go = /gecko\/\d/i.test(po), vo = /MSIE \d/.test(po), yo = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(po), bo = vo || yo, xo = bo && (vo ? document.documentMode || 6 : yo[1]), wo = /WebKit\//.test(po), ko = wo && /Qt\/\d+\.\d+/.test(po), Co = /Chrome\//.test(po), So = /Opera\//.test(po), Lo = /Apple Computer/.test(navigator.vendor), To = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(po), Mo = /PhantomJS/.test(po), _o = /AppleWebKit/.test(po) && /Mobile\/\w+/.test(po), No = _o || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(po), Ao = _o || /Mac/.test(mo), Do = /\bCrOS\b/.test(po), Eo = /win/i.test(mo), Oo = So && po.match(/Version\/(\d*\.\d*)/);
                Oo && (Oo = Number(Oo[1])), Oo && Oo >= 15 && (So = !1, wo = !0);
                var Io = Ao && (ko || So && (null == Oo || 12.11 > Oo)), Bo = go || bo && xo >= 9, Po = !1, Ro = !1;
                m.prototype = Rr({
                    update: function (e) {
                        var t = e.scrollWidth > e.clientWidth + 1, n = e.scrollHeight > e.clientHeight + 1, i = e.nativeBarWidth;
                        if (n) {
                            this.vert.style.display = "block", this.vert.style.bottom = t ? i + "px" : "0";
                            var r = e.viewHeight - (t ? i : 0);
                            this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + r) + "px"
                        } else this.vert.style.display = "", this.vert.firstChild.style.height = "0";
                        if (t) {
                            this.horiz.style.display = "block", this.horiz.style.right = n ? i + "px" : "0", this.horiz.style.left = e.barLeft + "px";
                            var o = e.viewWidth - e.barLeft - (n ? i : 0);
                            this.horiz.firstChild.style.width = e.scrollWidth - e.clientWidth + o + "px"
                        } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
                        return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == i && this.zeroWidthHack(), this.checkedZeroWidth = !0), {
                            right: n ? i : 0,
                            bottom: t ? i : 0
                        }
                    }, setScrollLeft: function (e) {
                        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz)
                    }, setScrollTop: function (e) {
                        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert)
                    }, zeroWidthHack: function () {
                        var e = Ao && !To ? "12px" : "18px";
                        this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new Ar, this.disableVert = new Ar
                    }, enableZeroWidthBar: function (e, t) {
                        function n() {
                            var i = e.getBoundingClientRect(), r = document.elementFromPoint(i.left + 1, i.bottom - 1);
                            r != e ? e.style.pointerEvents = "none" : t.set(1e3, n)
                        }

                        e.style.pointerEvents = "auto", t.set(1e3, n)
                    }, clear: function () {
                        var e = this.horiz.parentNode;
                        e.removeChild(this.horiz), e.removeChild(this.vert)
                    }
                }, m.prototype), g.prototype = Rr({
                    update: function () {
                        return {bottom: 0, right: 0}
                    }, setScrollLeft: function () {
                    }, setScrollTop: function () {
                    }, clear: function () {
                    }
                }, g.prototype), e.scrollbarModel = {"native": m, "null": g}, L.prototype.signal = function (e, t) {
                    _r(e, t) && this.events.push(arguments)
                }, L.prototype.finish = function () {
                    for (var e = 0; e < this.events.length; e++)Oa.apply(null, this.events[e])
                };
                var Ho = e.Pos = function (e, t) {
                    return this instanceof Ho ? (this.line = e, void(this.ch = t)) : new Ho(e, t)
                }, Wo = e.cmpPos = function (e, t) {
                    return e.line - t.line || e.ch - t.ch
                }, Fo = null;
                ne.prototype = Rr({
                    init: function (e) {
                        function t(e) {
                            if (!Tr(i, e)) {
                                if (i.somethingSelected())Fo = {
                                    lineWise: !1,
                                    text: i.getSelections()
                                }, n.inaccurateSelection && (n.prevInput = "", n.inaccurateSelection = !1, o.value = Fo.text.join("\n"), Ua(o)); else {
                                    if (!i.options.lineWiseCopyCut)return;
                                    var t = ee(i);
                                    Fo = {
                                        lineWise: !0,
                                        text: t.text
                                    }, "cut" == e.type ? i.setSelections(t.ranges, null, Ra) : (n.prevInput = "", o.value = t.text.join("\n"), Ua(o))
                                }
                                "cut" == e.type && (i.state.cutIncoming = !0)
                            }
                        }

                        var n = this, i = this.cm, r = this.wrapper = ie(), o = this.textarea = r.firstChild;
                        e.wrapper.insertBefore(r, e.wrapper.firstChild), _o && (o.style.width = "0px"), Aa(o, "input", function () {
                            bo && xo >= 9 && n.hasSelection && (n.hasSelection = null), n.poll()
                        }), Aa(o, "paste", function (e) {
                            Tr(i, e) || J(e, i) || (i.state.pasteIncoming = !0, n.fastPoll())
                        }), Aa(o, "cut", t), Aa(o, "copy", t), Aa(e.scroller, "paste", function (t) {
                            qt(e, t) || Tr(i, t) || (i.state.pasteIncoming = !0, n.focus())
                        }), Aa(e.lineSpace, "selectstart", function (t) {
                            qt(e, t) || Ma(t)
                        }), Aa(o, "compositionstart", function () {
                            var e = i.getCursor("from");
                            n.composing && n.composing.range.clear(), n.composing = {
                                start: e,
                                range: i.markText(e, i.getCursor("to"), {className: "CodeMirror-composing"})
                            }
                        }), Aa(o, "compositionend", function () {
                            n.composing && (n.poll(), n.composing.range.clear(), n.composing = null)
                        })
                    }, prepareSelection: function () {
                        var e = this.cm, t = e.display, n = e.doc, i = Be(e);
                        if (e.options.moveInputWithCursor) {
                            var r = ft(e, n.sel.primary().head, "div"), o = t.wrapper.getBoundingClientRect(), a = t.lineDiv.getBoundingClientRect();
                            i.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, r.top + a.top - o.top)), i.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, r.left + a.left - o.left))
                        }
                        return i
                    }, showSelection: function (e) {
                        var t = this.cm, n = t.display;
                        $r(n.cursorDiv, e.cursors), $r(n.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px")
                    }, reset: function (e) {
                        if (!this.contextMenuPending) {
                            var t, n, i = this.cm, r = i.doc;
                            if (i.somethingSelected()) {
                                this.prevInput = "";
                                var o = r.sel.primary();
                                t = is && (o.to().line - o.from().line > 100 || (n = i.getSelection()).length > 1e3);
                                var a = t ? "-" : n || i.getSelection();
                                this.textarea.value = a, i.state.focused && Ua(this.textarea), bo && xo >= 9 && (this.hasSelection = a)
                            } else e || (this.prevInput = this.textarea.value = "", bo && xo >= 9 && (this.hasSelection = null));
                            this.inaccurateSelection = t
                        }
                    }, getField: function () {
                        return this.textarea
                    }, supportsTouch: function () {
                        return !1
                    }, focus: function () {
                        if ("nocursor" != this.cm.options.readOnly && (!No || qr() != this.textarea))try {
                            this.textarea.focus()
                        } catch (e) {
                        }
                    }, blur: function () {
                        this.textarea.blur()
                    }, resetPosition: function () {
                        this.wrapper.style.top = this.wrapper.style.left = 0
                    }, receivedFocus: function () {
                        this.slowPoll()
                    }, slowPoll: function () {
                        var e = this;
                        e.pollingFast || e.polling.set(this.cm.options.pollInterval, function () {
                            e.poll(), e.cm.state.focused && e.slowPoll()
                        })
                    }, fastPoll: function () {
                        function e() {
                            var i = n.poll();
                            i || t ? (n.pollingFast = !1, n.slowPoll()) : (t = !0, n.polling.set(60, e))
                        }

                        var t = !1, n = this;
                        n.pollingFast = !0, n.polling.set(20, e)
                    }, poll: function () {
                        var e = this.cm, t = this.textarea, n = this.prevInput;
                        if (this.contextMenuPending || !e.state.focused || ns(t) && !n && !this.composing || e.isReadOnly() || e.options.disableInput || e.state.keySeq)return !1;
                        var i = t.value;
                        if (i == n && !e.somethingSelected())return !1;
                        if (bo && xo >= 9 && this.hasSelection === i || Ao && /[\uf700-\uf7ff]/.test(i))return e.display.input.reset(), !1;
                        if (e.doc.sel == e.display.selForContextMenu) {
                            var r = i.charCodeAt(0);
                            if (8203 != r || n || (n = "​"), 8666 == r)return this.reset(), this.cm.execCommand("undo")
                        }
                        for (var o = 0, a = Math.min(n.length, i.length); a > o && n.charCodeAt(o) == i.charCodeAt(o);)++o;
                        var s = this;
                        return Nt(e, function () {
                            Z(e, i.slice(o), n.length - o, null, s.composing ? "*compose" : null), i.length > 1e3 || i.indexOf("\n") > -1 ? t.value = s.prevInput = "" : s.prevInput = i, s.composing && (s.composing.range.clear(), s.composing.range = e.markText(s.composing.start, e.getCursor("to"), {className: "CodeMirror-composing"}))
                        }), !0
                    }, ensurePolled: function () {
                        this.pollingFast && this.poll() && (this.pollingFast = !1)
                    }, onKeyPress: function () {
                        bo && xo >= 9 && (this.hasSelection = null), this.fastPoll()
                    }, onContextMenu: function (e) {
                        function t() {
                            if (null != a.selectionStart) {
                                var e = r.somethingSelected(), t = "​" + (e ? a.value : "");
                                a.value = "⇚", a.value = t, i.prevInput = e ? "" : "​", a.selectionStart = 1, a.selectionEnd = t.length, o.selForContextMenu = r.doc.sel
                            }
                        }

                        function n() {
                            if (i.contextMenuPending = !1, i.wrapper.style.cssText = d, a.style.cssText = u, bo && 9 > xo && o.scrollbars.setScrollTop(o.scroller.scrollTop = l), null != a.selectionStart) {
                                (!bo || bo && 9 > xo) && t();
                                var e = 0, n = function () {
                                    o.selForContextMenu == r.doc.sel && 0 == a.selectionStart && a.selectionEnd > 0 && "​" == i.prevInput ? At(r, ua.selectAll)(r) : e++ < 10 ? o.detectingSelectAll = setTimeout(n, 500) : o.input.reset()
                                };
                                o.detectingSelectAll = setTimeout(n, 200)
                            }
                        }

                        var i = this, r = i.cm, o = r.display, a = i.textarea, s = Gt(r, e), l = o.scroller.scrollTop;
                        if (s && !So) {
                            var c = r.options.resetSelectionOnContextMenu;
                            c && -1 == r.doc.sel.contains(s) && At(r, Te)(r.doc, fe(s), Ra);
                            var u = a.style.cssText, d = i.wrapper.style.cssText;
                            i.wrapper.style.cssText = "position: absolute";
                            var h = i.wrapper.getBoundingClientRect();
                            if (a.style.cssText = "position: absolute; width: 30px; height: 30px; top: " + (e.clientY - h.top - 5) + "px; left: " + (e.clientX - h.left - 5) + "px; z-index: 1000; background: " + (bo ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", wo)var f = window.scrollY;
                            if (o.input.focus(), wo && window.scrollTo(null, f), o.input.reset(), r.somethingSelected() || (a.value = i.prevInput = " "), i.contextMenuPending = !0, o.selForContextMenu = r.doc.sel, clearTimeout(o.detectingSelectAll), bo && xo >= 9 && t(), Bo) {
                                Na(e);
                                var p = function () {
                                    Ea(window, "mouseup", p), setTimeout(n, 20)
                                };
                                Aa(window, "mouseup", p)
                            } else setTimeout(n, 50)
                        }
                    }, readOnlyChanged: function (e) {
                        e || this.reset()
                    }, setUneditable: Br, needsContentAttribute: !1
                }, ne.prototype), re.prototype = Rr({
                    init: function (e) {
                        function t(e) {
                            if (!Tr(i, e)) {
                                if (i.somethingSelected())Fo = {
                                    lineWise: !1,
                                    text: i.getSelections()
                                }, "cut" == e.type && i.replaceSelection("", null, "cut"); else {
                                    if (!i.options.lineWiseCopyCut)return;
                                    var t = ee(i);
                                    Fo = {lineWise: !0, text: t.text}, "cut" == e.type && i.operation(function () {
                                        i.setSelections(t.ranges, 0, Ra), i.replaceSelection("", null, "cut")
                                    })
                                }
                                if (e.clipboardData && !_o)e.preventDefault(), e.clipboardData.clearData(), e.clipboardData.setData("text/plain", Fo.text.join("\n")); else {
                                    var n = ie(), r = n.firstChild;
                                    i.display.lineSpace.insertBefore(n, i.display.lineSpace.firstChild), r.value = Fo.text.join("\n");
                                    var o = document.activeElement;
                                    Ua(r), setTimeout(function () {
                                        i.display.lineSpace.removeChild(n), o.focus()
                                    }, 50)
                                }
                            }
                        }

                        var n = this, i = n.cm, r = n.div = e.lineDiv;
                        te(r), Aa(r, "paste", function (e) {
                            Tr(i, e) || J(e, i)
                        }), Aa(r, "compositionstart", function (e) {
                            var t = e.data;
                            if (n.composing = {sel: i.doc.sel, data: t, startData: t}, t) {
                                var r = i.doc.sel.primary(), o = i.getLine(r.head.line), a = o.indexOf(t, Math.max(0, r.head.ch - t.length));
                                a > -1 && a <= r.head.ch && (n.composing.sel = fe(Ho(r.head.line, a), Ho(r.head.line, a + t.length)))
                            }
                        }), Aa(r, "compositionupdate", function (e) {
                            n.composing.data = e.data
                        }), Aa(r, "compositionend", function (e) {
                            var t = n.composing;
                            t && (e.data == t.startData || /\u200b/.test(e.data) || (t.data = e.data), setTimeout(function () {
                                t.handled || n.applyComposition(t), n.composing == t && (n.composing = null)
                            }, 50))
                        }), Aa(r, "touchstart", function () {
                            n.forceCompositionEnd()
                        }), Aa(r, "input", function () {
                            n.composing || !i.isReadOnly() && n.pollContent() || Nt(n.cm, function () {
                                Bt(i)
                            })
                        }), Aa(r, "copy", t), Aa(r, "cut", t)
                    }, prepareSelection: function () {
                        var e = Be(this.cm, !1);
                        return e.focus = this.cm.state.focused, e
                    }, showSelection: function (e, t) {
                        e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e))
                    }, showPrimarySelection: function () {
                        var e = window.getSelection(), t = this.cm.doc.sel.primary(), n = se(this.cm, e.anchorNode, e.anchorOffset), i = se(this.cm, e.focusNode, e.focusOffset);
                        if (!n || n.bad || !i || i.bad || 0 != Wo(K(n, i), t.from()) || 0 != Wo(Y(n, i), t.to())) {
                            var r = oe(this.cm, t.from()), o = oe(this.cm, t.to());
                            if (r || o) {
                                var a = this.cm.display.view, s = e.rangeCount && e.getRangeAt(0);
                                if (r) {
                                    if (!o) {
                                        var l = a[a.length - 1].measure, c = l.maps ? l.maps[l.maps.length - 1] : l.map;
                                        o = {node: c[c.length - 1], offset: c[c.length - 2] - c[c.length - 3]}
                                    }
                                } else r = {node: a[0].measure.map[2], offset: 0};
                                try {
                                    var u = $a(r.node, r.offset, o.offset, o.node)
                                } catch (d) {
                                }
                                u && (!go && this.cm.state.focused ? (e.collapse(r.node, r.offset), u.collapsed || e.addRange(u)) : (e.removeAllRanges(), e.addRange(u)), s && null == e.anchorNode ? e.addRange(s) : go && this.startGracePeriod()), this.rememberSelection()
                            }
                        }
                    }, startGracePeriod: function () {
                        var e = this;
                        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function () {
                            e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function () {
                                e.cm.curOp.selectionChanged = !0
                            })
                        }, 20)
                    }, showMultipleSelections: function (e) {
                        $r(this.cm.display.cursorDiv, e.cursors), $r(this.cm.display.selectionDiv, e.selection)
                    }, rememberSelection: function () {
                        var e = window.getSelection();
                        this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset
                    }, selectionInEditor: function () {
                        var e = window.getSelection();
                        if (!e.rangeCount)return !1;
                        var t = e.getRangeAt(0).commonAncestorContainer;
                        return Ya(this.div, t)
                    }, focus: function () {
                        "nocursor" != this.cm.options.readOnly && this.div.focus()
                    }, blur: function () {
                        this.div.blur()
                    }, getField: function () {
                        return this.div
                    }, supportsTouch: function () {
                        return !0
                    }, receivedFocus: function () {
                        function e() {
                            t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e))
                        }

                        var t = this;
                        this.selectionInEditor() ? this.pollSelection() : Nt(this.cm, function () {
                            t.cm.curOp.selectionChanged = !0
                        }), this.polling.set(this.cm.options.pollInterval, e)
                    }, selectionChanged: function () {
                        var e = window.getSelection();
                        return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset
                    }, pollSelection: function () {
                        if (!this.composing && !this.gracePeriod && this.selectionChanged()) {
                            var e = window.getSelection(), t = this.cm;
                            this.rememberSelection();
                            var n = se(t, e.anchorNode, e.anchorOffset), i = se(t, e.focusNode, e.focusOffset);
                            n && i && Nt(t, function () {
                                Te(t.doc, fe(n, i), Ra), (n.bad || i.bad) && (t.curOp.selectionChanged = !0)
                            })
                        }
                    }, pollContent: function () {
                        var e = this.cm, t = e.display, n = e.doc.sel.primary(), i = n.from(), r = n.to();
                        if (i.line < t.viewFrom || r.line > t.viewTo - 1)return !1;
                        var o;
                        if (i.line == t.viewFrom || 0 == (o = Ht(e, i.line)))var a = tr(t.view[0].line), s = t.view[0].node; else var a = tr(t.view[o].line), s = t.view[o - 1].node.nextSibling;
                        var l = Ht(e, r.line);
                        if (l == t.view.length - 1)var c = t.viewTo - 1, u = t.lineDiv.lastChild; else var c = tr(t.view[l + 1].line) - 1, u = t.view[l + 1].node.previousSibling;
                        for (var d = e.doc.splitLines(ce(e, s, u, a, c)), h = Ji(e.doc, Ho(a, 0), Ho(c, Zi(e.doc, c).text.length)); d.length > 1 && h.length > 1;)if (Er(d) == Er(h))d.pop(), h.pop(), c--; else {
                            if (d[0] != h[0])break;
                            d.shift(), h.shift(), a++
                        }
                        for (var f = 0, p = 0, m = d[0], g = h[0], v = Math.min(m.length, g.length); v > f && m.charCodeAt(f) == g.charCodeAt(f);)++f;
                        for (var y = Er(d), b = Er(h), x = Math.min(y.length - (1 == d.length ? f : 0), b.length - (1 == h.length ? f : 0)); x > p && y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1);)++p;
                        d[d.length - 1] = y.slice(0, y.length - p), d[0] = d[0].slice(f);
                        var w = Ho(a, f), k = Ho(c, h.length ? Er(h).length - p : 0);
                        return d.length > 1 || d[0] || Wo(w, k) ? (En(e.doc, d, w, k, "+input"), !0) : void 0
                    }, ensurePolled: function () {
                        this.forceCompositionEnd()
                    }, reset: function () {
                        this.forceCompositionEnd()
                    }, forceCompositionEnd: function () {
                        this.composing && !this.composing.handled && (this.applyComposition(this.composing), this.composing.handled = !0, this.div.blur(), this.div.focus())
                    }, applyComposition: function (e) {
                        this.cm.isReadOnly() ? At(this.cm, Bt)(this.cm) : e.data && e.data != e.startData && At(this.cm, Z)(this.cm, e.data, 0, e.sel)
                    }, setUneditable: function (e) {
                        e.contentEditable = "false"
                    }, onKeyPress: function (e) {
                        e.preventDefault(), this.cm.isReadOnly() || At(this.cm, Z)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0)
                    }, readOnlyChanged: function (e) {
                        this.div.contentEditable = String("nocursor" != e)
                    }, onContextMenu: Br, resetPosition: Br, needsContentAttribute: !0
                }, re.prototype), e.inputStyles = {
                    textarea: ne,
                    contenteditable: re
                }, ue.prototype = {
                    primary: function () {
                        return this.ranges[this.primIndex]
                    }, equals: function (e) {
                        if (e == this)return !0;
                        if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length)return !1;
                        for (var t = 0; t < this.ranges.length; t++) {
                            var n = this.ranges[t], i = e.ranges[t];
                            if (0 != Wo(n.anchor, i.anchor) || 0 != Wo(n.head, i.head))return !1
                        }
                        return !0
                    }, deepCopy: function () {
                        for (var e = [], t = 0; t < this.ranges.length; t++)e[t] = new de(V(this.ranges[t].anchor), V(this.ranges[t].head));
                        return new ue(e, this.primIndex)
                    }, somethingSelected: function () {
                        for (var e = 0; e < this.ranges.length; e++)if (!this.ranges[e].empty())return !0;
                        return !1
                    }, contains: function (e, t) {
                        t || (t = e);
                        for (var n = 0; n < this.ranges.length; n++) {
                            var i = this.ranges[n];
                            if (Wo(t, i.from()) >= 0 && Wo(e, i.to()) <= 0)return n
                        }
                        return -1
                    }
                }, de.prototype = {
                    from: function () {
                        return K(this.anchor, this.head)
                    }, to: function () {
                        return Y(this.anchor, this.head)
                    }, empty: function () {
                        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
                    }
                };
                var zo, jo, Uo, $o = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }, qo = null, Go = 0, Vo = 0, Yo = 0, Ko = null;
                bo ? Ko = -.53 : go ? Ko = 15 : Co ? Ko = -.7 : Lo && (Ko = -1 / 3);
                var Xo = function (e) {
                    var t = e.wheelDeltaX, n = e.wheelDeltaY;
                    return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == n && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : null == n && (n = e.wheelDelta), {
                        x: t,
                        y: n
                    }
                };
                e.wheelEventPixels = function (e) {
                    var t = Xo(e);
                    return t.x *= Ko, t.y *= Ko, t
                };
                var Zo = new Ar, Jo = null, Qo = e.changeEnd = function (e) {
                    return e.text ? Ho(e.from.line + e.text.length - 1, Er(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
                };
                e.prototype = {
                    constructor: e,
                    focus: function () {
                        window.focus(), this.display.input.focus()
                    },
                    setOption: function (e, t) {
                        var n = this.options, i = n[e];
                        n[e] == t && "mode" != e || (n[e] = t, ta.hasOwnProperty(e) && At(this, ta[e])(this, t, i))
                    },
                    getOption: function (e) {
                        return this.options[e]
                    },
                    getDoc: function () {
                        return this.doc
                    },
                    addKeyMap: function (e, t) {
                        this.state.keyMaps[t ? "push" : "unshift"](Vn(e))
                    },
                    removeKeyMap: function (e) {
                        for (var t = this.state.keyMaps, n = 0; n < t.length; ++n)if (t[n] == e || t[n].name == e)return t.splice(n, 1), !0
                    },
                    addOverlay: Dt(function (t, n) {
                        var i = t.token ? t : e.getMode(this.options, t);
                        if (i.startState)throw new Error("Overlays may not be stateful.");
                        this.state.overlays.push({
                            mode: i,
                            modeSpec: t,
                            opaque: n && n.opaque
                        }), this.state.modeGen++, Bt(this)
                    }),
                    removeOverlay: Dt(function (e) {
                        for (var t = this.state.overlays, n = 0; n < t.length; ++n) {
                            var i = t[n].modeSpec;
                            if (i == e || "string" == typeof e && i.name == e)return t.splice(n, 1), this.state.modeGen++, void Bt(this)
                        }
                    }),
                    indentLine: Dt(function (e, t, n) {
                        "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), ve(this.doc, e) && Fn(this, e, t, n)
                    }),
                    indentSelection: Dt(function (e) {
                        for (var t = this.doc.sel.ranges, n = -1, i = 0; i < t.length; i++) {
                            var r = t[i];
                            if (r.empty())r.head.line > n && (Fn(this, r.head.line, e, !0), n = r.head.line, i == this.doc.sel.primIndex && Hn(this)); else {
                                var o = r.from(), a = r.to(), s = Math.max(n, o.line);
                                n = Math.min(this.lastLine(), a.line - (a.ch ? 0 : 1)) + 1;
                                for (var l = s; n > l; ++l)Fn(this, l, e);
                                var c = this.doc.sel.ranges;
                                0 == o.ch && t.length == c.length && c[i].from().ch > 0 && ke(this.doc, i, new de(o, c[i].to()), Ra)
                            }
                        }
                    }),
                    getTokenAt: function (e, t) {
                        return Ei(this, e, t)
                    },
                    getLineTokens: function (e, t) {
                        return Ei(this, Ho(e), t, !0)
                    },
                    getTokenTypeAt: function (e) {
                        e = me(this.doc, e);
                        var t, n = Bi(this, Zi(this.doc, e.line)), i = 0, r = (n.length - 1) / 2, o = e.ch;
                        if (0 == o)t = n[2]; else for (; ;) {
                            var a = i + r >> 1;
                            if ((a ? n[2 * a - 1] : 0) >= o)r = a; else {
                                if (!(n[2 * a + 1] < o)) {
                                    t = n[2 * a + 2];
                                    break
                                }
                                i = a + 1
                            }
                        }
                        var s = t ? t.indexOf("cm-overlay ") : -1;
                        return 0 > s ? t : 0 == s ? null : t.slice(0, s - 1)
                    },
                    getModeAt: function (t) {
                        var n = this.doc.mode;
                        return n.innerMode ? e.innerMode(n, this.getTokenAt(t).state).mode : n
                    },
                    getHelper: function (e, t) {
                        return this.getHelpers(e, t)[0]
                    },
                    getHelpers: function (e, t) {
                        var n = [];
                        if (!sa.hasOwnProperty(t))return n;
                        var i = sa[t], r = this.getModeAt(e);
                        if ("string" == typeof r[t])i[r[t]] && n.push(i[r[t]]); else if (r[t])for (var o = 0; o < r[t].length; o++) {
                            var a = i[r[t][o]];
                            a && n.push(a)
                        } else r.helperType && i[r.helperType] ? n.push(i[r.helperType]) : i[r.name] && n.push(i[r.name]);
                        for (var o = 0; o < i._global.length; o++) {
                            var s = i._global[o];
                            s.pred(r, this) && -1 == Or(n, s.val) && n.push(s.val)
                        }
                        return n
                    },
                    getStateAfter: function (e, t) {
                        var n = this.doc;
                        return e = pe(n, null == e ? n.first + n.size - 1 : e), je(this, e + 1, t)
                    },
                    cursorCoords: function (e, t) {
                        var n, i = this.doc.sel.primary();
                        return n = null == e ? i.head : "object" == typeof e ? me(this.doc, e) : e ? i.from() : i.to(), ft(this, n, t || "page")
                    },
                    charCoords: function (e, t) {
                        return ht(this, me(this.doc, e), t || "page")
                    },
                    coordsChar: function (e, t) {
                        return e = dt(this, e, t || "page"), gt(this, e.left, e.top)
                    },
                    lineAtHeight: function (e, t) {
                        return e = dt(this, {
                            top: e,
                            left: 0
                        }, t || "page").top, nr(this.doc, e + this.display.viewOffset)
                    },
                    heightAtLine: function (e, t) {
                        var n, i = !1;
                        if ("number" == typeof e) {
                            var r = this.doc.first + this.doc.size - 1;
                            e < this.doc.first ? e = this.doc.first : e > r && (e = r, i = !0), n = Zi(this.doc, e)
                        } else n = e;
                        return ut(this, n, {top: 0, left: 0}, t || "page").top + (i ? this.doc.height - ir(n) : 0)
                    },
                    defaultTextHeight: function () {
                        return yt(this.display)
                    },
                    defaultCharWidth: function () {
                        return bt(this.display)
                    },
                    setGutterMarker: Dt(function (e, t, n) {
                        return zn(this.doc, e, "gutter", function (e) {
                            var i = e.gutterMarkers || (e.gutterMarkers = {});
                            return i[t] = n, !n && Fr(i) && (e.gutterMarkers = null), !0
                        })
                    }),
                    clearGutter: Dt(function (e) {
                        var t = this, n = t.doc, i = n.first;
                        n.iter(function (n) {
                            n.gutterMarkers && n.gutterMarkers[e] && (n.gutterMarkers[e] = null, Pt(t, i, "gutter"), Fr(n.gutterMarkers) && (n.gutterMarkers = null)), ++i
                        })
                    }),
                    lineInfo: function (e) {
                        if ("number" == typeof e) {
                            if (!ve(this.doc, e))return null;
                            var t = e;
                            if (e = Zi(this.doc, e), !e)return null
                        } else {
                            var t = tr(e);
                            if (null == t)return null
                        }
                        return {
                            line: t,
                            handle: e,
                            text: e.text,
                            gutterMarkers: e.gutterMarkers,
                            textClass: e.textClass,
                            bgClass: e.bgClass,
                            wrapClass: e.wrapClass,
                            widgets: e.widgets
                        }
                    },
                    getViewport: function () {
                        return {from: this.display.viewFrom, to: this.display.viewTo}
                    },
                    addWidget: function (e, t, n, i, r) {
                        var o = this.display;
                        e = ft(this, me(this.doc, e));
                        var a = e.bottom, s = e.left;
                        if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), o.sizer.appendChild(t), "over" == i)a = e.top; else if ("above" == i || "near" == i) {
                            var l = Math.max(o.wrapper.clientHeight, this.doc.height), c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
                            ("above" == i || e.bottom + t.offsetHeight > l) && e.top > t.offsetHeight ? a = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= l && (a = e.bottom), s + t.offsetWidth > c && (s = c - t.offsetWidth)
                        }
                        t.style.top = a + "px", t.style.left = t.style.right = "", "right" == r ? (s = o.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == r ? s = 0 : "middle" == r && (s = (o.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = s + "px"), n && Bn(this, s, a, s + t.offsetWidth, a + t.offsetHeight)
                    },
                    triggerOnKeyDown: Dt(hn),
                    triggerOnKeyPress: Dt(mn),
                    triggerOnKeyUp: pn,
                    execCommand: function (e) {
                        return ua.hasOwnProperty(e) ? ua[e].call(null, this) : void 0
                    },
                    triggerElectric: Dt(function (e) {
                        Q(this, e)
                    }),
                    findPosH: function (e, t, n, i) {
                        var r = 1;
                        0 > t && (r = -1, t = -t);
                        for (var o = 0, a = me(this.doc, e); t > o && (a = Un(this.doc, a, r, n, i), !a.hitSide); ++o);
                        return a
                    },
                    moveH: Dt(function (e, t) {
                        var n = this;
                        n.extendSelectionsBy(function (i) {
                            return n.display.shift || n.doc.extend || i.empty() ? Un(n.doc, i.head, e, t, n.options.rtlMoveVisually) : 0 > e ? i.from() : i.to()
                        }, Wa)
                    }),
                    deleteH: Dt(function (e, t) {
                        var n = this.doc.sel, i = this.doc;
                        n.somethingSelected() ? i.replaceSelection("", null, "+delete") : jn(this, function (n) {
                            var r = Un(i, n.head, e, t, !1);
                            return 0 > e ? {from: r, to: n.head} : {from: n.head, to: r}
                        })
                    }),
                    findPosV: function (e, t, n, i) {
                        var r = 1, o = i;
                        0 > t && (r = -1, t = -t);
                        for (var a = 0, s = me(this.doc, e); t > a; ++a) {
                            var l = ft(this, s, "div");
                            if (null == o ? o = l.left : l.left = o, s = $n(this, l, r, n), s.hitSide)break
                        }
                        return s
                    },
                    moveV: Dt(function (e, t) {
                        var n = this, i = this.doc, r = [], o = !n.display.shift && !i.extend && i.sel.somethingSelected();
                        if (i.extendSelectionsBy(function (a) {
                                if (o)return 0 > e ? a.from() : a.to();
                                var s = ft(n, a.head, "div");
                                null != a.goalColumn && (s.left = a.goalColumn), r.push(s.left);
                                var l = $n(n, s, e, t);
                                return "page" == t && a == i.sel.primary() && Rn(n, null, ht(n, l, "div").top - s.top), l
                            }, Wa), r.length)for (var a = 0; a < i.sel.ranges.length; a++)i.sel.ranges[a].goalColumn = r[a]
                    }),
                    findWordAt: function (e) {
                        var t = this.doc, n = Zi(t, e.line).text, i = e.ch, r = e.ch;
                        if (n) {
                            var o = this.getHelper(e, "wordChars");
                            (e.xRel < 0 || r == n.length) && i ? --i : ++r;
                            for (var a = n.charAt(i), s = Wr(a, o) ? function (e) {
                                return Wr(e, o)
                            } : /\s/.test(a) ? function (e) {
                                return /\s/.test(e)
                            } : function (e) {
                                return !/\s/.test(e) && !Wr(e)
                            }; i > 0 && s(n.charAt(i - 1));)--i;
                            for (; r < n.length && s(n.charAt(r));)++r
                        }
                        return new de(Ho(e.line, i), Ho(e.line, r))
                    },
                    toggleOverwrite: function (e) {
                        null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? Ja(this.display.cursorDiv, "CodeMirror-overwrite") : Za(this.display.cursorDiv, "CodeMirror-overwrite"), Oa(this, "overwriteToggle", this, this.state.overwrite))
                    },
                    hasFocus: function () {
                        return this.display.input.getField() == qr()
                    },
                    isReadOnly: function () {
                        return !(!this.options.readOnly && !this.doc.cantEdit)
                    },
                    scrollTo: Dt(function (e, t) {
                        null == e && null == t || Wn(this), null != e && (this.curOp.scrollLeft = e), null != t && (this.curOp.scrollTop = t)
                    }),
                    getScrollInfo: function () {
                        var e = this.display.scroller;
                        return {
                            left: e.scrollLeft,
                            top: e.scrollTop,
                            height: e.scrollHeight - Ge(this) - this.display.barHeight,
                            width: e.scrollWidth - Ge(this) - this.display.barWidth,
                            clientHeight: Ye(this),
                            clientWidth: Ve(this)
                        }
                    },
                    scrollIntoView: Dt(function (e, t) {
                        if (null == e ? (e = {
                                from: this.doc.sel.primary().head,
                                to: null
                            }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                                from: Ho(e, 0),
                                to: null
                            } : null == e.from && (e = {
                                from: e,
                                to: null
                            }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line)Wn(this), this.curOp.scrollToPos = e; else {
                            var n = Pn(this, Math.min(e.from.left, e.to.left), Math.min(e.from.top, e.to.top) - e.margin, Math.max(e.from.right, e.to.right), Math.max(e.from.bottom, e.to.bottom) + e.margin);
                            this.scrollTo(n.scrollLeft, n.scrollTop)
                        }
                    }),
                    setSize: Dt(function (e, t) {
                        function n(e) {
                            return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
                        }

                        var i = this;
                        null != e && (i.display.wrapper.style.width = n(e)), null != t && (i.display.wrapper.style.height = n(t)), i.options.lineWrapping && at(this);
                        var r = i.display.viewFrom;
                        i.doc.iter(r, i.display.viewTo, function (e) {
                            if (e.widgets)for (var t = 0; t < e.widgets.length; t++)if (e.widgets[t].noHScroll) {
                                Pt(i, r, "widget");
                                break
                            }
                            ++r
                        }), i.curOp.forceUpdate = !0, Oa(i, "refresh", this)
                    }),
                    operation: function (e) {
                        return Nt(this, e)
                    },
                    refresh: Dt(function () {
                        var e = this.display.cachedTextHeight;
                        Bt(this), this.curOp.forceUpdate = !0, st(this), this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop), u(this), (null == e || Math.abs(e - yt(this.display)) > .5) && a(this), Oa(this, "refresh", this)
                    }),
                    swapDoc: Dt(function (e) {
                        var t = this.doc;
                        return t.cm = null, Xi(this, e), st(this), this.display.input.reset(), this.scrollTo(e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, Sr(this, "swapDoc", this, t), t
                    }),
                    getInputField: function () {
                        return this.display.input.getField()
                    },
                    getWrapperElement: function () {
                        return this.display.wrapper
                    },
                    getScrollerElement: function () {
                        return this.display.scroller
                    },
                    getGutterElement: function () {
                        return this.display.gutters
                    }
                }, Nr(e);
                var ea = e.defaults = {}, ta = e.optionHandlers = {}, na = e.Init = {
                    toString: function () {
                        return "CodeMirror.Init"
                    }
                };
                qn("value", "", function (e, t) {
                    e.setValue(t)
                }, !0), qn("mode", null, function (e, t) {
                    e.doc.modeOption = t, n(e)
                }, !0), qn("indentUnit", 2, n, !0), qn("indentWithTabs", !1), qn("smartIndent", !0), qn("tabSize", 4, function (e) {
                    i(e), st(e), Bt(e)
                }, !0), qn("lineSeparator", null, function (e, t) {
                    if (e.doc.lineSep = t, t) {
                        var n = [], i = e.doc.first;
                        e.doc.iter(function (e) {
                            for (var r = 0; ;) {
                                var o = e.text.indexOf(t, r);
                                if (-1 == o)break;
                                r = o + t.length, n.push(Ho(i, o))
                            }
                            i++
                        });
                        for (var r = n.length - 1; r >= 0; r--)En(e.doc, t, n[r], Ho(n[r].line, n[r].ch + t.length))
                    }
                }), qn("specialChars", /[\u0000-\u001f\u007f\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g, function (t, n, i) {
                    t.state.specialChars = new RegExp(n.source + (n.test("\t") ? "" : "|\t"), "g"), i != e.Init && t.refresh()
                }), qn("specialCharPlaceholder", Wi, function (e) {
                    e.refresh()
                }, !0), qn("electricChars", !0), qn("inputStyle", No ? "contenteditable" : "textarea", function () {
                    throw new Error("inputStyle can not (yet) be changed in a running editor")
                }, !0), qn("rtlMoveVisually", !Eo), qn("wholeLineUpdateBefore", !0), qn("theme", "default", function (e) {
                    s(e), l(e)
                }, !0), qn("keyMap", "default", function (t, n, i) {
                    var r = Vn(n), o = i != e.Init && Vn(i);
                    o && o.detach && o.detach(t, r), r.attach && r.attach(t, o || null)
                }), qn("extraKeys", null), qn("lineWrapping", !1, r, !0), qn("gutters", [], function (e) {
                    f(e.options), l(e)
                }, !0), qn("fixedGutter", !0, function (e, t) {
                    e.display.gutters.style.left = t ? S(e.display) + "px" : "0", e.refresh()
                }, !0), qn("coverGutterNextToScrollbar", !1, function (e) {
                    y(e)
                }, !0), qn("scrollbarStyle", "native", function (e) {
                    v(e), y(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
                }, !0), qn("lineNumbers", !1, function (e) {
                    f(e.options), l(e)
                }, !0), qn("firstLineNumber", 1, l, !0), qn("lineNumberFormatter", function (e) {
                    return e
                }, l, !0), qn("showCursorWhenSelecting", !1, Ie, !0), qn("resetSelectionOnContextMenu", !0), qn("lineWiseCopyCut", !0), qn("readOnly", !1, function (e, t) {
                    "nocursor" == t ? (yn(e), e.display.input.blur(), e.display.disabled = !0) : e.display.disabled = !1, e.display.input.readOnlyChanged(t)
                }), qn("disableInput", !1, function (e, t) {
                    t || e.display.input.reset()
                }, !0), qn("dragDrop", !0, Ut), qn("allowDropFileTypes", null), qn("cursorBlinkRate", 530), qn("cursorScrollMargin", 0), qn("cursorHeight", 1, Ie, !0), qn("singleCursorHeightPerLine", !0, Ie, !0), qn("workTime", 100), qn("workDelay", 100), qn("flattenSpans", !0, i, !0), qn("addModeClass", !1, i, !0), qn("pollInterval", 100), qn("undoDepth", 200, function (e, t) {
                    e.doc.history.undoDepth = t
                }), qn("historyEventDelay", 1250), qn("viewportMargin", 10, function (e) {
                    e.refresh()
                }, !0), qn("maxHighlightLength", 1e4, i, !0), qn("moveInputWithCursor", !0, function (e, t) {
                    t || e.display.input.resetPosition()
                }), qn("tabindex", null, function (e, t) {
                    e.display.input.getField().tabIndex = t || ""
                }), qn("autofocus", null);
                var ia = e.modes = {}, ra = e.mimeModes = {};
                e.defineMode = function (t, n) {
                    e.defaults.mode || "null" == t || (e.defaults.mode = t), arguments.length > 2 && (n.dependencies = Array.prototype.slice.call(arguments, 2)), ia[t] = n
                }, e.defineMIME = function (e, t) {
                    ra[e] = t
                }, e.resolveMode = function (t) {
                    if ("string" == typeof t && ra.hasOwnProperty(t))t = ra[t]; else if (t && "string" == typeof t.name && ra.hasOwnProperty(t.name)) {
                        var n = ra[t.name];
                        "string" == typeof n && (n = {name: n}), t = Pr(n, t), t.name = n.name
                    } else if ("string" == typeof t && /^[\w\-]+\/[\w\-]+\+xml$/.test(t))return e.resolveMode("application/xml");
                    return "string" == typeof t ? {name: t} : t || {name: "null"}
                }, e.getMode = function (t, n) {
                    var n = e.resolveMode(n), i = ia[n.name];
                    if (!i)return e.getMode(t, "text/plain");
                    var r = i(t, n);
                    if (oa.hasOwnProperty(n.name)) {
                        var o = oa[n.name];
                        for (var a in o)o.hasOwnProperty(a) && (r.hasOwnProperty(a) && (r["_" + a] = r[a]), r[a] = o[a])
                    }
                    if (r.name = n.name, n.helperType && (r.helperType = n.helperType), n.modeProps)for (var a in n.modeProps)r[a] = n.modeProps[a];
                    return r
                }, e.defineMode("null", function () {
                    return {
                        token: function (e) {
                            e.skipToEnd()
                        }
                    }
                }), e.defineMIME("text/plain", "null");
                var oa = e.modeExtensions = {};
                e.extendMode = function (e, t) {
                    var n = oa.hasOwnProperty(e) ? oa[e] : oa[e] = {};
                    Rr(t, n)
                }, e.defineExtension = function (t, n) {
                    e.prototype[t] = n
                }, e.defineDocExtension = function (e, t) {
                    Sa.prototype[e] = t
                }, e.defineOption = qn;
                var aa = [];
                e.defineInitHook = function (e) {
                    aa.push(e)
                };
                var sa = e.helpers = {};
                e.registerHelper = function (t, n, i) {
                    sa.hasOwnProperty(t) || (sa[t] = e[t] = {_global: []}), sa[t][n] = i
                }, e.registerGlobalHelper = function (t, n, i, r) {
                    e.registerHelper(t, n, r), sa[t]._global.push({pred: i, val: r})
                };
                var la = e.copyState = function (e, t) {
                    if (t === !0)return t;
                    if (e.copyState)return e.copyState(t);
                    var n = {};
                    for (var i in t) {
                        var r = t[i];
                        r instanceof Array && (r = r.concat([])), n[i] = r
                    }
                    return n
                }, ca = e.startState = function (e, t, n) {
                    return !e.startState || e.startState(t, n)
                };
                e.innerMode = function (e, t) {
                    for (; e.innerMode;) {
                        var n = e.innerMode(t);
                        if (!n || n.mode == e)break;
                        t = n.state, e = n.mode
                    }
                    return n || {mode: e, state: t}
                };
                var ua = e.commands = {
                    selectAll: function (e) {
                        e.setSelection(Ho(e.firstLine(), 0), Ho(e.lastLine()), Ra)
                    }, singleSelection: function (e) {
                        e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Ra)
                    }, killLine: function (e) {
                        jn(e, function (t) {
                            if (t.empty()) {
                                var n = Zi(e.doc, t.head.line).text.length;
                                return t.head.ch == n && t.head.line < e.lastLine() ? {
                                    from: t.head,
                                    to: Ho(t.head.line + 1, 0)
                                } : {from: t.head, to: Ho(t.head.line, n)}
                            }
                            return {from: t.from(), to: t.to()}
                        })
                    }, deleteLine: function (e) {
                        jn(e, function (t) {
                            return {from: Ho(t.from().line, 0), to: me(e.doc, Ho(t.to().line + 1, 0))}
                        })
                    }, delLineLeft: function (e) {
                        jn(e, function (e) {
                            return {from: Ho(e.from().line, 0), to: e.from()}
                        })
                    }, delWrappedLineLeft: function (e) {
                        jn(e, function (t) {
                            var n = e.charCoords(t.head, "div").top + 5, i = e.coordsChar({left: 0, top: n}, "div");
                            return {from: i, to: t.from()}
                        })
                    }, delWrappedLineRight: function (e) {
                        jn(e, function (t) {
                            var n = e.charCoords(t.head, "div").top + 5, i = e.coordsChar({
                                left: e.display.lineDiv.offsetWidth + 100,
                                top: n
                            }, "div");
                            return {from: t.from(), to: i}
                        })
                    }, undo: function (e) {
                        e.undo()
                    }, redo: function (e) {
                        e.redo()
                    }, undoSelection: function (e) {
                        e.undoSelection()
                    }, redoSelection: function (e) {
                        e.redoSelection()
                    }, goDocStart: function (e) {
                        e.extendSelection(Ho(e.firstLine(), 0))
                    }, goDocEnd: function (e) {
                        e.extendSelection(Ho(e.lastLine()))
                    }, goLineStart: function (e) {
                        e.extendSelectionsBy(function (t) {
                            return oo(e, t.head.line)
                        }, {origin: "+move", bias: 1})
                    }, goLineStartSmart: function (e) {
                        e.extendSelectionsBy(function (t) {
                            return so(e, t.head)
                        }, {origin: "+move", bias: 1})
                    }, goLineEnd: function (e) {
                        e.extendSelectionsBy(function (t) {
                            return ao(e, t.head.line)
                        }, {origin: "+move", bias: -1})
                    }, goLineRight: function (e) {
                        e.extendSelectionsBy(function (t) {
                            var n = e.charCoords(t.head, "div").top + 5;
                            return e.coordsChar({left: e.display.lineDiv.offsetWidth + 100, top: n}, "div")
                        }, Wa)
                    }, goLineLeft: function (e) {
                        e.extendSelectionsBy(function (t) {
                            var n = e.charCoords(t.head, "div").top + 5;
                            return e.coordsChar({left: 0, top: n}, "div")
                        }, Wa)
                    }, goLineLeftSmart: function (e) {
                        e.extendSelectionsBy(function (t) {
                            var n = e.charCoords(t.head, "div").top + 5, i = e.coordsChar({left: 0, top: n}, "div");
                            return i.ch < e.getLine(i.line).search(/\S/) ? so(e, t.head) : i
                        }, Wa)
                    }, goLineUp: function (e) {
                        e.moveV(-1, "line")
                    }, goLineDown: function (e) {
                        e.moveV(1, "line")
                    }, goPageUp: function (e) {
                        e.moveV(-1, "page")
                    }, goPageDown: function (e) {
                        e.moveV(1, "page")
                    }, goCharLeft: function (e) {
                        e.moveH(-1, "char")
                    }, goCharRight: function (e) {
                        e.moveH(1, "char")
                    }, goColumnLeft: function (e) {
                        e.moveH(-1, "column")
                    }, goColumnRight: function (e) {
                        e.moveH(1, "column")
                    }, goWordLeft: function (e) {
                        e.moveH(-1, "word")
                    }, goGroupRight: function (e) {
                        e.moveH(1, "group")
                    }, goGroupLeft: function (e) {
                        e.moveH(-1, "group")
                    }, goWordRight: function (e) {
                        e.moveH(1, "word")
                    }, delCharBefore: function (e) {
                        e.deleteH(-1, "char")
                    }, delCharAfter: function (e) {
                        e.deleteH(1, "char")
                    }, delWordBefore: function (e) {
                        e.deleteH(-1, "word")
                    }, delWordAfter: function (e) {
                        e.deleteH(1, "word")
                    }, delGroupBefore: function (e) {
                        e.deleteH(-1, "group")
                    }, delGroupAfter: function (e) {
                        e.deleteH(1, "group")
                    }, indentAuto: function (e) {
                        e.indentSelection("smart")
                    }, indentMore: function (e) {
                        e.indentSelection("add")
                    }, indentLess: function (e) {
                        e.indentSelection("subtract")
                    }, insertTab: function (e) {
                        e.replaceSelection("\t")
                    }, insertSoftTab: function (e) {
                        for (var t = [], n = e.listSelections(), i = e.options.tabSize, r = 0; r < n.length; r++) {
                            var o = n[r].from(), a = Fa(e.getLine(o.line), o.ch, i);
                            t.push(Dr(i - a % i))
                        }
                        e.replaceSelections(t)
                    }, defaultTab: function (e) {
                        e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
                    }, transposeChars: function (e) {
                        Nt(e, function () {
                            for (var t = e.listSelections(), n = [], i = 0; i < t.length; i++) {
                                var r = t[i].head, o = Zi(e.doc, r.line).text;
                                if (o)if (r.ch == o.length && (r = new Ho(r.line, r.ch - 1)), r.ch > 0)r = new Ho(r.line, r.ch + 1), e.replaceRange(o.charAt(r.ch - 1) + o.charAt(r.ch - 2), Ho(r.line, r.ch - 2), r, "+transpose"); else if (r.line > e.doc.first) {
                                    var a = Zi(e.doc, r.line - 1).text;
                                    a && e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + a.charAt(a.length - 1), Ho(r.line - 1, a.length - 1), Ho(r.line, 1), "+transpose")
                                }
                                n.push(new de(r, r))
                            }
                            e.setSelections(n)
                        })
                    }, newlineAndIndent: function (e) {
                        Nt(e, function () {
                            for (var t = e.listSelections().length, n = 0; t > n; n++) {
                                var i = e.listSelections()[n];
                                e.replaceRange(e.doc.lineSeparator(), i.anchor, i.head, "+input"), e.indentLine(i.from().line + 1, null, !0)
                            }
                            Hn(e)
                        })
                    }, openLine: function (e) {
                        e.replaceSelection("\n", "start")
                    }, toggleOverwrite: function (e) {
                        e.toggleOverwrite()
                    }
                }, da = e.keyMap = {};
                da.basic = {
                    Left: "goCharLeft",
                    Right: "goCharRight",
                    Up: "goLineUp",
                    Down: "goLineDown",
                    End: "goLineEnd",
                    Home: "goLineStartSmart",
                    PageUp: "goPageUp",
                    PageDown: "goPageDown",
                    Delete: "delCharAfter",
                    Backspace: "delCharBefore",
                    "Shift-Backspace": "delCharBefore",
                    Tab: "defaultTab",
                    "Shift-Tab": "indentAuto",
                    Enter: "newlineAndIndent",
                    Insert: "toggleOverwrite",
                    Esc: "singleSelection"
                }, da.pcDefault = {
                    "Ctrl-A": "selectAll",
                    "Ctrl-D": "deleteLine",
                    "Ctrl-Z": "undo",
                    "Shift-Ctrl-Z": "redo",
                    "Ctrl-Y": "redo",
                    "Ctrl-Home": "goDocStart",
                    "Ctrl-End": "goDocEnd",
                    "Ctrl-Up": "goLineUp",
                    "Ctrl-Down": "goLineDown",
                    "Ctrl-Left": "goGroupLeft",
                    "Ctrl-Right": "goGroupRight",
                    "Alt-Left": "goLineStart",
                    "Alt-Right": "goLineEnd",
                    "Ctrl-Backspace": "delGroupBefore",
                    "Ctrl-Delete": "delGroupAfter",
                    "Ctrl-S": "save",
                    "Ctrl-F": "find",
                    "Ctrl-G": "findNext",
                    "Shift-Ctrl-G": "findPrev",
                    "Shift-Ctrl-F": "replace",
                    "Shift-Ctrl-R": "replaceAll",
                    "Ctrl-[": "indentLess",
                    "Ctrl-]": "indentMore",
                    "Ctrl-U": "undoSelection",
                    "Shift-Ctrl-U": "redoSelection",
                    "Alt-U": "redoSelection",
                    fallthrough: "basic"
                }, da.emacsy = {
                    "Ctrl-F": "goCharRight",
                    "Ctrl-B": "goCharLeft",
                    "Ctrl-P": "goLineUp",
                    "Ctrl-N": "goLineDown",
                    "Alt-F": "goWordRight",
                    "Alt-B": "goWordLeft",
                    "Ctrl-A": "goLineStart",
                    "Ctrl-E": "goLineEnd",
                    "Ctrl-V": "goPageDown",
                    "Shift-Ctrl-V": "goPageUp",
                    "Ctrl-D": "delCharAfter",
                    "Ctrl-H": "delCharBefore",
                    "Alt-D": "delWordAfter",
                    "Alt-Backspace": "delWordBefore",
                    "Ctrl-K": "killLine",
                    "Ctrl-T": "transposeChars",
                    "Ctrl-O": "openLine"
                }, da.macDefault = {
                    "Cmd-A": "selectAll",
                    "Cmd-D": "deleteLine",
                    "Cmd-Z": "undo",
                    "Shift-Cmd-Z": "redo",
                    "Cmd-Y": "redo",
                    "Cmd-Home": "goDocStart",
                    "Cmd-Up": "goDocStart",
                    "Cmd-End": "goDocEnd",
                    "Cmd-Down": "goDocEnd",
                    "Alt-Left": "goGroupLeft",
                    "Alt-Right": "goGroupRight",
                    "Cmd-Left": "goLineLeft",
                    "Cmd-Right": "goLineRight",
                    "Alt-Backspace": "delGroupBefore",
                    "Ctrl-Alt-Backspace": "delGroupAfter",
                    "Alt-Delete": "delGroupAfter",
                    "Cmd-S": "save",
                    "Cmd-F": "find",
                    "Cmd-G": "findNext",
                    "Shift-Cmd-G": "findPrev",
                    "Cmd-Alt-F": "replace",
                    "Shift-Cmd-Alt-F": "replaceAll",
                    "Cmd-[": "indentLess",
                    "Cmd-]": "indentMore",
                    "Cmd-Backspace": "delWrappedLineLeft",
                    "Cmd-Delete": "delWrappedLineRight",
                    "Cmd-U": "undoSelection",
                    "Shift-Cmd-U": "redoSelection",
                    "Ctrl-Up": "goDocStart",
                    "Ctrl-Down": "goDocEnd",
                    fallthrough: ["basic", "emacsy"]
                }, da["default"] = Ao ? da.macDefault : da.pcDefault, e.normalizeKeyMap = function (e) {
                    var t = {};
                    for (var n in e)if (e.hasOwnProperty(n)) {
                        var i = e[n];
                        if (/^(name|fallthrough|(de|at)tach)$/.test(n))continue;
                        if ("..." == i) {
                            delete e[n];
                            continue
                        }
                        for (var r = Ir(n.split(" "), Gn), o = 0; o < r.length; o++) {
                            var a, s;
                            o == r.length - 1 ? (s = r.join(" "), a = i) : (s = r.slice(0, o + 1).join(" "), a = "...");
                            var l = t[s];
                            if (l) {
                                if (l != a)throw new Error("Inconsistent bindings for " + s)
                            } else t[s] = a
                        }
                        delete e[n]
                    }
                    for (var c in t)e[c] = t[c];
                    return e
                };
                var ha = e.lookupKey = function (e, t, n, i) {
                    t = Vn(t);
                    var r = t.call ? t.call(e, i) : t[e];
                    if (r === !1)return "nothing";
                    if ("..." === r)return "multi";
                    if (null != r && n(r))return "handled";
                    if (t.fallthrough) {
                        if ("[object Array]" != Object.prototype.toString.call(t.fallthrough))return ha(e, t.fallthrough, n, i);
                        for (var o = 0; o < t.fallthrough.length; o++) {
                            var a = ha(e, t.fallthrough[o], n, i);
                            if (a)return a
                        }
                    }
                }, fa = e.isModifierKey = function (e) {
                    var t = "string" == typeof e ? e : os[e.keyCode];
                    return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
                }, pa = e.keyName = function (e, t) {
                    if (So && 34 == e.keyCode && e["char"])return !1;
                    var n = os[e.keyCode], i = n;
                    return null != i && !e.altGraphKey && (e.altKey && "Alt" != n && (i = "Alt-" + i), (Io ? e.metaKey : e.ctrlKey) && "Ctrl" != n && (i = "Ctrl-" + i), (Io ? e.ctrlKey : e.metaKey) && "Cmd" != n && (i = "Cmd-" + i), !t && e.shiftKey && "Shift" != n && (i = "Shift-" + i), i)
                };
                e.fromTextArea = function (t, n) {
                    function i() {
                        t.value = c.getValue()
                    }

                    if (n = n ? Rr(n) : {}, n.value = t.value, !n.tabindex && t.tabIndex && (n.tabindex = t.tabIndex), !n.placeholder && t.placeholder && (n.placeholder = t.placeholder), null == n.autofocus) {
                        var r = qr();
                        n.autofocus = r == t || null != t.getAttribute("autofocus") && r == document.body
                    }
                    if (t.form && (Aa(t.form, "submit", i), !n.leaveSubmitMethodAlone)) {
                        var o = t.form, a = o.submit;
                        try {
                            var s = o.submit = function () {
                                i(), o.submit = a, o.submit(), o.submit = s
                            }
                        } catch (l) {
                        }
                    }
                    n.finishInit = function (e) {
                        e.save = i, e.getTextArea = function () {
                            return t
                        }, e.toTextArea = function () {
                            e.toTextArea = isNaN, i(), t.parentNode.removeChild(e.getWrapperElement()), t.style.display = "", t.form && (Ea(t.form, "submit", i), "function" == typeof t.form.submit && (t.form.submit = a))
                        }
                    }, t.style.display = "none";
                    var c = e(function (e) {
                        t.parentNode.insertBefore(e, t.nextSibling)
                    }, n);
                    return c
                };
                var ma = e.StringStream = function (e, t) {
                    this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0
                };
                ma.prototype = {
                    eol: function () {
                        return this.pos >= this.string.length
                    }, sol: function () {
                        return this.pos == this.lineStart
                    }, peek: function () {
                        return this.string.charAt(this.pos) || void 0
                    }, next: function () {
                        return this.pos < this.string.length ? this.string.charAt(this.pos++) : void 0
                    }, eat: function (e) {
                        var t = this.string.charAt(this.pos);
                        if ("string" == typeof e)var n = t == e; else var n = t && (e.test ? e.test(t) : e(t));
                        return n ? (++this.pos, t) : void 0
                    }, eatWhile: function (e) {
                        for (var t = this.pos; this.eat(e););
                        return this.pos > t
                    }, eatSpace: function () {
                        for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;
                        return this.pos > e
                    }, skipToEnd: function () {
                        this.pos = this.string.length
                    }, skipTo: function (e) {
                        var t = this.string.indexOf(e, this.pos);
                        return t > -1 ? (this.pos = t, !0) : void 0
                    }, backUp: function (e) {
                        this.pos -= e
                    }, column: function () {
                        return this.lastColumnPos < this.start && (this.lastColumnValue = Fa(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? Fa(this.string, this.lineStart, this.tabSize) : 0)
                    }, indentation: function () {
                        return Fa(this.string, null, this.tabSize) - (this.lineStart ? Fa(this.string, this.lineStart, this.tabSize) : 0)
                    }, match: function (e, t, n) {
                        if ("string" != typeof e) {
                            var i = this.string.slice(this.pos).match(e);
                            return i && i.index > 0 ? null : (i && t !== !1 && (this.pos += i[0].length), i)
                        }
                        var r = function (e) {
                            return n ? e.toLowerCase() : e
                        }, o = this.string.substr(this.pos, e.length);
                        return r(o) == r(e) ? (t !== !1 && (this.pos += e.length), !0) : void 0
                    }, current: function () {
                        return this.string.slice(this.start, this.pos)
                    }, hideFirstChars: function (e, t) {
                        this.lineStart += e;
                        try {
                            return t()
                        } finally {
                            this.lineStart -= e
                        }
                    }
                };
                var ga = 0, va = e.TextMarker = function (e, t) {
                    this.lines = [], this.type = t, this.doc = e, this.id = ++ga
                };
                Nr(va), va.prototype.clear = function () {
                    if (!this.explicitlyCleared) {
                        var e = this.doc.cm, t = e && !e.curOp;
                        if (t && xt(e), _r(this, "clear")) {
                            var n = this.find();
                            n && Sr(this, "clear", n.from, n.to)
                        }
                        for (var i = null, r = null, o = 0; o < this.lines.length; ++o) {
                            var a = this.lines[o], s = ei(a.markedSpans, this);
                            e && !this.collapsed ? Pt(e, tr(a), "text") : e && (null != s.to && (r = tr(a)), null != s.from && (i = tr(a))), a.markedSpans = ti(a.markedSpans, s), null == s.from && this.collapsed && !ki(this.doc, a) && e && er(a, yt(e.display))
                        }
                        if (e && this.collapsed && !e.options.lineWrapping)for (var o = 0; o < this.lines.length; ++o) {
                            var l = yi(this.lines[o]), c = d(l);
                            c > e.display.maxLineLength && (e.display.maxLine = l, e.display.maxLineLength = c, e.display.maxLineChanged = !0)
                        }
                        null != i && e && this.collapsed && Bt(e, i, r + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Ne(e.doc)), e && Sr(e, "markerCleared", e, this), t && kt(e), this.parent && this.parent.clear()
                    }
                }, va.prototype.find = function (e, t) {
                    null == e && "bookmark" == this.type && (e = 1);
                    for (var n, i, r = 0; r < this.lines.length; ++r) {
                        var o = this.lines[r], a = ei(o.markedSpans, this);
                        if (null != a.from && (n = Ho(t ? o : tr(o), a.from), -1 == e))return n;
                        if (null != a.to && (i = Ho(t ? o : tr(o), a.to), 1 == e))return i
                    }
                    return n && {from: n, to: i}
                }, va.prototype.changed = function () {
                    var e = this.find(-1, !0), t = this, n = this.doc.cm;
                    e && n && Nt(n, function () {
                        var i = e.line, r = tr(e.line), o = Qe(n, r);
                        if (o && (ot(o), n.curOp.selectionChanged = n.curOp.forceUpdate = !0), n.curOp.updateMaxLine = !0, !ki(t.doc, i) && null != t.height) {
                            var a = t.height;
                            t.height = null;
                            var s = Li(t) - a;
                            s && er(i, i.height + s)
                        }
                    })
                }, va.prototype.attachLine = function (e) {
                    if (!this.lines.length && this.doc.cm) {
                        var t = this.doc.cm.curOp;
                        t.maybeHiddenMarkers && -1 != Or(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
                    }
                    this.lines.push(e)
                }, va.prototype.detachLine = function (e) {
                    if (this.lines.splice(Or(this.lines, e), 1), !this.lines.length && this.doc.cm) {
                        var t = this.doc.cm.curOp;
                        (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
                    }
                };
                var ga = 0, ya = e.SharedTextMarker = function (e, t) {
                    this.markers = e, this.primary = t;
                    for (var n = 0; n < e.length; ++n)e[n].parent = this
                };
                Nr(ya), ya.prototype.clear = function () {
                    if (!this.explicitlyCleared) {
                        this.explicitlyCleared = !0;
                        for (var e = 0; e < this.markers.length; ++e)this.markers[e].clear();
                        Sr(this, "clear")
                    }
                }, ya.prototype.find = function (e, t) {
                    return this.primary.find(e, t)
                };
                var ba = e.LineWidget = function (e, t, n) {
                    if (n)for (var i in n)n.hasOwnProperty(i) && (this[i] = n[i]);
                    this.doc = e, this.node = t
                };
                Nr(ba), ba.prototype.clear = function () {
                    var e = this.doc.cm, t = this.line.widgets, n = this.line, i = tr(n);
                    if (null != i && t) {
                        for (var r = 0; r < t.length; ++r)t[r] == this && t.splice(r--, 1);
                        t.length || (n.widgets = null);
                        var o = Li(this);
                        er(n, Math.max(0, n.height - o)), e && Nt(e, function () {
                            Si(e, n, -o), Pt(e, i, "widget")
                        })
                    }
                }, ba.prototype.changed = function () {
                    var e = this.height, t = this.doc.cm, n = this.line;
                    this.height = null;
                    var i = Li(this) - e;
                    i && (er(n, n.height + i), t && Nt(t, function () {
                        t.curOp.forceUpdate = !0, Si(t, n, i)
                    }))
                };
                var xa = e.Line = function (e, t, n) {
                    this.text = e, ui(this, t), this.height = n ? n(this) : 1
                };
                Nr(xa), xa.prototype.lineNo = function () {
                    return tr(this)
                };
                var wa = {}, ka = {};
                Vi.prototype = {
                    chunkSize: function () {
                        return this.lines.length
                    }, removeInner: function (e, t) {
                        for (var n = e, i = e + t; i > n; ++n) {
                            var r = this.lines[n];
                            this.height -= r.height, _i(r), Sr(r, "delete")
                        }
                        this.lines.splice(e, t)
                    }, collapse: function (e) {
                        e.push.apply(e, this.lines)
                    }, insertInner: function (e, t, n) {
                        this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
                        for (var i = 0; i < t.length; ++i)t[i].parent = this
                    }, iterN: function (e, t, n) {
                        for (var i = e + t; i > e; ++e)if (n(this.lines[e]))return !0
                    }
                }, Yi.prototype = {
                    chunkSize: function () {
                        return this.size
                    }, removeInner: function (e, t) {
                        this.size -= t;
                        for (var n = 0; n < this.children.length; ++n) {
                            var i = this.children[n], r = i.chunkSize();
                            if (r > e) {
                                var o = Math.min(t, r - e), a = i.height;
                                if (i.removeInner(e, o), this.height -= a - i.height, r == o && (this.children.splice(n--, 1), i.parent = null), 0 == (t -= o))break;
                                e = 0
                            } else e -= r
                        }
                        if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof Vi))) {
                            var s = [];
                            this.collapse(s), this.children = [new Vi(s)], this.children[0].parent = this
                        }
                    }, collapse: function (e) {
                        for (var t = 0; t < this.children.length; ++t)this.children[t].collapse(e)
                    }, insertInner: function (e, t, n) {
                        this.size += t.length, this.height += n;
                        for (var i = 0; i < this.children.length; ++i) {
                            var r = this.children[i], o = r.chunkSize();
                            if (o >= e) {
                                if (r.insertInner(e, t, n), r.lines && r.lines.length > 50) {
                                    for (var a = r.lines.length % 25 + 25, s = a; s < r.lines.length;) {
                                        var l = new Vi(r.lines.slice(s, s += 25));
                                        r.height -= l.height, this.children.splice(++i, 0, l), l.parent = this
                                    }
                                    r.lines = r.lines.slice(0, a), this.maybeSpill()
                                }
                                break
                            }
                            e -= o
                        }
                    }, maybeSpill: function () {
                        if (!(this.children.length <= 10)) {
                            var e = this;
                            do {
                                var t = e.children.splice(e.children.length - 5, 5), n = new Yi(t);
                                if (e.parent) {
                                    e.size -= n.size, e.height -= n.height;
                                    var i = Or(e.parent.children, e);
                                    e.parent.children.splice(i + 1, 0, n)
                                } else {
                                    var r = new Yi(e.children);
                                    r.parent = e, e.children = [r, n], e = r
                                }
                                n.parent = e.parent
                            } while (e.children.length > 10);
                            e.parent.maybeSpill()
                        }
                    }, iterN: function (e, t, n) {
                        for (var i = 0; i < this.children.length; ++i) {
                            var r = this.children[i], o = r.chunkSize();
                            if (o > e) {
                                var a = Math.min(t, o - e);
                                if (r.iterN(e, a, n))return !0;
                                if (0 == (t -= a))break;
                                e = 0
                            } else e -= o
                        }
                    }
                };
                var Ca = 0, Sa = e.Doc = function (e, t, n, i) {
                    if (!(this instanceof Sa))return new Sa(e, t, n, i);
                    null == n && (n = 0), Yi.call(this, [new Vi([new xa("", null)])]), this.first = n, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.frontier = n;
                    var r = Ho(n, 0);
                    this.sel = fe(r), this.history = new or(null), this.id = ++Ca, this.modeOption = t, this.lineSep = i, this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), Gi(this, {
                        from: r,
                        to: r,
                        text: e
                    }), Te(this, fe(r), Ra)
                };
                Sa.prototype = Pr(Yi.prototype, {
                    constructor: Sa, iter: function (e, t, n) {
                        n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e)
                    }, insert: function (e, t) {
                        for (var n = 0, i = 0; i < t.length; ++i)n += t[i].height;
                        this.insertInner(e - this.first, t, n)
                    }, remove: function (e, t) {
                        this.removeInner(e - this.first, t)
                    }, getValue: function (e) {
                        var t = Qi(this, this.first, this.first + this.size);
                        return e === !1 ? t : t.join(e || this.lineSeparator())
                    }, setValue: Et(function (e) {
                        var t = Ho(this.first, 0), n = this.first + this.size - 1;
                        Tn(this, {
                            from: t,
                            to: Ho(n, Zi(this, n).text.length),
                            text: this.splitLines(e),
                            origin: "setValue",
                            full: !0
                        }, !0), Te(this, fe(t))
                    }), replaceRange: function (e, t, n, i) {
                        t = me(this, t), n = n ? me(this, n) : t, En(this, e, t, n, i)
                    }, getRange: function (e, t, n) {
                        var i = Ji(this, me(this, e), me(this, t));
                        return n === !1 ? i : i.join(n || this.lineSeparator())
                    }, getLine: function (e) {
                        var t = this.getLineHandle(e);
                        return t && t.text
                    }, getLineHandle: function (e) {
                        return ve(this, e) ? Zi(this, e) : void 0
                    }, getLineNumber: function (e) {
                        return tr(e)
                    }, getLineHandleVisualStart: function (e) {
                        return "number" == typeof e && (e = Zi(this, e)), yi(e)
                    }, lineCount: function () {
                        return this.size
                    }, firstLine: function () {
                        return this.first
                    }, lastLine: function () {
                        return this.first + this.size - 1
                    }, clipPos: function (e) {
                        return me(this, e)
                    }, getCursor: function (e) {
                        var t, n = this.sel.primary();
                        return t = null == e || "head" == e ? n.head : "anchor" == e ? n.anchor : "end" == e || "to" == e || e === !1 ? n.to() : n.from()
                    }, listSelections: function () {
                        return this.sel.ranges
                    }, somethingSelected: function () {
                        return this.sel.somethingSelected()
                    }, setCursor: Et(function (e, t, n) {
                        Ce(this, me(this, "number" == typeof e ? Ho(e, t || 0) : e), null, n)
                    }), setSelection: Et(function (e, t, n) {
                        Ce(this, me(this, e), me(this, t || e), n)
                    }), extendSelection: Et(function (e, t, n) {
                        xe(this, me(this, e), t && me(this, t), n)
                    }), extendSelections: Et(function (e, t) {
                        we(this, ye(this, e), t)
                    }), extendSelectionsBy: Et(function (e, t) {
                        var n = Ir(this.sel.ranges, e);
                        we(this, ye(this, n), t)
                    }), setSelections: Et(function (e, t, n) {
                        if (e.length) {
                            for (var i = 0, r = []; i < e.length; i++)r[i] = new de(me(this, e[i].anchor), me(this, e[i].head));
                            null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), Te(this, he(r, t), n)
                        }
                    }), addSelection: Et(function (e, t, n) {
                        var i = this.sel.ranges.slice(0);
                        i.push(new de(me(this, e), me(this, t || e))), Te(this, he(i, i.length - 1), n)
                    }), getSelection: function (e) {
                        for (var t, n = this.sel.ranges, i = 0; i < n.length; i++) {
                            var r = Ji(this, n[i].from(), n[i].to());
                            t = t ? t.concat(r) : r
                        }
                        return e === !1 ? t : t.join(e || this.lineSeparator())
                    }, getSelections: function (e) {
                        for (var t = [], n = this.sel.ranges, i = 0; i < n.length; i++) {
                            var r = Ji(this, n[i].from(), n[i].to());
                            e !== !1 && (r = r.join(e || this.lineSeparator())), t[i] = r
                        }
                        return t
                    }, replaceSelection: function (e, t, n) {
                        for (var i = [], r = 0; r < this.sel.ranges.length; r++)i[r] = e;
                        this.replaceSelections(i, t, n || "+input")
                    }, replaceSelections: Et(function (e, t, n) {
                        for (var i = [], r = this.sel, o = 0; o < r.ranges.length; o++) {
                            var a = r.ranges[o];
                            i[o] = {from: a.from(), to: a.to(), text: this.splitLines(e[o]), origin: n}
                        }
                        for (var s = t && "end" != t && Sn(this, i, t), o = i.length - 1; o >= 0; o--)Tn(this, i[o]);
                        s ? Le(this, s) : this.cm && Hn(this.cm)
                    }), undo: Et(function () {
                        _n(this, "undo")
                    }), redo: Et(function () {
                        _n(this, "redo")
                    }), undoSelection: Et(function () {
                        _n(this, "undo", !0)
                    }), redoSelection: Et(function () {
                        _n(this, "redo", !0)
                    }), setExtending: function (e) {
                        this.extend = e
                    }, getExtending: function () {
                        return this.extend
                    }, historySize: function () {
                        for (var e = this.history, t = 0, n = 0, i = 0; i < e.done.length; i++)e.done[i].ranges || ++t;
                        for (var i = 0; i < e.undone.length; i++)e.undone[i].ranges || ++n;
                        return {undo: t, redo: n}
                    }, clearHistory: function () {
                        this.history = new or(this.history.maxGeneration)
                    }, markClean: function () {
                        this.cleanGeneration = this.changeGeneration(!0)
                    }, changeGeneration: function (e) {
                        return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation
                    }, isClean: function (e) {
                        return this.history.generation == (e || this.cleanGeneration)
                    }, getHistory: function () {
                        return {done: gr(this.history.done), undone: gr(this.history.undone)}
                    }, setHistory: function (e) {
                        var t = this.history = new or(this.history.maxGeneration);
                        t.done = gr(e.done.slice(0), null, !0), t.undone = gr(e.undone.slice(0), null, !0)
                    }, addLineClass: Et(function (e, t, n) {
                        return zn(this, e, "gutter" == t ? "gutter" : "class", function (e) {
                            var i = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass";
                            if (e[i]) {
                                if (Gr(n).test(e[i]))return !1;
                                e[i] += " " + n
                            } else e[i] = n;
                            return !0
                        })
                    }), removeLineClass: Et(function (e, t, n) {
                        return zn(this, e, "gutter" == t ? "gutter" : "class", function (e) {
                            var i = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass", r = e[i];
                            if (!r)return !1;
                            if (null == n)e[i] = null; else {
                                var o = r.match(Gr(n));
                                if (!o)return !1;
                                var a = o.index + o[0].length;
                                e[i] = r.slice(0, o.index) + (o.index && a != r.length ? " " : "") + r.slice(a) || null
                            }
                            return !0
                        })
                    }), addLineWidget: Et(function (e, t, n) {
                        return Ti(this, e, t, n)
                    }), removeLineWidget: function (e) {
                        e.clear()
                    }, markText: function (e, t, n) {
                        return Yn(this, me(this, e), me(this, t), n, n && n.type || "range")
                    }, setBookmark: function (e, t) {
                        var n = {
                            replacedWith: t && (null == t.nodeType ? t.widget : t),
                            insertLeft: t && t.insertLeft,
                            clearWhenEmpty: !1,
                            shared: t && t.shared,
                            handleMouseEvents: t && t.handleMouseEvents
                        };
                        return e = me(this, e), Yn(this, e, e, n, "bookmark")
                    }, findMarksAt: function (e) {
                        e = me(this, e);
                        var t = [], n = Zi(this, e.line).markedSpans;
                        if (n)for (var i = 0; i < n.length; ++i) {
                            var r = n[i];
                            (null == r.from || r.from <= e.ch) && (null == r.to || r.to >= e.ch) && t.push(r.marker.parent || r.marker)
                        }
                        return t
                    }, findMarks: function (e, t, n) {
                        e = me(this, e), t = me(this, t);
                        var i = [], r = e.line;
                        return this.iter(e.line, t.line + 1, function (o) {
                            var a = o.markedSpans;
                            if (a)for (var s = 0; s < a.length; s++) {
                                var l = a[s];
                                null != l.to && r == e.line && e.ch >= l.to || null == l.from && r != e.line || null != l.from && r == t.line && l.from >= t.ch || n && !n(l.marker) || i.push(l.marker.parent || l.marker)
                            }
                            ++r
                        }), i
                    }, getAllMarks: function () {
                        var e = [];
                        return this.iter(function (t) {
                            var n = t.markedSpans;
                            if (n)for (var i = 0; i < n.length; ++i)null != n[i].from && e.push(n[i].marker)
                        }), e
                    }, posFromIndex: function (e) {
                        var t, n = this.first, i = this.lineSeparator().length;
                        return this.iter(function (r) {
                            var o = r.text.length + i;
                            return o > e ? (t = e, !0) : (e -= o, void++n)
                        }), me(this, Ho(n, t))
                    }, indexFromPos: function (e) {
                        e = me(this, e);
                        var t = e.ch;
                        if (e.line < this.first || e.ch < 0)return 0;
                        var n = this.lineSeparator().length;
                        return this.iter(this.first, e.line, function (e) {
                            t += e.text.length + n
                        }), t
                    }, copy: function (e) {
                        var t = new Sa(Qi(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep);
                        return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
                    }, linkedDoc: function (e) {
                        e || (e = {});
                        var t = this.first, n = this.first + this.size;
                        null != e.from && e.from > t && (t = e.from), null != e.to && e.to < n && (n = e.to);
                        var i = new Sa(Qi(this, t, n), e.mode || this.modeOption, t, this.lineSep);
                        return e.sharedHist && (i.history = this.history), (this.linked || (this.linked = [])).push({
                            doc: i,
                            sharedHist: e.sharedHist
                        }), i.linked = [{doc: this, isParent: !0, sharedHist: e.sharedHist}], Zn(i, Xn(this)), i
                    }, unlinkDoc: function (t) {
                        if (t instanceof e && (t = t.doc), this.linked)for (var n = 0; n < this.linked.length; ++n) {
                            var i = this.linked[n];
                            if (i.doc == t) {
                                this.linked.splice(n, 1), t.unlinkDoc(this), Jn(Xn(this));
                                break
                            }
                        }
                        if (t.history == this.history) {
                            var r = [t.id];
                            Ki(t, function (e) {
                                r.push(e.id)
                            }, !0), t.history = new or(null), t.history.done = gr(this.history.done, r), t.history.undone = gr(this.history.undone, r)
                        }
                    }, iterLinkedDocs: function (e) {
                        Ki(this, e)
                    }, getMode: function () {
                        return this.mode
                    }, getEditor: function () {
                        return this.cm
                    }, splitLines: function (e) {
                        return this.lineSep ? e.split(this.lineSep) : ts(e)
                    }, lineSeparator: function () {
                        return this.lineSep || "\n"
                    }
                }), Sa.prototype.eachLine = Sa.prototype.iter;
                var La = "iter insert remove copy getEditor constructor".split(" ");
                for (var Ta in Sa.prototype)Sa.prototype.hasOwnProperty(Ta) && Or(La, Ta) < 0 && (e.prototype[Ta] = function (e) {
                    return function () {
                        return e.apply(this.doc, arguments)
                    }
                }(Sa.prototype[Ta]));
                Nr(Sa);
                var Ma = e.e_preventDefault = function (e) {
                    e.preventDefault ? e.preventDefault() : e.returnValue = !1
                }, _a = e.e_stopPropagation = function (e) {
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                }, Na = e.e_stop = function (e) {
                    Ma(e), _a(e)
                }, Aa = e.on = function (e, t, n) {
                    if (e.addEventListener)e.addEventListener(t, n, !1); else if (e.attachEvent)e.attachEvent("on" + t, n); else {
                        var i = e._handlers || (e._handlers = {}), r = i[t] || (i[t] = []);
                        r.push(n)
                    }
                }, Da = [], Ea = e.off = function (e, t, n) {
                    if (e.removeEventListener)e.removeEventListener(t, n, !1); else if (e.detachEvent)e.detachEvent("on" + t, n); else for (var i = Cr(e, t, !1), r = 0; r < i.length; ++r)if (i[r] == n) {
                        i.splice(r, 1);
                        break
                    }
                }, Oa = e.signal = function (e, t) {
                    var n = Cr(e, t, !0);
                    if (n.length)for (var i = Array.prototype.slice.call(arguments, 2), r = 0; r < n.length; ++r)n[r].apply(null, i)
                }, Ia = null, Ba = 30, Pa = e.Pass = {
                    toString: function () {
                        return "CodeMirror.Pass"
                    }
                }, Ra = {scroll: !1}, Ha = {origin: "*mouse"}, Wa = {origin: "+move"};
                Ar.prototype.set = function (e, t) {
                    clearTimeout(this.id), this.id = setTimeout(t, e)
                };
                var Fa = e.countColumn = function (e, t, n, i, r) {
                    null == t && (t = e.search(/[^\s\u00a0]/), -1 == t && (t = e.length));
                    for (var o = i || 0, a = r || 0; ;) {
                        var s = e.indexOf("\t", o);
                        if (0 > s || s >= t)return a + (t - o);
                        a += s - o, a += n - a % n, o = s + 1
                    }
                }, za = e.findColumn = function (e, t, n) {
                    for (var i = 0, r = 0; ;) {
                        var o = e.indexOf("\t", i);
                        -1 == o && (o = e.length);
                        var a = o - i;
                        if (o == e.length || r + a >= t)return i + Math.min(a, t - r);
                        if (r += o - i, r += n - r % n, i = o + 1, r >= t)return i
                    }
                }, ja = [""], Ua = function (e) {
                    e.select()
                };
                _o ? Ua = function (e) {
                    e.selectionStart = 0, e.selectionEnd = e.value.length
                } : bo && (Ua = function (e) {
                    try {
                        e.select()
                    } catch (t) {
                    }
                });
                var $a, qa = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/, Ga = e.isWordChar = function (e) {
                    return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || qa.test(e))
                }, Va = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
                $a = document.createRange ? function (e, t, n, i) {
                    var r = document.createRange();
                    return r.setEnd(i || e, n), r.setStart(e, t), r
                } : function (e, t, n) {
                    var i = document.body.createTextRange();
                    try {
                        i.moveToElementText(e.parentNode)
                    } catch (r) {
                        return i
                    }
                    return i.collapse(!0), i.moveEnd("character", n), i.moveStart("character", t), i
                };
                var Ya = e.contains = function (e, t) {
                    if (3 == t.nodeType && (t = t.parentNode), e.contains)return e.contains(t);
                    do if (11 == t.nodeType && (t = t.host), t == e)return !0; while (t = t.parentNode)
                };
                bo && 11 > xo && (qr = function () {
                    try {
                        return document.activeElement
                    } catch (e) {
                        return document.body
                    }
                });
                var Ka, Xa, Za = e.rmClass = function (e, t) {
                    var n = e.className, i = Gr(t).exec(n);
                    if (i) {
                        var r = n.slice(i.index + i[0].length);
                        e.className = n.slice(0, i.index) + (r ? i[1] + r : "")
                    }
                }, Ja = e.addClass = function (e, t) {
                    var n = e.className;
                    Gr(t).test(n) || (e.className += (n ? " " : "") + t)
                }, Qa = !1, es = function () {
                    if (bo && 9 > xo)return !1;
                    var e = jr("div");
                    return "draggable" in e || "dragDrop" in e
                }(), ts = e.splitLines = 3 != "\n\nb".split(/\n/).length ? function (e) {
                    for (var t = 0, n = [], i = e.length; i >= t;) {
                        var r = e.indexOf("\n", t);
                        -1 == r && (r = e.length);
                        var o = e.slice(t, "\r" == e.charAt(r - 1) ? r - 1 : r), a = o.indexOf("\r");
                        -1 != a ? (n.push(o.slice(0, a)), t += a + 1) : (n.push(o), t = r + 1)
                    }
                    return n
                } : function (e) {
                    return e.split(/\r\n?|\n/)
                }, ns = window.getSelection ? function (e) {
                    try {
                        return e.selectionStart != e.selectionEnd
                    } catch (t) {
                        return !1
                    }
                } : function (e) {
                    try {
                        var t = e.ownerDocument.selection.createRange()
                    } catch (n) {
                    }
                    return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t)
                }, is = function () {
                    var e = jr("div");
                    return "oncopy" in e || (e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy)
                }(), rs = null, os = e.keyNames = {
                    3: "Enter",
                    8: "Backspace",
                    9: "Tab",
                    13: "Enter",
                    16: "Shift",
                    17: "Ctrl",
                    18: "Alt",
                    19: "Pause",
                    20: "CapsLock",
                    27: "Esc",
                    32: "Space",
                    33: "PageUp",
                    34: "PageDown",
                    35: "End",
                    36: "Home",
                    37: "Left",
                    38: "Up",
                    39: "Right",
                    40: "Down",
                    44: "PrintScrn",
                    45: "Insert",
                    46: "Delete",
                    59: ";",
                    61: "=",
                    91: "Mod",
                    92: "Mod",
                    93: "Mod",
                    106: "*",
                    107: "=",
                    109: "-",
                    110: ".",
                    111: "/",
                    127: "Delete",
                    173: "-",
                    186: ";",
                    187: "=",
                    188: ",",
                    189: "-",
                    190: ".",
                    191: "/",
                    192: "`",
                    219: "[",
                    220: "\\",
                    221: "]",
                    222: "'",
                    63232: "Up",
                    63233: "Down",
                    63234: "Left",
                    63235: "Right",
                    63272: "Delete",
                    63273: "Home",
                    63275: "End",
                    63276: "PageUp",
                    63277: "PageDown",
                    63302: "Insert"
                };
                !function () {
                    for (var e = 0; 10 > e; e++)os[e + 48] = os[e + 96] = String(e);
                    for (var e = 65; 90 >= e; e++)os[e] = String.fromCharCode(e);
                    for (var e = 1; 12 >= e; e++)os[e + 111] = os[e + 63235] = "F" + e
                }();
                var as, ss = function () {
                    function e(e) {
                        return 247 >= e ? n.charAt(e) : e >= 1424 && 1524 >= e ? "R" : e >= 1536 && 1773 >= e ? i.charAt(e - 1536) : e >= 1774 && 2220 >= e ? "r" : e >= 8192 && 8203 >= e ? "w" : 8204 == e ? "b" : "L"
                    }

                    function t(e, t, n) {
                        this.level = e, this.from = t, this.to = n
                    }

                    var n = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN", i = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm", r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, o = /[stwN]/, a = /[LRr]/, s = /[Lb1n]/, l = /[1n]/, c = "L";
                    return function (n) {
                        if (!r.test(n))return !1;
                        for (var i, u = n.length, d = [], h = 0; u > h; ++h)d.push(i = e(n.charCodeAt(h)));
                        for (var h = 0, f = c; u > h; ++h) {
                            var i = d[h];
                            "m" == i ? d[h] = f : f = i
                        }
                        for (var h = 0, p = c; u > h; ++h) {
                            var i = d[h];
                            "1" == i && "r" == p ? d[h] = "n" : a.test(i) && (p = i, "r" == i && (d[h] = "R"))
                        }
                        for (var h = 1, f = d[0]; u - 1 > h; ++h) {
                            var i = d[h];
                            "+" == i && "1" == f && "1" == d[h + 1] ? d[h] = "1" : "," != i || f != d[h + 1] || "1" != f && "n" != f || (d[h] = f), f = i
                        }
                        for (var h = 0; u > h; ++h) {
                            var i = d[h];
                            if ("," == i)d[h] = "N"; else if ("%" == i) {
                                for (var m = h + 1; u > m && "%" == d[m]; ++m);
                                for (var g = h && "!" == d[h - 1] || u > m && "1" == d[m] ? "1" : "N", v = h; m > v; ++v)d[v] = g;
                                h = m - 1
                            }
                        }
                        for (var h = 0, p = c; u > h; ++h) {
                            var i = d[h];
                            "L" == p && "1" == i ? d[h] = "L" : a.test(i) && (p = i)
                        }
                        for (var h = 0; u > h; ++h)if (o.test(d[h])) {
                            for (var m = h + 1; u > m && o.test(d[m]); ++m);
                            for (var y = "L" == (h ? d[h - 1] : c), b = "L" == (u > m ? d[m] : c), g = y || b ? "L" : "R", v = h; m > v; ++v)d[v] = g;
                            h = m - 1
                        }
                        for (var x, w = [], h = 0; u > h;)if (s.test(d[h])) {
                            var k = h;
                            for (++h; u > h && s.test(d[h]); ++h);
                            w.push(new t(0, k, h))
                        } else {
                            var C = h, S = w.length;
                            for (++h; u > h && "L" != d[h]; ++h);
                            for (var v = C; h > v;)if (l.test(d[v])) {
                                v > C && w.splice(S, 0, new t(1, C, v));
                                var L = v;
                                for (++v; h > v && l.test(d[v]); ++v);
                                w.splice(S, 0, new t(2, L, v)), C = v
                            } else++v;
                            h > C && w.splice(S, 0, new t(1, C, h))
                        }
                        return 1 == w[0].level && (x = n.match(/^\s+/)) && (w[0].from = x[0].length, w.unshift(new t(0, 0, x[0].length))), 1 == Er(w).level && (x = n.match(/\s+$/)) && (Er(w).to -= x[0].length, w.push(new t(0, u - x[0].length, u))), 2 == w[0].level && w.unshift(new t(1, w[0].to, w[0].to)), w[0].level != Er(w).level && w.push(new t(w[0].level, u, u)), w
                    }
                }();
                return e.version = "5.15.2", e
            })
        }, {}],
        11: [function (t, n, i) {
            !function (r) {
                "object" == typeof i && "object" == typeof n ? r(t("../../lib/codemirror"), t("../markdown/markdown"), t("../../addon/mode/overlay")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror", "../markdown/markdown", "../../addon/mode/overlay"], r) : r(CodeMirror)
            }(function (e) {
                "use strict";
                var t = /^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i;
                e.defineMode("gfm", function (n, i) {
                    function r(e) {
                        return e.code = !1, null
                    }

                    var o = 0, a = {
                        startState: function () {
                            return {code: !1, codeBlock: !1, ateSpace: !1}
                        }, copyState: function (e) {
                            return {code: e.code, codeBlock: e.codeBlock, ateSpace: e.ateSpace}
                        }, token: function (e, n) {
                            if (n.combineTokens = null, n.codeBlock)return e.match(/^```+/) ? (n.codeBlock = !1, null) : (e.skipToEnd(), null);
                            if (e.sol() && (n.code = !1), e.sol() && e.match(/^```+/))return e.skipToEnd(), n.codeBlock = !0, null;
                            if ("`" === e.peek()) {
                                e.next();
                                var r = e.pos;
                                e.eatWhile("`");
                                var a = 1 + e.pos - r;
                                return n.code ? a === o && (n.code = !1) : (o = a, n.code = !0), null
                            }
                            if (n.code)return e.next(), null;
                            if (e.eatSpace())return n.ateSpace = !0, null;
                            if ((e.sol() || n.ateSpace) && (n.ateSpace = !1, i.gitHubSpice !== !1)) {
                                if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?:[a-f0-9]{7,40}\b)/))return n.combineTokens = !0, "link";
                                if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/))return n.combineTokens = !0, "link"
                            }
                            return e.match(t) && "](" != e.string.slice(e.start - 2, e.start) && (0 == e.start || /\W/.test(e.string.charAt(e.start - 1))) ? (n.combineTokens = !0, "link") : (e.next(), null)
                        }, blankLine: r
                    }, s = {underscoresBreakWords: !1, taskLists: !0, fencedCodeBlocks: "```", strikethrough: !0};
                    for (var l in i)s[l] = i[l];
                    return s.name = "markdown", e.overlayMode(e.getMode(n, s), a)
                }, "markdown"), e.defineMIME("text/x-gfm", "gfm")
            })
        }, {"../../addon/mode/overlay": 8, "../../lib/codemirror": 10, "../markdown/markdown": 12}],
        12: [function (t, n, i) {
            !function (r) {
                "object" == typeof i && "object" == typeof n ? r(t("../../lib/codemirror"), t("../xml/xml"), t("../meta")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror", "../xml/xml", "../meta"], r) : r(CodeMirror)
            }(function (e) {
                "use strict";
                e.defineMode("markdown", function (t, n) {
                    function i(n) {
                        if (e.findModeByName) {
                            var i = e.findModeByName(n);
                            i && (n = i.mime || i.mimes[0])
                        }
                        var r = e.getMode(t, n);
                        return "null" == r.name ? null : r
                    }

                    function r(e, t, n) {
                        return t.f = t.inline = n, n(e, t)
                    }

                    function o(e, t, n) {
                        return t.f = t.block = n, n(e, t)
                    }

                    function a(e) {
                        return !e || !/\S/.test(e.string)
                    }

                    function s(e) {
                        return e.linkTitle = !1, e.em = !1, e.strong = !1, e.strikethrough = !1, e.quote = 0, e.indentedCode = !1, k && e.f == c && (e.f = p, e.block = l), e.trailingSpace = 0, e.trailingSpaceNewLine = !1, e.prevLine = e.thisLine, e.thisLine = null, null
                    }

                    function l(t, o) {
                        var s = t.sol(), l = o.list !== !1, c = o.indentedCode;
                        o.indentedCode = !1, l && (o.indentationDiff >= 0 ? (o.indentationDiff < 4 && (o.indentation -= o.indentationDiff), o.list = null) : o.indentation > 0 ? o.list = null : o.list = !1);
                        var d = null;
                        if (o.indentationDiff >= 4)return t.skipToEnd(), c || a(o.prevLine) ? (o.indentation -= 4, o.indentedCode = !0, C.code) : null;
                        if (t.eatSpace())return null;
                        if ((d = t.match(N)) && d[1].length <= 6)return o.header = d[1].length, n.highlightFormatting && (o.formatting = "header"), o.f = o.inline, h(o);
                        if (!(a(o.prevLine) || o.quote || l || c) && (d = t.match(A)))return o.header = "=" == d[0].charAt(0) ? 1 : 2, n.highlightFormatting && (o.formatting = "header"), o.f = o.inline, h(o);
                        if (t.eat(">"))return o.quote = s ? 1 : o.quote + 1, n.highlightFormatting && (o.formatting = "quote"), t.eatSpace(), h(o);
                        if ("[" === t.peek())return r(t, o, y);
                        if (t.match(L, !0))return o.hr = !0, C.hr;
                        if ((a(o.prevLine) || l) && (t.match(T, !1) || t.match(M, !1))) {
                            var f = null;
                            for (t.match(T, !0) ? f = "ul" : (t.match(M, !0), f = "ol"), o.indentation = t.column() + t.current().length, o.list = !0; o.listStack && t.column() < o.listStack[o.listStack.length - 1];)o.listStack.pop();
                            return o.listStack.push(o.indentation), n.taskLists && t.match(_, !1) && (o.taskList = !0), o.f = o.inline, n.highlightFormatting && (o.formatting = ["list", "list-" + f]), h(o)
                        }
                        return n.fencedCodeBlocks && (d = t.match(E, !0)) ? (o.fencedChars = d[1], o.localMode = i(d[2]), o.localMode && (o.localState = e.startState(o.localMode)), o.f = o.block = u, n.highlightFormatting && (o.formatting = "code-block"), o.code = -1, h(o)) : r(t, o, o.inline)
                    }

                    function c(t, n) {
                        var i = w.token(t, n.htmlState);
                        if (!k) {
                            var r = e.innerMode(w, n.htmlState);
                            ("xml" == r.mode.name && null === r.state.tagStart && !r.state.context && r.state.tokenize.isInText || n.md_inside && t.current().indexOf(">") > -1) && (n.f = p, n.block = l, n.htmlState = null)
                        }
                        return i
                    }

                    function u(e, t) {
                        return t.fencedChars && e.match(t.fencedChars, !1) ? (t.localMode = t.localState = null, t.f = t.block = d, null) : t.localMode ? t.localMode.token(e, t.localState) : (e.skipToEnd(), C.code)
                    }

                    function d(e, t) {
                        e.match(t.fencedChars), t.block = l, t.f = p, t.fencedChars = null, n.highlightFormatting && (t.formatting = "code-block"), t.code = 1;
                        var i = h(t);
                        return t.code = 0, i
                    }

                    function h(e) {
                        var t = [];
                        if (e.formatting) {
                            t.push(C.formatting), "string" == typeof e.formatting && (e.formatting = [e.formatting]);
                            for (var i = 0; i < e.formatting.length; i++)t.push(C.formatting + "-" + e.formatting[i]), "header" === e.formatting[i] && t.push(C.formatting + "-" + e.formatting[i] + "-" + e.header), "quote" === e.formatting[i] && (!n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(C.formatting + "-" + e.formatting[i] + "-" + e.quote) : t.push("error"))
                        }
                        if (e.taskOpen)return t.push("meta"), t.length ? t.join(" ") : null;
                        if (e.taskClosed)return t.push("property"), t.length ? t.join(" ") : null;
                        if (e.linkHref ? t.push(C.linkHref, "url") : (e.strong && t.push(C.strong), e.em && t.push(C.em), e.strikethrough && t.push(C.strikethrough), e.linkText && t.push(C.linkText), e.code && t.push(C.code)), e.header && t.push(C.header, C.header + "-" + e.header), e.quote && (t.push(C.quote), !n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(C.quote + "-" + e.quote) : t.push(C.quote + "-" + n.maxBlockquoteDepth)), e.list !== !1) {
                            var r = (e.listStack.length - 1) % 3;
                            r ? 1 === r ? t.push(C.list2) : t.push(C.list3) : t.push(C.list1)
                        }
                        return e.trailingSpaceNewLine ? t.push("trailing-space-new-line") : e.trailingSpace && t.push("trailing-space-" + (e.trailingSpace % 2 ? "a" : "b")), t.length ? t.join(" ") : null
                    }

                    function f(e, t) {
                        return e.match(D, !0) ? h(t) : void 0
                    }

                    function p(t, i) {
                        var r = i.text(t, i);
                        if ("undefined" != typeof r)return r;
                        if (i.list)return i.list = null, h(i);
                        if (i.taskList) {
                            var a = "x" !== t.match(_, !0)[1];
                            return a ? i.taskOpen = !0 : i.taskClosed = !0, n.highlightFormatting && (i.formatting = "task"), i.taskList = !1, h(i)
                        }
                        if (i.taskOpen = !1, i.taskClosed = !1, i.header && t.match(/^#+$/, !0))return n.highlightFormatting && (i.formatting = "header"), h(i);
                        var s = t.sol(), l = t.next();
                        if (i.linkTitle) {
                            i.linkTitle = !1;
                            var u = l;
                            "(" === l && (u = ")"), u = (u + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
                            var d = "^\\s*(?:[^" + u + "\\\\]+|\\\\\\\\|\\\\.)" + u;
                            if (t.match(new RegExp(d), !0))return C.linkHref
                        }
                        if ("`" === l) {
                            var f = i.formatting;
                            n.highlightFormatting && (i.formatting = "code"), t.eatWhile("`");
                            var p = t.current().length;
                            if (0 == i.code)return i.code = p, h(i);
                            if (p == i.code) {
                                var v = h(i);
                                return i.code = 0, v
                            }
                            return i.formatting = f, h(i)
                        }
                        if (i.code)return h(i);
                        if ("\\" === l && (t.next(), n.highlightFormatting)) {
                            var y = h(i), b = C.formatting + "-escape";
                            return y ? y + " " + b : b
                        }
                        if ("!" === l && t.match(/\[[^\]]*\] ?(?:\(|\[)/, !1))return t.match(/\[[^\]]*\]/), i.inline = i.f = g, C.image;
                        if ("[" === l && t.match(/[^\]]*\](\(.*\)| ?\[.*?\])/, !1))return i.linkText = !0, n.highlightFormatting && (i.formatting = "link"), h(i);
                        if ("]" === l && i.linkText && t.match(/\(.*?\)| ?\[.*?\]/, !1)) {
                            n.highlightFormatting && (i.formatting = "link");
                            var y = h(i);
                            return i.linkText = !1, i.inline = i.f = g, y
                        }
                        if ("<" === l && t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) {
                            i.f = i.inline = m, n.highlightFormatting && (i.formatting = "link");
                            var y = h(i);
                            return y ? y += " " : y = "", y + C.linkInline
                        }
                        if ("<" === l && t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) {
                            i.f = i.inline = m, n.highlightFormatting && (i.formatting = "link");
                            var y = h(i);
                            return y ? y += " " : y = "", y + C.linkEmail
                        }
                        if ("<" === l && t.match(/^(!--|\w)/, !1)) {
                            var x = t.string.indexOf(">", t.pos);
                            if (-1 != x) {
                                var k = t.string.substring(t.start, x);
                                /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(k) && (i.md_inside = !0)
                            }
                            return t.backUp(1), i.htmlState = e.startState(w), o(t, i, c)
                        }
                        if ("<" === l && t.match(/^\/\w*?>/))return i.md_inside = !1, "tag";
                        var S = !1;
                        if (!n.underscoresBreakWords && "_" === l && "_" !== t.peek() && t.match(/(\w)/, !1)) {
                            var L = t.pos - 2;
                            if (L >= 0) {
                                var T = t.string.charAt(L);
                                "_" !== T && T.match(/(\w)/, !1) && (S = !0)
                            }
                        }
                        if ("*" === l || "_" === l && !S)if (s && " " === t.peek()); else {
                            if (i.strong === l && t.eat(l)) {
                                n.highlightFormatting && (i.formatting = "strong");
                                var v = h(i);
                                return i.strong = !1, v
                            }
                            if (!i.strong && t.eat(l))return i.strong = l, n.highlightFormatting && (i.formatting = "strong"), h(i);
                            if (i.em === l) {
                                n.highlightFormatting && (i.formatting = "em");
                                var v = h(i);
                                return i.em = !1, v
                            }
                            if (!i.em)return i.em = l, n.highlightFormatting && (i.formatting = "em"), h(i)
                        } else if (" " === l && (t.eat("*") || t.eat("_"))) {
                            if (" " === t.peek())return h(i);
                            t.backUp(1)
                        }
                        if (n.strikethrough)if ("~" === l && t.eatWhile(l)) {
                            if (i.strikethrough) {
                                n.highlightFormatting && (i.formatting = "strikethrough");
                                var v = h(i);
                                return i.strikethrough = !1, v
                            }
                            if (t.match(/^[^\s]/, !1))return i.strikethrough = !0, n.highlightFormatting && (i.formatting = "strikethrough"), h(i)
                        } else if (" " === l && t.match(/^~~/, !0)) {
                            if (" " === t.peek())return h(i);
                            t.backUp(2)
                        }
                        return " " === l && (t.match(/ +$/, !1) ? i.trailingSpace++ : i.trailingSpace && (i.trailingSpaceNewLine = !0)), h(i)
                    }

                    function m(e, t) {
                        var i = e.next();
                        if (">" === i) {
                            t.f = t.inline = p, n.highlightFormatting && (t.formatting = "link");
                            var r = h(t);
                            return r ? r += " " : r = "", r + C.linkInline
                        }
                        return e.match(/^[^>]+/, !0), C.linkInline
                    }

                    function g(e, t) {
                        if (e.eatSpace())return null;
                        var i = e.next();
                        return "(" === i || "[" === i ? (t.f = t.inline = v("(" === i ? ")" : "]", 0), n.highlightFormatting && (t.formatting = "link-string"), t.linkHref = !0, h(t)) : "error"
                    }

                    function v(e) {
                        return function (t, i) {
                            var r = t.next();
                            if (r === e) {
                                i.f = i.inline = p, n.highlightFormatting && (i.formatting = "link-string");
                                var o = h(i);
                                return i.linkHref = !1, o
                            }
                            return t.match(O[e]), i.linkHref = !0, h(i)
                        }
                    }

                    function y(e, t) {
                        return e.match(/^([^\]\\]|\\.)*\]:/, !1) ? (t.f = b, e.next(), n.highlightFormatting && (t.formatting = "link"), t.linkText = !0, h(t)) : r(e, t, p)
                    }

                    function b(e, t) {
                        if (e.match(/^\]:/, !0)) {
                            t.f = t.inline = x, n.highlightFormatting && (t.formatting = "link");
                            var i = h(t);
                            return t.linkText = !1, i
                        }
                        return e.match(/^([^\]\\]|\\.)+/, !0), C.linkText
                    }

                    function x(e, t) {
                        return e.eatSpace() ? null : (e.match(/^[^\s]+/, !0), void 0 === e.peek() ? t.linkTitle = !0 : e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), t.f = t.inline = p, C.linkHref + " url")
                    }

                    var w = e.getMode(t, "text/html"), k = "null" == w.name;
                    void 0 === n.highlightFormatting && (n.highlightFormatting = !1), void 0 === n.maxBlockquoteDepth && (n.maxBlockquoteDepth = 0), void 0 === n.underscoresBreakWords && (n.underscoresBreakWords = !0), void 0 === n.taskLists && (n.taskLists = !1), void 0 === n.strikethrough && (n.strikethrough = !1), void 0 === n.tokenTypeOverrides && (n.tokenTypeOverrides = {});
                    var C = {
                        header: "header",
                        code: "comment",
                        quote: "quote",
                        list1: "variable-2",
                        list2: "variable-3",
                        list3: "keyword",
                        hr: "hr",
                        image: "tag",
                        formatting: "formatting",
                        linkInline: "link",
                        linkEmail: "link",
                        linkText: "link",
                        linkHref: "string",
                        em: "em",
                        strong: "strong",
                        strikethrough: "strikethrough"
                    };
                    for (var S in C)C.hasOwnProperty(S) && n.tokenTypeOverrides[S] && (C[S] = n.tokenTypeOverrides[S]);
                    var L = /^([*\-_])(?:\s*\1){2,}\s*$/, T = /^[*\-+]\s+/, M = /^[0-9]+([.)])\s+/, _ = /^\[(x| )\](?=\s)/, N = n.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/, A = /^ *(?:\={1,}|-{1,})\s*$/, D = /^[^#!\[\]*_\\<>` "'(~]+/, E = new RegExp("^(" + (n.fencedCodeBlocks === !0 ? "~~~+|```+" : n.fencedCodeBlocks) + ")[ \\t]*([\\w+#-]*)"), O = {
                        ")": /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,
                        "]": /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\\]]|\\.)*\])*?(?=\])/
                    }, I = {
                        startState: function () {
                            return {
                                f: l,
                                prevLine: null,
                                thisLine: null,
                                block: l,
                                htmlState: null,
                                indentation: 0,
                                inline: p,
                                text: f,
                                formatting: !1,
                                linkText: !1,
                                linkHref: !1,
                                linkTitle: !1,
                                code: 0,
                                em: !1,
                                strong: !1,
                                header: 0,
                                hr: !1,
                                taskList: !1,
                                list: !1,
                                listStack: [],
                                quote: 0,
                                trailingSpace: 0,
                                trailingSpaceNewLine: !1,
                                strikethrough: !1,
                                fencedChars: null
                            }
                        }, copyState: function (t) {
                            return {
                                f: t.f,
                                prevLine: t.prevLine,
                                thisLine: t.thisLine,
                                block: t.block,
                                htmlState: t.htmlState && e.copyState(w, t.htmlState),
                                indentation: t.indentation,
                                localMode: t.localMode,
                                localState: t.localMode ? e.copyState(t.localMode, t.localState) : null,
                                inline: t.inline,
                                text: t.text,
                                formatting: !1,
                                linkTitle: t.linkTitle,
                                code: t.code,
                                em: t.em,
                                strong: t.strong,
                                strikethrough: t.strikethrough,
                                header: t.header,
                                hr: t.hr,
                                taskList: t.taskList,
                                list: t.list,
                                listStack: t.listStack.slice(0),
                                quote: t.quote,
                                indentedCode: t.indentedCode,
                                trailingSpace: t.trailingSpace,
                                trailingSpaceNewLine: t.trailingSpaceNewLine,
                                md_inside: t.md_inside,
                                fencedChars: t.fencedChars
                            }
                        }, token: function (e, t) {
                            if (t.formatting = !1, e != t.thisLine) {
                                var n = t.header || t.hr;
                                if (t.header = 0, t.hr = !1, e.match(/^\s*$/, !0) || n) {
                                    if (s(t), !n)return null;
                                    t.prevLine = null
                                }
                                t.prevLine = t.thisLine, t.thisLine = e, t.taskList = !1, t.trailingSpace = 0, t.trailingSpaceNewLine = !1, t.f = t.block;
                                var i = e.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length;
                                if (t.indentationDiff = Math.min(i - t.indentation, 4), t.indentation = t.indentation + t.indentationDiff, i > 0)return null
                            }
                            return t.f(e, t)
                        }, innerMode: function (e) {
                            return e.block == c ? {state: e.htmlState, mode: w} : e.localState ? {
                                state: e.localState,
                                mode: e.localMode
                            } : {state: e, mode: I}
                        }, blankLine: s, getType: h, fold: "markdown"
                    };
                    return I
                }, "xml"), e.defineMIME("text/x-markdown", "markdown")
            })
        }, {"../../lib/codemirror": 10, "../meta": 13, "../xml/xml": 14}],
        13: [function (t, n, i) {
            !function (r) {
                "object" == typeof i && "object" == typeof n ? r(t("../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../lib/codemirror"], r) : r(CodeMirror)
            }(function (e) {
                "use strict";
                e.modeInfo = [{name: "APL", mime: "text/apl", mode: "apl", ext: ["dyalog", "apl"]}, {
                    name: "PGP",
                    mimes: ["application/pgp", "application/pgp-keys", "application/pgp-signature"],
                    mode: "asciiarmor",
                    ext: ["pgp"]
                }, {name: "ASN.1", mime: "text/x-ttcn-asn", mode: "asn.1", ext: ["asn", "asn1"]}, {
                    name: "Asterisk",
                    mime: "text/x-asterisk",
                    mode: "asterisk",
                    file: /^extensions\.conf$/i
                }, {name: "Brainfuck", mime: "text/x-brainfuck", mode: "brainfuck", ext: ["b", "bf"]}, {
                    name: "C",
                    mime: "text/x-csrc",
                    mode: "clike",
                    ext: ["c", "h"]
                }, {
                    name: "C++",
                    mime: "text/x-c++src",
                    mode: "clike",
                    ext: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"],
                    alias: ["cpp"]
                }, {name: "Cobol", mime: "text/x-cobol", mode: "cobol", ext: ["cob", "cpy"]}, {
                    name: "C#",
                    mime: "text/x-csharp",
                    mode: "clike",
                    ext: ["cs"],
                    alias: ["csharp"]
                }, {
                    name: "Clojure",
                    mime: "text/x-clojure",
                    mode: "clojure",
                    ext: ["clj", "cljc", "cljx"]
                }, {
                    name: "ClojureScript",
                    mime: "text/x-clojurescript",
                    mode: "clojure",
                    ext: ["cljs"]
                }, {name: "Closure Stylesheets (GSS)", mime: "text/x-gss", mode: "css", ext: ["gss"]}, {
                    name: "CMake",
                    mime: "text/x-cmake",
                    mode: "cmake",
                    ext: ["cmake", "cmake.in"],
                    file: /^CMakeLists.txt$/
                }, {
                    name: "CoffeeScript",
                    mime: "text/x-coffeescript",
                    mode: "coffeescript",
                    ext: ["coffee"],
                    alias: ["coffee", "coffee-script"]
                }, {
                    name: "Common Lisp",
                    mime: "text/x-common-lisp",
                    mode: "commonlisp",
                    ext: ["cl", "lisp", "el"],
                    alias: ["lisp"]
                }, {
                    name: "Cypher",
                    mime: "application/x-cypher-query",
                    mode: "cypher",
                    ext: ["cyp", "cypher"]
                }, {
                    name: "Cython",
                    mime: "text/x-cython",
                    mode: "python",
                    ext: ["pyx", "pxd", "pxi"]
                }, {name: "Crystal", mime: "text/x-crystal", mode: "crystal", ext: ["cr"]}, {
                    name: "CSS",
                    mime: "text/css",
                    mode: "css",
                    ext: ["css"]
                }, {name: "CQL", mime: "text/x-cassandra", mode: "sql", ext: ["cql"]}, {
                    name: "D",
                    mime: "text/x-d",
                    mode: "d",
                    ext: ["d"]
                }, {
                    name: "Dart",
                    mimes: ["application/dart", "text/x-dart"],
                    mode: "dart",
                    ext: ["dart"]
                }, {name: "diff", mime: "text/x-diff", mode: "diff", ext: ["diff", "patch"]}, {
                    name: "Django",
                    mime: "text/x-django",
                    mode: "django"
                }, {
                    name: "Dockerfile",
                    mime: "text/x-dockerfile",
                    mode: "dockerfile",
                    file: /^Dockerfile$/
                }, {name: "DTD", mime: "application/xml-dtd", mode: "dtd", ext: ["dtd"]}, {
                    name: "Dylan",
                    mime: "text/x-dylan",
                    mode: "dylan",
                    ext: ["dylan", "dyl", "intr"]
                }, {name: "EBNF", mime: "text/x-ebnf", mode: "ebnf"}, {
                    name: "ECL",
                    mime: "text/x-ecl",
                    mode: "ecl",
                    ext: ["ecl"]
                }, {name: "edn", mime: "application/edn", mode: "clojure", ext: ["edn"]}, {
                    name: "Eiffel",
                    mime: "text/x-eiffel",
                    mode: "eiffel",
                    ext: ["e"]
                }, {name: "Elm", mime: "text/x-elm", mode: "elm", ext: ["elm"]}, {
                    name: "Embedded Javascript",
                    mime: "application/x-ejs",
                    mode: "htmlembedded",
                    ext: ["ejs"]
                }, {
                    name: "Embedded Ruby",
                    mime: "application/x-erb",
                    mode: "htmlembedded",
                    ext: ["erb"]
                }, {name: "Erlang", mime: "text/x-erlang", mode: "erlang", ext: ["erl"]}, {
                    name: "Factor",
                    mime: "text/x-factor",
                    mode: "factor",
                    ext: ["factor"]
                }, {name: "FCL", mime: "text/x-fcl", mode: "fcl"}, {
                    name: "Forth",
                    mime: "text/x-forth",
                    mode: "forth",
                    ext: ["forth", "fth", "4th"]
                }, {
                    name: "Fortran",
                    mime: "text/x-fortran",
                    mode: "fortran",
                    ext: ["f", "for", "f77", "f90"]
                }, {name: "F#", mime: "text/x-fsharp", mode: "mllike", ext: ["fs"], alias: ["fsharp"]}, {
                    name: "Gas",
                    mime: "text/x-gas",
                    mode: "gas",
                    ext: ["s"]
                }, {
                    name: "Gherkin",
                    mime: "text/x-feature",
                    mode: "gherkin",
                    ext: ["feature"]
                }, {
                    name: "GitHub Flavored Markdown",
                    mime: "text/x-gfm",
                    mode: "gfm",
                    file: /^(readme|contributing|history).md$/i
                }, {name: "Go", mime: "text/x-go", mode: "go", ext: ["go"]}, {
                    name: "Groovy",
                    mime: "text/x-groovy",
                    mode: "groovy",
                    ext: ["groovy", "gradle"]
                }, {name: "HAML", mime: "text/x-haml", mode: "haml", ext: ["haml"]}, {
                    name: "Haskell",
                    mime: "text/x-haskell",
                    mode: "haskell",
                    ext: ["hs"]
                }, {
                    name: "Haskell (Literate)",
                    mime: "text/x-literate-haskell",
                    mode: "haskell-literate",
                    ext: ["lhs"]
                }, {name: "Haxe", mime: "text/x-haxe", mode: "haxe", ext: ["hx"]}, {
                    name: "HXML",
                    mime: "text/x-hxml",
                    mode: "haxe",
                    ext: ["hxml"]
                }, {
                    name: "ASP.NET",
                    mime: "application/x-aspx",
                    mode: "htmlembedded",
                    ext: ["aspx"],
                    alias: ["asp", "aspx"]
                }, {
                    name: "HTML",
                    mime: "text/html",
                    mode: "htmlmixed",
                    ext: ["html", "htm"],
                    alias: ["xhtml"]
                }, {name: "HTTP", mime: "message/http", mode: "http"}, {
                    name: "IDL",
                    mime: "text/x-idl",
                    mode: "idl",
                    ext: ["pro"]
                }, {name: "Jade", mime: "text/x-jade", mode: "jade", ext: ["jade"]}, {
                    name: "Java",
                    mime: "text/x-java",
                    mode: "clike",
                    ext: ["java"]
                }, {
                    name: "Java Server Pages",
                    mime: "application/x-jsp",
                    mode: "htmlembedded",
                    ext: ["jsp"],
                    alias: ["jsp"]
                }, {
                    name: "JavaScript",
                    mimes: ["text/javascript", "text/ecmascript", "application/javascript", "application/x-javascript", "application/ecmascript"],
                    mode: "javascript",
                    ext: ["js"],
                    alias: ["ecmascript", "js", "node"]
                }, {
                    name: "JSON",
                    mimes: ["application/json", "application/x-json"],
                    mode: "javascript",
                    ext: ["json", "map"],
                    alias: ["json5"]
                }, {
                    name: "JSON-LD",
                    mime: "application/ld+json",
                    mode: "javascript",
                    ext: ["jsonld"],
                    alias: ["jsonld"]
                }, {name: "JSX", mime: "text/jsx", mode: "jsx", ext: ["jsx"]}, {
                    name: "Jinja2",
                    mime: "null",
                    mode: "jinja2"
                }, {name: "Julia", mime: "text/x-julia", mode: "julia", ext: ["jl"]}, {
                    name: "Kotlin",
                    mime: "text/x-kotlin",
                    mode: "clike",
                    ext: ["kt"]
                }, {name: "LESS", mime: "text/x-less", mode: "css", ext: ["less"]}, {
                    name: "LiveScript",
                    mime: "text/x-livescript",
                    mode: "livescript",
                    ext: ["ls"],
                    alias: ["ls"]
                }, {name: "Lua", mime: "text/x-lua", mode: "lua", ext: ["lua"]}, {
                    name: "Markdown",
                    mime: "text/x-markdown",
                    mode: "markdown",
                    ext: ["markdown", "md", "mkd"]
                }, {name: "mIRC", mime: "text/mirc", mode: "mirc"}, {
                    name: "MariaDB SQL",
                    mime: "text/x-mariadb",
                    mode: "sql"
                }, {
                    name: "Mathematica",
                    mime: "text/x-mathematica",
                    mode: "mathematica",
                    ext: ["m", "nb"]
                }, {name: "Modelica", mime: "text/x-modelica", mode: "modelica", ext: ["mo"]}, {
                    name: "MUMPS",
                    mime: "text/x-mumps",
                    mode: "mumps",
                    ext: ["mps"]
                }, {name: "MS SQL", mime: "text/x-mssql", mode: "sql"}, {
                    name: "mbox",
                    mime: "application/mbox",
                    mode: "mbox",
                    ext: ["mbox"]
                }, {name: "MySQL", mime: "text/x-mysql", mode: "sql"}, {
                    name: "Nginx",
                    mime: "text/x-nginx-conf",
                    mode: "nginx",
                    file: /nginx.*\.conf$/i
                }, {name: "NSIS", mime: "text/x-nsis", mode: "nsis", ext: ["nsh", "nsi"]}, {
                    name: "NTriples",
                    mime: "text/n-triples",
                    mode: "ntriples",
                    ext: ["nt"]
                }, {
                    name: "Objective C",
                    mime: "text/x-objectivec",
                    mode: "clike",
                    ext: ["m", "mm"],
                    alias: ["objective-c", "objc"]
                }, {
                    name: "OCaml",
                    mime: "text/x-ocaml",
                    mode: "mllike",
                    ext: ["ml", "mli", "mll", "mly"]
                }, {name: "Octave", mime: "text/x-octave", mode: "octave", ext: ["m"]}, {
                    name: "Oz",
                    mime: "text/x-oz",
                    mode: "oz",
                    ext: ["oz"]
                }, {name: "Pascal", mime: "text/x-pascal", mode: "pascal", ext: ["p", "pas"]}, {
                    name: "PEG.js",
                    mime: "null",
                    mode: "pegjs",
                    ext: ["jsonld"]
                }, {name: "Perl", mime: "text/x-perl", mode: "perl", ext: ["pl", "pm"]}, {
                    name: "PHP",
                    mime: "application/x-httpd-php",
                    mode: "php",
                    ext: ["php", "php3", "php4", "php5", "phtml"]
                }, {name: "Pig", mime: "text/x-pig", mode: "pig", ext: ["pig"]}, {
                    name: "Plain Text",
                    mime: "text/plain",
                    mode: "null",
                    ext: ["txt", "text", "conf", "def", "list", "log"]
                }, {name: "PLSQL", mime: "text/x-plsql", mode: "sql", ext: ["pls"]}, {
                    name: "PowerShell",
                    mime: "application/x-powershell",
                    mode: "powershell",
                    ext: ["ps1", "psd1", "psm1"]
                }, {
                    name: "Properties files",
                    mime: "text/x-properties",
                    mode: "properties",
                    ext: ["properties", "ini", "in"],
                    alias: ["ini", "properties"]
                }, {name: "ProtoBuf", mime: "text/x-protobuf", mode: "protobuf", ext: ["proto"]}, {
                    name: "Python",
                    mime: "text/x-python",
                    mode: "python",
                    ext: ["BUILD", "bzl", "py", "pyw"],
                    file: /^(BUCK|BUILD)$/
                }, {name: "Puppet", mime: "text/x-puppet", mode: "puppet", ext: ["pp"]}, {
                    name: "Q",
                    mime: "text/x-q",
                    mode: "q",
                    ext: ["q"]
                }, {
                    name: "R",
                    mime: "text/x-rsrc",
                    mode: "r",
                    ext: ["r"],
                    alias: ["rscript"]
                }, {
                    name: "reStructuredText",
                    mime: "text/x-rst",
                    mode: "rst",
                    ext: ["rst"],
                    alias: ["rst"]
                }, {name: "RPM Changes", mime: "text/x-rpm-changes", mode: "rpm"}, {
                    name: "RPM Spec",
                    mime: "text/x-rpm-spec",
                    mode: "rpm",
                    ext: ["spec"]
                }, {
                    name: "Ruby",
                    mime: "text/x-ruby",
                    mode: "ruby",
                    ext: ["rb"],
                    alias: ["jruby", "macruby", "rake", "rb", "rbx"]
                }, {name: "Rust", mime: "text/x-rustsrc", mode: "rust", ext: ["rs"]}, {
                    name: "SAS",
                    mime: "text/x-sas",
                    mode: "sas",
                    ext: ["sas"]
                }, {name: "Sass", mime: "text/x-sass", mode: "sass", ext: ["sass"]}, {
                    name: "Scala",
                    mime: "text/x-scala",
                    mode: "clike",
                    ext: ["scala"]
                }, {name: "Scheme", mime: "text/x-scheme", mode: "scheme", ext: ["scm", "ss"]}, {
                    name: "SCSS",
                    mime: "text/x-scss",
                    mode: "css",
                    ext: ["scss"]
                }, {
                    name: "Shell",
                    mime: "text/x-sh",
                    mode: "shell",
                    ext: ["sh", "ksh", "bash"],
                    alias: ["bash", "sh", "zsh"],
                    file: /^PKGBUILD$/
                }, {name: "Sieve", mime: "application/sieve", mode: "sieve", ext: ["siv", "sieve"]}, {
                    name: "Slim",
                    mimes: ["text/x-slim", "application/x-slim"],
                    mode: "slim",
                    ext: ["slim"]
                }, {name: "Smalltalk", mime: "text/x-stsrc", mode: "smalltalk", ext: ["st"]}, {
                    name: "Smarty",
                    mime: "text/x-smarty",
                    mode: "smarty",
                    ext: ["tpl"]
                }, {name: "Solr", mime: "text/x-solr", mode: "solr"}, {
                    name: "Soy",
                    mime: "text/x-soy",
                    mode: "soy",
                    ext: ["soy"],
                    alias: ["closure template"]
                }, {
                    name: "SPARQL",
                    mime: "application/sparql-query",
                    mode: "sparql",
                    ext: ["rq", "sparql"],
                    alias: ["sparul"]
                }, {
                    name: "Spreadsheet",
                    mime: "text/x-spreadsheet",
                    mode: "spreadsheet",
                    alias: ["excel", "formula"]
                }, {name: "SQL", mime: "text/x-sql", mode: "sql", ext: ["sql"]}, {
                    name: "Squirrel",
                    mime: "text/x-squirrel",
                    mode: "clike",
                    ext: ["nut"]
                }, {name: "Swift", mime: "text/x-swift", mode: "swift", ext: ["swift"]}, {
                    name: "sTeX",
                    mime: "text/x-stex",
                    mode: "stex"
                }, {
                    name: "LaTeX",
                    mime: "text/x-latex",
                    mode: "stex",
                    ext: ["text", "ltx"],
                    alias: ["tex"]
                }, {name: "SystemVerilog", mime: "text/x-systemverilog", mode: "verilog", ext: ["v"]}, {
                    name: "Tcl",
                    mime: "text/x-tcl",
                    mode: "tcl",
                    ext: ["tcl"]
                }, {name: "Textile", mime: "text/x-textile", mode: "textile", ext: ["textile"]}, {
                    name: "TiddlyWiki ",
                    mime: "text/x-tiddlywiki",
                    mode: "tiddlywiki"
                }, {name: "Tiki wiki", mime: "text/tiki", mode: "tiki"}, {
                    name: "TOML",
                    mime: "text/x-toml",
                    mode: "toml",
                    ext: ["toml"]
                }, {name: "Tornado", mime: "text/x-tornado", mode: "tornado"}, {
                    name: "troff",
                    mime: "text/troff",
                    mode: "troff",
                    ext: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                }, {
                    name: "TTCN",
                    mime: "text/x-ttcn",
                    mode: "ttcn",
                    ext: ["ttcn", "ttcn3", "ttcnpp"]
                }, {name: "TTCN_CFG", mime: "text/x-ttcn-cfg", mode: "ttcn-cfg", ext: ["cfg"]}, {
                    name: "Turtle",
                    mime: "text/turtle",
                    mode: "turtle",
                    ext: ["ttl"]
                }, {
                    name: "TypeScript",
                    mime: "application/typescript",
                    mode: "javascript",
                    ext: ["ts"],
                    alias: ["ts"]
                }, {name: "Twig", mime: "text/x-twig", mode: "twig"}, {
                    name: "Web IDL",
                    mime: "text/x-webidl",
                    mode: "webidl",
                    ext: ["webidl"]
                }, {name: "VB.NET", mime: "text/x-vb", mode: "vb", ext: ["vb"]}, {
                    name: "VBScript",
                    mime: "text/vbscript",
                    mode: "vbscript",
                    ext: ["vbs"]
                }, {name: "Velocity", mime: "text/velocity", mode: "velocity", ext: ["vtl"]}, {
                    name: "Verilog",
                    mime: "text/x-verilog",
                    mode: "verilog",
                    ext: ["v"]
                }, {name: "VHDL", mime: "text/x-vhdl", mode: "vhdl", ext: ["vhd", "vhdl"]}, {
                    name: "XML",
                    mimes: ["application/xml", "text/xml"],
                    mode: "xml",
                    ext: ["xml", "xsl", "xsd"],
                    alias: ["rss", "wsdl", "xsd"]
                }, {name: "XQuery", mime: "application/xquery", mode: "xquery", ext: ["xy", "xquery"]}, {
                    name: "Yacas",
                    mime: "text/x-yacas",
                    mode: "yacas",
                    ext: ["ys"]
                }, {
                    name: "YAML",
                    mime: "text/x-yaml",
                    mode: "yaml",
                    ext: ["yaml", "yml"],
                    alias: ["yml"]
                }, {name: "Z80", mime: "text/x-z80", mode: "z80", ext: ["z80"]}, {
                    name: "mscgen",
                    mime: "text/x-mscgen",
                    mode: "mscgen",
                    ext: ["mscgen", "mscin", "msc"]
                }, {name: "xu", mime: "text/x-xu", mode: "mscgen", ext: ["xu"]}, {
                    name: "msgenny",
                    mime: "text/x-msgenny",
                    mode: "mscgen",
                    ext: ["msgenny"]
                }];
                for (var t = 0; t < e.modeInfo.length; t++) {
                    var n = e.modeInfo[t];
                    n.mimes && (n.mime = n.mimes[0])
                }
                e.findModeByMIME = function (t) {
                    t = t.toLowerCase();
                    for (var n = 0; n < e.modeInfo.length; n++) {
                        var i = e.modeInfo[n];
                        if (i.mime == t)return i;
                        if (i.mimes)for (var r = 0; r < i.mimes.length; r++)if (i.mimes[r] == t)return i
                    }
                }, e.findModeByExtension = function (t) {
                    for (var n = 0; n < e.modeInfo.length; n++) {
                        var i = e.modeInfo[n];
                        if (i.ext)for (var r = 0; r < i.ext.length; r++)if (i.ext[r] == t)return i
                    }
                }, e.findModeByFileName = function (t) {
                    for (var n = 0; n < e.modeInfo.length; n++) {
                        var i = e.modeInfo[n];
                        if (i.file && i.file.test(t))return i
                    }
                    var r = t.lastIndexOf("."), o = r > -1 && t.substring(r + 1, t.length);
                    return o ? e.findModeByExtension(o) : void 0
                }, e.findModeByName = function (t) {
                    t = t.toLowerCase();
                    for (var n = 0; n < e.modeInfo.length; n++) {
                        var i = e.modeInfo[n];
                        if (i.name.toLowerCase() == t)return i;
                        if (i.alias)for (var r = 0; r < i.alias.length; r++)if (i.alias[r].toLowerCase() == t)return i
                    }
                }
            })
        }, {"../lib/codemirror": 10}],
        14: [function (t, n, i) {
            !function (r) {
                "object" == typeof i && "object" == typeof n ? r(t("../../lib/codemirror")) : "function" == typeof e && e.amd ? e(["../../lib/codemirror"], r) : r(CodeMirror)
            }(function (e) {
                "use strict";
                var t = {
                    autoSelfClosers: {
                        area: !0,
                        base: !0,
                        br: !0,
                        col: !0,
                        command: !0,
                        embed: !0,
                        frame: !0,
                        hr: !0,
                        img: !0,
                        input: !0,
                        keygen: !0,
                        link: !0,
                        meta: !0,
                        param: !0,
                        source: !0,
                        track: !0,
                        wbr: !0,
                        menuitem: !0
                    },
                    implicitlyClosed: {
                        dd: !0,
                        li: !0,
                        optgroup: !0,
                        option: !0,
                        p: !0,
                        rp: !0,
                        rt: !0,
                        tbody: !0,
                        td: !0,
                        tfoot: !0,
                        th: !0,
                        tr: !0
                    },
                    contextGrabbers: {
                        dd: {dd: !0, dt: !0},
                        dt: {dd: !0, dt: !0},
                        li: {li: !0},
                        option: {option: !0, optgroup: !0},
                        optgroup: {optgroup: !0},
                        p: {
                            address: !0,
                            article: !0,
                            aside: !0,
                            blockquote: !0,
                            dir: !0,
                            div: !0,
                            dl: !0,
                            fieldset: !0,
                            footer: !0,
                            form: !0,
                            h1: !0,
                            h2: !0,
                            h3: !0,
                            h4: !0,
                            h5: !0,
                            h6: !0,
                            header: !0,
                            hgroup: !0,
                            hr: !0,
                            menu: !0,
                            nav: !0,
                            ol: !0,
                            p: !0,
                            pre: !0,
                            section: !0,
                            table: !0,
                            ul: !0
                        },
                        rp: {rp: !0, rt: !0},
                        rt: {rp: !0, rt: !0},
                        tbody: {tbody: !0, tfoot: !0},
                        td: {td: !0, th: !0},
                        tfoot: {tbody: !0},
                        th: {td: !0, th: !0},
                        thead: {tbody: !0, tfoot: !0},
                        tr: {tr: !0}
                    },
                    doNotIndent: {pre: !0},
                    allowUnquoted: !0,
                    allowMissing: !0,
                    caseFold: !0
                }, n = {
                    autoSelfClosers: {},
                    implicitlyClosed: {},
                    contextGrabbers: {},
                    doNotIndent: {},
                    allowUnquoted: !1,
                    allowMissing: !1,
                    caseFold: !1
                };
                e.defineMode("xml", function (i, r) {
                    function o(e, t) {
                        function n(n) {
                            return t.tokenize = n, n(e, t)
                        }

                        var i = e.next();
                        if ("<" == i)return e.eat("!") ? e.eat("[") ? e.match("CDATA[") ? n(l("atom", "]]>")) : null : e.match("--") ? n(l("comment", "-->")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), n(c(1))) : null : e.eat("?") ? (e.eatWhile(/[\w\._\-]/), t.tokenize = l("meta", "?>"), "meta") : (T = e.eat("/") ? "closeTag" : "openTag", t.tokenize = a, "tag bracket");
                        if ("&" == i) {
                            var r;
                            return r = e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";"), r ? "atom" : "error"
                        }
                        return e.eatWhile(/[^&<]/), null
                    }

                    function a(e, t) {
                        var n = e.next();
                        if (">" == n || "/" == n && e.eat(">"))return t.tokenize = o, T = ">" == n ? "endTag" : "selfcloseTag", "tag bracket";
                        if ("=" == n)return T = "equals", null;
                        if ("<" == n) {
                            t.tokenize = o, t.state = f, t.tagName = t.tagStart = null;
                            var i = t.tokenize(e, t);
                            return i ? i + " tag error" : "tag error"
                        }
                        return /[\'\"]/.test(n) ? (t.tokenize = s(n), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), "word")
                    }

                    function s(e) {
                        var t = function (t, n) {
                            for (; !t.eol();)if (t.next() == e) {
                                n.tokenize = a;
                                break
                            }
                            return "string"
                        };
                        return t.isInAttribute = !0, t
                    }

                    function l(e, t) {
                        return function (n, i) {
                            for (; !n.eol();) {
                                if (n.match(t)) {
                                    i.tokenize = o;
                                    break
                                }
                                n.next()
                            }
                            return e
                        }
                    }

                    function c(e) {
                        return function (t, n) {
                            for (var i; null != (i = t.next());) {
                                if ("<" == i)return n.tokenize = c(e + 1), n.tokenize(t, n);
                                if (">" == i) {
                                    if (1 == e) {
                                        n.tokenize = o;
                                        break
                                    }
                                    return n.tokenize = c(e - 1), n.tokenize(t, n)
                                }
                            }
                            return "meta"
                        }
                    }

                    function u(e, t, n) {
                        this.prev = e.context, this.tagName = t, this.indent = e.indented, this.startOfLine = n, (C.doNotIndent.hasOwnProperty(t) || e.context && e.context.noIndent) && (this.noIndent = !0)
                    }

                    function d(e) {
                        e.context && (e.context = e.context.prev)
                    }

                    function h(e, t) {
                        for (var n; ;) {
                            if (!e.context)return;
                            if (n = e.context.tagName, !C.contextGrabbers.hasOwnProperty(n) || !C.contextGrabbers[n].hasOwnProperty(t))return;
                            d(e)
                        }
                    }

                    function f(e, t, n) {
                        return "openTag" == e ? (n.tagStart = t.column(), p) : "closeTag" == e ? m : f
                    }

                    function p(e, t, n) {
                        return "word" == e ? (n.tagName = t.current(), M = "tag", y) : (M = "error", p)
                    }

                    function m(e, t, n) {
                        if ("word" == e) {
                            var i = t.current();
                            return n.context && n.context.tagName != i && C.implicitlyClosed.hasOwnProperty(n.context.tagName) && d(n), n.context && n.context.tagName == i || C.matchClosing === !1 ? (M = "tag", g) : (M = "tag error", v)
                        }
                        return M = "error", v
                    }

                    function g(e, t, n) {
                        return "endTag" != e ? (M = "error", g) : (d(n), f)
                    }

                    function v(e, t, n) {
                        return M = "error", g(e, t, n)
                    }

                    function y(e, t, n) {
                        if ("word" == e)return M = "attribute", b;
                        if ("endTag" == e || "selfcloseTag" == e) {
                            var i = n.tagName, r = n.tagStart;
                            return n.tagName = n.tagStart = null, "selfcloseTag" == e || C.autoSelfClosers.hasOwnProperty(i) ? h(n, i) : (h(n, i), n.context = new u(n, i, r == n.indented)), f
                        }
                        return M = "error", y
                    }

                    function b(e, t, n) {
                        return "equals" == e ? x : (C.allowMissing || (M = "error"), y(e, t, n))
                    }

                    function x(e, t, n) {
                        return "string" == e ? w : "word" == e && C.allowUnquoted ? (M = "string", y) : (M = "error", y(e, t, n))
                    }

                    function w(e, t, n) {
                        return "string" == e ? w : y(e, t, n)
                    }

                    var k = i.indentUnit, C = {}, S = r.htmlMode ? t : n;
                    for (var L in S)C[L] = S[L];
                    for (var L in r)C[L] = r[L];
                    var T, M;
                    return o.isInText = !0, {
                        startState: function (e) {
                            var t = {
                                tokenize: o,
                                state: f,
                                indented: e || 0,
                                tagName: null,
                                tagStart: null,
                                context: null
                            };
                            return null != e && (t.baseIndent = e), t
                        },
                        token: function (e, t) {
                            if (!t.tagName && e.sol() && (t.indented = e.indentation()), e.eatSpace())return null;
                            T = null;
                            var n = t.tokenize(e, t);
                            return (n || T) && "comment" != n && (M = null, t.state = t.state(T || n, e, t), M && (n = "error" == M ? n + " error" : M)), n
                        },
                        indent: function (t, n, i) {
                            var r = t.context;
                            if (t.tokenize.isInAttribute)return t.tagStart == t.indented ? t.stringStartCol + 1 : t.indented + k;
                            if (r && r.noIndent)return e.Pass;
                            if (t.tokenize != a && t.tokenize != o)return i ? i.match(/^(\s*)/)[0].length : 0;
                            if (t.tagName)return C.multilineTagIndentPastTag !== !1 ? t.tagStart + t.tagName.length + 2 : t.tagStart + k * (C.multilineTagIndentFactor || 1);
                            if (C.alignCDATA && /<!\[CDATA\[/.test(n))return 0;
                            var s = n && /^<(\/)?([\w_:\.-]*)/.exec(n);
                            if (s && s[1])for (; r;) {
                                if (r.tagName == s[2]) {
                                    r = r.prev;
                                    break
                                }
                                if (!C.implicitlyClosed.hasOwnProperty(r.tagName))break;
                                r = r.prev
                            } else if (s)for (; r;) {
                                var l = C.contextGrabbers[r.tagName];
                                if (!l || !l.hasOwnProperty(s[2]))break;
                                r = r.prev
                            }
                            for (; r && r.prev && !r.startOfLine;)r = r.prev;
                            return r ? r.indent + k : t.baseIndent || 0
                        },
                        electricInput: /<\/[\s\w:]+>$/,
                        blockCommentStart: "<!--",
                        blockCommentEnd: "-->",
                        configuration: C.htmlMode ? "html" : "xml",
                        helperType: C.htmlMode ? "html" : "xml",
                        skipAttribute: function (e) {
                            e.state == x && (e.state = y)
                        }
                    }
                }), e.defineMIME("text/xml", "xml"), e.defineMIME("application/xml", "xml"), e.mimeModes.hasOwnProperty("text/html") || e.defineMIME("text/html", {
                    name: "xml",
                    htmlMode: !0
                })
            })
        }, {"../../lib/codemirror": 10}],
        15: [function (e, t, n) {
            n.read = function (e, t, n, i, r) {
                var o, a, s = 8 * r - i - 1, l = (1 << s) - 1, c = l >> 1, u = -7, d = n ? r - 1 : 0, h = n ? -1 : 1, f = e[t + d];
                for (d += h, o = f & (1 << -u) - 1, f >>= -u, u += s; u > 0; o = 256 * o + e[t + d], d += h, u -= 8);
                for (a = o & (1 << -u) - 1, o >>= -u, u += i; u > 0; a = 256 * a + e[t + d], d += h, u -= 8);
                if (0 === o)o = 1 - c; else {
                    if (o === l)return a ? NaN : (f ? -1 : 1) * (1 / 0);
                    a += Math.pow(2, i), o -= c
                }
                return (f ? -1 : 1) * a * Math.pow(2, o - i)
            }, n.write = function (e, t, n, i, r, o) {
                var a, s, l, c = 8 * o - r - 1, u = (1 << c) - 1, d = u >> 1, h = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = i ? 0 : o - 1, p = i ? 1 : -1, m = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = u) : (a = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -a)) < 1 && (a--, l *= 2), t += a + d >= 1 ? h / l : h * Math.pow(2, 1 - d), t * l >= 2 && (a++, l /= 2), a + d >= u ? (s = 0, a = u) : a + d >= 1 ? (s = (t * l - 1) * Math.pow(2, r), a += d) : (s = t * Math.pow(2, d - 1) * Math.pow(2, r), a = 0)); r >= 8; e[n + f] = 255 & s, f += p, s /= 256, r -= 8);
                for (a = a << r | s, c += r; c > 0; e[n + f] = 255 & a, f += p, a /= 256, c -= 8);
                e[n + f - p] |= 128 * m
            }
        }, {}],
        16: [function (e, t, n) {
            var i = {}.toString;
            t.exports = Array.isArray || function (e) {
                    return "[object Array]" == i.call(e)
                }
        }, {}],
        17: [function (t, n, i) {
            (function (t) {
                (function () {
                    function t(e) {
                        this.tokens = [], this.tokens.links = {}, this.options = e || h.defaults, this.rules = f.normal, this.options.gfm && (this.options.tables ? this.rules = f.tables : this.rules = f.gfm)
                    }

                    function r(e, t) {
                        if (this.options = t || h.defaults, this.links = e, this.rules = p.normal, this.renderer = this.options.renderer || new o, this.renderer.options = this.options, !this.links)throw new Error("Tokens array requires a `links` property.");
                        this.options.gfm ? this.options.breaks ? this.rules = p.breaks : this.rules = p.gfm : this.options.pedantic && (this.rules = p.pedantic)
                    }

                    function o(e) {
                        this.options = e || {}
                    }

                    function a(e) {
                        this.tokens = [], this.token = null, this.options = e || h.defaults, this.options.renderer = this.options.renderer || new o, this.renderer = this.options.renderer, this.renderer.options = this.options
                    }

                    function s(e, t) {
                        return e.replace(t ? /&/g : /&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
                    }

                    function l(e) {
                        return e.replace(/&([#\w]+);/g, function (e, t) {
                            return t = t.toLowerCase(), "colon" === t ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""
                        })
                    }

                    function c(e, t) {
                        return e = e.source, t = t || "", function n(i, r) {
                            return i ? (r = r.source || r, r = r.replace(/(^|[^\[])\^/g, "$1"), e = e.replace(i, r), n) : new RegExp(e, t)
                        }
                    }

                    function u() {
                    }

                    function d(e) {
                        for (var t, n, i = 1; i < arguments.length; i++) {
                            t = arguments[i];
                            for (n in t)Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        }
                        return e
                    }

                    function h(e, n, i) {
                        if (i || "function" == typeof n) {
                            i || (i = n, n = null), n = d({}, h.defaults, n || {});
                            var r, o, l = n.highlight, c = 0;
                            try {
                                r = t.lex(e, n)
                            } catch (u) {
                                return i(u)
                            }
                            o = r.length;
                            var f = function (e) {
                                if (e)return n.highlight = l, i(e);
                                var t;
                                try {
                                    t = a.parse(r, n)
                                } catch (o) {
                                    e = o
                                }
                                return n.highlight = l, e ? i(e) : i(null, t)
                            };
                            if (!l || l.length < 3)return f();
                            if (delete n.highlight, !o)return f();
                            for (; c < r.length; c++)!function (e) {
                                return "code" !== e.type ? --o || f() : l(e.text, e.lang, function (t, n) {
                                    return t ? f(t) : null == n || n === e.text ? --o || f() : (e.text = n, e.escaped = !0, void(--o || f()))
                                })
                            }(r[c])
                        } else try {
                            return n && (n = d({}, h.defaults, n)), a.parse(t.lex(e, n), n)
                        } catch (u) {
                            if (u.message += "\nPlease report this to https://github.com/chjj/marked.", (n || h.defaults).silent)return "<p>An error occured:</p><pre>" + s(u.message + "", !0) + "</pre>";
                            throw u
                        }
                    }

                    var f = {
                        newline: /^\n+/,
                        code: /^( {4}[^\n]+\n*)+/,
                        fences: u,
                        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
                        heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
                        nptable: u,
                        lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
                        blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
                        list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
                        html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
                        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
                        table: u,
                        paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
                        text: /^[^\n]+/
                    };
                    f.bullet = /(?:[*+-]|\d+\.)/, f.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/, f.item = c(f.item, "gm")(/bull/g, f.bullet)(), f.list = c(f.list)(/bull/g, f.bullet)("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def", "\\n+(?=" + f.def.source + ")")(), f.blockquote = c(f.blockquote)("def", f.def)(), f._tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b", f.html = c(f.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, f._tag)(), f.paragraph = c(f.paragraph)("hr", f.hr)("heading", f.heading)("lheading", f.lheading)("blockquote", f.blockquote)("tag", "<" + f._tag)("def", f.def)(), f.normal = d({}, f), f.gfm = d({}, f.normal, {
                        fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
                        paragraph: /^/,
                        heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
                    }), f.gfm.paragraph = c(f.paragraph)("(?!", "(?!" + f.gfm.fences.source.replace("\\1", "\\2") + "|" + f.list.source.replace("\\1", "\\3") + "|")(), f.tables = d({}, f.gfm, {
                        nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
                        table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
                    }), t.rules = f, t.lex = function (e, n) {
                        var i = new t(n);
                        return i.lex(e)
                    }, t.prototype.lex = function (e) {
                        return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n"), this.token(e, !0)
                    }, t.prototype.token = function (e, t, n) {
                        for (var i, r, o, a, s, l, c, u, d, e = e.replace(/^ +$/gm, ""); e;)if ((o = this.rules.newline.exec(e)) && (e = e.substring(o[0].length), o[0].length > 1 && this.tokens.push({type: "space"})), o = this.rules.code.exec(e))e = e.substring(o[0].length), o = o[0].replace(/^ {4}/gm, ""), this.tokens.push({
                            type: "code",
                            text: this.options.pedantic ? o : o.replace(/\n+$/, "")
                        }); else if (o = this.rules.fences.exec(e))e = e.substring(o[0].length), this.tokens.push({
                            type: "code",
                            lang: o[2],
                            text: o[3] || ""
                        }); else if (o = this.rules.heading.exec(e))e = e.substring(o[0].length), this.tokens.push({
                            type: "heading",
                            depth: o[1].length,
                            text: o[2]
                        }); else if (t && (o = this.rules.nptable.exec(e))) {
                            for (e = e.substring(o[0].length), l = {
                                type: "table",
                                header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                                align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                                cells: o[3].replace(/\n$/, "").split("\n")
                            }, u = 0; u < l.align.length; u++)/^ *-+: *$/.test(l.align[u]) ? l.align[u] = "right" : /^ *:-+: *$/.test(l.align[u]) ? l.align[u] = "center" : /^ *:-+ *$/.test(l.align[u]) ? l.align[u] = "left" : l.align[u] = null;
                            for (u = 0; u < l.cells.length; u++)l.cells[u] = l.cells[u].split(/ *\| */);
                            this.tokens.push(l)
                        } else if (o = this.rules.lheading.exec(e))e = e.substring(o[0].length), this.tokens.push({
                            type: "heading",
                            depth: "=" === o[2] ? 1 : 2,
                            text: o[1]
                        }); else if (o = this.rules.hr.exec(e))e = e.substring(o[0].length), this.tokens.push({type: "hr"}); else if (o = this.rules.blockquote.exec(e))e = e.substring(o[0].length), this.tokens.push({type: "blockquote_start"}), o = o[0].replace(/^ *> ?/gm, ""), this.token(o, t, !0), this.tokens.push({type: "blockquote_end"}); else if (o = this.rules.list.exec(e)) {
                            for (e = e.substring(o[0].length), a = o[2], this.tokens.push({
                                type: "list_start",
                                ordered: a.length > 1
                            }), o = o[0].match(this.rules.item), i = !1, d = o.length, u = 0; d > u; u++)l = o[u], c = l.length, l = l.replace(/^ *([*+-]|\d+\.) +/, ""), ~l.indexOf("\n ") && (c -= l.length, l = this.options.pedantic ? l.replace(/^ {1,4}/gm, "") : l.replace(new RegExp("^ {1," + c + "}", "gm"), "")), this.options.smartLists && u !== d - 1 && (s = f.bullet.exec(o[u + 1])[0], a === s || a.length > 1 && s.length > 1 || (e = o.slice(u + 1).join("\n") + e, u = d - 1)), r = i || /\n\n(?!\s*$)/.test(l), u !== d - 1 && (i = "\n" === l.charAt(l.length - 1), r || (r = i)), this.tokens.push({type: r ? "loose_item_start" : "list_item_start"}), this.token(l, !1, n), this.tokens.push({type: "list_item_end"});
                            this.tokens.push({type: "list_end"})
                        } else if (o = this.rules.html.exec(e))e = e.substring(o[0].length), this.tokens.push({
                            type: this.options.sanitize ? "paragraph" : "html",
                            pre: !this.options.sanitizer && ("pre" === o[1] || "script" === o[1] || "style" === o[1]),
                            text: o[0]
                        }); else if (!n && t && (o = this.rules.def.exec(e)))e = e.substring(o[0].length), this.tokens.links[o[1].toLowerCase()] = {
                            href: o[2],
                            title: o[3]
                        }; else if (t && (o = this.rules.table.exec(e))) {
                            for (e = e.substring(o[0].length), l = {
                                type: "table",
                                header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                                align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                                cells: o[3].replace(/(?: *\| *)?\n$/, "").split("\n")
                            }, u = 0; u < l.align.length; u++)/^ *-+: *$/.test(l.align[u]) ? l.align[u] = "right" : /^ *:-+: *$/.test(l.align[u]) ? l.align[u] = "center" : /^ *:-+ *$/.test(l.align[u]) ? l.align[u] = "left" : l.align[u] = null;
                            for (u = 0; u < l.cells.length; u++)l.cells[u] = l.cells[u].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
                            this.tokens.push(l)
                        } else if (t && (o = this.rules.paragraph.exec(e)))e = e.substring(o[0].length), this.tokens.push({
                            type: "paragraph",
                            text: "\n" === o[1].charAt(o[1].length - 1) ? o[1].slice(0, -1) : o[1]
                        }); else if (o = this.rules.text.exec(e))e = e.substring(o[0].length), this.tokens.push({
                            type: "text",
                            text: o[0]
                        }); else if (e)throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
                        return this.tokens
                    };
                    var p = {
                        escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
                        autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
                        url: u,
                        tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
                        link: /^!?\[(inside)\]\(href\)/,
                        reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
                        nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
                        strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
                        em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
                        code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
                        br: /^ {2,}\n(?!\s*$)/,
                        del: u,
                        text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
                    };
                    p._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/, p._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/, p.link = c(p.link)("inside", p._inside)("href", p._href)(), p.reflink = c(p.reflink)("inside", p._inside)(), p.normal = d({}, p), p.pedantic = d({}, p.normal, {
                        strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
                        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
                    }), p.gfm = d({}, p.normal, {
                        escape: c(p.escape)("])", "~|])")(),
                        url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
                        del: /^~~(?=\S)([\s\S]*?\S)~~/,
                        text: c(p.text)("]|", "~]|")("|", "|https?://|")()
                    }), p.breaks = d({}, p.gfm, {
                        br: c(p.br)("{2,}", "*")(),
                        text: c(p.gfm.text)("{2,}", "*")()
                    }), r.rules = p, r.output = function (e, t, n) {
                        var i = new r(t, n);
                        return i.output(e)
                    }, r.prototype.output = function (e) {
                        for (var t, n, i, r, o = ""; e;)if (r = this.rules.escape.exec(e))e = e.substring(r[0].length), o += r[1]; else if (r = this.rules.autolink.exec(e))e = e.substring(r[0].length), "@" === r[2] ? (n = ":" === r[1].charAt(6) ? this.mangle(r[1].substring(7)) : this.mangle(r[1]), i = this.mangle("mailto:") + n) : (n = s(r[1]), i = n), o += this.renderer.link(i, null, n); else if (this.inLink || !(r = this.rules.url.exec(e))) {
                            if (r = this.rules.tag.exec(e))!this.inLink && /^<a /i.test(r[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(r[0]) && (this.inLink = !1), e = e.substring(r[0].length), o += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(r[0]) : s(r[0]) : r[0]; else if (r = this.rules.link.exec(e))e = e.substring(r[0].length), this.inLink = !0, o += this.outputLink(r, {
                                href: r[2],
                                title: r[3]
                            }), this.inLink = !1; else if ((r = this.rules.reflink.exec(e)) || (r = this.rules.nolink.exec(e))) {
                                if (e = e.substring(r[0].length), t = (r[2] || r[1]).replace(/\s+/g, " "), t = this.links[t.toLowerCase()], !t || !t.href) {
                                    o += r[0].charAt(0), e = r[0].substring(1) + e;
                                    continue
                                }
                                this.inLink = !0, o += this.outputLink(r, t), this.inLink = !1
                            } else if (r = this.rules.strong.exec(e))e = e.substring(r[0].length), o += this.renderer.strong(this.output(r[2] || r[1])); else if (r = this.rules.em.exec(e))e = e.substring(r[0].length), o += this.renderer.em(this.output(r[2] || r[1])); else if (r = this.rules.code.exec(e))e = e.substring(r[0].length), o += this.renderer.codespan(s(r[2], !0)); else if (r = this.rules.br.exec(e))e = e.substring(r[0].length), o += this.renderer.br(); else if (r = this.rules.del.exec(e))e = e.substring(r[0].length), o += this.renderer.del(this.output(r[1])); else if (r = this.rules.text.exec(e))e = e.substring(r[0].length), o += this.renderer.text(s(this.smartypants(r[0]))); else if (e)throw new Error("Infinite loop on byte: " + e.charCodeAt(0))
                        } else e = e.substring(r[0].length), n = s(r[1]), i = n, o += this.renderer.link(i, null, n);
                        return o
                    }, r.prototype.outputLink = function (e, t) {
                        var n = s(t.href), i = t.title ? s(t.title) : null;
                        return "!" !== e[0].charAt(0) ? this.renderer.link(n, i, this.output(e[1])) : this.renderer.image(n, i, s(e[1]))
                    }, r.prototype.smartypants = function (e) {
                        return this.options.smartypants ? e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014\/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : e
                    }, r.prototype.mangle = function (e) {
                        if (!this.options.mangle)return e;
                        for (var t, n = "", i = e.length, r = 0; i > r; r++)t = e.charCodeAt(r), Math.random() > .5 && (t = "x" + t.toString(16)), n += "&#" + t + ";";
                        return n
                    }, o.prototype.code = function (e, t, n) {
                        if (this.options.highlight) {
                            var i = this.options.highlight(e, t);
                            null != i && i !== e && (n = !0, e = i)
                        }
                        return t ? '<pre><code class="' + this.options.langPrefix + s(t, !0) + '">' + (n ? e : s(e, !0)) + "\n</code></pre>\n" : "<pre><code>" + (n ? e : s(e, !0)) + "\n</code></pre>"
                    }, o.prototype.blockquote = function (e) {
                        return "<blockquote>\n" + e + "</blockquote>\n"
                    }, o.prototype.html = function (e) {
                        return e
                    }, o.prototype.heading = function (e, t, n) {
                        return "<h" + t + ' id="' + this.options.headerPrefix + n.toLowerCase().replace(/[^\w]+/g, "-") + '">' + e + "</h" + t + ">\n"
                    }, o.prototype.hr = function () {
                        return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
                    }, o.prototype.list = function (e, t) {
                        var n = t ? "ol" : "ul";
                        return "<" + n + ">\n" + e + "</" + n + ">\n"
                    }, o.prototype.listitem = function (e) {
                        return "<li>" + e + "</li>\n"
                    }, o.prototype.paragraph = function (e) {
                        return "<p>" + e + "</p>\n"
                    }, o.prototype.table = function (e, t) {
                        return "<table>\n<thead>\n" + e + "</thead>\n<tbody>\n" + t + "</tbody>\n</table>\n"
                    }, o.prototype.tablerow = function (e) {
                        return "<tr>\n" + e + "</tr>\n"
                    }, o.prototype.tablecell = function (e, t) {
                        var n = t.header ? "th" : "td", i = t.align ? "<" + n + ' style="text-align:' + t.align + '">' : "<" + n + ">";
                        return i + e + "</" + n + ">\n"
                    }, o.prototype.strong = function (e) {
                        return "<strong>" + e + "</strong>"
                    }, o.prototype.em = function (e) {
                        return "<em>" + e + "</em>"
                    }, o.prototype.codespan = function (e) {
                        return "<code>" + e + "</code>"
                    }, o.prototype.br = function () {
                        return this.options.xhtml ? "<br/>" : "<br>"
                    }, o.prototype.del = function (e) {
                        return "<del>" + e + "</del>"
                    }, o.prototype.link = function (e, t, n) {
                        if (this.options.sanitize) {
                            try {
                                var i = decodeURIComponent(l(e)).replace(/[^\w:]/g, "").toLowerCase()
                            } catch (r) {
                                return ""
                            }
                            if (0 === i.indexOf("javascript:") || 0 === i.indexOf("vbscript:"))return ""
                        }
                        var o = '<a href="' + e + '"';
                        return t && (o += ' title="' + t + '"'), o += ">" + n + "</a>"
                    }, o.prototype.image = function (e, t, n) {
                        var i = '<img src="' + e + '" alt="' + n + '"';
                        return t && (i += ' title="' + t + '"'), i += this.options.xhtml ? "/>" : ">"
                    }, o.prototype.text = function (e) {
                        return e
                    }, a.parse = function (e, t, n) {
                        var i = new a(t, n);
                        return i.parse(e)
                    }, a.prototype.parse = function (e) {
                        this.inline = new r(e.links, this.options, this.renderer), this.tokens = e.reverse();
                        for (var t = ""; this.next();)t += this.tok();
                        return t
                    }, a.prototype.next = function () {
                        return this.token = this.tokens.pop()
                    }, a.prototype.peek = function () {
                        return this.tokens[this.tokens.length - 1] || 0
                    }, a.prototype.parseText = function () {
                        for (var e = this.token.text; "text" === this.peek().type;)e += "\n" + this.next().text;
                        return this.inline.output(e)
                    }, a.prototype.tok = function () {
                        switch (this.token.type) {
                            case"space":
                                return "";
                            case"hr":
                                return this.renderer.hr();
                            case"heading":
                                return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);
                            case"code":
                                return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
                            case"table":
                                var e, t, n, i, r, o = "", a = "";
                                for (n = "", e = 0; e < this.token.header.length; e++)i = {
                                    header: !0,
                                    align: this.token.align[e]
                                }, n += this.renderer.tablecell(this.inline.output(this.token.header[e]), {
                                    header: !0,
                                    align: this.token.align[e]
                                });
                                for (o += this.renderer.tablerow(n), e = 0; e < this.token.cells.length; e++) {
                                    for (t = this.token.cells[e], n = "", r = 0; r < t.length; r++)n += this.renderer.tablecell(this.inline.output(t[r]), {
                                        header: !1,
                                        align: this.token.align[r]
                                    });
                                    a += this.renderer.tablerow(n)
                                }
                                return this.renderer.table(o, a);
                            case"blockquote_start":
                                for (var a = ""; "blockquote_end" !== this.next().type;)a += this.tok();
                                return this.renderer.blockquote(a);
                            case"list_start":
                                for (var a = "", s = this.token.ordered; "list_end" !== this.next().type;)a += this.tok();
                                return this.renderer.list(a, s);
                            case"list_item_start":
                                for (var a = ""; "list_item_end" !== this.next().type;)a += "text" === this.token.type ? this.parseText() : this.tok();
                                return this.renderer.listitem(a);
                            case"loose_item_start":
                                for (var a = ""; "list_item_end" !== this.next().type;)a += this.tok();
                                return this.renderer.listitem(a);
                            case"html":
                                var l = this.token.pre || this.options.pedantic ? this.token.text : this.inline.output(this.token.text);
                                return this.renderer.html(l);
                            case"paragraph":
                                return this.renderer.paragraph(this.inline.output(this.token.text));
                            case"text":
                                return this.renderer.paragraph(this.parseText())
                        }
                    }, u.exec = u, h.options = h.setOptions = function (e) {
                        return d(h.defaults, e), h
                    }, h.defaults = {
                        gfm: !0,
                        tables: !0,
                        breaks: !1,
                        pedantic: !1,
                        sanitize: !1,
                        sanitizer: null,
                        mangle: !0,
                        smartLists: !1,
                        silent: !1,
                        highlight: null,
                        langPrefix: "lang-",
                        smartypants: !1,
                        headerPrefix: "",
                        renderer: new o,
                        xhtml: !1
                    }, h.Parser = a, h.parser = a.parse, h.Renderer = o, h.Lexer = t, h.lexer = t.lex, h.InlineLexer = r, h.inlineLexer = r.output, h.parse = h, "undefined" != typeof n && "object" == typeof i ? n.exports = h : "function" == typeof e && e.amd ? e(function () {
                        return h
                    }) : this.marked = h
                }).call(function () {
                    return this || ("undefined" != typeof window ? window : t)
                }())
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        18: [function (e, t, n) {
            (function (n, i) {
                "use strict";
                var r = function (e, t, n, r) {
                    if (r = r || {}, this.dictionary = null, this.rules = {}, this.dictionaryTable = {}, this.compoundRules = [], this.compoundRuleCodes = {}, this.replacementTable = [], this.flags = r.flags || {}, e) {
                        if (this.dictionary = e, "undefined" != typeof window && "chrome" in window && "extension" in window.chrome && "getURL" in window.chrome.extension)t || (t = this._readFile(chrome.extension.getURL("lib/typo/dictionaries/" + e + "/" + e + ".aff"))), n || (n = this._readFile(chrome.extension.getURL("lib/typo/dictionaries/" + e + "/" + e + ".dic"))); else {
                            if (r.dictionaryPath)var o = r.dictionaryPath; else if ("undefined" != typeof i)var o = i + "/dictionaries"; else var o = "./dictionaries";
                            t || (t = this._readFile(o + "/" + e + "/" + e + ".aff")), n || (n = this._readFile(o + "/" + e + "/" + e + ".dic"))
                        }
                        this.rules = this._parseAFF(t), this.compoundRuleCodes = {};
                        for (var a = 0, s = this.compoundRules.length; s > a; a++)for (var l = this.compoundRules[a], c = 0, u = l.length; u > c; c++)this.compoundRuleCodes[l[c]] = [];
                        "ONLYINCOMPOUND" in this.flags && (this.compoundRuleCodes[this.flags.ONLYINCOMPOUND] = []), this.dictionaryTable = this._parseDIC(n);
                        for (var a in this.compoundRuleCodes)0 == this.compoundRuleCodes[a].length && delete this.compoundRuleCodes[a];
                        for (var a = 0, s = this.compoundRules.length; s > a; a++) {
                            for (var d = this.compoundRules[a], h = "", c = 0, u = d.length; u > c; c++) {
                                var f = d[c];
                                h += f in this.compoundRuleCodes ? "(" + this.compoundRuleCodes[f].join("|") + ")" : f
                            }
                            this.compoundRules[a] = new RegExp(h, "i")
                        }
                    }
                    return this
                };
                r.prototype = {
                    load: function (e) {
                        for (var t in e)this[t] = e[t];
                        return this
                    }, _readFile: function (t, i) {
                        if (i || (i = "utf8"), "undefined" != typeof XMLHttpRequest) {
                            var r = new XMLHttpRequest;
                            return r.open("GET", t, !1), r.overrideMimeType && r.overrideMimeType("text/plain; charset=" + i), r.send(null), r.responseText
                        }
                        if ("undefined" != typeof e) {
                            var o = e("fs");
                            try {
                                if (o.existsSync(t)) {
                                    var a = o.statSync(t), s = o.openSync(t, "r"), l = new n(a.size);
                                    return o.readSync(s, l, 0, l.length, null), l.toString(i, 0, l.length)
                                }
                            } catch (c) {
                                return ""
                            }
                        }
                    }, _parseAFF: function (e) {
                        var t = {};
                        e = this._removeAffixComments(e);
                        for (var n = e.split("\n"), i = 0, r = n.length; r > i; i++) {
                            var o = n[i], a = o.split(/\s+/), s = a[0];
                            if ("PFX" == s || "SFX" == s) {
                                for (var l = a[1], c = a[2], u = parseInt(a[3], 10), d = [], h = i + 1, f = i + 1 + u; f > h; h++) {
                                    var o = n[h], p = o.split(/\s+/), m = p[2], g = p[3].split("/"), v = g[0];
                                    "0" === v && (v = "");
                                    var y = this.parseRuleCodes(g[1]), b = p[4], x = {};
                                    x.add = v, y.length > 0 && (x.continuationClasses = y), "." !== b && ("SFX" === s ? x.match = new RegExp(b + "$") : x.match = new RegExp("^" + b)), "0" != m && ("SFX" === s ? x.remove = new RegExp(m + "$") : x.remove = m), d.push(x)
                                }
                                t[l] = {type: s, combineable: "Y" == c, entries: d}, i += u
                            } else if ("COMPOUNDRULE" === s) {
                                for (var u = parseInt(a[1], 10), h = i + 1, f = i + 1 + u; f > h; h++) {
                                    var o = n[h], p = o.split(/\s+/);
                                    this.compoundRules.push(p[1])
                                }
                                i += u
                            } else if ("REP" === s) {
                                var p = o.split(/\s+/);
                                3 === p.length && this.replacementTable.push([p[1], p[2]])
                            } else this.flags[s] = a[1]
                        }
                        return t
                    }, _removeAffixComments: function (e) {
                        return e = e.replace(/#.*$/gm, ""), e = e.replace(/^\s\s*/m, "").replace(/\s\s*$/m, ""), e = e.replace(/\n{2,}/g, "\n"), e = e.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
                    }, _parseDIC: function (e) {
                        function t(e, t) {
                            e in i && "object" == typeof i[e] || (i[e] = []), i[e].push(t)
                        }

                        e = this._removeDicComments(e);
                        for (var n = e.split("\n"), i = {}, r = 1, o = n.length; o > r; r++) {
                            var a = n[r], s = a.split("/", 2), l = s[0];
                            if (s.length > 1) {
                                var c = this.parseRuleCodes(s[1]);
                                "NEEDAFFIX" in this.flags && -1 != c.indexOf(this.flags.NEEDAFFIX) || t(l, c);
                                for (var u = 0, d = c.length; d > u; u++) {
                                    var h = c[u], f = this.rules[h];
                                    if (f)for (var p = this._applyRule(l, f), m = 0, g = p.length; g > m; m++) {
                                        var v = p[m];
                                        if (t(v, []), f.combineable)for (var y = u + 1; d > y; y++) {
                                            var b = c[y], x = this.rules[b];
                                            if (x && x.combineable && f.type != x.type)for (var w = this._applyRule(v, x), k = 0, C = w.length; C > k; k++) {
                                                var S = w[k];
                                                t(S, [])
                                            }
                                        }
                                    }
                                    h in this.compoundRuleCodes && this.compoundRuleCodes[h].push(l)
                                }
                            } else t(l.trim(), [])
                        }
                        return i
                    }, _removeDicComments: function (e) {
                        return e = e.replace(/^\t.*$/gm, "")
                    }, parseRuleCodes: function (e) {
                        if (!e)return [];
                        if (!("FLAG" in this.flags))return e.split("");
                        if ("long" === this.flags.FLAG) {
                            for (var t = [], n = 0, i = e.length; i > n; n += 2)t.push(e.substr(n, 2));
                            return t
                        }
                        return "num" === this.flags.FLAG ? textCode.split(",") : void 0
                    }, _applyRule: function (e, t) {
                        for (var n = t.entries, i = [], r = 0, o = n.length; o > r; r++) {
                            var a = n[r];
                            if (!a.match || e.match(a.match)) {
                                var s = e;
                                if (a.remove && (s = s.replace(a.remove, "")), "SFX" === t.type ? s += a.add : s = a.add + s, i.push(s), "continuationClasses" in a)for (var l = 0, c = a.continuationClasses.length; c > l; l++) {
                                    var u = this.rules[a.continuationClasses[l]];
                                    u && (i = i.concat(this._applyRule(s, u)))
                                }
                            }
                        }
                        return i
                    }, check: function (e) {
                        var t = e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
                        if (this.checkExact(t))return !0;
                        if (t.toUpperCase() === t) {
                            var n = t[0] + t.substring(1).toLowerCase();
                            if (this.hasFlag(n, "KEEPCASE"))return !1;
                            if (this.checkExact(n))return !0
                        }
                        var i = t.toLowerCase();
                        if (i !== t) {
                            if (this.hasFlag(i, "KEEPCASE"))return !1;
                            if (this.checkExact(i))return !0
                        }
                        return !1
                    }, checkExact: function (e) {
                        var t = this.dictionaryTable[e];
                        if ("undefined" == typeof t) {
                            if ("COMPOUNDMIN" in this.flags && e.length >= this.flags.COMPOUNDMIN)for (var n = 0, i = this.compoundRules.length; i > n; n++)if (e.match(this.compoundRules[n]))return !0;
                            return !1
                        }
                        if ("object" == typeof t) {
                            for (var n = 0, i = t.length; i > n; n++)if (!this.hasFlag(e, "ONLYINCOMPOUND", t[n]))return !0;
                            return !1
                        }
                    }, hasFlag: function (e, t, n) {
                        if (t in this.flags) {
                            if ("undefined" == typeof n)var n = Array.prototype.concat.apply([], this.dictionaryTable[e]);
                            if (n && -1 !== n.indexOf(this.flags[t]))return !0
                        }
                        return !1
                    }, alphabet: "", suggest: function (e, t) {
                        function n(e) {
                            for (var t = [], n = 0, i = e.length; i > n; n++) {
                                for (var r = e[n], o = [], a = 0, s = r.length + 1; s > a; a++)o.push([r.substring(0, a), r.substring(a, r.length)]);
                                for (var l = [], a = 0, s = o.length; s > a; a++) {
                                    var u = o[a];
                                    u[1] && l.push(u[0] + u[1].substring(1))
                                }
                                for (var d = [], a = 0, s = o.length; s > a; a++) {
                                    var u = o[a];
                                    u[1].length > 1 && d.push(u[0] + u[1][1] + u[1][0] + u[1].substring(2))
                                }
                                for (var h = [], a = 0, s = o.length; s > a; a++) {
                                    var u = o[a];
                                    if (u[1])for (var f = 0, p = c.alphabet.length; p > f; f++)h.push(u[0] + c.alphabet[f] + u[1].substring(1))
                                }
                                for (var m = [], a = 0, s = o.length; s > a; a++) {
                                    var u = o[a];
                                    if (u[1])for (var f = 0, p = c.alphabet.length; p > f; f++)h.push(u[0] + c.alphabet[f] + u[1])
                                }
                                t = t.concat(l), t = t.concat(d), t = t.concat(h), t = t.concat(m)
                            }
                            return t
                        }

                        function i(e) {
                            for (var t = [], n = 0; n < e.length; n++)c.check(e[n]) && t.push(e[n]);
                            return t
                        }

                        function r(e) {
                            function r(e, t) {
                                return e[1] < t[1] ? -1 : 1
                            }

                            for (var o = n([e]), a = n(o), s = i(o).concat(i(a)), l = {}, u = 0, d = s.length; d > u; u++)s[u] in l ? l[s[u]] += 1 : l[s[u]] = 1;
                            var h = [];
                            for (var u in l)h.push([u, l[u]]);
                            h.sort(r).reverse();
                            for (var f = [], u = 0, d = Math.min(t, h.length); d > u; u++)c.hasFlag(h[u][0], "NOSUGGEST") || f.push(h[u][0]);
                            return f
                        }

                        if (t || (t = 5), this.check(e))return [];
                        for (var o = 0, a = this.replacementTable.length; a > o; o++) {
                            var s = this.replacementTable[o];
                            if (-1 !== e.indexOf(s[0])) {
                                var l = e.replace(s[0], s[1]);
                                if (this.check(l))return [l]
                            }
                        }
                        var c = this;
                        return c.alphabet = "abcdefghijklmnopqrstuvwxyz", r(e)
                    }
                }, "undefined" != typeof t && (t.exports = r)
            }).call(this, e("buffer").Buffer, "/node_modules/typo-js")
        }, {buffer: 3, fs: 2}],
        19: [function (e, t, n) {
            var i = e("codemirror");
            i.commands.tabAndIndentMarkdownList = function (e) {
                var t = e.listSelections(), n = t[0].head, i = e.getStateAfter(n.line), r = i.list !== !1;
                if (r)return void e.execCommand("indentMore");
                if (e.options.indentWithTabs)e.execCommand("insertTab"); else {
                    var o = Array(e.options.tabSize + 1).join(" ");
                    e.replaceSelection(o)
                }
            }, i.commands.shiftTabAndUnindentMarkdownList = function (e) {
                var t = e.listSelections(), n = t[0].head, i = e.getStateAfter(n.line), r = i.list !== !1;
                if (r)return void e.execCommand("indentLess");
                if (e.options.indentWithTabs)e.execCommand("insertTab"); else {
                    var o = Array(e.options.tabSize + 1).join(" ");
                    e.replaceSelection(o)
                }
            }
        }, {codemirror: 10}],
        20: [function (e, t, n) {
            "use strict";
            function i(e) {
                return e = U ? e.replace("Ctrl", "Cmd") : e.replace("Cmd", "Ctrl")
            }

            function r(e, t, n) {
                e = e || {};
                var i = document.createElement("a");
                return t = void 0 == t || t, e.title && t && (i.title = a(e.title, e.action, n), U && (i.title = i.title.replace("Ctrl", "⌘"), i.title = i.title.replace("Alt", "⌥"))), i.tabIndex = -1, i.className = e.className, i
            }

            function o() {
                var e = document.createElement("i");
                return e.className = "separator", e.innerHTML = "|", e
            }

            function a(e, t, n) {
                var r, o = e;
                return t && (r = G(t), n[r] && (o += " (" + i(n[r]) + ")")), o
            }

            function s(e, t) {
                t = t || e.getCursor("start");
                var n = e.getTokenAt(t);
                if (!n.type)return {};
                for (var i, r, o = n.type.split(" "), a = {}, s = 0; s < o.length; s++)i = o[s], "strong" === i ? a.bold = !0 : "variable-2" === i ? (r = e.getLine(t.line), /^\s*\d+\.\s/.test(r) ? a["ordered-list"] = !0 : a["unordered-list"] = !0) : "atom" === i ? a.quote = !0 : "em" === i ? a.italic = !0 : "quote" === i ? a.quote = !0 : "strikethrough" === i ? a.strikethrough = !0 : "comment" === i ? a.code = !0 : "link" === i ? a.link = !0 : "tag" === i ? a.image = !0 : i.match(/^header(\-[1-6])?$/) && (a[i.replace("header", "heading")] = !0);
                return a
            }

            function l(e) {
                var t = e.codemirror;
                t.setOption("fullScreen", !t.getOption("fullScreen")), t.getOption("fullScreen") ? (Y = document.body.style.overflow, document.body.style.overflow = "hidden") : document.body.style.overflow = Y;
                var n = t.getWrapperElement();
                /fullscreen/.test(n.previousSibling.className) ? n.previousSibling.className = n.previousSibling.className.replace(/\s*fullscreen\b/, "") : n.previousSibling.className += " fullscreen";
                var i = e.toolbarElements.fullscreen;
                /active/.test(i.className) ? i.className = i.className.replace(/\s*active\s*/g, "") : i.className += " active";
                var r = t.getWrapperElement().nextSibling;
                /editor-preview-active-side/.test(r.className) && _(e)
            }

            function c(e) {
                O(e, "bold", e.options.blockStyles.bold)
            }

            function u(e) {
                O(e, "italic", e.options.blockStyles.italic)
            }

            function d(e) {
                O(e, "strikethrough", "~~")
            }

            function h(e) {
                function t(e) {
                    if ("object" != typeof e)throw"fencing_line() takes a 'line' object (not a line number, or line text).  Got: " + typeof e + ": " + e;
                    return e.styles && e.styles[2] && -1 !== e.styles[2].indexOf("formatting-code-block")
                }

                function n(e) {
                    return e.state.base.base || e.state.base
                }

                function i(e, i, r, o, a) {
                    r = r || e.getLineHandle(i), o = o || e.getTokenAt({
                            line: i,
                            ch: 1
                        }), a = a || !!r.text && e.getTokenAt({line: i, ch: r.text.length - 1});
                    var s = o.type ? o.type.split(" ") : [];
                    return a && n(a).indentedCode ? "indented" : -1 !== s.indexOf("comment") && (n(o).fencedChars || n(a).fencedChars || t(r) ? "fenced" : "single")
                }

                function r(e, t, n, i) {
                    var r = t.line + 1, o = n.line + 1, a = t.line !== n.line, s = i + "\n", l = "\n" + i;
                    a && o++, a && 0 === n.ch && (l = i + "\n", o--), A(e, !1, [s, l]), e.setSelection({
                        line: r,
                        ch: 0
                    }, {line: o, ch: 0})
                }

                var o, a, s, l = e.options.blockStyles.code, c = e.codemirror, u = c.getCursor("start"), d = c.getCursor("end"), h = c.getTokenAt({
                    line: u.line,
                    ch: u.ch || 1
                }), f = c.getLineHandle(u.line), p = i(c, u.line, f, h);
                if ("single" === p) {
                    var m = f.text.slice(0, u.ch).replace("`", ""), g = f.text.slice(u.ch).replace("`", "");
                    c.replaceRange(m + g, {line: u.line, ch: 0}, {
                        line: u.line,
                        ch: 99999999999999
                    }), u.ch--, u !== d && d.ch--, c.setSelection(u, d), c.focus()
                } else if ("fenced" === p)if (u.line !== d.line || u.ch !== d.ch) {
                    for (o = u.line; o >= 0 && (f = c.getLineHandle(o), !t(f)); o--);
                    var v, y, b, x, w = c.getTokenAt({line: o, ch: 1}), k = n(w).fencedChars;
                    t(c.getLineHandle(u.line)) ? (v = "", y = u.line) : t(c.getLineHandle(u.line - 1)) ? (v = "", y = u.line - 1) : (v = k + "\n", y = u.line), t(c.getLineHandle(d.line)) ? (b = "", x = d.line, 0 === d.ch && (x += 1)) : 0 !== d.ch && t(c.getLineHandle(d.line + 1)) ? (b = "", x = d.line + 1) : (b = k + "\n", x = d.line + 1), 0 === d.ch && (x -= 1), c.operation(function () {
                        c.replaceRange(b, {line: x, ch: 0}, {line: x + (b ? 0 : 1), ch: 0}), c.replaceRange(v, {
                            line: y,
                            ch: 0
                        }, {line: y + (v ? 0 : 1), ch: 0})
                    }), c.setSelection({line: y + (v ? 1 : 0), ch: 0}, {line: x + (v ? 1 : -1), ch: 0}), c.focus()
                } else {
                    var C = u.line;
                    if (t(c.getLineHandle(u.line)) && ("fenced" === i(c, u.line + 1) ? (o = u.line, C = u.line + 1) : (a = u.line, C = u.line - 1)), void 0 === o)for (o = C; o >= 0 && (f = c.getLineHandle(o), !t(f)); o--);
                    if (void 0 === a)for (s = c.lineCount(), a = C; s > a && (f = c.getLineHandle(a), !t(f)); a++);
                    c.operation(function () {
                        c.replaceRange("", {line: o, ch: 0}, {line: o + 1, ch: 0}), c.replaceRange("", {
                            line: a - 1,
                            ch: 0
                        }, {line: a, ch: 0})
                    }), c.focus()
                } else if ("indented" === p) {
                    if (u.line !== d.line || u.ch !== d.ch)o = u.line, a = d.line, 0 === d.ch && a--; else {
                        for (o = u.line; o >= 0; o--)if (f = c.getLineHandle(o), !f.text.match(/^\s*$/) && "indented" !== i(c, o, f)) {
                            o += 1;
                            break
                        }
                        for (s = c.lineCount(), a = u.line; s > a; a++)if (f = c.getLineHandle(a), !f.text.match(/^\s*$/) && "indented" !== i(c, a, f)) {
                            a -= 1;
                            break
                        }
                    }
                    var S = c.getLineHandle(a + 1), L = S && c.getTokenAt({
                            line: a + 1,
                            ch: S.text.length - 1
                        }), T = L && n(L).indentedCode;
                    T && c.replaceRange("\n", {line: a + 1, ch: 0});
                    for (var M = o; a >= M; M++)c.indentLine(M, "subtract");
                    c.focus()
                } else {
                    var _ = u.line === d.line && u.ch === d.ch && 0 === u.ch, N = u.line !== d.line;
                    _ || N ? r(c, u, d, l) : A(c, !1, ["`", "`"])
                }
            }

            function f(e) {
                var t = e.codemirror;
                E(t, "quote")
            }

            function p(e) {
                var t = e.codemirror;
                D(t, "smaller")
            }

            function m(e) {
                var t = e.codemirror;
                D(t, "bigger")
            }

            function g(e) {
                var t = e.codemirror;
                D(t, void 0, 1)
            }

            function v(e) {
                var t = e.codemirror;
                D(t, void 0, 2)
            }

            function y(e) {
                var t = e.codemirror;
                D(t, void 0, 3)
            }

            function b(e) {
                var t = e.codemirror;
                E(t, "unordered-list")
            }

            function x(e) {
                var t = e.codemirror;
                E(t, "ordered-list")
            }

            function w(e) {
                var t = e.codemirror;
                I(t)
            }

            function k(e) {
                var t = e.codemirror, n = s(t), i = e.options, r = "http://";
                return !(i.promptURLs && (r = prompt(i.promptTexts.link), !r)) && void A(t, n.link, i.insertTexts.link, r)
            }

            function C(e) {
                var t = e.codemirror, n = s(t), i = e.options, r = "http://";
                return !(i.promptURLs && (r = prompt(i.promptTexts.image), !r)) && void A(t, n.image, i.insertTexts.image, r)
            }

            function S(e) {
                var t = e.codemirror, n = s(t), i = e.options;
                A(t, n.table, i.insertTexts.table)
            }

            function L(e) {
                var t = e.codemirror, n = s(t), i = e.options;
                A(t, n.image, i.insertTexts.horizontalRule)
            }

            function T(e) {
                var t = e.codemirror;
                t.undo(), t.focus()
            }

            function M(e) {
                var t = e.codemirror;
                t.redo(), t.focus()
            }

            function _(e) {
                var t = e.codemirror, n = t.getWrapperElement(), i = n.nextSibling, r = e.toolbarElements["side-by-side"], o = !1;
                /editor-preview-active-side/.test(i.className) ? (i.className = i.className.replace(/\s*editor-preview-active-side\s*/g, ""), r.className = r.className.replace(/\s*active\s*/g, ""), n.className = n.className.replace(/\s*CodeMirror-sided\s*/g, " ")) : (setTimeout(function () {
                    t.getOption("fullScreen") || l(e), i.className += " editor-preview-active-side"
                }, 1), r.className += " active", n.className += " CodeMirror-sided", o = !0);
                var a = n.lastChild;
                if (/editor-preview-active/.test(a.className)) {
                    a.className = a.className.replace(/\s*editor-preview-active\s*/g, "");
                    var s = e.toolbarElements.preview, c = n.previousSibling;
                    s.className = s.className.replace(/\s*active\s*/g, ""), c.className = c.className.replace(/\s*disabled-for-preview*/g, "")
                }
                var u = function () {
                    i.innerHTML = e.options.previewRender(e.value(), i)
                };
                t.sideBySideRenderingFunction || (t.sideBySideRenderingFunction = u), o ? (i.innerHTML = e.options.previewRender(e.value(), i), t.on("update", t.sideBySideRenderingFunction)) : t.off("update", t.sideBySideRenderingFunction), t.refresh()
            }

            function N(e) {
                var t = e.codemirror, n = t.getWrapperElement(), i = n.previousSibling, r = !!e.options.toolbar && e.toolbarElements.preview, o = n.lastChild;
                o && /editor-preview/.test(o.className) || (o = document.createElement("div"), o.className = "editor-preview", n.appendChild(o)), /editor-preview-active/.test(o.className) ? (o.className = o.className.replace(/\s*editor-preview-active\s*/g, ""), r && (r.className = r.className.replace(/\s*active\s*/g, ""), i.className = i.className.replace(/\s*disabled-for-preview*/g, ""))) : (setTimeout(function () {
                    o.className += " editor-preview-active"
                }, 1), r && (r.className += " active", i.className += " disabled-for-preview")), o.innerHTML = e.options.previewRender(e.value(), o);
                var a = t.getWrapperElement().nextSibling;
                /editor-preview-active-side/.test(a.className) && _(e)
            }

            function A(e, t, n, i) {
                if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
                    var r, o = n[0], a = n[1], s = e.getCursor("start"), l = e.getCursor("end");
                    i && (a = a.replace("#url#", i)), t ? (r = e.getLine(s.line), o = r.slice(0, s.ch), a = r.slice(s.ch), e.replaceRange(o + a, {
                        line: s.line,
                        ch: 0
                    })) : (r = e.getSelection(), e.replaceSelection(o + r + a), s.ch += o.length, s !== l && (l.ch += o.length)), e.setSelection(s, l), e.focus()
                }
            }

            function D(e, t, n) {
                if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
                    for (var i = e.getCursor("start"), r = e.getCursor("end"), o = i.line; o <= r.line; o++)!function (i) {
                        var r = e.getLine(i), o = r.search(/[^#]/);
                        r = void 0 !== t ? 0 >= o ? "bigger" == t ? "###### " + r : "# " + r : 6 == o && "smaller" == t ? r.substr(7) : 1 == o && "bigger" == t ? r.substr(2) : "bigger" == t ? r.substr(1) : "#" + r : 1 == n ? 0 >= o ? "# " + r : o == n ? r.substr(o + 1) : "# " + r.substr(o + 1) : 2 == n ? 0 >= o ? "## " + r : o == n ? r.substr(o + 1) : "## " + r.substr(o + 1) : 0 >= o ? "### " + r : o == n ? r.substr(o + 1) : "### " + r.substr(o + 1), e.replaceRange(r, {
                            line: i,
                            ch: 0
                        }, {line: i, ch: 99999999999999})
                    }(o);
                    e.focus()
                }
            }

            function E(e, t) {
                if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
                    for (var n = s(e), i = e.getCursor("start"), r = e.getCursor("end"), o = {
                        quote: /^(\s*)\>\s+/,
                        "unordered-list": /^(\s*)(\*|\-|\+)\s+/,
                        "ordered-list": /^(\s*)\d+\.\s+/
                    }, a = {
                        quote: "> ",
                        "unordered-list": "* ",
                        "ordered-list": "1. "
                    }, l = i.line; l <= r.line; l++)!function (i) {
                        var r = e.getLine(i);
                        r = n[t] ? r.replace(o[t], "$1") : a[t] + r, e.replaceRange(r, {line: i, ch: 0}, {
                            line: i,
                            ch: 99999999999999
                        })
                    }(l);
                    e.focus()
                }
            }

            function O(e, t, n, i) {
                if (!/editor-preview-active/.test(e.codemirror.getWrapperElement().lastChild.className)) {
                    i = "undefined" == typeof i ? n : i;
                    var r, o = e.codemirror, a = s(o), l = n, c = i, u = o.getCursor("start"), d = o.getCursor("end");
                    a[t] ? (r = o.getLine(u.line), l = r.slice(0, u.ch), c = r.slice(u.ch), "bold" == t ? (l = l.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/, ""), c = c.replace(/(\*\*|__)/, "")) : "italic" == t ? (l = l.replace(/(\*|_)(?![\s\S]*(\*|_))/, ""), c = c.replace(/(\*|_)/, "")) : "strikethrough" == t && (l = l.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/, ""), c = c.replace(/(\*\*|~~)/, "")), o.replaceRange(l + c, {
                        line: u.line,
                        ch: 0
                    }, {
                        line: u.line,
                        ch: 99999999999999
                    }), "bold" == t || "strikethrough" == t ? (u.ch -= 2, u !== d && (d.ch -= 2)) : "italic" == t && (u.ch -= 1, u !== d && (d.ch -= 1))) : (r = o.getSelection(), "bold" == t ? (r = r.split("**").join(""), r = r.split("__").join("")) : "italic" == t ? (r = r.split("*").join(""), r = r.split("_").join("")) : "strikethrough" == t && (r = r.split("~~").join("")), o.replaceSelection(l + r + c), u.ch += n.length, d.ch = u.ch + r.length), o.setSelection(u, d), o.focus()
                }
            }

            function I(e) {
                if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className))for (var t, n = e.getCursor("start"), i = e.getCursor("end"), r = n.line; r <= i.line; r++)t = e.getLine(r), t = t.replace(/^[ ]*([# ]+|\*|\-|[> ]+|[0-9]+(.|\)))[ ]*/, ""), e.replaceRange(t, {
                    line: r,
                    ch: 0
                }, {line: r, ch: 99999999999999})
            }

            function B(e, t) {
                for (var n in t)t.hasOwnProperty(n) && (t[n] instanceof Array ? e[n] = t[n].concat(e[n] instanceof Array ? e[n] : []) : null !== t[n] && "object" == typeof t[n] && t[n].constructor === Object ? e[n] = B(e[n] || {}, t[n]) : e[n] = t[n]);
                return e
            }

            function P(e) {
                for (var t = 1; t < arguments.length; t++)e = B(e, arguments[t]);
                return e
            }

            function R(e) {
                var t = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g, n = e.match(t), i = 0;
                if (null === n)return i;
                for (var r = 0; r < n.length; r++)i += n[r].charCodeAt(0) >= 19968 ? n[r].length : 1;
                return i
            }

            function H(e) {
                e = e || {}, e.parent = this;
                var t = !0;
                if (e.autoDownloadFontAwesome === !1 && (t = !1), e.autoDownloadFontAwesome !== !0)for (var n = document.styleSheets, i = 0; i < n.length; i++)n[i].href && n[i].href.indexOf("//maxcdn.bootstrapcdn.com/font-awesome/") > -1 && (t = !1);
                if (t) {
                    var r = document.createElement("link");
                    r.rel = "stylesheet", r.href = "https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css", document.getElementsByTagName("head")[0].appendChild(r)
                }
                if (e.element)this.element = e.element; else if (null === e.element)return;
                if (void 0 === e.toolbar) {
                    e.toolbar = [];
                    for (var o in K)K.hasOwnProperty(o) && (-1 != o.indexOf("separator-") && e.toolbar.push("|"), (K[o]["default"] === !0 || e.showIcons && e.showIcons.constructor === Array && -1 != e.showIcons.indexOf(o)) && e.toolbar.push(o))
                }
                e.hasOwnProperty("status") || (e.status = ["autosave", "lines", "words", "cursor"]), e.previewRender || (e.previewRender = function (e) {
                    return this.parent.markdown(e)
                }), e.parsingConfig = P({highlightFormatting: !0}, e.parsingConfig || {}), e.insertTexts = P({}, X, e.insertTexts || {}), e.promptTexts = Z, e.blockStyles = P({}, J, e.blockStyles || {}), e.shortcuts = P({}, q, e.shortcuts || {}), void 0 != e.autosave && void 0 != e.autosave.unique_id && "" != e.autosave.unique_id && (e.autosave.uniqueId = e.autosave.unique_id), this.options = e, this.render(), !e.initialValue || this.options.autosave && this.options.autosave.foundSavedValue === !0 || this.value(e.initialValue)
            }

            function W() {
                if ("object" != typeof localStorage)return !1;
                try {
                    localStorage.setItem("smde_localStorage", 1), localStorage.removeItem("smde_localStorage")
                } catch (e) {
                    return !1
                }
                return !0
            }

            var F = e("codemirror");
            e("codemirror/addon/edit/continuelist.js"), e("./codemirror/tablist"), e("codemirror/addon/display/fullscreen.js"), e("codemirror/mode/markdown/markdown.js"), e("codemirror/addon/mode/overlay.js"), e("codemirror/addon/display/placeholder.js"), e("codemirror/addon/selection/mark-selection.js"), e("codemirror/mode/gfm/gfm.js"), e("codemirror/mode/xml/xml.js");
            var z = e("codemirror-spell-checker"), j = e("marked"), U = /Mac/.test(navigator.platform), $ = {
                toggleBold: c,
                toggleItalic: u,
                drawLink: k,
                toggleHeadingSmaller: p,
                toggleHeadingBigger: m,
                drawImage: C,
                toggleBlockquote: f,
                toggleOrderedList: x,
                toggleUnorderedList: b,
                toggleCodeBlock: h,
                togglePreview: N,
                toggleStrikethrough: d,
                toggleHeading1: g,
                toggleHeading2: v,
                toggleHeading3: y,
                cleanBlock: w,
                drawTable: S,
                drawHorizontalRule: L,
                undo: T,
                redo: M,
                toggleSideBySide: _,
                toggleFullScreen: l
            }, q = {
                toggleBold: "Cmd-B",
                toggleItalic: "Cmd-I",
                drawLink: "Cmd-K",
                toggleHeadingSmaller: "Cmd-H",
                toggleHeadingBigger: "Shift-Cmd-H",
                cleanBlock: "Cmd-E",
                drawImage: "Cmd-Alt-I",
                toggleBlockquote: "Cmd-'",
                toggleOrderedList: "Cmd-Alt-L",
                toggleUnorderedList: "Cmd-L",
                toggleCodeBlock: "Cmd-Alt-C",
                togglePreview: "Cmd-P",
                toggleSideBySide: "F9",
                toggleFullScreen: "F11"
            }, G = function (e) {
                for (var t in $)if ($[t] === e)return t;
                return null
            }, V = function () {
                var e = !1;
                return function (t) {
                    (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0);
                }(navigator.userAgent || navigator.vendor || window.opera), e
            }, Y = "", K = {
                bold: {name: "bold", action: c, className: "fa fa-bold", title: "Bold", "default": !0},
                italic: {name: "italic", action: u, className: "fa fa-italic", title: "Italic", "default": !0},
                strikethrough: {
                    name: "strikethrough",
                    action: d,
                    className: "fa fa-strikethrough",
                    title: "Strikethrough"
                },
                heading: {name: "heading", action: p, className: "fa fa-header", title: "Heading", "default": !0},
                "heading-smaller": {
                    name: "heading-smaller",
                    action: p,
                    className: "fa fa-header fa-header-x fa-header-smaller",
                    title: "Smaller Heading"
                },
                "heading-bigger": {
                    name: "heading-bigger",
                    action: m,
                    className: "fa fa-header fa-header-x fa-header-bigger",
                    title: "Bigger Heading"
                },
                "heading-1": {
                    name: "heading-1",
                    action: g,
                    className: "fa fa-header fa-header-x fa-header-1",
                    title: "Big Heading"
                },
                "heading-2": {
                    name: "heading-2",
                    action: v,
                    className: "fa fa-header fa-header-x fa-header-2",
                    title: "Medium Heading"
                },
                "heading-3": {
                    name: "heading-3",
                    action: y,
                    className: "fa fa-header fa-header-x fa-header-3",
                    title: "Small Heading"
                },
                "separator-1": {name: "separator-1"},
                code: {name: "code", action: h, className: "fa fa-code", title: "Code"},
                quote: {name: "quote", action: f, className: "fa fa-quote-left", title: "Quote", "default": !0},
                "unordered-list": {
                    name: "unordered-list",
                    action: b,
                    className: "fa fa-list-ul",
                    title: "Generic List",
                    "default": !0
                },
                "ordered-list": {
                    name: "ordered-list",
                    action: x,
                    className: "fa fa-list-ol",
                    title: "Numbered List",
                    "default": !0
                },
                "clean-block": {
                    name: "clean-block",
                    action: w,
                    className: "fa fa-eraser fa-clean-block",
                    title: "Clean block"
                },
                "separator-2": {name: "separator-2"},
                link: {name: "link", action: k, className: "fa fa-link", title: "Create Link", "default": !0},
                image: {name: "image", action: C, className: "fa fa-picture-o", title: "Insert Image", "default": !0},
                table: {name: "table", action: S, className: "fa fa-table", title: "Insert Table"},
                "horizontal-rule": {
                    name: "horizontal-rule",
                    action: L,
                    className: "fa fa-minus",
                    title: "Insert Horizontal Line"
                },
                "separator-3": {name: "separator-3"},
                preview: {
                    name: "preview",
                    action: N,
                    className: "fa fa-eye no-disable",
                    title: "Toggle Preview",
                    "default": !0
                },
                "side-by-side": {
                    name: "side-by-side",
                    action: _,
                    className: "fa fa-columns no-disable no-mobile",
                    title: "Toggle Side by Side",
                    "default": !0
                },
                fullscreen: {
                    name: "fullscreen",
                    action: l,
                    className: "fa fa-arrows-alt no-disable no-mobile",
                    title: "Toggle Fullscreen",
                    "default": !0
                },
                "separator-4": {name: "separator-4"},
                guide: {
                    name: "guide",
                    action: "https://simplemde.com/markdown-guide",
                    className: "fa fa-question-circle",
                    title: "Markdown Guide",
                    "default": !0
                },
                "separator-5": {name: "separator-5"},
                undo: {name: "undo", action: T, className: "fa fa-undo no-disable", title: "Undo"},
                redo: {name: "redo", action: M, className: "fa fa-repeat no-disable", title: "Redo"}
            }, X = {
                link: ["[", "](#url#)"],
                image: ["![](", "#url#)"],
                table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"],
                horizontalRule: ["", "\n\n-----\n\n"]
            }, Z = {link: "URL for the link:", image: "URL of the image:"}, J = {bold: "**", code: "```", italic: "*"};
            H.prototype.markdown = function (e) {
                if (j) {
                    var t = {};
                    return this.options && this.options.renderingConfig && this.options.renderingConfig.singleLineBreaks === !1 ? t.breaks = !1 : t.breaks = !0, this.options && this.options.renderingConfig && this.options.renderingConfig.codeSyntaxHighlighting === !0 && window.hljs && (t.highlight = function (e) {
                        return window.hljs.highlightAuto(e).value
                    }), j.setOptions(t), j(e)
                }
            }, H.prototype.render = function (e) {
                if (e || (e = this.element || document.getElementsByTagName("textarea")[0]), !this._rendered || this._rendered !== e) {
                    this.element = e;
                    var t = this.options, n = this, r = {};
                    for (var o in t.shortcuts)null !== t.shortcuts[o] && null !== $[o] && !function (e) {
                        r[i(t.shortcuts[e])] = function () {
                            $[e](n)
                        }
                    }(o);
                    r.Enter = "newlineAndIndentContinueMarkdownList", r.Tab = "tabAndIndentMarkdownList", r["Shift-Tab"] = "shiftTabAndUnindentMarkdownList", r.Esc = function (e) {
                        e.getOption("fullScreen") && l(n)
                    }, document.addEventListener("keydown", function (e) {
                        e = e || window.event, 27 == e.keyCode && n.codemirror.getOption("fullScreen") && l(n)
                    }, !1);
                    var a, s;
                    if (t.spellChecker !== !1 ? (a = "spell-checker", s = t.parsingConfig, s.name = "gfm", s.gitHubSpice = !1, z({codeMirrorInstance: F})) : (a = t.parsingConfig, a.name = "gfm", a.gitHubSpice = !1), this.codemirror = F.fromTextArea(e, {
                            mode: a,
                            backdrop: s,
                            theme: "paper",
                            tabSize: void 0 != t.tabSize ? t.tabSize : 2,
                            indentUnit: void 0 != t.tabSize ? t.tabSize : 2,
                            indentWithTabs: t.indentWithTabs !== !1,
                            lineNumbers: !1,
                            autofocus: t.autofocus === !0,
                            extraKeys: r,
                            lineWrapping: t.lineWrapping !== !1,
                            allowDropFileTypes: ["text/plain"],
                            placeholder: t.placeholder || e.getAttribute("placeholder") || "",
                            styleSelectedText: void 0 == t.styleSelectedText || t.styleSelectedText
                        }), t.forceSync === !0) {
                        var c = this.codemirror;
                        c.on("change", function () {
                            c.save()
                        })
                    }
                    this.gui = {}, t.toolbar !== !1 && (this.gui.toolbar = this.createToolbar()), t.status !== !1 && (this.gui.statusbar = this.createStatusbar()), void 0 != t.autosave && t.autosave.enabled === !0 && this.autosave(), this.gui.sideBySide = this.createSideBySide(), this._rendered = this.element;
                    var u = this.codemirror;
                    setTimeout(function () {
                        u.refresh()
                    }.bind(u), 0)
                }
            }, H.prototype.autosave = function () {
                if (W()) {
                    var e = this;
                    if (void 0 == this.options.autosave.uniqueId || "" == this.options.autosave.uniqueId)return;
                    null != e.element.form && void 0 != e.element.form && e.element.form.addEventListener("submit", function () {
                        localStorage.removeItem("smde_" + e.options.autosave.uniqueId)
                    }), this.options.autosave.loaded !== !0 && ("string" == typeof localStorage.getItem("smde_" + this.options.autosave.uniqueId) && "" != localStorage.getItem("smde_" + this.options.autosave.uniqueId) && (this.codemirror.setValue(localStorage.getItem("smde_" + this.options.autosave.uniqueId)), this.options.autosave.foundSavedValue = !0), this.options.autosave.loaded = !0), localStorage.setItem("smde_" + this.options.autosave.uniqueId, e.value());
                    var t = document.getElementById("autosaved");
                    if (null != t && void 0 != t && "" != t) {
                        var n = new Date, i = n.getHours(), r = n.getMinutes(), o = "am", a = i;
                        a >= 12 && (a = i - 12, o = "pm"), 0 == a && (a = 12), r = 10 > r ? "0" + r : r, t.innerHTML = "Autosaved: " + a + ":" + r + " " + o
                    }
                    this.autosaveTimeoutId = setTimeout(function () {
                        e.autosave()
                    }, this.options.autosave.delay || 1e4)
                }
            }, H.prototype.clearAutosavedValue = function () {
                if (W()) {
                    if (void 0 == this.options.autosave || void 0 == this.options.autosave.uniqueId || "" == this.options.autosave.uniqueId)return;
                    localStorage.removeItem("smde_" + this.options.autosave.uniqueId)
                }
            }, H.prototype.createSideBySide = function () {
                var e = this.codemirror, t = e.getWrapperElement(), n = t.nextSibling;
                n && /editor-preview-side/.test(n.className) || (n = document.createElement("div"), n.className = "editor-preview-side", t.parentNode.insertBefore(n, t.nextSibling));
                var i = !1, r = !1;
                return e.on("scroll", function (e) {
                    if (i)return void(i = !1);
                    r = !0;
                    var t = e.getScrollInfo().height - e.getScrollInfo().clientHeight, o = parseFloat(e.getScrollInfo().top) / t, a = (n.scrollHeight - n.clientHeight) * o;
                    n.scrollTop = a
                }), n.onscroll = function () {
                    if (r)return void(r = !1);
                    i = !0;
                    var t = n.scrollHeight - n.clientHeight, o = parseFloat(n.scrollTop) / t, a = (e.getScrollInfo().height - e.getScrollInfo().clientHeight) * o;
                    e.scrollTo(0, a)
                }, n
            }, H.prototype.createToolbar = function (e) {
                if (e = e || this.options.toolbar, e && 0 !== e.length) {
                    var t;
                    for (t = 0; t < e.length; t++)void 0 != K[e[t]] && (e[t] = K[e[t]]);
                    var n = document.createElement("div");
                    n.className = "editor-toolbar";
                    var i = this, a = {};
                    for (i.toolbar = e, t = 0; t < e.length; t++)if (("guide" != e[t].name || i.options.toolbarGuideIcon !== !1) && !(i.options.hideIcons && -1 != i.options.hideIcons.indexOf(e[t].name) || ("fullscreen" == e[t].name || "side-by-side" == e[t].name) && V())) {
                        if ("|" === e[t]) {
                            for (var l = !1, c = t + 1; c < e.length; c++)"|" === e[c] || i.options.hideIcons && -1 != i.options.hideIcons.indexOf(e[c].name) || (l = !0);
                            if (!l)continue
                        }
                        !function (e) {
                            var t;
                            t = "|" === e ? o() : r(e, i.options.toolbarTips, i.options.shortcuts), e.action && ("function" == typeof e.action ? t.onclick = function (t) {
                                t.preventDefault(), e.action(i)
                            } : "string" == typeof e.action && (t.href = e.action, t.target = "_blank")), a[e.name || e] = t, n.appendChild(t)
                        }(e[t])
                    }
                    i.toolbarElements = a;
                    var u = this.codemirror;
                    u.on("cursorActivity", function () {
                        var e = s(u);
                        for (var t in a)!function (t) {
                            var n = a[t];
                            e[t] ? n.className += " active" : "fullscreen" != t && "side-by-side" != t && (n.className = n.className.replace(/\s*active\s*/g, ""))
                        }(t)
                    });
                    var d = u.getWrapperElement();
                    return d.parentNode.insertBefore(n, d), n
                }
            }, H.prototype.createStatusbar = function (e) {
                e = e || this.options.status;
                var t = this.options, n = this.codemirror;
                if (e && 0 !== e.length) {
                    var i, r, o, a = [];
                    for (i = 0; i < e.length; i++)if (r = void 0, o = void 0, "object" == typeof e[i])a.push({
                        className: e[i].className,
                        defaultValue: e[i].defaultValue,
                        onUpdate: e[i].onUpdate
                    }); else {
                        var s = e[i];
                        "words" === s ? (o = function (e) {
                            e.innerHTML = R(n.getValue())
                        }, r = function (e) {
                            e.innerHTML = R(n.getValue())
                        }) : "lines" === s ? (o = function (e) {
                            e.innerHTML = n.lineCount()
                        }, r = function (e) {
                            e.innerHTML = n.lineCount()
                        }) : "cursor" === s ? (o = function (e) {
                            e.innerHTML = "0:0"
                        }, r = function (e) {
                            var t = n.getCursor();
                            e.innerHTML = t.line + ":" + t.ch
                        }) : "autosave" === s && (o = function (e) {
                            void 0 != t.autosave && t.autosave.enabled === !0 && e.setAttribute("id", "autosaved")
                        }), a.push({className: s, defaultValue: o, onUpdate: r})
                    }
                    var l = document.createElement("div");
                    for (l.className = "editor-statusbar", i = 0; i < a.length; i++) {
                        var c = a[i], u = document.createElement("span");
                        u.className = c.className, "function" == typeof c.defaultValue && c.defaultValue(u), "function" == typeof c.onUpdate && this.codemirror.on("update", function (e, t) {
                            return function () {
                                t.onUpdate(e)
                            }
                        }(u, c)), l.appendChild(u)
                    }
                    var d = this.codemirror.getWrapperElement();
                    return d.parentNode.insertBefore(l, d.nextSibling), l
                }
            }, H.prototype.value = function (e) {
                return void 0 === e ? this.codemirror.getValue() : (this.codemirror.getDoc().setValue(e), this)
            }, H.toggleBold = c, H.toggleItalic = u, H.toggleStrikethrough = d, H.toggleBlockquote = f, H.toggleHeadingSmaller = p, H.toggleHeadingBigger = m, H.toggleHeading1 = g, H.toggleHeading2 = v, H.toggleHeading3 = y, H.toggleCodeBlock = h, H.toggleUnorderedList = b, H.toggleOrderedList = x, H.cleanBlock = w, H.drawLink = k, H.drawImage = C, H.drawTable = S, H.drawHorizontalRule = L, H.undo = T, H.redo = M, H.togglePreview = N, H.toggleSideBySide = _, H.toggleFullScreen = l, H.prototype.toggleBold = function () {
                c(this)
            }, H.prototype.toggleItalic = function () {
                u(this)
            }, H.prototype.toggleStrikethrough = function () {
                d(this)
            }, H.prototype.toggleBlockquote = function () {
                f(this)
            }, H.prototype.toggleHeadingSmaller = function () {
                p(this)
            }, H.prototype.toggleHeadingBigger = function () {
                m(this)
            }, H.prototype.toggleHeading1 = function () {
                g(this)
            }, H.prototype.toggleHeading2 = function () {
                v(this)
            }, H.prototype.toggleHeading3 = function () {
                y(this)
            }, H.prototype.toggleCodeBlock = function () {
                h(this)
            }, H.prototype.toggleUnorderedList = function () {
                b(this)
            }, H.prototype.toggleOrderedList = function () {
                x(this)
            }, H.prototype.cleanBlock = function () {
                w(this)
            }, H.prototype.drawLink = function () {
                k(this)
            }, H.prototype.drawImage = function () {
                C(this)
            }, H.prototype.drawTable = function () {
                S(this)
            }, H.prototype.drawHorizontalRule = function () {
                L(this)
            }, H.prototype.undo = function () {
                T(this)
            }, H.prototype.redo = function () {
                M(this)
            }, H.prototype.togglePreview = function () {
                N(this)
            }, H.prototype.toggleSideBySide = function () {
                _(this)
            }, H.prototype.toggleFullScreen = function () {
                l(this)
            }, H.prototype.isPreviewActive = function () {
                var e = this.codemirror, t = e.getWrapperElement(), n = t.lastChild;
                return /editor-preview-active/.test(n.className)
            }, H.prototype.isSideBySideActive = function () {
                var e = this.codemirror, t = e.getWrapperElement(), n = t.nextSibling;
                return /editor-preview-active-side/.test(n.className)
            }, H.prototype.isFullscreenActive = function () {
                var e = this.codemirror;
                return e.getOption("fullScreen")
            }, H.prototype.getState = function () {
                var e = this.codemirror;
                return s(e)
            }, H.prototype.toTextArea = function () {
                var e = this.codemirror, t = e.getWrapperElement();
                t.parentNode && (this.gui.toolbar && t.parentNode.removeChild(this.gui.toolbar), this.gui.statusbar && t.parentNode.removeChild(this.gui.statusbar), this.gui.sideBySide && t.parentNode.removeChild(this.gui.sideBySide)), e.toTextArea(), this.autosaveTimeoutId && (clearTimeout(this.autosaveTimeoutId), this.autosaveTimeoutId = void 0, this.clearAutosavedValue())
            }, t.exports = H
        }, {
            "./codemirror/tablist": 19,
            codemirror: 10,
            "codemirror-spell-checker": 4,
            "codemirror/addon/display/fullscreen.js": 5,
            "codemirror/addon/display/placeholder.js": 6,
            "codemirror/addon/edit/continuelist.js": 7,
            "codemirror/addon/mode/overlay.js": 8,
            "codemirror/addon/selection/mark-selection.js": 9,
            "codemirror/mode/gfm/gfm.js": 11,
            "codemirror/mode/markdown/markdown.js": 12,
            "codemirror/mode/xml/xml.js": 14,
            marked: 17
        }]
    }, {}, [20])(20)
}), function (e) {
    "use strict";
    function t(e, t) {
        this.el = e, this.documentsBag = t, this._init()
    }

    function n() {
        this._init()
    }

    function i(e, t) {
        this.uploader = t, this._init(e)
    }

    t.prototype = {
        _init: function () {
            this.documentsList = this.el.find("ul.library-documents"), this.documentDetails = this.el.find("div.library-details"), this.detailsHeader = $("#libraryDetails"), this.detailsTranslations = $("#libraryTranslations"), this.detailsTranslationsForm = $("#libraryTranslationsForm"), this.search = $("#librarySearch"), this.selected = $("#librarySelected"), this.total = $("#libraryTotal"), this.documentsBlackout = $("#libraryDocumentsBlackout"), this.detailsBlackout = $("#libraryDetailsBlackout"), this.detailsFlaps = this.detailsTranslations.find("li.compact-tabs__tab"), this.detailsTabs = this.detailsTranslations.find("div.sub-tab"), this.detailsurl = this.detailsTranslationsForm.attr("action"), this.retrieveurl = this.el.data("retrieveurl"), this.loadurl = this.el.data("loadurl"), this.searchurl = this.search.attr("action"), this.locale = this.el.data("locale"), this.locales = this.el.data("locales"), this.modal = new Modal(this.el), this.controller = null, this.searchActive = !1, this.isBooted = !1, this.mode = null, this.masterFilter = null, this.currentFilter = null, this.lastValue = null, this.offset = 0, this.take = 30, this.isLoading = !1, this.canLoadMode = !0, this._initUploader(), this._initEvents()
        }, _initUploader: function () {
            var e = this;
            this.dropzone = $("#libraryDropzone"), this.el.on("dragenter dragover", function (t) {
                t.preventDefault(), t.stopPropagation(), e.dropzone.addClass("dropzone--library-focus dropzone--focus")
            }), this.dropzone.on("dragleave", function () {
                $(this).removeClass("dropzone--library-focus dropzone--focus")
            }), this.dropzone.on("drop", function (e) {
                e.preventDefault(), $(this).removeClass("dropzone--library-focus dropzone--focus")
            }), this.uploader = new Uploader(this.dropzone, {
                outputList: "#libraryDocuments",
                indicatorClass: "LibraryIndicator",
                outputAppend: !1
            })
        }, _initEvents: function () {
            var e = this;
            this.documentsList.on("click", "li", function () {
                var t = $(this);
                t.hasClass("library-document--selected") || e.selectDocument(t), e._showDetails(t)
            }), this.selected.on("click", "li", function () {
                var t = e.documentsList.children('li[data-id="' + $(this).data("id") + '"]');
                e._showDetails(t)
            }), this.documentsList.on("click", ".library-document__select-label", function (t) {
                t.stopPropagation();
                var n = $(this).closest(".library-document");
                e._toggleDocument(n), e._showDetails(n)
            }), this.el.find("i.library__close").on("click", function () {
                e.modal.closeModal()
            }), this.detailsTranslationsForm.on("submit", function (t) {
                t.preventDefault(), t.stopPropagation(), e._editDocumentTranslations($(this).serializeArray())
            }), this.detailsFlaps.on("click", function () {
                e._changeDetailsTab($(this).data("locale"))
            }), $("#libraryButtons > .button--insert").on("click", function () {
                e._insertDocuments(), e.modal.closeModal()
            }), $("#libraryButtons > .button--clear").on("click", function () {
                e._deselectAll()
            }), this.search.on("submit", function (t) {
                t.preventDefault(), t.stopPropagation();
                var n = $(this).find('input[name="q"]'), i = n.val().trim();
                e._search(i)
            }), this.search.children('input[name="q"]').on("keydown", function (t) {
                27 === t.keyCode && (t.stopPropagation(), "" === $(this).val().trim() && $(this).blur(), e._search(""), e.searchActive = !1)
            }), $("#libraryFilter").on("change", function () {
                null === e.masterFilter && e._filterDocuments($(this).val())
            }), this.el.find("div.library-column__inner--documents").on("scroll", function () {
                e.documentsList.height() - $(this).height() - $(this).scrollTop() - 300 <= 0 && e._load()
            })
        }, run: function (e) {
            this.modal.openModal(), this.isBooted || (this.isBooted = !0, this._expandDocumentsBag(), this._load());
            var t = !1;
            this.controller !== e && (this.controller = e, this.mode = e.mode, this._reset(), this._setMasterFilter(e.filter), this._anyDocuments(), t = !0);
            var n = this.controller.getValue();
            (t || this.lastValue !== n) && (this._deselectAll(), this._selectDocuments(n), this._initSelectedSortable()), this.lastValue = n
        }, _reset: function () {
            var e = this.documentsList.parent();
            e.scrollTop(0), e.perfectScrollbar("update"), this.selected.hasClass("ui-sortable") && this.selected.sortable("destroy"), this.documentDetails.addClass("library-details--empty"), this._search(""), this._filterDocuments("all"), this._deselectAll(), this._sortDocuments()
        }, _setMasterFilter: function (e) {
            return "all" === e ? (this.masterFilter = null, this.documentsList.children("li").removeClass("library-document--force-filtered"), void this.el.find(".library-column__tool--filter").removeClass("library-column__tool--disabled")) : (this.masterFilter = e, this.el.find(".library-column__tool--filter").addClass("library-column__tool--disabled"), this.documentsList.children("li").addClass("library-document--force-filtered"), void this.documentsList.children('li[data-type="' + e + '"]').removeClass("library-document--force-filtered"))
        }, _expandDocumentsBag: function () {
            var e = this.documentsBag.getDocuments();
            for (var t in e) {
                var n = e[t];
                this.createDocument(n.id, n.name, n.type, n.thumbnail, !0)
            }
        }, createDocument: function (e, t, n, i, r) {
            if (!(this.documentsList.children('li[data-id="' + e + '"]').length > 0)) {
                var o = $('<li class="library-document" data-id="' + e + '" data-type="' + n + '"></li>');
                return $('<div class="library-document__select-label"><i class="library-document__select-icon icon-checkbox-checked"></i><i class="library-document__select-icon icon-checkbox-unchecked"></i></div>').appendTo(o), $(i).appendTo(o), $('<p class="library-document__name">' + t + "</p>").appendTo(o), null !== this.masterFilter && this.masterFilter !== n ? o.addClass("library-document--force-filtered") : null !== this.currentFilter && this.currentFilter !== n && o.addClass("library-document--filtered"), r ? void this.documentsList.append(o) : o
            }
        }, _load: function () {
            var e = this;
            e.isLoading || e.searchActive || !this.canLoadMode || (e.isLoading = !0, $.getJSON(e.loadurl, {offset: e.offset}, function (t) {
                t.remaining <= 0 && (e.canLoadMode = !1), e._populateLibrary(t.documents), e._anyDocuments(), e.isLoading = !1, e.offset += e.take
            }))
        }, _populateLibrary: function (e) {
            for (var t in e) {
                var n = e[t];
                this.createDocument(n.id, n.name, n.type, n.thumbnail, !0), this.documentsBag.addDocument(n.id, n)
            }
            this.documentsList.parent().perfectScrollbar("update")
        }, _sortDocuments: function () {
            this.documentsList.find("li").sort(function (e, t) {
                return +t.getAttribute("data-id") - +e.getAttribute("data-id")
            }).appendTo(this.documentsList)
        }, _anyDocuments: function () {
            this.documentsList.children("li:not(.library-document--hidden,.library-document--force-filtered)").length > 0 ? $("#libraryDocumentsMessage").removeClass("library-column__message-container--active") : $("#libraryDocumentsMessage").addClass("library-column__message-container--active")
        }, _filterDocuments: function (e) {
            return "all" === e ? (this.currentFilter = null, void this.documentsList.children("li").removeClass("library-document--filtered")) : (this.documentsList.children("li").addClass("library-document--filtered"), this.currentFilter = e, void this.documentsList.children('li[data-type="' + e + '"]').removeClass("library-document--filtered"))
        }, _showDetails: function (e) {
            this.documentDetails.removeClass("library-details--empty"), this.documentsList.children("li").removeClass("library-document--detailed"), this.selected.children("li").removeClass("library-document--detailed"), e.addClass("library-document--detailed"), this.selected.children('li[data-id="' + e.data("id") + '"]').addClass("library-document--detailed");
            var t = this.documentDetails.parent();
            t.scrollTop(0), t.perfectScrollbar("update"), this._populateDetails(e.data("id"))
        }, _populateDetails: function (e) {
            var t = this.documentsBag.getDocument(e);
            this.detailsHeader.html(""), $('<div class="library-details__preview">' + t.preview + "</div>").appendTo(this.detailsHeader), $('<div class="library-details__name">' + t.name + "</div>").appendTo(this.detailsHeader), $(t.meta).appendTo(this.detailsHeader), this._changeDetailsTab(this.locale), this._populateTranslationForm(t)
        }, _populateTranslationForm: function (e) {
            this.detailsTranslationsForm.find('input[name="document"]').val(e.id);
            for (var t in this.locales) {
                var n = this.locales[t], i = e[n];
                this.detailsTranslationsForm.find('input[name="' + n + '[caption]"]').val(i ? i.caption : ""), this.detailsTranslationsForm.find('textarea[name="' + n + '[description]"]').val(i ? i.description : ""), this.detailsTranslationsForm.find('input[name="' + n + '[alttext]"]').val(i ? i.alttext : "")
            }
        }, _insertDocuments: function () {
            var e = "";
            if ("document" === this.mode) {
                var t = this.selected.children("li:first-child");
                1 == t.length && (e = t.data("id"))
            } else {
                for (var n = [], i = this.selected.children(), r = 0; r < i.length; r++)n.push($(i[r]).data("id"));
                e = n
            }
            this.lastValue = "document" === this.mode ? e : JSON.stringify(e), this.controller.setValue(e)
        }, _deselectAll: function () {
            this.documentsList.children("li").removeClass("library-document--selected library-document--detailed"), this.selected.empty(), this.total.text(0), this.documentDetails.addClass("library-details--empty")
        }, _selectDocuments: function (e) {
            if ("" !== e && "[]" !== e && 0 != e) {
                if ("document" === this.mode) {
                    var t = this.documentsList.children('li[data-id="' + e + '"]');
                    return this.selectDocument(t), void this._showDetails(t)
                }
                e = JSON.parse(e);
                for (var n in e) {
                    var t = this.documentsList.children('li[data-id="' + e[n] + '"]');
                    this.selectDocument(t)
                }
            }
        }, selectDocument: function (e) {
            var t = e.data("type");
            if (null === this.masterFilter || t === this.masterFilter) {
                "document" === this.mode && this._deselectAll(), e.addClass("library-document--selected");
                var n = $('<li class="library-document library-document--compact" data-id="' + e.data("id") + '"></li>');
                e.children(".document-thumbnail").clone().appendTo(n), this.selected.append(n), this.total.text(this.selected.children().length)
            }
        }, _deselectDocument: function (e) {
            e.removeClass("library-document--selected"), this.selected.children('li[data-id="' + e.data("id") + '"]').remove(), this.total.text(this.selected.children().length)
        }, _toggleDocument: function (e) {
            e.hasClass("library-document--selected") ? this._deselectDocument(e) : this.selectDocument(e)
        }, _search: function (e) {
            if ("" === e)return this.documentsList.children("li").removeClass("library-document--hidden"), this.searchActive = !1, void this._anyDocuments();
            this.searchActive = !0;
            var t = this, n = this.documentsList.parent();
            this._disableDocumentsList(), $.post(this.searchurl, {q: e}, function (e) {
                if (t._enableDocumentsList(), t.documentsList.children("li").addClass("library-document--hidden"), n.scrollTop(0), n.perfectScrollbar("update"), e.documents.length > 0) {
                    t._populateLibrary(e.documents);
                    var i = 'li[data-id="' + e.ids.join('"],li[data-id="') + '"]';
                    t.documentsList.children(i).removeClass("library-document--hidden")
                }
                t._anyDocuments()
            }, "json")
        }, _enableDocumentsList: function () {
            this.documentsBlackout.removeClass("library-column__blackout--active")
        }, _disableDocumentsList: function () {
            this.documentsBlackout.addClass("library-column__blackout--active")
        }, _enableDetails: function () {
            this.detailsBlackout.removeClass("library-column__blackout--active")
        }, _disableDetails: function () {
            this.detailsBlackout.addClass("library-column__blackout--active")
        }, _initSelectedSortable: function () {
            "document" !== this.mode && this.selected.sortable({
                cursor: "move",
                tolerance: "pointer",
                placeholder: "placeholder",
                opacity: .7,
                delay: 50,
                scroll: !1
            })
        }, _changeDetailsTab: function (e) {
            this.detailsFlaps.removeClass("compact-tabs__tab--active"), this.detailsTabs.removeClass("sub-tab--active"), this.detailsFlaps.siblings(".compact-tabs__tab--" + e).addClass("compact-tabs__tab--active"), this.locales.length > 1 ? this.detailsTabs.siblings(".sub-tab--" + e).addClass("sub-tab--active") : this.detailsTabs.addClass("sub-tab--active")
        }, _editDocumentTranslations: function (e) {
            var t = this;
            this._disableDetails(), $.post(this.detailsurl, e, function (e) {
                t._enableDetails(), t.documentsBag.addDocument(e.id, e)
            })
        }
    }, e.DocumentsLibrary = t, n.prototype = {
        _init: function () {
            this.bag = []
        }, addDocument: function (e, t) {
            "string" == typeof t && (t = JSON.parse(t)), this.bag[e] = t
        }, getDocument: function (e) {
            return this.bag[e]
        }, getDocuments: function () {
            return this.bag
        }
    }, e.DocumentsBag = n, inheritsFrom(i, UploadIndicator), i.prototype._init = function (e) {
        this.container = $('<li class="library-document"></li>'), this.progress = $('<div class="upload__progress"></div>').appendTo(this.container), this.progressBar = $('<div class="upload__progress-bar"></div>').appendTo(this.progress), this.thumbnail = $('<div class="document-thumbnail"></div>').appendTo(this.container), this.filename = $('<p class="library-document__name">' + html_entities(e.name) + "</p>").appendTo(this.container)
    }, i.prototype._success = function (t) {
        t = t.summary, e.documentsBag.addDocument(t.id, t), this.container.replaceWith(e.documentsLibrary.createDocument(t.id, t.name, t.type, t.thumbnail, !1));
        var n = e.documentsLibrary;
        n.selectDocument(n.documentsList.children('li[data-id="' + t.id + '"]'))
    }, i.prototype._error = function (e) {
        this.container.remove()
    }, e.LibraryIndicator = i
}(window), function (e) {
    "use strict";
    function t(e, t, n) {
        this.el = e, this.library = t, this.documentsBag = n, this._init()
    }

    function n(e, t) {
        this.uploader = t, this._init(e)
    }

    t.prototype = {
        _init: function () {
            this.input = this.el.find('input[type="hidden"]'), this.container = this.el.find(".form-group__gallery-container"), this.libraryButton = this.el.find(".form-group__buttons > .button--library"), this.clearButton = this.el.find(".form-group__buttons > .button--clear"), this.gallery = this.el.find("ul.form-group__gallery"), this.mode = "gallery", this.filter = "image", this._populateDocumentsBag(), this._initUploader(), this._initEvents()
        }, _initUploader: function () {
            var e = this;
            this.dropzone = this.container.find("div.dropzone"), this.container.on("dragenter dragover", function (t) {
                t.preventDefault(), t.stopPropagation(), e.dropzone.addClass("dropzone--library-focus dropzone--focus")
            }), this.dropzone.on("dragleave", function () {
                $(this).removeClass("dropzone--library-focus dropzone--focus")
            }), this.dropzone.on("drop", function (e) {
                e.preventDefault(), $(this).removeClass("dropzone--library-focus dropzone--focus")
            }), this.uploader = new Uploader(this.dropzone, {
                outputList: this.gallery,
                indicatorClass: "GalleryIndicator",
                isDropzoneForm: !1
            }), this.uploader.controller = this
        }, _populateDocumentsBag: function () {
            for (var e = this.gallery.find("li.form-group__slide"), t = 0; t < e.length; t++) {
                var n = e.eq(t);
                this.documentsBag.addDocument(n.data("id"), n.data("summary")), n.attr("data-summary", "")
            }
        }, _initEvents: function () {
            var e = this;
            this.gallery.sortable({
                cursor: "move",
                tolerance: "pointer",
                placeholder: "placeholder",
                opacity: .7,
                delay: 50,
                stop: function () {
                    e.refreshInput()
                }
            }), Modernizr.touch || this.gallery.on("click", ".icon-cancel", function () {
                var t = $(this).parent();
                $(t).remove(), e.refreshInput()
            }), this.clearButton.on("click", function (t) {
                e._clearGallery(), t.preventDefault(), t.stopPropagation()
            }), this.libraryButton.on("click", function (t) {
                e.library.run(e), t.preventDefault(), t.stopPropagation()
            })
        }, _clearGallery: function () {
            this.input.val(""), this.gallery.html(""), this.container.addClass("empty")
        }, refreshInput: function () {
            var e = this.gallery.sortable("toArray", {attribute: "data-id"});
            this.input.val(JSON.stringify(e)), 0 === this.gallery.children("li").length ? this.container.addClass("empty") : this.container.removeClass("empty")
        }, getValue: function () {
            return this.input.val()
        }, setValue: function (e) {
            if (this._clearGallery(), e.length > 0) {
                this.container.removeClass("empty"), this.gallery.html("");
                for (var t = 0; t < e.length; t++)this._createSlide(e[t]);
                this.input.val(JSON.stringify(e))
            }
        }, _createSlide: function (e) {
            var e = this.documentsBag.getDocument(e), t = $('<li class="form-group__slide" data-id="' + e.id + '" data-type="image" title="' + html_entities(e.name) + '"><i class="icon-cancel"></i></li>');
            $(e.thumbnail).prependTo(t), this.gallery.append(t)
        }
    }, e.Gallery = t, inheritsFrom(n, UploadIndicator), n.prototype._init = function (e) {
        this.container = $('<li class="form-group__slide"></li>'), this.progress = $('<div class="upload__progress"></div>').appendTo(this.container), this.progressBar = $('<div class="upload__progress-bar"></div>').appendTo(this.progress), this.thumbnail = $('<div class="document-thumbnail"></div>').appendTo(this.container)
    }, n.prototype._success = function (t) {
        return t = t.summary, e.documentsBag.addDocument(t.id, t), e.documentsLibrary.createDocument(t.id, t.name, t.type, t.thumbnail, !0), "image" !== t.type ? void this.container.remove() : (this.container.attr("data-id", t.id), this.container.attr("data-type", t.type), this.container.attr("title", html_entities(t.name)), this.container.append($('<i class="icon-cancel"></i>')), this.thumbnail.replaceWith(t.thumbnail), void this.uploader.controller.refreshInput())
    }, n.prototype._error = function (e) {
        this.container.remove()
    }, e.GalleryIndicator = n
}(window), function (e) {
    "use strict";
    function t(e, t, n) {
        this.el = e, this.library = t, this.documentsBag = n, this._init()
    }

    t.prototype = {
        _init: function () {
            this.input = this.el.find('input[type="hidden"]'), this.container = this.el.find(".form-group__document-container"), this.libraryButton = this.el.find(".form-group__buttons > .button--library"), this.clearButton = this.el.find(".form-group__buttons > .button--clear"), this.document = this.el.find("figure.form-group__document"), this.mode = "document", this.filter = this.container.data("filter"), this._populateDocumentsBag(), this._initEvents()
        }, _populateDocumentsBag: function () {
            this.document.data("id") && (e.documentsBag.addDocument(this.document.data("id"), this.document.data("summary")), this.document.attr("data-summary", ""))
        }, _initEvents: function () {
            var e = this;
            this.clearButton.on("click", function (t) {
                e._clearDocument(), t.preventDefault(), t.stopPropagation()
            }), this.libraryButton.on("click", function (t) {
                e.library.run(e), t.preventDefault(), t.stopPropagation()
            })
        }, _clearDocument: function () {
            this.input.val(""), this.container.addClass("empty")
        }, getValue: function () {
            return this.input.val()
        }, setValue: function (e) {
            if (null !== e && "" !== e) {
                this.container.removeClass("empty"), this.input.val(e);
                var e = this.documentsBag.getDocument(e);
                this.container.children("figure").remove();
                var t = $('<figure class="form-group__document" data-id="' + e.id + '" data-type="' + e.type + '"></figure>');
                $("<span>" + e.thumbnail + "</span>").appendTo(t), $('<figcaption class="form-group__document-title">' + e.name + "</figcaption>").appendTo(t), this.container.prepend(t)
            } else this._clearDocument()
        }
    }, e.Document = t
}(window), function (e) {
    "use strict";
    function t(e) {
        this.el = e, this._init()
    }

    function n() {
        this._init()
    }

    function i(e) {
        this._init(e)
    }

    function r(e) {
        this._init(e)
    }

    t.prototype = {
        _init: function () {
            this.textarea = this.el.children("textarea")[0], this._initEditor(), this._initDialog(), this.toolbar = this.el.children(".editor-toolbar"), this._initEvents()
        }, _initEvents: function () {
            var t = this;
            $(e).on("scroll.editor", function () {
                t._locateToolbar()
            }), $(document).on("keydown.mde_" + $(this.textarea).attr("name"), function (e) {
                e.stopPropagation(), 27 === e.which && setTimeout(function () {
                    t._locateToolbar()
                }, 0)
            })
        }, _initDialog: function () {
            this.dialog = new n
        }, _locateToolbar: function () {
            if (this.toolbar.hasClass("fullscreen"))return void this.toolbar.css("top", 0);
            var t = $(e).scrollTop(), n = this.el.offset().top;
            n < t && t < n + this.el.outerHeight() - 30 ? this.toolbar.css("top", String(t - n) + "px") : this.toolbar.css("top", 0)
        }, markdown: function (e) {
            for (var t, n = /[\^]((?:\\\\\^|[^\^\n\r])+?)[\^]/g; null !== (t = n.exec(e));)t.index === n.lastIndex && n.lastIndex++, e = e.replace(t[0], "<sup>" + t[1] + "</sup>");
            return e = e.replace(/[~]((?:\\\\\~|[^~\n\r])+?)[~](?![~])/g, "<sub>$1</sub>").replace(/\[([^\]]+)\]\(([^)]+)\)\{blank\}/g, '<a href="$2" target="_blank">$1</a>'), this.mde.markdown(e)
        }, _initEditor: function () {
            var t = this;
            this.mde = new SimpleMDE({
                element: this.textarea,
                spellChecker: !1,
                status: !1,
                previewRender: function (e) {
                    return t.markdown(e)
                },
                toolbar: [{
                    name: "bold",
                    className: "icon-bold",
                    title: e.editorTooltips.bold,
                    action: SimpleMDE.toggleBold
                }, {
                    name: "italic",
                    className: "icon-italic",
                    title: e.editorTooltips.italic,
                    action: SimpleMDE.toggleItalic
                }, {
                    name: "strikethrough",
                    className: "icon-strikethrough",
                    title: e.editorTooltips.strikethrough,
                    action: SimpleMDE.toggleStrikethrough
                }, {
                    name: "heading-3",
                    className: "icon-heading",
                    title: e.editorTooltips.heading,
                    action: SimpleMDE.toggleHeading3
                }, "|", {
                    name: "link", className: "icon-anchor", title: e.editorTooltips.link, action: function (e) {
                        t.dialog.run("link", e)
                    }
                }, {
                    name: "media", className: "icon-image", title: e.editorTooltips.media,
                    action: function (e) {
                        t.dialog.run("media", e)
                    }
                }, "|", {
                    name: "quote",
                    className: "icon-quote",
                    title: e.editorTooltips.quote,
                    action: SimpleMDE.toggleBlockquote
                }, {
                    name: "unordered-list",
                    className: "icon-list-bullet",
                    title: e.editorTooltips.list_unordered,
                    action: SimpleMDE.toggleUnorderedList
                }, {
                    name: "ordered-list",
                    className: "icon-list-number",
                    title: e.editorTooltips.list_ordered,
                    action: SimpleMDE.toggleOrderedList
                }, {
                    name: "code",
                    className: "icon-code",
                    title: e.editorTooltips.code,
                    action: SimpleMDE.toggleCodeBlock
                }, "|", {
                    name: "subscript",
                    className: "icon-subscript",
                    title: e.editorTooltips.subscript,
                    action: function (e) {
                        var t = e.codemirror, n = t.getSelection();
                        t.replaceSelection("~" + n + "~")
                    }
                }, {
                    name: "superscript",
                    className: "icon-superscript",
                    title: e.editorTooltips.superscript,
                    action: function (e) {
                        var t = e.codemirror, n = t.getSelection();
                        t.replaceSelection("^" + n + "^")
                    }
                }, {
                    name: "table",
                    className: "icon-table",
                    title: e.editorTooltips.table,
                    action: SimpleMDE.drawTable
                }, {
                    name: "horizontal-rule",
                    className: "icon-minus",
                    title: e.editorTooltips.horizontal_rule,
                    action: SimpleMDE.drawHorizontalRule
                }, {
                    name: "readmore",
                    className: "icon-ellipsis-horizontal",
                    title: e.editorTooltips.readmore,
                    action: function (e) {
                        var t = e.codemirror;
                        t.replaceSelection("\n\n![READMORE]!\n\n")
                    }
                }, "|", {
                    name: "preview",
                    className: "icon-eye no-disable",
                    title: e.editorTooltips.preview,
                    action: SimpleMDE.togglePreview
                }, {
                    name: "side-by-side",
                    className: "icon-columns no-disable no-mobile",
                    title: e.editorTooltips.side_by_side,
                    action: function (e) {
                        t.mde.toggleSideBySide(e), setTimeout(function () {
                            t._locateToolbar()
                        }, 0)
                    }
                }, {
                    name: "fullscreen",
                    className: "icon-expand no-disable no-mobile",
                    title: e.editorTooltips.fullscreen,
                    action: function (e) {
                        t.mde.toggleFullScreen(e), setTimeout(function () {
                            t._locateToolbar()
                        }, 0)
                    }
                }, {
                    name: "guide",
                    className: "icon-status-info",
                    title: e.editorTooltips.markdown,
                    action: "https://simplemde.com/markdown-guide"
                }]
            })
        }
    }, e.MarkdownEditor = t, n.prototype = {
        _init: function () {
            var t = this;
            this.el = $(".modal--editor").first(), this.modalInner = this.el.find(".modal__inner").first(), this.link_url = this.modalInner.find('input[name="link_url"]').first(), this.link_title = this.modalInner.find('input[name="link_title"]').first(), this.link_blank = this.modalInner.find('input[name="link_blank"]').first(), this.image_url = this.modalInner.find('input[name="image_url"]').first(), this.image_alttext = this.modalInner.find('input[name="image_alttext"]').first(), this.gallery_button = this.modalInner.find("button.button--gallery"), this.document_button = this.modalInner.find("button.button--document"), this.gallery_controller = new i(e.documentsLibrary), this.document_controller = new r(e.documentsLibrary), this.modal = new Modal(this.el, {
                onConfirmEvent: function (e) {
                    t._insert()
                }
            }), this.mode = null, this.editor = null, this._initEvents()
        }, _initEvents: function () {
            var e = this;
            this.gallery_button.on("click", function () {
                e.modal.closeModal(), e.gallery_controller.run(e.editor)
            }), this.document_button.on("click", function () {
                e.modal.closeModal(), e.document_controller.run(e.editor)
            })
        }, run: function (e, t) {
            this._reset(), this._setMode(e), this.editor = t, this.modal.openModal(), this._populateByMode()
        }, _reset: function () {
            this.modalInner.removeClass("editor-modal--link editor-modal--media"), this.link_url.val(""), this.link_title.val(""), this.link_blank.attr("checked", !1), this.image_url.val(""), this.image_alttext.val("")
        }, _setMode: function (e) {
            this.mode = e, this.modalInner.addClass("editor-modal--" + e)
        }, _populateByMode: function () {
            var e = this.editor.codemirror;
            "link" === this.mode ? (this.link_title.val(e.getSelection()), this.link_url.focus()) : "media" === this.mode && (this.image_url.val(e.getSelection()), this.image_alttext.focus())
        }, _insert: function () {
            "link" === this.mode ? this._insertLink() : "media" === this.mode && this._insertImage()
        }, _insertLink: function () {
            var e = add_http(this.link_url.val()), t = this.link_title.val().length > 0 ? this.link_title.val() : this.link_url.val(), n = "[" + t + "](" + e + ")";
            this.link_blank.is(":checked") && (n += "{blank}"), this.editor.codemirror.replaceSelection(n)
        }, _insertImage: function () {
            this.editor.codemirror.replaceSelection("![" + this.image_alttext.val() + "](" + this.image_url.val() + ")")
        }
    }, e.MarkdownEditorDialog = n, i.prototype = {
        _init: function (e) {
            this.library = e, this.editor = null, this.mode = "gallery", this.filter = "image"
        }, run: function (e) {
            this.editor = e, this.library.run(this)
        }, getValue: function () {
            return ""
        }, setValue: function (e) {
            this.editor.codemirror.replaceSelection('\n[gallery ids="' + e.join(",") + '"]\n')
        }
    }, e.MarkdownEditorGallery = i, r.prototype = {
        _init: function (e) {
            this.library = e, this.editor = null, this.mode = "document", this.filter = "all"
        }, run: function (e) {
            this.editor = e, this.library.run(this)
        }, getValue: function () {
            return ""
        }, setValue: function (e) {
            this.editor.codemirror.replaceSelection('\n[document id="' + e + '"]\n')
        }
    }, e.MarkdownEditorDocument = r
}(window), window.documentsBag = new DocumentsBag, window.documentsLibrary = new DocumentsLibrary($("#libraryModal"), window.documentsBag), $(".form-group--gallery").each(function () {
    new Gallery($(this), window.documentsLibrary, window.documentsBag)
}), $(".form-group--document").each(function () {
    new Document($(this), window.documentsLibrary, window.documentsBag)
}), $(".form-group__markdown").each(function () {
    new MarkdownEditor($(this))
});