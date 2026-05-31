import { useEffect, useState } from 'react';
import { JobDetail } from '../api/Job';

export default function JobDetailComponent({ id }) {
  const [jobItem, setJobItem] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      const data = await JobDetail(id);
      setJobItem(data);
    };
    fetchJobDetail();
  }, [id]);

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

  if (!jobItem) {
    return <div>Loading...</div>;
  }

  return (
    <section key={id}>
      <h2>
        <a href={jobItem.url}>{jobItem.title}</a>
      </h2>
      <p>
        By {jobItem.by} • {jobItem.time}
      </p>
    </section>
  );
}
