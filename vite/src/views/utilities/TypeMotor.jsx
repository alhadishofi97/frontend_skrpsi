import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from '@mui/material';
import { IconPencil } from '@tabler/icons-react';



// Component for Edit Form with checkboxes
const EditForm = ({ team, onSave, onCancel }) => {
    const [selectedAuthorities, setSelectedAuthorities] = useState(team.authority ? team.authority.split(',') : []); // Initialize with team authority

    const handleCheckboxChange = (menu) => {
        setSelectedAuthorities((prev) =>
            prev.includes(menu)
                ? prev.filter((item) => item !== menu)
                : [...prev, menu]
        );
    };

    const handleSave = () => {
        onSave({ ...team, authority: selectedAuthorities.join(',') }); // Save selected authorities as comma-separated string
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
    const [teams, setTeams] = useState([]); // Store teams data from API
    const [editingTeam, setEditingTeam] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Fetch data from the API
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('https://backendapi.my.id/api/masterTim/get_tim');
                const result = await response.json();
                if (result.success) {
                    setTeams(result.data);
                }
            } catch (error) {
                console.error('Failed to fetch teams:', error);
            }
        };

        fetchTeams();
    }, []);

    const openEditModal = (team) => {
        setEditingTeam(team);
        setIsEditModalOpen(true);
    };

    const handleSave = (updatedTeam) => {
        console.log('Updated team:', updatedTeam);
        setTeams((prevTeams) =>
            prevTeams.map((team) =>
                team.id === updatedTeam.id ? updatedTeam : team
            )
        );
        setEditingTeam(null); // Close form after save
        setIsEditModalOpen(false);
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
                <Button
                    variant="outlined"
                    onClick={() => openEditModal(row)}
                    style={{ marginRight: '10px' }}
                    startIcon={<IconPencil />}
                >
                    Edit
                </Button>
            ),
        },
    ];

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
