export const createItem = ({
  name,
  category,
  status,
  location,
  description = "",
  imageUrl = "",
  contact = ""
}) => ({
  name,
  category,
  status,       // "lost" | "found"
  location,
  description,
  imageUrl,
  contact,
  createdAt: new Date()
});
