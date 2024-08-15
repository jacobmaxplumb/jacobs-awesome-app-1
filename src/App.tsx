import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css'
import People from "./components/People";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  const getCars = async () => {
    const { data: cars } = await client.models.Cars.list();
    console.log(cars);
  };

  return (
    <Authenticator>
      {({signOut}) => (
        <main>
          <button onClick={signOut}>Sign Out</button>
          <People />
        </main>
      )}
    </Authenticator>
  );
}

export default App;
