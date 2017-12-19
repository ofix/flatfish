var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Core;
(function (Core) {
    var CTextNode = (function (_super) {
        __extends(CTextNode, _super);
        function CTextNode(x, y, text) {
            if (x === void 0) { x = 10; }
            if (y === void 0) { y = 10; }
            if (text === void 0) { text = ''; }
            var _this = _super.call(this, x, y) || this;
            _this.type = Core.TYPE.TEXT;
            _this.text = text;
            return _this;
        }
        CTextNode.prototype.draw = function () {
            ctx.fillText(this.text, this.x, this.y);
        };
        return CTextNode;
    }(Core.CNode));
    Core.CTextNode = CTextNode;
})(Core || (Core = {}));
//# sourceMappingURL=text_node.js.map