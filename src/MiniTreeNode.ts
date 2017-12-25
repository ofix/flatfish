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
/// <reference path="Node.ts"/>
/// <reference path="Context.ts"/>
/// <reference path="Bound.ts"/>
/// <reference path="ExpandNode.ts"/>
namespace Core {
    export class CMiniTreeNode extends CNode {
        protected text: string;
        protected isLeaf:boolean;
        protected expand:ExpandNode;
        constructor(x: number, y: number, text: string = '',isLeaf:boolean=false) {
            super(x, y);
            this.type = TYPE.TEXT;
            this.text = text;
            this.width = 0;
            this.height = 0;
            this.isLeaf = isLeaf;
            if(!this.isLeaf){
                this.expand = new ExpandNode(this.x,this.y,ExpandState.EXPAND);
            }else{
                this.expand = null;
            }
            this.measureWidth();
        }
        onHitTest(xCursor:number,yCursor:number):boolean{
            return (xCursor>=this.x && yCursor>=this.y
              && xCursor<=(this.x+this.width) && yCursor <= (this.y+this.height));
        }
        getBound(){
            return new CBound(this.x,this.y,this.x+this.width,this.y+this.height);
        }
        getRect(){
            return new CRect(this.x,this.y,this.width,this.height);
        }
        measureWidth(){
            ctx.fillStyle = this.fg_clr;
            ctx.strokeStyle = this.fg_clr;
            ctx.font = this.font_size + 'px '+this.font_family;
            ctx.textBaseline = "middle";
            ctx.textAlign = 'left';
            this.width = ctx.measureText(this.text).width;
            this.height = this.font_size;
        }
        draw() {
            if(this.expand){
                console.log("expand draw");
                this.expand.draw();
            }
            this.width = ctx.measureText(this.text).width;
            this.height = this.font_size;
            ctx.beginPath();
            ctx.translate(0.5, 0.5);
            ctx.fillStyle = this.fg_clr;
            ctx.strokeStyle = this.fg_clr;
            ctx.font = this.font_size + 'px '+this.font_family;
            ctx.textBaseline = "middle";
            ctx.textAlign = 'left';
            ctx.fillText(this.text,this.x+20,this.y+20);
            ctx.stroke();
            ctx.closePath();
        }
    }
}