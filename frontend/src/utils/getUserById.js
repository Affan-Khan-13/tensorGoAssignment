import axiosInstance from "./axiosInstance.js"

const getUserById = async ( id ) => {
    
    try {
        const response = await axiosInstance.get(`users/get/${id}`);
        const data = response.data;
        return data;
      } catch (error) {
        console.error('Error:', error); 
      }
    };
    
    export default getUserById
;