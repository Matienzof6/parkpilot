import React from "react";

const ParkingGrid = ({ records = [], searchTerm = '', onSpotClick = () => {} }) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const hasSearch = normalizedSearch.length > 0;

  const spots = Array.from({ length: 50 }, (_, index) => {
    const number = index + 1;
    const record = records.find((item) => {
      const spotValue = item?.parking_spot;
      return Number(spotValue) === number;
    });
    const occupied = Boolean(record && record.license_plate);
    const bgClass = occupied ? "bg-red-600" : "bg-emerald-500";
    const hoverClass = occupied
      ? "hover:bg-red-700"
      : "hover:bg-emerald-600";

    const matchesSearch = occupied && normalizedSearch
      ? [record.guest_name, record.room_number, record.license_plate]
          .some((value) =>
            value?.toString().toLowerCase().includes(normalizedSearch)
          )
      : false;

    const highlightClasses = matchesSearch
      ? "ring-2 ring-orange-500 shadow-2xl scale-105"
      : hasSearch
      ? "opacity-60"
      : "";

    return (
      <button
        key={number}
        id={`parking-spot-${number}`}
        type="button"
        onClick={() => onSpotClick(number, record)}
        className={`w-full rounded-2xl p-4 text-left text-white shadow-lg transition transform duration-200 ease-out ${bgClass} ${hoverClass} hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer ${highlightClasses}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold">Spot {number}</div>
            <div className="text-sm text-white/80">
              {occupied ? "Occupied" : "Available"}
            </div>
          </div>
          <div className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
            {occupied ? "Taken" : "Free"}
          </div>
        </div>

        {occupied && (
          <div className="mt-3 text-sm text-white/90">
            <div>
              <span className="font-medium">Plate:</span>{" "}
              {record.license_plate || "N/A"}
            </div>
            <div className="mt-1">
              <span className="font-medium">Record:</span>{" "}
              {record.guest_name ?? "Unknown"}
            </div>
          </div>
        )}
      </button>
    );
  });

  return (
    <div className="p-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {spots}
      </div>
    </div>
  );
};

export default ParkingGrid;
