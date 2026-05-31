const JobCard = ({ job }) => {
  const { title, by, time, url } = job;
  const date = new Date(time * 1000).toLocaleDateString();

  const hasURL = url ? true : false;

  return (
    <div style={{ border: "1px solid" }}>
      {hasURL ? (
        <a href={url} target="_blank">
          {title}
        </a>
      ) : (
        <p>{title}</p>
      )}
      <div style={{ display: "flex", gap: "6px" }}>
        <span>{by}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default JobCard;
