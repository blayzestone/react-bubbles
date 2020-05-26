import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors, fetchingNewData }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColorValues, setNewColorValues] = useForm(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        const updatedColors = colors.map((color) => {
          return color.id === colorToEdit.id ? res.data : color;
        });
        updateColors(updatedColors);
      })
      .catch((err) => console.log(err));
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then((res) => {
        const filteredColors = colors.filter((color) => {
          return color.id !== res.data;
        });
        updateColors(filteredColors);
      })
      .catch((err) => console.log(err));
  };

  const createColor = (evt) => {
    evt.preventDefault();

    axiosWithAuth()
      .post("/colors", newColorValues)
      .then((res) => updateColors(res.data))
      .catch((err) => console.log(err));
  };

  const newColorChangeHandler = (evt) => {
    const { name, value } = evt.target;
    const values = {
      target: {
        name,
        value:
          name === "code" // structure this value in the correct format to submit it in a post request
            ? { hex: evt.target.value }
            : value,
      },
    };
    setNewColorValues(values);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* stretch - build another form here to add a color */}
      {!editing && (
        <form onSubmit={createColor}>
          <legend>Add color</legend>
          <label>
            color name:
            <input
              onChange={newColorChangeHandler}
              type="text"
              name="color"
              value={newColorValues.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={newColorChangeHandler}
              type="text"
              name="code"
              value={newColorValues.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
          </div>
        </form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
