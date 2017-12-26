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

/// <reference path="TextNode.ts"/>
/// <reference path="lib/jquery.d.ts"/>
/// <reference path="DataOld.ts"/>
/// <reference path="DataNew.ts"/>
/// <reference path="Bound.ts"/>
/// <reference path="MiniTree.ts"/>
namespace Core {
   export class CScene {
        readonly ACTIVE_NON_TREE:number = -1;
        protected old_data: any[];
        protected new_data: any[];
        protected old_build_data: any;
        protected new_build_data: any;
        protected old_tree:CMiniTree[];
        protected new_tree:CMiniTree[];
        protected xOldStart:number;
        protected yOldStart:number;
        protected xNewStart:number;
        protected yNewStart:number;
        protected active_tree:any;
        protected old_tree_bound:CBound;
        protected new_tree_bound:CBound;
        constructor() {
            this.old_data = [];
            this.new_data = [];
            this.old_build_data = null;
            this.new_build_data = null;
            this.old_tree = [];
            this.new_tree = [];
            this.xOldStart = 100;
            this.yOldStart = 20;
            this.xNewStart = 0;
            this.yNewStart = 0;
            this.old_tree_bound = new CBound(0,0,0,0);
            this.new_tree_bound = new CBound(0,0,0,0);
            this.active_tree = this.ACTIVE_NON_TREE;
        }
        bootstrap(){
           // 初始化数据
           this.initLocalTree(true);
           this.initLocalTree(false);
           this.buildTree(true);
           this.buildTree(false);
           this.initTreeBound();
           canvas.height = this.old_tree_bound.y2+20;
        }
        initTreeBound($bOldTree:boolean=true){
            let tree:any = $bOldTree?this.old_tree:this.new_tree;
            let x1:number = 100000;
            let y1:number = 100000;
            let x2:number = 0;
            let y2:number = 0;
            for(let i=0; i<tree.length; i++){
                let bound:CBound = tree[i].getBound();
                if(bound.x1 <x1){
                    x1 = bound.x1;
                }
                if(bound.y1 <y1){
                    y1 = bound.y1;
                }
                if(bound.x2 > x2){
                    x2 = bound.x2;
                }
                if(bound.y2 > y2){
                    y2 = bound.y2;
                }
            }
            if($bOldTree){
                this.old_tree_bound = new CBound(x1,y1,x2,y2);
            }else{
                this.new_tree_bound = new CBound(x1,y1,x2,y2);
            }
        }

        draw(){
            ctx.translate(0.5, 0.5);
            this.old_tree.forEach((v)=>{
               v.draw();
            });
        }

        /*
         * @func 获取老树状菜单的结构
         * @return 老树状菜单JSON数据
         */
        buildTree(bOld:boolean) {
            if(bOld){
                this.old_build_data = CScene.buildTree(this.old_data);
                let miniX:number = this.xOldStart;
                let miniY:number = this.yOldStart;
                this.old_build_data.forEach((v)=>{
                    let tree:CMiniTree = new CMiniTree(v,miniX,miniY);
                    this.old_tree.push(tree);
                    miniY = tree.getBound().y2+30;
                });
            }else{
                this.new_build_data = CScene.buildTree(this.new_data);
                let miniX:number = this.xNewStart;
                let miniY:number = this.yNewStart;
                this.new_build_data.forEach((v)=>{
                    let tree:CMiniTree = new CMiniTree(v,miniX,miniY);
                    this.new_tree.push(tree);
                    miniY = tree.getBound().y2+30;
                });
            }
        }
        initLocalTree(bOld:boolean) {
           if(bOld) {
               this.old_data = old_tree;
           }else{
               this.new_data = new_tree;
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
        static buildTree(array:any, callback: any = null, parent_id: any = 0, level:number=1,child_node: string = "children"): any {
            let tree = [];
            array.forEach((v, k) => {
                if (v['parent_id'] == parseInt(parent_id)) {
                    delete array[k];
                    let tmp = CScene.is_callable(callback) ? callback.call(this, v) : v;
                    tmp['level'] = level;
                    let children = CScene.buildTree(array, callback, v['id'],level+1, child_node);
                    if (children.length) {
                        tmp[child_node] = children;
                    }
                    tree.push(tmp);
                }
            });
            return tree;
        }
    }
}