import React, { useEffect } from "react";
import { parse } from "papaparse";
import Axios from "axios";
import Heading from "./Components/heading";
import TableHead from "./Components/tablehead";
import Instruction from "./Components/instruction";

// const serverConnection = "http://localhost:5000";
const serverConnection = "https://zostel-assignment-server.herokuapp.com";

export default function App() {

  const [highlighted, setHighlighted] = React.useState(false);
  const [contacts, setContacts] = React.useState([
    { email: "Email", name: "Name" },
  ]);

  const fetchData = () => {
    Axios.get(serverConnection + "/fetch").then((e) => {
      console.log(e.data);
      setContacts(e.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Heading Text="Upload Contact" />
      <div
        className={`p-6 my-20 mx-auto max-w-sm border-2 text-center animate-pulse border-green-600 bg-green-100 ${
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
              result.data.map((pushItem) => {
                if (
                  pushItem.name !== "" &&
                  pushItem.name !== " " &&
                  pushItem.email !== "" &&
                  pushItem.email !== " "
                ) {
                  Axios.post(serverConnection + "/upload", {
                    name: pushItem.name,
                    email: pushItem.email,
                  }).then((e) => {
                    console.log(e.data);
                  });
                }
                return fetchData();
              });
              console.log(result.data);
            });
        }}
      >
        Drag and drop CSV file here to upload the contact
      </div>
      <Instruction InfoText="CSV file should have two fields: name and email" />
      <Heading Text="All Contacts" />
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <TableHead FieldOne="Name" FieldTwo="Email" />
            <tbody className="bg-white">
              {contacts.map((item) => {
                console.log(item);
                return (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {item.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      {item.email}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
