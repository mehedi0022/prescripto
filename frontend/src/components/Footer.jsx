import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/*---left section*/}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel,
            consequuntur atque, vero, molestiae hic corporis dolore tenetur
            suscipit qui alias error facere saepe a provident magnam eligendi
            accusantium. Quia, laboriosam?
          </p>
        </div>

        {/*---Center section*/}
        <div>
          <h2 className="text-xl font-medium mb-5">COMPANY</h2>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
            <li>Privicy Policy</li>
          </ul>
        </div>

        {/*---Right section*/}
        <div>
          <h2 className="text-xl font-medium mb-5">GET IN TOUCH</h2>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+8801621905416</li>
            <li>mehedihassan0022@gmail.com</li>
          </ul>
        </div>
      </div>

      {/*---Copyright section*/}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ Mehedi - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
