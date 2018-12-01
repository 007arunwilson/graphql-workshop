import { GraphQLServer } from "graphql-yoga";

//GraphQl DataTypes: String!,Boolean!,Int!,Float!,ID

//Type Definitions
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int!
        rating: Float
        inStock: Boolean!
    }
`;

//Resolvers
const resolvers = {
  Query: {
    title: () => "Nokia 7.1 Plus (Nokia X7)",
    price: () => 12000,
    releaseYear: () => 2018,
    rating: () => null,
    inStock: () => true
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("GraphQl Server start");
});
