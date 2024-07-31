/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
  CAvatar,
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const Ticket = () => {
  const [details, setDetails] = useState([])

  const columns = [
    { key: 'avatar', label: '', filter: false, sorter: false },
    { key: 'name', _style: { width: '20%' } },
    'registered',
    { key: 'role', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
    { key: 'show_details', label: '', _style: { width: '1%' }, filter: false, sorter: false },
  ]

  const usersData = [
    {
      id: 1,
      name: 'Samppa Nori',
      avatar: '1.jpg',
      registered: '2022/01/01',
      role: 'Member',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Estavan Lykos',
      avatar: '2.jpg',
      registered: '2022/02/07',
      role: 'Staff',
      status: 'Banned',
    },
    // ... (other user data)
  ]

  const getBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Banned':
        return 'danger'
      default:
        return 'primary'
    }
  }

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  return (
    <CTable responsive striped hover>
      <CTableHead>
        <CTableRow>
          {columns.map((col) => (
            <CTableHeaderCell key={col.key} style={col._style}>
              {col.label}
            </CTableHeaderCell>
          ))}
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {usersData.map((user) => (
          <React.Fragment key={user.id}>
            <CTableRow>
              <CTableDataCell>
                <CAvatar src={`/images/avatars/${user.avatar}`} />
              </CTableDataCell>
              <CTableDataCell>{user.name}</CTableDataCell>
              <CTableDataCell>{user.registered}</CTableDataCell>
              <CTableDataCell>{user.role}</CTableDataCell>
              <CTableDataCell>
                <CBadge color={getBadge(user.status)}>{user.status}</CBadge>
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(user.id)
                  }}
                >
                  {details.includes(user.id) ? 'Hide' : 'Show'}
                </CButton>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell colSpan="6" className="p-0">
                <CCollapse visible={details.includes(user.id)}>
                  <CCardBody className="p-3">
                    <h4>{user.name}</h4>
                    <p className="text-muted">User since: {user.registered}</p>
                    <CButton size="sm" color="info">
                      User Settings
                    </CButton>
                    <CButton size="sm" color="danger" className="ml-1">
                      Delete
                    </CButton>
                  </CCardBody>
                </CCollapse>
              </CTableDataCell>
            </CTableRow>
          </React.Fragment>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default Ticket
