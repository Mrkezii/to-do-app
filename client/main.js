// line 32 in server file
// what is auto publish
import {
    Template
}
from 'meteor/templating';
import {
    ReactiveVar
}
from 'meteor/reactive-var';

import './main.html';

Todos = new Mongo.Collection('todos');
Meteor.subscribe("todos");



Template.main.helpers({
    todos: function () {
        return Todos.find({}, {
            sort: { createdAt: -1 }}); // returns latest todo first
    }
});


Template.main.events({
    // submit
    "submit .new-todo": function (event) {
        var text = event.target.text.value;
        
        Meteor.call("addTodo", text); 
        
        event.target.text.value = '';  // clear form when you submit
        return false;  // prevent submission i.e reloading of the whole page

    },
    
    // checkbox 
    "click .toggle-checked": function () {
        Meteor.call("checkTodo", this._id, !this.checked); 
    },
    
    // the delete button to remove a task
    "click .delete-todo": function () {
        if (confirm("Are you sure")) {
            Meteor.call("deleteTodo", this._id); 
        }
    }

});
// changes login field from email to username
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
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
         Todos.insert({
           msg: "hello its me"
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
        });
    }
})
