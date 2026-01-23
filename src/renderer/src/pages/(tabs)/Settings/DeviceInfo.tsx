import { useEffect, useState } from "react";

// Declare the electronAPI type
declare global {
  interface Window {
    electronAPI: {
      getDeviceInfo: () => Promise<any>;
    };
  }
}


const DeviceInfo = () => {
const [info, setInfo] = useState(null);
    useEffect(() => {
    // Call the API exposed via preload.js
    window.electronAPI.getDeviceInfo().then(data => {
      setInfo(data);
    });
  }, []);

  if (!info) return <div>Loading...</div>;
  return (
    <div>DeviceInfo</div>
  )
}

export default DeviceInfo;