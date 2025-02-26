import "./UserCard.scss";
import { User } from "../UserBox/UserBox";
import Button from "../../Buttons/button";

import img from "./img.gif";

interface UserCardProps extends User {
  onDelete: (index: number) => void; //onDelete som en funktion från UserCard
  handleEditChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => void;
  handleEdit: (index: number) => void;
  handleSaveEdit: () => void;
  user: User;
  index: number;
  editingIndex: number | null;
}

export default function UserCard({
  user,
  index,
  editingIndex,
  onDelete,
  handleEdit,
  handleEditChange,
  handleSaveEdit,
}: UserCardProps) {
  return (
    <div key={index} className="userCard">
      {editingIndex === index ? (
        <>
          <input
            type="text"
            value={user.name}
            onChange={(e) => handleEditChange(e, "name")}
          />
          <input
            type="number"
            value={user.age}
            onChange={(e) => handleEditChange(e, "age")}
          />
          <Button title="Save" handleClick={handleSaveEdit} />
        </>
      ) : (
        <>
          <img src={img} alt="User Avatar" />
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <Button title="Edit" handleClick={() => handleEdit(index)} />
          <Button title="Delete" handleClick={() => onDelete(index)} />
        </>
      )}
    </div>
  );
}
