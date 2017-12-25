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
 * @Time      16:04
 */
class CRect{
    public _x:number;
    public _y:number;
    public _w:number;
    public _h:number;
    constructor(x:number,y:number,w:number,h:number){
        if(w<0){
            throw new Error('rect w must be greater than 0');
        }
        if(h<0){
            throw new Error('rect h must be greater than 0');
        }
        this._x=x;
        this._y=y;
        this._w=w;
        this._h=h;
    }
    get x():number{
        return this._x;
    }
    get y():number{
        return this._y;
    }
    get w():number{
        return this._w;
    }
    set w(width:number){
        if(width<0){
            throw new Error('rect w must be greater than 0');
        }
        this._w=width;
    }
    get h():number{
        return this._h;
    }
    set h(height:number){
        if(height<0){
            throw new Error('rect h must be greater than 0');
        }
        this._h=height;
    }
}