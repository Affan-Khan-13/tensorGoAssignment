import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getInvoiceDetails from '../utils/getInvoiceDetails';

const InvoiceDetails = () => {
    const { invoiceId } = useParams();

    const [invoiceDetails, setInvoiceDetails] = useState();
    useEffect(() => {
        const getDetails = async () => {
            if (invoiceId) {
                const data = await getInvoiceDetails(invoiceId);
                setInvoiceDetails(data);
                console.log(data);
            }
        }
        getDetails();
    }, [invoiceId])

    const returnStartAndEnd = (start, end) => {
        const startDate = new Date(start).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const endDate = new Date(end).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return `${startDate} - ${endDate}`;
    }

    const calculatePrice = (quantity, unitPrice) => {
        const total = quantity * unitPrice;

        return total;
    }

    return (
        <div className='w-full min-h-full px-3'>
            <div className='font-semibold text-[2rem] flex gap-2 items-center mb-10'>
                Invoice Id:<div className='font-semibold text-[#414141]'>{invoiceDetails?.invoiceId}</div>
            </div>

            <div className='rounded-lg border-[1px] border-black p-2'>
                <div className='text-[1.1rem] font-medium'>
                    <div className='flex items-center gap-5'>
                        <div className='font-bold text-[#B3B3B3]'>Billing Cycle:</div><div className='text-[#414141]'>{returnStartAndEnd(invoiceDetails?.billingCycleStart, invoiceDetails?.billingCycleEnd)}</div>
                    </div>

                    <div className='mt-6'>
                        <div className='grid grid-cols-5 text-[#B3B3B3] font-medium mb-5'>
                            <div className=' place-self-start font-bold'>Usage Cost:</div>
                            <div className=' place-self-start'> Parameter</div>
                            <div className=' place-self-start'> Quantity</div>
                            <div className=' place-self-start'> Unit Cost</div>
                            <div className=' place-self-start'> Total Cost</div>
                        </div>
                        <div className='mb-5'>
                            {invoiceDetails?.items?.map((item) => (
                                <div className='grid grid-cols-5 text-[#414141] font-medium mb-2'>
                                    <div className=' place-self-start'></div>
                                    <div className=' place-self-start'>{item.description}</div>
                                    <div className=' place-self-start'>{item.quantity}</div>
                                    <div className=' place-self-start'>{item.description === 'Active Users' ? '30' : '70'}</div>
                                    <div className=' place-self-start'>{calculatePrice(item.quantity, item.description === 'Active Users' ? 30 : 70)}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex items-center gap-5'>
                        <div className='font-bold text-[#B3B3B3]'>Total Amount:</div><div className='text-[#414141]'>{invoiceDetails?.totalAmount}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceDetails