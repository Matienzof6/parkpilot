import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
export default function History() {
  const [records, setRecords] = useState([]);
  const [guestFilter, setGuestFilter] = useState('');
  const [roomFilter, setRoomFilter] = useState('');
  const [plateFilter, setPlateFilter] = useState('');
  const [checkoutFilter, setCheckoutFilter] = useState('');
  const [checkinFilter, setCheckinFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/parking/history');
        setRecords(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-white p-8">Loading history...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-slate-950 text-white p-8">Error: {error}</div>;
  }
  const filteredRecords = records.filter((record) => {
    const guestMatch =
        record.guest_name
        ?.toLowerCase()
        .includes(guestFilter.toLowerCase());

    const roomMatch =
            roomFilter === '' ||
            String(record.room_number).includes(roomFilter);

    const plateMatch =
            record.license_plate
            ?.toLowerCase()
            .includes(plateFilter.toLowerCase());
    const checkinMatch =
            record.check_in_date
                ?.toLowerCase()
                .includes(checkinFilter.toLowerCase());

    const checkoutMatch =
            record.check_out_date
            ?.toLowerCase()
            .includes(checkoutFilter.toLowerCase());

        return (
            guestMatch &&
            roomMatch &&
            plateMatch &&
            checkinMatch &&
            checkoutMatch
        );
  });
  const formatDate = (dateString) => {
    if (!dateString) return '-';

    return new Date(dateString).toLocaleString(
      'es-ES',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    );
  };
  return (
    <PageContainer> 
    <div className="min-h-screen  text-white p-8 flex flex-col ">
      <div className="flex-1 ">
        <Link
            to="/"
            className=" select-none mb-4 inline-block rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-slate-600"
            >
            ← Dashboard
        </Link>
      <h1 className="select-none mb-6 text-3xl font-bold">
        Parking History
      </h1>
      <div className="mb-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">

        <input
            type="text"
            placeholder="Guest name"
            value={guestFilter}
            onChange={(e) => setGuestFilter(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
        />

        <input
            type="text"
            placeholder="Room number"
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
        />

        <input
            type="text"
            placeholder="License plate"
            value={plateFilter}
            onChange={(e) => setPlateFilter(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
        />

        <input
            type="date"
            value={checkinFilter}
            onChange={(e) => setCheckinFilter(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
        />

        <input
            type="date"
            value={checkoutFilter}
            onChange={(e) => setCheckoutFilter(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
        />

        

        </div>


      {records.length === 0 ? (
        <div>No parking history found.</div>
      ) : (
        <div className="space-y-3">
          <div className="overflow-x-auto rounded-2xl border border-slate-800">

            <table className="w-full text-left">

              <thead className="bg-slate-900">
                <tr>
                  <th className="p-4">Guest</th>
                  <th className="p-4">Room</th>
                  <th className="p-4">Plate</th>
                  <th className="p-4">Spot</th>
                  <th className="p-4">Check In</th>
                  <th className="p-4">Check Out</th>
                </tr>
              </thead>

              <tbody>

                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-t border-slate-800 hover:bg-slate-900"
                  >
                    <td className="p-4">{record.guest_name}</td>
                    <td className="p-4">{record.room_number}</td>
                    <td className="p-4">{record.license_plate}</td>
                    <td className="p-4">{record.parking_spot}</td>
                    <td className="p-4">{formatDate(record.check_in_date)}</td>
                    <td className="p-4">
                      <div>{formatDate(record.check_out_date)}</div>

                      {record.actual_check_out_date &&
                        new Date(record.actual_check_out_date) <
                          new Date(record.check_out_date) && (
                          <div className="mt-2 rounded-lg bg-orange-500/10 border border-orange-500/20 p-2">
                            <div className="text-orange-400 text-xs uppercase tracking-wide">
                              Early Checkout
                            </div>

                            <div className="text-slate-300 text-sm mt-1">
                              Actual departure:{' '} {formatDate(record.actual_check_out_date)}
                            </div>
                          </div>
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