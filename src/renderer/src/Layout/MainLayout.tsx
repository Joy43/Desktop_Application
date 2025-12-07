// Updated @renderer/Layout/MainLayout.jsx (Conceptual)
import ServerSidebar from '@renderer/pages/Home/serversidebar/sidebar';
import { Outlet } from 'react-router-dom';


export const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* 1. Render the Sidebar */}
      <ServerSidebar /> 
      
      {/* 2. Render the Page Content (Dashboard, Activity, etc.) */}
      <main className="flex-grow p-8">
        <Outlet /> 
      </main>
    </div>
  );
};