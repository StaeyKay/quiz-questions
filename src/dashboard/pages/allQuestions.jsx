import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { deleteQuestion, filterQuestions, getQuestions, updateQuestion } from "../../utils";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useParams } from "react-router-dom";

const AllQuestions = () => {
  const urlParams = useParams();

  const questionId = urlParams.questionId;
  const updateQuestion = Boolean(questionId);

  const [questions, setQuestions] = useState();
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState();
  const [category, setCategory] = useState("");
  

  const handleSearch = async (value) => {
    const filteredQuestions = await filterQuestions(value);
    setQuestionList(filteredQuestions);
  };

  const handleUpdate = async () => {
    const questionData = {
      question: question,
      options: options,
      answer: answer,
      category: category,
    };

    if (updateQuestion) {
      // Call update questions function
      const updatedQuestion = await updateQuestion(questionId, questionData);

      // Fetch questions from the database to synchronize the front and backend
      const questions = await getQuestions({});
      setQuestion(questions);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionRes = await getQuestions({});
      console.log("questionRes:", questionRes)
      setQuestions(questionRes);
    };
    fetchQuestions();
  }, []);

  return (
    <div className="px-10 w-screen p-5">
      {/* <h1 className="bg-[#E62E2D] text-center p-5 text-[40px] text-white h-auto font-semibold w-[100%]">
        Questions
      </h1> */}
      <div className="flex text-white justify-around p-10">
        <span className="bg-[#E62E2D] py-2 px-5 rounded-lg font-semibold">20 Questions</span>
        <span className="bg-[#E62E2D] py-2 px-5 rounded-lg font-semibold">3 Categories</span>
      </div>
      <div className="flex justify-end p-5">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-l-full p-2"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          className="bg-[#E62E2D] p-2 text-white rounded-r-full"
          onClick={() => handleSearch(input)}
        >
          Search
        </button>
      </div>
      <table className="w-full text-center">
        <thead>
          <tr className="border-b-2">
            <th className="p-2">
              <div className="flex gap-1 justify-center">Question</div>
            </th>
            <th className="text-center p-2">
              <div className="flex gap-1 justify-center">Options</div>
            </th>
            <th className="text-center p-2">
              <div className="flex gap-1 justify-center">Answer</div>
            </th>
            <th className="text-center p-2">
              <div className="flex gap-1">Category</div>
            </th>
            <th className="text-center p-2">
              <div className="flex gap-1">Edit/Delete</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {questions?.docs?.map((question, index) => {
            return (
              <tr key={index} className="even:bg-[#eeeeee]">
                <td className="p-2">{question.question}</td>
                <td className="p-2">
                  <ul>
                    {question.options.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-2">{question.answer}</td>
                <td className="p-2">{question.category}</td>
                <td className="p-2">
                  <div className="flex justify-center">
                    <FaRegEdit
                      onClick={() => handleUpdate}
                      className="hover: cursor-pointer"
                      size={20}
                    />
                    <MdOutlineDelete
                      className="hover: cursor-pointer"
                      size={22}
                      onClick={async (e) => {
                        try {
                          const listQuestion = await deleteQuestion(question.id)
                          // Fetch the list and set it to the new state
                          const questions = await getQuestions({});
                          toast.success("Question deleted successfully")
                          setQuestions(questions)
                        } catch (error) {
                          console.log("error:", error)
                        }
                      }}
                    />
                    <ToastContainer/>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllQuestions;