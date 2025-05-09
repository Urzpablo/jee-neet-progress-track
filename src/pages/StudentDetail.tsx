
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Dashboard from './Dashboard';

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { setCurrentStudent } = useApp();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      setCurrentStudent(id);
    } else {
      navigate('/');
    }
  }, [id, setCurrentStudent, navigate]);
  
  return <Dashboard />;
};

export default StudentDetail;
