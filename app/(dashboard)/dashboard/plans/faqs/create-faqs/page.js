import CreateFaqForm from '@/components/create-faq-form'
import React from 'react'

const CreateFaqs = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center w-full gap-y-10' >
      <h1 className='font-bold text-3xl'>Create Faqs</h1>
      <CreateFaqForm/>
    </div>
  )
}

export default CreateFaqs
