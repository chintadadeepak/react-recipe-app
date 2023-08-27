import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/home.css";
import { getUserId } from "../hooks/getUserId";
function SaveRecipe() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = getUserId();
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const response = await axios.get(
        `http://localhost:3001/recipes/savedRecipes/${userId}`
      );
      setSavedRecipes(response.data.savedRecipes);
    };
    fetchSavedRecipes();
  }, []);

  return (
    <div className="home-container">
      <h1 className="recipes-title">Saved Recipes</h1>
      <ul className="recipes-list">
        {savedRecipes.map((recipe) => (
          <li key={recipe._id} className="recipe-item">
            <h2 className="recipe-name">{recipe.name}</h2>
            <div>
              <p className="recipe-instructions">{recipe.instructions}</p>
            </div>
            <div>
              <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
            <p className="cooking-time">Cooking Time: {recipe.cookingTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SaveRecipe;
