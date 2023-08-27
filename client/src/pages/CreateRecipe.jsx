import React from "react";
import { useState } from "react";
import { getUserId } from "../hooks/getUserId";
import "../styles/recipe.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function CreateRecipe() {
  const userId = getUserId();
  const navigate = useNavigate();
  const [cookie, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userId,
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { authorization: cookie.access_token },
      });
      alert("Recipe Created!!");
    } catch (err) {
      console.error(err);
    }
    navigate("/");
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };
  return (
    <div className="container">
      <h2>CreateRecipe</h2>
      <form onSubmit={onSubmit} className="form">
        <label className="label" htmlFor="name">
          Recipe Name:
        </label>
        <input
          className="input"
          type="text"
          name="name"
          onChange={handleChange}
        />
        <label className="label" htmlFor="ingredients">
          Ingredients:
          <button className="addButton" type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
          {recipe.ingredients.map((ingredient, idx) => (
            <input
              className="input"
              key={idx}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, idx)}
            />
          ))}
        </label>
        <label className="label" htmlFor="instructions">
          Instructions:
        </label>
        <textarea
          className="textarea"
          name="instructions"
          onChange={handleChange}
        ></textarea>
        <label className="label" htmlFor="imageUrl">
          Image URL:
        </label>
        <input
          className="input"
          type="text"
          name="imageUrl"
          onChange={handleChange}
        />
        <label className="label" htmlFor="cookingTime">
          CookingTime:
        </label>
        <input
          className="input"
          type="number"
          name="cookingTime"
          onChange={handleChange}
        />
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
