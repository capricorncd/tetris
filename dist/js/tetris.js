/**
 * Create by Capricorncd
 * Sat Oct 21 2017 18:49:07 GMT+0800
 * https://github.com/capricorncd
 */
/**
 * ***************************************************
 * CAPRICORNCD
 * ***************************************************
 */
var CAPR = {
    // 获取DOM元素
    q: function (selector) {
        if (document.querySelector) {
            return document.querySelector(selector);
        }
        else if (window.$) {
            return window.$(selector)[0];
        }
        else {
            return null;
        }
    },
    // 对象继承
    extend: function (OPTS, DEF) {
        var obj = {};
        for (var key in DEF) {
            if (OPTS[key] && typeof OPTS[key] === typeof DEF[key]) {
                obj[key] = OPTS[key];
            }
            else {
                obj[key] = DEF[key];
            }
        }
        return obj;
    },
    // 事件监听(浏览器兼容处理)
    eventListener: function (el, type, handle) {
        if (!el) {
            console.error('The CAPR.eventListener() DOM node is undefined');
            return;
        }
        // DOM 2级事件
        if (el.addEventListener) {
            el.addEventListener(type, handle, false);
        }
        else if (el.attachEvent) {
            el.attachEvent('on' + type, handle);
        }
        else {
            el['on' + type] = handle;
        }
    },
    // IE浏览器
    isIEBrower: navigator.appName === 'Microsoft Internet Explorer',
    // IE浏览器版本
    ieBrowerVersion: function () {
        if (/MSIE (\d+)/ig.test(navigator.userAgent)) {
            return RegExp.$1;
        }
        else {
            return 0;
        }
    },
    // isAndroid: !!navigator.userAgent.match(/android/ig),
    // isIos: !!navigator.userAgent.match(/(iphone|ipod|ios|ipad)/ig),
    // isMobile: !!navigator.userAgent.match(/(android|iphone|ipod|ios|ipad)/ig),
    // isWin: navigator.platform == "Win32" || navigator.platform == "Windows",
    // isMac: navigator.platform == "Mac68K" || navigator.platform == "MacPPC" || navigator.platform == "Macintosh" || navigator.platform == "MacIntel",
    // 生成随机整数
    rand: function (max) {
        if (max === void 0) { max = 1; }
        return Math.ceil(Math.random() * max);
    },
    // 格式化时间
    // formatTime
    ft: function (sec) {
        var str = CAPR.fd(Math.floor(sec / 60)) + ':' + CAPR.fd(sec % 60);
        if (sec > 3600) {
            return CAPR.fd(Math.floor(sec / 3600)) + ':' + str;
        }
        else {
            return str;
        }
    },
    // 格式化一位数字
    // formatDigit
    fd: function (num) {
        return num < 10 ? '0' + num : num;
    },
    // 检查移动的点，在舞台上是否合法
    checkPoint: function (pos, x, y, data) {
        return (pos.x + x < 0
            || pos.x + x >= data.length
            || pos.y + y < 0
            || pos.y + y >= data[0].length
            || data[pos.x + x][pos.y + y] === 1) ? false : true;
        // if (pos.x + x < 0) {
        //   return false
        // } else if (pos.x + x >= data.length) {
        //   return false
        // } else if (pos.y + y < 0) {
        //   return false
        // } else if (pos.y + y >= data[0].length) {
        //   return false
        // } else if (data[pos.x + x][pos.y + y] === 1) {
        //   return false
        // }
        // return true
    }
};
/**
 * ***************************************************
 * Square 英[skweə(r)] 美[skwer]
 * ***************************************************
 */
var Square = /** @class */ (function () {
    // constructor
    function Square(index) {
        if (index === void 0) { index = 0; }
        // 方块矩阵
        this.data = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        // 各种形状方块(组)
        this.SQUARES = {
            // 方块01
            1: [
                [
                    [0, 2, 0, 0],
                    [0, 2, 0, 0],
                    [0, 2, 0, 0],
                    [0, 2, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [2, 2, 2, 2],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
            ],
            // 方块02
            2: [
                [
                    [2, 0, 0, 0],
                    [2, 2, 0, 0],
                    [0, 2, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 2, 2, 0],
                    [2, 2, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
            ],
            // 方块03
            3: [
                [
                    [2, 0, 0, 0],
                    [2, 0, 0, 0],
                    [2, 2, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [2, 2, 2, 0],
                    [2, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [2, 2, 0, 0],
                    [0, 2, 0, 0],
                    [0, 2, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 2, 0],
                    [2, 2, 2, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
            ],
            // 方块04
            4: [
                [
                    [0, 2, 0, 0],
                    [0, 2, 0, 0],
                    [2, 2, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [2, 0, 0, 0],
                    [2, 2, 2, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [2, 2, 0, 0],
                    [2, 0, 0, 0],
                    [2, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [2, 2, 2, 0],
                    [0, 0, 2, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
            ],
            // 方块05
            5: [
                [
                    [2, 0, 0, 0],
                    [2, 2, 0, 0],
                    [2, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [2, 2, 2, 0],
                    [0, 2, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 2, 0, 0],
                    [2, 2, 0, 0],
                    [0, 2, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 2, 0, 0],
                    [2, 2, 2, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
            ],
            // 方块06
            6: [
                [
                    [2, 2, 0, 0],
                    [2, 2, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [2, 2, 0, 0],
                    [2, 2, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
            ],
            7: [
                [
                    [0, 2, 0, 0],
                    [2, 2, 0, 0],
                    [2, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [2, 2, 0, 0],
                    [0, 2, 2, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
            ]
        };
        // 原点
        this.origin = {
            x: 0,
            y: 0
        };
        // 随机方向
        // direction 英[dəˈrekʃn] 美[dɪˈrɛkʃən, daɪ-]
        this.dir = 0;
        this.rotates = this.SQUARES[index];
    }
    // 检查数据是否合法
    Square.prototype.isValid = function (pos, data, stageArray) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0) {
                    if (!CAPR.checkPoint(pos, i, j, stageArray)) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    // 是否能旋转
    Square.prototype.canRotate = function (stageArray) {
        var len = this.rotates.length;
        var index = (this.dir + 1) % len;
        var test = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        for (var i = 0; i < this.data.length; i++) {
            for (var j = 0; j < this.data[0].length; j++) {
                test[i][j] = this.rotates[index][i][j];
            }
        }
        return this.isValid(this.origin, test, stageArray);
    };
    Square.prototype.rotate = function (num) {
        if (num === void 0) { num = 1; }
        var i, j;
        this.dir = (this.dir + num) % this.rotates.length;
        for (i = 0; i < this.data.length; i++) {
            for (j = 0; j < this.data[0].length; j++) {
                this.data[i][j] = this.rotates[this.dir][i][j];
            }
        }
    };
    // 是否能下降
    Square.prototype.canDown = function (stageArray) {
        var test = {};
        test.x = this.origin.x + 1;
        test.y = this.origin.y;
        return this.isValid(test, this.data, stageArray);
    };
    Square.prototype.down = function () {
        this.origin.x += 1;
    };
    // 是否能左移
    Square.prototype.canLeft = function (stageArray) {
        var test = {};
        test.x = this.origin.x;
        test.y = this.origin.y - 1;
        return this.isValid(test, this.data, stageArray);
    };
    Square.prototype.left = function () {
        this.origin.y -= 1;
    };
    // 是否能右移
    Square.prototype.canRight = function (stageArray) {
        var test = {};
        test.x = this.origin.x;
        test.y = this.origin.y + 1;
        return this.isValid(test, this.data, stageArray);
    };
    Square.prototype.right = function () {
        this.origin.y += 1;
    };
    // 是否能上移
    Square.prototype.canUp = function (stageArray) {
        var test = {};
        test.x = this.origin.x - 1;
        test.y = this.origin.y;
        return this.isValid(test, this.data, stageArray);
    };
    Square.prototype.up = function () {
        this.origin.x -= 1;
    };
    return Square;
}());
/**
 * ***************************************************
 * Tetris
 * ***************************************************
 */
// 消息码及提示
var CODES = {
    0: 'Tetris readied',
    1: '浏览器版本过低，请升级浏览器',
    2: '创建Tetris DOM失败，请升级浏览器或引入jQuery/Zepte库'
};
// Tetris
var Tetris = /** @class */ (function () {
    // constructor
    function Tetris(opts) {
        // 方块下落时间间隔
        this.INTERVAL = 500;
        // 游戏时间，单位秒
        this.gameTimes = 0;
        // 游戏是否结束
        this.isGameOver = false;
        // 是否暂停
        this.isPause = false;
        // 游戏计分
        this.gameScores = 0;
        // 游戏舞台二维矩阵
        this.stageArray = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        // 舞台方块数据divs
        this.stageDivs = [];
        // 下一个方块组数据
        this.nextDivs = [];
        // 默认配置参数
        this.opts = {
            // 游戏容器，默认为body
            container: 'body',
            ready: function (res) { },
            error: function (err) { }
        };
        // 游戏外部DOM容器(父容器)
        this.outerDom = null;
        // 游戏容器
        this.dom = null;
        // DOM id
        this.domId = "Tetris_" + new Date().getTime();
        this.opts = CAPR.extend(opts, this.opts);
        this.outerDom = CAPR.q(this.opts.container);
        this.init();
    }
    // 创建游戏DOM
    Tetris.prototype.createGameDom = function (callback) {
        this.dom = document.createElement('div');
        this.dom.className = 'capricorncd-tetris-container';
        this.dom.id = this.domId;
        this.dom.innerHTML = "\n      <div class=\"tetris-stage\"></div>\n      <div class=\"tetris-sider-wrapper\">\n        <div class=\"next-square\"></div>\n        <div class=\"tetris-statistics\">\n          <div class=\"game-times\">\n            <span class=\"times\">00:00</span>\n          </div>\n          <div class=\"game-scores\">\n            <span class=\"score\">0</span>\n          </div>\n        </div>\n        <div class=\"control-wrapper\">\n          <button class=\"tetris-setup\">Setup</button>\n          <button class=\"tetris-restart\">Restart</button>\n          <button class=\"tetris-pause\">Pause</button>\n        </div>\n      </div>\n    \n      <div class=\"tetris-control-wrapper\">\n        <div class=\"grid-wrapper\">\n          <div class=\"grid\"></div>\n          <div class=\"grid\">\n            <button class=\"btn-rotate\">Rotate</button>\n          </div>\n          <div class=\"grid\"></div>\n        </div>\n        <div class=\"grid-wrapper\">\n          <div class=\"grid\">\n            <button class=\"btn-left\">Left</button>\n          </div>\n          <div class=\"grid\">\n            <button class=\"btn-fall\">OK</button>\n          </div>\n          <div class=\"grid\">\n            <button class=\"btn-right\">Right</button>\n          </div>\n        </div>\n        <div class=\"grid-wrapper\">\n          <div class=\"grid\"></div>\n          <div class=\"grid\">\n            <button class=\"btn-down\">Down</button>\n          </div>\n          <div class=\"grid\"></div>\n        </div>\n      </div>\n    ";
        if (this.outerDom) {
            this.outerDom.innerHTML = '';
            this.outerDom.appendChild(this.dom);
            this.opts.ready({ code: 0, msg: CODES[0] + " in '" + this.opts.container + "'" });
            callback();
        }
        else {
            this.opts.error({ code: 2, msg: CODES[2] });
        }
    };
    // 游戏控制
    Tetris.prototype.gameController = function () {
        var _this = this;
        // 绑定键盘事件
        CAPR.eventListener(document, 'keydown', function (e) {
            e = e || event;
            var code = e.keyCode;
            // pause
            if (code === 13) {
                if (_this.isGameOver)
                    return;
                _this.pause();
            }
            if (code === 16) {
                _this.restart();
            }
            // 游戏已暂停
            if (_this.isPause) {
                return;
            }
            // up(rotate)旋转方块
            if (code === 38) {
                _this.rotate();
            }
            else if (code === 39) {
                _this.right();
            }
            else if (code === 40) {
                _this.down();
            }
            else if (code === 37) {
                _this.left();
            }
            else if (code === 32) {
                _this.fall();
            }
        });
        // 绑定按钮事件
        CAPR.eventListener(CAPR.q("#" + this.domId + " .btn-left"), 'click', function () {
            if (_this.isPause)
                return;
            _this.left();
        });
        CAPR.eventListener(CAPR.q("#" + this.domId + " .btn-right"), 'click', function () {
            if (_this.isPause)
                return;
            _this.right();
        });
        CAPR.eventListener(CAPR.q("#" + this.domId + " .btn-down"), 'click', function () {
            if (_this.isPause)
                return;
            _this.down();
        });
        CAPR.eventListener(CAPR.q("#" + this.domId + " .btn-rotate"), 'click', function () {
            if (_this.isPause)
                return;
            _this.rotate();
        });
        CAPR.eventListener(CAPR.q("#" + this.domId + " .btn-fall"), 'click', function () {
            if (_this.isPause)
                return;
            _this.fall();
        });
        CAPR.eventListener(CAPR.q("#" + this.domId + " .tetris-pause"), 'click', function () {
            if (_this.isGameOver)
                return;
            _this.pause();
        });
        CAPR.eventListener(CAPR.q("#" + this.domId + " .tetris-restart"), 'click', function () {
            _this.restart();
        });
        CAPR.eventListener(CAPR.q("#" + this.domId + " .tetris-setup"), 'click', function () {
            alert('Developing...');
        });
    };
    // 初始化Div
    Tetris.prototype.initDiv = function (container, data, divs) {
        var ieVer = CAPR.ieBrowerVersion();
        for (var i = 0; i < data.length; i++) {
            var arr = [];
            for (var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement('div');
                newNode.className = 'none';
                if (CAPR.isIEBrower && ieVer <= 9) {
                    newNode.style.top = (i * 20) + 'px';
                    newNode.style.left = (j * 20) + 'px';
                }
                else {
                    newNode.style.transform = "translate(" + j * 20 + "px, " + i * 20 + "px)";
                }
                container.appendChild(newNode);
                arr.push(newNode);
            }
            divs.push(arr);
        }
    };
    // 刷新div
    Tetris.prototype.refreshDiv = function (data, divs) {
        if (data === void 0) { data = this.stageArray; }
        if (divs === void 0) { divs = this.stageDivs; }
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] === 0) {
                    divs[i][j].className = 'none';
                }
                else if (data[i][j] === 1) {
                    divs[i][j].className = 'done';
                }
                else if (data[i][j] === 2) {
                    divs[i][j].className = 'current';
                }
            }
        }
    };
    // 重置方块位置
    Tetris.prototype.resetPos = function (type) {
        if (type === void 0) { type = 'set'; }
        var i, j, x, y;
        x = this.currSquare.origin.x;
        y = this.currSquare.origin.y;
        for (i = 0; i < this.currSquare.data.length; i++) {
            for (j = 0; j < this.currSquare.data[0].length; j++) {
                if (CAPR.checkPoint(this.currSquare.origin, i, j, this.stageArray)) {
                    // 清除移动后的方块位置
                    if ('clear' === type) {
                        this.stageArray[x + i][y + j] = 0;
                    }
                    else if ('set' === type) {
                        this.stageArray[x + i][y + j] = this.currSquare.data[i][j];
                    }
                }
            }
        }
    };
    // 旋转方块
    Tetris.prototype.rotate = function () {
        if (this.currSquare.canRotate(this.stageArray)) {
            this.resetPos('clear');
            this.currSquare.rotate();
            this.resetPos('set');
            this.refreshDiv();
        }
    };
    // 左移方块
    Tetris.prototype.left = function () {
        if (this.currSquare.canLeft(this.stageArray)) {
            this.resetPos('clear');
            this.currSquare.left();
            this.resetPos('set');
            this.refreshDiv();
        }
    };
    // 右移方块
    Tetris.prototype.right = function () {
        if (this.currSquare.canRight(this.stageArray)) {
            this.resetPos('clear');
            this.currSquare.right();
            this.resetPos('set');
            this.refreshDiv();
        }
    };
    // 下移方块
    Tetris.prototype.down = function () {
        // 判断是否能继续下降
        if (this.currSquare.canDown(this.stageArray)) {
            this.resetPos('clear');
            this.currSquare.down();
            this.resetPos('set');
            this.refreshDiv();
            return true;
        }
        else {
            return false;
        }
    };
    // 落下方块
    Tetris.prototype.fall = function () {
        while (this.down())
            ;
    };
    // 方块移动到底部，固定方块
    Tetris.prototype.fixed = function () {
        var i, j;
        var data = this.currSquare.data;
        // console.log(data)
        for (i = 0; i < data.length; i++) {
            for (j = 0; j < data[0].length; j++) {
                if (CAPR.checkPoint(this.currSquare.origin, i, j, this.stageArray)) {
                    if (this.stageArray[this.currSquare.origin.x + i][this.currSquare.origin.y + j] == 2) {
                        this.stageArray[this.currSquare.origin.x + i][this.currSquare.origin.y + j] = 1;
                    }
                }
            }
        }
        this.refreshDiv();
    };
    // 检查游戏结束
    Tetris.prototype.checkGameOver = function () {
        var isOver = false;
        for (var i = 0; i < this.stageArray[0].length; i++) {
            if (this.stageArray[0][i] == 1) {
                isOver = true;
                break;
            }
        }
        return isOver;
    };
    // 使用下一个方块
    Tetris.prototype.performNext = function (type, dir) {
        this.currSquare = this.nextSquare;
        this.resetPos('set');
        this.nextSquare = this.make(type, dir);
        this.refreshDiv();
        this.refreshDiv(this.nextSquare.data, this.nextDivs);
    };
    // 清除填满方块的整行
    Tetris.prototype.checkClear = function () {
        var i, j, m, n, line = 0, len = this.stageArray.length;
        for (i = len - 1; i >= 0; i--) {
            var isClear = true;
            for (j = 0; j < this.stageArray[0].length; j++) {
                if (this.stageArray[i][j] != 1) {
                    isClear = false;
                    break;
                }
            }
            if (isClear) {
                line += 1;
                // 整体下移
                for (m = i; m > 0; m--) {
                    for (n = 0; n < this.stageArray[0].length; n++) {
                        this.stageArray[m][n] = this.stageArray[m - 1][n];
                    }
                }
                for (n = 0; n < this.stageArray[0].length; n++) {
                    this.stageArray[0][n] = 0;
                }
                i++;
            }
        }
        return line;
    };
    // 底部增加行
    Tetris.prototype.addTailLines = function (lines) {
        var i, j;
        var alen = this.stageArray.length;
        var llen = lines.length;
        for (i = 0; i < alen - llen; i++) {
            this.stageArray[i] = this.stageArray[i + llen];
        }
        for (j = 0; j < llen; j++) {
            this.stageArray[alen - llen + j] = lines[j];
        }
        this.currSquare.origin.x -= llen;
        if (this.currSquare.origin.x < 0) {
            this.currSquare.origin.x = 0;
        }
        this.refreshDiv();
    };
    // 创建方块(组)
    Tetris.prototype.make = function (index, dir) {
        if (index === void 0) { index = 1; }
        var s = new Square(index);
        s.origin.x = 0;
        s.origin.y = 3;
        s.rotate(dir);
        return s;
    };
    /**
     * *******************************************************
     * 游戏操作
     * *******************************************************
     */
    // 下落
    Tetris.prototype.move = function () {
        if (!this.down()) {
            this.fixed();
            var line = this.checkClear();
            this.addScore(line);
            if (this.checkGameOver()) {
                this.stop();
            }
            else {
                this.performNext(CAPR.rand(7), CAPR.rand(4));
            }
        }
    };
    // 开始游戏
    // start () {
    //   if (this.isGameOver) {
    //     return
    //   }
    //   if (this.moveTimer) {
    //     clearInterval(this.moveTimer)
    //     this.moveTimer = null
    //   }
    //   if (this.gameTimer) {
    //     clearInterval(this.gameTimer)
    //     this.gameTimer = null
    //   }
    //   this.isPause = false
    //   // 游戏计时
    //   this.gameTimeMeter(0)
    //   this.INTERVAL = 500
    //   this.gameTimes = 0
    //   this.gameScores = 0
    //
    //   // 下一个方块
    //   this.performNext(CAPR.rand(7), CAPR.rand(4))
    //   this.moveTimer = setInterval(() => {
    //     this.move()
    //   }, this.INTERVAL)
    //   CAPR.q(`#${this.domId} .tetris-pause`).innerText = 'Pause'
    // }
    // 暂停游戏
    Tetris.prototype.pause = function () {
        var _this = this;
        if (this.isGameOver)
            return;
        if (this.isPause) {
            this.isPause = false;
            this.moveTimer = setInterval(function () {
                _this.move();
            }, this.INTERVAL);
            this.gameTimeMeter(this.gameTimes);
            CAPR.q("#" + this.domId + " .tetris-pause").innerText = 'Pause';
            // console.log('开始')
        }
        else {
            this.isPause = true;
            if (this.moveTimer) {
                clearInterval(this.moveTimer);
                this.moveTimer = null;
            }
            if (this.gameTimer) {
                clearInterval(this.gameTimer);
                this.gameTimer = null;
            }
            CAPR.q("#" + this.domId + " .tetris-pause").innerText = 'Start';
            // console.log('暂停')
        }
    };
    // 重新开始游戏
    Tetris.prototype.restart = function () {
        var _this = this;
        if (this.moveTimer) {
            clearInterval(this.moveTimer);
            this.moveTimer = null;
        }
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
        for (var i = 0; i < this.stageArray.length; i++) {
            for (var j = 0; j < this.stageArray[0].length; j++) {
                this.stageArray[i][j] = 0;
            }
        }
        // 初始化舞台方块
        this.nextSquare = this.make(CAPR.rand(7), CAPR.rand(4));
        this.refreshDiv();
        this.refreshDiv(this.nextSquare.data, this.nextDivs);
        this.isGameOver = false;
        this.isPause = false;
        // 游戏计时
        this.gameTimeMeter(0);
        this.INTERVAL = 500;
        this.gameTimes = 0;
        this.gameScores = 0;
        // 下一个方块
        this.performNext(CAPR.rand(7), CAPR.rand(4));
        this.moveTimer = setInterval(function () {
            _this.move();
        }, this.INTERVAL);
        CAPR.q("#" + this.domId + " .tetris-pause").innerText = 'Pause';
        CAPR.q("#" + this.domId).className = 'capricorncd-tetris-container';
    };
    // gameOver
    Tetris.prototype.stop = function () {
        this.isGameOver = true;
        if (this.moveTimer) {
            clearInterval(this.moveTimer);
            this.moveTimer = null;
        }
        CAPR.q("#" + this.domId).className = 'capricorncd-tetris-container game-over';
    };
    // 游戏进行时间，单位秒
    Tetris.prototype.gameTimeMeter = function (initCount) {
        var _this = this;
        if (initCount === void 0) { initCount = 0; }
        this.gameTimer = setInterval(function () {
            _this.gameTimes++;
            CAPR.q("#" + _this.domId + " .times").innerText = CAPR.ft(_this.gameTimes);
            if (_this.isGameOver) {
                clearInterval(_this.gameTimer);
            }
            // 生成干扰行
            // if (this.gameTimes % 10 === 0) {
            //   this.addTailLines(CAPR.rand(1))
            // }
        }, 1000);
    };
    // 游戏分数统计
    Tetris.prototype.addScore = function (line) {
        var s = 0;
        switch (line) {
            case 1:
                s = 10;
                break;
            case 2:
                s = 30;
                break;
            case 3:
                s = 60;
                break;
            case 4:
                s = 100;
                break;
        }
        this.gameScores += s;
        CAPR.q("#" + this.domId + " .score").innerText = this.gameScores;
        // 下落时间间隔
        this.setDownInterval(this.gameScores);
    };
    // 设置下落时间间隔/速度控制
    Tetris.prototype.setDownInterval = function (score) {
        if (score > 4000) {
            this.INTERVAL = 100;
        }
        else if (score > 3500) {
            this.INTERVAL = 150;
        }
        else if (score > 3000) {
            this.INTERVAL = 200;
        }
        else if (score > 2500) {
            this.INTERVAL = 250;
        }
        else if (score > 2000) {
            this.INTERVAL = 300;
        }
        else if (score > 1500) {
            this.INTERVAL = 350;
        }
        else if (score > 1000) {
            this.INTERVAL = 400;
        }
        else if (score > 500) {
            this.INTERVAL = 450;
        }
    };
    // 初始化游戏
    Tetris.prototype.init = function () {
        var _this = this;
        // 创建游戏DOM
        this.createGameDom(function () {
            _this.nextSquare = _this.make(CAPR.rand(7), CAPR.rand(4));
            // 初始化舞台方块
            _this.initDiv(CAPR.q("#" + _this.domId + " .tetris-stage"), _this.stageArray, _this.stageDivs);
            _this.initDiv(CAPR.q("#" + _this.domId + " .next-square"), _this.nextSquare.data, _this.nextDivs);
            _this.refreshDiv(_this.nextSquare.data, _this.nextDivs);
            _this.gameController();
            // 下一个方块
            _this.performNext(CAPR.rand(7), CAPR.rand(4));
            _this.moveTimer = setInterval(function () {
                _this.move();
            }, _this.INTERVAL);
            // 游戏计时
            _this.gameTimeMeter();
            // IE浏览器移除底部控制按钮
            if (CAPR.isIEBrower && CAPR.ieBrowerVersion() < 10) {
                var body = CAPR.q('body');
                var bodyClassName = body.className || '';
                if (bodyClassName.indexOf('ie-brower') === -1) {
                    body.className = 'ie-brower ' + bodyClassName;
                }
            }
        });
    };
    return Tetris;
}());
