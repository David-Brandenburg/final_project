import React, { useState } from "react";
import "./addGamePage.scss";

const initialData = {
  thumbnail: "",
  price: 0,
  discount: 0,
  title: "",
  platforms: [],
  description: "",
  rating: "",
  publisher: "",
  genres: [],
  dlc: false,
  pageThumbnail: "",
  logo: "",
  bgPic: "",
  pics: [],
  tags: [],
  trailer: [],
  functions: [],
  salesHistory: [],
  sold: 0,
  releaseDate: "",
  earlyAccess: false,
  languages: [],
  trailerThumbnails: [],
};

const tagOptions = [
  "Abenteuer",
  "Spannende Geschichte",
  "Rollenspiel",
  "Atmosphärisch",
  "Science Fiction",
  "Wissenschaft",
  "Klassisch",
  "Toller Soundtrack",
  "Weibliche Protagonistin",
  "Entscheidungen Zählen",
  "Third Person",
  "Weltraum",
  "Mehrere Enden",
  "Good Old Game",
  "Rätsel",
  "action",
  "Remake",
  "Erkundung",
  "Gewalttätig",
  "Amazon Luna",
];

const functionOptions = [
  "Einzelspieler",
  "Cloud-Speicherstände",
  "Mehrspieler",
  "Einblendungen",
  "Erfolge",
  "Controller-Unterstützung",
];

const genreOptions = [
  "Action",
  "Abenteuer",
  "Rollenspiel",
  "Simulation",
  "Strategie",
  "Science Fiction",
  "Horror",
  "Erkundung",
];

const languageOptions = [
  "English",
  "español",
  "français",
  "Deutsch",
  "italiano",
  "日本語",
  "한국어",
  "Polski",
  "Português",
  "русский",
  "中文",
  "Dansk",
  "magyar",
  "nederlands",
  "Português do Brasil",
  "slovenský",
  "Suomi",
  "svenska",
  "Türkçe",
  "český",
  "Ελληνικά",
  "Українська",
  "中文简体",
];

function AddGamePage() {
  const [data, setData] = useState(initialData);
  const [newTag, setNewTag] = useState("");
  const [newFunction, setNewFunction] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleArrayChange = (e, key, index) => {
    const { value } = e.target;
    const newArray = [...data[key]];
    newArray[index] = value;
    setData({
      ...data,
      [key]: newArray,
    });
  };

  const addInputField = (key) => {
    setData({
      ...data,
      [key]: [...data[key], ""],
    });
  };

  const removeInputField = (key, index) => {
    const newArray = [...data[key]];
    newArray.splice(index, 1);
    setData({
      ...data,
      [key]: newArray,
    });
  };

  const handleNewTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleNewGenreChange = (e) => {
    setNewGenre(e.target.value);
  };

  const handleNewLanguageChange = (e) => {
    setNewLanguage(e.target.value);
  };

  const handleNewFunctionChange = (e) => {
    setNewFunction(e.target.value);
  };

  const handleAddNewTag = () => {
    if (newTag.trim() !== "" && !data.tags.includes(newTag)) {
      setData({
        ...data,
        tags: [...data.tags, newTag],
      });
      setNewTag("");
    }
  };

  const handleAddNewGenre = () => {
    if (newGenre.trim() !== "" && !data.genres.includes(newGenre)) {
      setData({
        ...data,
        genres: [...data.genres, newGenre],
      });
      setNewGenre("");
    }
  };

  const handleAddNewLanguage = () => {
    if (newLanguage.trim() !== "" && !data.languages.includes(newLanguage)) {
      setData({
        ...data,
        languages: [...data.languages, newLanguage],
      });
      setNewLanguage("");
    }
  };

  const handleAddNewFunction = () => {
    if (newFunction.trim() !== "" && !data.functions.includes(newFunction)) {
      setData({
        ...data,
        functions: [...data.functions, newFunction],
      });
      setNewFunction("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/games/addGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Thumbnail: </label>
          <input
            name="thumbnail"
            value={data.thumbnail}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Discount: </label>
          <input
            type="number"
            name="discount"
            value={data.discount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Title: </label>
          <input name="title" value={data.title} onChange={handleChange} />
        </div>
        <div>
          <label>Platforms: </label>
          {data.platforms.map((platform, index) => (
            <div key={index}>
              <input
                value={platform}
                onChange={(e) => handleArrayChange(e, "platforms", index)}
              />
              <button
                type="button"
                onClick={() => removeInputField("platforms", index)}>
                -
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addInputField("platforms")}>
            Add Platform
          </button>
        </div>
        <div>
          <label>Description: </label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rating: </label>
          <input name="rating" value={data.rating} onChange={handleChange} />
        </div>
        <div>
          <label>Publisher: </label>
          <input
            name="publisher"
            value={data.publisher}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Genres:</label>
          <div>
            {data.genres.map((genre, index) => (
              <div key={index}>
                <input
                  value={genre}
                  onChange={(e) => handleArrayChange(e, "genres", index)}
                />
                <button
                  type="button"
                  onClick={() => removeInputField("genres", index)}>
                  -
                </button>
              </div>
            ))}
            <select onChange={handleNewGenreChange} value={newGenre}>
              <option value="">Select or type a new genre</option>
              {genreOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddNewGenre}>
              Add
            </button>
          </div>
        </div>
        <div>
          <label>DLC: </label>
          <input
            type="checkbox"
            name="dlc"
            checked={data.dlc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Page Thumbnail: </label>
          <input
            name="pageThumbnail"
            value={data.pageThumbnail}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Logo: </label>
          <input name="logo" value={data.logo} onChange={handleChange} />
        </div>
        <div>
          <label>Background Picture: </label>
          <input name="bgPic" value={data.bgPic} onChange={handleChange} />
        </div>
        <div>
          <label>Pics: </label>
          {data.pics.map((pic, index) => (
            <div key={index}>
              <input
                value={pic}
                onChange={(e) => handleArrayChange(e, "pics", index)}
              />
              <button
                type="button"
                onClick={() => removeInputField("pics", index)}>
                -
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addInputField("pics")}>
            Add Picture
          </button>
        </div>
        <div>
          <label>Tags:</label>
          <div>
            {data.tags.map((tag, index) => (
              <div key={index}>
                <input
                  value={tag}
                  onChange={(e) => handleArrayChange(e, "tags", index)}
                />
                <button
                  type="button"
                  onClick={() => removeInputField("tags", index)}>
                  -
                </button>
              </div>
            ))}
            <select onChange={handleNewTagChange} value={newTag}>
              <option value="">Select or type a new tag</option>
              {tagOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddNewTag}>
              Add
            </button>
          </div>
        </div>
        <div>
          <label>Trailer: </label>
          {data.trailer.map((trailer, index) => (
            <div key={index}>
              <input
                value={trailer}
                onChange={(e) => handleArrayChange(e, "trailer", index)}
              />
              <button
                type="button"
                onClick={() => removeInputField("trailer", index)}>
                -
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addInputField("trailer")}>
            Add Trailer
          </button>
        </div>
        <div>
          <label>Functions:</label>
          <div>
            {data.functions.map((func, index) => (
              <div key={index}>
                <input
                  value={func}
                  onChange={(e) => handleArrayChange(e, "functions", index)}
                />
                <button
                  type="button"
                  onClick={() => removeInputField("functions", index)}>
                  -
                </button>
              </div>
            ))}
            <select onChange={handleNewFunctionChange} value={newFunction}>
              <option value="">Select or type a new function</option>
              {functionOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddNewFunction}>
              Add
            </button>
          </div>
        </div>
        <div>
          <label>Sold: </label>
          <input
            type="number"
            name="sold"
            value={data.sold}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Release Date: </label>
          <input
            name="releaseDate"
            value={data.releaseDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Early Access: </label>
          <input
            type="checkbox"
            name="earlyAccess"
            checked={data.earlyAccess}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Languages:</label>
          <div>
            {data.languages.map((language, index) => (
              <div key={index}>
                <input
                  value={language}
                  onChange={(e) => handleArrayChange(e, "languages", index)}
                />
                <button
                  type="button"
                  onClick={() => removeInputField("languages", index)}>
                  -
                </button>
              </div>
            ))}
            <select onChange={handleNewLanguageChange} value={newLanguage}>
              <option value="">Select or type a new language</option>
              {languageOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddNewLanguage}>
              Add
            </button>
          </div>
        </div>
        <div>
          <label>Trailer Thumbnails: </label>
          {data.trailerThumbnails.map((thumb, index) => (
            <div key={index}>
              <input
                value={thumb}
                onChange={(e) =>
                  handleArrayChange(e, "trailerThumbnails", index)
                }
              />
              <button
                type="button"
                onClick={() => removeInputField("trailerThumbnails", index)}>
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addInputField("trailerThumbnails")}>
            Add Trailer Thumbnail
          </button>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddGamePage;
