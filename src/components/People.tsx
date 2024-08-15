import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import "@aws-amplify/ui-react/styles.css";

const client = generateClient<Schema>();

function People() {
  const [people, setPeople] = useState<Array<Schema["People"]["type"]>>([]);
  const [formValues, setFormValues] = useState({ fullName: "", age: "" });

  useEffect(() => {
    client.models.People.observeQuery().subscribe({
      next: (data) => setPeople([...data.items]),
    });
  }, []);

  function createPerson() {
    client.models.Todo.create(formValues);
  }

  return (
    <div>
      <input
        value={formValues.fullName}
        onChange={(e) =>
          setFormValues({ ...formValues, fullName: e.target.value })
        }
      />
      <input
        value={formValues.age}
        onChange={(e) => setFormValues({ ...formValues, age: e.target.value })}
      />
      <button onClick={createPerson}>Add</button>
      {people.map(person => <div key={person.id}>{person.fullName} - {person.age}</div>)}
    </div>
  );
}

export default People;
