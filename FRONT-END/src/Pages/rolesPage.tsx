import { useEffect, useState } from "react";
import { useRolService } from "../api/services/rolesServices";
import { roles_type } from "../types";

const RolPage: React.FC = () => {
    const {getAll} = useRolService();

    const [users, setUsers] = useState<roles_type[]>([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        const data = await getAll();
        setUsers(data);
      };
  
      fetchUsers();
    }, [getAll]);
  
    // const handleAddUser = async (user: User) => {
    //   const newUser = await create(user);
    //   setUsers((prev) => [...prev, newUser]);
    // };
  
    // const handleDeleteUser = async (id: number) => {
    //   await remove(id);
    //   setUsers((prev) => prev.filter((user) => user.id !== id));
    // };
  
    return (
      <div>
        <h1>Users</h1>
        {users.map((user) => (
            <p>{user.nombreRol}</p>
        ))}
        {/* <UserForm onSubmit={handleAddUser} /> */}
        {/* <UsersTable users={users} onDelete={handleDeleteUser} /> */}
      </div>
    );
  };
  
  export default RolPage;