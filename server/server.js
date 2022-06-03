import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let todos = [
  {
    id: 0,
    title: "Test 1",
    desc: "My first todo",
    checked: false,
    cat_id: 0,
  },
  {
    id: 1,
    title: "Test 2",
    desc: "My second todo",
    checked: false,
    cat_id: 1,
  },
  {
    id: 2,
    title: "Test 3",
    desc: "My third todo",
    checked: true,
    cat_id: 3,
  },
  {
    id: 3,
    title: "Test 4",
    desc: "My fourth todo",
    checked: false,
    cat_id: 2,
  },
];

let categories = [
  { id: 0, name: "Work", color: "#E7AD99" },
  { id: 1, name: "Home", color: "#CE796B" },
  { id: 2, name: "Projects", color: "#C18C5D" },
  { id: 3, name: "Perso", color: "#495867" },
];

const dev_mode = false;

let schema = buildSchema(`
      type Todo {
          id: Int!
          title: String!
          desc: String
          checked: Boolean!
          cat_id: Int!
      }
      type Category {
          id: Int!
          name: String!
          color: String!
      }
      type Query {
          todos: [Todo]
          todo(id: Int!): Todo
          todosByCat(cat_id: Int!): [Todo]
          categories: [Category]
          category(id: Int!): Category
      }
  
      type Mutation {
          addCategory(name: String!, color: String!): [Category]
          removeCategory(id: Int!): [Category]
          addTodo(title: String!, cat_id: Int!, desc: String, checked: Boolean): [Todo]
          removeTodo(id: Int!): [Todo]
          checkTodo(id: Int!): Todo
      }
  `);

let root = {
  todos: () => {
    todos.sort((a, b) => {
      if (a.checked) return 1;
      else if (b.checked) return -1;
      return 0;
    });
    return todos;
  },
  todo: ({ id }) => {
    const t = todos.find((val) => val.id == id);
    return t;
  },
  todosByCat: ({ cat_id }) => {
    const t = todos.filter((val) => val.cat_id == cat_id);
    t.sort((a, b) => {
      if (a.checked) return 1;
      else if (b.checked) return -1;
      return 0;
    });
    return t;
  },
  categories: () => {
    return categories;
  },
  category: ({ id }) => {
    const c = categories.find((cat) => cat.id == id);
    return c;
  },
  addCategory: ({ name, color }) => {
    const c = categories.push({ id: categories.length, name, color });
    return categories;
  },
  removeCategory: ({ id }) => {
    categories = categories.filter((v) => v.id != id);
    return categories;
  },
  addTodo: ({ title, cat_id, desc, checked }) => {
    let newDesc = desc ?? "";
    let newChecked = checked ?? false;
    const c = todos.push({
      id: todos.length,
      title,
      cat_id,
      desc: newDesc,
      checked: newChecked,
    });
    const t = todos.filter((val) => val.cat_id == cat_id);
    t.sort((a, b) => {
      if (a.checked) return 1;
      else if (b.checked) return -1;
      return 0;
    });
    return t;
  },
  removeTodo: ({ id }) => {
    todos = todos.filter((t) => t.id != id);
    todos.sort((a, b) => {
      if (a.checked) return 1;
      else if (b.checked) return -1;
      return 0;
    });
    return todos;
  },
  checkTodo: ({ id }) => {
    const c = todos.find((t) => t.id == id);
    todos.find((t) => t.id == id).checked = !c.checked;
    return c;
  },
};

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: dev_mode,
  })
);

export default app;
