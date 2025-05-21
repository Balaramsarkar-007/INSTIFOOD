import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '../TextInput';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contextApi/authContext';


// validate schema
const schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().positive().required('Price is required'),
  available: yup.boolean().required(),
  category : yup.string().required(),
  image: yup.mixed().required(),
})

const MenuItemForm = ({ item, onSave, onClose }) => {
  const { register, handleSubmit, formState : {errors} } = useForm({ resolver: yupResolver(schema), defaultValues: item ? {
    name: item.name,
    price: item.price,
    available: item.available,
    category: item.category,
  } : {} });
  
  const navigate = useNavigate();
  const { owner } = useAuth();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('available', data.available);
    formData.append('category', data.category);
    formData.append('image', data.image[0]);
    formData.append('shopId', owner._id);
    
    // onSave(formData);
    console.log(data);
  }

  return (
    <div className="fixed inset-0  from-gray-700 via-gray-800 to-gray-900 bg-opacity-90 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white/95 rounded-xl w-full max-w-2xl shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {item ? 'Edit Item' : 'Add New Item'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form 
        onSubmit={handleSubmit(onSubmit)} 
        encType="multipart/form-data" 
        className="p-6 space-y-4">
         
          <div className="w-full">
                <TextInput
                  label="Name"
                  placeholder="Full Name"
                  register={register("name")}
                  required={true}
                  error={errors.name}
                />
          </div>

          <div className="w-full">
                <TextInput
                  label="Category"
                  placeholder="Enter Category"
                  register={register("category")}
                  required={true}
                  error={errors.category}
                />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="Price"
                placeholder="Enter Price"
                type="number"
                required={true}
                register={register("price")}
                error={errors.price}
              />
              <select 
                    {...register("available")} 
                    className="w-full px-4 text-gray-700 bg-white border-2 border-gray-300 rounded-lg 
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50
                      hover:border-blue-400 transition-colors duration-200
                      appearance-none cursor-pointer shadow-sm"
                  >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
            </div>

            <div className="w-full">
                <TextInput
                  label="Upload Image"
                  placeholder="Upload Image"
                  type='file'
                  register={register("image")}
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
                  required={true}
                  error={errors.image}
                />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type='submit'
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              {item ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemForm;