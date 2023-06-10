import React, { useState } from 'react';
import { render } from 'react-dom';
import { roles } from './Roles.json';
import { WithContext as ReactTags } from 'react-tag-input';

var suggestions = require('./Roles.json');
var data = undefined;
const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function Roles({handleInput}){
  
  const [tags, setTags] = React.useState([]);

  const handleDelete = i => {
    data = tags.filter((tag, index) => index !== i)
    setTags(data);
    handleInput(JSON.stringify(data))
  };

  const handleAddition = tag => {
    data = [...tags, tag]
    setTags(data);
    handleInput(JSON.stringify(data))
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    handleInput(JSON.stringify(data))
    setTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  return (
    <ReactTags 
        tags={tags}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        inputFieldPosition="bottom"
        autocomplete
    >
    
    </ReactTags>
  );
};