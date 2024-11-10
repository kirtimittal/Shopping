import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import "../css/Filter.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function FilterCategory({ data, onCheckChange, selectedBrand }) {
  const [checked, setChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setChecked(false);
  }, [location]);

  return (
    <div className="filter-item">
      <Form>
        <Form.Check
          type="checkbox"
          id={data}
          label={data}
          checked={selectedBrand.includes(data.toLowerCase()) ? true : false}
          onChange={(e) => {
            onCheckChange(e.target.id, e.target.checked);
            setChecked(e.target.checked);
          }}
        />
      </Form>
    </div>
  );
}

export default FilterCategory;
