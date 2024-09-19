import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { width } from '@mui/system';
import { IconPencil } from '@tabler/icons-react';

// Array teams
const teams = [
    { id: 1, name: 'Administrator' },
    { id: 2, name: 'Staf Gudang' },
    { id: 3, name: 'Staf Kasir' },
    { id: 4, name: 'Staf Toko' },
    { id: 5, name: 'Mekanik' },
];

// Authority menus
const authorityMenus = [
    'Manage Users',
    'View Reports',
    'Edit Products',
    'Access Inventory',
    'Process Sales',
];

// Component for Edit Form with checkboxes
const EditForm = ({ team, onSave, onCancel }) => {
    const [selectedAuthorities, setSelectedAuthorities] = useState(team.authorities || []); // Inisialisasi dengan authorities dari team

    const handleCheckboxChange = (menu) => {
        setSelectedAuthorities((prev) =>
            prev.includes(menu)
                ? prev.filter((item) => item !== menu)
                : [...prev, menu]
        );
    };

    const handleSave = () => {
        onSave({ ...team, authorities: selectedAuthorities }); // Simpan authorities yang dipilih
    };

    return (
        <div>
            <h3>Edit Role: {team.name}</h3>
            <form>
                {authorityMenus.map((menu) => (
                    <div key={menu}>
                        <label>
                            <input
                                type="checkbox"
                                value={menu}
                                onChange={() => handleCheckboxChange(menu)}
                                checked={selectedAuthorities.includes(menu)}
                            />
                            {menu}
                        </label>
                    </div>
                ))}
            </form>
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

// Teams table using DataTable
const TeamsTable = () => {
    const [editingTeam, setEditingTeam] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null); // Tambahkan ini
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Tambahkan ini

    const openEditModal = (user) => {
        setEditingTeam(user); // Ubah ini untuk mengatur editingTeam
        setIsEditModalOpen(true);
    };

    const columns = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <Button variant="outlined" onClick={() => openEditModal(row)} style={{ marginRight: '10px' }} startIcon={<IconPencil />}>Edit</Button>
            ),
        },
    ];

    const handleSave = (updatedTeam) => {
        console.log('Updated team:', updatedTeam);
        setEditingTeam(null); // Close form after save
    };

    return (
        <div>
            <DataTable
                title="Teams Data Table"
                columns={columns}
                data={teams}
                pagination
            />
            {editingTeam && (
                <EditForm
                    team={editingTeam}
                    onSave={handleSave}
                    onCancel={() => setEditingTeam(null)}
                />
            )}
        </div>
    );
};

// Main component
const App = () => {
    return (
        <div>
            <h1>Teams Overview</h1>
            <TeamsTable />
        </div>
    );
};

export default App;
