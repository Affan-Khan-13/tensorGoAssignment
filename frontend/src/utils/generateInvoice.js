import axios from 'axios';
const generateInvoice = async ( id ) => {
    try {
        const requestData = {
            userId: id
        }
        const response = await axios.post(`http://localhost:3001/generate`, requestData);
        const data = response.data;
        return data;
      } catch (error) {
        console.error('Error:', error); 
      }
    };
    
    export default generateInvoice
;