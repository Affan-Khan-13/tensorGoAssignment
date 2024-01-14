import React, { useEffect, useState } from 'react'
import { useUser } from '../redux/userContext'
import getAllInvoices from '../utils/getAllInvoices';
import ArrowRight from '../icons/arrowRight';
import { Link, useNavigate } from 'react-router-dom';

const Invoices = () => {
  const { state } = useUser();
  const user = state.user;
  const navigate = useNavigate();
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

  const Clicked = () =>{
    navigate('/');
  }

  return (
    <div className='w-full min-h-full px-4'>
      <div className='text-[2rem] font-medium'>
        Invoices
      </div>

      <div className='grid grid-cols-4 my-8 text-[1rem] font-medium text-[#B3B3B3]'>
        <div className=' place-self-center'>Invoice Id</div>
        <div className=' place-self-center'>Total Amount</div>
        <div className=' place-self-center'>TimeLine</div>
      </div>

      {invoices?.length <= 0 ?
        (<div className='w-full'>
          <div className='flex justify-center'>
            <div className='max-w-[50%] text-center text-[1rem] font-medium'>
              There are no invoices yet, the invoice will be automatically generated at the end of the cycle or you can generate one on home page
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='mt-6 rounded-2xl h-max w-max py-3 px-5 bg-black hover:bg-white text-white hover:text-black font-medium border-[2px] border-black cursor-pointer' onClick={()=>Clicked()}>
              Home Page
            </div>
          </div>
        </div>)
        :
        (invoices?.map((invoice) => (
          <div className='grid grid-cols-4 my-8 text-[1rem] font-medium text-[#414141]'>
            <div className='place-self-center'>{invoice.invoiceId || "0"}</div>
            <div className='place-self-center'>{invoice.totalAmount || "0"}</div>
            <div className='place-self-center'>{returnStartAndEnd(invoice.billingCycleStart, invoice.billingCycleEnd)}</div>
            <div className='place-self-center'>
              <Link to={`/invoice/${invoice.invoiceId}`}>
                <div className='flex items-center gap-2 text-blue-900'> Details <ArrowRight /></div>
              </Link>
            </div>
          </div>
        )))
      }
    </div>
  )
}

export default Invoices
