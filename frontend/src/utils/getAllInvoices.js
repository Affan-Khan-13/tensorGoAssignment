import axiosInstance from "./axiosInstance.js"

const getAllInvoices = async ( id ) => {
    
    try {
        const response = await axiosInstance.get(`invoice/getAll/${id}`);
        const data = response.data;
        return data.allInvoices;
      } catch (error) {
        console.error('Error:', error); 
      }
    };
    
    export default getAllInvoices
;