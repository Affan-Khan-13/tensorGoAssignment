import React, { useEffect, useState } from 'react'
import { useUser } from '../redux/userContext'
import getLatestUsageDetails from '../utils/getLatestUsage';

const Billing = () => {
  const { state } = useUser();
  const user = state.user;

  const [invoiceDetails, setInvoiceDetails] = useState();
  const [endDate, setEndDate] = useState();
  useEffect(() => {
    if (user) {
      const UsageDetails = async () => {
        const data = await getLatestUsageDetails(user._id);
        // console.log(data, "invoce");
        setInvoiceDetails(data);
      }
      UsageDetails();
    }
  }, [user])

  useEffect(()=>{
    const expectedEndDate = new Date(new Date(invoiceDetails?.timestamp).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setEndDate(expectedEndDate);
  },[invoiceDetails])

  

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
    if (invoiceDetails) {
      const activeUsersTotal = calculatePrice(invoiceDetails.activeUsers, 30);
      const storageUsageTotal = calculatePrice(invoiceDetails.storageUsage, 70);
      const newTotalAmount = activeUsersTotal + storageUsageTotal;
      setTotalAmount(newTotalAmount);
    }
  }, [invoiceDetails]);

  return (
    <div className='w-full min-h-full px-3'>
      <div className='font-semibold text-[2rem] flex gap-2 items-center mb-10'>
        Current Billing Cycle
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
              <div className=' place-self-start font-bold'>Usage Cost:</div>
              <div className=' place-self-start'> Parameters</div>
              <div className=' place-self-start'> Quantity</div>
              <div className=' place-self-start'> Unit Cost</div>
              <div className=' place-self-start'> Total Cost</div>
            </div>

            <div className='mb-6'>
              <div className='grid grid-cols-5 text-[#414141] font-medium mb-2'>
                <div className=' place-self-start'></div>
                <div className=' place-self-start'>Active Users</div>
                <div className=' place-self-start'>{invoiceDetails?.activeUsers}</div>
                <div className=' place-self-start'>30</div>
                <div className=' place-self-start'>{calculatePrice(invoiceDetails?.activeUsers, 30)}</div>
              </div>

              <div className='grid grid-cols-5 text-[#414141] font-medium mb-2'>
                <div className=' place-self-start'></div>
                <div className=' place-self-start'>Storage Usage</div>
                <div className=' place-self-start'>{invoiceDetails?.storageUsage}GB</div>
                <div className=' place-self-start'>70</div>
                <div className=' place-self-start'>{calculatePrice(invoiceDetails?.storageUsage, 70)}</div>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-5'>
            <div className='font-bold text-[#B3B3B3]'>Total Amount:</div><div className='text-[#414141]'>{totalAmount}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billing
