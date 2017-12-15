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
 class CTextNode extends CNode{
     text:string;
     constructor(x:number = 10,y:number =10,text:string=''){
         super(x,y);
         this.type = ELEMENT_TYPE.TEXT_NODE;
         this.text=text;
     }
     draw(){

     }
 }