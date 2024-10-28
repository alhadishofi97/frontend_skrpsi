import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { width } from '@mui/system';
import { IconPencil } from '@tabler/icons-react';
import { walkObjectDeep } from '@mui/system/cssVars/cssVarsParser';
import MuiAlert from '@mui/material/Alert'; // Pastikan Anda mengimpor Alert

Modal.setAppElement('#root');

const BarangList = () => {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [barangData, setBarangData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typesMotor, setTypesMotor] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    part_no: '',
    nama_barang: '',
    id_kategori_barang: '',
    id_type_motor: '',
    jumlah_digudang: 0, // Set default value to 0
    jumlah_ditoko: 0,   // Set default value to 0
    lokasi_rak: '',
    deskripsi: '',
    harga: '',
    delete_status: 0,
    edited_by: ''
  });
  const [editingItem, setEditingItem] = useState(null); // State to track which item is being edited
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteSnackbar, setDeleteSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPindahModalOpen, setIsPindahModalOpen] = useState(false);
  const [pindahQuantity, setPindahQuantity] = useState(0);
  const [selectedPindahRow, setSelectedPindahRow] = useState(null);
  const [pindahSnackbar, setPindahSnackbar] = useState(false); // State untuk Snackbar pindah
  const [errorSnackbar, setErrorSnackbar] = useState(false); // State untuk Snackbar error

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  //   setOpen1(false);
  //   setOpenError(false);
  // };

  const columns = [
    { name: 'Part No', selector: (row) => row.part_no, sortable: true, wrap: true },
    { name: 'Nama Barang', selector: (row) => row.nama_barang, sortable: true, wrap: true },
    { name: 'Jumlah di Gudang', selector: (row) => row.jumlah_digudang, sortable: true, wrap: true},
    { name: 'Pindah barang ke toko', selector: (row) => row.jumlah_digudang, wrap: true, 
      format: (row) => (
        <div>
          <Button variant="outlined" onClick={() => handlePindahBarang(row)}>
            {row.jumlah_digudang}
          </Button>
        </div>  
    )},
    { name: 'Jumlah di Toko', selector: (row) => row.jumlah_ditoko, sortable: true, wrap: true },
    { name: 'Lokasi Rak', selector: (row) => row.lokasi_rak, sortable: true },
    { name: 'Deskripsi', selector: (row) => row.deskripsi, sortable: true, wrap: true },
    { name: 'Harga Jual', selector: (row) => row.harga, sortable: true, format: (row) => formatRupiah(row.harga_jual) },
    { name: 'Harga Beli', selector: (row) => row.harga_beli, sortable: true, format: (row) => formatRupiah(row.harga_beli) },
    { name: 'Kategori', selector: (row) => row.kategori_barang?.nama_kategori_barang, sortable: true },
    { name: 'Tipe Motor', selector: (row) => row.type_motor?.type_motor, sortable: true },
    {
      name: 'Action',
      selector: (row) => 'Action',
      width: '275px',
      sortable: false,
      format: (row) => (
        <div>
          <Button variant="outlined" onClick={() => handleEdit(row)} style={{ marginRight: '10px' }} startIcon={<IconPencil />}>
            Edit
          </Button>
          <Button variant="outlined" onClick={() => openDeleteDialog(row)} startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  // Open the delete dialog
  const openDeleteDialog = (row) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  // Handle the deletion after confirmation
  const handleDelete = async () => {
    if (selectedRow) { // Make sure there is a selected row 
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.delete(`https://backendapi.my.id/api/barang/delete_barang/${selectedRow.id_barang}`, config);
        if (response.data.status === 'success') {
          setDeleteSnackbar(true);
          const updatedBarangData = await axios.get('https://backendapi.my.id/api/barang/all_barang', config);
          setBarangData(updatedBarangData.data.data);
          setFilteredData(updatedBarangData.data.data);
        } else {
          alert('Failed to delete barang.');
        }
      } catch (error) {
        console.error('Error deleting barang:', error);
        alert('Failed to delete barang.');
      } finally {
        setDeleteDialogOpen(false); // Close the dialog
      }
    }

  };

  // Close the dialog without deleting
  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
    setOpenError(false);
  };

  const handleSave = async () => {
    if (!formData.part_no || !formData.nama_barang || !formData.harga || !formData.id_kategori_barang || !formData.id_type_motor) {
      setOpenError(true); // Ganti alert dengan snackbar
      setErrorMessage('Please fill in all required fields'); // Set pesan kesalahan
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log(token);
      // Set up headers with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      if (editingItem) {
        // Update existing item
        console.log(formData);
        const response = await axios.put(`https://backendapi.my.id/api/barang/update_barang/${editingItem.id_barang}`, formData, config 
        );

        if (response.data.status === 'success') {
          setOpen(true);
        } else {
          throw new Error('Failed to update barang');
        }
      } else {
        // Create new item
        const barangResponse = await axios.post('https://backendapi.my.id/api/barang/create_barang', {
          ...formData,
          jumlah_digudang: 0, // Set default value to 0
          jumlah_ditoko: 0    // Set default value to 0
        }, config);

        if (barangResponse.data.status === 'success') {
          setOpen(true);
        } else {
          throw new Error('Failed to create barang');
        }
      }

      // Fetch and update the barang data
      const updatedBarangData = await axios.get('https://backendapi.my.id/api/barang/all_barang', config);
      setBarangData(updatedBarangData.data.data);
      setFilteredData(updatedBarangData.data.data);

      // Close the modal
      closeModal();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setOpenError(true);
      } else {
        console.error('Error saving data:', error);
        alert('Failed to save data');
      }
    }
  };

  const handleEdit = (row) => {
    setEditingItem(row);
    setFormData({
      part_no: row.part_no,
      nama_barang: row.nama_barang,
      id_kategori_barang: row.id_kategori_barang,
      id_type_motor: row.id_type_motor,
      jumlah_digudang: row.jumlah_digudang,
      jumlah_ditoko: row.jumlah_ditoko,
      lokasi_rak: row.lokasi_rak,
      deskripsi: row.deskripsi,
      harga: row.harga || '', // Pastikan harga terisi
      delete_status: row.delete_status,
      edited_by: row.edited_by
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Set up headers with the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        // Fetch supplier data
        const supplierResponse = await axios.get('https://backendapi.my.id/api/barang/all_barang', config);
        if (supplierResponse.data.status === 'success') {
          setBarangData(supplierResponse.data.data);
          setFilteredData(supplierResponse.data.data);
        } else {
          setError('Failed to fetch data');
        }

        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data. Please check your network connection.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const filtered = barangData.filter((item) => {
      return (
        (item.part_no && item.part_no.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.nama_barang && item.nama_barang.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.lokasi_rak && item.lokasi_rak.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.deskripsi && item.deskripsi.toLowerCase().includes(filterText.toLowerCase())) ||
        String(item.harga).includes(filterText) ||
        (item.kategori_barang?.nama_kategori_barang &&
          item.kategori_barang.nama_kategori_barang.toLowerCase().includes(filterText.toLowerCase()))
      );
    });
    setFilteredData(filtered);
  }, [filterText, barangData]);

  const openModal = () => {
    setEditingItem(null); // Clear editing state when opening the modal
    setFormData({
      part_no: '',
      nama_barang: '',
      id_kategori_barang: '',
      id_type_motor: '',
      // jumlah_digudang: '',
      // jumlah_ditoko: '',
      lokasi_rak: '',
      deskripsi: '',
      // foto_barang: '',
      harga: '',
      delete_status: 0,
      edited_by: ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchTypesMotor = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.get('https://backendapi.my.id/api/type-motor/all_motor', config);
        if (response.data.status === 'success') {
          setTypesMotor(response.data.data);
        } else {
          console.error('Failed to fetch types motor');
        }
      } catch (error) {
        console.error('Error fetching types motor:', error);
      }
    };

    fetchTypesMotor();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.get('https://backendapi.my.id/api/kategori-barang/all/kategori/barang', config);
        if (response.data.status === 'success') {
          setCategories(response.data.data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handlePindahBarang = (row) => {
    setSelectedPindahRow(row);
    setIsPindahModalOpen(true);
  };

  const handlePindahSubmit = async () => {
    if (selectedPindahRow) {
      // Validasi untuk memastikan stok gudang tidak kurang dari jumlah yang dipindahkan
      if (pindahQuantity > selectedPindahRow.jumlah_digudang) {
        setErrorSnackbar(true); // Tampilkan Snackbar error
        return; // Hentikan eksekusi jika validasi gagal
      }

      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.put(
          `https://backendapi.my.id/api/barang/update_stock/${selectedPindahRow.id_barang}`,
          { jumlah_inputstok: pindahQuantity, 
            created_by: localStorage.getItem('username') },
          config
        );

        if (response.data.status === 'success') {
          setPindahSnackbar(true); // Tampilkan Snackbar
          setIsPindahModalOpen(false);
          
          // Perbarui data barang secara otomatis
          const updatedBarangData = await axios.get('https://backendapi.my.id/api/barang/all_barang', config);
          setBarangData(updatedBarangData.data.data);
          setFilteredData(updatedBarangData.data.data);
        } else {
          alert('Failed to update stock');
        }
      } catch (error) {
        console.error('Error updating stock:', error);
        alert('Failed to update stock');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>List Barang Supplier</h1>
      {/* <button variant="contained" onClick={openModal} style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}>
        {editingItem ? 'Update Barang' : 'Create Barang'}
      </button> */}
      <Button variant="contained" onClick={() => openModal()} style={{ marginBottom: '20px' }}>
      {editingItem ? 'Update Barang' : 'Create Barang'}
      </Button>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Cari berdasarkan Part No, Nama Barang, Lokasi Rak, Deskripsi, Harga, atau Kategori"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
      </div>
      <DataTable columns={columns} data={filteredData} pagination highlightOnHover responsive striped />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create/Update Barang"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            padding: '20px'
          }
        }}
      >
        <h2>{editingItem ? 'Update Barang' : 'Create Barang'}</h2>
        <form>
          <input
            name="part_no"
            placeholder="Part No"
            value={formData.part_no}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            name="nama_barang"
            placeholder="Nama Barang"
            value={formData.nama_barang}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <select
            name="id_kategori_barang"
            value={formData.id_kategori_barang}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          >
            <option value="">Pilih Kategori Barang</option>
            {categories.map((category) => (
              <option key={category.id_kategori_barang} value={category.id_kategori_barang}>
                {category.nama_kategori_barang}
              </option>
            ))}
          </select>
          <select
            name="id_type_motor"
            value={formData.id_type_motor}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          >
            <option value="">Pilih Tipe Motor</option>
            {typesMotor.map((type) => (
              <option key={type.id_type_motor} value={type.id_type_motor}>
                {type.type_motor}
              </option>
            ))}
          </select>
          {/* <input
            name="jumlah_digudang"
            placeholder="Jumlah di Gudang"
            value={formData.jumlah_digudang}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          /> */}
          {/* <input
            name="jumlah_ditoko"
            placeholder="Jumlah di Toko"
            value={formData.jumlah_ditoko}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          /> */}
          <input
            name="lokasi_rak"
            placeholder="Lokasi Rak"
            value={formData.lokasi_rak}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            name="deskripsi"
            placeholder="Deskripsi"
            value={formData.deskripsi}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            name="harga"
            placeholder="Harga Jual"
            value={formData.harga}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
        </form>
        <Button variant="contained" onClick={handleSave} style={{ padding: '10px', fontSize: '16px' }}>
          {editingItem ? 'Update' : 'Save'}
        </Button>
        <Button variant="contained" color='error' onClick={closeModal} style={{ padding: '10px', fontSize: '16px', marginLeft: '10px' }}>
          Cancel
        </Button>
      </Modal>

      
      <div>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
            {editingItem ? 'Successfully updated barang' : 'Successfully created barang'}
          </Alert>
        </Snackbar>
        <Snackbar open={openError} autoHideDuration={3000} onClose={() => setOpenError(false)}>
          <Alert onClose={() => setOpenError(false)} severity="error" variant="filled" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleClose}
        aria-labelledby="alert-dialog-description" 
        aria-describedby='alert-dialog-description'>

        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete barang <strong>"{selectedRow?.nama_barang}"</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={deleteSnackbar} autoHideDuration={3000} onClose={() => setDeleteSnackbar(false)}>
          <Alert onClose={handleClose} severity="success" variant="filled" >
            Barang deletd successfully!
          </Alert>
        </Snackbar>
      <Modal
        isOpen={isPindahModalOpen}
        onRequestClose={() => setIsPindahModalOpen(false)}
        contentLabel="Pindah Barang"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            padding: '20px'
          }
        }}
      >
        <h2>Pindah Barang ke Toko</h2>
        <form>
          <input
            type="number"
            placeholder="Jumlah Kuantitas"
            value={pindahQuantity}
            onChange={(e) => setPindahQuantity(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
        </form>
        <Button variant="contained" onClick={handlePindahSubmit} style={{ padding: 'auto', fontSize: 'auto' }}>
          Pindah Barang
        </Button>
        <Button variant="contained" color='error' onClick={() => setIsPindahModalOpen(false)} style={{ padding: 'auto', fontSize: 'auto', marginLeft: '10px' }}>
          Cancel
        </Button>
      </Modal>
      <Snackbar open={pindahSnackbar} autoHideDuration={3000} onClose={() => setPindahSnackbar(false)}>
        <MuiAlert onClose={() => setPindahSnackbar(false)} severity="success" variant="filled">
          Stock toko updated successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar open={errorSnackbar} autoHideDuration={3000} onClose={() => setErrorSnackbar(false)}>
        <MuiAlert onClose={() => setErrorSnackbar(false)} severity="error" variant="filled">
          Jumlah pindah tidak boleh lebih besar dari stok di gudang.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default BarangList;
