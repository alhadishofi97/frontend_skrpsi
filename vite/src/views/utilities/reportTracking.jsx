import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { Button, TextField } from '@mui/material';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const BarangList = () => {
  const [barangData, setBarangData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://backendapi.my.id/api/report/all_tracking', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        setBarangData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      }
      setLoading(false);
    };

    fetchData();
  }, []);


  const columns = [
    { name: 'ID', selector: row => row.id },
    { name: 'Nama Alur', selector: row => row.nama_alur},
    { name: 'ID Nota', selector: row => row.id_nota, format: row => row.id_nota || '-' },
    { name: 'Nama Supplier', selector: row => row.nama_supplier, format: row => row.nama_supplier || '-' },
    { name: 'Nama Barang', selector: row => row.nama_barang},
    { name: 'Quantity', selector: row => row.quantity},
    { name: 'Harga Beli', selector: row => row.harga_beli, format: row => row.harga_beli ? `Rp ${row.harga_beli.toLocaleString()}` : '-' },
    { name: 'Waktu Dibuat', selector: row => row.created_time, format: row => new Date(row.created_time).toLocaleString() }
  ];

  const exportToExcel = (apiData, fileName) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Menambahkan header
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nama Alur', key: 'nama_alur', width: 30 },
      { header: 'ID Nota', key: 'id_nota', width: 20 },
      { header: 'Nama Supplier', key: 'nama_supplier', width: 30 },
      { header: 'Nama Barang', key: 'nama_barang', width: 20 },
      { header: 'Quantity', key: 'quantity', width: 10 },
      { header: 'Harga Beli', key: 'harga_beli', width: 15 },
      { header: 'Waktu Dibuat', key: 'created_time', width: 20 },
    ];

    // Menambahkan data
    apiData.forEach(item => {
      worksheet.addRow(item);
    });

    // Menyimpan ke file
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, `${fileName}.xlsx`);
    });
  }

  // Memperbarui fungsi filterDataByDate untuk memastikan pemfilteran berdasarkan tanggal
  const filterDataByDate = (data, start, end) => {
    if (!start || !end) return data;
    const startDate = new Date(start);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    return data.filter(item => {
      const itemDate = new Date(item.created_time);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  // Handler untuk tombol Search
  const handleSearch = () => {
    if (!startDate || !endDate) {
      setFilteredData(barangData);
    } else {
      const filtered = filterDataByDate(barangData, startDate, endDate);
      setFilteredData(filtered);
    }
  };

  return (
    <div>
      <h1 style={{ marginLeft: '10px' }}>Daftar Barang</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', position: 'relative' }}>
        <div style={{ width: '40%', display: 'flex', gap: '15px', marginLeft: '10px' }}>
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Tanggal Mulai"
            dateFormat="dd/MM/yyyy"
            wrapperClassName="datePicker"
            customInput={<TextField fullWidth />}
          />
          <ReactDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Tanggal Akhir"
            dateFormat="dd/MM/yyyy"
            wrapperClassName="datePicker"
            customInput={<TextField fullWidth />}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
        </div>
        <Button variant="contained" color="primary" style={{ width: '10%' }} onClick={() => exportToExcel(filteredData, 'barang_data_filtered')}>Download Excel</Button>
      </div>
      {error && <p>{error}</p>}
      <DataTable
        columns={columns}
        data={filteredData}
        progressPending={loading}
        highlightOnHover
        responsive
        striped
      />
    </div>
  );
};

export default BarangList;
