import { Table, Badge, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import useData from "../context/data/useData";
import Can from "./Can";

const UserList = () => {
  const { users, deleteUser } = useData();

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.id}</Table.Td>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>
        <Badge
          color={
            user.role === "Admin"
              ? "red"
              : user.role === "Editor"
              ? "blue"
              : "gray"
          }
        >
          {user.role}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Can perform="write:users">
          <ActionIcon
            color="red"
            variant="subtle"
            onClick={() => deleteUser(user.id)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Can>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Username</Table.Th>
          <Table.Th>Role</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default UserList;
