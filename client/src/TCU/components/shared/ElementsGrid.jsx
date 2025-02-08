import { useState } from "react";
import { ContactCard } from "./ContactCard";
import ItemCard from "./ItemCard";
import { ItemDetailsCard } from "./ItemDetailsCard";
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";
import PropTypes from "prop-types";
import axios from "axios";
import { updatePost, uploadImage } from "../../utils/productService";

export const ElementsGrid = ({
  data,
  searchTerm,
  onCloseDeleteModal,
  onCloseEditModal,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productName, setProductName] = useState("");

  // Filtro segun tipo
  const filteredProducts = searchTerm
    ? data?.filter((element) =>
        element.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  const handleViewDetails = (element) => {
    setSelectedProduct(element);
    setShowContactForm(false);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleContact = (name) => {
    setProductName(name); // Save the product name
    setShowContactForm(true);
  };

  const handleSetEditProduct = (product) => {
    setProductToEdit(product);
    setShowEditModal(true);
  };

  const handleSetDeleteProduct = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    const productId = productToDelete?._id;

    axios.delete(`/api/v1/products/${productId}`).catch(() => {
      console.log("error");
    });

    onCloseDeleteModal();
    setShowDeleteModal(false);
  };

  const handleEdit = async (updatedProduct) => {
    let imageUrl = "";
    if (updatedProduct.imageLoaded) {
      const formData = new FormData();
      formData.append("image", updatedProduct.image);
      const { data } = await uploadImage(formData);
      imageUrl = data.image.src;
    }

    const newProductData = {
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      state: updatedProduct.state,
      image: updatedProduct.imageLoaded ? imageUrl : updatedProduct.image,
    };

    await updatePost(updatedProduct._id, newProductData);
    onCloseEditModal();
    setShowEditModal(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-6xl mx-auto">
        {filteredProducts?.map((element) => (
          <ItemCard
            key={element._id}
            name={element.name}
            description={element.description}
            image={element.image}
            type={element.type}
            price={element.price}
            state={element.state}
            onViewDetails={() => handleViewDetails(element)}
            onEdit={() => handleSetEditProduct(element)}
            onDelete={() => handleSetDeleteProduct(element)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ItemDetailsCard
          data={selectedProduct}
          onClose={handleCloseModal}
          onContact={handleContact} // Pass contact handler
        />
      )}

      {showContactForm && (
        <ContactCard
          productName={productName} // Pass productName to ContactCard
          onClose={() => setShowContactForm(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          product={productToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {showEditModal && (
        <EditModal
          product={productToEdit}
          onClose={() => {
            setShowEditModal(false);
          }}
          onSave={handleEdit}
        />
      )}
    </>
  );
};

ElementsGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  searchTerm: PropTypes.string,
  onCloseDeleteModal: PropTypes.func,
  onCloseEditModal: PropTypes.func,
};
