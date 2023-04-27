import React, { useState, useEffect } from 'react'
import Table from './Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InputForm() {

    const [contacts, setContacts] = useState([]);
    const [showContacts, setShowContacts] = useState([]);

    const fetchAllData = () => {

        fetch('https://easyops-internship-backend.onrender.com/contact/').then((data) => data.json()).then((reqData) => { setContacts(reqData.content.data);
    setShowContacts(reqData.content.data)});
        
    }
    useEffect(() => {

        fetchAllData();

    }, []);

    const handleSubmit = async (e) => {

        const First = document.getElementById('nameInput').value;
        const Last = document.getElementById('lastNameInput').value;
        const Contact = document.getElementById('contactNumberInput').value;

        document.getElementById('nameInput').value = "";
        document.getElementById('lastNameInput').value = "";
        document.getElementById('contactNumberInput').value = "";

        const Name = (First.trim() + "|" + Last.trim()).split("|").join(" ");
        
        const responseData = await fetch('https://easyops-internship-backend.onrender.com/contact/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name,
                Contact
            })
        });

        const response = await responseData.json();

        if(response.status) {

            toast.success(`${Name} successfully added!`, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });

            setContacts([...contacts, response.content.data]);
            setShowContacts([...contacts, response.content.data]);
        }
        else {

            toast.error(response.errors[0].message, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    }

    const handleSearch = (e) => {

        let contactsToShow = contacts.filter((contact) => { return contact.Name.includes(e.target.value)});

        setShowContacts([...contactsToShow]);
    }

  return (
    <>
    <div className="formContainer">

        <label htmlFor="nameInput" className="labelField" id="nameLabel">Person's Name</label>
        <div className="nameContainer">
            <input type="text" className="inputFieldName" id="nameInput" name="First" placeholder='First' />
            <input type="text" className="inputFieldName" id="lastNameInput" name="Last" placeholder='Last'/>
        </div>

        <label htmlFor="contactNumberInput" id="contactLabel" className="labelField">Contact Number</label>
        <input type="number" className="inputField" id="contactNumberInput" name="Contact" />

        <button className="saveBtn" id='saveButton' onClick={handleSubmit}>
            Save
        </button>
    </div>

    <div className="dataContainer">
        <div className="searchContainer">
            <i className="fa-solid fa-magnifying-glass" id="searchButton" ></i>
            <input type="text" className="searchField" id="search" onChange={handleSearch}/>
        </div>

        <Table contacts={showContacts} toast={toast} fetchAllData={fetchAllData} setShowContacts={setShowContacts}/>
    </div>

    <ToastContainer />

    </>
  )
}
