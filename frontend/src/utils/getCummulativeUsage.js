import axiosInstance from "./axiosInstance.js"

const getCummulativeDetails = async ( id ) => {
    
    try {
        const response = await axiosInstance.get(`cummulative/get/${id}`);
        const data = response.data;
        return data.cummulativeUsage;
      } catch (error) {
        console.error('Error:', error); 
      }
    };
    
    export default getCummulativeDetails
;