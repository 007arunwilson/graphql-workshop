import { GraphQLServer } from "graphql-yoga";

//Type Definitions
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

//Resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, welcome to graphQl",
    name: () => "Arun Wilson",
    location: () => "TVM, Kerala - India",
    bio: () =>
      "Programmer with proficiency in Javascript & PHP, Currently Focused in React and React Native with Devops and AWS"
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("GraphQl Server start");
});
