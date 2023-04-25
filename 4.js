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
    MegajumpV5DecorEntity = function(a) {
        function b(b, c) {
            var d = a.call(this, b, 0, 0, c) || this;
            return d.ratioSpeedY = 0, d.scale.set(b.options.scaleAssets), d
        }
        return __extends(b, a), b
    }(Phaser.Image),
    MegajumpV5DecorBG = function() {
        function a(a) {
            var b, c, d = a.options.gameHeight,
                e = a.options.gameWidth,
                f = a.display.getImageScaled("bg"),
                g = a.display.getTileSprite("bg", e, d),
                h = e / f.width;
            g.tileScale.set(h, h), a.add.existing(g), f.destroy();
            var i = a.display.getAllKeysScaled("decor", 1),
                j = null != i && i.length > 0;
            if (j) {
                b = [], c = i.length;
                for (var k = 0; c > k; k++) {
                    var l = new MegajumpV5DecorEntity(a, i[k]);
                    l.x = a.rnd.integerInRange(0, e - l.width), l.y = a.rnd.integerInRange(0, d - l.height), l.ratioSpeedY = a.rnd.realInRange(.2, .6), a.add.existing(l), b[b.length] = l
                }
            }
            this.update = function(f) {
                if (g.tilePosition.y = g.tilePosition.y + f, j)
                    for (var h = 0; c > h; h++) {
                        var i = b[h];
                        i.y = i.y + f * i.ratioSpeedY, i.y > d && (i.x = a.rnd.integerInRange(0, e - i.width), i.y = a.rnd.integerInRange(-i.height, -300 - i.height))
                    }
            }
        }
        return a
    }(),
    MegajumpV5FXParticle = function(a) {
        function b(b, c) {
            var d = a.call(this, b, 0, 0, c) || this;
            return d.speedX = 0, d.speedY = 0, d.health = 0, d.respawn = function(a, b) {
                this.reset(a, b), this.health = 60
            }, d
        }
        return __extends(b, a), b
    }(Phaser.Image),
    MegajumpV5FX = function(a) {
        function b(b) {
            var c = a.call(this, b, null, "groupFX") || this,
                d = 12,
                e = 6 * d,
                f = 0,
                g = new Phaser.Graphics(b);
            g.beginFill(b.options.config.particleColor), g.drawCircle(0, 0, 6 * b.options.scaleAssets << 0), g.endFill();
            for (var h = g.generateTexture(), i = 0; e > i; i++) {
                var j = new MegajumpV5FXParticle(b, h);
                j.speedX = b.rnd.realInRange(-3, 3), j.speedY = b.rnd.realInRange(-1, 2), j.kill(), c.add(j)
            }
            return c.addFX = function(a, b) {
                f += d, f >= e && (f = 0);
                for (var c = f + d, g = f; c > g; g++) {
                    var h = this.children[g];
                    h.respawn(a + h.speedX, b + h.speedY)
                }
            }, c.move = function(a) {
                this.forEachAlive(function(b) {
                    b.x += b.speedX, b.y += a + b.speedY, b.health--, b.health <= 0 && b.kill()
                }, this)
            }, c
        }
        return __extends(b, a), b
    }(Phaser.Group),
    MegajumpV5Hero = function(a) {
        function b(b) {
            var c = a.call(this, b, 0, 0, "") || this;
            c.vectorLength = 0, c.heroWidth = 0, c.heroHeight = 0, c.scale.set(b.options.scaleAssets);
            var d, e, f = !0,
                g = b.display.isAnimated("hero_fall");
            g ? (d = b.display.getSpriteSheetScaled("hero_fall", 1), d.animations.add("fall", null, d.framerate, !0)) : d = b.display.getImageScaled("hero_fall", 1), d.visible = !1, d.anchor.set(.5), c.addChild(d);
            var h = b.display.isAnimated("hero_jump");
            return h ? (e = b.display.getSpriteSheetScaled("hero_jump", 1), e.animations.add("jump", null, e.framerate, !0)) : e = b.display.getImageScaled("hero_jump", 1), e.visible = !1, e.anchor.set(.5), c.addChild(e), c.heroWidth = Math.max(d.width, e.width) * b.options.scaleAssets << 0, c.heroHeight = Math.max(d.height, e.height) * b.options.scaleAssets << 0, c.vectorLength = Math.max(d.height, e.height) * b.options.scaleAssets << 0, b.audio.add("hero_fall", !1), b.audio.add("hero_jump", !0), c.setIsFalling = function(a) {
                f != a && (f = a, d.visible = f, e.visible = !d.visible, a ? (b.audio.unmute("hero_fall"), b.audio.play("hero_fall"), b.audio.mute("hero_jump")) : (b.audio.unmute("hero_jump"), b.audio.play("hero_jump"), b.audio.mute("hero_fall")))
            }, c.playAnimsAndSound = function() {
                b.audio.play("hero_fall"), b.audio.play("hero_jump"), h && e.animations.play("jump"), g && d.animations.play("fall")
            }, c.stopAnimsAndSound = function() {
                h && e.animations.stop("jump"), g && d.animations.stop("fall")
            }, c.setIsFalling(!1), c.stopAnimsAndSound(), c
        }
        return __extends(b, a), b
    }(Phaser.Image),
    MegajumpV5Patterns = function() {
        function a() {}
        return a.A_PATTERNS = [{
            id: "random_obstacles_4",
            difficulty: 1,
            gapX: 140,
            gapY: 150,
            nColumns: 5,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "random_obstacles_2",
            difficulty: 1,
            gapX: 160,
            gapY: 180,
            nColumns: 5,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "random_obstacles_5",
            difficulty: 1,
            gapX: 100,
            gapY: 150,
            nColumns: 5,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "random_obstacles_6",
            difficulty: 1,
            gapX: 100,
            gapY: 150,
            nColumns: 5,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "random_obstacles_7",
            difficulty: 2,
            gapX: 100,
            gapY: 150,
            nColumns: 5,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "random_obstacles_8",
            difficulty: 0,
            gapX: 100,
            gapY: 150,
            nColumns: 5,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "random_obstacles_3",
            difficulty: 1,
            gapX: 160,
            gapY: 180,
            nColumns: 5,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "random_obstacles_1_fake",
            difficulty: 0,
            gapX: 40,
            gapY: 120,
            nColumns: 5,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "random_obstacles_1",
            difficulty: 2,
            gapX: 40,
            gapY: 120,
            nColumns: 5,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "straight",
            difficulty: 0,
            gapX: 40,
            gapY: 100,
            nColumns: 3,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "star",
            difficulty: 0,
            gapX: 40,
            gapY: 40,
            nColumns: 5,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "sign",
            difficulty: 0,
            nColumns: 5,
            gapX: 40,
            gapY: 40,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "random",
            difficulty: 0,
            nColumns: 5,
            gapX: 50,
            gapY: 40,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "curve",
            difficulty: 0,
            nColumns: 5,
            gapX: 30,
            gapY: 80,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "grid",
            difficulty: 0,
            nColumns: 5,
            gapX: 80,
            gapY: 80,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "arrow",
            difficulty: 0,
            nColumns: 5,
            gapX: 60,
            gapY: 60,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "wave",
            difficulty: 0,
            nColumns: 5,
            gapX: 60,
            gapY: 20,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "hardPath1",
            difficulty: 1,
            nColumns: 5,
            gapX: 100,
            gapY: 100,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "hardPath2",
            difficulty: 1,
            nColumns: 11,
            gapX: 40,
            gapY: 40,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "bigArrow",
            difficulty: 1,
            nColumns: 11,
            gapX: 40,
            gapY: 40,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "hardPath3",
            difficulty: 2,
            nColumns: 20,
            gapX: 30,
            gapY: 80,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "hardPath4",
            difficulty: 2,
            nColumns: 20,
            gapX: 32,
            gapY: 42,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "square",
            difficulty: 0,
            nColumns: 5,
            gapX: 50,
            gapY: 60,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "lines",
            difficulty: 3,
            nColumns: 12,
            gapX: 50,
            gapY: 60,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "hardPath5",
            difficulty: 2,
            nColumns: 12,
            gapX: 50,
            gapY: 60,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "choice1",
            difficulty: 1,
            nColumns: 11,
            gapX: 50,
            gapY: 80,
            aDesign: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }, {
            id: "choice2",
            difficulty: 1,
            nColumns: 11,
            gapX: 50,
            gapY: 80,
            aDesign: [1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1]
        }, {
            id: "hardPath7",
            difficulty: 3,
            nColumns: 11,
            gapX: 50,
            gapY: 66,
            aDesign: [1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1]
        }, {
            id: "diamond",
            difficulty: 1,
            nColumns: 11,
            gapX: 66,
            gapY: 66,
            aDesign: [1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1]
        }, {
            id: "obstacle1",
            difficulty: 4,
            nColumns: 5,
            gapX: 100,
            gapY: 70,
            aDesign: [1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1]
        }, {
            id: "obstacle2",
            difficulty: 4,
            nColumns: 8,
            gapX: 60,
            gapY: 60,
            aDesign: [1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1]
        }, {
            id: "obstacle3",
            difficulty: 4,
            nColumns: 8,
            gapX: 60,
            gapY: 60,
            aDesign: [1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1]
        }, {
            id: "obstacle4",
            difficulty: 4,
            nColumns: 12,
            gapX: 60,
            gapY: 70,
            aDesign: [1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1]
        }, {
            id: "obstacle5",
            difficulty: 4,
            nColumns: 12,
            gapX: 60,
            gapY: 70,
            aDesign: [1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1]
        }, {
            id: "obstacle6",
            difficulty: 4,
            nColumns: 20,
            gapX: 32,
            gapY: 42,
            aDesign: [1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1]
        }], a
    }(),
    MegajumpV5PlatformData = function() {
        function a(a, b, c) {
            this.type = a, this.posX = b, this.posY = c
        }
        return a
    }(),
    MegajumpV5Platform = function(a) {
        function b(b, c, d, e, f) {
            var g = a.call(this, b, 0, 0, "") || this;
            g.scale.set(b.options.scaleAssets), g._audio = d;
            var h = b.display.getRandomVisualScaled(d),
                i = h instanceof Phaser.Sprite;
            i && h.animations.add("anim", [], h.framerate, !0), h.anchor.set(.5), g.addChild(h), g.impulsion = -(e * b.options.config.ratio_speed * b.options.scaleAssets) << 0, g.points = f;
            var j = h.width * b.options.scaleAssets >> 1;
            return g.pt1 = new Phaser.Point(-j - c, 0), g.pt2 = new Phaser.Point(j + c, 0), g.show = function(a) {
                this.posX = a.posX, this.posY = a.posY, this.x = this.posX, this.y = this.posY, this.revive(), i && (h.animations.play("anim"), h.animations.getAnimation("anim").setFrame(b.rnd.integerInRange(0, h.animations.frameTotal), !0)), this.isHit = !1
            }, g.hit = function() {
                this.isHit = !0, b.audio.play(this._audio), this.hide()
            }, g.hide = function() {
                i && h.animations.stop("anim"), this.kill()
            }, g
        }
        return __extends(b, a), b
    }(Phaser.Image),
    MegajumpV5PlatformSmall = function(a) {
        function b(b, c) {
            var d = a.call(this, b, c, "item_small", 16, 20) || this;
            return d.type = 0, d
        }
        return __extends(b, a), b
    }(MegajumpV5Platform),
    MegajumpV5PlatformBig = function(a) {
        function b(b, c) {
            var d = a.call(this, b, c, "item_big", 24, 60) || this;
            return d.type = 1, d
        }
        return __extends(b, a), b
    }(MegajumpV5Platform),
    MegajumpV5PlatformObstacle = function(a) {
        function b(b, c) {
            var d = a.call(this, b, c, "item_obstacle", 8, 0) || this;
            return d.type = 3, d
        }
        return __extends(b, a), b
    }(MegajumpV5Platform),
    MegajumpV5PlatformBonus = function(a) {
        function b(b, c) {
            var d = a.call(this, b, c, "item_bonus", 64, 0) || this;
            return d.type = 2, d
        }
        return __extends(b, a), b
    }(MegajumpV5Platform),
    MegajumpV5PatternData = function() {
        function a(a, b) {
            this.nPlatformsSmall = 0, this.nPlatformsBig = 0, this.nBonus = 0, this.nObstacles = 0, this.vPlatformsSmallPositions = new Array, this.vPlatformsBigPositions = new Array, this.vBonusPositions = new Array, this.vObstaclesPositions = new Array, this.difficulty = a.difficulty;
            for (var c = a.nColumns, d = a.gapX * b << 0, e = a.gapY * b << 0, f = a.aDesign, g = f.length, h = 0, i = 0, j = 0; g > j; j++) {
                var k = f[j];
                switch (k) {
                    case 1:
                        this.vPlatformsSmallPositions[this.vPlatformsSmallPositions.length] = new MegajumpV5PlatformData(k, h * d, i * e);
                        break;
                    case 2:
                        this.vPlatformsBigPositions[this.vPlatformsBigPositions.length] = new MegajumpV5PlatformData(k, h * d, i * e);
                        break;
                    case 3:
                        this.vBonusPositions[this.vBonusPositions.length] = new MegajumpV5PlatformData(k, h * d, i * e);
                        break;
                    case 4:
                        this.vObstaclesPositions[this.vObstaclesPositions.length] = new MegajumpV5PlatformData(k, h * d, i * e)
                }
                h++, h >= c && (h = 0, i++)
            }
            this.nPlatformsSmall = this.vPlatformsSmallPositions.length, this.nPlatformsBig = this.vPlatformsBigPositions.length, this.nBonus = this.vBonusPositions.length, this.nObstacles = this.vObstaclesPositions.length, this.width = ((c - 1) * d << 0) + d, this.height = (i + 1) * e << 0
        }
        return a
    }(),
    MegajumpV5ContainerPlatform = function(a) {
        function b(b, c, d, e, f, g) {
            function h(a, b, c, d) {
                if (d > 0)
                    for (var e = 0; d > e; e++) {
                        var f = c[e];
                        b > e ? f.show(a[e]) : f.hide()
                    }
            }
            var i = a.call(this, b, 0, 0, "") || this;
            return i.nPlatformsSmall = d, i.nPlatformsBig = e, i.nBonus = f, i.nObstacles = g, i.initPlatform = function(a, d, e) {
                for (var f = 0; e > f; f++) {
                    var g = void 0;
                    switch (a) {
                        case "bonus":
                            g = new MegajumpV5PlatformBonus(b, c);
                            break;
                        case "obstacle":
                            g = new MegajumpV5PlatformObstacle(b, c);
                            break;
                        case "big":
                            g = new MegajumpV5PlatformBig(b, c);
                            break;
                        case "small":
                        default:
                            g = new MegajumpV5PlatformSmall(b, c)
                    }
                    g.hide(), i.addChild(g), d[d.length] = g
                }
            }, i.vPlatformsSmall = new Array, i.initPlatform("small", i.vPlatformsSmall, i.nPlatformsSmall), i.vPlatformsBig = new Array, i.initPlatform("big", i.vPlatformsBig, i.nPlatformsBig), i.vBonus = new Array, i.initPlatform("bonus", i.vBonus, i.nBonus), i.vObstacles = new Array, i.initPlatform("obstacle", i.vObstacles, i.nObstacles), i.changePlatforms = function(a) {
                h(a.vPlatformsSmallPositions, a.nPlatformsSmall, this.vPlatformsSmall, this.nPlatformsSmall), h(a.vPlatformsBigPositions, a.nPlatformsBig, this.vPlatformsBig, this.nPlatformsBig), h(a.vBonusPositions, a.nBonus, this.vBonus, this.nBonus), h(a.vObstaclesPositions, a.nObstacles, this.vObstacles, this.nObstacles), this.newW = a.width, this.newH = a.height
            }, i
        }
        return __extends(b, a), b
    }(Phaser.Image),
    MegajumpV5LevelManager = function() {
        function a(a) {
            function b(a, b, c, e) {
                for (var f = 0; b > f; f++) {
                    var h = a[f];
                    h.visible && (e + h.y > n ? h.hide() : !h.isHit && d(c, e, h) && (h.hit(), g(h.impulsion, h.type, h.points)))
                }
            }

            function c() {
                var b = r[a.rnd.integerInRange(0, p)];
                return b[a.rnd.integerInRange(0, b.length - 1)]
            }

            function d(a, b, c) {
                var d = f.y - (c.y + b);
                if (0 > d && (d = -d), o > d) {
                    j.x = a + c.x + c.pt1.x, j.y = b + c.y + c.pt1.y, k.x = a + c.x + c.pt2.x, k.y = b + c.y + c.pt2.y;
                    var g = e();
                    return null != g
                }
                return !1
            }

            function e() {
                var a = i.y - h.y,
                    b = k.y - j.y,
                    c = h.x - i.x,
                    d = j.x - k.x,
                    e = i.x * h.y - h.x * i.y,
                    f = k.x * j.y - j.x * k.y,
                    g = a * d - b * c;
                if (0 == g) return null;
                l.x = (c * f - d * e) / g, l.y = (b * e - a * f) / g;
                var m = l.x - i.x,
                    n = l.y - i.y,
                    o = h.x - i.x,
                    p = h.y - i.y;
                return m * m + n * n > o * o + p * p ? null : (m = l.x - h.x, n = l.y - h.y, m * m + n * n > o * o + p * p ? null : (m = l.x - k.x, n = l.y - k.y, o = j.x - k.x, p = j.y - k.y, m * m + n * n > o * o + p * p ? null : (m = l.x - j.x, n = l.y - j.y, m * m + n * n > o * o + p * p ? null : l)))
            }
            var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = a.options.gameWidth >> 1,
                v = MegajumpV5Patterns.A_PATTERNS;
            this.init = function(b, d) {
                f = b, g = d, h = new Phaser.Point(0, 0), i = new Phaser.Point, j = new Phaser.Point, k = new Phaser.Point, l = new Phaser.Point;
                var e = a.display.getResourceMetaData("item_small"),
                    u = a.display.getResourceMetaData("item_big"),
                    w = a.display.getResourceMetaData("item_bonus"),
                    x = a.display.getResourceMetaData("item_obstacle");
                m = (Math.max(e.width || 0, u.width || 0, w.width || 0, x.width || 0) >> 1) * a.options.scaleAssets >> 0, n = a.options.gameHeight + Math.max(e.height || 0, u.height || 0, w.height || 0, x.height || 0) * a.options.scaleAssets >> 0, o = 100 * a.options.scaleAssets << 0, p = 0, r = [];
                for (var y = v.length, z = 1e4, A = 0, B = 0, C = 0, D = 0, E = 0; y > E; E++) {
                    var F = new MegajumpV5PatternData(v[E], a.options.scaleAssets);
                    null == r[F.difficulty] && (r[F.difficulty] = []);
                    var G = r[F.difficulty];
                    G[G.length] = F, A < F.nPlatformsSmall && (A = F.nPlatformsSmall), B < F.nPlatformsBig && (B = F.nPlatformsBig), D < F.nBonus && (D = F.nBonus), C < F.nObstacles && (C = F.nObstacles), z > F.height && (z = F.height)
                }
                s = Math.ceil(n / z) + 1, t = new Array;
                for (var H = f.heroWidth >> 1, E = 0; s > E; E++) {
                    var I = new MegajumpV5ContainerPlatform(a, H, A, B, D, C);
                    I.changePlatforms(c()), I.x = a.rnd.integerInRange(m, a.options.gameWidth - I.newW - m), 0 == E ? I.y = a.options.gameHeight - I.newH - (300 * a.options.scaleAssets << 0) : I.y = t[E - 1].y - I.newH, t[E] = I
                }
                q = r.length - 1;
                for (var J = t.length, E = 0; J > E; E++) {
                    var I = t[E];
                    a.add.existing(I)
                }
            }, this.getCurrentPatternCenter = function() {
                for (var a = f.y, b = 0; s > b; b++) {
                    var c = t[b];
                    if (a > c.y && a < c.y + c.newH) return c.x + (c.newW >> 1)
                }
                return u
            }, this.update = function(d) {
                h.x = f.x, h.y = f.y - (f.vectorLength >> 1) + d, i.x = f.x, i.y = f.y + (f.vectorLength >> 1) + d;
                for (var e = 0; s > e; e++) {
                    var g = t[e];
                    g.y += d;
                    var j = g.x,
                        k = g.y;
                    if (k > n) {
                        g.changePlatforms(c()), g.x = a.rnd.integerInRange(m, a.options.gameWidth - g.newW - m);
                        var l = 0 == e ? t[s - 1] : t[e - 1];
                        g.y = l.y - g.newH + d
                    } else b(g.vPlatformsSmall, g.nPlatformsSmall, j, k), b(g.vPlatformsBig, g.nPlatformsBig, j, k), b(g.vObstacles, g.nObstacles, j, k), b(g.vBonus, g.nBonus, j, k)
                }
            }, this.raiseDifficulty = function() {
                q > p && p++
            }
        }
        return a
    }(),
    MegajumpV5PreviewBox = function(a) {
        function b(b) {
            var c = a.call(this, b, 0, 0, "") || this;
            c.scale.set(b.options.scaleAssets);
            var d = 20,
                e = b.display.getImageScaled("item_small", 1, 0, 0),
                f = b.display.getImageScaled("item_big", 1, e.width + d),
                g = b.display.getImageScaled("item_bonus", 1, f.x + f.width + d),
                h = b.display.getImageScaled("item_obstacle", 1, g.x + g.width);
            e.anchor.set(0, .5), f.anchor.set(0, .5), g.anchor.set(0, .5), h.anchor.set(0, .5), c.addChild(e), c.addChild(f), c.addChild(g), c.addChild(h);
            var i = (h.x + h.width) * b.options.scaleAssets;
            return c.x = b.options.gameWidth - i >> 1, c.y = b.options.gameHeight >> 1, c
        }
        return __extends(b, a), b
    }(Phaser.Image),
    Engine = function(a) {
        function b(c) {
            function d() {
                ca || (ca = !0, ba.destroy())
            }

            function e() {
                var a = !1,
                    b = !1,
                    d = c.input.activePointer.x;
                $ ? _ && (c.input.activePointer.x < q.x ? (a = !0, b = !1) : (a = !1, b = !0)) : (d >= 0 && !S && T != d && (S = !0), T = d, c.input.keyboard.isDown(Phaser.Keyboard.LEFT) ? (S = !1, a = !0, b = !1) : c.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && (S = !1, a = !1, b = !0)), a ? (V > 0 && (V = 0), V -= W, -X > V && (V = -X)) : b && (0 > V && (V = 0), V += W, V > X && (V = X)), S ? q.x += (d - q.x) * U : (q.x += V, 0 !== V && (-Y > V ? V += Z : V > Y ? V -= Z : V = 0))
            }

            function f() {
                var a = s.getCurrentPatternCenter();
                q.x += .05 * (a - q.x)
            }

            function g() {
                fa || null != c.options.callback && null != c.options.callback.updateHud && c.options.callback.updateHud(J)
            }

            function h(a) {
                var b = "undefined" != typeof c.options && null != c.options && "undefined" != typeof c.options.aLabels && null != c.options.aLabels && c.options.aLabels.length > 0;
                if (b)
                    for (var d = c.options.aLabels, e = d.length, f = 0; e > f; f++) {
                        var g = d[f].name.toUpperCase();
                        if (-1 !== g.indexOf(a.toUpperCase())) return !0
                    }
                return !1
            }

            function i() {
                c.services.startGame(), aa = !0, q.playAnimsAndSound(), _ = !1, fa || (u.events.onInputDown.add(j, this), u.events.onInputUp.add(k, this)), TweenMax.to(r, .1, {
                    y: c.options.gameHeight,
                    onComplete: function() {
                        r.kill()
                    }
                }), l(-G, ja.bonus, 0)
            }

            function j() {
                _ = !0
            }

            function k() {
                _ = !1
            }

            function l(a, b, d) {
                b == ja.obstacle ? (z = z > 0 ? 2 * a : 0, c.camera.shake(.01, 150, !0)) : (b == ja.bonus && (E = B), z > 0 ? z = 2 * a : z += a, J += d), t.addFX(q.x, q.y), q.setIsFalling(!1)
            }

            function m() {
                if (q.stopAnimsAndSound(), c.audio.stop("audio_theme", 500), aa = !1, fa || (c.services.endGame({
                        score: J
                    }), g()), h("gameover")) v.playMessage(["gameover"], 1.42, "from_down", fa ? n : o);
                else {
                    var a = ia ? 1 : .1;
                    TweenMax.delayedCall(a, fa ? n : o, [], this)
                }
            }

            function n() {
                aa = !1, c.state.clearCurrentState(), c.state.start("Engine", !0, !1)
            }

            function o() {
                c.services.changePage()
            }
            var p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da = a.call(this) || this,
                ea = c.options.isMobile,
                fa = c.options.isBoxInterface,
                ga = c.options.config,
                ha = !ea && (1 == ga.isCanCrossScreen || "true" == ga.isCanCrossScreen),
                ia = 1 == c.options.config.isBoatGamePlay || "true" == c.options.config.isBoatGamePlay,
                ja = {
                    small: 0,
                    big: 1,
                    bonus: 2,
                    obstacle: 3
                };
            return b.prototype.create = function() {
                var a = c.options.scaleAssets;
                p = new MegajumpV5DecorBG(c), q = new MegajumpV5Hero(c), q.x = c.options.gameWidth >> 1, q.y = c.options.gameHeight - (q.heroHeight >> 1) - 20 * a << 0;
                var b = c.options.gameHeight - q.y;
                r = c.display.getImageScaled("ground", 1, 0, q.y), r.width = c.options.gameWidth, r.height = b, s = new MegajumpV5LevelManager(c), s.init(q, l), t = new MegajumpV5FX(c), c.add.existing(t), c.add.existing(r), c.add.existing(q), ha ? (x = -(.4 * q.heroWidth << 0), y = c.options.gameWidth + (.4 * q.heroWidth << 0)) : (x = 0, y = c.options.gameWidth);
                var g = ga.ratio_speed,
                    j = g * g;
                z = 0, A = ia ? .32 * j * a : .52 * j * a, B = -(64 * g * a), C = .9 * j * a, D = -(24 * g * a), E = D, F = 30 * g * a, G = 100 * g * a, H = 0, I = 0, J = 0, K = 0, L = 4e3 * g * a, M = 0, N = .66 * c.options.gameHeight << 0, O = .9 * c.options.gameHeight << 0, P = N - O, Q = 0, R = 120, S = !1, U = .16, V = 0, W = 1 * a, X = 10 * a, Y = .6 * a, Z = .2 * a, c.input.maxPointers = 1, $ = ea || "undefined" != typeof c.options.isTouchMode && 1 == c.options.isTouchMode, ea || fa || c.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]), aa = !1, v = new ADFW_Message_2(c), this.add.existing(v);
                var k = h("intro");
                k && v.playMessage("intro", c.options.isLocalDev ? .1 : .66, "scale", i), fa ? (ca = !1, w = f, ba = new MegajumpV5PreviewBox(c), c.add.existing(ba), k || i(), c.portal.setPauseStatus(!0, d)) : (u = new Phaser.Sprite(c, 0, 0), u.hitArea = new Phaser.Rectangle(0, 0, c.options.gameWidth, c.options.gameHeight), u.inputEnabled = !0, u.fixedToCamera = !0, k || u.events.onInputDown.addOnce(i, this), c.add.existing(u), w = e), c.audio.add("audio_theme", !0), c.audio.add("item_bonus", !1), c.audio.add("item_small", !1), c.audio.add("item_big", !1), c.audio.add("item_obstacle", !1), c.audio.addButtonOnStage(), c.audio.play("audio_theme")
            }, b.prototype.update = function() {
                if (aa) {
                    E != D && (D > E ? E += C : E = D), z += A, E > z ? z = E : z > F && (z = F), H -= z, H > I && (I = H, K++, K >= L && (K = 0, s.raiseDifficulty())), w();
                    var a = q.x;
                    ha ? a > y ? a = x : x > a && (a = y) : a > y ? a = y : x > a && (a = x), q.x = a;
                    var b = q.y + z,
                        c = z,
                        d = 0;
                    if (O >= b) {
                        var e = (N - b) / P;
                        c = z * e, d = z * (1 - e)
                    }
                    if (q.y += c, p.update(-d), s.update(-d), z >= 0) {
                        if (ia) return void m();
                        if (q.setIsFalling(!0), Q++, Q > R) return void m()
                    } else Q = 0;
                    M++, M > 30 && (M = 0, g()), t.move(-d)
                }
            }, da
        }
        return __extends(b, a), b
    }(Phaser.State);
