import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const snap = await getDoc(doc(db, "items", id));
      if (snap.exists()) {
        setFormData(snap.data());
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "items", id), formData);
    alert("Item updated");
    navigate(-1);
  };

  if (!formData) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h1>Edit Item</h1>

      <form className="post-form" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} />
        <input name="location" value={formData.location} onChange={handleChange} />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <input name="contact" value={formData.contact} onChange={handleChange} />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <button type="submit">Update Item</button>
      </form>
    </div>
  );
}

export default EditItem;
