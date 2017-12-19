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
        this.old_build_tree = null;
        this.new_build_tree = null;
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
    /*
     * @func 获取老树状菜单的结构
     * @return 老树状菜单JSON数据
     */
    getOldBuildTree(){
        if(this.old_build_tree === null) {
            this.old_build_tree = this.buildTree(this.old_tree);
            return this.old_build_tree;
        }
        return this.old_build_tree;
    }
    /*
     * @func 获取新树状菜单的结构
     * @return 新树状菜单JSON数据
     */
    getNewBuildTree(){
        if(this.new_build_tree === null) {
            this.new_build_tree = this.buildTree(this.new_tree);
            return this.new_build_tree;
        }
        return this.new_build_tree;
    }
    static is_callable(func):boolean{
        return (typeof func === "function");
    }
    /*
     * @func 将二维数组转换成JSON树状数组
     * @para array 二维数组
     * @para callback 回调函数
     * @para parent_id 父ID
     * @para child_node 子节点键名
     */
    buildTree(array:array<any>, callback:any = null, parent_id:number = 0, child_node:string = "children"):any{
        let tree = [];
        let that:any = this;
        array.forEach((v,k,arr)=>{
            if (v['parent_id'] == parent_id) {
                delete array[k];
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