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
/// <reference path="node.ts"/>
var core;
(function (core) {
    var CTextNode = /** @class */ (function (_super) {
        __extends(CTextNode, _super);
        function CTextNode(x, y, text) {
            if (x === void 0) { x = 10; }
            if (y === void 0) { y = 10; }
            if (text === void 0) { text = ''; }
            var _this = _super.call(this, x, y) || this;
            _this.type = core.TYPE.TEXT;
            _this.text = text;
            return _this;
        }
        CTextNode.prototype.draw = function () {
        };
        return CTextNode;
    }(core.CNode));
    core.CTextNode = CTextNode;
})(core || (core = {}));
