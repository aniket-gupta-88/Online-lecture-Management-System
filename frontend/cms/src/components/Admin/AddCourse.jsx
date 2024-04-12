import React, { useState } from 'react';
import ADSidenav from './ADSidenav';
import { createCourse } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCourse = () => {
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); 
    const [errors, setErrors] = useState(null);

        const imageUpload = async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "iclvz14i"); 
        formData.append("cloud_name", "dg01ciwao"); 
      
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dg01ciwao/upload", 
          {
            method: "POST",
            body: formData,
          }
        );
      
        const data = await res.json();
        return { public_id: data.public_id, url: data.secure_url };
      };
      
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const uploadedImage = await imageUpload(image);
            console.log(name, level, description, uploadedImage.url)
          const response = await createCourse({
            name,
            level,
            description,
            image_url: uploadedImage.url,
          });
          if(response.status === 200){
              if(response.data.status === 200)
                  console.log("Course created successfully:", response.data);
              if(response.data.status === 201){
                setErrors(response.data.data);
                toast(response.data.message);
                return;
              }
              if(response.data.status === 202){
                toast(response.data.message);
                return;
              }

          }
        } catch (error) {
          console.error("Error creating course:", error);
        }
        resetForm();
      };

      const resetForm = () => {
        setName('');
        setLevel('');
        setDescription('');
        setImage(null);
    };

    return (
        <>
        <ToastContainer />
            <ADSidenav />
            <div className="fixed top-1/2 left-1/2 w-1/2 bg-red-200 transform -translate-x-1/2 -translate-y-1/2">
                <form onSubmit={handleSubmit} className="border rounded-md shadow-lg p-6 bg-white">
                    <div className="text-2xl font-semibold mb-4">Add Course</div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-md p-2" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="level" className="block text-gray-800 font-semibold mb-2">Level:</label>
                        <select id="level" value={level} onChange={(e) => setLevel(e.target.value)} className="w-full border rounded-md p-2" required>
                            <option value="">Select Level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-800 font-semibold mb-2">Description:</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-md p-2" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-800 font-semibold mb-2">Image File (PNG or JPEG):</label>
                        <input type="file" id="image" accept=".png, .jpg, .jpeg" onChange={(e) => setImage(e.target.files[0])} className="w-full border rounded-md p-2" required />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </form>
            </div>
        </>
    );
};

export default AddCourse;
