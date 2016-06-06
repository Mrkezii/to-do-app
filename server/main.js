// i dont understand line 32
import {
    Meteor
}
from 'meteor/meteor';

Todos = new Mongo.Collection('todos');

// publish
Meteor.publish("todos", function(){
    if(!this.userId){
//        return Todos.find();
//        return Todos.find({});
        return none;
    }else{
        return Todos.find({userId: this.userId});
    }
});
// Meteor Methods
Meteor.methods({
    // add fields
    addTodo: function(text){
        if(!Meteor.userId()){ //checks if the user is logged in
            throw new Meteor.error("not- authorized")
        }
       Todos.insert({
            text: text,
            createdAt: new Date(),
            userId: Meteor.userId(),
            username: Meteor.user().username
          
        });
       
          
    },
    
    // delete todo
    deleteTodo: function(todoId){
        var todo = Todos.findOne(todoId);
        if(todo.userId !== Meteor.userId() ){
            throw new Meteor.Error("not-authorized");
        }
        Todos.remove(todoId);  
    },
    
    // checking todos
    checkTodo: function(todoId, setChecked){
        var todo = Todos.findOne(todoId);
        if(todo.userId !== Meteor.userId() ){
            throw new Meteor.Error("not-authorized");
        }
        Todos.update(todoId, {$set: { checked: setChecked }
        //   Todos.update(this._id, {$set: { checked: ! this.checked }// dont understand this line
        });
    }
})

