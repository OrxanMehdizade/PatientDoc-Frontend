import React, { useState, useEffect } from "react";
import { Button, TextField, IconButton, Box } from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

const TreatmentOptionsSegment = ({
  title,
  items = [], // Provide default value for items
  fetchItems,
  addItem,
  saveItem,
  deleteItem,
}) => {
  const [localItems, setLocalItems] = useState([]);
  const [content, setContent] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleEdit = (id) => {
    const itemToEdit = localItems.find((item) => item.id === id);
    if (itemToEdit) {
      setContent(itemToEdit.name);
      setEditingItemId(id);
    }
  };

  const handleSave = async () => {
    if (editingItemId !== null) {
      await saveItem(editingItemId, content);
      fetchItems();
    }
    setEditingItemId(null);
    setContent("");
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
    if (id === editingItemId) {
      setEditingItemId(null);
      setContent("");
    }
  };

  const handleAdd = async () => {
    const newItem = await addItem();
    setLocalItems([...localItems, newItem]);
    setEditingItemId(newItem.id);
    setContent(newItem.name);
  };

  const isAnyItemEditing = localItems.some((item) => item.id === editingItemId);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <h2>{title}</h2>
      {localItems.map((item) => (
        <Box key={item.id} display="flex" alignItems="center" mb={2}>
          <TextField
            variant="outlined"
            value={item.id === editingItemId ? content : item.name}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={item.id === editingItemId ? handleKeyDown : null}
            disabled={item.id !== editingItemId}
            size="small"
          />
          <IconButton onClick={() => handleDelete(item.id)} color="error">
            <DeleteIcon />
          </IconButton>
          {item.id === editingItemId ? (
            <IconButton onClick={handleSave} color="primary">
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => handleEdit(item.id)}
              color="primary"
              disabled={isAnyItemEditing}
            >
              <EditIcon />
            </IconButton>
          )}
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        className="app-theme-color"
        disabled={isAnyItemEditing}
      >
        Add
      </Button>
    </Box>
  );
};

export default TreatmentOptionsSegment;
