import { useState } from "react";
import "./styles.css";

const tabs = [
  {
    label: "HTML",
    content:
      "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
  },
  {
    label: "CSS",
    content:
      "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
  },
  {
    label: "JavaScript",
    content:
      "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
  },
] as const;

export default function Tab() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeTab = tabs[activeTabIndex];

  return (
    <div>
      <div>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTabIndex(index)}
            className={activeTabIndex === index ? "active" : ""}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <p>{activeTab.content}</p>
    </div>
  );
}
