import { useEffect, useState } from "react"

const API_URL = "http://127.0.0.1:8000/"; // reemplaza por la api url
// const API_URL = "https://gcfsrzf1-8000.brs.devtunnels.ms/api/"; // reemplaza por la api url

interface UseFetchDataProps {
  endpoint: string;
  methods?: "GET" | "POST" | "PUT" | "DELETE";
  filtros?: string | null;
  body?: any;
  autoFetch?: boolean;
}

export function useFetchData<T = any>({
  endpoint,
  methods = "GET",
  filtros,
  body,
  autoFetch = true
}: UseFetchDataProps) {
  // Manejo de cambios en variables
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  // Se conecta al endpoint
  const fetchdata = async () => {
    try {
      const url = filtros ? `${API_URL}${endpoint}/${filtros}` : `${API_URL}${endpoint}`;
      // Configura la solicitud
      const config: RequestInit = {
        method: methods,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // valida si hay body
      if (body) {
        config.body = JSON.stringify(body);
      }
      // Realiza la solicitud
      const response = await fetch(url, config);

      // if (!response.ok) console.warn(`Error HTTP: ${response.status}`);
      // if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();

      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  // Llama api
  useEffect(() => {
    if (autoFetch) {
      fetchdata();
    }
  }, [endpoint, methods, JSON.stringify(body), filtros]);
  // Retorna los valores
  return {
    data,
    isLoading,
    fetchdata
  };
};