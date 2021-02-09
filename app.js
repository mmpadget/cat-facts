'use strict';

const catFactsUrl = 'https://cat-fact.herokuapp.com/facts';
const catPicUrl = 'https://aws.random.cat/meow';

const addWords = document.querySelector('#words');
const getTxtButton = document.querySelector('#newCatFact');
const getImage = document.querySelector('img');
const getImgButton = document.querySelector('#newCatImg');

// Text data from 'createRequest' success argument
const catFactsUISuccess = function(parsedData) {
    // function(data) {
    // const parsedData = JSON.parse(data);
    // }
    const number = Math.floor(Math.random() * parsedData.length);
    addWords.textContent = parsedData[number].text;
}
const catFactsUIError = function(error) {
    console.log(error);
}

// Image data from 'createRequest' success argument
const catPicUISuccess = function (imgData) {
    getImage.src = imgData.file;
}
const catPicUIError = function(error) {
    console.log(error);
}

const handleErrors = function(response) {
    if(!response.ok) {
        //throw (response.status + ': ' + response.statusText);
        addWords.textContent = `Failed to load resource (${response.status}: ${response.statusText})`;
        throw (`${response.status}: ${response.statusText}`);
    }
    return response.json();
}

const createRequest = function(url, success, fail, init) {
    fetch(url, init)
        // .then((response) => {console.log(response)})
        // .then((response) => response.json())
        .then((response) => handleErrors(response))
        // .then((data) => {console.log(data)})
        .then((data) => success(data))
        .catch((error) => fail(error));
}

window.addEventListener('DOMContentLoaded', () => {
    createRequest(catFactsUrl, catFactsUISuccess, catFactsUIError);
    createRequest(catPicUrl, catPicUISuccess, catPicUIError);
})

getTxtButton.addEventListener('click', (event) => {
    event.preventDefault();
    createRequest(catFactsUrl, catFactsUISuccess, catFactsUIError);
})

getImgButton.addEventListener('click', (event) => {
    event.preventDefault();
    createRequest(catPicUrl, catPicUISuccess, catPicUIError);
})