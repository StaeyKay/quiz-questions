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
  return response;
}

// Utility function to get all questions
export async function getQuestions({ limit, page, filter, fields }) {
  // const {limit, filter, page, fields} = params
  // const filter = params.filter
  // const page = params.page
  // const fields = params.fields

  const questionResponse = await fetch(
    `${BASE_URL}/questions?${new URLSearchParams({
      limit,
      page,
      filter: JSON.stringify(filter ?? {}),
      fields: JSON.stringify(fields ?? {}),
    })}`,
    {
      method: "GET",
    }
  );

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

// Utility function to delete questions
export async function deleteQuestion(questionId) {
  const deleteQuestionResponse = await fetch(
    `${BASE_URL}/questions/${questionId}`,
    {
      method: "DELETE",
    }
  );
  const response = deleteQuestionResponse.json();
  return response;
}
