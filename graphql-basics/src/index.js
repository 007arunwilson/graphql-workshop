import { GraphQLServer } from "graphql-yoga";

//GraphQl DataTypes: String!,Boolean!,Int!,Float!,ID

//Type Definitions
const typeDefs = `
    type Query {
        me: User!
        post:Post!
        greeting(name: String,prefix: String):String!
        add(a:Float!,b:Float!):Float!
        addMultiple(numbers:[Float!]!):Float!
        getUsers:[User!]!
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
        published:Boolean!
    }
`;

//Resolvers
const resolvers = {
  Query: {
    getUsers: () => {
      return [];
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
    post: () => ({
      id: "122",
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body:
        "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    })
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("GraphQl Server start");
});
