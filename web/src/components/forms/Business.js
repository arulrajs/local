export default function BusinessForm(props) {
    const {submitHandler, imageHandler} = props;
    var fileName = '';
    const handleSubmit = event => {
        event.preventDefault();
        console.log(event); 
        const data = {"type": "business", "name": event.target.name.value, "address": event.target.address.value, "contact": event.target.contact.value,
                        "location": event.target.location.value, "open":event.target.open_timing.value, "close":event.target.close_timing.value,
                        "category": event.target.category.value, "fileName": fileName, "holiday":event.target.holiday.value
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

    return(
        <form onSubmit={handleSubmit}>
            <table align='left' padding="10px 10px 10px 10px">
                <tbody padding="10px">
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
                            <label>Location</label>
                        </td>
                        <td>
                            <input type="url" placeholder="location" id="location"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Opening time</label>
                        </td>
                        <td>
                            <input type="time" placeholder="Opening timing" id="open_timing"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Closing time</label>
                        </td>
                        <td>
                            <input type="time" placeholder="Closing time" id="close_timing"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Holiday</label>
                        </td>
                        <td>
                        <select id='holiday'>
                            <option value="Sunday">Sunday</option>
                            <option value="Friday">Friday</option>
                        </select>
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
                    <tr>
                        <td>
                            <label>Category</label>
                        </td>
                        <td>
                        <select id="category">
                            <option value="Grocery shop">Grocery shop</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Medical">Medical</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fancy store">Fancy store</option>
                            <option value="Hospital">Hospital</option>
                            <option value="Mechanic">Mechanic</option>
                            <option value="Studio">Studio</option>
                            <option value="Others">Others..</option>
                        </select>
                        </td>
                    </tr>
                    <tr ><td></td><td align='center' style={{ height:"20px", padding:"10px"}}><input type="submit" /></td></tr>
                </tbody>
                
            </table>
        </form>
    );

}