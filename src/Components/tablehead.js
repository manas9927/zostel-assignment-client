import React from "react";

function TableHead(props) {
  return (
    <thead>
      <tr>
        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
          {props.FieldOne}
        </th>
        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
          {props.FieldTwo}
        </th>
      </tr>
    </thead>
  );
}
export default TableHead;
