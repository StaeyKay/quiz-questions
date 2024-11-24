import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteQuestion,
  filterQuestions,
  getQuestions,
  updateQuestion,
} from "../../utils";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate, useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AllQuestions = () => {
  const urlParams = useParams();
  const navigate = useNavigate();

  const questionId = urlParams.questionId;
  const updateQuestion = Boolean(questionId);

  const [questions, setQuestions] = useState();
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = async (value) => {
    const filteredQuestions = await getQuestions({
      filter: { category: value },
    });
    setQuestions(filteredQuestions);
  };

  const handleUpdate = async (question) => {
    // Pass the value of the dynamic variable
    navigate(`updatequestions/${question.id}`, { state: question });
  };

  const handleCategorySelection = async (e) => {
    e.preventDefault();
    const query = category === "all" ? {} : { filter: { category } };
    const filteredQuestions = await getQuestions(query);
    setQuestions(filteredQuestions);
  };

  const onPageChange = async ({ selected }) => {
    const query = {
      page: selected + 1,
      filter: category && category !== "all" ? { category } : null,
    };
    const questions = await getQuestions(query);
    setQuestions(questions);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const query =
        category && category !== "all" ? { filter: { category } } : {};
      const questionRes = await getQuestions(query);
      setQuestions(questionRes);
    };
    fetchQuestions();
  }, [category]);

  return (
    <div className="h-screen px-12 overflow-x-hidden w-full ml-64">
      {/* <h1 className="bg-[#E62E2D] text-center p-5 text-[40px] text-white h-auto font-semibold w-[100%]">
        Questions
      </h1> */}
      <div className="flex text-white justify-around p-10">
        <span className="bg-[#E62E2D] py-2 px-5 rounded-lg font-semibold text-[25px]">
          {questions?.totalDocs} Questions
        </span>
      </div>
      <div className="flex justify-between items-center py-8">
        <form action="" className="flex h-12">
          <select
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            value={category}
            className="border border-gray-300 rounded-l-full p-2"
            required
          >
            <option value="" disabled selected hidden>
              -- Search a category --
            </option>
            <option value="all">All</option>
            <option value="entertainment">Entertainment</option>
            <option value="social studies">Social Studies</option>
            <option value="integrated science">Integrated Science</option>
            <option value="english language">English Language</option>
            <option value="new">New</option>
          </select>
          <button
            className="bg-[#E62E2D] p-2 text-white rounded-r-full"
            onClick={handleCategorySelection}
          >
            Search
          </button>
        </form>
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
      </div>
      <table className="w-full text-center shadow-2xl">
        <thead className="bg-[#EEEEEE]">
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
          {questions?.docs?.map((question) => {
            return (
              <tr key={question.id} className="even:bg-[#eeeeee]">
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
                  <div className="flex justify-center items-center gap-3">
                    <LuEye
                      onClick={handleOpen}
                      className="hover: cursor-pointer"
                      size={25}
                    />
                    <FaRegEdit
                      onClick={() => handleUpdate(question)}
                      className="hover: cursor-pointer"
                      size={25}
                    />
                    <MdOutlineDelete
                      className="hover: cursor-pointer"
                      size={27}
                      onClick={async (e) => {
                        try {
                          await deleteQuestion(question.id);
                          // Fetch the list and set it to the new state
                          const questions = await getQuestions({});
                          setQuestions(questions);
                          toast.success("Question deleted successfully");
                        } catch (error) {
                          console.log("error:", error);
                        }
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
      <div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={questions?.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          onPageChange={onPageChange}
          containerClassName={"flex justify-center mt-4"}
          pageClassName={"mx-1"}
          pageLinkClassName={
            "px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
          }
          previousClassName={"mx-1"}
          previousLinkClassName={
            "px-3 py-1 border border-gray-300 rounded text-black hover:bg-gray-200"
          }
          nextClassName={"mx-1"}
          nextLinkClassName={
            "px-3 py-1 border border-gray-300 rounded text-black hover:bg-gray-200"
          }
          breakLinkClassName={
            "px-3 py-1 border border-gray-300 rounded text-black hover:bg-gray-200"
          }
          activeClassName={"bg-[#E62E2D] text-white"}
          activeLinkClassName={"text-white"}
        />
      </div>
    </div>
  );
};

export default AllQuestions;
