import React from "react";
import {Login} from './Login'; // Import the existing Login component

const LoginPage = () => {
  const handleFormSwitch = (formType) =>{
    console.log(`Switching to ${formType} form`)
  }
  return (
    <div>
      <Login onFormSwitch = {handleFormSwitch} /> {/* Render the existing Login component here */}
    </div>
  );
};

export default LoginPage;




// import React from "react";
// import {Login} from './Login'; // Import the existing Login component

// const LoginPage = (props) => {
//   return (
//     <div>
//       <Login {...props} /> {/* Render the existing Login component here */}
//     </div>
//   );
// };

// export default LoginPage;