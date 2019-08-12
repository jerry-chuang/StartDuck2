import React from 'react';
import { Checkbox } from 'antd';
import SlideToggle from "react-slide-toggle";
import axios from 'axios';


class CategoryPicker extends React.Component{

    constructor(props) {
      super(props)
      this.state = {
        categories: []
    }
  }

    componentDidMount() {
        axios.get('/api/categories')
        .then((response) => {
          console.log('response from api/categoreis', response)
          this.setState({
            categories: response.data.categories
          });
        })
      }

    sendSelectedCategories = e => {
      this.props.onSelectedCategories(e.target.value)
    }

    render() {
      const categories = this.state.categories.map(category =>{
        return( <Checkbox
                 key={ category.id }
                 value={ category.id }
                 onChange={ this.sendSelectedCategories }
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
                    { categories }
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      )
   }
  };

export default CategoryPicker;


