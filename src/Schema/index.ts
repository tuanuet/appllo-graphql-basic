import {
    typeDefs as Author,
    resolvers as resolversAuthor
} from './Author';
import {
    typeDefs as Post,
    resolvers as resolversPost
} from './Post';
import {
    typeDefs as Query,
    resolvers as resolversQuery
} from './Query';
import {
    typeDefs as Mutation,
    resolvers as resolversMutation
} from './Mutation';

import { merge } from 'lodash'


export const typeDefs = [Query, Mutation, Author, Post];

export const resolvers = merge(resolversAuthor, resolversMutation, resolversPost, resolversQuery);