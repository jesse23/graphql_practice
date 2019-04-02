import React from 'react'
import { render } from 'react-dom'
import Apollo from 'apollo-boost'
import { ApolloProvider, graphql } from 'react-apollo'
import gql from 'graphql-tag'

const client = new Apollo(); 

///////////////////
// const HelloComponent = ({ data }) => <h1>{data.hello}!</h1>
// const HelloQuery = gql`
//    query ($someName: String!){
//      hello(name: $someName)
//    } 
// `
// const Hello = graphql(HelloQuery)(HelloComponent)  
// render(
//    <ApolloProvider client={client}>
//     <Hello someName="GraphQL"/>
//    </ApolloProvider>, document.querySelector('#app'))
///////////////////

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

render(<ApolloProvider client={client}> 
         <Todos /> 
       </ApolloProvider>, document.querySelector('#app'))
