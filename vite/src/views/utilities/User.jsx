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
// import Login from '../pages/authentication3/Login3';



Modal.setAppElement('#root');

const UsersList = () => {
  // const { token } = Login(); // Dapatkan token dari context
  const token = localStorage.getItem('token');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  

  // console.log(token);
  // Definisikan fetchUsers di atas reloadUsers
  const fetchUsers = async () => {
    try {
      // const token = localStorage.getItem('token');
        const response = await fetch('https://backendapi.my.id/api/users/get_all_users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Tambahkan token ke header
            },
        });
        const result = await response.json();
        
        if (result.status === 'success') {
            setUsers(result.data);
            setFilteredUsers(result.data);
        } else {
            setError('Failed to fetch users');
        }
    } catch (error) {
        setError('Error fetching data');
    } finally {
        setLoading(false);
    }
  };

  // Panggil fetchUsers di useEffect
  useEffect(() => {
    fetchUsers();
  }, []);

  // Definisikan reloadUsers setelah fetchUsers
  const reloadUsers = async () => {
    setLoading(true);
    await fetchUsers(); // Panggil fungsi fetchUsers untuk memuat ulang data
  };

  // Filter users based on search
  useEffect(() => {
    const filtered = users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.current_team?.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredUsers(filtered);
  }, [search, users]);

  const openModal = () => {
    setIsOpen(true);
    setFormData({
      username: '',
      name: '',
      email: '',
      password: '',
      current_team_id: 1,
      profile_photo_path: '/images/profile.jpg',
    });
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (user) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`https://backendapi.my.id/api/users/delete/user/${selectedUser.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Tambahkan token ke header
      },
      });
      if (response.data.status === 'success') {
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setFilteredUsers(filteredUsers.filter((user) => user.id !== selectedUser.id));
        setSnackbarMessage('User deleted successfully');
        setSnackbarOpen(true); // Show Snackbar
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const DeleteUserDialog = () => (
    <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete {selectedUser?.name}?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
                Cancel
            </Button>
            <Button onClick={handleDeleteUser} color="secondary" startIcon={<DeleteIcon />}>
                Delete
            </Button>
        </DialogActions>
    </Dialog>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Define columns for DataTable
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name ? row.name : 'N/A',
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Username',
      selector: (row) => row.username ? row.username : 'N/A',
      sortable: true,
    },
    {
      name: 'Team',
      selector: (row) => row.current_team,
      sortable: true,
    },
    {
      name: 'Created At',
      selector: (row) => row.created_at ? row.created_at : 'N/A',
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => 'Action',
      width: '250px',
      sortable: false,
      format: (row) => (
        <div>
          <Button variant="outlined" onClick={() => openEditModal(row)} style={{ marginRight: '10px' }} startIcon={<IconPencil />}>
            Edit
          </Button>
          <Button variant="outlined" onClick={() => openDeleteDialog(row)} startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  const CreateUserModal = () => {
    const [formData, setFormData] = useState({
      username: '',
      name: '',
      email: '',
      password: '',
      current_team_id: '',
      profile_photo_path: '/images/profile.jpg',
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
      try {
        const response = await axios.post('https://backendapi.my.id/api/users/create/user', formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Tambahkan token ke header
        },
        });
        if (response.data.status === 'success') {
          const newUser = response.data.data;
          setUsers([...users, newUser]);
          setFilteredUsers([...filteredUsers, newUser]);
          setSnackbarMessage('User created successfully');
          setSnackbarOpen(true); // Show Snackbar
          toggleModal();
        } else {
          alert('Failed to create user');
        }
      } catch (error) {
        console.error('Error creating user:', error);
        alert('Error creating user');
      }
    };

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Create User"
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
        <h2>Create User</h2>
        <form>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <select
            name="current_team_id"
            value={formData.current_team_id}
            onChange={(e) => handleInputChange({
              target: { name: 'current_team_id', value: Number(e.target.value) }
            })}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          >
            <option value="">Pilih Role</option>
            <option value="1">Administrator</option>
            <option value="2">Staf Gudang</option>
            <option value="3">Staf Kasir</option>
            <option value="4">Staf Toko</option>
            <option value="5">Mekanik</option>
          </select>
        </form>
        <button onClick={handleSubmit} style={{ padding: '10px', fontSize: '16px' }}>
          Save
        </button>
        <button onClick={toggleModal} style={{ padding: '10px', fontSize: '16px', marginLeft: '10px' }}>
          Cancel
        </button>
      </Modal>
    );
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const EditUserModal = ({ user, onClose }) => {
    const [formData, setFormData] = useState({
        username: user.username,
        name: user.name,
        email: user.email,
        password: '',
        current_team_id: user.current_team_id,
        profile_photo_path: user.profile_photo_path,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`https://backendapi.my.id/api/users/update-user/${user.id}`, formData, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Tambahkan token ke header
                }
            });
            if (response.data.status === 'success') {
                setSnackbarMessage('User updated successfully'); // Tambahkan pesan Snackbar
                setSnackbarOpen(true); // Tampilkan Snackbar
                onClose();
            } else {
                alert('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user');
        }
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            contentLabel="Edit User"
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
            <h2>Edit User</h2>
            <form>
                <input
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <input
                    name="password"
                    placeholder="Password (leave blank to keep current)"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <select
                    name="current_team_id"
                    value={formData.current_team_id}
                    onChange={(e) => handleInputChange({
                        target: { name: 'current_team_id', value: Number(e.target.value) }
                    })}
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                >
                    <option value="">Pilih Role</option>
                    <option value="1">Administrator</option>
                    <option value="2">Staf Gudang</option>
                    <option value="3">Staf Kasir</option>
                    <option value="4">Staf Toko</option>
                    <option value="5">Mekanik</option>
                </select>
            </form>
            <button onClick={handleSubmit} style={{ padding: '10px', fontSize: '16px' }}>
                Update
            </button>
            <button onClick={onClose} style={{ padding: '10px', fontSize: '16px', marginLeft: '10px' }}>
                Cancel
            </button>
        </Modal>
    );
};

  return (
    <div>
      <h1>Users List</h1>
      <Button variant="contained" onClick={() => openModal()} style={{ marginBottom: '20px' }}>
        Create User
      </Button>
      <Button onClick={reloadUsers} variant='contained' style={{ marginBottom: '20px', marginLeft:'15px'}}  >
        Reload Data
      </Button>
      <input 
        type="text"
        placeholder="Search by name, email, or team"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        highlightOnHover
        pointerOnHover
      />
      {isOpen && <CreateUserModal />}
      {isEditModalOpen && selectedUser && (
        <EditUserModal user={selectedUser} onClose={() => setIsEditModalOpen(false)} />
      )}
      {isDeleteDialogOpen && <DeleteUserDialog />}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UsersList;
