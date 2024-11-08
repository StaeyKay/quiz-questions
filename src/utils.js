const BASE_URL = "http://localhost:5050/api/v1";

// Add questions endpoint integration
export async function saveQuestion(question) {
  const questionResponse = await fetch(`${BASE_URL}/questions`, {
    method: "POST",
    body: JSON.stringify(question),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = questionResponse.json();
  console.log("response:", response);
  return response;
}

// Utility function to get all questions
export async function getQuestions() {
  const questionResponse = await fetch(`${BASE_URL}/questions`, {
    method: "GET",
  });

  const response = await questionResponse.json();
  return response;
}

// Utility function to filter questions
export async function filterQuestions(filter) {
  const questionResponse = await fetch(
    `${BASE_URL}/questions?filter=${JSON.stringify({ category: filter })}`,
    {
      method: "GET",
    }
  );

  const response = await questionResponse.json();
  return response;
}

// Utility function to update questions
export async function updateQuestion(questionId, updatedData) {
  const questionResponse = await fetch(`${BASE_URL}/questions/${questionId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  const response = await questionResponse.json();
  return response;
}
