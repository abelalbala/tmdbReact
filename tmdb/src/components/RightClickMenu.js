const RightClickMenu = ({ data, onListItemClick }) => {
    const menuStyles = {
        position: 'absolute',
        top: `${data.posY}px`,
        left: `${data.posX}px`,
        zIndex: 1000, // Afegeix aquesta línia per assegurar-te que el menú està per sobre d'altres elements
        backgroundColor: 'white', // Afegeix aquesta línia per donar al menú un fons blanc
        border: '1px solid #ccc', // Afegeix aquesta línia per donar al menú un contorn
        borderRadius: '5px', // Afegeix aquesta línia per arrodonir les cantonades del menú
        padding: '5px', // Afegeix aquesta línia per afegir una mica d'espaiat al menú
      };
  
    return data.show ? (
      <div style={menuStyles}>
        <button onClick={() => onListItemClick(data.movie)}>
            Favoritos
        </button>
      </div>
    ) : null;
};
export default RightClickMenu;
  