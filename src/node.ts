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
enum ELEMENT_TYPE{
    UNKNOWN  = 0,
    TEXT_NODE = 1,
}
 class CNode{
     protected type:number;
     protected x:number;
     protected y:number;
     protected width:number;
     protected height:number;
     protected movable:boolean;
     protected show:boolean;
     protected visible:boolean;
     constructor(x:number,y:number){
         this.x = x;
         this.y = y;
         this.type = ELEMENT_TYPE.UNKNOWN;
     }
     moveTo(toX:number,toY:number){
        this.x = toX;
        this.y = toY;
     }
     offsetX(x:number){
         this.x += x;
     }
     offsetY(y:number){
         this.y = y;
     }
     offsetXY(x:number,y:number){
         this.x += x;
         this.y += y;
     }
     canMove(){
         return this.movable;
     }
     isVisible(){
        return this.visible;
     }
     setVisible(bVisible:boolean){
         this.visible = bVisible;
     }
     hidden(){
         this.visible = false;
     }
 }