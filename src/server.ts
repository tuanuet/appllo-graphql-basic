import express from 'express';
import { ApolloServer, SchemaDirectiveVisitor } from 'apollo-server-express';
import { typeDefs, resolvers } from './Schema';
import { UpperCaseDirective } from './Directive'
import context from './Context';

const schemaDirectives = {
  upper: UpperCaseDirective,
}

// @ts-ignore: 'resolvers' should accept 'Array<IResolvers>'
const server = new ApolloServer({ typeDefs, resolvers, context, schemaDirectives });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);