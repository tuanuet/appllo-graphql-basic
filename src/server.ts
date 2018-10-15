import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './Schema';
import context from './Context';
import schemaDirectives from './Directive';


// @ts-ignore: 'resolvers' should accept 'Array<IResolvers>'
const server = new ApolloServer({ typeDefs, resolvers, context, schemaDirectives, tracing: true});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);