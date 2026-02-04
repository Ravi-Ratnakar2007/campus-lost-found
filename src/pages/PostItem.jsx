import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function PostItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "lost",
    location: "",
    description: "",
    contact: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "items"), {
        ...formData,
        createdAt: serverTimestamp()
      });

      alert("Item posted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container">
      <h1>Post Lost / Found Item</h1>

      <form className="post-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Item name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Documents">Documents</option>
          <option value="Accessories">Accessories</option>
          <option value="Others">Others</option>
        </select>

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          name="contact"
          placeholder="Contact info"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL (temporary)"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit">Post Item</button>
      </form>
    </div>
  );
}

export default PostItem;
