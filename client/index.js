import React from 'react'
import Apollo from 'apollo-boost'
import { render } from 'react-dom'
import { ApolloProvider, graphql } from 'react-apollo'
import gql from 'graphql-tag'

const client = new Apollo(); 

const Todo = ({ todo: { id, text } }) => <li>{id}: {text}</li>  

Todo.fragments = { 
  todo: gql` 
    fragment Todo on Todo { 
      id 
      text 
    } 
  ` 
}

const TodosComponent = ({ data }) => <ul> 
  { data.todos && data.todos.map((todo, i) => <Todo todo={todo} />) } 
  <AddTodo data={data} /> 
</ul>  

const TodosQuery = gql` 
  query { 
    todos { 
      ...Todo 
   } 
  } 
  ${Todo.fragments.todo} 
`
const Todos = graphql(TodosQuery)(TodosComponent)


// Add component for mutation test
const AddTodoComponent = ({ mutate }) => { 
  let input 
  const handleSubmit = e => { 
    e.preventDefault() 
    mutate({variables: {text: input.value}}) 
      .then(_ => data.refetch()) 
  } 
  return <form onSubmit={ handleSubmit }> 
   Enter todo here: <input type="text" ref={ el => input = el }/> 
  </form>
} 

const AddTodoMutation = gql` 
  mutation addTodo($text: String!){ 
    addTodo(text: $text) { 
      text 
      id 
    } 
  } 
` 
const AddTodo = graphql(AddTodoMutation)(AddTodoComponent)

render(<ApolloProvider client={client}> 
         <div> 
           <Todos /> 
         </div> 
      </ApolloProvider>, document.querySelector('#app'))
