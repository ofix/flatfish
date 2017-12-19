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
namespace FlatFish {
    export class CApp{
        protected _bootstrap:boolean;
        protected scene:any;
        protected ctx:any;
        protected errors:string[];
        protected appId:string;
        constructor(appId){
            this._bootstrap = false;
            this.appId = appId;
            this.ctx = new Core.Context(appId,1024,1024);
            this.scene = new Core.CScene();
        }
        getContext():any{
            return this.ctx.getRender2D();
        }
        run():void{
            try{
                this.ctx.bootstrap();
                this.scene.bootstrap();
                this.loop();
            }catch(e){
                console.log(e);
                this.errors.push(e);
            }
            this._bootstrap = true;
        }
        loop():void{
            if(this.errors.length ===0){
                this.scene.loop();
            }
        }
    }
}
let app = new FlatFish.CApp('flatfish');
let ctx = app.getContext();
app.run();