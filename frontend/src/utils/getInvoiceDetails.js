import axiosInstance from "./axiosInstance.js"

const getInvoiceDetails = async ( id ) => {
    
    try {
        const response = await axiosInstance.get(`invoice/getInvoice/${id}`);
        const data = response.data;
        return data.InvoiceDetails;
      } catch (error) {
        console.error('Error:', error); 
      }
    };
    
    export default getInvoiceDetails
;