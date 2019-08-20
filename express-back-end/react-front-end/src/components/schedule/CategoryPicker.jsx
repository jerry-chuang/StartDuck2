import React, {useState, useEffect} from 'react';
import { Checkbox } from 'antd';
import SlideToggle from "react-slide-toggle";
import axios from 'axios';

function CategoryPicker(props) {
  const [categories, setCategories] = useState([]);
  const {pickCategories} = props;

  useEffect(()=>{
    axios.get('/api/categories')
    .then((response) => {
      setCategories(response.data.categories);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])// run only once on mount

  const categoryOptions = categories.map(category =>{
    return(
      <Checkbox
      key={ category.id }
      value={ category.id }
      onChange={ pickCategories }
      >
        { category.name }
      </Checkbox> )
  })

  return(
    <SlideToggle
      duration={800}
      collapsed
      render={({ onToggle, setCollapsibleElement}) => (
        <div className="my-collapsible">
          <button className="my-collapsible__toggle" onClick={onToggle}>
            Select Categories
          </button>
          <div className="my-collapsible__content" ref={setCollapsibleElement}>
            <div className="my-collapsible__content-inner">
              <div className="radio_style">
                { categoryOptions }
              </div>
            </div>
          </div>
        </div>
      )}
    />
  )  
};

export default CategoryPicker;
