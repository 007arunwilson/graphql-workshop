import { GraphQLServer } from "graphql-yoga";
import { posts, comments, users } from "./data";

//GraphQl DataTypes: String!,Boolean!,Int!,Float!,ID4

//Posts with id title body published

//Type Definitions
const typeDefs = `
    type Query {
        me: User!
        post(id:Int!):Post
        greeting(name: String,prefix: String):String!
        add(a:Float!,b:Float!):Float!
        addMultiple(numbers:[Float!]!):Float!
        getUsers(query:String):[User!]!
        getPosts(query:String):[Post!]!
        comments:[Comment!]!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        comments:[Comment!]!
    }
    type Post {
        id:ID!
        title:String!
        body:String!
        author:User!
        comments:[Comment!]!
    }
    type Comment {
      id:ID!
      text:String!
      author:User!
      post:Post!
    }
`;

//Resolvers
const resolvers = {
  Query: {
    comments: (parent, args, ctx, info) => {
      return comments;
    },
    getPosts: (parent, args, ctx, info) => {
      let returnData = posts;
      if (args.query) {
        returnData = posts.filter(
          postItem =>
            postItem.title.toLowerCase().includes(args.query) ||
            postItem.body.toLowerCase().includes(args.query)
        );
      }
      return returnData;
    },
    getUsers: (parent, args, ctx, info) => {
      let returnData = users;

      if (args.query) {
        returnData = users.filter(filterItem =>
          filterItem.name.toLowerCase().includes(args.query.toLowerCase())
        );
      }

      return returnData;
    },
    add: (parent, args, ctx, info) => (args.a + args.b).toFixed(4),
    greeting: (parent, args, ctx, info) => {
      if (args.name) {
        return `Hello ${args.prefix ? `${args.prefix} ` : ""}${args.name}`;
      }
      return "Hello";
    },
    me: () => ({
      id: "12212",
      name: "Arun Wilson",
      age: "26",
      email: "007arunwilson@gmail.com"
    }),
    addMultiple: (parent, args, ctx, info) => {
      let returnValue = 0;

      if (args.numbers.length !== 0) {
        returnValue = args.numbers.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
      }

      return returnValue;
    },
    post: (parent, args, ctx, info) =>
      posts.filter(postItem => postItem.id === args.id)[0]
  },
  Comment: {
    author: (parent, args, ctx, info) =>
      users.find(userItem => userItem.id === parent.author),
    post: (parent, args, ctx, info) =>
      posts.find(postItem => postItem.id === parent.post)
  },
  User: {
    comments: (parent, args, ctx, info) => {
      return comments.filter(commentItem => commentItem.author === parent.id);
    }
  },
  Post: {
    comments: (parent, args, ctx, info) =>
      comments.filter(commentItem => commentItem.post === parent.id),
    author: (parent, args, ctx, info) =>
      users.find(userItem => userItem.id === parent.author)
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("GraphQl Server start");
});
