import React, { use, useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../TextInput";
import axios from "axios";
import {useAuth} from '../../contextApi/authContext'
import { toast } from "react-toastify";
import { SparklesIcon } from "@heroicons/react/24/outline";

// validate schema
const schema = yup.object().shape({
  name: yup.string().required(),
  shopName: yup.string().required(),
  shopAddress: yup.string().required(),
  shopImage: yup.mixed().required(),
});

function ShopListingForm() {
  const [loading, setLoading] = useState(false);
  const {setOwner, owner} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    const uplodData = async () => {
      try {
        setLoading(true);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('shopName', data.shopName);
      formData.append('shopAddress', data.shopAddress);
      formData.append('id', owner._id);
      // Append the file - data.shopImage[0] contains the first file
      if (data.shopImage && data.shopImage[0]) {
        formData.append('shopImage', data.shopImage[0]);
      }

        const response = await axios.post(
          "http://localhost:8000/api/shop/add-shop",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        if(response.data.success === true) {
          setOwner(response.data.shopDetails);
          toast.success("Shop details Save Sucessfully 😊");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Something Went Wrong 😒");
      } finally {
        setLoading(false);
      }
    };
    uplodData();
  };

  if(loading) {
    return (
      <div className="flex flex-col my-[10%] items-center space-y-4">
      <SparklesIcon className="w-20 h-20 text-yellow-500 animate-spin" />
      <p className="text-2xl font-semibold text-gray-700">Loading...</p>
    </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Add Your Shop Details
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            encType="multipart/form-data"
          >
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
                label="Shop Name"
                placeholder="Enter Your Shop Name"
                type="text"
                required={true}
                register={register("shopName")}
                error={errors.shopName}
              />
              <TextInput
                label="Shop Address"
                placeholder="Enter Your Shop Address, EX - H12"
                register={register("shopAddress")}
                error={errors.shopAddress}
              />
            </div>

            <div className="w-full">
              <TextInput
                label="Upload Shop Image"
                placeholder="Upload Shop Image"
                type="file"
                required={true}
                className="file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 
             file:text-sm file:font-bold file:text-white 
             file:bg-gradient-to-r file:from-red-500 file:via-orange-500 file:to-red-600 
             hover:file:bg-gradient-to-r hover:file:from-red-600 hover:file:via-orange-600 hover:file:to-red-700 
             file:shadow-lg file:hover:shadow-xl file:transition-all file:duration-300 
             file:cursor-pointer file:transform file:hover:-translate-y-0.5
             w-full text-sm text-gray-500 cursor-pointer
             border-2 border-dashed border-gray-300 hover:border-red-200 
             focus:border-red-300 focus:ring-2 focus:ring-red-200 focus:ring-opacity-50
             rounded-xl p-4 transition-all
             bg-white/50 backdrop-blur-sm hover:bg-red-50/20"
             register={register("shopImage", { required: true })}
                error={errors.shopImage}
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
  );
}

export default ShopListingForm;
