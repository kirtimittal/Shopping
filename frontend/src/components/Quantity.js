import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

function Quantity({ data, onClickHandle }) {
  const [selected, setSelected] = useState(1);

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
  );
}

export default Quantity;
