import React, {useState} from 'react';
export default function FarmingForm(props) {
    const {submitHandler, imageHandler} = props;
    let [price, setPrice] = useState(10)
    var fileName = '';
    const handleSubmit = event => {
        event.preventDefault();
        console.log(event); 
        const data = {"type": "farming", "contact": event.target.contact.value,
                      "location": event.target.location.value, "landmark": event.target.landmark.value,
                      "category": event.target.category.value, "fileName": fileName, "price": price
                    }
        submitHandler(data);
    };

    const handleFileChange = event => {
        console.log(event); 
        let files = event.target.files;
        let f = files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            console.log('RESULT', reader.result)
            imageHandler(reader.result, fileNameHandler );
        }
      reader.readAsDataURL(f);
    }

    const fileNameHandler = name =>{
        console.log(name); 
        fileName = name;
    }

    const handleRangeChange = evt =>{
        setPrice(evt.target.value);
    }

    return(
        <form onSubmit={handleSubmit}>
            <table align='left' padding="10px 10px 10px 10px">
                <tbody padding="10px">
                    <tr>
                        <td>
                            <label>Category</label>
                        </td>
                        <td>
                        <select id="category">
                            <option value="Bringal">Bringal</option>
                            <option value="Ladies Finger">Ladies Finger</option>
                            <option value="Tomato">Tomato</option>
                            <option value="Cluster beans">Cluster beans</option>
                            <option value="Sweet Potato">Sweet Potato</option>
                            <option value="Banana">Banana</option>
                            <option value="Guava">Guava</option>
                            <option value="Lemon">Lemon</option>
                            <option value="Rice">Rice</option>
                            <option value="Groundnut">Groundnut</option>
                            <option value="Other vegetables">Other vegetables..</option>
                            <option value="Other fruits">Other fruits</option>
                        </select>
                        </td>
                    </tr>
                    <tr padding="10px">
                        <td>
                            <label>Price range</label>
                        </td>
                        <td>
                            <input type="range" min="5" max="100" value={price} class="slider" id="priceRange" onChange={handleRangeChange} />
                            <label>{price}</label><label> Rs/KG</label>
                        </td>
                    </tr>
                    <tr padding="10px">
                        <td>
                            <label>name</label>
                        </td>
                        <td>
                            <input type="text" placeholder="name" id="name"/>
                        </td>
                    </tr>
                    <tr padding="10px">
                        <td>
                            <label>Address</label>
                        </td>
                        <td>
                            <textarea placeholder="address" id="address"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Description</label>
                        </td>
                        <td>
                            <textarea placeholder="Description" id="description"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Contact</label>
                        </td>
                        <td>
                            <input type="tel" placeholder="contact" id="contact"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Place</label>
                        </td>
                        <td>
                            <input type="url" placeholder="place" id="place"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Picture</label>
                        </td>
                        <td>
                            <input type="file" id="picture" onChange={handleFileChange}/>
                        </td>
                    </tr>
                   
                    <tr ><td></td><td align='center' style={{ height:"20px", padding:"10px"}}><input type="submit" /></td></tr>
                </tbody>
                
            </table>
        </form>
    );

}