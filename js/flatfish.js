var FlatFish = Class.extend({
    init:function(){
        this.model = new Model();
        this.drawer = new Drawer();
    }
});

var Model = Class.extend({
    init:function(){
       this.data = null;
    },
    pull:function(){

    },
    getLeftTree:function(){

    },
    getRightTree:function(){

    }
});

var Drawer = Class.extend({
    init:function(left_tree,right_tree){
        this.left_tree = left_tree;
        this.right_tree = right_tree;
    },
    show:function(){

    }
});
