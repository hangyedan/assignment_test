import { useEffect, useState } from "react";

const STORAGE_KEY = "selectedTab";
const DEFAULT_TAB_ID = "html";

const tabData = [
  {
    id: "html",
    btnLabel: "HTML",
    content:
      "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
  },
  {
    id: "css",
    btnLabel: "CSS",
    content:
      "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
  },
  {
    id: "javascript",
    btnLabel: "Javascript",
    content:
      "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
  },
] as const;

type TabId = (typeof tabData)[number]["id"];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const savedTab = sessionStorage.getItem(STORAGE_KEY);

    const isValidTab = tabData.some((tab) => tab.id === savedTab);

    return isValidTab ? (savedTab as TabId) : DEFAULT_TAB_ID;
  });

  useEffect(() => {
    sessionStorage.setItem("selectedTab", activeTab);
  }, [activeTab]);

  const clickTab = (id: TabId) => {
    setActiveTab(id);
  };

  const activeTabData = tabData.find((tab) => tab.id === activeTab);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        {tabData.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => clickTab(tab.id)}
              style={{
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                fontWeight: "600",
                backgroundColor: isActive ? "#0074ff" : "#f0f0f0",
                color: isActive ? "#fff" : "#000",
              }}
            >
              {tab.btnLabel}
            </button>
          );
        })}
      </div>
      <div>{activeTabData && <p>{activeTabData.content}</p>}</div>
    </div>
  );
}
