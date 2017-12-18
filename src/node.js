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
var core;
(function (core) {
    var TYPE;
    (function (TYPE) {
        TYPE[TYPE["UNKNOWN"] = 0] = "UNKNOWN";
        TYPE[TYPE["TEXT"] = 1] = "TEXT";
    })(TYPE = core.TYPE || (core.TYPE = {}));
    var CNode = /** @class */ (function () {
        function CNode(x, y) {
            this.x = x;
            this.y = y;
            this.zoom = 1;
            this.font_size = 16;
            this.background_color = '#FFF';
            this.foreground_color = '#000';
            this.type = TYPE.UNKNOWN;
        }
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
    core.CNode = CNode;
})(core || (core = {}));
