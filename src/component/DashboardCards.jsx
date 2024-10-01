// // src/components/DashboardCards.js
// import React from 'react';
// import '../assets/dashboard-card.css'
// import { Button } from '@material-ui/core';
// import { Link } from 'react-router-dom';

// const DashboardCards = () => {
//   const cardsData = [
//     {
//       title: 'Total Users',
//       value: 1200,
//       icon: '👥',
//       bgColor: 'rgb(66, 204, 44)',
//     },
//     {
//       title: 'Total Businesses',
//       value: 300,
//       icon: '🏢',
//       bgColor: 'rgb(56, 200, 106)',
      
//     },
//   ];

//   const otherData = [
//     {
//       title: 'Add New User',
//       icon:'👪',
//       bgColor: '#fff',
//       path:'/user',
//       line: 'none'
      
//     },
//     {
//       title: 'Add New Admin',
//       icon:'🙍🏼‍♂️',
//       bgColor: '#fff',
//       path:'/admin',
//       line: 'none'
//     },
//     {
//       title: 'Add New Business',
//       icon:'🏢',
//       bgColor: '#fff',
//       path:'/business',
//       line: 'none'
//     },
  
//   ]

//   return (
//     <div >
//       <h2 style={{paddingTop:'30px', marginBottom:'50px', fontSize:'38px', color:'green', fontWeight:'400', letterSpacing:'2px', }}>Welcome Back!</h2>
//       <div className="dashboard-cards">
//         {cardsData.map((card, index) => (
//           <div className="card" key={index} style={{ backgroundColor: card.bgColor, width: card.width}}>
//             <div className="card-icon">{card.icon}</div>
//             <h3>{card.title}</h3>
//             <p>{card.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className='other-data'>
//         {otherData.map((card, index)=>(
//           <Link className="card" key={index} to={card.path} style={{ backgroundColor: card.bgColor, width: card.width, textDecorationLine: card.line}}>
//             <div className="card-icon">{card.icon}</div>
//             <h3>{card.title}</h3>
//             <p>{card.value}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardCards;


import React from 'react';
import '../assets/dashboard.css'
import { Link } from 'react-router-dom';

const DashboardCards = () => {
  const cardsData = [
        {
          title: 'Total Users',
          value: 1200,
          icon: '👥',
          bgColor: 'rgb(66, 204, 44)',
        },
        {
          title: 'Total Businesses',
          value: 300,
          icon: '🏢',
          bgColor: 'rgb(56, 200, 106)',
          
        },
      ];
    
      const otherData = [
        {
          title: 'Business Pending Approval',
          icon:'📰',
          bgColor: '#fff',
          path:'/pending',
          line: 'none'
          
        },
        {
          title: 'Manage User',
          icon:'🔗',
          bgColor: '#fff',
          path:'/all-users',
          line: 'none'
          
        },
        {
          title: 'Manage Business',
          icon:'📄',
          bgColor: '#fff',
          path:'/all-business',
          line: 'none'
        },
        {
          title: 'Add New Business',
          icon:'🏢',
          bgColor: '#fff',
          path:'/add',
          line: 'none'
        },
      
      ]

  return (
    <div>
      <div className="dashboard-cards">
        {cardsData.map((card, index) => (
          <div className="card" key={index} style={{ backgroundColor: card.bgColor, width: card.width}}>
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>

      <div className='other-data'>
        {otherData.map((card, index)=>(
          <Link className="card" key={index} to={card.path} style={{ backgroundColor: card.bgColor, width: card.width, textDecorationLine: card.line}}>
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;

