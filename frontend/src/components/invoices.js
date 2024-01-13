import React, { useEffect, useState } from 'react'
import { useUser } from '../redux/userContext'
import getAllInvoices from '../utils/getAllInvoices';
import ArrowRight from '../icons/arrowRight';
import { Link } from 'react-router-dom';

const Invoices = () => {
  const { state } = useUser();
  const user = state.user;
  const [invoices, setInvoices] = useState();
  useEffect(() => {
    if (user) {
      const Allinvoices = async () => {
        const data = await getAllInvoices(user._id);
        setInvoices(data);
      }
      Allinvoices();
    }
  }, [user])


  const returnStartAndEnd = (start, end) => {
    const startDate = new Date(start).toLocaleDateString();
    const endDate = new Date(end).toLocaleDateString();

    return `${startDate} - ${endDate}`;
  }

  return (
    <div className='w-full min-h-full px-4'>
      <div className=' flex justify-center'>
        <div className='text-[2rem] font-medium'>
          Invoices
        </div>
      </div>

      <div className='grid grid-cols-4 my-8 text-[1rem] font-medium text-[#B3B3B3]'>
        <div className=' place-self-center'>Invoice Id</div>
        <div className=' place-self-center'>Total Amount</div>
        <div className=' place-self-center'>TimeLine</div>
      </div>

      {invoices?.map((invoice) => (
        <div className='grid grid-cols-4 my-8 text-[1rem] font-medium text-[#414141]'>
          <div className='place-self-center'>{invoice.invoiceId}</div>
          <div className='place-self-center'>{invoice.totalAmount}</div>
          <div className='place-self-center'>{returnStartAndEnd(invoice.billingCycleStart, invoice.billingCycleEnd)}</div>
          <div className='place-self-center'>
            <Link to={`/invoice/${invoice.invoiceId}`}>
              <div className='flex items-center gap-2 text-blue-900'> Details <ArrowRight /></div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Invoices
