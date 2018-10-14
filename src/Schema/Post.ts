import { find, filter } from 'lodash';
import { authors, posts } from '../Data';
export const typeDefs =
    `
    extend type Query {
        posts: [Post]
    }

    extend type Mutation {
        upvotePost (
            postId: Int!
        ): Post
    }
    
    type Post {
        id: Int!
        title: String
        author: Author
        author2(firstName: String!): Author
        votes: Int
    }`;

export const resolvers = {
    Query: {
        posts: () => posts
    },

    Mutation: {
        upvotePost: (root: any, { postId }: { postId: number }) => {
            const post = find(posts, { id: postId });
            if (!post) {
                throw new Error(`Couldn't find post with id ${postId}`);
            }
            post.votes += 1;
            return post;
        },
    },

    Post: {
        author: (post: any) => {
            return find(authors, { id: post.authorId })
        },
        author2: (post: any, { firstName }: { firstName: string }) => {
            return find(authors, { id: post.authorId, firstName })
        },
    }
}