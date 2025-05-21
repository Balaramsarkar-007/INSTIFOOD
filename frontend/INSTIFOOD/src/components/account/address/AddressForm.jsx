import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "./TextInput";
import { useAuth } from "../../../context/authContext";
import axios from "axios";
import { SparklesIcon } from "@heroicons/react/24/outline";
import {toast} from 'react-toastify';

// validation schema
const Schema = yup.object().shape({
  name: yup.string().required(),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required("Phone is required"),
  email: yup.string().email().required(),
  address: yup.string().required(),
  hostelNo: yup.string().required(),
  roomNo: yup.string().required(),
  pin: yup
    .string()
    .matches(/^[0-9]{6}$/, "Pincode is not valid")
    .required(),
  city: yup.string().required(),
  state: yup.string().required(),
});

function AddressForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    onSuccess?.();
    const saveAddress = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:8000/user/account/add-address",
          {
            userId: user._id,
            userAddress: data,
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status) {
          setUser(response.data.user);
          toast.success("Address added successfully ☺️");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong 😕");
      } finally {
        setLoading(false);
      }
    };
    saveAddress();
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col my-[10%] items-center space-y-4">
          <SparklesIcon className="w-20 h-20 text-yellow-500 animate-spin" />
          <p className="text-2xl font-semibold text-gray-700">Loading...</p>
        </div>
      ) : (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                Add new address
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name - Full Width */}
                <div className="w-full">
                  <TextInput
                    label="Name"
                    placeholder="Full Name"
                    register={register("name")}
                    required={true}
                    error={errors.name}
                  />
                </div>

                {/* Phone and Email - Stack on mobile, side by side on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextInput
                    label="Phone Number"
                    placeholder="10 digit phone number"
                    type="tel"
                    required={true}
                    register={register("phone")}
                    error={errors.phone}
                  />
                  <TextInput
                    label="Email"
                    placeholder="Email Address"
                    register={register("email")}
                    error={errors.email}
                  />
                </div>

                {/* Address - Full Width */}
                <div className="w-full">
                  <TextInput
                    label="Address"
                    placeholder="Enter your address"
                    required={true}
                    register={register("address")}
                    error={errors.address}
                  />
                </div>

                {/* Locality and Landmark */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextInput
                    label="Hostel Number"
                    placeholder="E.g. Near bus stand"
                    register={register("hostelNo")}
                    error={errors.hostelNo}
                  />
                  <TextInput
                    label="Room Number"
                    placeholder="E.g. Near any famous place"
                    register={register("roomNo")}
                    error={errors.roomNo}
                  />
                </div>

                {/* Pincode and City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextInput
                    label="Pincode"
                    placeholder="Enter 6 digit pincode"
                    required={true}
                    register={register("pin")}
                    error={errors.pin}
                  />
                  <TextInput
                    label="City"
                    placeholder="Enter your city Name"
                    required={true}
                    register={register("city")}
                    error={errors.city}
                  />
                </div>

                {/* State - Full Width */}
                <div className="w-full">
                  <TextInput
                    label="State"
                    placeholder="Enter your state"
                    required={true}
                    register={register("state")}
                    error={errors.state}
                  />
                </div>

                {/* Submit Button - Full Width */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-3 sm:py-2.5 px-4 rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddressForm;
