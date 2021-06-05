import React, { useEffect } from "react";
import { parse } from "papaparse";
import Axios from "axios";

export default function App() {
  const [highlighted, setHighlighted] = React.useState(false);
  const [contacts, setContacts] = React.useState([
    { email: "Email", name: "Name" },
  ]);

  const fetchData=()=>{Axios.get("https://zostel-assignment-server.herokuapp.com/fetch").then((e) => {
    // console.log(e.data);
    setContacts(e.data);
  });
}

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center text-4xl my-12">Upload the CSV</h1>
      <div
        className={`p-6 my-20 mx-auto max-w-md border-2 text-center ${
          highlighted ? "border-blue-600 bg-blue-100" : "border-gray-600"
        }`}
        onDragEnter={() => {
          setHighlighted(true);
        }}
        onDragLeave={() => {
          setHighlighted(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);
          Array.from(e.dataTransfer.files)
            .filter((file) => file.type === "application/vnd.ms-excel")
            .forEach(async (file) => {
              console.log(file);
              const text = await file.text();
              const result = parse(text, { header: true });
              // Axios.post("http://localhost:5000/upload", result.data).then (e => console.log(e.data));
              result.data.map((i) =>
                Axios.post("https://zostel-assignment-server.herokuapp.com/upload", {name: i.name, email: i[` email`]}).then((e) =>
                  // console.log(e.data)
                  fetchData()
                )
              );
              console.log(result.data);
            });
        }}
      >
        Drag the file and frop here
      </div>
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
          {contacts.map(item => {
            console.log(item);
            return <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          })}

        </table>
      </div>
    </div>
  );
}
