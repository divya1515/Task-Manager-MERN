import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FetchTaskStart, FetchTask, FetchTaskFailure } from '../redux/task/TaskSlice'
const useFetchTask = (dependencies = []) => {
  const dispatch = useDispatch();

  const fetchTask = useCallback(async () => {
    try {
      dispatch(FetchTaskStart());
      const res = await fetch('/api/v1/task/getAllTask', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      console.log(data);
      dispatch(FetchTask(data));
    } catch (error) {
      dispatch(FetchTaskFailure());
      console.error('Error fetching tasks:', error);
    }
  }, [dispatch, ...dependencies]);

  return fetchTask;
};

export default useFetchTask;
