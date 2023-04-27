import React from 'react'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Table(props) {

  const deleteContact = async (Name) => {

    const response = await fetch('https://easyops-internship-backend.onrender.com/contact/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name })
        });

        if(response.status) {

            props.toast.success(`${Name} successfully deleted!`,{
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
        else {

            props.toast.error(response.errors[0].message, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }

        props.fetchAllData();
  }

  const handleDeleteContact = (e, Name) => {

    const options = {
        title: `Delete ${Name}`,
        message: `Are you sure you want to delete ${Name}?`,
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteContact(Name)
          },
          {
            label: 'No',
          }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
      };

      confirmAlert(options);
  }

  const sortByName = () => {

    let contacts = props.contacts;

    contacts.sort((first, second) => {

        if(first.Name > second.Name) {

            return 1;
        }
        else {

            return -1;
        }
    });

    props.setShowContacts([...contacts]);
  }

  return (
    <table>
        <thead>
            <tr>
                <th>SN.</th>
                <th style={{cursor: 'pointer'}} onClick={sortByName}>Name</th>
                <th>Contact</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {props.contacts.map((contact, index) => {

                return (<tr key={contact._id}>
                    <td data-column="SN">{index + 1}</td>
                    <td data-column="Name">{contact.Name}</td>
                    <td data-column="Contact">{contact.Contact}</td>
                    <td data-column="Delete" className='deleteBtn' onClick={(e)=>{handleDeleteContact(e, contact.Name)}}>X</td>
                </tr>);
            })}
        </tbody>
    </table>
  )
}
