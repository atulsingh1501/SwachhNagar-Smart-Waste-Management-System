import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as api from '../lib/api';

export function useApiQuery(endpoint: string, options?: any) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        setLoading(true);
        let result;
        if (endpoint === 'vehicles') result = await api.fetchVehicles(token);
        else if (endpoint === 'routes') result = await api.fetchRoutes(token);
        else if (endpoint === 'collections') result = await api.fetchCollections(token);
        else if (endpoint === 'citizen_reports') result = await api.fetchReports(token);
        else if (endpoint === 'profiles') result = await api.fetchUsers(token);
        else result = [];
        setData(result);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, token]);

  return { data, loading, error };
}

export function useApiMutation(endpoint: string) {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const update = async (id: string, data: any) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Update failed');
      return await response.json();
    } finally {
      setLoading(false);
    }
  };

  return { update, loading };
}
