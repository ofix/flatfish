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
 * @Date      2017/12/25
 * @Time      08:31
 */
namespace Core{
    export enum ExpandState{
        NULL = 1,
        EXPAND = 2,
        COLLAPSE = 3,
    }
    export class ExpandNode extends CNode{
        protected _state:ExpandState;
        protected _color:string;
        constructor(x:number,y:number,state:ExpandState){
            super(x+1,y+4);
            this.w = 10*Config.zoom;
            this.h = 10*Config.zoom;
            this._state = state;
            this._color = '#AAA';
        }
        get state():ExpandState{
            return this._state;
        }
        set state(state:ExpandState){
            this._state = state;
        }
        draw(){
            if(this._state == ExpandState.NULL){
                return;
            }else if(this._state == ExpandState.COLLAPSE){
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = this._color;
                ctx.moveTo(this.x,this.y);
                ctx.lineTo(this.x+this.w,this.y);
                ctx.lineTo(this.x+this.w,this.y+this.h);
                ctx.lineTo(this.x,this.y+this.h);
                ctx.lineTo(this.x,this.y);
                ctx.moveTo(this.x+this.w/2,this.y);
                ctx.lineTo(this.x+this.w/2,this.y+this.h);
                ctx.moveTo(this.x,this.y+this.h/2);
                ctx.lineTo(this.x+this.w,this.y+this.h/2);
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }else if(this._state == ExpandState.EXPAND){
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = this._color;
                ctx.moveTo(this.x,this.y);
                ctx.lineTo(this.x+this.w,this.y);
                ctx.lineTo(this.x+this.w,this.y+this.h);
                ctx.lineTo(this.x,this.y+this.h);
                ctx.lineTo(this.x,this.y);
                ctx.moveTo(this.x,this.y+this.h/2);
                ctx.lineTo(this.x+this.w,this.y+this.h/2);
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }

        }
    }
}
