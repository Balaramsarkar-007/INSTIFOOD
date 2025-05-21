import React, { useState } from 'react';
import { useAuth } from '../../contextApi/authContext';
import { set, useForm } from "react-hook-form";
import TextInput from "../TextInput";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { SparklesIcon } from "@heroicons/react/24/outline";

// validate schema
const schema = yup.object().shape({
  name: yup.string(),
  shopName: yup.string(),
  shopAddress: yup.string(),
  shopImage: yup.mixed(),
});

const ShopCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { owner, setOwner } = useAuth();

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

        const response = await axios.put(
          "http://localhost:8000/api/shop/update-shop",
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
          setIsEditing(false);
          toast.success("Shop Details Updated Sucessfully 😊");
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
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
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">

      <div className="w-full">
        <img
          src= {owner?.shopImage.url}
          alt="Shop front"
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        {!isEditing ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{owner.shopName}</h2>
            <div className="space-y-2">
            <p className="text-gray-700">
                <span className="font-semibold">Owner Name :</span> {owner.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Address:</span> {owner.shopAddress}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Phone:</span> +{owner.ph}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Joining Date:</span> {
                  new Date(owner.timeStamps).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Update Your Shop Details
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
                register={register("name")}
                placeholder={owner.name}
                error={errors.name}
              />
            </div>

            {/* Phone and Email - Stack on mobile, side by side on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="Shop Name"
                type="text"
                placeholder={owner.shopName}
                register={register("shopName")}
                error={errors.shopName}
              />
              <TextInput
                label="Shop Address"
                placeholder={owner.shopAddress}
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
            <div className="pt-2 flex gap-2">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                save changes
              </button>
              <button
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
            </div>
          </form>
        </div> 
        )}
      </div>

      {/* Footer Section */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Details
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopCard;
