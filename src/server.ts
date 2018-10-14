import express from 'express';
import { ApolloServer, SchemaDirectiveVisitor } from 'apollo-server-express';
import { typeDefs, resolvers } from './Schema';
import { defaultFieldResolver } from 'graphql';

const context = ({ req, res }: { req: any, res: any }) => {
  const user = { name: 'Vu Minh Tuan', _id: 1 };
  return { user };
}

// Create (or import) a custom schema directive
class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (source: any, input: any, context: any, info: any) {
      // todo: check role permission here
      // input must have groupId to set
      console.log(context);
      
      const result = await resolve.call(this, source, input, context, info);
      if (typeof result === 'string') {
        return result.toUpperCase();
      }
      return result;
    };
  }
}

const schemaDirectives = {
  upper: UpperCaseDirective,
}

// @ts-ignore: 'resolvers' should accept 'Array<IResolvers>'
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  schemaDirectives
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);