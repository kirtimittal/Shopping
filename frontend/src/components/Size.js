import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

function Size({ data, onClickHandle, itemid }) {
  console.log(data);
  const [selected, setSelected] = useState(null);
  //   if (sizeSelected) {
  //     setSelected(false);
  //   }
  console.log(selected);
  return (
    <>
      {data &&
        data.map((item, index) => (
          <div
            className={selected === item ? "size-item divBorder" : "size-item"}
            key={index}
            onClick={() => {
              setSelected(item);
              onClickHandle(item);
            }}
          >
            {item}
          </div>
          //   href="#"
          //   onClick={() => {
          //     setSelected(item);
          //     onClickHandle(selected);
          //   }}
          //   key={itemid}
          // >
          //   {item}
          // </Dropdown.Item>
        ))}

      {/* <Dropdown>
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
      </Dropdown> */}
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

export default Size;
