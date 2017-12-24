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
/// <reference path="text_node.ts"/>
/// <reference path="scene.ts"/>
/// <reference path="jquery.d.ts"/>
namespace FlatFish {
    import CScene = Core.CScene;
    export class CApp{
        protected _bootstrap:boolean;
        protected scene:CScene;
        protected ctx:any;
        protected errors:string[];
        protected appId:string;
        constructor(appId){
            this._bootstrap = false;
            this.appId = appId;
            this.errors = [];
            let $app:any = $('#'+appId);
            let width:number  = $app.width();
            let height:number = $app.height();
            this.ctx = new Core.Context(appId,width,height);
            this.scene = new Core.CScene();
        }
        getContext():any{
            return this.ctx.getRender2D();
        }
        run():void{
            let that = this;
            try{
                this.ctx.bootstrap();
                this.scene.bootstrap();
                this.scene.draw();
            }catch(e){
                console.log(e);
                that.errors.push(e);
            }
            this._bootstrap = true;
        }
    }
}
let ctx:CanvasRenderingContext2D;
let canvas:HTMLCanvasElement;
let app = new FlatFish.CApp('flatfish');
app.run();