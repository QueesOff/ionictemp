import React, { useState } from "react";
import { storage, firestore } from "../firebase"
import { v4 as uuidv4 } from "uuid";

const AddNewsPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (image) {
      const imageName = `${uuidv4()}-${image.name}`;
      const storageRef = storage.ref(`news/${imageName}`);
      await storageRef.put(image);

      const downloadURL = await storageRef.getDownloadURL();

      await firestore.collection("news").add({
        title,
        desc,
        image: downloadURL,
      });

      setTitle("");
      setDesc("");
      setImage(null);
    }
  };

  return (
    <div>
      {/* <h2>Add News</h2> */}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={desc} onChange={handleDescChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddNewsPage;
