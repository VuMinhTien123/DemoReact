import axios from 'axios'
import React, { useEffect, useState } from 'react'
import  Table from 'react-bootstrap/Table'
import { fetchAllUser } from '../services/UserServices';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalComfirm from './ModalComfirm';
import _ from 'lodash'
import { debounce } from 'lodash';
import './TableUser.scss'
import { CSVLink, CSVDownload } from 'react-csv';
import Papa from "papaparse"
import { toast } from 'react-toastify';

const TableUser = (props) => {

  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModalDelete, setIsShowMoDalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id")

  const [keyWord, setKeyWord] = useState("")
  const [dataExport, setDataExport] = useState([]);


  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowMoDalDelete(false)
  }

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  }

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex(item => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers); 
  }

  useEffect(() => {
    getUsers(1);
  }, [])

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if(res && res.data) {
      setListUsers(res.data)
      setTotalUsers(res.total)
      setTotalPages(res.total_pages); 
    }  
  }



  const handlePageClick = (event) => {
    // getUsers(1);
    getUsers(+event.selected + 1 );
  }

  const handleEditUser = (user) => {  
    setDataUserEdit(user);
    setIsShowModalEdit(true)
  }

  const handleDeleteUser = (user) => {
    setIsShowMoDalDelete(true);
    setDataUserDelete(user)
    console.log(user)
  }

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);

    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
    setListUsers(cloneListUsers);
  }

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField)

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
    setListUsers(cloneListUsers)
  }

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    console.log(term)
    if(term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
      setListUsers(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 500)

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];

  const getUsersExport = (event, done) => {
    let result = [];
    if(listUsers && listUsers.length > 0) {
      result.push("Id", "Email", "First name", "Last name")
      listUsers.map(item => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      })
      setDataExport(result);
      done();
    }
  }

  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];

      if(file.type !== "text/csv") {
        toast.error ("Only accept csv files...")
        return;
      }
      Papa.parse(file, {
        // header= true,
        complete: function(results) {
          let rawCSV = results.data;
          if(rawCSV.length > 0) {
            if(rawCSV[0] && rawCSV[0].length === 3 ) {
              if(rawCSV[0][0] !== "email"
              || rawCSV[0][1] !== "first_name"
              || rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrong format Header CSV file")
              } else {
                let result = [];

                rawCSV.map((item, index) => {
                  if(index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0]
                    obj.first_name = item[1]
                    obj.last_name = item[2]
                    result.push(obj);
                  }
                })
                setListUsers(result )
              }
            } else {
              toast.error("Wrong format CSV file")
            }
          } else {
              toast.error("Not found data on CSV file")
          }
        }
      })
    }
  }


  return (  
    <div>
      <div className='my-3 add-new s-sm-flex'>
              <span className='col-12 '> <b>List User:</b></span>
              <div className='group-btns mt-sm-0 mt-2'>
                <label htmlFor="test" className='btn btn-warning'>
                <i class="fa-solid fa-file-import"></i> Import
                </label>
                <input id="test" type='file' hidden
                onChange={(event) => handleImportCSV(event)}
                />
                
                <CSVLink 
                  filename={"user.csv"}
                  className='btn btn-primary'
                data={dataExport}
                asyncOnClick = {true}
                onClick={getUsersExport}
                > <i className="fa-sharp fa-solid fa-file-arrow-down"></i> Export</CSVLink>

                {/* <CSVDownload data = {csvData} target='_blank'/> */}

                <button 
              className='btn btn-success' 
              onClick={() =>setIsShowModalAddNew(true) } 
              > 
              <i className="fa-solid fa-plus"></i>  Add new
              </button>
              </div>
              
      </div>
    <div className='col-12 col-sm-4 my-3'>
      <input className='form-control' 
      placeholder='search user by email...'
      // value={keyWord}
      onChange={(event) => handleSearch(event)}
       />
    </div>
      
      <Table striped bordered hover size="sm" className='customize-table'>
      <thead>
        <tr>
          <th >
            <div className='sort-header'>
            <span>ID</span>
           <span>
           <i 
           className="fa-solid fa-arrow-down"
           onClick={() => handleSort("desc", "id")}
           ></i>
            <i 
            className="fa-solid fa-arrow-up"
            onClick={() => handleSort("asc", "id")}
            ></i>
           </span>
            </div>
            
            </th>
          <th >email</th>
          <th >
            <div className='sort-header'>
            <span>first_name</span>
            <span>
           <i 
           className="fa-solid fa-arrow-down"
           onClick={() => handleSort("desc", "first_name")}
           ></i>
            <i 
            className="fa-solid fa-arrow-up"
            onClick={() => handleSort("asc", "first_name")}
            ></i>
           </span>
            </div>
            
            </th>
          <th >last_name</th>
          <th >actions</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length >0 && 
        listUsers.map((item, index) => {
          return (
        <tr key={`user-${index}`}>
          <td>{item.id}</td>
          <td>{item.email}</td>
          <td> {item.first_name}</td>
          <td>{item.last_name} </td>
          <td>
            <button 
            className='btn btn-warning mx-3'
            onClick={() => handleEditUser(item)}
            > Edit
              </button>
            <button 
            className='btn btn-danger'
            onClick={() => handleDeleteUser(item)}
            >
              Delete
              </button>
          </td>
        </tr>
          )
        })}     
      </tbody>
    </Table>
    <ReactPaginate
    // className='text-center'
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}

        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
      />
      <ModalAddNew 
          show = {isShowModalAddNew}
          handleClose = {handleClose}
          handleUpdateTable = {handleUpdateTable}
          />
          <ModalEditUser
          show = {isShowModalEdit}
          dataUserEdit = {dataUserEdit}
          handleClose = {handleClose}
          handleEditUserFromModal = {handleEditUserFromModal}
           />
           <ModalComfirm
           show = {isShowModalDelete}
           handleClose = {handleClose}
           dataUserDelete = {dataUserDelete}
           handleDeleteUserFromModal = {handleDeleteUserFromModal}
            />
      
    </div> 
  )
}

export default TableUser
