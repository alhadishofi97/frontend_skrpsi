import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconPencil } from '@tabler/icons-react';

Modal.setAppElement('#root');

const SupplierList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama_supplier: '',
    no_telp: '',
    alamat: '',
  });
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteSnackbar, setDeleteSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    // Fetch suppliers from API
    const fetchSuppliers = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await axios.get('https://backendapi.my.id/api/supplier/all-supplier', config);
        if (response.data.status === 'success') {
          setData(response.data.data);
          setFilteredData(response.data.data);
        } else {
          throw new Error('Failed to fetch supplier data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    // Filter data based on filterText
    const filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(filterText.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [filterText, data]);

  const openModal = (supplier = null) => {
    if (supplier) {
      setEditingSupplier(supplier);
      setFormData({
        nama_supplier: supplier.nama_supplier,
        no_telp: supplier.no_telp,
        alamat: supplier.alamat,
      });
    } else {
      setFormData({
        nama_supplier: '',
        no_telp: '',
        alamat: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      if (editingSupplier) {
        // Update supplier
        const response = await axios.put(`https://backendapi.my.id/api/supplier/update-supplier/${editingSupplier.id_supplier}`, formData, config);
        if (response.data.status === 'success') {
          setOpenSnackbar(true);
        } else {
          throw new Error('Failed to update supplier');
        }
      } else {
        // Create new supplier
        const response = await axios.post('https://backendapi.my.id/api/supplier/create-supplier', formData, config);
        if (response.data.status === 'success') {
          setOpenSnackbar(true);
        } else {
          throw new Error('Failed to create supplier');
        }
      }

      const updatedSuppliers = await axios.get('https://backendapi.my.id/api/supplier/all-supplier', config);
      setData(updatedSuppliers.data.data);
      setFilteredData(updatedSuppliers.data.data);
      closeModal();
    } catch (error) {
      setOpenErrorSnackbar(true);
    }
  };

  const openDeleteDialog = (supplier) => {
    setSelectedSupplier(supplier);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.delete(`https://backendapi.my.id/api/supplier/delete-supplier/${selectedSupplier.id_supplier}`, config);
      if (response.data.status === 'success') {
        setDeleteSnackbar(true);
        const updatedSuppliers = await axios.get('https://backendapi.my.id/api/supplier/all-supplier', config);
        setData(updatedSuppliers.data.data);
        setFilteredData(updatedSuppliers.data.data);
      } else {
        throw new Error('Failed to delete supplier');
      }
    } catch (error) {
      setOpenErrorSnackbar(true);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const columns = [
    { name: 'ID', selector: (row) => row.id_supplier, sortable: true },
    { name: 'Nama Supplier', selector: (row) => row.nama_supplier, sortable: true },
    { name: 'No Telp', selector: (row) => row.no_telp, sortable: true },
    { name: 'Alamat', selector: (row) => row.alamat, sortable: true, wrap: true },
    {
      name: 'Action',
      selector: (row) => 'Action',
      width: '250px',
      sortable: false,
      cell: (row) => (
        <div>
          <Button variant="outlined" onClick={() => openModal(row)} style={{ marginRight: '10px' }} startIcon={<IconPencil />}>
            Edit
          </Button>
          <Button variant="outlined" onClick={() => openDeleteDialog(row)} startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  if (loading) return <p>Loading suppliers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Supplier List</h1>
      <Button variant="contained" onClick={() => openModal()} style={{ marginBottom: '20px' }}>
        Create Supplier
      </Button>
      <input
        type="text"
        placeholder="Filter by any field..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
      />
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
        striped
      />

      {/* Modal for Creating/Editing Supplier */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create/Update Supplier"
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
        <h2>{editingSupplier ? 'Update Supplier' : 'Create Supplier'}</h2>
        <form>
          <input
            name="nama_supplier"
            placeholder="Nama Supplier"
            value={formData.nama_supplier}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            name="no_telp"
            placeholder="No Telp"
            value={formData.no_telp}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            name="alamat"
            placeholder="Alamat"
            value={formData.alamat}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
        </form>
        <Button onClick={handleSave} style={{ padding: '10px', fontSize: '16px' }}>
          {editingSupplier ? 'Update' : 'Save'}
        </Button>
        <Button onClick={closeModal} style={{ padding: '10px', fontSize: '16px', marginLeft: '10px' }}>
          Cancel
        </Button>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete supplier "{selectedSupplier?.nama_supplier}"?
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

      {/* Success Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
          {editingSupplier ? 'Supplier updated successfully!' : 'Supplier created successfully!'}
        </Alert>
      </Snackbar>
      <Snackbar open={deleteSnackbar} autoHideDuration={6000} onClose={() => setDeleteSnackbar(false)}>
        <Alert onClose={() => setDeleteSnackbar(false)} severity="success" variant="filled">
          Supplier deleted successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={() => setOpenErrorSnackbar(false)}>
        <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error" variant="filled">
          Something went wrong. Please try again.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SupplierList;