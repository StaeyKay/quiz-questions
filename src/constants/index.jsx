import { PiSelectionAllDuotone } from "react-icons/pi";
import { MdAddBox } from "react-icons/md";

const K = {
  DASHBOARDLINKS: [
    {
      icon: <PiSelectionAllDuotone size={30} />,
      name: "ALL QUESTIONS",
      path: "/",
    },
    {
      icon: <MdAddBox size={30} />,
      name: "ADD QUESTIONS",
      path: "addquestions",
    },
  ],
};

export default K;
