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

/// <reference path="text_node.ts"/>
namespace Core {
   export class CScene {
        readonly X_SPACE:number = 20;
        readonly Y_SPACE:number = 20;
        readonly ACTIVE_OLD_TREE:number = 1;
        readonly ACTIVE_NEW_TREE:number = 2;
        readonly ACTIVE_NON_TREE:number = -1;
        protected old_tree: any;
        protected new_tree: any;
        protected old_build_tree: any;
        protected new_build_tree: any;
        protected old_tree_nodes:CTextNode[];
        protected new_tree_nodes:CTextNode[];
        protected visit_count:number;
        protected xOldStart:number;
        protected yOldStart:number;
        protected xNewStart:number;
        protected yNewStart:number;
        protected active_tree:any;
        constructor() {
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
        bootstrap(){
            // 初始化数据
            this.initLocalOldTree();
            this.initLocalNewTree();
            // 将二维数组转化为JSON嵌套数组
            this.buildOldTree();
            this.buildNewTree();
            // 计算每个节点的顺序
            this.layoutOldTree();
            this.layoutNewTree();
        }
        onHitTest(xCursor:number,yCursor:number):void{
            for(let j=0; j<this.new_tree_nodes.length; j++){
                let bHit:boolean = this.new_tree_nodes[j].onHitTest(xCursor,yCursor);
                if(bHit){
                    this.active_tree = this.ACTIVE_NEW_TREE;
                    break;
                }
            }
            for(let i=0; i<this.old_tree_nodes.length; i++){
                let bHit:boolean = this.old_tree_nodes[i].onHitTest(xCursor,yCursor);
                if(bHit){
                    this.active_tree = this.ACTIVE_OLD_TREE;
                    break;
                }
            }
        }
        draw(){
            for(let i=0;i<this.old_tree_nodes.length;i++){
                this.old_tree_nodes[i].draw();
            }
            for(let j=0;j<this.new_tree_nodes.length;j++){
                this.new_tree_nodes[j].draw();
            }
        }
        /*
         * @func 计算老树的布局
         */
        layoutOldTree():void{
            this.old_build_tree.forEach((v,i)=>{
                this.visitNode(v,i,true);
            });
        }
        /*
         * @func 计算新树的布局
         */
        layoutNewTree():void{
            this.new_build_tree.forEach((v,i)=>{
                this.visitNode(v,i,false);
            });
        }
        /*
         * @func 深度遍历
         * @para text text节点的内容
         * @para level int 当前访问的层级
         * @para is_old_tree 是否是老树
         */
        visitNode(text:string,level:number,is_old_tree:boolean=true):void{
            this.visit_count++;
            let ySpace = this.Y_SPACE * this.visit_count;
            let xSpace = this.X_SPACE * level;
            let x = (is_old_tree?this.xOldStart:this.xNewStart) + xSpace;
            let y = (is_old_tree?this.yOldStart:this.yNewStart) + ySpace;
            let _node = new CTextNode(x,y,text);
            if(is_old_tree){
                this.old_tree_nodes.push(_node);
            }else {
                this.new_tree_nodes.push(_node);
            }
        }

        /*
         * @func 获取老树状菜单的结构
         * @return 老树状菜单JSON数据
         */
        buildOldTree() {
            if (this.old_build_tree === null) {
                this.old_build_tree = this.buildTree(this.old_tree);
            }
        }

        /*
         * @func 获取新树状菜单的结构
         * @return 新树状菜单JSON数据
         */
        buildNewTree() {
            if (this.new_build_tree === null) {
                this.new_build_tree = this.buildTree(this.new_tree);
            }
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
        buildTree(array:any, callback: any = null, parent_id: number = 0, level:number=0,child_node: string = "children"): any {
            let tree = [];
            let that: any = this;
            array.forEach((v, k, arr) => {
                if (v['parent_id'] === parent_id) {
                    delete array[k];
                    let tmp = that.is_callable(callback) ? callback.call(this, v) : v;
                    tmp['level'] = level;
                    let children = this.buildTree(array, callback, v['id'],level+1, child_node);
                    if (children) {
                        tmp[child_node] = children;
                    }
                    tree.push(tmp);
                }
            });
            return tree;
        }
        /*
         * 初始化老树
         */
       initLocalOldTree() {
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
       }
       /*
        * @func 初始化新树
        */
       initLocalNewTree(){
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
    }
}