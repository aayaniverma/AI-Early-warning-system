import { useState } from 'react';
import Dashboard from '../components/Dashboard';

export default function Home() {
    const [currentComponent, setCurrentComponent] = useState(null);
  
    const renderComponent = () => {
      switch (currentComponent) {
        case 'dashboard':
          return <Dashboard />;
        default:      
  return (
        
        <div
        className="flex justify-center items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/home.png')" }} // Replace with your image path
      >
        <div className="flex justify-around w-full max-w-8xl px-4 h-4/5">
        
          <button  onClick={() => setCurrentComponent('dashboard')}
           className="btn glass sm:btn-sm md:btn-md lg:btn-lg w-5/12 h-full sm:h-3/4 md:h-2/3  text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl flex items-center justify-center rounded-lg p-4">
            Dashboard
          </button>
          <button className="btn glass sm:btn-sm md:btn-md lg:btn-lg w-5/12 h-full sm:h-3/4 md:h-2/3  text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl flex items-center justify-center rounded-lg p-4" 
          style={{ backgroundImage: "url('/worldmap.png ')" }}>
            World Map
          </button>
        </div>
      </div>
    );
}
};

return <>{renderComponent()}</>;
}
  