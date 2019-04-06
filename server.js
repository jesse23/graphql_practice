const path = require('path')
const webpack = require('webpack')
const express = require('express')
const config = require('./webpack.config')
const schema = require('./server/schema')

const app = express()
const compiler = webpack(config)

/* server.js */
const bodyParser = require('body-parser')
const { graphqlConnect, graphiqlExpress } = require('graphql-server-express')

app.use('/graphql', bodyParser.json(), graphqlConnect({ schema: schema })) 
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.use(require('webpack-dev-middleware')(compiler, { publicPath: config.output.publicPath }))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.listen(3000, err => console.log(err || 'listening at localhost:3000'))
