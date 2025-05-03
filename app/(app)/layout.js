import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react'

const layout = ({children}) => {
  return (
    <div className="">
      <section className='shadow-xl' >
        <Navbar />
      </section>
      {children}
      <Footer />
    </div>
  );
}

export default layout
