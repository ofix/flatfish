var core;
(function (core) {
    var CTree = /** @class */ (function () {
        function CTree(old_tree, new_tree) {
            this.old_tree = old_tree;
            this.new_tree = new_tree;
            this.old_build_tree = null;
            this.new_build_tree = null;
        }
        CTree.prototype.getLocalOldTree = function () {
            this.old_tree = [
                {
                    "id": 1, "parent_id": 0, "name": "一级菜单"
                }, {
                    "id": 2, "parent_id": 1, "name": "二级菜单1"
                }, {
                    "id": 3, "parent_id": 1, "name": "二级菜单2"
                }, {
                    "id": 4, "parent_id": 2, "name": "三级菜单1"
                }
            ];
            this.new_tree = [
                {
                    "id": 1, "parent_id": 0, "name": "一级菜单"
                }, {
                    "id": 2, "parent_id": 1, "name": "二级菜单1"
                }, {
                    "id": 3, "parent_id": 1, "name": "二级菜单2"
                }, {
                    "id": 4, "parent_id": 2, "name": "三级菜单1"
                }, {
                    "id": 5, "parent_id": 2, "name": "三级菜单2"
                }
            ];
        };
        /*
         * @func 获取老树状菜单的结构
         * @return 老树状菜单JSON数据
         */
        CTree.prototype.getOldBuildTree = function () {
            if (this.old_build_tree === null) {
                this.old_build_tree = this.buildTree(this.old_tree);
                return this.old_build_tree;
            }
            return this.old_build_tree;
        };
        /*
         * @func 获取新树状菜单的结构
         * @return 新树状菜单JSON数据
         */
        CTree.prototype.getNewBuildTree = function () {
            if (this.new_build_tree === null) {
                this.new_build_tree = this.buildTree(this.new_tree);
                return this.new_build_tree;
            }
            return this.new_build_tree;
        };
        CTree.is_callable = function (func) {
            return (typeof func === "function");
        };
        /*
         * @func 将二维数组转换成JSON树状数组
         * @para array 二维数组
         * @para callback 回调函数
         * @para parent_id 父ID
         * @para child_node 子节点键名
         */
        CTree.prototype.buildTree = function (array, callback, parent_id, child_node) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (parent_id === void 0) { parent_id = 0; }
            if (child_node === void 0) { child_node = "children"; }
            var tree = [];
            var that = this;
            array.forEach(function (v, k, arr) {
                if (v['parent_id'] == parent_id) {
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
        return CTree;
    }());
})(core || (core = {}));
