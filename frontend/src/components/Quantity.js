import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

function Quantity({ data, onClickHandle }) {
  console.log(data);
  const [selected, setSelected] = useState(1);
  //   if (sizeSelected) {
  //     setSelected(false);
  //   }
  console.log(selected);
  return (
    <>
      <Dropdown value={selected}>
        <Dropdown.Toggle variant="success">
          {selected ?? "Select Qty"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {data &&
            data.map((item, index) => (
              <Dropdown.Item
                href="#"
                onClick={() => {
                  setSelected(item);
                  onClickHandle(item);
                }}
                key={index}
              >
                {item}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
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

export default Quantity;
