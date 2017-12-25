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
            this.font_size = 12;
            this.bg_clr = '#FFF';
            this.font_family = '"Microsoft YaHei",Helvetica,Arial,sans-serif;';
            this.fg_clr = '#000';
        }
        CNode.prototype.setFontSize = function (fontSize) {
            this.font_size = fontSize;
        };
        CNode.prototype.getFontSize = function () {
            return this.font_size;
        };
        CNode.prototype.setFontFamily = function (fontFamily) {
            this.font_family = fontFamily;
        };
        CNode.prototype.getFontFamily = function () {
            return this.font_family;
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
            ctx = this.render2D;
            canvas = this.canvas;
        };
        return Context;
    }());
    Core.Context = Context;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var CBound = (function () {
        function CBound(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
        return CBound;
    }());
    Core.CBound = CBound;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var ExpandState;
    (function (ExpandState) {
        ExpandState[ExpandState["NULL"] = 1] = "NULL";
        ExpandState[ExpandState["EXPAND"] = 2] = "EXPAND";
        ExpandState[ExpandState["COLLAPSE"] = 3] = "COLLAPSE";
    })(ExpandState = Core.ExpandState || (Core.ExpandState = {}));
    var ExpandNode = (function (_super) {
        __extends(ExpandNode, _super);
        function ExpandNode(x, y, state) {
            var _this = _super.call(this, x, y) || this;
            _this.width = 10 * Config.zoom;
            _this.height = 10 * Config.zoom;
            _this._state = state;
            _this._color = '#000';
            return _this;
        }
        Object.defineProperty(ExpandNode.prototype, "state", {
            get: function () {
                return this._state;
            },
            set: function (state) {
                this._state = state;
            },
            enumerable: true,
            configurable: true
        });
        ExpandNode.prototype.draw = function () {
            if (this._state == ExpandState.NULL) {
                return;
            }
            else if (this._state == ExpandState.EXPAND) {
                ctx.fillStyle = this._color;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.width, this.y);
                ctx.lineTo(this.x + this.width, this.y + this.height);
                ctx.lineTo(this.x, this.y + this.height);
                ctx.moveTo(this.x + this.width / 2, this.y);
                ctx.lineTo(this.x + this.width / 2, this.y + this.height);
                ctx.moveTo(this.x, this.y + this.height / 2);
                ctx.lineTo(this.x + this.width, this.y + this.height / 2);
                ctx.stroke();
            }
            else if (this._state == ExpandState.COLLAPSE) {
                ctx.fillStyle = this._color;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.width, this.y);
                ctx.lineTo(this.x + this.width, this.y + this.height);
                ctx.lineTo(this.x, this.y + this.height);
                ctx.moveTo(this.x, this.y + this.height / 2);
                ctx.lineTo(this.x + this.width, this.y + this.height / 2);
                ctx.stroke();
            }
        };
        return ExpandNode;
    }(Core.CNode));
    Core.ExpandNode = ExpandNode;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var CMiniTreeNode = (function (_super) {
        __extends(CMiniTreeNode, _super);
        function CMiniTreeNode(x, y, text, isLeaf) {
            if (text === void 0) { text = ''; }
            if (isLeaf === void 0) { isLeaf = false; }
            var _this = _super.call(this, x, y) || this;
            _this.type = Core.TYPE.TEXT;
            _this.text = text;
            _this.width = 0;
            _this.height = 0;
            _this.isLeaf = isLeaf;
            if (!_this.isLeaf) {
                _this.expand = new Core.ExpandNode(_this.x, _this.y, Core.ExpandState.EXPAND);
            }
            else {
                _this.expand = null;
            }
            _this.measureWidth();
            return _this;
        }
        CMiniTreeNode.prototype.onHitTest = function (xCursor, yCursor) {
            return (xCursor >= this.x && yCursor >= this.y
                && xCursor <= (this.x + this.width) && yCursor <= (this.y + this.height));
        };
        CMiniTreeNode.prototype.getBound = function () {
            return new Core.CBound(this.x, this.y, this.x + this.width, this.y + this.height);
        };
        CMiniTreeNode.prototype.getRect = function () {
            return new CRect(this.x, this.y, this.width, this.height);
        };
        CMiniTreeNode.prototype.measureWidth = function () {
            ctx.fillStyle = this.fg_clr;
            ctx.strokeStyle = this.fg_clr;
            ctx.font = this.font_size + 'px ' + this.font_family;
            ctx.textBaseline = "middle";
            ctx.textAlign = 'left';
            this.width = ctx.measureText(this.text).width;
            this.height = this.font_size;
        };
        CMiniTreeNode.prototype.draw = function () {
            if (this.expand) {
                console.log("expand draw");
                this.expand.draw();
            }
            this.width = ctx.measureText(this.text).width;
            this.height = this.font_size;
            ctx.beginPath();
            ctx.translate(0.5, 0.5);
            ctx.fillStyle = this.fg_clr;
            ctx.strokeStyle = this.fg_clr;
            ctx.font = this.font_size + 'px ' + this.font_family;
            ctx.textBaseline = "middle";
            ctx.textAlign = 'left';
            ctx.fillText(this.text, this.x + 20, this.y + 20);
            ctx.stroke();
            ctx.closePath();
        };
        return CMiniTreeNode;
    }(Core.CNode));
    Core.CMiniTreeNode = CMiniTreeNode;
})(Core || (Core = {}));
var old_tree = [{ "id": "53002", "parent_id": 53001, "name": "查看", "url": "/ucenter/default/account", "type": 2, "level": 1 }, { "id": "54002", "parent_id": 54001, "name": "查看", "url": "/ucenter/default/safe-set", "type": 2, "level": 1 }, { "id": "101001", "parent_id": 0, "name": "供应商管理", "url": "#", "type": 4, "level": 1 }, { "id": "101002", "parent_id": 101001, "name": "在线关联", "url": "/supplier/index", "type": 4, "level": 2 }, { "id": "101003", "parent_id": 101002, "name": "查看", "url": "/supplier/index", "type": 2, "level": 1 }, { "id": "101004", "parent_id": 101002, "name": "申请关联", "url": "/cooperation/sup-application", "type": 2, "level": 1 }, { "id": "101005", "parent_id": 101002, "name": "审核关联", "url": "/cooperation/sup-auditing", "type": 2, "level": 1 }, { "id": "101006", "parent_id": 101002, "name": "解除关联", "url": "/cooperation/sup-relieve", "type": 2, "level": 1 }, { "id": "101007", "parent_id": 101001, "name": "本地添加", "url": "#", "type": 4, "level": 2 }, { "id": "101008", "parent_id": 101007, "name": "供应商", "url": "/dijie/supplier/index", "type": 4, "level": 3 }, { "id": "101009", "parent_id": 101008, "name": "查看", "url": "/dijie/supplier/view", "type": 2, "level": 1 }, { "id": "101010", "parent_id": 101008, "name": "添加", "url": "/dijie/supplier/create", "type": 2, "level": 1 }, { "id": "101011", "parent_id": 101008, "name": "编辑", "url": "/dijie/supplier/update", "type": 2, "level": 1 }, { "id": "101012", "parent_id": 101008, "name": "删除", "url": "/dijie/supplier/delete", "type": 2, "level": 1 }, { "id": "101013", "parent_id": 101007, "name": "酒店", "url": "/dijie/dj-resource/index-hotel", "type": 4, "level": 3 }, { "id": "101014", "parent_id": 101013, "name": "查看", "url": "/dijie/dj-resource/view-hotel", "type": 2, "level": 1 }, { "id": "101015", "parent_id": 101013, "name": "添加", "url": "/dijie/dj-resource/create-hotel", "type": 2, "level": 1 }, { "id": "101016", "parent_id": 101013, "name": "编辑", "url": "/dijie/dj-resource/update-hotel", "type": 2, "level": 1 }, { "id": "101017", "parent_id": 101013, "name": "删除", "url": "/dijie/dj-resource/delete-hotel", "type": 2, "level": 1 }, { "id": "101018", "parent_id": 101007, "name": "餐厅", "url": "/dijie/dj-resource/index-dining", "type": 4, "level": 3 }, { "id": "101019", "parent_id": 101018, "name": "查看", "url": "/dijie/dj-resource/view-dining", "type": 2, "level": 1 }, { "id": "101020", "parent_id": 101018, "name": "添加", "url": "/dijie/dj-resource/create-dining", "type": 2, "level": 1 }, { "id": "101021", "parent_id": 101018, "name": "编辑", "url": "/dijie/dj-resource/update-dining", "type": 2, "level": 1 }, { "id": "101022", "parent_id": 101018, "name": "删除", "url": "/dijie/dj-resource/delete-dining", "type": 2, "level": 1 }, { "id": "101023", "parent_id": 101007, "name": "景区", "url": "/dijie/dj-resource/index-place", "type": 4, "level": 3 }, { "id": "101024", "parent_id": 101023, "name": "查看", "url": "/dijie/dj-resource/view-place", "type": 2, "level": 1 }, { "id": "101025", "parent_id": 101023, "name": "添加", "url": "/dijie/dj-resource/create-place", "type": 2, "level": 1 }, { "id": "101026", "parent_id": 101023, "name": "编辑", "url": "/dijie/dj-resource/update-place", "type": 2, "level": 1 }, { "id": "101027", "parent_id": 101023, "name": "删除", "url": "/dijie/dj-resource/delete-place", "type": 2, "level": 1 }, { "id": "101028", "parent_id": 101007, "name": "购物店", "url": "/dijie/dj-resource/index-shop", "type": 4, "level": 3 }, { "id": "101029", "parent_id": 101028, "name": "查看", "url": "/dijie/dj-resource/view-shop", "type": 2, "level": 1 }, { "id": "101030", "parent_id": 101028, "name": "添加", "url": "/dijie/dj-resource/create-shop", "type": 2, "level": 1 }, { "id": "101031", "parent_id": 101028, "name": "编辑", "url": "/dijie/dj-resource/update-shop", "type": 2, "level": 1 }, { "id": "101032", "parent_id": 101028, "name": "删除", "url": "/dijie/dj-resource/delete-shop", "type": 2, "level": 1 }, { "id": "102001", "parent_id": 0, "name": "分销商管理", "url": "#", "type": 4, "level": 1 }, { "id": "102002", "parent_id": 102001, "name": "在线关联", "url": "/customer/index", "type": 4, "level": 2 }, { "id": "102003", "parent_id": 102002, "name": "查看", "url": "/customer/index", "type": 2, "level": 1 }, { "id": "102004", "parent_id": 102002, "name": "申请关联", "url": "/cooperation/cus-application", "type": 2, "level": 1 }, { "id": "102005", "parent_id": 102002, "name": "审核关联", "url": "/cooperation/cus-auditing", "type": 2, "level": 1 }, { "id": "102006", "parent_id": 102002, "name": "解除关联", "url": "/cooperation/cus-relieve", "type": 2, "level": 1 }, { "id": "102007", "parent_id": 102002, "name": "修改优惠", "url": "/customer/update-rebate", "type": 2, "level": 1 }, { "id": "102008", "parent_id": 102001, "name": "本地添加", "url": "/dijie/customer/index", "type": 4, "level": 2 }, { "id": "102009", "parent_id": 102008, "name": "查看", "url": "/dijie/customer/view", "type": 2, "level": 1 }, { "id": "102010", "parent_id": 102008, "name": "添加", "url": "/dijie/customer/create", "type": 2, "level": 1 }, { "id": "102011", "parent_id": 102008, "name": "编辑", "url": "/dijie/customer/update", "type": 2, "level": 1 }, { "id": "102012", "parent_id": 102008, "name": "删除", "url": "/dijie/customer/delete", "type": 2, "level": 1 }, { "id": "102013", "parent_id": 102008, "name": "查看历史订单", "url": "/dijie/order/index", "type": 2, "level": 1 }, { "id": "102017", "parent_id": 102008, "name": "设置授信额度", "url": "/dijie/customer/set-limit-credit", "type": 2, "level": 1 }, { "id": "103001", "parent_id": 0, "name": "产品管理", "url": "#", "type": 4, "level": 1 }, { "id": "103002", "parent_id": 103001, "name": "跟团游", "url": "/wholesale/product-line/wholesale-product-list", "type": 4, "level": 2 }, { "id": "103003", "parent_id": 103002, "name": "查看", "url": "/wholesale/product-line/wholesale-product-list", "type": 2, "level": 1 }, { "id": "103004", "parent_id": 103002, "name": "添加", "url": "/product-line/base-info", "type": 2, "level": 1 }, { "id": "103005", "parent_id": 103002, "name": "编辑", "url": "/product-line/base-info", "type": 2, "level": 1 }, { "id": "103006", "parent_id": 103002, "name": "删除", "url": "/product-line/delete", "type": 2, "level": 1 }, { "id": "103007", "parent_id": 103002, "name": "分销", "url": "/wholesale/product-line/is-onsale", "type": 2, "level": 1 }, { "id": "103008", "parent_id": 103002, "name": "复制", "url": "/wholesale/product-line/copy-route-product", "type": 2, "level": 1 }, { "id": "103010", "parent_id": 103001, "name": "门票", "url": "/ticket/product/ticket-list", "type": 4, "level": 2 }, { "id": "103077", "parent_id": 103010, "name": "查看", "url": "/ticket/product/ticket-list", "type": 2, "level": 1 }, { "id": "103094", "parent_id": 103010, "name": "分销", "url": null, "type": 2, "level": 1 }, { "id": "103095", "parent_id": 103002, "name": "更新", "url": "/wholesale/product-line/syn-product-info", "type": 2, "level": 1 }, { "id": "104001", "parent_id": 0, "name": "采购管理", "url": "#", "type": 4, "level": 1 }, { "id": "104002", "parent_id": 104001, "name": "产品采购", "url": "/wholesale/product-line/supplier-product-list", "type": 4, "level": 2 }, { "id": "104003", "parent_id": 104002, "name": "查看", "url": "/wholesale/product-line/product-route-view", "type": 2, "level": 1 }, { "id": "104004", "parent_id": 104002, "name": "采购", "url": "/wholesale/product-line/modi-buy-product", "type": 2, "level": 1 }, { "id": "104005", "parent_id": 104002, "name": "包装产品", "url": "/wholesale/product-line/packaging", "type": 2, "level": 1 }, { "id": "104006", "parent_id": 104001, "name": "产品审核", "url": "/wholesale/product-line/purchase-confirm", "type": 4, "level": 2 }, { "id": "104007", "parent_id": 104006, "name": "查看", "url": "/purchase-confirm/index", "type": 2, "level": 1 }, { "id": "104008", "parent_id": 104006, "name": "审批", "url": "/purchase-confirm/audit", "type": 2, "level": 1 }, { "id": "104009", "parent_id": 104006, "name": "修改优惠", "url": "/wholesale/product-line/edit-discounts", "type": 2, "level": 1 }, { "id": "104017", "parent_id": 104006, "name": "修改账期", "url": "/wholesale/product-line/sp-edit-payment-term", "type": 2, "level": 1 }, { "id": "104018", "parent_id": 104006, "name": "修改现返", "url": "/wholesale/product-line/sp-edit-xian-fan", "type": 2, "level": 1 }, { "id": "104019", "parent_id": 104006, "name": "审批账期", "url": "/wholesale/product-line/sp-audit-payment-term", "type": 2, "level": 1 }, { "id": "104020", "parent_id": 104006, "name": "审批现返", "url": "/wholesale/product-line/sp-audit-xian-fan", "type": 2, "level": 1 }, { "id": "104022", "parent_id": 104002, "name": "取消采购", "url": "/wholesale/product-line/cancel-buy", "type": 2, "level": 1 }, { "id": "104023", "parent_id": 104002, "name": "修改账期", "url": "/wholesale/product-line/edit-payment-term", "type": 2, "level": 1 }, { "id": "104024", "parent_id": 104002, "name": "修改现返", "url": "/wholesale/product-line/edit-xian-fan", "type": 2, "level": 1 }, { "id": "104025", "parent_id": 104002, "name": "审批账期", "url": "/wholesale/product-line/audit-payment-term", "type": 2, "level": 1 }, { "id": "104026", "parent_id": 104002, "name": "审批现返", "url": "/wholesale/product-line/audit-xian-fan", "type": 2, "level": 1 }, { "id": "104027", "parent_id": 104002, "name": "申请关联", "url": "/wholesale/product-line/modi-buy-product", "type": 2, "level": 1 }, { "id": "105001", "parent_id": 0, "name": "在线订单", "url": "#", "type": 4, "level": 1 }, { "id": "105002", "parent_id": 105001, "name": "跟团游", "url": "/wholesale/product-line/order-list", "type": 4, "level": 2 }, { "id": "105003", "parent_id": 105002, "name": "查看", "url": "/wholesale/product-line/product-route-view", "type": 2, "level": 1 }, { "id": "105004", "parent_id": 105002, "name": "确认/拒绝", "url": "/wholesale/money-order/order-confirm", "type": 2, "level": 1 }, { "id": "105005", "parent_id": 105002, "name": "申请结算", "url": "/product-line/settlement-ack-form", "type": 2, "level": 1 }, { "id": "105006", "parent_id": 105001, "name": "门票", "url": "/ticket/order/order-list", "type": 4, "level": 2 }, { "id": "105020", "parent_id": 105006, "name": "查看", "url": "/ticket/order/order-list", "type": 2, "level": 1 }, { "id": "105023", "parent_id": 105006, "name": "处理退款", "url": "/ticket/order/refund-audit", "type": 2, "level": 1 }, { "id": "105024", "parent_id": 105002, "name": "改价", "url": "/product-line-order/confirm", "type": 2, "level": 1 }, { "id": "105025", "parent_id": 105002, "name": "取消订单", "url": "/wholesale/money-order/order-cancel", "type": 2, "level": 1 }, { "id": "105026", "parent_id": 105002, "name": "主动结算", "url": "/product-line/settlement-do", "type": 2, "level": 1 }, { "id": "105027", "parent_id": 105002, "name": "处理结算", "url": "/product-line/audit-settlement", "type": 2, "level": 1 }, { "id": "105028", "parent_id": 105002, "name": "申请退款", "url": "/wholesale/money-order/apply-refund", "type": 2, "level": 1 }, { "id": "105029", "parent_id": 105002, "name": "主动退款", "url": "/wholesale/money-order/self-init-refund", "type": 2, "level": 1 }, { "id": "105030", "parent_id": 105002, "name": "处理退款", "url": "/wholesale/money-order/agree-refund", "type": 2, "level": 1 }, { "id": "106001", "parent_id": 0, "name": "地接ERP", "url": "#", "type": 4, "level": 1 }, { "id": "106002", "parent_id": 106001, "name": "代客下单", "url": "/dijie/order/index", "type": 4, "level": 2 }, { "id": "106003", "parent_id": 106002, "name": "查看", "url": "/dijie/order/index", "type": 2, "level": 1 }, { "id": "106004", "parent_id": 106002, "name": "添加", "url": "/dijie/order/create", "type": 2, "level": 1 }, { "id": "106005", "parent_id": 106002, "name": "编辑", "url": "/dijie/order/view", "type": 2, "level": 1 }, { "id": "106006", "parent_id": 106002, "name": "删除", "url": "/dijie/order/order-del", "type": 2, "level": 1 }, { "id": "106009", "parent_id": 106001, "name": "团计划管理", "url": "/dijie/dj-group-list/index", "type": 4, "level": 2 }, { "id": "106010", "parent_id": 106009, "name": "查看", "url": "/dijie/dj-group-list/group-list", "type": 2, "level": 1 }, { "id": "106011", "parent_id": 106009, "name": "添加/编辑散拼团", "url": "/dijie/order/san-order-sel", "type": 2, "level": 1 }, { "id": "106012", "parent_id": 106009, "name": "添加/编辑定制团", "url": "/dijie/dj-group-list/custom-create", "type": 2, "level": 1 }, { "id": "106013", "parent_id": 106009, "name": "景点调配", "url": "/dijie/dj-resource/index-place-resource", "type": 2, "level": 1 }, { "id": "106014", "parent_id": 106009, "name": "酒店调配", "url": "/dijie/dj-resource/index-hotel-resource", "type": 2, "level": 1 }, { "id": "106015", "parent_id": 106009, "name": "餐厅调配", "url": "/dijie/dj-resource/index-dining-resource", "type": 2, "level": 1 }, { "id": "106016", "parent_id": 106009, "name": "购物店调配", "url": "/dijie/dj-resource/index-shop-resource", "type": 2, "level": 1 }, { "id": "106017", "parent_id": 106009, "name": "加点调配", "url": "/dijie/dj-resource/index-jiadian-resource", "type": 2, "level": 1 }, { "id": "106018", "parent_id": 106009, "name": "导游调配", "url": "/dijie/dj-group-dp/get-guide-dp", "type": 2, "level": 1 }, { "id": "106019", "parent_id": 106009, "name": "转地接调配", "url": "/dijie/dj-group-dp/get-zhuandijie-dp", "type": 2, "level": 1 }, { "id": "106020", "parent_id": 106009, "name": "车队调配", "url": "/dijie/dj-group-dp/vehicle-demand-list", "type": 2, "level": 1 }, { "id": "106021", "parent_id": 106009, "name": "大交通调配", "url": "/dijie/dj-group-dp/get-dajiaotong-dp", "type": 2, "level": 1 }, { "id": "106022", "parent_id": 106009, "name": "导出行程单", "url": "/dijie/itinerary/create", "type": 2, "level": 1 }, { "id": "106023", "parent_id": 106009, "name": "取消计划", "url": "/dijie/dj-group-list/cancel-group-list", "type": 2, "level": 1 }, { "id": "106024", "parent_id": 106009, "name": "删除", "url": "/dijie/dj-group-list/del-group-list", "type": 2, "level": 1 }, { "id": "106025", "parent_id": 106009, "name": "一键派团", "url": "/dijie/dj-group-dp/paidan", "type": 2, "level": 1 }, { "id": "106026", "parent_id": 106009, "name": "预览资源调配", "url": "/dijie/dj-group-dp/yulan", "type": 2, "level": 1 }, { "id": "106027", "parent_id": 106009, "name": "复制计划", "url": "/dijie/dj-group-list/copy-custom-group", "type": 2, "level": 1 }, { "id": "106028", "parent_id": 106009, "name": "预览行程单", "url": "/dijie/itinerary/view", "type": 2, "level": 1 }, { "id": "106029", "parent_id": 106009, "name": "备用金查看", "url": "/dijie/dj-g-ready/dp-guide-pay-detail", "type": 2, "level": 1 }, { "id": "106030", "parent_id": 106001, "name": "团账审批", "url": "/dijie/tally/index", "type": 4, "level": 2 }, { "id": "106031", "parent_id": 106030, "name": "查看", "url": "/dijie/tally/view", "type": 2, "level": 1 }, { "id": "106033", "parent_id": 106001, "name": "导游管理", "url": "/dijie/dj-guide/index", "type": 4, "level": 2 }, { "id": "106034", "parent_id": 106033, "name": "查看", "url": "/dijie/dj-guide/view", "type": 2, "level": 1 }, { "id": "106035", "parent_id": 106033, "name": "添加", "url": "/dijie/dj-guide/create", "type": 2, "level": 1 }, { "id": "106036", "parent_id": 106033, "name": "编辑", "url": "/dijie/dj-guide/update", "type": 2, "level": 1 }, { "id": "106037", "parent_id": 106033, "name": "删除", "url": "/dijie/dj-guide/guide-delete", "type": 2, "level": 1 }, { "id": "106038", "parent_id": 106033, "name": "查看导游排期", "url": "/dijie/dj-guide/schedule", "type": 2, "level": 1 }, { "id": "106192", "parent_id": 106009, "name": "人天数统计", "url": "/dijie/dj-group-list/peo-day-list", "type": 2, "level": 1 }, { "id": "106193", "parent_id": 106009, "name": "业务员收客统计", "url": "/dijie/dj-group-list/salesman-statis", "type": 2, "level": 1 }, { "id": "106194", "parent_id": 106009, "name": "分销商收客统计", "url": "/dijie/dj-group-list/cus-statis", "type": 2, "level": 1 }, { "id": "106195", "parent_id": 106009, "name": "购物统计", "url": "/dijie/dj-group-list/staty-shop-list", "type": 2, "level": 1 }, { "id": "106199", "parent_id": 106009, "name": "备用金调配", "url": "/dijie/dj-group-dp/update-beiyongjin-dp", "type": 2, "level": 1 }, { "id": "151001", "parent_id": 0, "name": "企业资金", "url": "/company-account/index", "type": 4, "level": 1 }, { "id": "151002", "parent_id": 151001, "name": "查看", "url": "/company-account/unpaid-list", "type": 2, "level": 1 }, { "id": "151003", "parent_id": 151001, "name": "充值", "url": "/company-account/recharge", "type": 2, "level": 1 }, { "id": "151004", "parent_id": 151001, "name": "提现", "url": "/company-account/withdraw", "type": 2, "level": 1 }, { "id": "151005", "parent_id": 151001, "name": "冻结明细", "url": "/company-account/unpaid-list", "type": 2, "level": 1 }, { "id": "152001", "parent_id": 0, "name": "企业待收款", "url": "#", "type": 4, "level": 1 }, { "id": "152002", "parent_id": 152001, "name": "团计划", "url": "/dijie/dj-g-ready/income-list", "type": 4, "level": 2 }, { "id": "152003", "parent_id": 152002, "name": "查看", "url": "/dijie/dj-g-ready/income-list", "type": 2, "level": 1 }, { "id": "152004", "parent_id": 152002, "name": "收款登记", "url": "/dijie/dj-g-ready/income-single-check", "type": 2, "level": 1 }, { "id": "152005", "parent_id": 152002, "name": "导出excel", "url": "/dijie/dj-g-ready/income-export", "type": 2, "level": 1 }, { "id": "152006", "parent_id": 152002, "name": "收款记录", "url": "/dijie/dj-group-income/index", "type": 2, "level": 1 }, { "id": "152007", "parent_id": 152001, "name": "在线订单", "url": "/wholesale/money-order/finance-receive-list", "type": 4, "level": 2 }, { "id": "152010", "parent_id": 152007, "name": "查看", "url": "/wholesale/money-order/finance-receive-detail", "type": 2, "level": 1 }, { "id": "152011", "parent_id": 152007, "name": "到账确认", "url": "/product-line/settlement-ack", "type": 2, "level": 1 }, { "id": "153001", "parent_id": 0, "name": "企业待付款", "url": "", "type": 4, "level": 1 }, { "id": "153002", "parent_id": 153001, "name": "团计划", "url": "/dijie/dj-g-ready/pay-list", "type": 4, "level": 2 }, { "id": "153003", "parent_id": 153002, "name": "查看", "url": "/dijie/dj-g-ready/pay-list", "type": 2, "level": 1 }, { "id": "153004", "parent_id": 153002, "name": "预付/签单登记", "url": "/dijie/dj-g-ready/pay-single-check", "type": 2, "level": 1 }, { "id": "153005", "parent_id": 153002, "name": "导出excel", "url": "/dijie/dj-g-ready/pay-export", "type": 2, "level": 1 }, { "id": "153006", "parent_id": 153002, "name": "付款记录", "url": "/dijie/dj-group-pay/index", "type": 2, "level": 1 }, { "id": "153007", "parent_id": 153001, "name": "在线订单", "url": "/wholesale/money-order/finance-audit-list", "type": 4, "level": 2 }, { "id": "153008", "parent_id": 153007, "name": "查看", "url": "/wholesale/money-order/finance-audit-list", "type": 2, "level": 1 }, { "id": "153009", "parent_id": 153007, "name": "处理结算", "url": "/wholesale/product-price/distributor-set", "type": 2, "level": 1 }, { "id": "153012", "parent_id": 153002, "name": "上锁/解锁", "url": "/dijie/dj-g-ready/dp-lock", "type": 2, "level": 1 }, { "id": "153013", "parent_id": 153007, "name": "处理退款", "url": "/wholesale/money-order/finance-refund", "type": 2, "level": 1 }, { "id": "154001", "parent_id": 0, "name": "导游收付款", "url": "/dijie/dj-g-ready/guide-pay-list", "type": 4, "level": 1 }, { "id": "154002", "parent_id": 154001, "name": "查看", "url": "/dijie/dj-g-ready/guide-pay-list", "type": 2, "level": 1 }, { "id": "154003", "parent_id": 154001, "name": "导出excel", "url": "/dijie/dj-g-ready/guide-income-export", "type": 2, "level": 1 }, { "id": "154005", "parent_id": 154001, "name": "收/付登记", "url": "/dijie/dj-g-ready/guide-pay-single-check", "type": 2, "level": 1 }, { "id": "155001", "parent_id": 0, "name": "团账锁定", "url": "/dijie/group-bill/index", "type": 4, "level": 1 }, { "id": "155002", "parent_id": 155001, "name": "查看", "url": "/dijie/group-bill/group-list", "type": 2, "level": 1 }, { "id": "155003", "parent_id": 155001, "name": "锁账", "url": "/dijie/group-bill/group-lock", "type": 2, "level": 1 }, { "id": "155004", "parent_id": 155001, "name": "解锁", "url": "/dijie/group-bill/un-group-lock-list", "type": 2, "level": 1 }, { "id": "155019", "parent_id": 155001, "name": "拒绝", "url": "/dijie/group-bill/refuse-group-lock-list", "type": 2, "level": 1 }, { "id": "155022", "parent_id": 155001, "name": "编辑", "url": "/dijie/dj-other-cw-jz/index", "type": 2, "level": 1 }, { "id": "201001", "parent_id": 0, "name": "企业资料", "url": "/company/index", "type": 4, "level": 1 }, { "id": "201002", "parent_id": 201001, "name": "查看", "url": "/company/index", "type": 2, "level": 1 }, { "id": "201004", "parent_id": 201001, "name": "编辑", "url": "/company/basic-info", "type": 2, "level": 1 }, { "id": "201005", "parent_id": 201001, "name": "重新认证", "url": "/company/vaildate", "type": 2, "level": 1 }, { "id": "202001", "parent_id": 0, "name": "组织架构", "url": "#", "type": 4, "level": 1 }, { "id": "202002", "parent_id": 202001, "name": "部门管理", "url": "/department/list", "type": 4, "level": 2 }, { "id": "202003", "parent_id": 202002, "name": "查看", "url": "/department/view", "type": 2, "level": 1 }, { "id": "202004", "parent_id": 202002, "name": "添加", "url": "/department/create", "type": 2, "level": 1 }, { "id": "202005", "parent_id": 202002, "name": "编辑", "url": "/department/update", "type": 2, "level": 1 }, { "id": "202006", "parent_id": 202002, "name": "删除", "url": "/department/delete", "type": 2, "level": 1 }, { "id": "202007", "parent_id": 202001, "name": "员工管理", "url": "/staff-manage/list", "type": 4, "level": 2 }, { "id": "202008", "parent_id": 202007, "name": "查看", "url": "/staff-manage/view", "type": 2, "level": 1 }, { "id": "202009", "parent_id": 202007, "name": "添加", "url": "/staff-manage/create", "type": 2, "level": 1 }, { "id": "202010", "parent_id": 202007, "name": "编辑", "url": "/staff-manage/update", "type": 2, "level": 1 }, { "id": "202011", "parent_id": 202007, "name": "删除", "url": "/staff-manage/delete", "type": 2, "level": 1 }, { "id": "202012", "parent_id": 202007, "name": "离职", "url": "/staff-manage/dimission", "type": 2, "level": 1 }, { "id": "202013", "parent_id": 202007, "name": "复职", "url": "/staff-manage/restore", "type": 2, "level": 1 }, { "id": "202014", "parent_id": 202001, "name": "角色管理", "url": "/role-manage/list", "type": 4, "level": 2 }, { "id": "202015", "parent_id": 202014, "name": "查看", "url": "/role-manage/view", "type": 2, "level": 1 }, { "id": "202016", "parent_id": 202014, "name": "添加", "url": "/role-manage/create", "type": 2, "level": 1 }, { "id": "202017", "parent_id": 202014, "name": "编辑", "url": "/role-manage/update", "type": 2, "level": 1 }, { "id": "202018", "parent_id": 202014, "name": "删除", "url": "/role-manage/delete", "type": 2, "level": 1 }, { "id": "203001", "parent_id": 0, "name": "审批设置", "url": "/dijie/dj-check/index", "type": 4, "level": 1 }, { "id": "203002", "parent_id": 203001, "name": "查看", "url": "/dijie/dj-check/index", "type": 2, "level": 1 }, { "id": "203003", "parent_id": 203001, "name": "添加/设置", "url": "/dijie/dj-check/create", "type": 2, "level": 1 }, { "id": "204001", "parent_id": 0, "name": "安全设置", "url": "#", "type": 4, "level": 1 }, { "id": "204002", "parent_id": 204001, "name": "支付密码设置", "url": "/security/updata-pay-pass", "type": 4, "level": 2 }, { "id": "204003", "parent_id": 204002, "name": "查看", "url": "/security/updata-pay-pass", "type": 2, "level": 1 }, { "id": "204004", "parent_id": 204002, "name": "重置支付密码", "url": "/security/updata-pay-pass", "type": 2, "level": 1 }, { "id": "204005", "parent_id": 204001, "name": "银行卡管理", "url": "/bank-card/index", "type": 4, "level": 2 }, { "id": "204006", "parent_id": 204005, "name": "查看", "url": "/bank-card/index", "type": 2, "level": 1 }, { "id": "204007", "parent_id": 204005, "name": "添加", "url": "/bank-card/create", "type": 2, "level": 1 }, { "id": "204008", "parent_id": 204005, "name": "编辑", "url": "/bank-card/update", "type": 2, "level": 1 }, { "id": "204009", "parent_id": 204005, "name": "删除", "url": "/bank-card/delete", "type": 2, "level": 1 }];
var new_tree = [{ "id": "53002", "parent_id": 53001, "name": "查看", "url": "/ucenter/default/account", "type": 2, "level": 1 }, { "id": "54002", "parent_id": 54001, "name": "查看", "url": "/ucenter/default/safe-set", "type": 2, "level": 1 }, { "id": "101001", "parent_id": 0, "name": "供应商管理", "url": "#", "type": 4, "level": 1 }, { "id": "101002", "parent_id": 101001, "name": "在线关联", "url": "/supplier/index", "type": 4, "level": 2 }, { "id": "101003", "parent_id": 101002, "name": "查看", "url": "/supplier/index", "type": 2, "level": 1 }, { "id": "101004", "parent_id": 101002, "name": "申请关联", "url": "/cooperation/sup-application", "type": 2, "level": 1 }, { "id": "101005", "parent_id": 101002, "name": "审核关联", "url": "/cooperation/sup-auditing", "type": 2, "level": 1 }, { "id": "101006", "parent_id": 101002, "name": "解除关联", "url": "/cooperation/sup-relieve", "type": 2, "level": 1 }, { "id": "101007", "parent_id": 101001, "name": "本地添加", "url": "#", "type": 4, "level": 2 }, { "id": "101008", "parent_id": 101007, "name": "供应商", "url": "/dijie/supplier/index", "type": 4, "level": 3 }, { "id": "101009", "parent_id": 101008, "name": "查看", "url": "/dijie/supplier/view", "type": 2, "level": 1 }, { "id": "101010", "parent_id": 101008, "name": "添加", "url": "/dijie/supplier/create", "type": 2, "level": 1 }, { "id": "101011", "parent_id": 101008, "name": "编辑", "url": "/dijie/supplier/update", "type": 2, "level": 1 }, { "id": "101012", "parent_id": 101008, "name": "删除", "url": "/dijie/supplier/delete", "type": 2, "level": 1 }, { "id": "101013", "parent_id": 101007, "name": "酒店", "url": "/dijie/dj-resource/index-hotel", "type": 4, "level": 3 }, { "id": "101014", "parent_id": 101013, "name": "查看", "url": "/dijie/dj-resource/view-hotel", "type": 2, "level": 1 }, { "id": "101015", "parent_id": 101013, "name": "添加", "url": "/dijie/dj-resource/create-hotel", "type": 2, "level": 1 }, { "id": "101016", "parent_id": 101013, "name": "编辑", "url": "/dijie/dj-resource/update-hotel", "type": 2, "level": 1 }, { "id": "101017", "parent_id": 101013, "name": "删除", "url": "/dijie/dj-resource/delete-hotel", "type": 2, "level": 1 }, { "id": "101018", "parent_id": 101007, "name": "餐厅", "url": "/dijie/dj-resource/index-dining", "type": 4, "level": 3 }, { "id": "101019", "parent_id": 101018, "name": "查看", "url": "/dijie/dj-resource/view-dining", "type": 2, "level": 1 }, { "id": "101020", "parent_id": 101018, "name": "添加", "url": "/dijie/dj-resource/create-dining", "type": 2, "level": 1 }, { "id": "101021", "parent_id": 101018, "name": "编辑", "url": "/dijie/dj-resource/update-dining", "type": 2, "level": 1 }, { "id": "101022", "parent_id": 101018, "name": "删除", "url": "/dijie/dj-resource/delete-dining", "type": 2, "level": 1 }, { "id": "101023", "parent_id": 101007, "name": "景区", "url": "/dijie/dj-resource/index-place", "type": 4, "level": 3 }, { "id": "101024", "parent_id": 101023, "name": "查看", "url": "/dijie/dj-resource/view-place", "type": 2, "level": 1 }, { "id": "101025", "parent_id": 101023, "name": "添加", "url": "/dijie/dj-resource/create-place", "type": 2, "level": 1 }, { "id": "101026", "parent_id": 101023, "name": "编辑", "url": "/dijie/dj-resource/update-place", "type": 2, "level": 1 }, { "id": "101027", "parent_id": 101023, "name": "删除", "url": "/dijie/dj-resource/delete-place", "type": 2, "level": 1 }, { "id": "101028", "parent_id": 101007, "name": "购物店", "url": "/dijie/dj-resource/index-shop", "type": 4, "level": 3 }, { "id": "101029", "parent_id": 101028, "name": "查看", "url": "/dijie/dj-resource/view-shop", "type": 2, "level": 1 }, { "id": "101030", "parent_id": 101028, "name": "添加", "url": "/dijie/dj-resource/create-shop", "type": 2, "level": 1 }, { "id": "101031", "parent_id": 101028, "name": "编辑", "url": "/dijie/dj-resource/update-shop", "type": 2, "level": 1 }, { "id": "101032", "parent_id": 101028, "name": "删除", "url": "/dijie/dj-resource/delete-shop", "type": 2, "level": 1 }, { "id": "102001", "parent_id": 0, "name": "分销商管理", "url": "#", "type": 4, "level": 1 }, { "id": "102002", "parent_id": 102001, "name": "在线关联", "url": "/customer/index", "type": 4, "level": 2 }, { "id": "102003", "parent_id": 102002, "name": "查看", "url": "/customer/index", "type": 2, "level": 1 }, { "id": "102004", "parent_id": 102002, "name": "申请关联", "url": "/cooperation/cus-application", "type": 2, "level": 1 }, { "id": "102005", "parent_id": 102002, "name": "审核关联", "url": "/cooperation/cus-auditing", "type": 2, "level": 1 }, { "id": "102006", "parent_id": 102002, "name": "解除关联", "url": "/cooperation/cus-relieve", "type": 2, "level": 1 }, { "id": "102007", "parent_id": 102002, "name": "修改优惠", "url": "/customer/update-rebate", "type": 2, "level": 1 }, { "id": "102008", "parent_id": 102001, "name": "本地添加", "url": "/dijie/customer/index", "type": 4, "level": 2 }, { "id": "102009", "parent_id": 102008, "name": "查看", "url": "/dijie/customer/view", "type": 2, "level": 1 }, { "id": "102010", "parent_id": 102008, "name": "添加", "url": "/dijie/customer/create", "type": 2, "level": 1 }, { "id": "102011", "parent_id": 102008, "name": "编辑", "url": "/dijie/customer/update", "type": 2, "level": 1 }, { "id": "102012", "parent_id": 102008, "name": "删除", "url": "/dijie/customer/delete", "type": 2, "level": 1 }, { "id": "102013", "parent_id": 102008, "name": "查看历史订单", "url": "/dijie/order/index", "type": 2, "level": 1 }, { "id": "102017", "parent_id": 102008, "name": "设置授信额度", "url": "/dijie/customer/set-limit-credit", "type": 2, "level": 1 }, { "id": "103001", "parent_id": 0, "name": "产品管理", "url": "#", "type": 4, "level": 1 }, { "id": "103002", "parent_id": 103001, "name": "跟团游", "url": "/wholesale/product-line/wholesale-product-list", "type": 4, "level": 2 }, { "id": "103003", "parent_id": 103002, "name": "查看", "url": "/wholesale/product-line/wholesale-product-list", "type": 2, "level": 1 }, { "id": "103004", "parent_id": 103002, "name": "添加", "url": "/product-line/base-info", "type": 2, "level": 1 }, { "id": "103005", "parent_id": 103002, "name": "编辑", "url": "/product-line/base-info", "type": 2, "level": 1 }, { "id": "103006", "parent_id": 103002, "name": "删除", "url": "/product-line/delete", "type": 2, "level": 1 }, { "id": "103007", "parent_id": 103002, "name": "分销", "url": "/wholesale/product-line/is-onsale", "type": 2, "level": 1 }, { "id": "103008", "parent_id": 103002, "name": "复制", "url": "/wholesale/product-line/copy-route-product", "type": 2, "level": 1 }, { "id": "103010", "parent_id": 103001, "name": "门票", "url": "/ticket/product/ticket-list", "type": 4, "level": 2 }, { "id": "103077", "parent_id": 103010, "name": "查看", "url": "/ticket/product/ticket-list", "type": 2, "level": 1 }, { "id": "103094", "parent_id": 103010, "name": "分销", "url": null, "type": 2, "level": 1 }, { "id": "103095", "parent_id": 103002, "name": "更新", "url": "/wholesale/product-line/syn-product-info", "type": 2, "level": 1 }, { "id": "104001", "parent_id": 0, "name": "采购管理", "url": "#", "type": 4, "level": 1 }, { "id": "104002", "parent_id": 104001, "name": "产品采购", "url": "/wholesale/product-line/supplier-product-list", "type": 4, "level": 2 }, { "id": "104003", "parent_id": 104002, "name": "查看", "url": "/wholesale/product-line/product-route-view", "type": 2, "level": 1 }, { "id": "104004", "parent_id": 104002, "name": "采购", "url": "/wholesale/product-line/modi-buy-product", "type": 2, "level": 1 }, { "id": "104005", "parent_id": 104002, "name": "包装产品", "url": "/wholesale/product-line/packaging", "type": 2, "level": 1 }, { "id": "104006", "parent_id": 104001, "name": "产品审核", "url": "/wholesale/product-line/purchase-confirm", "type": 4, "level": 2 }, { "id": "104007", "parent_id": 104006, "name": "查看", "url": "/purchase-confirm/index", "type": 2, "level": 1 }, { "id": "104008", "parent_id": 104006, "name": "审批", "url": "/purchase-confirm/audit", "type": 2, "level": 1 }, { "id": "104009", "parent_id": 104006, "name": "修改优惠", "url": "/wholesale/product-line/edit-discounts", "type": 2, "level": 1 }, { "id": "104017", "parent_id": 104006, "name": "修改账期", "url": "/wholesale/product-line/sp-edit-payment-term", "type": 2, "level": 1 }, { "id": "104018", "parent_id": 104006, "name": "修改现返", "url": "/wholesale/product-line/sp-edit-xian-fan", "type": 2, "level": 1 }, { "id": "104019", "parent_id": 104006, "name": "审批账期", "url": "/wholesale/product-line/sp-audit-payment-term", "type": 2, "level": 1 }, { "id": "104020", "parent_id": 104006, "name": "审批现返", "url": "/wholesale/product-line/sp-audit-xian-fan", "type": 2, "level": 1 }, { "id": "104022", "parent_id": 104002, "name": "取消采购", "url": "/wholesale/product-line/cancel-buy", "type": 2, "level": 1 }, { "id": "104023", "parent_id": 104002, "name": "修改账期", "url": "/wholesale/product-line/edit-payment-term", "type": 2, "level": 1 }, { "id": "104024", "parent_id": 104002, "name": "修改现返", "url": "/wholesale/product-line/edit-xian-fan", "type": 2, "level": 1 }, { "id": "104025", "parent_id": 104002, "name": "审批账期", "url": "/wholesale/product-line/audit-payment-term", "type": 2, "level": 1 }, { "id": "104026", "parent_id": 104002, "name": "审批现返", "url": "/wholesale/product-line/audit-xian-fan", "type": 2, "level": 1 }, { "id": "104027", "parent_id": 104002, "name": "申请关联", "url": "/wholesale/product-line/modi-buy-product", "type": 2, "level": 1 }, { "id": "105001", "parent_id": 0, "name": "在线订单", "url": "#", "type": 4, "level": 1 }, { "id": "105002", "parent_id": 105001, "name": "跟团游", "url": "/wholesale/product-line/order-list", "type": 4, "level": 2 }, { "id": "105003", "parent_id": 105002, "name": "查看", "url": "/wholesale/product-line/product-route-view", "type": 2, "level": 1 }, { "id": "105004", "parent_id": 105002, "name": "确认/拒绝", "url": "/wholesale/money-order/order-confirm", "type": 2, "level": 1 }, { "id": "105005", "parent_id": 105002, "name": "申请结算", "url": "/product-line/settlement-ack-form", "type": 2, "level": 1 }, { "id": "105006", "parent_id": 105001, "name": "门票", "url": "/ticket/order/order-list", "type": 4, "level": 2 }, { "id": "105020", "parent_id": 105006, "name": "查看", "url": "/ticket/order/order-list", "type": 2, "level": 1 }, { "id": "105023", "parent_id": 105006, "name": "处理退款", "url": "/ticket/order/refund-audit", "type": 2, "level": 1 }, { "id": "105024", "parent_id": 105002, "name": "改价", "url": "/product-line-order/confirm", "type": 2, "level": 1 }, { "id": "105025", "parent_id": 105002, "name": "取消订单", "url": "/wholesale/money-order/order-cancel", "type": 2, "level": 1 }, { "id": "105026", "parent_id": 105002, "name": "主动结算", "url": "/product-line/settlement-do", "type": 2, "level": 1 }, { "id": "105027", "parent_id": 105002, "name": "处理结算", "url": "/product-line/audit-settlement", "type": 2, "level": 1 }, { "id": "105028", "parent_id": 105002, "name": "申请退款", "url": "/wholesale/money-order/apply-refund", "type": 2, "level": 1 }, { "id": "105029", "parent_id": 105002, "name": "主动退款", "url": "/wholesale/money-order/self-init-refund", "type": 2, "level": 1 }, { "id": "105030", "parent_id": 105002, "name": "处理退款", "url": "/wholesale/money-order/agree-refund", "type": 2, "level": 1 }, { "id": "106001", "parent_id": 0, "name": "地接ERP", "url": "#", "type": 4, "level": 1 }, { "id": "106002", "parent_id": 106001, "name": "代客下单", "url": "/dijie/order/index", "type": 4, "level": 2 }, { "id": "106003", "parent_id": 106002, "name": "查看", "url": "/dijie/order/index", "type": 2, "level": 1 }, { "id": "106004", "parent_id": 106002, "name": "添加", "url": "/dijie/order/create", "type": 2, "level": 1 }, { "id": "106005", "parent_id": 106002, "name": "编辑", "url": "/dijie/order/view", "type": 2, "level": 1 }, { "id": "106006", "parent_id": 106002, "name": "删除", "url": "/dijie/order/order-del", "type": 2, "level": 1 }, { "id": "106009", "parent_id": 106001, "name": "团计划管理", "url": "/dijie/dj-group-list/index", "type": 4, "level": 2 }, { "id": "106010", "parent_id": 106009, "name": "查看", "url": "/dijie/dj-group-list/group-list", "type": 2, "level": 1 }, { "id": "106011", "parent_id": 106009, "name": "添加/编辑散拼团", "url": "/dijie/order/san-order-sel", "type": 2, "level": 1 }, { "id": "106012", "parent_id": 106009, "name": "添加/编辑定制团", "url": "/dijie/dj-group-list/custom-create", "type": 2, "level": 1 }, { "id": "106013", "parent_id": 106009, "name": "景点调配", "url": "/dijie/dj-resource/index-place-resource", "type": 2, "level": 1 }, { "id": "106014", "parent_id": 106009, "name": "酒店调配", "url": "/dijie/dj-resource/index-hotel-resource", "type": 2, "level": 1 }, { "id": "106015", "parent_id": 106009, "name": "餐厅调配", "url": "/dijie/dj-resource/index-dining-resource", "type": 2, "level": 1 }, { "id": "106016", "parent_id": 106009, "name": "购物店调配", "url": "/dijie/dj-resource/index-shop-resource", "type": 2, "level": 1 }, { "id": "106017", "parent_id": 106009, "name": "加点调配", "url": "/dijie/dj-resource/index-jiadian-resource", "type": 2, "level": 1 }, { "id": "106018", "parent_id": 106009, "name": "导游调配", "url": "/dijie/dj-group-dp/get-guide-dp", "type": 2, "level": 1 }, { "id": "106019", "parent_id": 106009, "name": "转地接调配", "url": "/dijie/dj-group-dp/get-zhuandijie-dp", "type": 2, "level": 1 }, { "id": "106020", "parent_id": 106009, "name": "车队调配", "url": "/dijie/dj-group-dp/vehicle-demand-list", "type": 2, "level": 1 }, { "id": "106021", "parent_id": 106009, "name": "大交通调配", "url": "/dijie/dj-group-dp/get-dajiaotong-dp", "type": 2, "level": 1 }, { "id": "106022", "parent_id": 106009, "name": "导出行程单", "url": "/dijie/itinerary/create", "type": 2, "level": 1 }, { "id": "106023", "parent_id": 106009, "name": "取消计划", "url": "/dijie/dj-group-list/cancel-group-list", "type": 2, "level": 1 }, { "id": "106024", "parent_id": 106009, "name": "删除", "url": "/dijie/dj-group-list/del-group-list", "type": 2, "level": 1 }, { "id": "106025", "parent_id": 106009, "name": "一键派团", "url": "/dijie/dj-group-dp/paidan", "type": 2, "level": 1 }, { "id": "106026", "parent_id": 106009, "name": "预览资源调配", "url": "/dijie/dj-group-dp/yulan", "type": 2, "level": 1 }, { "id": "106027", "parent_id": 106009, "name": "复制计划", "url": "/dijie/dj-group-list/copy-custom-group", "type": 2, "level": 1 }, { "id": "106028", "parent_id": 106009, "name": "预览行程单", "url": "/dijie/itinerary/view", "type": 2, "level": 1 }, { "id": "106029", "parent_id": 106009, "name": "备用金查看", "url": "/dijie/dj-g-ready/dp-guide-pay-detail", "type": 2, "level": 1 }, { "id": "106030", "parent_id": 106001, "name": "团账审批", "url": "/dijie/tally/index", "type": 4, "level": 2 }, { "id": "106031", "parent_id": 106030, "name": "查看", "url": "/dijie/tally/view", "type": 2, "level": 1 }, { "id": "106033", "parent_id": 106001, "name": "导游管理", "url": "/dijie/dj-guide/index", "type": 4, "level": 2 }, { "id": "106034", "parent_id": 106033, "name": "查看", "url": "/dijie/dj-guide/view", "type": 2, "level": 1 }, { "id": "106035", "parent_id": 106033, "name": "添加", "url": "/dijie/dj-guide/create", "type": 2, "level": 1 }, { "id": "106036", "parent_id": 106033, "name": "编辑", "url": "/dijie/dj-guide/update", "type": 2, "level": 1 }, { "id": "106037", "parent_id": 106033, "name": "删除", "url": "/dijie/dj-guide/guide-delete", "type": 2, "level": 1 }, { "id": "106038", "parent_id": 106033, "name": "查看导游排期", "url": "/dijie/dj-guide/schedule", "type": 2, "level": 1 }, { "id": "106192", "parent_id": 106009, "name": "人天数统计", "url": "/dijie/dj-group-list/peo-day-list", "type": 2, "level": 1 }, { "id": "106193", "parent_id": 106009, "name": "业务员收客统计", "url": "/dijie/dj-group-list/salesman-statis", "type": 2, "level": 1 }, { "id": "106194", "parent_id": 106009, "name": "分销商收客统计", "url": "/dijie/dj-group-list/cus-statis", "type": 2, "level": 1 }, { "id": "106195", "parent_id": 106009, "name": "购物统计", "url": "/dijie/dj-group-list/staty-shop-list", "type": 2, "level": 1 }, { "id": "106199", "parent_id": 106009, "name": "备用金调配", "url": "/dijie/dj-group-dp/update-beiyongjin-dp", "type": 2, "level": 1 }, { "id": "151001", "parent_id": 0, "name": "企业资金", "url": "/company-account/index", "type": 4, "level": 1 }, { "id": "151002", "parent_id": 151001, "name": "查看", "url": "/company-account/unpaid-list", "type": 2, "level": 1 }, { "id": "151003", "parent_id": 151001, "name": "充值", "url": "/company-account/recharge", "type": 2, "level": 1 }, { "id": "151004", "parent_id": 151001, "name": "提现", "url": "/company-account/withdraw", "type": 2, "level": 1 }, { "id": "151005", "parent_id": 151001, "name": "冻结明细", "url": "/company-account/unpaid-list", "type": 2, "level": 1 }, { "id": "152001", "parent_id": 0, "name": "企业待收款", "url": "#", "type": 4, "level": 1 }, { "id": "152002", "parent_id": 152001, "name": "团计划", "url": "/dijie/dj-g-ready/income-list", "type": 4, "level": 2 }, { "id": "152003", "parent_id": 152002, "name": "查看", "url": "/dijie/dj-g-ready/income-list", "type": 2, "level": 1 }, { "id": "152004", "parent_id": 152002, "name": "收款登记", "url": "/dijie/dj-g-ready/income-single-check", "type": 2, "level": 1 }, { "id": "152005", "parent_id": 152002, "name": "导出excel", "url": "/dijie/dj-g-ready/income-export", "type": 2, "level": 1 }, { "id": "152006", "parent_id": 152002, "name": "收款记录", "url": "/dijie/dj-group-income/index", "type": 2, "level": 1 }, { "id": "152007", "parent_id": 152001, "name": "在线订单", "url": "/wholesale/money-order/finance-receive-list", "type": 4, "level": 2 }, { "id": "152010", "parent_id": 152007, "name": "查看", "url": "/wholesale/money-order/finance-receive-detail", "type": 2, "level": 1 }, { "id": "152011", "parent_id": 152007, "name": "到账确认", "url": "/product-line/settlement-ack", "type": 2, "level": 1 }, { "id": "153001", "parent_id": 0, "name": "企业待付款", "url": "", "type": 4, "level": 1 }, { "id": "153002", "parent_id": 153001, "name": "团计划", "url": "/dijie/dj-g-ready/pay-list", "type": 4, "level": 2 }, { "id": "153003", "parent_id": 153002, "name": "查看", "url": "/dijie/dj-g-ready/pay-list", "type": 2, "level": 1 }, { "id": "153004", "parent_id": 153002, "name": "预付/签单登记", "url": "/dijie/dj-g-ready/pay-single-check", "type": 2, "level": 1 }, { "id": "153005", "parent_id": 153002, "name": "导出excel", "url": "/dijie/dj-g-ready/pay-export", "type": 2, "level": 1 }, { "id": "153006", "parent_id": 153002, "name": "付款记录", "url": "/dijie/dj-group-pay/index", "type": 2, "level": 1 }, { "id": "153007", "parent_id": 153001, "name": "在线订单", "url": "/wholesale/money-order/finance-audit-list", "type": 4, "level": 2 }, { "id": "153008", "parent_id": 153007, "name": "查看", "url": "/wholesale/money-order/finance-audit-list", "type": 2, "level": 1 }, { "id": "153009", "parent_id": 153007, "name": "处理结算", "url": "/wholesale/product-price/distributor-set", "type": 2, "level": 1 }, { "id": "153012", "parent_id": 153002, "name": "上锁/解锁", "url": "/dijie/dj-g-ready/dp-lock", "type": 2, "level": 1 }, { "id": "153013", "parent_id": 153007, "name": "处理退款", "url": "/wholesale/money-order/finance-refund", "type": 2, "level": 1 }, { "id": "154001", "parent_id": 0, "name": "导游收付款", "url": "/dijie/dj-g-ready/guide-pay-list", "type": 4, "level": 1 }, { "id": "154002", "parent_id": 154001, "name": "查看", "url": "/dijie/dj-g-ready/guide-pay-list", "type": 2, "level": 1 }, { "id": "154003", "parent_id": 154001, "name": "导出excel", "url": "/dijie/dj-g-ready/guide-income-export", "type": 2, "level": 1 }, { "id": "154005", "parent_id": 154001, "name": "收/付登记", "url": "/dijie/dj-g-ready/guide-pay-single-check", "type": 2, "level": 1 }, { "id": "155001", "parent_id": 0, "name": "团账锁定", "url": "/dijie/group-bill/index", "type": 4, "level": 1 }, { "id": "155002", "parent_id": 155001, "name": "查看", "url": "/dijie/group-bill/group-list", "type": 2, "level": 1 }, { "id": "155003", "parent_id": 155001, "name": "锁账", "url": "/dijie/group-bill/group-lock", "type": 2, "level": 1 }, { "id": "155004", "parent_id": 155001, "name": "解锁", "url": "/dijie/group-bill/un-group-lock-list", "type": 2, "level": 1 }, { "id": "155019", "parent_id": 155001, "name": "拒绝", "url": "/dijie/group-bill/refuse-group-lock-list", "type": 2, "level": 1 }, { "id": "155022", "parent_id": 155001, "name": "编辑", "url": "/dijie/dj-other-cw-jz/index", "type": 2, "level": 1 }, { "id": "201001", "parent_id": 0, "name": "企业资料", "url": "/company/index", "type": 4, "level": 1 }, { "id": "201002", "parent_id": 201001, "name": "查看", "url": "/company/index", "type": 2, "level": 1 }, { "id": "201004", "parent_id": 201001, "name": "编辑", "url": "/company/basic-info", "type": 2, "level": 1 }, { "id": "201005", "parent_id": 201001, "name": "重新认证", "url": "/company/vaildate", "type": 2, "level": 1 }, { "id": "202001", "parent_id": 0, "name": "组织架构", "url": "#", "type": 4, "level": 1 }, { "id": "202002", "parent_id": 202001, "name": "部门管理", "url": "/department/list", "type": 4, "level": 2 }, { "id": "202003", "parent_id": 202002, "name": "查看", "url": "/department/view", "type": 2, "level": 1 }, { "id": "202004", "parent_id": 202002, "name": "添加", "url": "/department/create", "type": 2, "level": 1 }, { "id": "202005", "parent_id": 202002, "name": "编辑", "url": "/department/update", "type": 2, "level": 1 }, { "id": "202006", "parent_id": 202002, "name": "删除", "url": "/department/delete", "type": 2, "level": 1 }, { "id": "202007", "parent_id": 202001, "name": "员工管理", "url": "/staff-manage/list", "type": 4, "level": 2 }, { "id": "202008", "parent_id": 202007, "name": "查看", "url": "/staff-manage/view", "type": 2, "level": 1 }, { "id": "202009", "parent_id": 202007, "name": "添加", "url": "/staff-manage/create", "type": 2, "level": 1 }, { "id": "202010", "parent_id": 202007, "name": "编辑", "url": "/staff-manage/update", "type": 2, "level": 1 }, { "id": "202011", "parent_id": 202007, "name": "删除", "url": "/staff-manage/delete", "type": 2, "level": 1 }, { "id": "202012", "parent_id": 202007, "name": "离职", "url": "/staff-manage/dimission", "type": 2, "level": 1 }, { "id": "202013", "parent_id": 202007, "name": "复职", "url": "/staff-manage/restore", "type": 2, "level": 1 }, { "id": "202014", "parent_id": 202001, "name": "角色管理", "url": "/role-manage/list", "type": 4, "level": 2 }, { "id": "202015", "parent_id": 202014, "name": "查看", "url": "/role-manage/view", "type": 2, "level": 1 }, { "id": "202016", "parent_id": 202014, "name": "添加", "url": "/role-manage/create", "type": 2, "level": 1 }, { "id": "202017", "parent_id": 202014, "name": "编辑", "url": "/role-manage/update", "type": 2, "level": 1 }, { "id": "202018", "parent_id": 202014, "name": "删除", "url": "/role-manage/delete", "type": 2, "level": 1 }, { "id": "203001", "parent_id": 0, "name": "审批设置", "url": "/dijie/dj-check/index", "type": 4, "level": 1 }, { "id": "203002", "parent_id": 203001, "name": "查看", "url": "/dijie/dj-check/index", "type": 2, "level": 1 }, { "id": "203003", "parent_id": 203001, "name": "添加/设置", "url": "/dijie/dj-check/create", "type": 2, "level": 1 }, { "id": "204001", "parent_id": 0, "name": "安全设置", "url": "#", "type": 4, "level": 1 }, { "id": "204002", "parent_id": 204001, "name": "支付密码设置", "url": "/security/updata-pay-pass", "type": 4, "level": 2 }, { "id": "204003", "parent_id": 204002, "name": "查看", "url": "/security/updata-pay-pass", "type": 2, "level": 1 }, { "id": "204004", "parent_id": 204002, "name": "重置支付密码", "url": "/security/updata-pay-pass", "type": 2, "level": 1 }, { "id": "204005", "parent_id": 204001, "name": "银行卡管理", "url": "/bank-card/index", "type": 4, "level": 2 }, { "id": "204006", "parent_id": 204005, "name": "查看", "url": "/bank-card/index", "type": 2, "level": 1 }, { "id": "204007", "parent_id": 204005, "name": "添加", "url": "/bank-card/create", "type": 2, "level": 1 }, { "id": "204008", "parent_id": 204005, "name": "编辑", "url": "/bank-card/update", "type": 2, "level": 1 }, { "id": "204009", "parent_id": 204005, "name": "删除", "url": "/bank-card/delete", "type": 2, "level": 1 }];
var Config = (function () {
    function Config() {
    }
    Config.default_key_child = "children";
    Config.key_child = Config.default_key_child;
    Config.key_text = "name";
    Config.zoom = 1;
    return Config;
}());
var Core;
(function (Core) {
    var TreeType;
    (function (TreeType) {
        TreeType[TreeType["NORMAL"] = 1] = "NORMAL";
        TreeType[TreeType["NEW"] = 2] = "NEW";
        TreeType[TreeType["MODIFIED"] = 3] = "MODIFIED";
        TreeType[TreeType["DELETE"] = 4] = "DELETE";
    })(TreeType = Core.TreeType || (Core.TreeType = {}));
    var CMiniTree = (function () {
        function CMiniTree(data, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.X_MARGIN = 20;
            this.Y_MARGIN = 30;
            this.x = x;
            this.y = y;
            this.w = 0;
            this.h = 0;
            this.max_level = 0;
            this.data = data;
            this.nodes = [];
            this.type = TreeType.NORMAL;
            this.node_count = 0;
            this.longest_node = null;
            this.init();
        }
        CMiniTree.prototype.init = function () {
            this.visitNode(this.data, 0);
            this.bound();
        };
        CMiniTree.prototype.bound = function () {
            var maxX = 0;
            var maxY = 0;
            (this.nodes).forEach(function (v, i, a) {
                var b = v.getBound();
                if (b.x2 > maxX) {
                    maxX = b.x2;
                }
                if (b.y2 > maxY) {
                    maxY = b.y2;
                }
            });
            this.w = maxX - this.x;
            this.h = maxY - this.y;
        };
        CMiniTree.prototype.getWidth = function () {
            return this.w;
        };
        CMiniTree.prototype.getHeight = function () {
            return this.h;
        };
        CMiniTree.prototype.getBound = function () {
            return new Core.CBound(this.x, this.y, this.x + this.w, this.y + this.h);
        };
        CMiniTree.prototype.setType = function (type) {
            this.type = type;
        };
        CMiniTree.prototype.getType = function () {
            return this.type;
        };
        CMiniTree.prototype.draw = function () {
            this.nodes.forEach(function (v) {
                v.draw();
            });
        };
        CMiniTree.prototype.visitNode = function (v, level) {
            var _this = this;
            this.node_count++;
            if (level > this.max_level) {
                this.max_level = level;
            }
            var yMargin = this.Y_MARGIN * this.node_count;
            var xMargin = this.X_MARGIN * level;
            var x = this.x + xMargin;
            var y = this.y + yMargin;
            if (v[Config.key_child] && v[Config.key_child].length) {
                var node = new Core.CMiniTreeNode(x, y, v[Config.key_text], true);
                this.nodes.push(node);
                v['children'].forEach(function (sub_v) {
                    _this.visitNode(sub_v, sub_v['level']);
                });
            }
            else {
                var node = new Core.CMiniTreeNode(x, y, v[Config.key_text], false);
                this.nodes.push(node);
            }
        };
        CMiniTree.prototype.drawBk = function () {
        };
        return CMiniTree;
    }());
    Core.CMiniTree = CMiniTree;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var CScene = (function () {
        function CScene() {
            this.ACTIVE_NON_TREE = -1;
            this.old_data = [];
            this.new_data = [];
            this.old_build_data = null;
            this.new_build_data = null;
            this.old_tree = [];
            this.new_tree = [];
            this.xOldStart = 0;
            this.yOldStart = 0;
            this.xNewStart = 0;
            this.yNewStart = 0;
            this.old_tree_bound = new Core.CBound(0, 0, 0, 0);
            this.new_tree_bound = new Core.CBound(0, 0, 0, 0);
            this.active_tree = this.ACTIVE_NON_TREE;
        }
        CScene.prototype.bootstrap = function () {
            this.initLocalTree(true);
            this.initLocalTree(false);
            this.buildTree(true);
            this.buildTree(false);
            this.initTreeBound();
            canvas.height = this.old_tree_bound.y2 + 20;
        };
        CScene.prototype.initTreeBound = function ($bOldTree) {
            if ($bOldTree === void 0) { $bOldTree = true; }
            var tree = $bOldTree ? this.old_tree : this.new_tree;
            var x1 = 100000;
            var y1 = 100000;
            var x2 = 0;
            var y2 = 0;
            for (var i = 0; i < tree.length; i++) {
                var bound = tree[i].getBound();
                if (bound.x1 < x1) {
                    x1 = bound.x1;
                }
                if (bound.y1 < y1) {
                    y1 = bound.y1;
                }
                if (bound.x2 > x2) {
                    x2 = bound.x2;
                }
                if (bound.y2 > y2) {
                    y2 = bound.y2;
                }
            }
            if ($bOldTree) {
                this.old_tree_bound = new Core.CBound(x1, y1, x2, y2);
            }
            else {
                this.new_tree_bound = new Core.CBound(x1, y1, y2, y2);
            }
        };
        CScene.prototype.draw = function () {
            this.old_tree.forEach(function (v) {
                v.draw();
            });
        };
        CScene.prototype.buildTree = function (bOld) {
            var _this = this;
            if (bOld) {
                this.old_build_data = CScene.buildTree(this.old_data);
                var miniX_1 = this.xOldStart;
                var miniY_1 = this.yOldStart;
                this.old_build_data.forEach(function (v) {
                    var tree = new Core.CMiniTree(v, miniX_1, miniY_1);
                    _this.old_tree.push(tree);
                    miniY_1 = tree.getBound().y2 + 30;
                });
            }
            else {
                this.new_build_data = CScene.buildTree(this.new_data);
                this.new_build_data.forEach(function (v) {
                    var tree = new Core.CMiniTree(v);
                    _this.new_tree.push(tree);
                });
            }
        };
        CScene.prototype.initLocalTree = function (bOld) {
            if (bOld) {
                this.old_data = old_tree;
            }
            else {
                this.new_data = new_tree;
            }
        };
        CScene.is_callable = function (func) {
            return (typeof func === "function");
        };
        CScene.buildTree = function (array, callback, parent_id, level, child_node) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (parent_id === void 0) { parent_id = 0; }
            if (level === void 0) { level = 1; }
            if (child_node === void 0) { child_node = "children"; }
            var tree = [];
            array.forEach(function (v, k) {
                if (v['parent_id'] == parseInt(parent_id)) {
                    delete array[k];
                    var tmp = CScene.is_callable(callback) ? callback.call(_this, v) : v;
                    tmp['level'] = level;
                    var children = CScene.buildTree(array, callback, v['id'], level + 1, child_node);
                    if (children.length) {
                        tmp[child_node] = children;
                    }
                    tree.push(tmp);
                }
            });
            return tree;
        };
        return CScene;
    }());
    Core.CScene = CScene;
})(Core || (Core = {}));
var FlatFish;
(function (FlatFish) {
    var CApp = (function () {
        function CApp(appId) {
            this._bootstrap = false;
            this.appId = appId;
            this.errors = [];
            var $app = $('#' + appId);
            var width = $app.width();
            var height = $app.height();
            this.ctx = new Core.Context(appId, width, height);
            this.scene = new Core.CScene();
        }
        CApp.prototype.getContext = function () {
            return this.ctx.getRender2D();
        };
        CApp.prototype.run = function () {
            var that = this;
            try {
                this.ctx.bootstrap();
                this.scene.bootstrap();
                this.scene.draw();
            }
            catch (e) {
                console.log(e);
                that.errors.push(e);
            }
            this._bootstrap = true;
        };
        return CApp;
    }());
    FlatFish.CApp = CApp;
})(FlatFish || (FlatFish = {}));
var ctx;
var canvas;
var app = new FlatFish.CApp('flatfish');
app.run();
var CRect = (function () {
    function CRect(x, y, w, h) {
        if (w < 0) {
            throw new Error('rect width must be greater than 0');
        }
        if (h < 0) {
            throw new Error('rect height must be greater than 0');
        }
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
    }
    Object.defineProperty(CRect.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRect.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRect.prototype, "w", {
        get: function () {
            return this._w;
        },
        set: function (width) {
            if (width < 0) {
                throw new Error('rect width must be greater than 0');
            }
            this._w = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRect.prototype, "h", {
        get: function () {
            return this._h;
        },
        set: function (height) {
            if (height < 0) {
                throw new Error('rect height must be greater than 0');
            }
            this._h = height;
        },
        enumerable: true,
        configurable: true
    });
    return CRect;
}());
//# sourceMappingURL=flatfish.js.map