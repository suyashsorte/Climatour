class ToDoStore{
    // var dat=new Array;
    constructor(){
        this.data= new Array;
    }
    createToDo(title,status,id){
        var a = [[title],[status],[id]];
        // this.id+=1;
        this.data.push(a);
        window.print(this.data);
    }
    getToDo(id){
        for(let i=0;i<data.length;i++){
            for(let j=0;j<data[i].length;j++){
                if(id==data[[j]].id){
                    print(dat[[j]].title);
                } 
            }
        }
    }
    deleteToDo(id){
        for(let i=0;i<data.length;i++){
            for(let j=0;j<data[i].length;j++){
                if(id==data[[j]].id){
                    print(dat[[j]].title);
                    this
                } 
            }
        }
    }
    getToDosByStatus(){
        continue;
    }
}

var ob=new ToDoStore();
ob.createToDo("title","status",0);
// ob.getToDo(0);