import React, { useState, useEffect } from "react";
import { updateQuestion } from "../../utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateQuestion = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [rawOptions, setRawOptions] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const questionData = location.state;

  // Prefill form fields with data from location.state
  useEffect(() => {
    if (questionData) {
      setQuestion(questionData.question || "");
      setOptions(questionData.options || []);
      setRawOptions(
        questionData.options ? questionData.options.join(", ") : ""
      );
      setAnswer(questionData.answer || "");
      setCategory(questionData.category || "");
    }
  }, [questionData]);

  const handleOptionsChange = (e) => {
    const input = e.target.value;
    setRawOptions(input); // Update raw input value
    const optionsArray = input
      .split(",") // Split by commas
      .map((opt) => opt.trim()) // Remove leading/trailing spaces
      .filter((opt) => opt !== ""); // Remove empty strings
    setOptions(optionsArray);

    // Reset the answer if it's no longer valid
    if (!optionsArray.includes(answer)) {
      setAnswer("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedQuestionData = {
        question: question,
        options: options,
        answer: answer,
        category: category,
      };

      await updateQuestion(questionData.id, updatedQuestionData);
      toast.success("Question updated successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update question");
    }
  };

  return (
    <div className="h-screen overflow-hidden w-full ml-64">
      <h1 className="bg-[#E62E2D] text-center p-5 text-[40px] text-white h-auto font-semibold w-[100%]">
        Update Question
      </h1>
      <div className="bg-[#f7fafc6c] px-44 h-screen">
        <div className="bg-white shadow-2xl h-screen">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center p-10"
          >
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              id="question"
              placeholder="Enter the question here"
              className="border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:outline-none w-2/3"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              required
            />

            <label htmlFor="options">
              Enter the options separated by commas:
            </label>
            <input
              type="text"
              id="options"
              placeholder="options"
              className="border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:outline-none w-2/3"
              onChange={handleOptionsChange}
              value={rawOptions}
              required
            />

            <label htmlFor="answer">Correct answer:</label>
            <select
              id="answer"
              className="border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:outline-none w-2/3"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              required
            >
              <option value="" disabled>
                Select the correct answer
              </option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              placeholder="Enter the category here"
              className="border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:outline-none w-2/3"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            />

            <div className="p-6">
              <button className="bg-[#E62E2D] p-3 text-white rounded-md">
                Update question
              </button>
            </div>
          </form>
          <div className="p-6 flex justify-end">
            <button
              className="bg-[#E62E2D] p-3 text-white rounded-md"
              onClick={() => navigate("/")}
            >
              View questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuestion;
