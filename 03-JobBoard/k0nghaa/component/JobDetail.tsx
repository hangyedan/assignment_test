import { JobDetail } from '../api/Job';

export default function JobDetailComponent(id) {
  const data = JobDetail(id);
  console.log(data);

  // const mockup = [
  //   {
  //     by: 'jamilbk',
  //     id: 35908337,
  //     score: 1,
  //     time: 1683838872,
  //     title: 'Firezone (YC W22) is hiring Elixir and Rust engineers',
  //     type: 'job',
  //     url: 'https://www.ycombinator.com/companies/firezone/jobs',
  //   },
  //   {
  //     by: 'ryanb',
  //     id: 35904973,
  //     score: 1,
  //     time: 1683824470,
  //     title: 'RankScience (YC W17) is hiring SDRs with a knack for SEO',
  //     type: 'job',
  //     url: 'https://remotejobs.org/remote-jobs/sales-development-representative-1121',
  //   },
  // ];

  return (
    <>
      {data.map((job) => (
        <section key={job.id}>
          <h2>
            <a href={job.url}>{job.title}</a>
          </h2>
          <p>
            By {job.by} • {job.time}
          </p>
        </section>
      ))}
    </>
  );
}
