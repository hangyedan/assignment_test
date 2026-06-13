import Tabs from "./Tabs";

const Component = () => {
  return (
    <>
      <Tabs defaultValue="HTML">
        <Tabs.Menu value="HTML">HTML</Tabs.Menu>
        <Tabs.Menu value="CSS">CSS</Tabs.Menu>
        <Tabs.Menu value="JavaScript">JavaScript</Tabs.Menu>
        <Tabs.Content value="HTML">
          The HyperText Markup Language or HTML is the standard markup language
          for documents designed to be displayed in a web browser.
        </Tabs.Content>
        <Tabs.Content value="CSS">
          Cascading Style Sheets is a style sheet language used for describing
          the presentation of a document written in a markup language such as
          HTML or XML
        </Tabs.Content>
        <Tabs.Content value="JavaScript">
          JavaScript, often abbreviated as JS, is a programming language that is
          one of the core technologies of the World Wide Web, alongside HTML and
          CSS.
        </Tabs.Content>
      </Tabs>
    </>
  );
};

export default Component;
