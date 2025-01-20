import React, { useContext, useEffect, useState } from "react";
import API from "../../utils/api";
import { AuthContext } from "../../context/authContext";
import { Tab, Nav, Row, Col, Form, Button } from "react-bootstrap";
import "./adminPanel.css"; // Import custom styles

const AdminPage = () => {
  const { admin, logout } = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    itemName: "",
    description: "",
    price: "",
    itemImage: null,
  });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await API.get("/admin/menu");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Failed to fetch menu items", error);
      }
    };
    fetchMenuItems();
  }, []);

  // Add new item to the menu
  const handleAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("itemName", newItem.itemName);
    formData.append("description", newItem.description);
    formData.append("price", newItem.price);
    formData.append("itemImage", newItem.itemImage);

    try {
      await API.post("/admin/menu", formData);
      setNewItem({ itemName: "", description: "", price: "", itemImage: null });
      alert("Item added successfully!");
    } catch (error) {
      console.error("Failed to add item", error);
      alert("Error adding item!");
    }
  };

  // Edit existing menu item
  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("itemName", editingItem.itemName);
    formData.append("description", editingItem.description);
    formData.append("price", editingItem.price);
    if (editingItem.itemImage) {
      formData.append("itemImage", editingItem.itemImage);
    }

    try {
      await API.put(`/admin/menu/${editingItem._id}`, formData);
      setEditingItem(null);
      alert("Item updated successfully!");
    } catch (error) {
      console.error("Failed to update item", error);
      alert("Error updating item!");
    }
  };

  // Delete menu item
  const handleDeleteItem = async (id) => {
    try {
      await API.delete(`/admin/menu/${id}`);
      setMenuItems(menuItems.filter(item => item._id !== id));
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Failed to delete item", error);
      alert("Error deleting item!");
    }
  };

  if (!admin) return <p>Please log in to view this page.</p>;

  return (
    <div className="container login-form admin-page">
      <h1 className="admin-title">Welcome, {admin.username}</h1>
      <Tab.Container id="left-tabs-example" defaultActiveKey="addItem">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="addItem">Add Item</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="viewItems">View Items</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="editItem">Edit Item</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="addItem">
                <h2>Add New Menu Item</h2>
                <Form onSubmit={handleAddItem} className="form-container">
                  <Form.Group controlId="itemName">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter item name"
                      value={newItem.itemName}
                      onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="itemImage">
                    <Form.Label>Item Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setNewItem({ ...newItem, itemImage: e.target.files[0] })}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="btn-theme">
                    Add Item
                  </Button>
                </Form>
              </Tab.Pane>

              <Tab.Pane eventKey="viewItems">
                <h2>View Menu Items</h2>
                <ul>
                  {menuItems.map((item) => (
                    <li key={item._id}>
                      <p>{item.itemName} - {item.price}</p>
                      <Button variant="danger" onClick={() => handleDeleteItem(item._id)} className="btn-danger">
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              </Tab.Pane>

              <Tab.Pane eventKey="editItem">
                <h2>Edit Menu Item</h2>
                {editingItem ? (
                  <Form onSubmit={handleUpdateItem} className="form-container">
                    <Form.Group controlId="itemName">
                      <Form.Label>Item Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={editingItem.itemName}
                        onChange={(e) => setEditingItem({ ...editingItem, itemName: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="price">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        value={editingItem.price}
                        onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="itemImage">
                      <Form.Label>Item Image</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => setEditingItem({ ...editingItem, itemImage: e.target.files[0] })}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="btn-theme">
                      Update Item
                    </Button>
                  </Form>
                ) : (
                  <p>Select an item to edit.</p>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Button variant="secondary" onClick={logout} className="btn-theme">
        Logout
      </Button>
    </div>
  );
};

export default AdminPage;
