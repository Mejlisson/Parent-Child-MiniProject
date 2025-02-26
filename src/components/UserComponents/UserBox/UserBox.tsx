import { useState, useEffect } from "react";
import Button from "../../Buttons/button";
import UserCard from "../../UserComponents/UserCard/UserCard";
import "./User.scss";

export type User = {
  name: string;
  age: number;
  id?: number;
};

export default function UserBox() {
  const [user, setUser] = useState<User>({ name: "", age: 0 });
  const [users, setUsers] = useState<User[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Håller koll på vilken användare som redigeras

  //logga state
  useEffect(() => {
    console.log("Users updated:", user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = {
        ...updatedUsers[editingIndex],
        [field]: e.target.value,
      };
      setUsers(updatedUsers);
    }
  };

  const handleSubmit = () => {
    if (user.name && user.age) {
      setUsers([...users, user]);
      setUser({ name: "", age: 0, id: nanoid() });
    }
  };

  const handleDelete = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    setEditingIndex(null);
  };

  const deleteAll = () => {
    setUsers([]);
  };

  const resetInput = (key: keyof User) => {
    setUser((prevUser) => ({
      ...prevUser,
      [key]: key === "age" ? 0 : "",
    }));
  };

  return (
    <div className="userBox">
      <p>User</p>
      <div className="inputWrapper">
        <label htmlFor="name">Name:</label>

        <div className="inputContainer">
          <input
            className="nameInput"
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <button className="resetNameInput" onClick={() => resetInput("name")}>
            X
          </button>
        </div>
      </div>
      <div className="inputWrapper">
        <label htmlFor="age">Age:</label>

        <div className="inputContainer">
          <input
            className="ageInput"
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
          />
          <button className="resetAgeInput" onClick={() => resetInput("age")}>
            X
          </button>
        </div>
      </div>
      <Button title="Submit" handleClick={handleSubmit} />
      <div className="userContainer">
        {" "}
        {users.map((user, index) => (
          <UserCard
            key={user.id}
            {...user}
            onDelete={() => handleDelete(index)}
            user={user}
            index={index}
            editingIndex={editingIndex}
            handleEdit={handleEdit}
            handleEditChange={handleEditChange}
            handleSaveEdit={handleSaveEdit}
          /> // handleDelete funktionen
        ))}
      </div>
      {users.length > 1 && (
        <Button title="Delete all" handleClick={() => deleteAll()} />
      )}
    </div>
  );
}
function nanoid(): number | undefined {
  throw new Error("Function not implemented.");
}
