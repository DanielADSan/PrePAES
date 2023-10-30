import React, { useState } from 'react';

function Avatares({selectedAvatar, setSelectedAvatar, avatar}) {
  
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal
  const avatars = [
    'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698699339/Avatares%20PrePAES/usuario_utpbap.png',
    'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698681866/Avatares%20PrePAES/avatarUno_vfoqgv.png',
    'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698681867/Avatares%20PrePAES/avatarCinco_mpopsp.png',
    'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698681867/Avatares%20PrePAES/avatarDos_vzxl47.png',
    'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698681866/Avatares%20PrePAES/avatarTres_daxlzr.png',
    'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698681866/Avatares%20PrePAES/avatarCuatro_ufwz9f.png',
    'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698681866/Avatares%20PrePAES/avatarSeis_fuhdnx.png',
  ];


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {

    setIsModalOpen(false);
    console.log('cerrado' + isModalOpen)

  };
  return (
    <>
    <div className="avatar-container" onClick={openModal}>
        {avatar == null ||
        selectedAvatar != 0 ? <img className="avatar-image" src={avatars[selectedAvatar]} alt="Avatar" /> : <img className="avatar-image" src={avatar} alt="Avatar" />  }
     \
    </div>
    {/* Modal */}
    {isModalOpen && (
        <div className="avatar-modal">
          <div className="avatar-modal-content">
            <span className="avatar-close" onClick={closeModal}>
              &times;
            </span>
            {/* Aquí puedes agregar las opciones para seleccionar una imagen */}
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt="Avatar"
                className="avatar-option"
                onClick={() => {
                  setSelectedAvatar(index);
                  closeModal();
                }}
              />
            ))}
          </div>
        </div>
      )}
      </>
  );
}

export default Avatares;