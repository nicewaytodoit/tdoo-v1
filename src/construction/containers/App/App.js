import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import Header from '../../components/Header';
import NewTodo from '../../components/NewTodo';
import TodoList from '../../components/TodoList/TodoList';
import Footer from '../../components/Footer/Footer';
import * as filters from '../../shared/filters';
import * as tdooStorage from '../../shared/localStorage';

// const item = { id: 6, title: "test", completed: false, date: new Date() }

class App extends Component {
  state = {
    // todos: [item, { ...item, id: 7, title: 'Buy Apples!', date: new Date() }],
    todos: [],
    newTodo: '',
    editedTodo: null,
    visibility: 'all',
    uid: 0,
    beforeEditCache: ''
  }

  filteredTodos = () => filters[this.state.visibility](this.state.todos);
  remaining = () => filters.active(this.state.todos).length;
  allDone = {
    get: () => (this.remaining() === 0),
    set: (value) => {
      const newArray = this.state.todos.map((todo) => {
        return {
          ...todo,
          completed: value
        }
      });
      this.saveTodos(newArray);
    }
  };

  componentWillMount() {
    this.onHashChange();
    const initData = tdooStorage.fetch();
    this.setState({ todos: initData.todos, uid: initData.uid }, () => { });
  }

  onHashChange = () => {
    let visibleWhat = window.location.hash.replace(/#\/?/, '');
    if (filters[visibleWhat]) {
      this.setState({ visibility: visibleWhat })
    } else {
      window.location.hash = ''
      this.setState({ visibility: 'all' })
    }
  }

  componentDidMount() {
    window.addEventListener("hashchange", (e) => this.onHashChange());
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange");
  }

  saveTodos = (todosModified) => {
    this.setState({ todos: todosModified }, () => {
      tdooStorage.save(this.state.todos);
    });
  }


  addTodo = () => {
    let value = this.state.newTodo && this.state.newTodo.trim();
    if (!value) {
      return;
    }
    let todosList = [...this.state.todos];
    let todo = {
      id: this.state.uid + 1,
      title: value,
      completed: false,
      date: new Date()
    }
    todosList.push(todo);
    this.setState({ newTodo: '', uid: todo.id }, () => {
      this.saveTodos(todosList);
    });
  }

  removeTodo = (id) => {
    const newTodos = [...this.state.todos];
    const todoIndex = newTodos.map((t) => t.id).indexOf(id);
    newTodos.splice(todoIndex, 1);
    this.saveTodos(newTodos);
  }

  editTodo = (todo) => {
    this.setState({
      beforeEditCache: todo.title,
      editedTodo: todo
    })

  }

  doneEdit = (todoId, title) => {
    console.log('Edit vs cancel faster');
    if (!this.state.editedTodo) {
      return;
    }
    const titleTrimmed = title.trim();
    if (!titleTrimmed) {
      this.removeTodo(todoId)
    } else {
      const index = this.state.todos.findIndex((todo) => todo.id === todoId);
      if (index < 0) return;
      const newTodo = { ...this.state.todos[index], title: titleTrimmed };
      const newList = [...this.state.todos];
      newList[index] = newTodo;
      this.setState({ editedTodo: null }, () => {
        this.saveTodos(newList);
      });
    }
  }

  cancelEdit = (id) => {
    console.log(id);
    this.setState({ editedTodo: null });
  }

  removeCompleted = () => {
    const newTodos = [...filters.active(this.state.todos)];
    this.saveTodos(newTodos);
  }


  onNewInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  }

  onNewEnterPressed = (e) => {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  }

  todoCompleted = (value, id) => {
    const newTodos = [...this.state.todos];
    const todoIndex = newTodos.map((t) => t.id).indexOf(id);
    const updatedTodo = { ...newTodos[todoIndex], completed: value };
    newTodos[todoIndex] = updatedTodo;
    this.saveTodos(newTodos);
  }

  render() {
    return (
      <section className="TodoApp">
        <Header />
        <NewTodo value={this.state.newTodo} change={this.onNewInputChange} enterPressed={this.onNewEnterPressed} />
        <TodoList
          allDone={this.allDone}
          filteredTodos={this.filteredTodos}
          removeTodo={this.removeTodo}
          todos={this.state.todos}
          editedTodo={this.state.editedTodo}
          editTodo={this.editTodo}
          doneEdit={this.doneEdit}
          cancelEdit={this.cancelEdit}
          todoCompleted={this.todoCompleted}
        />
        <Footer
          visibility={this.state.visibility}
          remaining={this.remaining()}
          todosLength={this.state.todos.length}
          removeCompleted={this.removeCompleted}
        />
      </section>
    );
  }
}

export default App;
