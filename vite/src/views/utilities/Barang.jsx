import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { maxWidth, width } from '@mui/system';
import { IconPencil } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MuiAlert from '@mui/material/Alert';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';


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
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [typesMotor, setTypesMotor] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    id_kustomer: '',
    plat_motor: '',
    nama: '',
    deskripsi: ''
  });
  const [editingItem, setEditingItem] = useState(null); // State to track which item is being edited
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteSnackbar, setDeleteSnackbar] = useState(false);
  const [sparepartModalOpen, setSparepartModalOpen] = useState(false); // State untuk modal sparepart
  const [isDaftarServiceOpen, setDaftarServiceModalOpen] = useState(false); // State untuk modal daftar service
  const [transaksiData, setTransaksiData] = useState([]); // State untuk menyimpan data transaksi
  const [isServiceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceData, setServiceData] = useState({
    diagnosis: '',
    mechanicName: '',
    serviceType: '',
    cost: ''
  });
  const [serviceDataList, setServiceDataList] = useState([]); // State untuk menyimpan data servis
  const [totalCost, setTotalCost] = useState(0); // State untuk menyimpan total ongkos
  const [totalSparepartCost, setTotalSparepartCost] = useState(0); // State untuk menyimpan total harga sparepart
  const [sparepartDataList, setSparepartDataList] = useState([]); // State untuk menyimpan data sparepart yang ditambahkan
  const [platMotor, setPlatMotor] = useState('');
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [name, setName] = useState(''); // For storing selected mechanic name
  const [editingIndex, setEditingIndex] = useState(null);
  const [customerId, setCustomerId] = useState(null); // State untuk menyimpan id_kustomer
  const [mekanikId, setMekanikId] = useState(null); // State untuk menyimpan id mekanik
  const [customerName, setCustomerName] = useState(''); // State untuk nama pelanggan
  const [mechanicName, setMechanicName] = useState(''); // State untuk nama mekanik
  const [mechanicId, setMechanicId] = useState(null); // State untuk id_user mekanik
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchMekanik = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan');

      const response = await axios.get('https://backendapi.my.id/api/users/all-name-mekanik', {
        params: { teamId: 5 },
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      if (response.data.status === "success") {
        const mekanikData = response.data.data;
        const mekanikOptions = Array.isArray(mekanikData)
          ? mekanikData.map(mekanik => ({
              value: mekanik.username,
              label: mekanik.username,
              id: mekanik.id_user // Simpan id mekanik
            }))
          : [{ value: mekanikData.username, label: mekanikData.username, id: mekanikData.id_user }];

        setOptions(mekanikOptions);
        setErrorMessage('');
      } else {
        setOptions([]);
        setErrorMessage('Mekanik tidak ditemukan');
      }
    } catch (err) {
      console.error('Error fetching mekanik:', err);
      setErrorMessage(err.response?.data?.message || 'Mekanik tidak ditemukan');
      setOptions([]);
    }
  };

  useEffect(() => {
    fetchMekanik();
  }, []);

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

  const handleServiceInputChangeMekanik = (selectedOption) => {
    const selectedMechanicName = selectedOption ? selectedOption.label : '';
    const selectedMechanicId = selectedOption ? selectedOption.id : null;
    
    setMechanicName(selectedMechanicName);
    setMechanicId(selectedMechanicId); // Simpan id_user mekanik

    // Update the mechanicName and id in serviceData
    setServiceData((prevState) => ({
      ...prevState,
      mechanicName: selectedMechanicName,
      mechanicId: selectedMechanicId
    }));
  };

  // Example function to handle input change in the dropdown
  const handleInputChangeMekanik = (inputValue) => {
    // You can fetch mechanic data here based on inputValue and setOptions
    fetchMekanik(inputValue);
  };


  const handlePlatMotorChange = async (event) => {
    const value = event.target.value;
    setPlatMotor(value);

    if (value) {
      try {
        const response = await axios.get(`https://backendapi.my.id/api/motor/plat_motor`, {
          params: { plat_motor: value },
        });

        if (response.data.status === "success") {
          setCustomerName(response.data.data.name); // Ubah hanya nama pelanggan
          setCustomerId(response.data.data.id_kustomer);
          setErrorMessage('');
        }
      } catch (err) {
        setErrorMessage("Motor not found");
        setCustomerName('');
        setCustomerId(null);
        setSnackbarOpen(true);
      }
    } else {
      setCustomerName('');
      setCustomerId(null);
    }
  };

  const handleSnackbarClose = () => {
      setSnackbarOpen(false);
  };


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
    { name: 'Jumlah di Gudang', selector: (row) => row.jumlah_digudang, sortable: true },
    { name: 'Jumlah di Toko', selector: (row) => row.jumlah_ditoko, sortable: true },
    { name: 'Lokasi Rak', selector: (row) => row.lokasi_rak, sortable: true },
    { name: 'Deskripsi', selector: (row) => row.deskripsi, sortable: true, wrap: true },
    { name: 'Harga Jual', selector: (row) => row.harga, sortable: true, format: (row) => formatRupiah(row.harga_jual) },
    { name: 'Harga Beli', selector: (row) => row.harga_beli, sortable: true, format: (row) => formatRupiah(row.harga_beli) },
    { name: 'Kategori', selector: (row) => row.kategori_barang?.nama_kategori_barang, sortable: true },
    { name: 'Tipe Motor', selector: (row) => row.type_motor?.type_motor, sortable: true },
  ];

  // Open the delete dialog
  const openDeleteDialog = (row) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  

  // Close the dialog without deleting
  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
    setOpenError(false);
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

        // Fetch barang data
        console.log(config);
        const barangResponse = await axios.get('https://backendapi.my.id/api/barang/all_barang', config);
        if (barangResponse.data.status === 'success') {
          setBarangData(barangResponse.data.data);
          setFilteredData(barangResponse.data.data);
        } else {
          setError('Failed to fetch data');
        }

        // Fetch categories
        const categoriesResponse = await axios.get('https://backendapi.my.id/api/kategori-barang/all/kategori/barang', config);
        setCategories(categoriesResponse.data.data);

        // Fetch motor types
        const typesMotorResponse = await axios.get('https://backendapi.my.id/api/type-motor/all_motor', config);
        setTypesMotor(typesMotorResponse.data.data);

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
      id_transaksi: uuidv4(),
      plat_motor: '',
      nama: '',
      
    });
    setIsModalOpen(true);
  };


  const openModal2 = () => {
    setEditingItem(null); // Clear editing state when opening the modal
    setFormData({
      id_transaksi: uuidv4(),
      plat_motor: '',
      nama: '',
      
    });
    setIsModalOpen2(true);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Fungsi untuk membuka modal sparepart
  const openSparepartModal = () => {
    setSparepartModalOpen(true);
  };

  const openDaftarService = () => {
    setDaftarServiceModalOpen(true);
  };  



  // Fungsi untuk menambah barang ke tabel transaksi
  const handleAddBarang = (item) => {
    if (item.jumlah_ditoko <= 0) {
      setSnackbarMessage('Jumlah barang di toko habis');
      setSnackbarOpen(true);
      return;
    }

    const harga = parseFloat(item.harga_jual) || 0;
    const defaultQuantity = 1;
    const totalHarga = harga * defaultQuantity;

    setTransaksiData((prevData) => [
      ...prevData,
      { ...item, quantity: defaultQuantity, total: totalHarga }
    ]);

    // Update total cost
    setTotalCost((prev) => prev + totalHarga);

    // Menghapus item dari sparepartDataList
    setSparepartDataList((prevData) => prevData.filter(sparepart => sparepart.part_no !== item.part_no));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleQuantityChange = (partNo, quantity) => {
    const item = transaksiData.find(item => item.part_no === partNo);

    if (quantity > item.jumlah_ditoko) {
      setSnackbarMessage('Jumlah barang tidak tersedia');
      setSnackbarOpen(true);
      return;
    }

    const updatedTransaksiData = transaksiData.map(item => {
      if (item.part_no === partNo) {
        const harga_jual = parseFloat(item.harga_jual) || 0;
        const totalHarga = harga_jual * quantity;
        return { ...item, quantity: parseInt(quantity, 10), total: totalHarga };
      }
      return item;
    });

    setTransaksiData(updatedTransaksiData);

    // Hitung ulang total cost
    const barangTotal = updatedTransaksiData.reduce((acc, item) => acc + (item.total || 0), 0);
    const serviceTotal = serviceDataList.reduce((acc, service) => acc + (parseFloat(service.cost) || 0), 0);
    setTotalCost(barangTotal + serviceTotal);
  };

  // Fungsi untuk menghapus barang dari tabel transaksi
  const handleDeleteTransaksi = (partNo) => {
    const updatedTransaksiData = transaksiData.filter(item => item.part_no !== partNo);

    setTransaksiData(updatedTransaksiData);

    // Update total cost
    const newTotalCost = updatedTransaksiData.reduce((acc, item) => acc + (item.total || 0), 0);
    setTotalCost(newTotalCost);

    // Tambahkan kembali item yang dihapus ke sparepartDataList jika diperlukan
    const deletedItem = transaksiData.find(item => item.part_no === partNo);
    if (deletedItem) {
        setSparepartDataList((prevData) => [...prevData, deletedItem]);
    }
  };

  const openServiceModal = () => {
    setServiceModalOpen(true);
  };

  const closeServiceModal = () => {
    setServiceModalOpen(false);
    // Jangan reset serviceData dan name di sini
    setEditingIndex(null);
  };
  

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddService = () => {
    const selectedMechanic = options.find(option => option.label === name);
    if (selectedMechanic) {
      setServiceDataList((prev) => [
        ...prev,
        {
          ...serviceData,
          mechanicName: selectedMechanic.label,
          mechanicId: selectedMechanic.id // Simpan id_user
        }
      ]);
      setTotalCost((prev) => prev + parseFloat(serviceData.cost)); // Tambahkan ongkos ke total
      closeServiceModal();
    } else {
      console.log('Mekanik tidak ditemukan');
    }
  };

  const handleEditService = (index) => {
    const serviceToEdit = serviceDataList[index];
    setServiceData(serviceToEdit);
    setName(serviceToEdit.mechanicName);
    setEditingIndex(index);
    setServiceModalOpen(true);
  };

  const handleSaveService = () => {
    if (editingIndex !== null) {
      const updatedServiceList = [...serviceDataList];
      updatedServiceList[editingIndex] = serviceData;

      setServiceDataList(updatedServiceList);
    } else {
      setServiceDataList([...serviceDataList, serviceData]);
    }

    // Hitung ulang total cost
    const barangTotal = transaksiData.reduce((acc, item) => acc + (item.total || 0), 0);
    const serviceTotal = serviceDataList.reduce((acc, service) => acc + (parseFloat(service.cost) || 0), 0);
    setTotalCost(barangTotal + serviceTotal);

    closeServiceModal();
  };

  const handleDeleteService = (index) => {
    const updatedServiceList = serviceDataList.filter((_, i) => i !== index);
    setServiceDataList(updatedServiceList);

    // Hitung ulang total cost
    const barangTotal = transaksiData.reduce((acc, item) => acc + (item.total || 0), 0);
    const serviceTotal = updatedServiceList.reduce((acc, service) => acc + (parseFloat(service.cost) || 0), 0);
    setTotalCost(barangTotal + serviceTotal);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      if (!customerId) {
        throw new Error('ID Kustomer tidak boleh kosong');
      }

      // Panggil API untuk mendapatkan data mekanik jika diperlukan
      const responseMekanik = await axios.get('https://backendapi.my.id/api/users/all-name-mekanik', {
        params: { teamId: 5 },
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      if (responseMekanik.data.status !== "success") {
        alert('Gagal mendapatkan data mekanik');
        return;
      }

      const mekanikData = responseMekanik.data.data;
      const selectedMechanic = mekanikData.find(mekanik => mekanik.username === mechanicName);

      // console.log('Options:', options);
      // console.log('Current Mechanic Name:', mechanicName);
      // console.log('Selected Mechanic:', selectedMechanic);

      if (!selectedMechanic) {
        alert('Mekanik harus dipilih');
        return;
      }

      const user = localStorage.getItem('id_user');
      console.log("id_user", user);


      const transaksiDataPayload = {
        id_transaksi: formData.id_transaksi,
        plat_motor: platMotor,
        created_by: user, // Gunakan id_user
        id_kustomer: customerId,
        Barang: transaksiData.map(item => ({
          quantity: item.quantity,
          id_barang: item.id_barang,
          part_no: item.part_no,
          harga: item.harga_jual
        })),
        service: {
          nama_servis: serviceData.serviceType,
          mekanik: selectedMechanic.id_user,
          ongkos: parseFloat(serviceData.cost) || 0,
          deskripsi: serviceData.diagnosis
        },
        id_alur_barang: 3,
        grand_total: totalCost + totalSparepartCost,
        tanggal: new Date().toISOString(),
        // deskripsi: formData.deskripsi
      };
      console.log("transaksiDataPayload", transaksiDataPayload);

      const response = await axios.post('https://backendapi.my.id/api/transaksi/create-transaksi', transaksiDataPayload, config);

      if (response.data.status === 'success') {
        setOpen(true);
        openInvoiceModal(); // Buka modal invoice
      } else {
        throw new Error('Failed to create transaksi');
      }

      const updatedBarangData = await axios.get('https://backendapi.my.id/api/barang/all_barang', config);
      setBarangData(updatedBarangData.data.data);
      setFilteredData(updatedBarangData.data.data);

      closeModal();
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  useEffect(() => {
    // Hitung ulang total cost setiap kali transaksiData atau serviceDataList berubah
    const barangTotal = transaksiData.reduce((acc, item) => acc + (item.total || 0), 0);
    const serviceTotal = serviceDataList.reduce((acc, service) => acc + (parseFloat(service.cost) || 0), 0);
    setTotalCost(barangTotal + serviceTotal);
  }, [transaksiData, serviceDataList]);

  const handlePrintInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 105, 20, null, null, 'center');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`ID Transaksi: ${formData.id_transaksi}`, 20, 40);
    doc.text(`Bill To: ${customerName}`, 20, 50);
    doc.text(`Plat Motor: ${platMotor}`, 20, 60);
    doc.text(`Tanggal: ${new Date().toLocaleDateString()}`, 20, 70);
    doc.text(`Dibuat oleh: ${localStorage.getItem('name')}`, 20, 80);

    // Table headers
    doc.setFont('helvetica', 'bold');
    doc.text('Deskripsi', 20, 100);
    doc.text('Jumlah', 70, 100);
    doc.text('Harga', 120, 100);
    doc.text('Total', 160, 100);

    // Draw table borders with adjusted height
    const rowHeight = 12; // Adjust row height as needed
    doc.rect(18, 95, 180, rowHeight); // Header border
    let yOffset = 105 + rowHeight;
    transaksiData.forEach((item) => {
      doc.rect(18, yOffset - rowHeight + 2, 180, rowHeight); // Row border
      doc.text(item.nama_barang, 20, yOffset);
      doc.text(String(item.quantity), 80, yOffset);
      doc.text(formatRupiah(item.harga_jual), 120, yOffset);
      doc.text(formatRupiah(item.total), 160, yOffset);
      yOffset += rowHeight;
    });

    serviceDataList.forEach((service) => {
      doc.rect(18, yOffset - rowHeight + 2, 180, rowHeight); // Row border
      doc.text(service.serviceType, 20, yOffset);
      doc.text('1', 80, yOffset);
      doc.text(formatRupiah(service.cost), 120, yOffset);
      doc.text(formatRupiah(service.cost), 160, yOffset);
      yOffset += rowHeight;
    });

    // Grand total row
    doc.rect(18, yOffset - rowHeight + 2, 180, rowHeight); // Grand total border
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text('Grand Total:', 20, yOffset);
    doc.text(formatRupiah(totalCost + totalSparepartCost), 160, yOffset);

    doc.save('invoice.pdf');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Fungsi untuk menangani perubahan input pada form
  const handleSparepartInputChange = (e) => {
    const { name, value } = e.target;
    setSparepartFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const filteredBarangData = barangData.filter((item) => {
    return (
      (item.part_no && item.part_no.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.nama_barang && item.nama_barang.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.lokasi_rak && item.lokasi_rak.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.deskripsi && item.deskripsi.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.kategori_barang?.nama_kategori_barang && item.kategori_barang.nama_kategori_barang.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.type_motor?.type_motor && item.type_motor.type_motor.toLowerCase().includes(filterText.toLowerCase()))
    );
  });

  // Fungsi untuk mengubah nama mekanik
  const handleMechanicChange = (selectedOption) => {
    const selectedMechanicName = selectedOption ? selectedOption.label : '';
    setMechanicName(selectedMechanicName);
  };

  // Pastikan options berisi data yang benar
  console.log('Options:', options);

  // Dapatkan mekanik yang dipilih berdasarkan nama
  const selectedMechanic = options.find(option => option.label === name);

  // Log id_user dari mekanik yang dipilih
  if (selectedMechanic) {
    console.log('Selected Mechanic ID:', selectedMechanic.id);
  } else {
    console.log('Mekanik tidak ditemukan');
  }

  console.log('Current Mechanic Name:', name);
  console.log('Current Service Data:', serviceData);

  const openInvoiceModal = () => {
    setInvoiceModalOpen(true);
  };

  return (
    <div>
      <h1>Barang List</h1>
      {/* <button variant="contained" onClick={openModal} style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}>
        {editingItem ? 'Update Barang' : 'Create Barang'}
      </button> */}
      <Button variant="contained" onClick={openModal} style={{ marginBottom: '20px' }}>
      {editingItem ? 'Update Barang' : 'Buat Transaksi Barang'}
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
            width: '1000px', // Adjust width as needed
            padding: '20px'
          }
        }}
      >
      {/* <Modal
        isOpen={isModalOpen2}
        onRequestClose={closeModal}
        contentLabel="Create/Update Barang"
        style={{
          content: {
            top: '20%',
            left: '20%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '1000px', // Adjust width as needed
            padding: '20px',
            zIndex: 999999999
          }
        }}
      ></Modal> */}

    <Modal
        isOpen={isServiceModalOpen}
        onRequestClose={closeServiceModal}
        contentLabel="Daftar Service"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '600px', // Adjust width as needed
            padding: '20px'
          }
        }}
      >
        <h2>Daftar Service</h2>
        <form>
          <div>
            <label>Deskripsi</label>
            <input
              type="text"
              name="diagnosis"
              value={serviceData.diagnosis}
              onChange={handleServiceInputChange}
              style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
          </div>
          <label>Nama Mekanik*</label>
          <Select
            value={options.find((option) => option.label === mechanicName) || null}
            onChange={handleServiceInputChangeMekanik}
            options={options}
            placeholder="Search for Mekanik"
            isClearable
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />

          {/* Display the selected mechanic's name in this field */}
          <div>
            <label>Nama Mekanik Terpilih</label>
            <input
              type="text"
              value={mechanicName} // Gunakan mechanicName untuk autofill
              readOnly
              style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
          </div>
          <div>
            <label>Jenis Layanan*</label>
            <input
              type="text"
              name="serviceType"
              value={serviceData.serviceType}
              onChange={handleServiceInputChange}
              style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
          </div>
          <div>
            <label>Ongkos*</label>
            <input
              type="text"
              name="cost"
              value={serviceData.cost}
              onChange={handleServiceInputChange}
              style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
          </div>
          <Button variant="contained" onClick={handleSaveService}>
            Tambahkan
          </Button>
          <Button variant="outlined" onClick={closeServiceModal} style={{ marginLeft: '10px' }}>
            Back
          </Button>
        </form>
      </Modal>

        <h2>{editingItem ? 'Update Barang' : 'Transaksi'}</h2>
        <form>
          <input
            name="id_transaksi"
            placeholder="Part No"
            value={formData.id_transaksi}
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px', backgroundColor: '#E4E0E1' }}
            readOnly
          />
          <input
            name="plat_motor"
                    type="text"
                    id="platMotor"
                    value={platMotor}
                    onChange={handlePlatMotorChange}
                    placeholder="Enter plat motor"
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <input
                  placeholder='Nama'
                    name="nama"
                    type="text"
                    value={customerName} // Gunakan customerName untuk autofill
                    readOnly
                    style={{ width: '100%', marginBottom: '10px', padding: '8px', backgroundColor: '#E4E0E1' }}
                />
          <input
            name="tanggal"
            type="date"
            value={formData.tanggal || new Date().toISOString().split('T')[0]} // Set default to today's date
            onChange={handleInputChange}
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          
          {/* Tabel untuk menampilkan data transaksi */}
          <TableContainer style={{ maxHeight: '400px', overflow: 'auto' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Part No</TableCell>
                        <TableCell>Nama Barang</TableCell>
                        <TableCell>Kategori Barang</TableCell>
                        <TableCell>Type Motor</TableCell>
                        <TableCell>Deskripsi</TableCell>
                        <TableCell>Harga</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell >Aksi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Map data transaksi di sini */}
                    {transaksiData.map((item) => (
                        <TableRow key={item.id_barang}>
                            <TableCell>{item.part_no}</TableCell>
                            <TableCell>{item.nama_barang}</TableCell>
                            <TableCell>{item.kategori_barang?.nama_kategori_barang}</TableCell>
                            <TableCell>{item.type_motor?.type_motor}</TableCell>
                            <TableCell>{item.deskripsi}</TableCell>
                            <TableCell>{formatRupiah(item.harga_jual)}</TableCell>
                            <TableCell>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.part_no, e.target.value)}
                                    style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '10px' }}
                                />
                            </TableCell>
                            <TableCell>{formatRupiah(item.total)}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleDeleteTransaksi(item.part_no)}><FontAwesomeIcon icon={faMinus} size='2x' /></Button> {/* Tombol untuk hapus item */}
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </form>

        {/* Tabel untuk menampilkan data servis */}
        <h3>Servis</h3>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Jenis Layanan</TableCell>
                <TableCell>Mekanik</TableCell>
                <TableCell>Ongkos</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceDataList.map((service, index) => (
                <TableRow key={index}>
                  <TableCell>{service.serviceType}</TableCell>
                  <TableCell>{service.mechanicName}</TableCell>
                  <TableCell>{formatRupiah(service.cost)}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditService(index)}>Edit</Button> {/* Tombol untuk edit item */}
                    <Button onClick={() => handleDeleteService(index)}>Hapus</Button> {/* Tombol untuk hapus item */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <h3>Grand Total: {formatRupiah(totalCost + totalSparepartCost)}</h3> {/* Update grand total */}

        <Button variant='contained' color='success' onClick={handleSave}>
          {editingItem ? 'Update' : ' Buat Transaksi'}
        </Button>
        <Button variant='contained' color='error' onClick={closeModal} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={openSparepartModal} style= {{marginLeft: '400px', marginRight: '10px'}} >
          Input Sparepart
        </Button>
        <Button variant="contained" onClick={openServiceModal}>
        Daftar Service
      </Button>
      </Modal>

      {/* Modal untuk menambah sparepart */}
      <Modal
        isOpen={sparepartModalOpen}
        onRequestClose={() => setSparepartModalOpen(false)}
        contentLabel="Input Sparepart"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%', // Adjust width for responsiveness
            maxWidth: '1000px', // Maximum width
            padding: '20px'
          }
        }}
      >
        <Modal
        isOpen={isDaftarServiceOpen}
        onRequestClose={() => setDaftarServiceModalOpen(false)}
        contentLabel="Input Sparepart"
        style={{
          content: {
            top: '1000px',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '1000px', // Adjust width as needed
            padding: '20px'
          }
        }}
      >
        
      </Modal>
        <h2>Input Sparepart</h2>
        <form className="form-container">
          <div className="form-group">
            <input
              type="text"
              placeholder="Cari berdasarkan Part No, Nama Barang, Lokasi Rak, Deskripsi, Harga, atau Kategori"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </div>
          <TableContainer style={{ maxHeight: '600px', maxWidth: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Part No</TableCell>
                  <TableCell>Nama Barang</TableCell>
                  <TableCell>Jumlah di Gudang</TableCell>
                  <TableCell>Jumlah di Toko</TableCell>
                  <TableCell>Lokasi Rak</TableCell>
                  <TableCell>Deskripsi</TableCell>
                  <TableCell>Harga Jual (Rp)</TableCell>
                  <TableCell>Harga Beli (Rp)</TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell>Tipe Motor</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBarangData.map((item) => (
                  <TableRow key={item.id_barang}>
                    <TableCell>{item.part_no}</TableCell>
                    <TableCell>{item.nama_barang}</TableCell>
                    <TableCell>{item.jumlah_digudang}</TableCell>
                    <TableCell>{item.jumlah_ditoko}</TableCell>
                    <TableCell>{item.lokasi_rak}</TableCell>
                    <TableCell>{item.deskripsi}</TableCell>
                    <TableCell>{formatRupiah(item.harga_jual)}</TableCell>
                    <TableCell>{formatRupiah(item.harga_beli)}</TableCell>
                    <TableCell>{item.kategori_barang?.nama_kategori_barang}</TableCell>
                    <TableCell>{item.type_motor?.type_motor}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleAddBarang(item)}>
                        <FontAwesomeIcon icon={faPlus} size='2x' />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <Button variant='contained' onClick={handleSaveSparepart} style={{ marginTop: '10px' }}>Back</Button> */}
          <Button variant="contained" onClick={() => setSparepartModalOpen(false)} style={{ marginLeft: '10px', marginTop: '10px' }} >Back</Button>
        </form>
      </Modal>

      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
            Transaksi successfully created
          </Alert>
        </Snackbar>
        <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
            Part number already exists. Please use a different part number.
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
            Are you sure you want to delete barang "{selectedRow?.nama_barang}"?
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

      <Snackbar open={deleteSnackbar} autoHideDuration={6000} onClose={() => setDeleteSnackbar(false)}>
          <Alert onClose={handleClose} severity="success" variant="filled" >
            Barang deletd successfully!
          </Alert>
        </Snackbar>
        <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={3000} 
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
      <Modal
        isOpen={invoiceModalOpen}
        onRequestClose={() => setInvoiceModalOpen(false)}
        contentLabel="Invoice"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            padding: '20px',
            borderRadius: '20px',
            border: '2px solid gray',
            zIndex: 1000, // Tambahkan z-index yang lebih tinggi
          },
          overlay: {
            zIndex: 999, // Pastikan overlay juga memiliki z-index yang lebih tinggi
          },
        }}
      >
        <h2 style={{textAlign: 'center'}}><strong>INVOICE</strong></h2>
        <div>
          <p>ID Transaksi: <strong>{formData.id_transaksi}</strong></p>
          <p>Bill To : <strong>{customerName}</strong></p>
          <p>Plat Motor : <strong>{platMotor}</strong></p>
          <p>Mekanik : <strong>{mechanicName}</strong></p>
          <p>Diagnosis : <strong>{serviceData.diagnosis}</strong></p>
          <p>Jenis Layanan : <strong>{serviceData.serviceType}</strong></p>
          <p>Tanggal : <strong>{new Date().toLocaleDateString()}</strong></p>
          <p>Dibuat oleh : <strong>{localStorage.getItem('name')}</strong></p>
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
              {transaksiData.map((item) => (
                <TableRow key={item.id_barang}>
                  <TableCell>{item.nama_barang}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatRupiah(item.harga_jual)}</TableCell>
                  <TableCell>{formatRupiah(item.total)}</TableCell>
                </TableRow>
              ))}
              {serviceDataList.map((service, index) => (
                <TableRow key={index}>
                  <TableCell>{service.serviceType}</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>{formatRupiah(service.cost)}</TableCell>
                  <TableCell>{formatRupiah(service.cost)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right"><strong>Grand Total:</strong></TableCell>
                <TableCell><strong>{formatRupiah(totalCost + totalSparepartCost)}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Button marginTop='3px' variant='contained' color='error' onClick={() => setInvoiceModalOpen(false)} style={{marginTop: '10px'}}>Close</Button>
        <Button marginTop='3px' variant='contained' color='secondary' onClick={handlePrintInvoice} style={{marginTop: '10px', marginLeft: '10px'}}>Cetak Invoice</Button>
      </Modal>
    </div>
  );
};

export default BarangList;

