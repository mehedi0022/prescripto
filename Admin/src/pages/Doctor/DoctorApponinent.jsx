import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorApponinent = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    canceledAppoinmentByDoctor,
    markAsCompleted,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormate, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appoinments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 duration-500"
            key={index}
          >
            <p className="max-sm:hidden ">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <p>{item.userData.name}</p>
            </div>

            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {item.payment ? "ONLINE" : "CASH"}
              </p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormate(item.slotDate)} || {item.slotTime}
            </p>

            <p>
              {item.amount} {currency}
            </p>

            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled </p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex gap-1">
                <img
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  onClick={() => canceledAppoinmentByDoctor(item._id)}
                  alt=""
                />
                <img
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  onClick={() => markAsCompleted(item._id)}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorApponinent;
