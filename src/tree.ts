/**
 * Created by Administrator on 2017/12/15 0015.
 */
class CTree{
    old_tree:any;
    new_tree:any;
    old_build_tree:any;
    new_build_tree:any;
    constructor(old_tree:any,new_tree:any){
        this.old_tree = old_tree;
        this.new_tree = new_tree;
        this.old_build_tree = [];
        this.new_build_tree = [];
    }
    getLocalOldTree(){
        this.old_tree=[
            {
                "id":1,"parent_id":0,"name":"一级菜单",
            },{
                "id":2,"parent_id":1,"name":"二级菜单1",
            },{
                "id":3,"parent_id":1,"name":"二级菜单2",
            },{
                "id":4,"parent_id":2,"name":"三级菜单1",
            }
        ];
        this.new_tree =[
            {
                "id":1,"parent_id":0,"name":"一级菜单",
            },{
                "id":2,"parent_id":1,"name":"二级菜单1",
            },{
                "id":3,"parent_id":1,"name":"二级菜单2",
            },{
                "id":4,"parent_id":2,"name":"三级菜单1",
            },{
                "id":5,"parent_id":2,"name":"三级菜单2",
            }
        ];
    }
    getOldBuildTree(){
        this.old_build_tree = this.buildTree(this.old_tree);
    }
    getNewBuildTree(){
        this.new_build_tree = this.buildTree(this.new_tree);
    }
    static is_callable(func):boolean{
        return (typeof func === "function");
    }
    buildTree(array, callback = null, parent_id = 0, child_node = "children"):any{
        let tree = [];
        let that = this;
        array.forEach((v,k,arr)=>{
            if (v['parent_id'] == parent_id) {
                arr.shift(array[k]);
                let tmp = that.is_callable(callback) ? callback.call(this, v) : v;
                let children = this.buildTree(array, callback, v['id'], child_node);
                if (children) {
                    tmp[child_node] = children;
                }
                tree.push(tmp);
            }
        });
        return tree;
    }
}