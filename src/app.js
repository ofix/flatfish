var FlatFish;
(function (FlatFish) {
    var CApp = (function () {
        function CApp(appId) {
            this._bootstrap = false;
            this.appId = appId;
            this.ctx = new Core.Context(appId, 1024, 1024);
            this.scene = new Core.CScene();
        }
        CApp.prototype.getContext = function () {
            return this.ctx.getRender2D();
        };
        CApp.prototype.run = function () {
            try {
                this.ctx.bootstrap();
                this.scene.bootstrap();
                this.loop();
            }
            catch (e) {
                console.log(e);
                this.errors.push(e);
            }
            this._bootstrap = true;
        };
        CApp.prototype.loop = function () {
            if (this.errors.length === 0) {
                this.scene.loop();
            }
        };
        return CApp;
    }());
    FlatFish.CApp = CApp;
})(FlatFish || (FlatFish = {}));
var app = new FlatFish.CApp('flatfish');
var ctx = app.getContext();
app.run();
//# sourceMappingURL=app.js.map