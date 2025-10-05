import { useEffect, useState } from "react";
import { fetchQuestions } from "../services/api";

export function useApi() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (err) {
        console.error("error loading questions:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return { questions, loading };
}
