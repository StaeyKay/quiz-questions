import React, { useState } from "react";
import { saveQuestion } from "../utils";
import { useNavigate } from "react-router-dom";

const AddQuestions = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState();
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const questionData = {
        question: question,
        options: options.split(","),
        answer: answer,
        category: category,
      };

      console.log(question);
      console.log(options);
      console.log(answer);
      console.log(category);
      console.log("questionData:", questionData);

      const savedQuestion = await saveQuestion(questionData);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setQuestion("");
    setOptions("");
    setCategory("");
    setAnswer("");
  };
  return (
    <div>
      <h1 className="bg-[#E62E2D] text-center p-5 text-[40px] text-white h-auto font-semibold w-[100%]">
        Questions
      </h1>
      <div className="bg-[#f7fafc6c] px-44 h-screen">
        <div className="bg-white shadow-2xl h-screen">
          <form
            onSubmit={handleSubmit}
            action=""
            className="space-y-3 flex flex-col items-center p-10"
          >
            <label htmlFor="">Question:</label>
            <input
              type="text"
              placeholder="Enter the question here"
              className="border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:outline-none w-2/3"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            />
            <label htmlFor="">Enter the options separated by commas:</label>
            <input
              type="text"
              placeholder="options"
              className="border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:outline-none w-2/3"
              onChange={(e) => setOptions(e.target.value)}
              value={options}
            />
            <label htmlFor="">Correct answer</label>
            <input
              type="number"
              placeholder="Input the index of the correct answer here"
              className="border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:outline-none w-2/3"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
            />
            <label htmlFor="">Category</label>
            <input
              type="text"
              placeholder="Input the index of the correct answer here"
              className="border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:outline-none w-2/3"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
            <button className="bg-[#E62E2D] p-3 text-white rounded-md">
              Add question
            </button>
          </form>
          <div className="p-6 flex justify-end">
            <button
              className="bg-[#E62E2D] p-3 text-white rounded-md"
              onClick={() => navigate("/questions")}
            >
              View questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestions;
