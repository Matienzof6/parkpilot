import { Link } from 'react-router-dom';
import backgroundPattern from '../assets/pattern.png';
import { useEffect, useState } from 'react';
import api from '../services/api';


export default function Home() {
  const TOTAL_SPOTS = 50;
  const [occupied, setOccupied] = useState(0);
  const [free, setFree] = useState(50);
  const [upcoming, setUpcoming] = useState(0);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/parking/active');

        const activeRecords = response.data.data;

        setOccupied(activeRecords.length);

        setFree(TOTAL_SPOTS - activeRecords.length);

        const today = new Date().toISOString().split('T')[0];

        const todayCheckouts = activeRecords.filter(
          (record) => record.check_out_date.startsWith(today)
        );

        setUpcoming(todayCheckouts.length);

        
      } catch (error) {
        console.error(error);
      }
    };

      fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #ea580c 180%)",
        }}
      />
      <div className="relative z-10 min-h-screen flex flex-col text-white">      <div className="max-w-screen-xl mx-auto p-8 flex flex-col flex-1">
        <div className="flex flex-row items-center justify-between mb-10 select-none ">

          <div className="flex flex-col gap-3">
            <p className="text-orange-500 uppercase tracking-[0.3em]">
              ParkPilot
            </p>

            <h1 className="text-5xl font-bold text-white mt-2">
              Parking Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Real-time parking management
            </p>
            <p className="text-slate-500 text-sm mt-1">
               {new Date().toLocaleDateString('en-GB')}
            </p>
          </div>
          <div className="flex flex-col  ">
             <button
              onClick={() => {
                localStorage.removeItem('authenticated');
                window.location.href = '/login';
              }}
              className="
                rounded-xl
                border
                border-slate-700
                px-4
                py-2
                text-sm
                hover:border-orange-500
                transition-all
              "
            >
              Logout
            </button>
            <img
              src="/logo.svg"
              alt="Parking management logo"
              className="w-32 opacity-90"
            />
           
          </div>
        </div>
       <div className="flex-1 flex flex-col justify-center select-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 select-none ">

        <div
          className="
          rounded-3xl
          border
          border-slate-800
          bg-slate-900
          p-6
          hover:-translate-y-1
          hover:border-red-500
          transition-all
          duration-200
          block
          "
        >
          <p className="text-red-500">Occupied</p>
          <h2 className="mt-2 text-4xl font-bold text-orange-500">
            {occupied}
          </h2>
        </div>
        
        <div
          className="
          rounded-3xl
          border
          border-slate-800
          bg-slate-900
          p-6
          hover:-translate-y-1
          hover:border-green-500
          transition-all
          duration-200
          block
          "
        >
          <p className="text-green-500">Free</p>
          <h2 className="mt-2 text-4xl font-bold text-green-500">
            {free}
          </h2>
        </div>

        <div
          className="
          rounded-3xl
          border
          border-slate-800
          bg-slate-900
          p-6
          hover:-translate-y-1
          hover:border-orange-500
          transition-all
          duration-200
          block
          "
        >
          <p className="text-orange-500">Today's Departures</p>
          
          <h2 className="mt-2 text-4xl font-bold text-blue-500">
            {upcoming}
          </h2>
        </div>

      </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/parking"
            className="
            rounded-3xl
            border
            border-slate-800
            bg-slate-900
            p-8
            hover:border-orange-500
            hover:-translate-y-1
            transition-all
            duration-200
            "
          >
            <h2 className="text-2xl font-bold text-white">
              Active Parking
            </h2>

            <p className="mt-3 text-slate-400">
              View and manage currently occupied parking spots.
            </p>
          </Link>

          <Link
            to="/history"
            className="
            rounded-3xl
            border
            border-slate-800
            bg-slate-900
            p-8
            hover:border-orange-500
            hover:-translate-y-1
            transition-all
            duration-200
            "
          >
            <h2 className="text-2xl font-bold text-white">
              Parking History
            </h2>

            <p className="mt-3 text-slate-400">
              View past parking transactions and details.
            </p>
          </Link>
          <Link
            to="/upcoming-checkouts"
            className="
            rounded-3xl
            border
            border-slate-800
            bg-slate-900
            p-8
            hover:border-orange-500
            hover:-translate-y-1
            transition-all
            duration-200
            "
          >
            <h2 className="text-2xl font-bold text-white">
              Upcoming Departures
            </h2>

            <p className="mt-3 text-slate-400 ">
              View vehicles expected to leave soon.
            </p>
          </Link>
        </div>
        </div>

      </div>
      </div>
      
      <div className="mt-16 text-center text-slate-500 text-sm select-none">
        ParkPilot · Version 1.1.2 <br />
        <p className='pt-2 pb-5'>Matienzof6 | All Rights Reserved © 2026</p>
      </div>
      </div>
    
  );
}