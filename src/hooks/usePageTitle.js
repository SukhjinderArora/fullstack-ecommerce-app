import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
};

export default usePageTitle;
