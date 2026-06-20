import { useState } from 'react';

const SECTIONS = [
  {
    id: 1,
    buttonText: 'HTML',
    pText:
      'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
  },
  {
    id: 2,
    buttonText: 'CSS',
    pText:
      'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
  },
  {
    id: 3,
    buttonText: 'JavaScript',
    pText:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
  },
];

export default function Tabs() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const activeContent = SECTIONS.find(
    (section) => section.id === activeSection,
  );

  return (
    <div>
      <div>
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            style={activeSection === section.id ? { color: 'blue' } : {}}
          >
            {section.buttonText}
          </button>
        ))}
      </div>
      <div>
        <p>{activeContent?.pText}</p>
      </div>
    </div>
  );
}
