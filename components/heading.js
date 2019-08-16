import React from "react";
import Markdown from "./markdown";

const Heading = ({ level, children }) => (
  <Markdown>{`${"#".repeat(level)} ${children}`}</Markdown>
);

export default Heading;
