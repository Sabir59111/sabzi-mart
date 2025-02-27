

import React from 'react'
// import Header from './components/Header'
// import Hero from './components/Hero'
// import Footer from './components/Footer'

// export default function page() {
//   return (
//     <div>
//       <Header />
//       <Hero />
//       <Footer />
//     </div>
//   )
// }
import { redirect } from 'next/navigation';

export default function Home() {
    redirect('/applogin'); 
    return null;
}

