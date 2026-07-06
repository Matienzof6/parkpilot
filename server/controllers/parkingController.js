const { createParkingRecord, getActiveParkingRecords, isParkingSpotOccupied, checkoutParkingRecord, getParkingHistory, updateExpiredParkingRecords, isLicensePlateActive, updateParkingRecord: updateParkingRecordService,} = require('../services/parkingService');
const updateParkingRecord = async (req, res) => {
  try {
    const { id } = req.params;

    await updateParkingRecordService(
      id,
      req.body
    );

    res.json({
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
async function addParkingRecord(req, res) {
  try {
    const {
      guest_name,
      room_number,
      license_plate,
      parking_spot,
      check_in_date,
      check_out_date,
      parking_fee,
    } = req.body;

    if (
      !guest_name ||
      !room_number ||
      !license_plate ||
      !parking_spot ||
      !check_in_date ||
      !check_out_date ||
      parking_fee === undefined ||
      parking_fee === null
    ) {
      return res.status(400).json({
        success: false,
        message:
          'guest_name, room_number, license_plate, parking_spot, check_in_date, check_out_date, and parking_fee are required',
      });
    }

    // check if parking spot is occupied
    const occupied = await isParkingSpotOccupied(parking_spot);
    if (occupied) {
      return res.status(400).json({
        success: false,
        message: 'Parking spot already occupied',
      });
    }

    // check if license plate already has an active parking record    
    const licensePlateActive = await isLicensePlateActive(license_plate);
    if (licensePlateActive) {
      return res.status(400).json({
        success: false,
        message: 'License plate already has an active parking record',
      });
    }
    
    const parkingRecord = await createParkingRecord({
      guest_name,
      room_number,
      license_plate,
      parking_spot,
      check_in_date,
      check_out_date,
      parking_fee,
    });

    return res.status(201).json({
      success: true,
      data: parkingRecord,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create parking record',
    });
  }
}

async function getActiveParking(req, res) {
  try {
    await updateExpiredParkingRecords();
    const activeParkingRecords = await getActiveParkingRecords();

    return res.status(200).json({
      success: true,
      data: activeParkingRecords,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch active parking records',
    });
  }
}

async function checkoutParking(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'id is required',
      });
    }

    const checkoutResult = await checkoutParkingRecord(id);
    // checkoutResult expected to be number of rows updated (or truthy value)
    if (!checkoutResult || checkoutResult === 0) {
      return res.status(404).json({
        success: false,
        message: 'Parking record not found or already checked out',
      });
    }

    return res.status(200).json({
      success: true,
      data: checkoutResult,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to checkout parking record',
    });
  }
}

async function getParkingHistoryController(req, res) {
  try {
    const parkingHistory = await getParkingHistory();

    return res.status(200).json({
      success: true,
      data: parkingHistory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch parking history',
    });
  }
}

module.exports = {
  addParkingRecord,
  getActiveParking,
  checkoutParking,
  getParkingHistoryController,
  updateParkingRecord,
};
