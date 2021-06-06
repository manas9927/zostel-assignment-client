import React from "react";

function Instruction(props) {
  return (
    <div className="flex flex-col jusctify-center mx-auto max-w-md">
      <div className="flex items-center bg-blue-400 border-l-4 border-blue-700 py-2 px-3 shadow-md mb-2">
        <div className="text-blue-500 rounded-full bg-white mr-3">
          <svg
            width="1.8em"
            height="1.8em"
            viewBox="0 0 16 16"
            className="bi bi-info"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
            <circle cx="8" cy="4.5" r="1" />
          </svg>
        </div>
        <div className="text-white max-w-xs text-sm">{props.InfoText}</div>
      </div>
    </div>
  );
}
export default Instruction;
