var Core;
(function (Core) {
    var Context = (function () {
        function Context(id, width, height) {
            this.id = id;
            this.width = width;
            this.height = height;
        }
        Context.prototype.getRender2D = function () {
            return this.render2D;
        };
        Context.prototype.createCanvas = function (width, height) {
            this.canvas = document.getElementById(this.id);
            this.canvas.width = width;
            this.canvas.height = height;
            document.body.appendChild(this.canvas);
        };
        Context.prototype.clear = function () {
            this.render2D.fillStyle = "#FFF";
            this.render2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
        Context.prototype.bootstrap = function () {
            this.createCanvas(this.width, this.height);
            this.render2D = this.canvas.getContext("2d");
            this.clear();
        };
        return Context;
    }());
    Core.Context = Context;
})(Core || (Core = {}));
//# sourceMappingURL=context.js.map