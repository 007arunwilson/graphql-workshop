import { GraphQLServer } from "graphql-yoga";
import posts from "./data";

//GraphQl DataTypes: String!,Boolean!,Int!,Float!,ID4

//Posts with id title body published

const usersData = [
  {
    id: 1,
    name: "Arun Wilson",
    email: "007arunwilson@gmail.com",
    age: 27
  },
  {
    id: 2,
    name: "Paulson Paul",
    email: "paulsonuv@gmail.com",
    age: 22
  },
  {
    id: 3,
    name: "Madison Madi",
    email: "madisonuv@gmail.com",
    age: 28
  },
  {
    id: 4,
    name: "Ravi John",
    email: "ravijohn@gmail.com",
    age: 28
  }
];

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
    }
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
    }
    type Post {
        id:ID!
        title:String!
        body:String!
        userId:Int!
    }
`;

//Resolvers
const resolvers = {
  Query: {
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
      let returnData = usersData;

      if (args.query) {
        returnData = usersData.filter(filterItem =>
          filterItem.name.toLowerCase().includes(args.query)
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
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("GraphQl Server start");
});
