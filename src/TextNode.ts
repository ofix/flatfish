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
    export class CTextNode extends CNode {
        protected text: string;
        protected isLeaf:boolean;
        protected expand:ExpandNode;
        protected marginLeft:number;
        constructor(x: number, y: number, text: string = '',isLeaf:boolean=false) {
            super(x, y);
            this.type = TYPE.TEXT;
            this.text = text;
            this.w = 0;
            this.h = 0;
            this.isLeaf = isLeaf;
            if(!this.isLeaf){
                this.expand = new ExpandNode(this.x,this.y,ExpandState.EXPAND);
            }else{
                this.expand = null;
            }
            this.marginLeft = 4;
            this.measureWidth();
        }
        onHitTest(xCursor:number,yCursor:number):boolean{
            return (xCursor>=this.x && yCursor>=this.y
              && xCursor<=(this.x+this.w) && yCursor <= (this.y+this.h));
        }
        getBound(){
            if(this.isLeaf) {
                return new CBound(this.x+26, this.y, this.x+26+this.w, this.y + this.h);
            }else{
                return new CBound(this.x+26,this.y,this.x+26+this.w,this.y+this.h);
            }
        }
        measureWidth(){
            ctx.fillStyle = this.fg_clr;
            ctx.strokeStyle = this.fg_clr;
            ctx.font = this.font_size + 'px '+this.font_family;
            ctx.textBaseline = "middle";
            ctx.textAlign = 'left';
            this.w = ctx.measureText(this.text).width;
            this.h = this.font_size;
        }
        draw() {
            if(this.expand){
                this.expand.draw();
            }
            this.w = ctx.measureText(this.text).width;
            this.h = this.font_size;
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = this.fg_clr;
            ctx.strokeStyle = this.fg_clr;
            ctx.font = this.font_size + 'px '+this.font_family;
            ctx.textBaseline = "top";
            ctx.textAlign = 'left';
            ctx.strokeRect(this.x+20,this.y,this.w,this.h+2);
            ctx.fillText(this.text,this.x+26,this.y);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }
}