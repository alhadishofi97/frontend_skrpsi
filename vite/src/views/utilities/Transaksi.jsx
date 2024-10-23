import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import { Button, TextField, Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

Modal.setAppElement('#root');

const TransaksiList = () => {
  const [transaksiData, setTransaksiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userData, setUserData] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);

  const EyeIcon = () => <FontAwesomeIcon icon={faEye} />;

  useEffect(() => {
    const fetchTransaksi = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await axios.get('https://backendapi.my.id/api/transaksi/all_transaksi', config);
        if (response.data.status === 'success') {
          setTransaksiData(response.data.data);
          setFilteredData(response.data.data);
        } else {
          throw new Error('Failed to fetch transaksi data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await axios.get('https://backendapi.my.id/api/users/get_all_users', config);
        if (response.data.status === 'success') {
          const users = response.data.data.reduce((acc, user) => {
            acc[user.id_user] = user.name;
            return acc;
          }, {});
          setUserData(users);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTransaksi();
    fetchUsers();
  }, []);

  useEffect(() => {
    const result = transaksiData.filter(item =>
      item.id_transaksi.toString().includes(search.toLowerCase()) ||
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.plat_motor.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(result);
  }, [search, transaksiData]);

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const openModal = async (row) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.get(`https://backendapi.my.id/api/transaksi/invoice/${row.id_transaksi}`, config);
      if (response.data.status === 'success') {
        setInvoiceData(response.data.data);
        setModalIsOpen(true);
      } else {
        throw new Error('Failed to fetch invoice data');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const columns = [
    { name: 'ID Transaksi', selector: row => row.id_transaksi, sortable: true, width: '25%' },
    { name: 'Nama', selector: row => row.nama, sortable: true },
    { name: 'Plat Motor', selector: row => row.plat_motor, sortable: true },
    { name: 'Tanggal', selector: row => new Date(row.tanggal).toLocaleString(), sortable: true, wrap: true },
    { name: 'Deskripsi', selector: row => row.deskripsi, wrap: true },
    { name: 'Grand Total', selector: row => formatRupiah(row.grand_total), sortable: true },
    { name: 'Created By', selector: row => userData[row.id_user] || 'Unknown', sortable: true },
    { name: 'Action',
      selector: (row) => 'Action',
      width: '250px',
      sortable: false,
      cell: (row) => (
        <div>
          <Button variant="outlined" onClick={() => openModal(row)} startIcon={<EyeIcon />}>
            View Detail
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Cari Transaksi Berdasarkan Nama atau Plat Motor"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DataTable
        title="Daftar Transaksi"
        columns={columns}
        data={filteredData}
        progressPending={loading}
        pagination
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Invoice Modal"
        style={{
          content: {
            fontFamily: 'Poppins',
            borderRadius: '20px',
            border: '2px solid gray',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            maxHeight: '80%',
            padding: '20px',
            overflowY: 'auto',
            zIndex: 1000, // Tambahkan z-index yang lebih tinggi
          },
          overlay: {
            zIndex: 999, // Pastikan overlay juga memiliki z-index yang lebih tinggi
          },
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontFamily:'Poppins', fontSize: '30px'}}><strong>INVOICE</strong></h2>
        {invoiceData.length > 0 && (
          <div style={{ marginBottom: '20px', fontFamily:'Poppins' }}>
            <p>ID Transaksi: <strong>{invoiceData[0].id_transaksi}</strong></p>
            <p>Bill To: <strong>{invoiceData[0].nama_kustomer}</strong></p>
            <p>Plat Motor: <strong>{invoiceData[0].plat_motor}</strong></p>
            <p>Mekanik: <strong>{invoiceData[0].nama_mekanik}</strong></p>
            <p>Diagnosis: <strong>{invoiceData[0].deskripsi}</strong></p>
            <p>Jenis Layanan: <strong>{invoiceData[0].jasa}</strong></p>
            <p>Tanggal: <strong>{new Date(invoiceData[0].tanggal).toLocaleDateString()}</strong></p>
            <p>Dibuat oleh: <strong>{userData[invoiceData[0].nama_kasir] || 'Unknown'}</strong></p>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Deskripsi</TableCell>
                  <TableCell>Jumlah</TableCell>
                  <TableCell>Harga</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.nama_barang}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatRupiah(item.harga)}</TableCell>
                    <TableCell>{formatRupiah(item.total)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="left"><strong>Ongkos Service :</strong></TableCell>
                  <TableCell><strong>{formatRupiah(invoiceData[0].ongkos)}</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} align="left"><strong>Grand Total :</strong></TableCell>
                  <TableCell><strong>{formatRupiah(invoiceData[0].grand_total)}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
        <Button onClick={closeModal} color="error" variant="contained">Close</Button>
      </Modal>
    </div>
  );
};

export default TransaksiList;
