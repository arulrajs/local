import React, {useState} from 'react';

export default function RealEstateForm(props) {
    const {submitHandler, imageHandler} = props;
    var fileName = '';
    let [price, setPrice] = useState(10)
    let [denomination, setDenomination] = useState("Thousand")
    const handleSubmit = event => {
        event.preventDefault();
        console.log(event); 
        let prop_type = "";
        var ele = document.getElementsByName('prop_type');
            for(let i = 0; i < ele.length; i++) {
                if(ele[i].checked)
                    prop_type = ele[i].value;
            }
        const data = {"type": "realestate", "prop_type": prop_type, "contact": event.target.contact.value,
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

    const typeSelection = evt =>{
        console.log(evt);
        if (evt.target.id === "prop_buy" || evt.target.id === "prop_sell"){
            setDenomination(" Lakhs")
        }else{
            setDenomination(" Thousands")
        }
    }

    const handleRangeChange = evt =>{
        setPrice(evt.target.value);
    }

    return(
        <form onSubmit={handleSubmit}>
            <table align='left' padding="10px 10px 10px 10px">
                <tbody padding="10px">
                    <tr>
                        <td><label>Property for </label></td>
                        <td>
                            <input type='radio' name="prop_type" id="prop_sell" value="Sell" onChange={typeSelection} /> <label for="prop_sell">Sell</label>
                            <input type='radio' name="prop_type" id="prop_buy" value="Buy" onChange={typeSelection} /> <label for="prop_buy">Buy</label>
                            <input type='radio' name="prop_type" id="prop_let" value="Let out" onChange={typeSelection} /> <label for="prop_let">Let out</label>
                            <input type='radio' name="prop_type" id="prop_rent" value="Rent" onChange={typeSelection} /> <label for="prop_rent">Rent</label>
                        </td>
                    </tr>
                    <tr padding="10px">
                        <td>
                            <label>Price range</label>
                        </td>
                        <td>
                            <input type="range" min="1" max="100" value={price} class="slider" id="priceRange" onChange={handleRangeChange} />
                            <label>{price}</label><label>{denomination}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Category</label>
                        </td>
                        <td>
                        <select id="category">
                            <option value="Plot">Plot</option>
                            <option value="Independent House">Independent House</option>
                            <option value="Appartment">Appartment</option>
                            <option value="Commercial">Commercial Building</option>
                            <option value="Godown">Godown</option>
                            <option value="Others">Others..</option>
                        </select>
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
                            <label>Location</label>
                        </td>
                        <td>
                            <input type="text" placeholder="location" id="location"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Landmark</label>
                        </td>
                        <td>
                            <input type="text" placeholder="landmark" id="landmark"/>
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