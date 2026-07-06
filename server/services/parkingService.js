const db = require('../database/db');

function createParkingRecord(record) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO parking_records (
      guest_name,
      room_number,
      license_plate,
      parking_spot,
      check_in_date,
      check_out_date,
      parking_fee,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      record.guest_name,
      record.room_number,
      record.license_plate,
      record.parking_spot,
      record.check_in_date,
      record.check_out_date,
      record.parking_fee,
      'active'
    ];

    db.run(sql, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.lastID);
    });
  });
}

function getActiveParkingRecords() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM parking_records WHERE status = 'active' ORDER BY parking_spot ASC`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function isParkingSpotOccupied(parking_spot) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 1 FROM parking_records WHERE parking_spot = ? AND status = 'active' LIMIT 1`;
    db.get(sql, [parking_spot], (err, row) => {
      if (err) return reject(err);
      resolve(!!row);
    });
  });
}

function checkoutParkingRecord(record_id) {
  return new Promise((resolve, reject) => {

    const actualCheckoutDate =
      new Date()
        .toLocaleString('sv-SE', {
          timeZone: 'Europe/Madrid'
        })
        .replace(' ', 'T');

    const sql = `
      UPDATE parking_records
      SET
        status = 'checked_out',
        actual_check_out_date = ?
      WHERE id = ?
    `;

    db.run(
      sql,
      [actualCheckoutDate, record_id],
      function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          success: this.changes > 0,
          changes: this.changes
        });
      }
    );
  });
}

function getParkingHistory() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM parking_records WHERE status = 'checked_out' ORDER BY created_at DESC`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function updateExpiredParkingRecords() {
  const now = new Date();

  const spainNow = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);

  const localNow = spainNow.replace(' ', 'T');


  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE parking_records
      SET status = 'checked_out'
      WHERE status = 'active'
      AND check_out_date < ?
    `;

    db.run(sql, [localNow], function (err) {
      if (err) {
        return reject(err);
      }
      resolve({
        success: true,
        changes: this.changes,
      });
    });
  });
}

function isLicensePlateActive(license_plate) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 1 FROM parking_records WHERE license_plate = ? AND status = 'active' LIMIT 1`;
    db.get(sql, [license_plate], (err, row) => {
      if (err) return reject(err);
      resolve(!!row);
    });
  });
}
function updateParkingRecord(id, record) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE parking_records
      SET
        guest_name = ?,
        room_number = ?,
        license_plate = ?,
        parking_spot = ?,
        check_in_date = ?,
        check_out_date = ?,
        parking_fee = ?
      WHERE id = ?
    `;

    db.run(
      sql,
      [
        record.guest_name,
        record.room_number,
        record.license_plate,
        record.parking_spot,
        record.check_in_date,
        record.check_out_date,
        record.parking_fee,
        id,
      ],
      function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          success: this.changes > 0,
        });
      }
    );
  });
}

module.exports = {
  createParkingRecord,
  getActiveParkingRecords,
  isParkingSpotOccupied,
  checkoutParkingRecord,
  getParkingHistory,
  updateExpiredParkingRecords,
  isLicensePlateActive,
  updateParkingRecord,
};
