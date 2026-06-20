import { useState } from 'react';

const sections = new Map<number, { buttonText: string; pText: string }>([
  [
    1,
    {
      buttonText: 'HTML',
      pText:
        'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
    },
  ],
  [
    2,
    {
      buttonText: 'CSS',
      pText:
        'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
    },
  ],
  [
    3,
    {
      buttonText: 'JavaScript',
      pText:
        'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
    },
  ],
]);

export default function Tabs() {
  const [activeSection, setActiveSection] = useState(sections.get(1));

  return (
    <div>
      <div>
        {[...sections].map(([id, section]) => (
          <button
            key={id}
            onClick={() => setActiveSection(section)}
            style={activeSection === section ? { color: 'blue' } : {}}
          >
            {section.buttonText}
          </button>
        ))}
      </div>
      <div>
        <p>{activeSection?.pText}</p>
      </div>
    </div>
  );
}
