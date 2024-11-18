// // import React, { ReactNode } from 'react';

// interface ButtonProps {
//   children: ReactNode;
//   onClick: () => void;
//   className?: string; // Add this line
// }

// const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
//   return (
//     <button onClick={onClick} className={className}>
//       {children}
//     </button>
//   );
// };

// export default Button;


export const Button = ({onClick, children }: {onClick: () => void, children: React.ReactNode}) => {
    return <button onClick={onClick} className="p-8 py-4 text-2xl bg-green-500 
    hover:bg-green-700 text-white font-bold rounded">
       {children}
    </button>
}