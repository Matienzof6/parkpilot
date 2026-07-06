import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ParkingGrid from '../components/ParkingGrid';
import SpotDetailsPanel from '../components/SpotDetailsPanel';
import { Link } from 'react-router-dom';
export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActiveRecords = async () => {
    try {
      console.log('Fetching active parking records...');
      setLoading(true);
      const response = await api.get('/parking/active');
      setRecords(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const refreshActiveRecords = async () => {
    try {
      const response = await api.get('/parking/active');
      setRecords(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchActiveRecords();
  }, []);

  const handleSpotClick = (parking_spot, record = null) => {
    setSelectedSpot(record ? record : { parking_spot });
  };

  const handleCloseSpotDetails = () => {
    setSelectedSpot(null);
  };

  // Compute search results
  const getSearchResults = () => {
    if (!searchTerm.trim()) return null;

    const normalizedSearch = searchTerm.trim().toLowerCase();
    const matchingRecords = records.filter((record) => {
      const guestName = record.guest_name?.toLowerCase() || '';
      const roomNumber = record.room_number?.toString().toLowerCase() || '';
      const licensePlate = record.license_plate?.toLowerCase() || '';

      return (
        guestName.includes(normalizedSearch) ||
        roomNumber.includes(normalizedSearch) ||
        licensePlate.includes(normalizedSearch)
      );
    });

    return matchingRecords;
  };

  const searchResults = getSearchResults();

  // Handle scroll to parking spot
  const handleGoToSpot = (spotNumber) => {
    const spotElement = document.getElementById(`parking-spot-${spotNumber}`);
    if (spotElement) {
      spotElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading active parking...
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    
    <div className="min-h-screen text-white p-8 flex flex-col select-none" style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #ea580c 180%)",
        }}>
      <div className="flex-1">
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Active Parking
          </h1>

          <p className="text-slate-400 mt-2">
            Real-time occupancy overview.
          </p>
        </div>

        <Link
          to="/"
          className="
            rounded-xl
            bg-slate-900
            border
            border-slate-800
            px-4
            py-2
            hover:border-orange-500
            transition-all
          "
        >
          ← Dashboard
        </Link>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div
          className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
            p-5
          "
        >
          <p className="text-red-500 text-sm">
            Occupied
          </p>

          <p className="text-3xl font-bold text-red-500">
            {records.length}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
            p-5
          "
        >
          <p className="text-green-500 text-sm">
            Free
          </p>

          <p className="text-3xl font-bold text-green-500">
            {50 - records.length}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
            p-5
          "
        >
          <p className="text-orange-500 text-sm">
            Total Spots
          </p>

          <p className="text-3xl font-bold text-white">
            50
          </p>
        </div>
    </div>  
      <div className="mb-6">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search guest, room or plate..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-orange-500 transition"
        />
      </div>
      
      {/* Search Results Card */}
      {searchResults && (
        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          {searchResults.length === 0 ? (
            <div className="text-slate-400 text-center">
              No matching vehicles found.
            </div>
          ) : searchResults.length === 1 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Guest Name:</span>
                  <span className="text-white font-semibold">{searchResults[0].guest_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Room Number:</span>
                  <span className="text-white font-semibold">{searchResults[0].room_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">License Plate:</span>
                  <span className="text-white font-semibold">{searchResults[0].license_plate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Parking Spot:</span>
                  <span className="text-orange-500 font-semibold">Spot {searchResults[0].parking_spot}</span>
                </div>
              </div>
              <button
                onClick={() => handleGoToSpot(searchResults[0].parking_spot)}
                className="w-full mt-4 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 transition-colors"
              >
                Go to Spot
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-white font-semibold">
                {searchResults.length} vehicles found
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {searchResults.map((record) => (
                  <button
                    key={record.parking_spot}
                    onClick={() => handleGoToSpot(record.parking_spot)}
                    className="rounded-lg bg-slate-800 hover:bg-orange-600 text-white py-2 px-3 text-sm font-semibold transition-colors"
                  >
                    Spot {record.parking_spot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div
        className="
          rounded-3xl
          border
          border-slate-800
          bg-slate-900
          p-6
        "
      >
        <ParkingGrid
          records={records}
          searchTerm={searchTerm}
          onSpotClick={handleSpotClick}
        />
      </div>
      {selectedSpot && (
        <SpotDetailsPanel
          spot={selectedSpot}
          onClose={handleCloseSpotDetails}
          onVehicleAdded={fetchActiveRecords}
          onSuccess={handleCloseSpotDetails}
        />
      )}
      </div>
      <div className="mt-16 text-center text-slate-500 text-sm">
        ParkPilot · Version 1.1.2 <br />
        <p className='pt-2 pb-5'>Matienzof6 | All Rights Reserved © 2026</p>
      </div>
    </div>  
    
  );
}
