var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Core;
(function (Core) {
    var TYPE;
    (function (TYPE) {
        TYPE[TYPE["UNKNOWN"] = 0] = "UNKNOWN";
        TYPE[TYPE["TEXT"] = 1] = "TEXT";
    })(TYPE = Core.TYPE || (Core.TYPE = {}));
    var CNode = (function () {
        function CNode(x, y) {
            this.type = TYPE.UNKNOWN;
            this.x = x;
            this.y = y;
            this.zoom = 1.0;
            this.font_size = 16;
            this.bg_clr = '#FFF';
            this.font_family = "宋体";
            this.fg_clr = '#000';
        }
        CNode.prototype.setFontSize = function (fontSize) {
            this.font_size = fontSize;
        };
        CNode.prototype.getFontSize = function () {
            return this.font_size;
        };
        CNode.prototype.setFontFamily = function (fontFamily) {
            this.font_family = fontFamily;
        };
        CNode.prototype.getFontFamily = function () {
            return this.font_family;
        };
        CNode.prototype.setBackClr = function (clr) {
            this.bg_clr = clr;
        };
        CNode.prototype.setFrontClr = function (clr) {
            this.fg_clr = clr;
        };
        CNode.prototype.getBackClr = function () {
            return this.bg_clr;
        };
        CNode.prototype.getFrontClr = function () {
            return this.fg_clr;
        };
        CNode.prototype.zoomIn = function (factor) {
            this.zoom *= factor;
        };
        CNode.prototype.zoomOut = function (factor) {
            this.zoom /= factor;
        };
        CNode.prototype.moveTo = function (toX, toY) {
            this.x = toX;
            this.y = toY;
        };
        CNode.prototype.offsetX = function (x) {
            this.x += x;
        };
        CNode.prototype.offsetY = function (y) {
            this.y = y;
        };
        CNode.prototype.offsetXY = function (x, y) {
            this.x += x;
            this.y += y;
        };
        CNode.prototype.canMove = function () {
            return this.movable;
        };
        CNode.prototype.isVisible = function () {
            return this.visible;
        };
        CNode.prototype.setVisible = function (bVisible) {
            this.visible = bVisible;
        };
        CNode.prototype.hidden = function () {
            this.visible = false;
        };
        return CNode;
    }());
    Core.CNode = CNode;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Context = (function () {
        function Context(id, width, height) {
            this.id = id;
            this.width = width;
            this.height = height;
        }
        Context.prototype.getRender2D = function () {
            return this.render2D;
        };
        Context.prototype.createCanvas = function (width, height) {
            this.canvas = document.getElementById(this.id);
            this.canvas.width = width;
            this.canvas.height = height;
            document.body.appendChild(this.canvas);
        };
        Context.prototype.clear = function () {
            this.render2D.fillStyle = "#FFF";
            this.render2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
        Context.prototype.bootstrap = function () {
            this.createCanvas(this.width, this.height);
            this.render2D = this.canvas.getContext("2d");
            this.clear();
            ctx = this.render2D;
        };
        return Context;
    }());
    Core.Context = Context;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var CTextNode = (function (_super) {
        __extends(CTextNode, _super);
        function CTextNode(x, y, text) {
            if (x === void 0) { x = 10; }
            if (y === void 0) { y = 10; }
            if (text === void 0) { text = ''; }
            var _this = _super.call(this, x, y) || this;
            _this.type = Core.TYPE.TEXT;
            _this.text = text;
            _this.width = 0;
            _this.height = y;
            return _this;
        }
        CTextNode.prototype.onHitTest = function (xCursor, yCursor) {
            return (xCursor >= this.x && yCursor >= this.y
                && xCursor <= (this.x + this.width) && yCursor <= (this.y + this.height));
        };
        CTextNode.prototype.draw = function () {
            console.log(this.text, this.x, this.y);
            ctx.beginPath();
            ctx.translate(0.5, 0.5);
            ctx.fillStyle = this.fg_clr;
            ctx.strokeStyle = this.fg_clr;
            ctx.font = this.font_size + 'px ' + this.font_family;
            ctx.textBaseline = "middle";
            ctx.textAlign = 'left';
            ctx.fillText(this.text, this.x, this.y);
            ctx.stroke();
            ctx.closePath();
        };
        return CTextNode;
    }(Core.CNode));
    Core.CTextNode = CTextNode;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var CScene = (function () {
        function CScene() {
            this.X_SPACE = 20;
            this.Y_SPACE = 20;
            this.ACTIVE_OLD_TREE = 1;
            this.ACTIVE_NEW_TREE = 2;
            this.ACTIVE_NON_TREE = -1;
            this.old_tree = null;
            this.new_tree = null;
            this.old_build_tree = null;
            this.new_build_tree = null;
            this.old_tree_nodes = [];
            this.new_tree_nodes = [];
            this.visit_count = 0;
            this.xOldStart = 0;
            this.yOldStart = 0;
            this.xNewStart = 0;
            this.yNewStart = 0;
            this.active_tree = this.ACTIVE_NON_TREE;
        }
        CScene.prototype.bootstrap = function () {
            this.initLocalOldTree();
            this.initLocalNewTree();
            this.buildOldTree();
            this.buildNewTree();
            this.layoutOldTree();
            this.layoutNewTree();
        };
        CScene.prototype.onHitTest = function (xCursor, yCursor) {
            for (var j = 0; j < this.new_tree_nodes.length; j++) {
                var bHit = this.new_tree_nodes[j].onHitTest(xCursor, yCursor);
                if (bHit) {
                    this.active_tree = this.ACTIVE_NEW_TREE;
                    break;
                }
            }
            for (var i = 0; i < this.old_tree_nodes.length; i++) {
                var bHit = this.old_tree_nodes[i].onHitTest(xCursor, yCursor);
                if (bHit) {
                    this.active_tree = this.ACTIVE_OLD_TREE;
                    break;
                }
            }
        };
        CScene.prototype.draw = function () {
            for (var i = 0; i < this.old_tree_nodes.length; i++) {
                this.old_tree_nodes[i].draw();
            }
            for (var j = 0; j < this.new_tree_nodes.length; j++) {
                this.new_tree_nodes[j].draw();
            }
        };
        CScene.prototype.layoutOldTree = function () {
            var _this = this;
            this.old_build_tree.forEach(function (v, i) {
                _this.visitNode(v, i, true);
            });
        };
        CScene.prototype.layoutNewTree = function () {
            var _this = this;
            this.new_build_tree.forEach(function (v, i) {
                _this.visitNode(v, i, false);
            });
        };
        CScene.prototype.visitNode = function (v, level, is_old_tree) {
            var _this = this;
            if (is_old_tree === void 0) { is_old_tree = true; }
            console.log(v['name']);
            this.visit_count++;
            var ySpace = this.Y_SPACE * this.visit_count;
            var xSpace = this.X_SPACE * level;
            var x = (is_old_tree ? this.xOldStart : this.xNewStart) + xSpace;
            var y = (is_old_tree ? this.yOldStart : this.yNewStart) + ySpace;
            var _node = new Core.CTextNode(x, y, v['name']);
            if (is_old_tree) {
                this.old_tree_nodes.push(_node);
            }
            else {
                this.new_tree_nodes.push(_node);
            }
            if (v['children'] && v['children'].length) {
                v['children'].forEach(function (sub_v) {
                    _this.visitNode(sub_v, level + 1, is_old_tree);
                });
            }
        };
        CScene.prototype.buildOldTree = function () {
            if (this.old_build_tree === null) {
                this.old_build_tree = CScene.buildTree(this.old_tree);
                console.log(">>>>>>>>>>>>>>>>>old_buld_tree<<<<<<<<<<<<<<<<");
                console.log(JSON.stringify(this.old_build_tree));
            }
        };
        CScene.prototype.buildNewTree = function () {
            if (this.new_build_tree === null) {
                this.new_build_tree = CScene.buildTree(this.new_tree);
                console.log(">>>>>>>>>>>>>>>>>new_buld_tree<<<<<<<<<<<<<<<<");
                console.log(JSON.stringify(this.new_build_tree));
            }
        };
        CScene.is_callable = function (func) {
            return (typeof func === "function");
        };
        CScene.buildTree = function (array, callback, parent_id, level, child_node) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (parent_id === void 0) { parent_id = 0; }
            if (level === void 0) { level = 1; }
            if (child_node === void 0) { child_node = "children"; }
            var tree = [];
            array.forEach(function (v, k) {
                if (v['parent_id'] === parent_id) {
                    delete array[k];
                    var tmp = CScene.is_callable(callback) ? callback.call(_this, v) : v;
                    tmp['level'] = level;
                    var children = CScene.buildTree(array, callback, v['id'], level + 1, child_node);
                    if (children.length) {
                        tmp[child_node] = children;
                    }
                    tree.push(tmp);
                }
            });
            return tree;
        };
        CScene.prototype.initLocalOldTree = function () {
            this.old_tree = [
                {
                    "id": 1, "parent_id": 0, "name": "一级菜单",
                }, {
                    "id": 2, "parent_id": 1, "name": "二级菜单1",
                }, {
                    "id": 3, "parent_id": 1, "name": "二级菜单2",
                }, {
                    "id": 4, "parent_id": 2, "name": "三级菜单1",
                }
            ];
        };
        CScene.prototype.initLocalNewTree = function () {
            this.new_tree = [
                {
                    "id": 1, "parent_id": 0, "name": "一级菜单",
                }, {
                    "id": 2, "parent_id": 1, "name": "二级菜单1",
                }, {
                    "id": 3, "parent_id": 1, "name": "二级菜单2",
                }, {
                    "id": 4, "parent_id": 2, "name": "三级菜单1",
                }, {
                    "id": 5, "parent_id": 2, "name": "三级菜单2",
                }
            ];
        };
        return CScene;
    }());
    Core.CScene = CScene;
})(Core || (Core = {}));
var FlatFish;
(function (FlatFish) {
    var CApp = (function () {
        function CApp(appId) {
            this._bootstrap = false;
            this.appId = appId;
            this.errors = [];
            var $app = $('#' + appId);
            var width = $app.width();
            var height = $app.height();
            this.ctx = new Core.Context(appId, width, height);
            this.scene = new Core.CScene();
        }
        CApp.prototype.getContext = function () {
            return this.ctx.getRender2D();
        };
        CApp.prototype.run = function () {
            var that = this;
            try {
                this.ctx.bootstrap();
                this.scene.bootstrap();
                this.scene.draw();
            }
            catch (e) {
                console.log(e);
                that.errors.push(e);
            }
            this._bootstrap = true;
        };
        return CApp;
    }());
    FlatFish.CApp = CApp;
})(FlatFish || (FlatFish = {}));
var ctx;
var app = new FlatFish.CApp('flatfish');
app.run();
//# sourceMappingURL=flatfish.js.map