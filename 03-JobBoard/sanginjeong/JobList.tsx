import JobCard from "./JobCard";

const JobList = ({ data }) => {
  return (
    <ul>
      {data?.map((job) => (
        <JobCard job={job} />
      ))}
    </ul>
  );
};

export default JobList;
