/*
 * This file is part of FlatFish.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author    code lighter
 * @copyright https://github.com/ofix
 * @qq        981326632
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 * @Date      2017/12/15
 * @Time      14:31
 */

/// <reference path="textnode.ts"/>
namespace core {
    class CTree {
        readonly X_SPACE:number = 20;
        readonly Y_SPACE:number = 20;
        protected old_tree: any;
        protected new_tree: any;
        protected old_build_tree: any;
        protected new_build_tree: any;
        protected tree_nodes:any;
        protected visit_count:number;
        protected xOldStart:number;
        protected yOldStart:number;
        protected xNewStart:number;
        protected yNewStart:number;
        constructor(old_tree: any, new_tree: any) {
            this.old_tree = old_tree;
            this.new_tree = new_tree;
            this.old_build_tree = null;
            this.new_build_tree = null;
            this.tree_nodes = [];
            this.visit_count = 0;
            this.xOldStart = 0;
            this.yOldStart = 0;
            this.xNewStart = 0;
            this.yNewStart = 0;
        }

        getLocalOldTree() {
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
        }

        layout():void{
            this.layoutOldBuildTree(0,0);
            this.layoutNewBuildTree(20,0);
        }
        layoutOldBuildTree(xStart:number,yStart:number):void{
            this.old_build_tree.forEach((v,i,a)=>{
                this.visitNode(v,i,true);
            });
        }
        layoutNewBuildTree(xStart:number,yStart:number):void{
            this.new_build_tree.forEach((v,i,a)=>{
                this.visitNode(v,i,false);
            });
        }

        visitNode(text:string,level:number,old_tree:boolean=true):void{
            this.visit_count++;
            let ySpace = this.Y_SPACE * this.visit_count;
            let xSpace = this.X_SPACE * level;
            let x = (old_tree?this.xOldStart:this.xNewStart) + xSpace;
            let y = (old_tree?this.yOldStart:this.yNewStart) + ySpace;
            let _node = new CTextNode(x,y,text);
            this.tree_nodes.push(_node);
        }

        /*
         * @func 获取老树状菜单的结构
         * @return 老树状菜单JSON数据
         */
        getOldBuildTree() {
            if (this.old_build_tree === null) {
                this.old_build_tree = this.buildTree(this.old_tree);
                return this.old_build_tree;
            }
            return this.old_build_tree;
        }

        /*
         * @func 获取新树状菜单的结构
         * @return 新树状菜单JSON数据
         */
        getNewBuildTree() {
            if (this.new_build_tree === null) {
                this.new_build_tree = this.buildTree(this.new_tree);
                return this.new_build_tree;
            }
            return this.new_build_tree;
        }

        static is_callable(func): boolean {
            return (typeof func === "function");
        }

        /*
         * @func 将二维数组转换成JSON树状数组
         * @para array 二维数组
         * @para callback 回调函数
         * @para parent_id 父ID
         * @para child_node 子节点键名
         */
        buildTree(array:any, callback: any = null, parent_id: number = 0, child_node: string = "children"): any {
            let tree = [];
            let that: any = this;
            array.forEach((v, k, arr) => {
                if (v['parent_id'] == parent_id) {
                    delete array[k];
                    let tmp = that.is_callable(callback) ? callback.call(this, v) : v;
                    let children = this.buildTree(array, callback, v['id'], child_node);
                    if (children) {
                        tmp[child_node] = children;
                    }
                    tree.push(tmp);
                }
            });
            return tree;
        }
    }
}