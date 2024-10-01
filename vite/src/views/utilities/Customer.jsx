import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconPencil } from '@tabler/icons-react';
// const jwt = require('jsonwebtoken'); // Import JWT
// const secretKey = 'your-secret-key';

Modal.setAppElement('#root');

const CustomerList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    no_hp: '',
    alamat: '',
    deskripsi: '',
    created_by: '',
    edited_by: '',
    delete_status: 0
  });
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteSnackbar, setDeleteSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  
  useEffect(() => {
    // Fetch customers from API
    const fetchCustomers = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await axios.get('https://backendapi.my.id/api/customer/get_all_kustomer', config);
        if (response.data.status === 'success') {
          setData(response.data.data);
          setFilteredData(response.data.data);
        } else {
          throw new Error('Failed to fetch customer data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
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

  const openModal = (customer = null) => {
    if (customer) {
      // console.log(customer, 'melbu');
      setEditingCustomer(customer);
      setFormData({
        nama: customer.nama,
        no_hp: customer.no_hp,
        alamat: customer.alamat,
        deskripsi: customer.deskripsi,
        created_by: customer.created_by,
        edited_by: customer.edited_by,
        delete_status: customer.delete_status
      });
    } else {
      setFormData({
        nama: '',
        no_hp: '',
        alamat: '',
        deskripsi: '',
        created_by: '',
        edited_by: '',
        delete_status: 0
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    // Ambil informasi pengguna yang sedang login
    const currentUser = localStorage.getItem('user'); // Misalnya, ambil dari localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const createFormData = {
      ...formData,
      created_by: currentUser // Ganti dengan nama pengguna yang sesuai
    }

  
    // Tambahkan edited_by ke formData
    const updatedFormData = {
      ...formData,
      edited_by: currentUser // Ganti dengan nama pengguna yang sesuai
    };

    try {
      if (editingCustomer) {
        // console.log(editingCustomer, 'melbu update');
        // Update customer
        const response = await axios.put(`https://backendapi.my.id/api/customer/update_kustomer/${editingCustomer.id_kustomer}`, updatedFormData, config);
        if (response.data.status === 'success') {
          setOpenSnackbar(true);
        } else {
          throw new Error('Failed to update customer');
        }
      } else {
        // Create new customer
        const response = await axios.post('https://backendapi.my.id/api/customer/create_kustomer', createFormData, config);
        if (response.data.status === 'success') {
          setOpenSnackbar(true);
        } else {
          throw new Error('Failed to create customer');
        }
      }

      // Refresh customer list
      const updatedCustomers = await axios.get('https://backendapi.my.id/api/customer/get_all_kustomer', config);
      setData(updatedCustomers.data.data);
      setFilteredData(updatedCustomers.data.data);
      closeModal();
    } catch (error) {
      setOpenErrorSnackbar(true);
    }
  };

  const openDeleteDialog = (customer) => {
    setSelectedCustomer(customer);
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
      const response = await axios.delete(`https://backendapi.my.id/api/customer/delete_kustomer/${selectedCustomer.id_kustomer}`, config);
      if (response.data.status === 'success') {
        setDeleteSnackbar(true);
        const updatedCustomers = await axios.get('https://backendapi.my.id/api/customer/get_all_kustomer', config);
        setData(updatedCustomers.data.data);
        setFilteredData(updatedCustomers.data.data);
      } else {
        throw new Error('Failed to delete customer');
      }
    } catch (error) {
      setOpenErrorSnackbar(true);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const columns = [
    { name: 'ID', selector: row => row.id_kustomer, sortable: true },
    { name: 'Name', selector: row => row.nama, sortable: true },
    { name: 'Phone', selector: row => row.no_hp, sortable: true },
    { name: 'Address', selector: row => row.alamat, sortable: true },
    { name: 'Description', selector: row => row.deskripsi, sortable: true, wrap: true },
    { name: 'Created By', selector: row => row.created_by, sortable: true },
    { name: 'Edited By', selector: row => row.edited_by, sortable: true },
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

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Customer List</h1>
      <Button variant="contained" onClick={() => openModal()} style={{ marginBottom: '20px' }}>
        Create Customer
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

      {/* Modal for Creating/Editing Customer */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create/Update Customer"
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
        <h2>{editingCustomer ? 'Update Customer' : 'Create Customer'}</h2>
        <form>
          <input
            name="nama"
            placeholder="Name"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            name="no_hp"
            placeholder="Phone"
            value={formData.no_hp}
            onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            name="alamat"
            placeholder="Address"
            value={formData.alamat}
            onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            name="deskripsi"
            placeholder="Description"
            value={formData.deskripsi}
            onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
        </form>
        <Button onClick={handleSave} style={{ padding: '10px', fontSize: '16px' }}>
          {editingCustomer ? 'Update' : 'Save'}
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
            Are you sure you want to delete customer "{selectedCustomer?.nama}"?
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
          {editingCustomer ? 'Customer updated successfully!' : 'Customer created successfully!'}
        </Alert>
      </Snackbar>
      <Snackbar open={deleteSnackbar} autoHideDuration={6000} onClose={() => setDeleteSnackbar(false)}>
        <Alert onClose={() => setDeleteSnackbar(false)} severity="success" variant="filled">
          Customer deleted successfully!
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

export default CustomerList;
