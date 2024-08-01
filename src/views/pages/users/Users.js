/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
  CRow,
  CCol,
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CPagination,
  CPaginationItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormCheck,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilPlus } from '@coreui/icons';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.10.1.123:3000/api/users'); // Replace with your API endpoint
        const data = await response.json();
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { key: 'id', label: '#', _props: { scope: 'col' } },
    { key: 'tittle',  label: 'Nama Users', _props: { scope: 'col' } },
    { key: 'heading_1', label: 'Heading', _props: { scope: 'col' } },
    { key: 'heading_2', label: 'Heading', _props: { scope: 'col' } },
    { key: 'heading_3', label: 'Heading 3', _props: { scope: 'col' } },
    { key: 'aksi', label: 'Aksi', _props: { scope: 'col' } },
  ];

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredItems = items.filter(item =>
    item.class.toLowerCase().includes(searchTerm) ||
    item.heading_1.toLowerCase().includes(searchTerm) ||
    item.heading_2.toLowerCase().includes(searchTerm) ||
    item.heading_3.toLowerCase().includes(searchTerm)
  );

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const generateCellProps = (id, additionalProps = {}) => ({
    id: { scope: 'row' },
    ...additionalProps,
  });

  const cellProps = {
    1: generateCellProps(1),
    2: generateCellProps(2),
    3: generateCellProps(3),
  };

  return (
    <CContainer>
      <CRow className="mb-3">
        <CCol>
          <h2>User Users</h2>
        </CCol>
        <CCol className="d-flex justify-content-end">
          <CButton color="primary" onClick={() => setModalVisible(true)}>
            <CIcon icon={cilPlus} /> Add User
          </CButton>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol md={3}>
          <CInputGroup>
            <CInputGroupText>
              <CIcon icon={cilSearch} />
            </CInputGroupText>
            <CFormInput
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </CInputGroup>
        </CCol>
        <CCol md={2}>
          <CDropdown>
            <CDropdownToggle color="secondary">
              {itemsPerPage}
            </CDropdownToggle>
            <CDropdownMenu>
              {[5, 10, 15, 20].map((num) => (
                <CDropdownItem key={num} onClick={() => handleItemsPerPageChange(num)}>
                  {num}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
        </CCol>
      </CRow>
      <CTable responsive striped hover>
        <CTableHead>
          <CTableRow>
            {columns.map((col) => (
              <CTableHeaderCell key={col.key} {...col._props}>
                {col.label}
              </CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {displayedItems.map((item) => (
            <CTableRow key={item.id}>
              <CTableDataCell {...(cellProps[item.id]?.id || {})}>{item.id}</CTableDataCell>
              <CTableDataCell {...(cellProps[item.id]?.class || {})}>{item.class}</CTableDataCell>
              <CTableDataCell>{item.heading_1}</CTableDataCell>
              <CTableDataCell>{item.heading_2}</CTableDataCell>
              <CTableDataCell>{item.heading_3}</CTableDataCell>
              <CTableDataCell>
                <CButton color="warning" size="sm" onClick={() => handleEdit(item.id)}>Edit</CButton>{' '}
                <CButton color="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CRow className="mt-3">
        <CCol>
          <p>Showing {displayedItems.length} of {totalItems} items</p>
        </CCol>
        <CCol>
          <CPagination className="justify-content-end">
            <CPaginationItem disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
              First
            </CPaginationItem>
            <CPaginationItem disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </CPaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <CPaginationItem
                key={index}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </CPaginationItem>
            <CPaginationItem disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>
              Last
            </CPaginationItem>
          </CPagination>
        </CCol>
      </CRow>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader closeButton>Add User</CModalHeader>
        <CModalBody>
          <CForm>
            <CRow>
              <CCol md={6}>
                <CFormLabel>Username</CFormLabel>
                <CFormInput type="text" placeholder="Username" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Password</CFormLabel>
                <CFormInput type="password" placeholder="Password" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Name</CFormLabel>
                <CFormInput type="text" placeholder="Name" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Is Admin</CFormLabel>
                <CFormCheck label="Is Admin" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>First Name</CFormLabel>
                <CFormInput type="text" placeholder="First Name" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Last Name</CFormLabel>
                <CFormInput type="text" placeholder="Last Name" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Email</CFormLabel>
                <CFormInput type="email" placeholder="Email" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>No HP</CFormLabel>
                <CFormInput type="text" placeholder="+62" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Tanggal Lahir</CFormLabel>
                <CFormInput type="date" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>No KTP</CFormLabel>
                <CFormInput type="text" placeholder="No KTP" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Jalan</CFormLabel>
                <CFormInput type="text" placeholder="Jalan" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Kota</CFormLabel>
                <CFormInput type="text" placeholder="Kota" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Provinsi</CFormLabel>
                <CFormInput type="text" placeholder="Provinsi" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Negara</CFormLabel>
                <CFormInput type="text" placeholder="Negara" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Kode Pos</CFormLabel>
                <CFormInput type="text" placeholder="Kode Pos" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Photo</CFormLabel>
                <CFormInput type="file" />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
          <CButton color="primary">Save User</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

const handleEdit = (id) => {
  // Add your edit logic here
  console.log(`Edit item with id: ${id}`);
};

const handleDelete = (id) => {
  // Add your delete logic here
  console.log(`Delete item with id: ${id}`);
};

export default Users;
