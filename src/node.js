var Core;
(function (Core) {
    var TYPE;
    (function (TYPE) {
        TYPE[TYPE["UNKNOWN"] = 0] = "UNKNOWN";
        TYPE[TYPE["TEXT"] = 1] = "TEXT";
    })(TYPE = Core.TYPE || (Core.TYPE = {}));
    var CNode = (function () {
        function CNode(x, y) {
            this.type = TYPE.UNKNOWN;
            this.x = x;
            this.y = y;
            this.zoom = 1.0;
            this.font_size = 16;
            this.bg_clr = '#FFF';
            this.fg_clr = '#000';
        }
        CNode.prototype.setFontSize = function (fontSize) {
            this.font_size = fontSize;
        };
        CNode.prototype.getFontSize = function () {
            return this.font_size;
        };
        CNode.prototype.setBackClr = function (clr) {
            this.bg_clr = clr;
        };
        CNode.prototype.setFrontClr = function (clr) {
            this.fg_clr = clr;
        };
        CNode.prototype.getBackClr = function () {
            return this.bg_clr;
        };
        CNode.prototype.getFrontClr = function () {
            return this.fg_clr;
        };
        CNode.prototype.zoomIn = function (factor) {
            this.zoom *= factor;
        };
        CNode.prototype.zoomOut = function (factor) {
            this.zoom /= factor;
        };
        CNode.prototype.moveTo = function (toX, toY) {
            this.x = toX;
            this.y = toY;
        };
        CNode.prototype.offsetX = function (x) {
            this.x += x;
        };
        CNode.prototype.offsetY = function (y) {
            this.y = y;
        };
        CNode.prototype.offsetXY = function (x, y) {
            this.x += x;
            this.y += y;
        };
        CNode.prototype.canMove = function () {
            return this.movable;
        };
        CNode.prototype.isVisible = function () {
            return this.visible;
        };
        CNode.prototype.setVisible = function (bVisible) {
            this.visible = bVisible;
        };
        CNode.prototype.hidden = function () {
            this.visible = false;
        };
        return CNode;
    }());
    Core.CNode = CNode;
})(Core || (Core = {}));
//# sourceMappingURL=node.js.map