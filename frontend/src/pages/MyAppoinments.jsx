import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppoinments = () => {
  const { backendUrl, token, getDoctorData } = useContext(AppContext);
  const [appoinments, setAppoinments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppoinments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appoinments", {
        headers: { token },
      });

      if (data.success) {
        setAppoinments(data.Appoinments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancleAppoinment = async (appoinmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancle-appointment",
        { appoinmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppoinments();
        getDoctorData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppoinments();
    }
  }, [token]);
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appoinments
      </p>

      <div>
        {appoinments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-40 bg-indigo-50 rounded"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600 ">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.spciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-stone-700 font-medium">
                  Date & Time:{" "}
                </span>{" "}
                {slotDateFormate(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div></div>

            <div className="flex flex-col gap-2 justify-center">
              {item.isCompleted ? (
                <button className="sm:min-w-48 py-2 border border-green-500 bg-green-500 rounded text-white transition-all duration-300">
                  Completed
                </button>
              ) : item.cancelled ? (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500 transition-all duration-300">
                  Appoinmrnt Cancelled
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <button className=" bg-primary text-white text-center sm:min-w-48 py-2 border hover:bg-purple-500">
                    Pay Online
                  </button>
                  <button
                    onClick={() => cancleAppoinment(item._id)}
                    className=" text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Cancle Appoinmrnt
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppoinments;
