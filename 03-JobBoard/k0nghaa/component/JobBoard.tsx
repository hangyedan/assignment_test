// 생각해 볼 것: 채용 상세 정보는 채용 정보의 ID값을 사용해 가져올 수 있다.

import { useEffect } from 'react';
import Button from './_common/Button';
import JobDetail from './JobDetail';
import { JobStories } from '../api/Job';

export default function JobBoard() {
  useEffect(() => {
    const response = async () => await JobStories();
  }, []);
  const handleLoadMoreButtonClick = async () => {
    console.log('Load more jobs');
  };

  return (
    <div>
      <h1>Hacker News Jobs Board</h1>

      <JobDetail />
      <Button label="Load more jobs" onClick={handleLoadMoreButtonClick} />
    </div>
  );
}
