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
namespace Core {
    export enum TYPE{
        UNKNOWN = 0,
        TEXT = 1,
    }
    export class CNode {
        protected type: number;
        protected x: number;
        protected y: number;
        protected width: number;
        protected height: number;
        protected movable: boolean;
        protected show: boolean;
        protected visible: boolean;
        protected bg_clr: string; // 背景颜色
        protected fg_clr: string; // 前景颜色
        protected font_size: number; // 字体大小
        protected font_family:string; //字体
        protected zoom: number; // 放大系数
        constructor(x: number, y: number) {
            this.type = TYPE.UNKNOWN;
            this.x = x;
            this.y = y;
            this.zoom = 1.0;
            this.font_size = 16;
            this.bg_clr = '#FFF';
            this.font_family="宋体";
            this.fg_clr = '#000';
        }
        setFontSize(fontSize:number){
            this.font_size = fontSize;
        }
        getFontSize():number{
            return this.font_size;
        }
        setFontFamily(fontFamily:string){
            this.font_family = fontFamily;
        }
        getFontFamily():string{
            return this.font_family;
        }
        setBackClr(clr:string){
          this.bg_clr = clr;
        }
        setFrontClr(clr:string){
            this.fg_clr = clr;
        }
        getBackClr():string{
            return this.bg_clr;
        }
        getFrontClr():string{
            return this.fg_clr;
        }
        zoomIn(factor:number){
            this.zoom *= factor;
        }
        zoomOut(factor:number){
            this.zoom /= factor;
        }
        moveTo(toX: number, toY: number) {
            this.x = toX;
            this.y = toY;
        }
        offsetX(x: number) {
            this.x += x;
        }
        offsetY(y: number) {
            this.y = y;
        }
        offsetXY(x: number, y: number) {
            this.x += x;
            this.y += y;
        }
        canMove() {
            return this.movable;
        }
        isVisible() {
            return this.visible;
        }
        setVisible(bVisible: boolean) {
            this.visible = bVisible;
        }
        hidden() {
            this.visible = false;
        }
    }

}