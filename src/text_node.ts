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
/// <reference path="node.ts"/>
/// <reference path="context.ts"/>
/// <reference path="bound.ts"/>
namespace Core {
    export class CTextNode extends CNode {
        text: string;
        constructor(x: number = 10, y: number = 10, text: string = '') {
            super(x, y);
            this.type = TYPE.TEXT;
            this.text = text;
            this.width = 0;
            this.height = 0;
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
            this.width = ctx.measureText(this.text).width;
            this.height = this.font_size;
            ctx.beginPath();
            ctx.translate(0.5, 0.5);
            ctx.fillStyle = this.fg_clr;
            ctx.strokeStyle = this.fg_clr;
            ctx.font = this.font_size + 'px '+this.font_family;
            ctx.textBaseline = "middle";
            ctx.textAlign = 'left';
            ctx.fillText(this.text,this.x,this.y);
            ctx.stroke();
            ctx.closePath();
        }
    }
}