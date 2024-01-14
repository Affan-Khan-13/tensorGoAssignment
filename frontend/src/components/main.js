import React, { useEffect, useState } from 'react'
import { useUser } from '../redux/userContext'
import getLatestUsageDetails from '../utils/getLatestUsage';
import getCummulativeDetails from '../utils/getCummulativeUsage';
import generateInvoice from '../utils/generateInvoice';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const { state } = useUser();
  const user = state.user;
  const navigate = useNavigate();

  const [invoiceDetails, setInvoiceDetails] = useState();
  const [cummulativeDetails, setCummulativeDetails] = useState();
  const [endDate, setEndDate] = useState();
  useEffect(() => {
    if (user) {
      const UsageDetails = async () => {
        const data = await getLatestUsageDetails(user._id);
        // console.log(data, "invoce");
        setInvoiceDetails(data);
      }
      UsageDetails();

      const CummulativeDetails = async () => {
        const data = await getCummulativeDetails(user._id);
        // console.log(data, "cummulative");
        setCummulativeDetails(data);
      }
      CummulativeDetails();
    }
  }, [user])

  useEffect(() => {
    const expectedEndDate = new Date(new Date(invoiceDetails?.timestamp).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setEndDate(expectedEndDate);
  }, [invoiceDetails])



  const datewithname = (date) => {
    const DateComin = new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `${DateComin}`
  }

  const [totalAmount, setTotalAmount] = useState(0);
  const calculatePrice = (quantity, unitPrice) => {
    const total = quantity * unitPrice;
    return total;
  }

  useEffect(() => {
    // Calculate the total amount when invoiceDetails changes
    if (cummulativeDetails) {
      const activeUsersTotal = calculatePrice(cummulativeDetails.activeUsers, 30);
      const storageUsageTotal = calculatePrice(cummulativeDetails.storageUsage, 70);
      const newTotalAmount = activeUsersTotal + storageUsageTotal;
      setTotalAmount(newTotalAmount);
    }
  }, [cummulativeDetails]);

  const generateInv = async() =>{
    const data = await generateInvoice(user._id);
    navigate('/invoices')
  }


  return (
    <div className='w-full min-h-full px-3'>
      <div className='mb-10'>
        <div className='font-semibold text-[2rem] flex gap-2 items-center mb-4'>
          This Cycles Usage
        </div>

        <div className='rounded-lg border-[1px] border-black p-2'>
          <div className='text-[1.1rem] font-medium'>
            <div className='flex items-center gap-5'>
              <div className='font-bold text-[#B3B3B3]'>Start Date:</div><div className='text-[#414141]'>{datewithname(invoiceDetails?.timestamp)}</div>
            </div>

            <div className='flex items-center gap-5 mt-6'>
              <div className='font-bold text-[#B3B3B3]'>Expected End Date:</div><div className='text-[#414141]'>{endDate}</div>
            </div>

            <div className='mt-6'>
              <div className='grid grid-cols-5 text-[#B3B3B3] font-medium mb-5'>
                <div className=' place-self-start font-bold'>Usage:</div>
                <div className=' place-self-start'> Parameter</div>
                <div className=' place-self-start'> Quantity</div>
              </div>

              <div className='mb-6'>
                <div className='grid grid-cols-5 text-[#414141] font-medium mb-2'>
                  <div className=' place-self-start'></div>
                  <div className=' place-self-start'>Active Users</div>
                  <div className=' place-self-start'>{invoiceDetails?.activeUsers || "0"}</div>
                </div>

                <div className='grid grid-cols-5 text-[#414141] font-medium mb-2'>
                  <div className=' place-self-start'></div>
                  <div className=' place-self-start'>Storage Usage</div>
                  <div className=' place-self-start'>{invoiceDetails?.storageUsage || "0"}GB</div>
                </div>
              </div>
            </div>

            <div className='mt-6 rounded-2xl h-max w-max py-3 px-5 bg-black hover:bg-white text-white hover:text-black border-[2px] border-black cursor-pointer' onClick={()=>generateInv()}>
              Gentrate Invoice
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='font-semibold text-[2rem] flex gap-2 items-center mb-4'>
          Overall Usage
        </div>

        <div className='rounded-lg border-[1px] border-black p-2'>
          <div className='text-[1.1rem] font-medium'>

            <div className='mt-6'>
              <div className='grid grid-cols-5 text-[#B3B3B3] font-medium mb-5'>
                <div className=' place-self-start font-bold'>Usage:</div>
                <div className=' place-self-start'> Parameter</div>
                <div className=' place-self-start'> Quantity</div>
                <div className=' place-self-start'> Unit Price</div>
                <div className=' place-self-start'> Total Price</div>
              </div>

              <div className='mb-6'>
                <div className='grid grid-cols-5 text-[#414141] font-medium mb-2'>
                  <div className=' place-self-start'></div>
                  <div className=' place-self-start'>Active Users</div>
                  <div className=' place-self-start'>{cummulativeDetails?.activeUsers || "0"}</div>
                  <div className=' place-self-start'>30</div>
                  <div className=' place-self-start'>{calculatePrice(cummulativeDetails?.activeUsers, 30)}</div>
                </div>

                <div className='grid grid-cols-5 text-[#414141] font-medium mb-2'>
                  <div className=' place-self-start'></div>
                  <div className=' place-self-start'>Storage Usage</div>
                  <div className=' place-self-start'>{cummulativeDetails?.storageUsage || "0"}GB</div>
                  <div className=' place-self-start'>70</div>
                  <div className=' place-self-start'>{calculatePrice(cummulativeDetails?.storageUsage, 70)}</div>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-5'>
              <div className='font-bold text-[#B3B3B3]'>Total Amount:</div><div className='text-[#414141]'>{totalAmount || "0"}</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
