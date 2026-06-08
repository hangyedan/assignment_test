// 버튼과 하단 설명 매핑 - 객체로 관리
// 상태 - 현재 클릭된 탭

import { useEffect, useState } from "react";

export default function Tabs() {
  const tabData = [
    {
      id: "html",
      btn: "HTML",
      content:
        "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
    },

    {
      id: "css",
      btn: "CSS",
      content:
        "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
    },
    {
      id: "javascript",
      btn: "Javascript",
      content:
        "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
    },
  ];

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("selectedTab") || "html";
  });

  useEffect(() => {
    localStorage.setItem("selectedTab", activeTab);
  }, [activeTab]);

  const clickTab = (id: string) => {
    setActiveTab(id);
  };

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
              {tab.btn}
            </button>
          );
        })}
      </div>
      <div>
        {tabData.map((tab) =>
          tab.id === activeTab ? (
            <p key={tab.id}>{tab.content}</p>
          ) : (
            <p key={tab.id} style={{ display: "none" }}></p>
          ),
        )}
      </div>
    </div>
  );
}
