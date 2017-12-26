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
 * @Date      2017/12/26
 * @Time      18:54
 */
function drawDashLine(ctx, x1, y1, x2, y2, dashLength){
    let dashLen = (dashLength === undefined) ? 5 : dashLength;
    let xPos = x2 - x1; //得到横向的宽度
    let yPos = y2 - y1; //得到纵向的高度;
    let numDashes = Math.floor(Math.sqrt(xPos * xPos + yPos * yPos) / dashLen);
    //利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
    for(let i=0; i<numDashes; i++){
        if(i % 2 === 0){
            ctx.moveTo(x1 + (xPos/numDashes) * i, y1 + (yPos/numDashes) * i);
            //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
        }else{
            ctx.lineTo(x1 + (xPos/numDashes) * i, y1 + (yPos/numDashes) * i);
        }
    }
    ctx.stroke();
}