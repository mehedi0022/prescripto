import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [doctorName, setdoctorName] = useState("");
  const [doctorEmail, setdoctorEmail] = useState("");
  const [docPassword, setdocPassword] = useState("");
  const [docFees, setDocFees] = useState("");
  const [docExperience, setdocExperience] = useState("1 Year");
  const [docSpeciality, setdocSpeciality] = useState("General Physician");
  const [docEducation, setdocEducation] = useState("");
  const [docAbout, setdocAbout] = useState("");
  const [docAddress1, setdocAddress1] = useState("");
  const [docAddress2, setdocAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Doctor image not selected");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", doctorName);
      formData.append("email", doctorEmail);
      formData.append("password", docPassword);
      formData.append("experience", docExperience);
      formData.append("degree", docEducation);
      formData.append("fees", Number(docFees));
      formData.append("about", docAbout);
      formData.append("speciality", docSpeciality);
      formData.append(
        "address",
        JSON.stringify({ line1: docAddress1, line2: docAddress2 })
      );

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);

        setDocImg(false);
        setdoctorName("");
        setdoctorEmail("");
        setdocAbout("");
        setdocAddress1("");
        setdocAddress2("");
        setDocFees("");
        setdocPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload Doctor <br /> Picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                onChange={(e) => setdoctorName(e.target.value)}
                value={doctorName}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Doctor Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setdoctorEmail(e.target.value)}
                value={doctorEmail}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="email address"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                onChange={(e) => setdocPassword(e.target.value)}
                value={docPassword}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setdocExperience(e.target.value)}
                value={docExperience}
                className="border rounded px-3 py-2"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Years</option>
                <option value="3 Year">3 Years</option>
                <option value="4 Year">4 Years</option>
                <option value="5 Year">5 Years</option>
                <option value="6 Year">6 Years</option>
                <option value="7 Year">7 Years</option>
                <option value="8 Year">8 Years</option>
                <option value="9 Year">9 Years</option>
                <option value="10 Year">10 Years</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                onChange={(e) => setDocFees(e.target.value)}
                value={docFees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setdocSpeciality(e.target.value)}
                value={docSpeciality}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="General Physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setdocEducation(e.target.value)}
                value={docEducation}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setdocAddress1(e.target.value)}
                value={docAddress1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 1"
                required
              />
              <input
                onChange={(e) => setdocAddress2(e.target.value)}
                value={docAddress2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 2"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex-1 flex flex-col gap-1">
            <p className="mt-4 mb-2">About Doctor</p>
            <textarea
              onChange={(e) => setdocAbout(e.target.value)}
              value={docAbout}
              className="w-full border rounded px-4 py-2"
              placeholder="Write About Doctor"
              rows={5}
              required
            ></textarea>
          </div>
          <button className="px-10 py-3 mt-4 bg-primary rounded-full text-white text-sm">
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
