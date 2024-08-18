// src/hooks/useNavigateWrapper.js
import { useNavigate } from 'react-router-dom';

const useNavigateWrapper = () => {
  const navigate = useNavigate();
  return navigate;
};

export default useNavigateWrapper;
