import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

function Size({ data, onClickHandle, itemid }) {
  console.log(data);
  const [selected, setSelected] = useState(null);
  //   if (sizeSelected) {
  //     setSelected(false);
  //   }
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success">
          {selected ?? "Select Size"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {data &&
            data.map((item) => (
              <Dropdown.Item
                href="#"
                onClick={() => {
                  setSelected(item);
                  onClickHandle(selected);
                }}
                key={itemid}
              >
                {item}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
    // <div
    //   className={selected ? "size-item divBorder" : "size-item"}
    //   onClick={() => {
    //     setSelected(!selected);
    //     onClickHandle();
    //   }}
    // >

    //   <h4 className={selected ? "selectedSizecolor" : ""}>{data.name}</h4>
    // </div>
  );
}

export default Size;
