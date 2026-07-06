import React, { useEffect, useState } from 'react';
import api from '../services/api';

const SpotDetailsPanel = ({ spot, onClose, onVehicleAdded, onSuccess }) => {
  const [modalMode, setModalMode] = useState('details');
  const [formData, setFormData] = useState({
    parking_spot: spot?.parking_spot ?? '',
    guest_name: '',
    room_number: '',
    license_plate: '',
    check_in_date: '',
    check_out_date: '',
    parking_fee: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const handleEdit = () => {
    setModalMode('edit');

    setFormData({
      parking_spot: spot.parking_spot ?? '',
      guest_name: spot.guest_name ?? '',
      room_number: spot.room_number ?? '',
      license_plate: spot.license_plate ?? '',
      check_in_date: spot.check_in_date ?? '',
      check_out_date: spot.check_out_date ?? '',
      parking_fee: spot.parking_fee ?? '',
    });
  };
  useEffect(() => {
    if (spot) {
      setFormData((prev) => ({
        ...prev,
        parking_spot: spot.parking_spot,
      }));
    }
  }, [spot]);

  if (!spot) return null;

  const occupied = Boolean(spot.license_plate);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === 'license_plate') {
      formattedValue = value
        .toUpperCase()
        .replace(/\s+/g, '');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    setErrors((prev) => {
      if (!prev[name]) return prev;

      const { [name]: removed, ...rest } = prev;

      return rest;
    });
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.guest_name.trim()) {
      newErrors.guest_name = 'Guest name is required.';
    }
    if (!data.license_plate.trim()) {
      newErrors.license_plate = 'License plate is required.';
    }
    if (!data.check_in_date) {
      newErrors.check_in_date = 'Check in date is required.';
    }
    if (!data.check_out_date) {
      newErrors.check_out_date = 'Check out date is required.';
    }
    if (data.check_in_date && data.check_out_date) {
      const checkIn = new Date(data.check_in_date);
      const checkOut = new Date(data.check_out_date);
      if (checkOut < checkIn) {
        newErrors.check_out_date = 'Check out date cannot be earlier than check in date.';
      }
    }

    if (
      data.parking_fee === '' ||
      data.parking_fee === null ||
      data.parking_fee === undefined
    ) {
      newErrors.parking_fee =
        'Parking fee is required.';
    } else {
      const chargedValue = Number(
        data.parking_fee
      );

      if (
        Number.isNaN(chargedValue) ||
        chargedValue < 0 ||
        chargedValue > 100
      ) {
        newErrors.parking_fee =
          'Parking fee must be between 0 and 100.';
      }
    }

    return newErrors;
  };

  const handleAddVehicleClick = () => {
    setModalMode('add');
    setFormData((prev) => ({
      ...prev,
      parking_spot: spot.parking_spot,
      parking_fee: '10',
    }));
    setErrors({});
  };

  const handleCheckout = async () => {
    try {
      const response = await api.put(`/parking/${spot.id}/checkout`);
      console.log('Parking checkout response:', response.data);
      if (onVehicleAdded) {
        await onVehicleAdded();
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Parking checkout failed:', error.response ?? error);
    }
  };

  const handleBackToDetails = () => {
    setModalMode('details');
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      parking_spot: formData.parking_spot,
      guest_name: formData.guest_name,
      room_number: formData.room_number ? Number(formData.room_number) : null,
      license_plate: formData.license_plate,
      check_in_date: formData.check_in_date,
      check_out_date: formData.check_out_date,
      parking_fee: Number(formData.parking_fee),
    };

    console.log('Add Vehicle payload:', payload);

    try {
        setIsSubmitting(true);

        let response;

        if (modalMode === 'edit') {
          response = await api.put(
            `/parking/${spot.id}`,
            payload
          );
        } else {
          response = await api.post(
            '/parking',
            payload
          );
        }

        console.log(response.data);

        if (onVehicleAdded) {
          await onVehicleAdded();
        }

        if (onSuccess) {
          onSuccess();
        }

      } catch (error) {
        setSubmitError(
          error.response?.data?.message ||
          'Failed to save vehicle'
        );
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl text-slate-900">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Close
        </button>
      

        {modalMode === 'details' ? (
          <>
            <div className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Spot details
            </div>
            <div className="mt-4 text-2xl font-semibold">Spot {spot.parking_spot}</div>
            <div className="mt-6 grid gap-4 text-sm text-slate-700">
              <div>
                <span className="font-semibold">Status:</span>{' '}
                {occupied ? 'Occupied' : 'Available'}
              </div>

              {occupied ? (
                <>
                  <div>
                    <span className="font-semibold">Guest name:</span>{' '}
                    {spot.guest_name ?? 'Unknown'}
                  </div>
                  <div>
                    <span className="font-semibold">Room number:</span>{' '}
                    {spot.room_number ?? 'Unknown'}
                  </div>
                  <div>
                    <span className="font-semibold">License plate:</span>{' '}
                    {spot.license_plate}
                  </div>
                  <div>
                    <span className="font-semibold">Check in:</span>{' '}
                    {new Date(spot.check_in_date).toLocaleString(
                        'es-ES',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        }
                      ) ?? 'N/A'}
                  </div>
                  <div>
                    <span className="font-semibold">Check out:</span>{' '}
                    {new Date(spot.check_out_date).toLocaleString(
                        'es-ES',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }
                      ) ?? 'N/A'}
                  </div>
                  <div>
                    <span className="font-semibold">Parking Fee (€):</span>{' '}
                    {spot.parking_fee ?? 'N/A'}
                  </div>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="
                      mt-4
                      w-full
                      rounded-full
                      bg-slate-700
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-white
                      hover:bg-slate-600
                    "
                  >
                    Edit Vehicle
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Checkout ${spot.guest_name} (${spot.license_plate}) ?`
                      );

                      if (confirmed) {
                        handleCheckout();
                      }
                    }}
                    className="mt-4 w-full rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                  >
                    Checkout Vehicle
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleAddVehicleClick}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Add Vehicle
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-sm uppercase tracking-[0.3em] text-slate-500">
              {modalMode === 'edit'
                ? `Edit vehicle in spot ${spot.parking_spot}`
                : `Add vehicle to spot ${spot.parking_spot}`}
            </div>
            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              {submitError && (
                  <div className="mb-3 rounded-lg bg-red-100 p-3 text-sm text-red-700">
                    {submitError}
                  </div>
                )}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Guest name
                </label>
                <input
                  type="text"
                  name="guest_name"
                  value={formData.guest_name}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${errors.guest_name ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-slate-500 focus:ring-slate-500/20'}`}
                  placeholder="Guest name"
                />
                {errors.guest_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.guest_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Room number
                </label>
                <input
                  type="text"
                  name="room_number"
                  value={formData.room_number}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20"
                  placeholder="Room number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  License plate
                </label>
                <input
                  type="text"
                  name="license_plate"
                  value={formData.license_plate}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${errors.license_plate ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-slate-500 focus:ring-slate-500/20'}`}
                  placeholder="License plate"
                />
                {errors.license_plate && (
                  <p className="mt-1 text-sm text-red-600">{errors.license_plate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Check in date
                </label>
                <input
                  type="date"
                  name="check_in_date"
                  value={formData.check_in_date}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 ${errors.check_in_date ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-slate-500 focus:ring-slate-500/20'}`}
                />
                {errors.check_in_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.check_in_date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Check out date
                </label>
                <input
                  type="datetime-local"
                  name="check_out_date"
                  value={formData.check_out_date}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 ${errors.check_out_date ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-slate-500 focus:ring-slate-500/20'}`}
                />
                {errors.check_out_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.check_out_date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Parking Fee (€)
                </label>
                <input
                  type="number"
                  name="parking_fee"
                  value={formData.parking_fee}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="1"
                  className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${errors.parking_fee ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-slate-500 focus:ring-slate-500/20'}`}
                  placeholder="Parking Fee"
                />
                {errors.parking_fee && (
                  <p className="mt-1 text-sm text-red-600">{errors.parking_fee}</p>
                )}
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  onClick={handleBackToDetails}
                  className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SpotDetailsPanel;
