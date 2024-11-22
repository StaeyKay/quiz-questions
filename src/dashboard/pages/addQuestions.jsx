import React, { useState } from "react";
import { saveQuestion } from "../../utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddQuestions = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [rawOptions, setRawOptions] = useState(""); // New state for raw input
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const questionData = {
        question: question,
        options: options,
        answer: answer,
        category: category,
      };

      const savedQuestion = await saveQuestion(questionData);
      toast.success("Question added successfully");
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setQuestion("");
    setOptions([]);
    setRawOptions("");
    setCategory("");
    setAnswer("");
  };

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

  return (
    <div className="h-screen overflow-x-hidden w-full ml-64">
      <h1 className="bg-[#E62E2D] text-center p-5 text-[40px] text-white h-auto font-semibold w-[100%]">
        Questions
      </h1>
      <div className="bg-[#f7fafc6c] px-44 h-screen">
        <div className="bg-white shadow-2xl h-screen">
          <form
            onSubmit={handleSubmit}
            action=""
            className="space-y-4 flex flex-col items-center p-10"
          >
            <label htmlFor="">Question:</label>
            <input
              type="text"
              placeholder="Enter the question here"
              className="border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:outline-none w-2/3"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              required
            />

            <label htmlFor="">Enter the options separated by commas:</label>
            <input
              type="text"
              placeholder="options"
              className="border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:outline-none w-2/3"
              onChange={handleOptionsChange}
              value={rawOptions} // Use raw input for display
              required
            />

            <label htmlFor="">Correct answer:</label>
            <select
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

            <label htmlFor="">Category:</label>
            <input
              type="text"
              placeholder="Enter the category here"
              className="border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:outline-none w-2/3"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            />

            <div className="p-6">
              <button className="bg-[#E62E2D] p-3 text-white rounded-md">
                Add question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestions;
