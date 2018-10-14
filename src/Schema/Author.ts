import { find, filter } from 'lodash';
import { posts, authors } from '../Data';

export const typeDefs =
    `
    directive @upper on FIELD_DEFINITION

    extend type Query {
        author(id: Int!): Author
        authors: [Author]
    } 
    
    type Author {
        id: Int!
        firstName: String @upper
        lastName: String
        """
        the list of Posts by this author
        """
        posts: [Post]
    }`;

export const resolvers = {
    Query: {
        author: (_: any, { id }: { id: number }) => find(authors, { id }),
        authors: () => authors
    },
    Author: {
        posts: (author: any) => {
            return filter(posts, { authorId: author.id })
        },
    }
}