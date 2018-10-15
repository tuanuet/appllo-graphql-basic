import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

export default class UpperCaseDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: any) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (source: any, input: any, context: any, info: any) {
            // todo: check role permission here
            // input must have groupId to set


            const result = await resolve.call(this, source, input, context, info);
            if (typeof result === 'string') {
                return result.toUpperCase();
            }
            return result;
        };
    }
}