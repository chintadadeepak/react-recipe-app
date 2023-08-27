import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/home.css";
import { getUserId } from "../hooks/getUserId";
import { useCookies } from "react-cookie";
function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = getUserId();
  const [cookie, _] = useCookies(["access_token"]);
  useEffect(() => {
    const savedRecipes = async () => {
      const response = await axios.get("http://localhost:3001/recipes");
      setRecipes(response.data);
    };
    const fetchSavedRecipes = async () => {
      const response = await axios.get(
        `http://localhost:3001/recipes/savedRecipes/ids/${userId}`
      );
      setSavedRecipes(response.data.savedRecipes);
    };
    savedRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          userId,
          recipeId,
        },
        {
          headers: { authorization: cookie.access_token },
        }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (recipeId) => savedRecipes.includes(recipeId);

  return (
    <div className="home-container">
      <h1 className="recipes-title">Recipes</h1>
      <ul className="recipes-list">
        {recipes.map((recipe) => (
          <li key={recipe._id} className="recipe-item">
            <h2 className="recipe-name">{recipe.name}</h2>
            <div>
              <p className="recipe-instructions">{recipe.instructions}</p>
            </div>
            <div>
              <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
            <p className="cooking-time">Cooking Time: {recipe.cookingTime}</p>
            <button
              disabled={isRecipeSaved(recipe._id)}
              onClick={() => saveRecipe(recipe._id)}
              className="saveButton"
            >
              {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
