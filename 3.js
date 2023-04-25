var __extends = this && this.__extends || function() {
        var a = function(b, c) {
            return (a = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(a, b) {
                    a.__proto__ = b
                } || function(a, b) {
                    for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
                })(b, c)
        };
        return function(b, c) {
            function d() {
                this.constructor = b
            }
            if ("function" != typeof c && null !== c) throw new TypeError("Class extends value " + String(c) + " is not a constructor or null");
            a(b, c), b.prototype = null === c ? Object.create(c) : (d.prototype = c.prototype, new d)
        }
    }(),
    WingsV4Background = function() {
        function a(a) {
            for (var b = a.display.getAllTileSprite("bg"), c = b.length, d = 0; c > d; d++) {
                var e = b[d];
                0 == d ? (e.width = a.options.gameWidth, e.height = a.options.gameHeight, e.tileScale.x = e.tileScale.y = a.options.gameHeight / e.height) : (e.width = a.options.gameWidth, e.height = e.height * a.options.scaleAssets >> 0, e.tileScale.x = e.tileScale.y = a.options.scaleAssets), e.y = a.options.gameHeight - e.height << 0, a.add.existing(e)
            }
            for (var f = .01, g = .34, h = c > 1 ? (g - f) / (c - 1) : 0, d = 0; c > d; d++) {
                var e = b[d];
                e.ratioMove = f + h * d
            }
            this.move = function(a) {
                for (var d = 0; c > d; d++) {
                    var e = b[d];
                    e.tilePosition.x -= a * e.ratioMove
                }
            }, this.positionTilesY = function(a) {
                for (var d = 1; c > d; d++) {
                    var e = b[d];
                    e.y = a - e.height
                }
            }
        }
        return a
    }(),
    WingsV4FX = function() {
        function a(a, b, c, d) {
            var e = 0,
                f = 10,
                g = new Array(f),
                h = new Phaser.Graphics(a);
            h.beginFill(a.options.config.color_fx, .05), h.drawCircle(0, 0, 2 * d * a.options.scaleAssets << 0), h.endFill();
            for (var i = h.generateTexture(), j = 0; f > j; j++) {
                var k = new Phaser.Image(a, 0, 0, i);
                k.anchor.set(.5), k.alpha = 0, b.addChild(k), g[j] = k
            }
            this.update = function(a, b, c, d) {
                c *= .1;
                var h = g[e];
                h.x = a, h.y = b, h.scale.set(1), h.alpha = d, e++, e >= f && (e = 0);
                for (var i = 0; f > i; i++) {
                    var j = g[i];
                    j.alpha > 0 && (j.x -= 2 * c, j.alpha -= .1, j.scale.set(j.alpha))
                }
            }
        }
        return a
    }(),
    WingsV4Hero = function(a) {
        function b(b) {
            function c(a, c, d, e) {
                var f;
                return d ? (f = b.display.getSpriteSheetScaled(a, 1), f.animations.add(c, null, f.framerate, !0)) : f = b.display.getImageScaled(b.display.isGroupAvailable(a) ? a : e, 1), f.anchor.set(.5, i), f
            }
            var d, e, f, g = a.call(this, b, 0, 0, "") || this,
                h = "tinyWings" == b.options.config.gameplay,
                i = h ? 1 : .5,
                j = b.display.isAnimated("hero_run"),
                k = b.display.isAnimated("hero_jump"),
                l = h,
                m = l && b.display.isAnimated("hero_down"),
                n = !1,
                o = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0,
                t = !0;
            return g.anchor.set(.5, i), d = c("hero_run", "run", j, "hero_run"), g.addChild(d), e = c("hero_jump", "jump", k, "hero_run"), e.visible = !1, g.addChild(e), l && (f = c("hero_down", "down", l && m, "hero_run"), f.visible = !1, g.addChild(f)), p = d.width >> 1, q = h ? -(10 * b.options.scaleAssets << 0) : (d.height >> 1) - (10 * b.options.scaleAssets << 0), r = p, s = (d.height >> 1) - (10 * b.options.scaleAssets << 0), b.audio.add("hit", !1), b.audio.add("hero_jump", !1), b.audio.add("hero_run", !0), g.updateHero = function(a, c) {
                !t && c ? (t = !0, b.audio.unmute("hero_run"), d.visible = !0, e.visible = !1, l && (f.visible = !1)) : t && !c && (t = !1, b.audio.play("hero_jump"), b.audio.mute("hero_run"), l && (f.visible = !1), d.visible = !1, e.visible = !0), l && (a ? (f.visible = !0, d.visible = !1, e.visible = !1) : (d.visible = c, e.visible = !c, f.visible = !1)), n && (g.visible = o % 16 >= 8, o++, o > 64 && (n = !1, g.visible = !0))
            }, g.playAnimsAndSound = function() {
                b.audio.play("hero_run"), j && d.animations.play("run"), k && e.animations.play("jump"), m && f.animations.play("down")
            }, g.stopAnimsAndSound = function() {
                b.audio.stop("hero_run", 500), j && d.animations.stop("run"), k && e.animations.stop("jump"), m && f.animations.stop("down")
            }, g.blink = function() {
                b.audio.play("hit"), n = !0, o = 0
            }, g.backToNormal = function() {
                g.visible = !0, l && (f.visible = !1), d.visible = !0, e.visible = !1
            }, g.getRealHeight = function() {
                return d.height
            }, g.getMidH = function() {
                return q
            }, g.getMidW = function() {
                return p
            }, g.getCollisionH = function() {
                return s
            }, g.getCollisionW = function() {
                return r
            }, g
        }
        return __extends(b, a), b
    }(Phaser.Image),
    WingsV4Hud = function(a) {
        function b(b) {
            var c, d = a.call(this, b, 0, 0, "") || this,
                e = b.options.gameWidth >> 1,
                f = b.options.gameWidth - e >> 1,
                g = 20 * b.options.scaleX << 0,
                h = 20 * b.options.scaleY << 0,
                i = 4 * b.options.scaleY << 0,
                j = b.options.config.totalTime,
                k = new Phaser.Graphics(b);
            k.beginFill(b.options.config.color_hud_bar_back), k.drawRoundedRect(0, 0, e, h, i), k.endFill();
            var l = new Phaser.Image(b, f, g, k.generateTexture());
            d.addChild(l), k.destroy();
            var m = new Phaser.Graphics(b);
            m.beginFill(b.options.config.color_hud_bar), m.drawRoundedRect(0, 0, e, h, i), m.endFill();
            var n = new Phaser.Image(b, f, g, m.generateTexture());
            d.addChild(n), m.destroy();
            var o = new Phaser.Graphics(b);
            o.beginFill(16711680), o.drawRect(0, 0, e, h), o.endFill(), o.x = f, o.y = g, d.addChild(o), n.mask = o;
            var p = b.display.getImageScaled("hud_multiplicator", b.options.scaleY);
            return p.anchor.set(.5), p.x = b.options.gameWidth - (p.width >> 1) - (10 * b.options.scaleX << 0), p.y = 50 * b.options.scaleY + (p.height >> 1), p.visible = !1, d.addChild(p), b.options.isBoxInterface && (d.showScore = function() {}, d.showDistance = function() {}, d.showCoins = function() {}), d.start = function(a) {
                c = new TweenMax(o.scale, j, {
                    x: 0,
                    onComplete: a,
                    ease: Linear.easeNone
                })
            }, d.showScore = function(a) {
                null != b.options.callback && null != b.options.callback.updateScore ? b.options.callback.updateScore(a) : "function" == typeof updateScore && updateScore(a)
            }, d.showDistance = function(a) {
                null != b.options.callback && null != b.options.callback.updateDistance ? b.options.callback.updateDistance(a) : "function" == typeof updateDistance && updateDistance(a)
            }, d.showCoins = function(a) {
                null != b.options.callback && null != b.options.callback.updateCoins ? b.options.callback.updateCoins(a) : "function" == typeof updateCoins && updateCoins(a)
            }, d.pause = function() {
                c.timeScale(.2)
            }, d.resume = function() {
                c.timeScale(1)
            }, d.showMultiplicator = function(a) {
                a ? (p.visible = a, p.scale.set(0), TweenMax.to(p.scale, .46, {
                    x: 1,
                    y: 1,
                    ease: Back.easeOut
                })) : TweenMax.to(p.scale, .46, {
                    x: 0,
                    y: 0,
                    ease: Back.easeIn,
                    onComplete: function() {
                        p.visible = !1
                    }
                })
            }, d.addTime = function(a) {
                var b = c.time(),
                    d = b - a;
                0 >= d && (d = 0), c.time(d)
            }, d
        }
        return __extends(b, a), b
    }(Phaser.Image),
    WingsV4LevelTile = function(a) {
        function b(b, c, d, e, f, g, h) {
            function i(a) {
                for (var b = a.length, c = Math.PI, d = Math.cos, e = new Array, f = 0; b > f; f++) {
                    var g = a[f];
                    if (b > f + 1)
                        for (var h = a[f + 1], i = h.x - g.x, j = 0; i > j; j++) {
                            var k = g.y + h.y >> 1,
                                l = g.y - h.y >> 1,
                                m = c / i,
                                n = k + l * d(m * j);
                            n = (100 * n << 0) / 100, e[e.length] = n
                        }
                }
                return e
            }
            for (var j = a.call(this, b, 0, 0, "") || this, k = h.length, l = 0; k > l; l++) {
                var m = h[l];
                m.x *= e, m.y *= g
            }
            j.aPositions = i(h), j.levelWidth = e;
            var n, o = new Phaser.Graphics(b),
                p = new Phaser.Graphics(b),
                q = 20 * b.options.scaleAssets << 0,
                r = j.aPositions[0];
            o.beginFill(0), p.beginFill(0), o.moveTo(0, r), p.moveTo(0, r);
            for (var s = e, l = 8; s > l; l += 8) n = j.aPositions[l], o.lineTo(l, n), p.lineTo(l, n);
            n = j.aPositions[s - 1], o.lineTo(s, n), p.lineTo(s, n), p.lineTo(s, n + q);
            for (var l = s - 1; l > 8; l -= 8) p.lineTo(l, j.aPositions[l] + q);
            p.lineTo(0, r + q), p.lineTo(0, r), p.endFill(), o.lineTo(s, f), o.lineTo(0, f), o.lineTo(0, r), o.endFill();
            var t = new Phaser.Image(b, 0, 0, o.generateTexture()),
                u = t.height,
                v = f - u,
                w = new Phaser.Image(b, 0, 0, p.generateTexture()),
                x = w.height,
                y = v,
                z = new Phaser.BitmapData(b, "levelGround", e, f);
            z.alphaMask(c, t, null, new Phaser.Rectangle(0, v, e, u));
            var A = new Phaser.BitmapData(b, "levelRoad", e, f);
            A.alphaMask(d, w, null, new Phaser.Rectangle(0, y, e, x));
            var B = new Phaser.BitmapData(b, "levelAll", e, f);
            try {
                B.draw(z), B.draw(A)
            } catch (C) {}
            var D = new Phaser.Image(b, 0, 0, B);
            j.addChild(D), t.destroy(), w.destroy(), z.destroy(), A.destroy();
            var E = b.display.getAllImagesScaled("decor", b.options.scaleAssets);
            if (null != E && E.length > 0)
                for (var F = E.length, l = 0; 2 > l; l++) {
                    var G = E[b.rnd.integerInRange(0, F - 1)];
                    G.x = b.rnd.integerInRange(.1 * e, .9 * e), G.y = j.aPositions[G.x] + 20 * b.options.scaleAssets << 0, G.anchor.set(.5, 1), j.addChildAt(G, 0)
                }
            return j.getPosition = function(a) {
                return j.aPositions[-j.x + a << 0]
            }, j
        }
        return __extends(b, a), b
    }(Phaser.Image),
    WingsV4Item = function(a) {
        function b(b, c, d, e, f, g, h, i) {
            var j = a.call(this, b, 0, 0, c) || this,
                k = !1,
                l = !1,
                m = 1,
                n = !1,
                o = j.width >> 1,
                p = j.height >> 1;
            return j.anchor.set(.5), j.animate = function() {
                l && (m -= .2, 0 >= m ? (l = !1, this.visible = !1) : this.scale.set(m))
            }, j.replaceOnRoad = function(a) {
                this.reset(), l = !1, k = !1, this.visible = !1, m = 1, n = !1, this.posX = a, this.scale.set(m)
            }, j.collide = function() {
                k = !0, l = !0
            }, j.forceKill = function() {
                k = !1, l = !1, this.visible = !1, this.kill()
            }, j.move = function(a, b, c) {
                if (this.alive)
                    if (this.posX -= a, n) {
                        if (this.posX < -o) this.forceKill();
                        else if (!k && this.posX < i) {
                            var d = this.posX,
                                j = this.y,
                                l = o,
                                m = p;
                            b + f > d - l && d + l > b - f && c + g > j - m && j + m > c - g && this.act(this.isJump)
                        }
                        this.animate(), this.x = this.posX
                    } else this.posX < h + o && e(this)
            }, j.isCollide = function() {
                return k
            }, j.getMidW = function() {
                return o
            }, j.getMidH = function() {
                return p
            }, j.getGapY = function() {
                return d
            }, j.getIsOnTheRoad = function() {
                return n
            }, j.setIsOnTheRoad = function(a) {
                n = a
            }, j
        }
        return __extends(b, a), b
    }(Phaser.Image),
    WingsV4ItemCoin = function(a) {
        function b(b, c, d, e, f, g, h, i, j) {
            var k = a.call(this, b, c, d, f, g, h, i, j) || this;
            return k.act = function() {
                k._onHitCallback(), k.collide()
            }, k._onHitCallback = e, k
        }
        return __extends(b, a), b
    }(WingsV4Item),
    WingsV4ItemObstacle = function(a) {
        function b(b, c, d, e, f, g, h, i, j) {
            var k = a.call(this, b, c, d, f, g, h, i, j) || this;
            return k.act = function(a) {
                a || (k._onHitCallback(), k.collide())
            }, k._onHitCallback = e, k
        }
        return __extends(b, a), b
    }(WingsV4Item),
    WingsV4ItemMultiplicator = function(a) {
        function b(b, c, d, e, f, g, h, i, j) {
            var k = a.call(this, b, c, d, f, g, h, i, j) || this;
            return k.act = function() {
                k._onHitCallback(), k.collide()
            }, k._onHitCallback = e, k
        }
        return __extends(b, a), b
    }(WingsV4Item),
    WingsV4LevelGenerator = function(a) {
        function b(b, c, d, e, f, g, h, i, j) {
            function k() {
                var a = new WingsV4LevelTile(b, T, W, B, t, K.levelAmplitude, Y[ca]);
                a.y = -K.levelAmplitude, a.visible = !1, K.addChildAt(a, 0), E[ca] = a, F[ca] = ca, ca++, ca >= Z ? m() : k()
            }

            function l(a) {
                var b = a.posX,
                    c = b > v.x && b <= v.x + v.levelWidth ? v : w,
                    d = b - c.x,
                    e = b + 1 - c.x,
                    f = -K.levelAmplitude + c.aPositions[d << 0],
                    g = -K.levelAmplitude + c.aPositions[e << 0];
                a.visible = !0, a.setIsOnTheRoad(!0), a.x = b, a.y = f - a.getMidH() + a.getGapY(), a.rotation = -Math.atan(f - g)
            }

            function m() {
                v = E[0], v.visible = !0, w = E[1], w.visible = !0, w.x = v.x + B, u = E.length, T.destroy(), W.destroy()
            }

            function n(a, j, k) {
                for (var m = b.display.getAllKeysScaled(a, b.options.scaleAssets), n = m.length, o = new Array, p = b.options.isMobile ? b.options.gameWidth * c * 1.2 << 0 : 810 * c * 1.2 << 0, q = g + h, r = 0; n > r && !(r >= j); r++) {
                    var s = void 0;
                    switch (a) {
                        case "coin":
                            s = new WingsV4ItemCoin(b, m[r], k, d, l, h, i, p, q);
                            break;
                        case "obstacle":
                            s = new WingsV4ItemObstacle(b, m[r], k, e, l, h, i, p, q);
                            break;
                        case "multiplicator":
                            s = new WingsV4ItemMultiplicator(b, m[r], k, f, l, h, i, p, q)
                    }
                    o[o.length] = s, K.addChild(s), s.forceKill()
                }
                return o
            }

            function o(a, b) {
                if (a != J) {
                    var c = p(L[a]);
                    null != c && c.replaceOnRoad(B + b)
                }
            }

            function p(a) {
                for (var b = a.length, c = 0; b > c; c++) {
                    var d = a[c];
                    if (!d.alive) return d
                }
                return null
            }

            function q() {
                return C++, C >= u && (C = 0, Phaser.ArrayUtils.shuffle(F)), E[F[C]].visible ? q() : E[F[C]]
            }
            var r, s, t, u, v, w, x, y = a.call(this, b, 0, 0, "") || this,
                z = 120 * b.options.scaleAssets << 0,
                A = 0,
                B = 0,
                C = 0,
                D = 0,
                E = new Array,
                F = new Array,
                G = 0,
                H = 1,
                I = 2,
                J = 3,
                K = y,
                L = new Array(3),
                M = [
                    [G, G, G],
                    [G, G, G, G, I, G, G, G],
                    [I, G, G, G, G, I, G, G, G, I],
                    [I, I],
                    [I, G, G, G, G, I],
                    [G, G, G, I],
                    [G, J, G, J, G, J, G],
                    [G, G, J, G, I, G, J, G, G],
                    [I, J, J, J, I]
                ];
            switch (y.levelAmplitude = 0, y.levelPositionY = 0, b.options.config.gameplay) {
                case "jump":
                    r = 1600;
                    break;
                case "roadTrip":
                    r = 1e4;
                    break;
                default:
                    r = 3200
            }
            s = b.options.gameWidth, r = r * b.options.scaleAssets << 0;
            var N = b.display.getImageScaled("ground", 1),
                O = N.width >> 0,
                P = b.display.getImageScaled("road", 1),
                Q = b.options.logicalWidth * b.options.scaleAssets * c * 1.2 << 0,
                R = N.height >> 0,
                S = P.height >> 0;
            for (Phaser.Math.isOdd(R) && (R -= 1), Phaser.Math.isOdd(S) && (S -= 1); Q > B;) B += O;
            y.levelAmplitude = .4 * b.options.logicalHeight * b.options.scaleAssets << 0, t = 2 * y.levelAmplitude, y.levelPositionY = b.options.isMobile ? t : y.levelAmplitude;
            for (var T = new Phaser.BitmapData(b, "testGround", B, t), U = Math.ceil(t / R) + 1, V = 0; U > V; V++) T.textureLine(new Phaser.Line(0, V * R, B, V * R), N.key, "repeat");
            for (var W = new Phaser.BitmapData(b, "testRoad", B, t), X = Math.ceil(t / S) + 1, V = 0; X > V; V++) W.textureLine(new Phaser.Line(0, V * S, B, V * S), P.key, "repeat");
            var Y = [
                [{
                    x: 0,
                    y: .5
                }, {
                    x: .25,
                    y: .8
                }, {
                    x: .75,
                    y: .2
                }, {
                    x: 1,
                    y: .5
                }],
                [{
                    x: 0,
                    y: .5
                }, {
                    x: .5,
                    y: .9
                }, {
                    x: 1,
                    y: .5
                }],
                [{
                    x: 0,
                    y: .5
                }, {
                    x: .5,
                    y: 0
                }, {
                    x: 1,
                    y: .5
                }],
                [{
                    x: 0,
                    y: .5
                }, {
                    x: .25,
                    y: .3
                }, {
                    x: .5,
                    y: .8
                }, {
                    x: .75,
                    y: .3
                }, {
                    x: 1,
                    y: .5
                }],
                [{
                    x: 0,
                    y: .5
                }, {
                    x: .5,
                    y: 0
                }, {
                    x: .7,
                    y: .85
                }, {
                    x: 1,
                    y: .5
                }],
                [{
                    x: 0,
                    y: .5
                }, {
                    x: .1,
                    y: .2
                }, {
                    x: .2,
                    y: .3
                }, {
                    x: .3,
                    y: .2
                }, {
                    x: .4,
                    y: .3
                }, {
                    x: 1,
                    y: .5
                }],
                [{
                    x: 0,
                    y: .5
                }, {
                    x: .3,
                    y: .1
                }, {
                    x: .7,
                    y: .9
                }, {
                    x: 1,
                    y: .5
                }]
            ];
            b.options.isMobile || Y.push([{
                x: 0,
                y: .5
            }, {
                x: .3,
                y: .7
            }, {
                x: .6,
                y: .9
            }, {
                x: .8,
                y: 0
            }, {
                x: 1,
                y: .5
            }], [{
                x: 0,
                y: .5
            }, {
                x: .2,
                y: .4
            }, {
                x: .4,
                y: .6
            }, {
                x: .6,
                y: .4
            }, {
                x: .8,
                y: .6
            }, {
                x: 1,
                y: .5
            }], [{
                x: 0,
                y: .5
            }, {
                x: .2,
                y: .2
            }, {
                x: .7,
                y: .5
            }, {
                x: .8,
                y: .7
            }, {
                x: 1,
                y: .5
            }], [{
                x: 0,
                y: .5
            }, {
                x: .4,
                y: .1
            }, {
                x: .8,
                y: .8
            }, {
                x: 1,
                y: .5
            }]);
            for (var Z = Y.length, $ = M.length, _ = "jump" == b.options.config.gameplay, aa = 0, ba = 0, ca = 0, V = 0; $ > V; V++) {
                for (var da = M[V], ea = da.length, fa = 0, ga = 0, ha = 0; ea > ha; ha++) {
                    var ia = da[ha];
                    ia == G ? fa++ : ia == I && (_ ? ga++ : fa++)
                }
                fa > aa && (aa = fa), ga > ba && (ba = ga)
            }
            var ja = _ ? -(j + 20 * b.options.scaleAssets) << 0 : 0;
            return L[G] = n("coin", 2 * aa, ja), L[H] = n("multiplicator", 1, 0), L[I] = n("obstacle", 2 * ba, 10 * b.options.scaleAssets << 0), x = L.length, k(), y.move = function(a, c, d) {
                if (A += a, v.x < w.x) {
                    v.x -= a;
                    var e = v.x + B;
                    if (w.x = e, 0 > e) {
                        var f = w.x + B;
                        v.visible = !1, v = q(), v.visible = !0, v.x = f
                    }
                } else {
                    w.x -= a;
                    var f = w.x + B;
                    if (v.x = f, 0 > f) {
                        var e = v.x + B;
                        w.visible = !1, w = q(), w.visible = !0, w.x = e
                    }
                }
                if (s += a, s > r) {
                    s = 0;
                    for (var g = 0, h = M[b.rnd.integerInRange(0, M.length - 1)], i = h.length, j = 0; i > j; j++) o(h[j], g), g += z;
                    D++, D > 10 && (D = 0, o(H, g))
                }
                for (var j = 0; x > j; j++)
                    for (var k = L[j], l = k.length, m = 0; l > m; m++) {
                        var n = k[m];
                        n.move(a, c, d)
                    }
            }, y.getPosY = function(a) {
                var b;
                return b = a >= v.x && a < v.x + B ? v : w, -y.levelPositionY + b.getPosition(a)
            }, y.placePreviewItems = function() {
                for (var a = z, b = 0; x > b; b++)
                    for (var c = L[b], d = c.length, e = 0; d > e; e++) {
                        var f = c[e];
                        a += z, f.replaceOnRoad(a), l(f)
                    }
            }, y.killPreviewItems = function() {
                for (var a = 0; x > a; a++)
                    for (var b = L[a], c = b.length, d = 0; c > d; d++) b[d].forceKill()
            }, y.previewIsShallJump = function() {
                for (var a = 0; x > a; a++)
                    for (var b = L[a], c = b.length, d = 0; c > d; d++) {
                        var e = b[d];
                        if (e.alive && (e.animate(), !e.isCollide() && e.posX < g + 3 * h)) return !0
                    }
                return !1
            }, y.removeAllItems = function() {
                for (var a = 0; x > a; a++)
                    for (var b = L[a], c = b.length, d = 0; c > d; d++) b[d].collide()
            }, y
        }
        return __extends(b, a), b
    }(Phaser.Image),
    WingsV4Gameplay = function() {
        function a(a, b) {
            var c = this;
            this.decBonusSpeed = .02, this.hitCoin = function() {
                c.isMultiplicator ? (c.nCoins += 2, c.hud.addTime(2 * c.timeToAdd)) : (c.nCoins++, c.hud.addTime(c.timeToAdd)), c.hud.showCoins(c.nCoins)
            }, this.hitObstacle = function() {
                c.nMalus++, c.speedX = 0, c.hero.blink(), c.game.camera.shake(.01, 150), c.countObstacle++, c.countObstacle >= c.maxObstacleBeforeSpeedUp && (c.countObstacle = 0, c.minSpeedX < c.maxSpeedX && (c.minSpeedX += c.incSpeedUp, c.maxSpeedX += c.incSpeedUp))
            }, this.hitMultiplicator = function() {
                c.isMultiplicator = !0, c.delayMultiplicator = 0, c.hud.showMultiplicator(!0)
            }, this.buildPreview = function() {
                c.levelGenerator.placePreviewItems(), c.game.portal.setPauseStatus(!0, c.onPauseChange)
            }, this.onPauseChange = function() {
                c.isPauseUnset || (c.isPauseUnset = !0, c.levelGenerator.killPreviewItems())
            }, this.onDownH = function() {
                c.isDown = !0
            }, this.onUpH = function() {
                c.isDown = !1
            }, this.onGameOver = function() {
                function a() {
                    this.speedX -= .14, this.speedX < 0 && (this.speedX = 0, this.hero.stopAnimsAndSound(), this.game.audio.stop("audio_theme", 500));
                    var a = this.levelGenerator.getPosY(this.posHeroX),
                        b = 0 != this.speedY && this.posY < a << 0;
                    if (b) this.speedY += this.gravity, this.posY += this.speedY, this.posY > a << 0 && (this.isJump = !1);
                    else {
                        this.speedY = 0, this.posY = this.levelGenerator.getPosY(this.posHeroX + this.speedX);
                        var c = a - this.levelGenerator.getPosY(this.posHeroX + 1),
                            d = Math.atan(-c);
                        this.wantedRotation = d, this.hero.rotation += .2 * (this.wantedRotation - this.hero.rotation)
                    }
                    if (this.hero.y = this.posY - this.hero.getMidH(), this.background.move(this.speedX), this.levelGenerator.move(this.speedX, this.hero.x, this.isMobile ? this.hero.y + this.levelGenerator.levelAmplitude : this.hero.y), "jump" != this.gameplay && this.fx.update(this.hero.x, this.hero.y, this.speedX, this.speedX / this.maxSpeedX - 1), this.isZoomEnabled) {
                        var e = this.maxZoom * (1 - -this.posY / this.gameHeight);
                        e < this.minZoom && (e = this.minZoom), this.wantedScale += .2 * (e - this.containerZoom.scale.x), this.containerZoom.scale.set(this.wantedScale)
                    }
                }

                function b() {
                    e.isBoxInterface ? (e.game.state.clearCurrentState(), e.game.state.start("Engine", !0, !1)) : TweenMax.delayedCall(1, e.game.services.changePage, null, e.game.services)
                }

                function d() {
                    e.message.playMessage(["gameOver"], 2, "scale", b, null)
                }
                var e = c;
                c.isGameOver = !0;
                var f = c.totalTimeElapsed / 90 << 0,
                    g = .02 * c.totalDistance << 0,
                    h = {
                        calculatedScore: 3500 + c.nCoins * c.valueCoins + g + f << 0,
                        nCoins: c.nCoins << 0,
                        nMalus: c.nMalus << 0,
                        time: f,
                        totalDistance: g
                    };
                c.hud.showScore(c.nCoins * c.valueCoins + g + f << 0), c.game.services.endGame(h), c.hero.backToNormal(), c.levelGenerator.removeAllItems(), TweenMax.to(c, 3.6, {
                    onUpdate: a,
                    onComplete: d,
                    callbackScope: c
                })
            }, this.launchGame = function() {
                c.game.services.startGame(), c.hero.playAnimsAndSound(), c.game.audio.play("audio_theme"), c.hud.start(c.onGameOver), c.isGameOver = !1, c.isReady = !0
            }, this.applyZoom = function() {
                if (c.isZoomEnabled) {
                    var a = c.maxZoom * (1 - -c.posY / c.gameHeight);
                    a < c.minZoom && (a = c.minZoom), c.wantedScale += .14 * (a - c.containerZoom.scale.x), c.containerZoom.scale.set(c.wantedScale)
                }
            }, this.game = a, this.gameWidth = a.options.gameWidth, this.gameHeight = a.options.gameHeight, this.scaleAssets = a.options.scaleAssets, this.isMobile = a.options.isMobile, this.isBoxInterface = a.options.isBoxInterface, this.gravity = (b.gravity * this.scaleAssets * 100 << 0) / 100, this.posHeroX = b.posHeroX * this.scaleAssets << 0, this.speedX = 9 * this.scaleAssets, this.speedY = 5 * this.scaleAssets, this.valueCoins = b.valueCoins, this.isZoomEnabled = b.isZoomEnabled, this.timeToAdd = b.timeToAdd, this.minSpeedX = (b.minSpeedX * this.scaleAssets * 100 << 0) / 100, this.maxSpeedX = (b.maxSpeedX * this.scaleAssets * 100 << 0) / 100, this.incSpeedUp = (b.incSpeedUp * this.scaleAssets * 100 << 0) / 100, this.maxZoom = this.scaleAssets, this.minZoom = .6 * this.scaleAssets, this.background = new WingsV4Background(a);
            var d = 1 + (1 - this.minZoom);
            this.wantedScale = this.maxZoom, this.containerZoom = new Phaser.Image(a, 0, 0, ""), this.containerZoom.y = this.isMobile && "jump" == this.gameplay ? this.gameHeight + 110 * a.options.scaleY << 0 : this.gameHeight, a.add.existing(this.containerZoom), this.hero = new WingsV4Hero(a), this.hero.x = this.posHeroX, this.levelGenerator = new WingsV4LevelGenerator(a, d, this.hitCoin, this.hitObstacle, this.hitMultiplicator, this.posHeroX, this.hero.getCollisionW(), this.hero.getCollisionH(), this.hero.getRealHeight()), this.containerZoom.addChild(this.levelGenerator), this.isMobile && (this.levelGenerator.y = -this.levelGenerator.levelPositionY >> 1);
            var e = this.levelGenerator.getPosY(this.posHeroX),
                f = e - this.levelGenerator.getPosY(this.posHeroX + 1);
            this.hero.rotation = Math.atan(-f), this.hero.y = e - this.hero.getMidH(), this.posY = e, this.fx = new WingsV4FX(a, this.containerZoom, this.hero.getMidW(), this.hero.getMidH()), this.containerZoom.addChild(this.hero), this.minY = -(this.gameHeight * d + this.hero.height) << 0, this.bonusSpeedX = 1, this.nCoins = 0, this.nMalus = 0, this.totalDistance = 0, this.isReady = !1, this.isGameOver = !0, this.isMobile && (this.isZoomEnabled ? this.background.positionTilesY(a.options.gameHeight - this.levelGenerator.levelAmplitude * this.minZoom + 110 * a.options.scaleY << 0) : this.background.positionTilesY(a.options.gameHeight - this.levelGenerator.levelAmplitude + 110 * a.options.scaleY << 0)), this.countHudFrames = 0, this.hud = new WingsV4Hud(a), a.add.existing(this.hud), this.message = new ADFW_Message_2(a), a.add.existing(this.message), this.message.playMessage("intro", a.options.isLocalDev ? .1 : 1, "scale", this.launchGame, null), this.totalTimeElapsed = 0, this.isBoxInterface ? this.buildPreview() : (this.inputReceiver = new Phaser.Sprite(a, 0, 0), this.inputReceiver.hitArea = new Phaser.Rectangle(0, 0, this.gameWidth, a.options.gameHeight), this.inputReceiver.inputEnabled = !0, this.inputReceiver.fixedToCamera = !0, this.isDown = !1, this.inputReceiver.events.onInputDown.add(this.onDownH, this), this.inputReceiver.events.onInputUp.add(this.onUpH, this), a.add.existing(this.inputReceiver)), this.containerZoom.scale.set(this.wantedScale)
        }
        return a.prototype.updateGameplay = function() {
            if (this.totalTimeElapsed++, this.hero.y = this.posY - this.hero.getMidH(), this.isMultiplicator && (this.delayMultiplicator++, this.delayMultiplicator > this.durationMultiplicator && (this.isMultiplicator = !1, this.hud.showMultiplicator(!1))), this.hero.updateHero(this.isPress, this.isOnGround), this.bonusSpeedX > 1 && (this.bonusSpeedX -= this.decBonusSpeed, this.bonusSpeedX < 1 && (this.bonusSpeedX = 1)), this.background.move(this.speedX), this.levelGenerator.move(this.speedX, this.hero.x, this.isMobile ? this.hero.y + this.levelGenerator.levelAmplitude : this.hero.y), this.applyZoom(), this.totalDistance += this.speedX, this.countHudFrames++, 8 == this.countHudFrames) this.hud.showDistance(.01 * this.totalDistance << 0);
            else if (this.countHudFrames >= 16) {
                this.countHudFrames = 0;
                var a = this.totalTimeElapsed / 60 << 0,
                    b = .01 * this.totalDistance << 0;
                this.hud.showScore(this.nCoins * this.valueCoins + b + a << 0)
            }
        }, a
    }(),
    WingsV4GameplayJump = function(a) {
        function b(b) {
            var c = a.call(this, b, {
                valueCoins: 100,
                isZoomEnabled: !1,
                timeToAdd: .1,
                gravity: .8,
                posHeroX: 100,
                speedX: 3,
                speedY: 5,
                minSpeedX: 3,
                maxSpeedX: 12,
                incSpeedUp: .3
            }) || this;
            return c.updateGameplay = function() {
                if (c.isReady && !c.isGameOver) {
                    c.isPress = c.checkPress(), c.isPress && (c.delayBeforeJump = 0, c.isJump = !0, c.speedY = -c.impulsionJump);
                    var b = c.levelGenerator.getPosY(c.posHeroX);
                    if (c.isJump) c.flyTime++, c.flyTime > 2 && (c.isOnGround = !1), c.speedY += c.gravity, c.posY += c.speedY, c.posY > b << 0 && (c.isJump = !1), c.wantedRotation < 0 ? (c.wantedRotation += .02, c.wantedRotation > 0 && (c.wantedRotation = 0)) : c.wantedRotation > 0 && (c.wantedRotation -= .02, c.wantedRotation < 0 && (c.wantedRotation = 0));
                    else {
                        c.isOnGround = !0, c.delayBeforeJump++;
                        var d = b - c.levelGenerator.getPosY(c.posHeroX + 1);
                        c.speedY = 0, c.speedX += c.groundBrake, c.speedX < c.minSpeedX ? c.speedX += c.incSpeedX : c.speedX > c.maxSpeedX * c.bonusSpeedX && (c.speedX = c.maxSpeedX * c.bonusSpeedX), c.flyTime = 0, c.posY = c.levelGenerator.getPosY(c.posHeroX + c.speedX), c.wantedRotation = Math.atan(-d)
                    }
                    c.hero.rotation += .2 * (c.wantedRotation - c.hero.rotation), a.prototype.updateGameplay.call(c)
                }
            }, c.checkPress = function() {
                return c.delayBeforeJump > 6 && !c.isJump && (c.isDown || c.cursors.space.isDown || c.cursors.up.isDown || c.cursors.down.isDown)
            }, c.delayBeforeJump = 0, c.groundBrake = (.2 * c.scaleAssets * 100 << 0) / 100, c.incSpeedX = (.1 * c.scaleAssets * 100 << 0) / 100, c.impulsionJump = (14 * c.scaleAssets * 100 << 0) / 100, c.isJump = !1, c.delayBeforeJump = 0, c.isBoxInterface || (c.isMobile ? c.cursors = {
                up: {
                    isDown: !1
                },
                down: {
                    isDown: !1
                },
                space: {
                    isDown: !1
                }
            } : c.cursors = b.input.keyboard.addKeys({
                up: Phaser.KeyCode.UP,
                down: Phaser.KeyCode.DOWN,
                space: Phaser.KeyCode.SPACEBAR
            })), c
        }
        return __extends(b, a), b
    }(WingsV4Gameplay),
    WingsV4GameplayJumpPreview = function(a) {
        function b(b) {
            var c = a.call(this, b) || this;
            return c.checkPress = function() {
                return c.isJump ? !1 : c.levelGenerator.previewIsShallJump()
            }, c
        }
        return __extends(b, a), b
    }(WingsV4GameplayJump),
    WingsV4GameplayRoadTrip = function(a) {
        function b(b) {
            var c = a.call(this, b, {
                valueCoins: 30,
                isZoomEnabled: !0,
                timeToAdd: .06,
                gravity: .2,
                posHeroX: 100,
                speedX: 0,
                speedY: 5,
                minSpeedX: 1,
                maxSpeedX: 20
            }) || this;
            return c.maxNormalBonusFactor = 1.2, c.maxGreatBonusFactor = 2, c.updateGameplay = function() {
                if (c.isReady && !c.isGameOver) {
                    var b = c.levelGenerator.getPosY(c.posHeroX),
                        d = 0 != c.speedY && c.posY <= b << 0;
                    if (d) c.flyTime++, c.speedY += c.gravity, c.posY += c.speedY, c.posY < c.minY ? c.posY = c.minY : c.posY > c.levelGenerator.getPosY(c.posHeroX + c.speedX) + 1 && (c.posY = c.levelGenerator.getPosY(c.posHeroX + c.speedX) + 1), c.flyTime > 8 && (c.hud.pause(), c.isOnGround = !1, c.isPress = c.checkPress(), c.isPress ? (c.isRotationEngaged = !0, c.wantedEntropy = .1, c.wantedRotation += c.speedRotation, c.wantedRotation > 2.8 && c.countRotation++, c.wantedRotation > 6.28319 && (c.wantedRotation -= 6.28319)) : c.isRotationEngaged ? (c.wantedEntropy > 0 && (c.wantedEntropy -= .005, c.wantedEntropy < 0 && (c.wantedEntropy = 0)), c.wantedRotation += c.wantedEntropy) : c.wantedRotation < 0 ? (c.wantedRotation += .02, c.wantedRotation > 0 && (c.wantedRotation = 0)) : c.wantedRotation > 0 && (c.wantedRotation -= .02, c.wantedRotation < 0 && (c.wantedRotation = 0)), c.hero.rotation = c.wantedRotation);
                    else {
                        c.isOnGround = !0, c.hud.resume(), c.isRotationEngaged = !1;
                        var e = b - c.levelGenerator.getPosY(c.posHeroX + 1),
                            f = Math.atan(-e);
                        if (c.flyTime > 8) {
                            var g = c.wantedRotation;
                            g > 3.14159 ? g = 6.28319 - g : -3.14159 > g && (g = 6.28319 + g);
                            var h = e + g,
                                i = h > 1.4 || -1.4 > h;
                            if (i) c.speedX = 0, c.hero.blink(), c.game.camera.shake(.01, 150);
                            else if (c.countRotation > 0) {
                                var j = .4 > h && h > -.4;
                                j ? (c.speedX = c.maxSpeedX * c.maxGreatBonusFactor * c.countRotation, c.bonusSpeedX = c.maxGreatBonusFactor) : (c.speedX = c.maxSpeedX * c.maxNormalBonusFactor, c.bonusSpeedX = c.maxNormalBonusFactor)
                            }
                        }
                        0 >= e ? (c.speedX += c.groundAccel, c.speedY = 0) : (c.speedX += c.groundBrake, c.speedX > 2 && .7 > e && (c.speedY = -e * c.speedX, c.speedY < c.limitSpeedY && (c.speedY = c.limitSpeedY))), c.countRotation = 0, c.flyTime = 0, c.speedX < c.minSpeedX ? c.speedX += c.incSpeedX : c.speedX > c.maxSpeedX * c.bonusSpeedX && (c.speedX = c.maxSpeedX * c.bonusSpeedX), c.posY = c.levelGenerator.getPosY(c.posHeroX + c.speedX), c.wantedRotation = f, c.hero.rotation = c.wantedRotation
                    }
                    c.fx.update(c.hero.x, c.hero.y, c.speedX, c.speedX / c.maxSpeedX - 1), a.prototype.updateGameplay.call(c)
                }
            }, c.checkPress = function() {
                return c.isDown || c.cursors.space.isDown || c.cursors.up.isDown || c.cursors.down.isDown || c.cursors.left.isDown || c.cursors.right.isDown
            }, c.isRotationEngaged = !1, c.countRotation = 0, c.speedRotation = .16, c.wantedEntropy = 0, c.groundAccel = (.8 * c.scaleAssets * 100 << 0) / 100, c.groundBrake = (.1 * c.scaleAssets * 100 << 0) / 100, c.limitSpeedY = (-20 * c.scaleAssets * 100 << 0) / 100, c.incSpeedX = (.1 * c.scaleAssets * 100 << 0) / 100, c.isBoxInterface || (c.isMobile || b.options.isTouchMode ? c.cursors = {
                up: {
                    isDown: !1
                },
                down: {
                    isDown: !1
                },
                space: {
                    isDown: !1
                },
                left: {
                    isDown: !1
                },
                right: {
                    isDown: !1
                }
            } : c.cursors = b.input.keyboard.addKeys({
                up: Phaser.KeyCode.UP,
                down: Phaser.KeyCode.DOWN,
                space: Phaser.KeyCode.SPACEBAR,
                left: Phaser.KeyCode.LEFT,
                right: Phaser.KeyCode.RIGHT
            })), c.wantedRotation = 0, c.flyTime = 0, c.isOnGround = !0, c
        }
        return __extends(b, a), b
    }(WingsV4Gameplay),
    WingsV4GameplayRoadTripPreview = function(a) {
        function b(b) {
            var c = a.call(this, b) || this;
            return c.checkPress = function() {
                var a = c.levelGenerator.getPosY(c.posHeroX),
                    b = 0 != c.speedY && c.posY <= a << 0;
                return b && (c.flyTime++, c.countRotation < 5 && c.flyTime > 52) ? !0 : !1
            }, c
        }
        return __extends(b, a), b
    }(WingsV4GameplayRoadTrip),
    WingsV4GameplayTinyWings = function(a) {
        function b(b) {
            var c = a.call(this, b, {
                valueCoins: 200,
                isZoomEnabled: !0,
                timeToAdd: .1,
                gravity: .4,
                posHeroX: 100,
                speedX: 9,
                speedY: 5,
                minSpeedX: 2.4,
                maxSpeedX: 32
            }) || this;
            return c.updateGameplay = function() {
                if (c.isReady && !c.isGameOver) {
                    var b = 1,
                        d = .1;
                    c.isPress = c.checkPress(), c.isPress ? (c.speedY < 0 && (c.speedY = c.gravity), b = c.coefGravityStandard, d = c.coefSlopeStandard, c.minSpeedX = c.minSpeedXPressOn, c.maxSpeedX = c.maxSpeedXPressOn) : (c.minSpeedX = c.minSpeedXPressOff, c.maxSpeedX = c.maxSpeedXPressOff), c.incSpeedX = c.minSpeedX;
                    var e = c.levelGenerator.getPosY(c.posHeroX),
                        f = 0 != c.speedY && c.posY <= e << 0;
                    if (f) c.flyTime++, c.flyTime > 8 && (c.hud.pause(), c.isOnGround = !1), c.speedY += c.gravity * b, c.posY += c.speedY, c.posY < c.minY && (c.posY = c.minY), c.wantedRotation < 0 ? (c.wantedRotation += .02, c.wantedRotation > 0 && (c.wantedRotation = 0)) : c.wantedRotation > 0 && (c.wantedRotation -= .02, c.wantedRotation < 0 && (c.wantedRotation = 0));
                    else {
                        c.isOnGround = !0, c.hud.resume();
                        var g = e - c.levelGenerator.getPosY(c.posHeroX + 1);
                        c.speedY = 0, 0 >= g ? c.speedX += c.groundAccel * d : (c.speedX -= c.groundBrake * d, c.speedX < 0 && (c.speedX = c.minSpeedX), c.flyTime > 16 && (c.speedX *= .5, c.isPress && c.game.camera.shake(.01, 150)), !c.isPress && c.speedX > c.allowJumpSpeed && .7 > g && (c.speedY = -g * c.speedX)), c.flyTime = 0, c.speedX < c.minSpeedX ? c.speedX += c.incSpeedX : c.speedX > c.maxSpeedX * c.bonusSpeedX && (c.speedX = c.maxSpeedX * c.bonusSpeedX), c.posY = c.levelGenerator.getPosY(c.posHeroX + c.speedX), c.wantedRotation = Math.atan(-g)
                    }
                    c.hero.rotation += .2 * (c.wantedRotation - c.hero.rotation), c.fx.update(c.posHeroX, c.hero.y, c.speedX, c.speedX / c.maxSpeedX), a.prototype.updateGameplay.call(c)
                }
            }, c.checkPress = function() {
                return c.isDown || c.cursors.space.isDown || c.cursors.down.isDown
            }, c.coefGravityStandard = 5, c.coefSlopeStandard = 4, c.minSpeedXPressOn = (2.4 * c.scaleAssets * 100 << 0) / 100, c.maxSpeedXPressOn = (32 * c.scaleAssets * 100 << 0) / 100, c.minSpeedXPressOff = (3 * c.scaleAssets * 100 << 0) / 100, c.maxSpeedXPressOff = (26 * c.scaleAssets * 100 << 0) / 100, c.groundAccel = (.3 * c.scaleAssets * 100 << 0) / 100, c.groundBrake = (.3 * c.scaleAssets * 100 << 0) / 100, c.allowJumpSpeed = (16 * c.scaleAssets * 100 << 0) / 100, c.wantedRotation = 0, c.flyTime = 0, c.isOnGround = !0, c.incSpeedX = 0, c.isBoxInterface || (c.isMobile || b.options.isTouchMode ? c.cursors = {
                down: {
                    isDown: !1
                },
                space: {
                    isDown: !1
                }
            } : c.cursors = b.input.keyboard.addKeys({
                down: Phaser.KeyCode.DOWN,
                space: Phaser.KeyCode.SPACEBAR
            })), c
        }
        return __extends(b, a), b
    }(WingsV4Gameplay),
    WingsV4GameplayTinyWingsPreview = function(a) {
        function b(b) {
            var c = a.call(this, b) || this;
            return c.checkPress = function() {
                var a = c.levelGenerator.getPosY(c.posHeroX),
                    b = 0 != c.speedY && c.posY <= a << 0,
                    d = a - c.levelGenerator.getPosY(c.posHeroX + 1);
                if (b) {
                    if (c.flyTime++, c.flyTime > 64 && 0 >= d) return !0
                } else if (0 >= d) return !0;
                return !1
            }, c
        }
        return __extends(b, a), b
    }(WingsV4GameplayTinyWings),
    Engine = function(a) {
        function b(c) {
            var d, e = a.call(this) || this,
                f = c.options.isBoxInterface,
                g = c.options.config;
            return b.prototype.create = function() {
                switch (c.input.maxPointers = 1, c.device.desktop && !f && c.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]), g.gameplay) {
                    case "tinyWings":
                        d = f ? new WingsV4GameplayTinyWingsPreview(c) : new WingsV4GameplayTinyWings(c);
                        break;
                    case "roadTrip":
                        d = f ? new WingsV4GameplayRoadTripPreview(c) : new WingsV4GameplayRoadTrip(c);
                        break;
                    case "jump":
                        d = f ? new WingsV4GameplayJumpPreview(c) : new WingsV4GameplayJump(c)
                }
                c.audio.add("audio_theme", !0), c.audio.addButtonOnStage()
            }, b.prototype.update = function() {
                d.updateGameplay()
            }, e
        }
        return __extends(b, a), b
    }(Phaser.State);
