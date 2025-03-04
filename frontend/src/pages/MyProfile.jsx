import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfile } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const [image, setimage] = useState(false);

  const updateuserProfile = async () => {
    try {
      const fromData = new FormData();
      fromData.append("name", userData.name);
      fromData.append("phone", userData.phone);
      fromData.append("address", JSON.stringify(userData.address));
      fromData.append("gender", userData.gender);
      fromData.append("dob", userData.dob);

      image && fromData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        fromData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfile();
        setIsEdit(false);
        setimage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 h-36 rounded-full opacity-50"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 h-10 absolute bottom-12 right-12"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setimage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 h-36 rounded-full" src={userData.image} alt="" />
        )}

        {isEdit ? (
          <input
            className="bg-gray-100 text-3xl font-medium max-w-60 mt-4"
            value={userData.name}
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="text-3xl font-medium text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />

        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email Id:</p>
            <p className="text-blue-500">{userData.email}</p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className=" bg-gray-100 max-w-52"
                value={userData.phone}
                type="tel"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <p>
                <input
                  className=" bg-gray-100"
                  value={userData.address.line1}
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <br />
                <input
                  className=" bg-gray-100"
                  value={userData.address.line2}
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </p>
            ) : (
              <p className="text-blue-400">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="max-w-20 bg-gray-100"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}

            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="max-w-28 bg-gray-100"
                value={userData.dob}
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>

        <div>
          {isEdit ? (
            <button
              className="px-10 py-2 mt-3 border rounded-full hover:bg-primary hover:text-white transition-all duration-500"
              onClick={updateuserProfile}
            >
              Save Information
            </button>
          ) : (
            <button
              className="px-10 py-2 mt-3 border rounded-full hover:bg-primary hover:text-white transition-all duration-500"
              onClick={() => setIsEdit(true)}
            >
              Edit Info
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
