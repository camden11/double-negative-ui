import React from "react";
import ReactMarkdown from "react-markdown";

const Heading = ({ level, children }) => (
  <ReactMarkdown>{`${"#".repeat(level)} ${children}`}</ReactMarkdown>
);

export default Heading;
