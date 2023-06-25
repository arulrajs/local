import React, {useState} from 'react';
export default function ServiceForm(props) {
    const {submitHandler, imageHandler} = props;
    let [price, setPrice] = useState(300)
    var fileName = '';
    const handleSubmit = event => {
        event.preventDefault();
        console.log(event); 
        const data = {"type": "service", "contact": event.target.contact.value,
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
                            <option value="Painter">Painter</option>
                            <option value="Mason">Mason</option>
                            <option value="Load man">Load man</option>
                            <option value="Electrician">Electrician</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Chef">Chef</option>
                            <option value="Driver">Driver</option>
                            <option value="Maid">Maid</option>
                            <option value="Helper">Helper</option>
                        </select>
                        </td>
                    </tr>
                    <tr padding="10px">
                        <td>
                            <label>Price range</label>
                        </td>
                        <td>
                            <input type="range" min="100" max="2000" value={price} class="slider" id="priceRange" onChange={handleRangeChange} />
                            <label>{price}</label><label> Rs/Day</label>
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
                            <input type="file" id="picture" onChange={handleFileChange} accept="image/*" capture/>
                        </td>
                    </tr>
                   
                    <tr ><td></td><td align='center' style={{ height:"20px", padding:"10px"}}><input type="submit" /></td></tr>
                </tbody>
                
            </table>
        </form>
    );

}