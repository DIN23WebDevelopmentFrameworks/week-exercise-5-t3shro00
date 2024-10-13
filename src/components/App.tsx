import React, { useState, useEffect } from 'react';
import RecipeTagList from './RecipeTagList';
import RecipeList from './RecipeList';
import { IRecipe } from './interfaces';

const App: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  // Load tags when the component mounts
  useEffect(() => {
    fetch('https://dummyjson.com/recipes/tags')
      .then((res) => res.json())
      .then((data) => setTags(data));
  }, []);

  // Load recipes when a tag is selected
  useEffect(() => {
    if (selectedTag) {
      fetch(`https://dummyjson.com/recipes/tag/${selectedTag}`)
        .then((res) => res.json())
        .then((data) => setRecipes(data.recipes));
    }
  }, [selectedTag]);

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleBack = () => {
    setSelectedTag(null);
  };

  return (
    <div>
      <h1>ACME Recipe O'Master</h1>
      {selectedTag ? (
        <>
          <button onClick={handleBack}>Back</button>
          <RecipeList recipes={recipes} />
        </>
      ) : (
        <RecipeTagList tagList={tags} onSelectTag={handleSelectTag} />
      )}
    </div>
  );
};

export default App;
