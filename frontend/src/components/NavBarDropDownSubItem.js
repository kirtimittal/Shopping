import { Link } from "react-router-dom";

function NavBarDropDownSubItem({ category, parentCat }) {
  return (
    <>
      <Link
        to={`/${parentCat.name.toLowerCase()}/${category.name.toLowerCase()}`}
      >
        {category.name}
      </Link>
    </>
  );
}

export default NavBarDropDownSubItem;
