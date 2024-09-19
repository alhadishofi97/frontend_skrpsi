import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const CustomerList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    // Fetch customers from API
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/customer/get_all_kustomer');
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

  const columns = [
    { name: 'ID', selector: row => row.id_kustomer, sortable: true },
    { name: 'Name', selector: row => row.nama, sortable: true },
    { name: 'Phone', selector: row => row.no_hp, sortable: true },
    { name: 'Address', selector: row => row.alamat, sortable: true },
    { name: 'Description', selector: row => row.deskripsi, sortable: true },
    { name: 'Created At', selector: row => new Date(row.created_at).toLocaleString(), sortable: true },
    { name: 'Edited At', selector: row => new Date(row.edited_at).toLocaleString(), sortable: true },
    { name: 'Created By', selector: row => row.created_by, sortable: true },
    { name: 'Edited By', selector: row => row.edited_by, sortable: true },
  ];

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Customer List</h1>
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
    </div>
  );
};

export default CustomerList;