// 생각해 볼 것: 채용 상세 정보는 채용 정보의 ID값을 사용해 가져올 수 있다.
import { useEffect, useState } from 'react';
import Button from './_common/Button';
import JobDetail from './JobDetail';
import { JobStories } from '../api/Job';
import './style.css';

export default function JobBoard() {
  const [jobIds, setJobIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchJobStories = async () => {
      // const data: number[] = await JobStories();
      setJobIds([35908337, 35904973, 35901234]);
    };
    fetchJobStories();
  }, []);

  const handleLoadMoreButtonClick = async () => {
    console.log('Load more jobs');
  };

  return (
    <div>
      <h1 className="title">Hacker News Jobs Board</h1>
      {jobIds.map((id) => (
        <JobDetail key={id} id={id} />
      ))}
      <Button label="Load more jobs" onClick={handleLoadMoreButtonClick} />
    </div>
  );
}
