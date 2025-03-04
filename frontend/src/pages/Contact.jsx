import { assets } from "../assets/assets";
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className=" text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="flex flex-col my-10 justify-center md:flex-row gap-6 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6 ">
          <b className="text-gray-800">OUR OFFICE</b>
          <p>
            00000 Willms Station Suite 000, <br /> Washington, USA
          </p>

          <b className="text-gray-800">GET IN TOUCH</b>
          <p>
            Phone: +8801621905416 <br /> Email: mdmehedihassan0022@gmail.com
          </p>

          <b className="text-gray-800">CAREERS AT PRESCRIPTO</b>
          <p>Learn more about our teams and job openings.</p>

          <button className=" px-6 py-5 border hover:bg-black hover:text-white transition-all duration-500 ">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
