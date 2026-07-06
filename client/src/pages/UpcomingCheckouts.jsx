import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
export default function UpcomingCheckouts() {
  const [records, setRecords] = useState([]);
  const [checkoutFilter, setCheckoutFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const response = await api.get('/parking/active');

        const sortedRecords = [...response.data.data].sort(
          (a, b) =>
            new Date(a.check_out_date) -
            new Date(b.check_out_date)
        );

        setRecords(sortedRecords);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-white p-8">Loading upcoming departures...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col">Error: {error}</div>;
  }
  const filteredRecords = records.filter((record) => {
    if (!checkoutFilter) {
      return true;
    }

    const recordDate =
      record.check_out_date?.split('T')[0];

    return recordDate === checkoutFilter;
  });
    const totalUpcoming = filteredRecords.length;
  return (
    <PageContainer>
    <div className="min-h-screen  text-white p-8 flex flex-col">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8 ">

          <div>
            <h1 className="text-4xl font-bold text-white ">
              Upcoming Departures
            </h1>

            <p className="text-slate-400 mt-2">
              Vehicles scheduled to leave.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 select-none">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm">
              Upcoming Vehicles
            </p>

            <p className="text-3xl font-bold text-orange-500">
              {records.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm">
              Filtered Results
            </p>

            <p className="text-3xl font-bold text-green-500">
              {filteredRecords.length}
            </p>
          </div>

        </div>
        <div className="mb-6 select-none">
            <input
                type="date"
                value={checkoutFilter}
                onChange={(e) => setCheckoutFilter(e.target.value)}
                className="
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900
                  px-3
                  py-2
                  text-white
                "
            />
        </div>

      {records.length === 0 ? (
        <div>No upcoming checkouts.</div>
      ) : (
        <div className="space-y-3">
          <div className="overflow-x-auto rounded-2xl border border-slate-800">

            <table className="w-full text-left ">

              <thead className="bg-slate-900 select-none">
                <tr>
                  <th className="p-4">Guest</th>
                  <th className="p-4">Room</th>
                  <th className="p-4">Plate</th>
                  <th className="p-4">Spot</th>
                  <th className="p-4">Departure</th>
                </tr>
              </thead>

              <tbody>

                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="
                      border-t
                      border-slate-800
                      hover:bg-slate-900
                      transition-colors
                    "
                  >
                    <td className="p-4">{record.guest_name}</td>
                    <td className="p-4">{record.room_number}</td>
                    <td className="p-4">{record.license_plate}</td>
                    <td className="p-4">{record.parking_spot}</td>
                    <td className="p-4">
                      {new Date(record.check_out_date).toLocaleString(
                        'es-ES',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }
                      )}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        </div>
      )}
      </div>
      <div className="mt-16 text-center text-slate-500 text-sm">
        ParkPilot · Version 1.1.2 <br />
        <p className='pt-2 pb-5'>Matienzof6 | All Rights Reserved © 2026</p>
      </div>
    </div>
    </PageContainer>
  );
}