import React, { useState, useEffect } from 'react';
import todo from "../todo.svg";
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todo = () => {

    // get data from localStorage

    const getLocalItems = () => {

        let list = localStorage.getItem('lists');
        console.log(list);

        if (list) {
            return JSON.parse(localStorage.getItem('lists'));
        }
        else {
            return [];
        }
    }


    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalItems());
    const [toggle, setToggle] = useState(true);
    const [editItemIs, setEditItemIs] = useState(null);

    // Add Items
    const addItems = () => {
        if (!inputData) {
            toast.warn("Please Add Some Item", {
                position: "top-center",

            });
        }
        else if (inputData && !toggle) {
            setItems(
                items.map((elem) => {
                    if (elem.id === editItemIs) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            );
            setToggle(true);
            setInputData('');
            setEditItemIs(null);

        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData])
            setInputData('');

        }
    }
    // Delete items
    const deleteItem = (index) => {
        const updatedItems = items.filter((elem) => {
            return index !== elem.id;
        });
        setItems(updatedItems);
    }

    // Remove All Items 

    const removeAll = () => {
        setItems([]);
    }

    // edit Items 

    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        })
        setToggle(false);
        setInputData(newEditItem.name);
        setEditItemIs(id);
    }

    // add data in localStorage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todoLogo" />
                        <figcaption>Add Your List Here ✌ </figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="✍ Add Item....." className="form-control" value={inputData} onChange={(e) => setInputData(e.target.value)} />
                        {
                            toggle ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItems}></i> :
                                <i className="far fa-edit add-btn" title="Update Item" onClick={addItems}></i>
                        }
                    </div>

                    <div className="showItems">

                        {
                            items.map((elem, ind) => {
                                return (

                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}>
                                            </i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                    </div>

                                )
                            })

                        }
                    </div>
                    <div className="showItem">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Todo
