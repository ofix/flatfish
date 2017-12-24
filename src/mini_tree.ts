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
 * @Date      2017/12/24
 * @Time      15:36
 */
namespace Core {
    export enum TreeType{
        NORMAL=1,
        NEW=2,
        MODIFIED=3,
        DELETE=4,
    }
    export class CMiniTree {
        protected x:number;
        protected y:number;
        protected w:number;
        protected h:number;
        protected data;
        protected nodes:CTextNode[];
        protected type:TreeType;
        protected node_count;
        protected max_level:number;
        protected longest_node:CTextNode;
        readonly X_MARGIN:number=20;
        readonly Y_MARGIN:number=30;
        constructor(data:any,x:number=0,y:number=0){
            this.x=x;
            this.y=y;
            this.w=0;
            this.h=0;
            this.max_level = 0;
            this.data = data;
            this.nodes=[];
            this.type = TreeType.NORMAL;
            this.node_count = 0;
            this.longest_node=null;
            this.init();
        }
        init(){
            this.visitNode(this.data,0);
            this.bound();
        }
       protected bound(){
           let maxX:number=0;
           let maxY:number=0;
           (this.nodes).forEach((v,i,a)=>{
                let b:CBound=v.getBound();
                if(b.x2>maxX){
                    maxX = b.x2;
                }
                if(b.y2>maxY){
                    maxY = b.y2;
                }
           });
           this.w = maxX-this.x;
           this.h = maxY-this.y;
           console.log(this.w,this.h);
        }
        getWidth():number{
            return this.w;
        }
        getHeight():number{
            return this.h;
        }
        getBound():CBound{
           return new CBound(this.x,this.y,this.x+this.w,this.y+this.h);
        }
        setType(type:TreeType):void{
            this.type = type;
        }
        getType():TreeType{
            return this.type;
        }
        draw():void{
            this.nodes.forEach((v)=>{
                v.draw();
            });
        }
        /*
         * @func 深度优先遍历
         * @para text text节点的内容
         * @para level int 当前访问的层级
         * @para is_old_tree 是否是老树
         */
        protected visitNode(v:any,level:number):void{
            this.node_count++;
            if(level>this.max_level){
                this.max_level = level;
            }
            let yMargin = this.Y_MARGIN * this.node_count;
            let xMargin = this.X_MARGIN * level;
            let x = this.x + xMargin;
            let y = this.y + yMargin;
            let node = new CTextNode(x, y, v['name']);
            this.nodes.push(node);
            if(v['children'] && v['children'].length){
                v['children'].forEach((sub_v)=>{
                    this.visitNode(sub_v,sub_v['level']);
                });
            }
        }
        drawBk():void{

        }
    }
}