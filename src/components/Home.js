import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
function Home() {
    let [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    let [data, setData] = useState({
        loading: false,
        users: [],
        filteredUsers: [],
        errormessage: '',
    });

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setData({ ...data, loading: true });
                let response = await fetch('https://635ec2c0ed25a0b5fe4c8f78.mockapi.io/userdetails');
                let result = await response.json();
                setData({ ...data, loading: false, users: result, filteredUsers: result });
            } catch (err) {
                setData({ ...data, loading: false, errormessage: err.message });
            }
        };
        loadUsers();
    }, []);

    const DeleteUser = async (id) => {
        let response = await fetch(`https://635ec2c0ed25a0b5fe4c8f78.mockapi.io/userdetails/${id}`, { method: 'DELETE' });
        if (response) {
            try {
                setData({ ...data, loading: true });
                let response = await fetch('https://635ec2c0ed25a0b5fe4c8f78.mockapi.io/userdetails');
                let result = await response.json();
                setData({ ...data, loading: false, users: result, filteredUsers: result });
            } catch (err) {
                setData({ ...data, loading: false, errormessage: err.message });
            }
        }
    };

    let { loading, users, filteredUsers, errormessage } = data;

    const searchHandler = (e) => {
        setSearchValue(e.target.value);
        let theUser = users.filter((user) => {
            return user.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setData({ ...data, loading: false, filteredUsers: theUser });
    };

    return (
        <div className="container-fluid mt-5">
            <div className="card shadow mb-4">
                {/*    <!-- Card Header - Dropdown --> */}
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-around">
                    <h5
                        className="m-0 font-weight-bolder"
                        style={{ color: 'rgb(255, 102, 71)', fontWeight: '900', fontSize: '25px' }}
                    >
                        USERS LIST
                    </h5>
                    <form>
                        <div className="input-group">
                            <input
                                type="text"
                                name="text"
                                value={searchValue}
                                onChange={searchHandler}
                                placeholder="Search Users.."
                                id="home-search"
                            />
                            <div className="input-group-append">
                                <button
                                    type="button"
                                    style={{ backgroundColor: 'rgb(255, 102, 71)', color: '#fff' }}
                                    id="home-search-button"
                                >
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {/*  <!-- Card Body --> */}
                {loading ? (
                    <Spinner />
                ) : filteredUsers.length === 0 ? (
                    <div
                        className="col-lg-12 mt-4"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '25px',
                            fontWeight: '900',
                            color: 'tomato',
                            marginTop: '20px',
                        }}
                    >
                        No Match Found
                    </div>
                ) : (
                    <div className="card-body">
                        <main className="table">
                            <section className="table-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#Id</th>
                                            <th>Name</th>
                                            <th>Designation</th>
                                            <th>Email-Id</th>
                                            <th>Qualification</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="table-body" className="table-body-details">
                                        {filteredUsers.length > 0 &&
                                            filteredUsers.map((data, index) => {
                                                return (
                                                    <tr className="tablerow" key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{data.name}</td>
                                                        <td>{data.groupId}</td>
                                                        <td>{data.email}</td>
                                                        <td>{data.title}</td>
                                                        <td className="action-tabledata">
                                                            <div className="action-buttons">
                                                                <button
                                                                    onClick={() => navigate(`/view-user/${data.id}`)}
                                                                    className="view-button"
                                                                >
                                                                    <i className="fa-solid fa-eye"></i>
                                                                </button>
                                                                <button
                                                                    onClick={() => navigate(`/add-user/${data.id}`)}
                                                                    className="Edit-button"
                                                                >
                                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                                </button>
                                                                <button
                                                                    className="Delete-button"
                                                                    onClick={() => DeleteUser(data.id)}
                                                                >
                                                                    <i className="fa-solid fa-trash-can"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </section>
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
