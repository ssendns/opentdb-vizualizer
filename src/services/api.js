export async function fetchQuestions(amount = 50) {
  const response = await fetch(`https://opentdb.com/api.php?amount=${amount}`);
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  const data = await response.json();
  return data.results;
}
