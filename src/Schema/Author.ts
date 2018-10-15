import { find, filter } from 'lodash';
import { posts, authors } from '../Data';

export interface AuthorInput {
    id: number
    firstName: string
    lastName: string
}

export const typeDefs =
    `
    directive @upper on FIELD_DEFINITION

    extend type Query {
        author(id: Int!): Author
        authors: [Author]
    } 

    extend type Mutation {
        createAuthor (author: AuthorInput!): Author
    }

    input AuthorInput {
        id: Int!
        firstName: String
        lastName: String
    }

    type Author {
        id: Int!
        firstName: String @upper
        lastName: String
        fbId: Int
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
    Mutation: {
        createAuthor: (_: any, { author }: { author: AuthorInput }) => ({ ...author, ...{ fbId: 1 } })
    },
    Author: {
        posts: (author: any) => {
            return filter(posts, { authorId: author.id })
        },
    }
}