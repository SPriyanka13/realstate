import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  addUser,
  deleteUser,
  updateUser,
} from './features/users/userSlice'

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { list: users } = useSelector((state) => state.users);
  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
    hobbies: '',
    image: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setForm((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateUser({ ...form, id: editingId }));
      setEditingId(null);
    } else {
      dispatch(addUser(form));
    }
    setForm({ name: '', email: '', number: '', hobbies: '', image: '' });
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingId(user.id);
  };

  return (
    <div className="container">
      <h2>Redux CRUD Table</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="number" value={form.number} onChange={handleChange} placeholder="Phone Number" required />
        <input name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="Hobbies" />
        <input name="image" type="file" onChange={handleChange} accept="image/*" />
        {form.image && <img src={form.image} alt="Preview" className="preview" />}
        <button type="submit">{editingId ? 'Update' : 'Add'} User </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Number</th><th>Hobbies</th><th>Image</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.number}</td>
              <td>{u.hobbies}</td>
              <td>{u.image && <img src={u.image} alt="" className="table-img" />}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Edit</button>
                <button onClick={() => dispatch(deleteUser(u.id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
