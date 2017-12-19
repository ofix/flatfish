var Core;
(function (Core) {
    var CScene = (function () {
        function CScene() {
            this.X_SPACE = 20;
            this.Y_SPACE = 20;
            this.old_tree = null;
            this.new_tree = null;
            this.old_build_tree = null;
            this.new_build_tree = null;
            this.tree_nodes = [];
            this.visit_count = 0;
            this.xOldStart = 0;
            this.yOldStart = 0;
            this.xNewStart = 0;
            this.yNewStart = 0;
        }
        CScene.prototype.bootstrap = function () {
            this.initLocalOldTree();
            this.initLocalNewTree();
            this.buildOldTree();
            this.buildNewTree();
            this.layoutOldTree();
            this.layoutNewTree();
        };
        CScene.prototype.draw = function () {
            for (var i = 0; i < this.tree_nodes.length; i++) {
                this.tree_nodes[i].draw();
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
        CScene.prototype.visitNode = function (text, level, is_old_tree) {
            if (is_old_tree === void 0) { is_old_tree = true; }
            this.visit_count++;
            var ySpace = this.Y_SPACE * this.visit_count;
            var xSpace = this.X_SPACE * level;
            var x = (is_old_tree ? this.xOldStart : this.xNewStart) + xSpace;
            var y = (is_old_tree ? this.yOldStart : this.yNewStart) + ySpace;
            var _node = new Core.CTextNode(x, y, text);
            this.tree_nodes.push(_node);
        };
        CScene.prototype.buildOldTree = function () {
            if (this.old_build_tree === null) {
                this.old_build_tree = this.buildTree(this.old_tree);
            }
        };
        CScene.prototype.buildNewTree = function () {
            if (this.new_build_tree === null) {
                this.new_build_tree = this.buildTree(this.new_tree);
            }
        };
        CScene.is_callable = function (func) {
            return (typeof func === "function");
        };
        CScene.prototype.buildTree = function (array, callback, parent_id, child_node) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (parent_id === void 0) { parent_id = 0; }
            if (child_node === void 0) { child_node = "children"; }
            var tree = [];
            var that = this;
            array.forEach(function (v, k, arr) {
                if (v['parent_id'] === parent_id) {
                    delete array[k];
                    var tmp = that.is_callable(callback) ? callback.call(_this, v) : v;
                    var children = _this.buildTree(array, callback, v['id'], child_node);
                    if (children) {
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
//# sourceMappingURL=scene.js.map