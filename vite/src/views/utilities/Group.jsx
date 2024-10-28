import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { IconPencil } from '@tabler/icons-react';
import { menuItems } from 'menu-items';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { Checkbox, Button } from '@mui/material';


// Component for Edit Form with checkboxes
const EditForm = ({ team, onSave, onCancel, allowedMenus, setAllowedMenus  }) => {
    // const [selectedAuthorities, setSelectedAuthorities] = useState(team.authority ? team.authority.split(',') : []); // Initialize with team authority

    // const handleCheckboxChange = (menu) => {
    //     setSelectedAuthorities((prev) =>
    //         prev.includes(menu)
    //             ? prev.filter((item) => item !== menu)
    //             : [...prev, menu]
    //     );
    // };
    const storedAllowedMenus = localStorage.getItem('menu-items');
    // const [allowedMenus, setAllowedMenus] = useState(storedAllowedMenus ? JSON.parse(storedAllowedMenus) : []);
    console.log(menuItems)
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'menu-items') {
                const newMenus = JSON.parse(event.newValue);
                if (JSON.stringify(newMenus) !== JSON.stringify(allowedMenus)) {
                    setAllowedMenus(newMenus);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, [allowedMenus]); // Kini mendengarkan perubahan spesifik pada 'menu-items' di localStorage

    const handleSave = () => {
        onSave({ ...team, authority: allowedMenus}); // Save selected authorities as comma-separated string
    };

    

    const handleMenuToggle = (id, children) => {
        setAllowedMenus((prev) => {
            const newAllowedMenus = new Set(prev);

            const toggleChildren = (childNodes, shouldCheck) => {
                childNodes.forEach((child) => {
                    if (shouldCheck) {
                        newAllowedMenus.add(child.id);
                    } else {
                        newAllowedMenus.delete(child.id);
                    }
                    if (Array.isArray(child.children)) {
                        toggleChildren(child.children, shouldCheck);
                    }
                });
            };

            const shouldCheck = !newAllowedMenus.has(id);
            if (shouldCheck) {
                newAllowedMenus.add(id);
            } else {
                newAllowedMenus.delete(id);
            }

            toggleChildren(children, shouldCheck);

            // Setelah mengubah children, periksa dan update status parent berdasarkan children
            updateParentSelection(id, newAllowedMenus);

            return Array.from(newAllowedMenus);
        });
    };

    // Fungsi untuk memperbarui seleksi parent berdasarkan status seleksi children
    const updateParentSelection = (parentId, menuSet) => {
        const parent = menuItems.items.find(item => item.children && item.children.some(child => child.id === parentId));
        if (parent) {
            const allChildrenSelected = parent.children.every(child => menuSet.has(child.id));
            if (allChildrenSelected) {
                menuSet.add(parent.id);
            } else {
                menuSet.delete(parent.id);
            }
        }
    };

    const renderTree = (nodes) => (
        <TreeItem
          key={nodes.id}
          nodeid={nodes.id}
          itemId={nodes.id}
          label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={allowedMenus.includes(nodes.id)}
                onChange={() => handleMenuToggle(nodes.id, nodes.children || [])}
                size="small"
                style={{ marginRight: 8 }}
              />
              {nodes.title} {/* Menampilkan label di sini */}
            </div>
          }
        >
          {Array.isArray(nodes.children) ? nodes.children.map(renderTree) : null}
        </TreeItem>
      );

    return (
        <div>
            <div>
                <h2>Menu Settings</h2>
                <SimpleTreeView expansionTrigger="iconContainer">
                    {menuItems.items.map(renderTree)} {/* Menampilkan semua menu */}
                </SimpleTreeView>
                {/* <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '16px' }}>
                    Save Changes
                </Button> */}
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}></div>
            <Button variant='contained' color='success' onClick={handleSave}>Save</Button>
            <Button variant='contained' color='error' onClick={onCancel} style={{marginLeft: '10px'}}>Cancel</Button>
        </div>
    );
};

// Teams table using DataTable
const TeamsTable = () => {
    const [teams, setTeams] = useState([]); // Store teams data from API
    const [editingTeam, setEditingTeam] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [allowedMenus, setAllowedMenus] = useState([]);

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
        console.log(team, 'team');
        // console.log(team.authority, 'authority');
        setAllowedMenus(team.authority ? team.authority : []);
        setIsEditModalOpen(true);
    };

    const handleSave = async (edited) => {
        console.log('Edited team:', edited);
        try {
            const response = await fetch(`https://backendapi.my.id/api/masterTim/update/${edited.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: edited.name,
                    authority: JSON.stringify(edited.authority), // Pastikan ini adalah string JSON
                }),
            });
            const result = await response.json();
            if (result.success) {
                console.log('Updated team:', edited);
                setTeams((prevTeams) =>
                    prevTeams.map((team) =>
                        team.id === edited.id ? {...team, authority: edited.authority} : team
                    )
                );
                setEditingTeam(null); // Close form after save
                setIsEditModalOpen(false);
            } else {
                console.error('Failed to update team:', result.message);
            }
        } catch (error) {
            console.error('Error updating team:', error);
        }
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
                title="Teams Data"
                columns={columns}
                data={teams}
                pagination
            />
            {editingTeam && (
                <EditForm
                    team={editingTeam}
                    onSave={handleSave}
                    onCancel={() => setEditingTeam(null)}
                    allowedMenus={allowedMenus} // Pass allowedMenus as prop
                    setAllowedMenus={setAllowedMenus} // Pass setAllowedMenus as prop
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



