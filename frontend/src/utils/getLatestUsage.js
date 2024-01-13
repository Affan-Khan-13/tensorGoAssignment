import axiosInstance from "./axiosInstance.js"

const getLatestUsageDetails = async ( id ) => {
    
    try {
        const response = await axiosInstance.get(`usage/getLatest/${id}`);
        const data = response.data;
        return data.latestUsageDetails;
      } catch (error) {
        console.error('Error:', error); 
      }
    };
    
    export default getLatestUsageDetails
;