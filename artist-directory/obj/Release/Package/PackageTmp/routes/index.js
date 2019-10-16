'use strict';
var express = require('express');
var app = express.Router();
let path = require('path')
// let fs = require('fs')
// const fs = require('azure-storage-fs').blob(accountName, secret, container);

var getData = function () {
    var data = {
        'item1': 'http://public-domain-photos.com/free-stock-photos-1/flowers/cactus-76.jpg',
        'item2': 'http://public-domain-photos.com/free-stock-photos-1/flowers/cactus-77.jpg',
        'item3': 'http://public-domain-photos.com/free-stock-photos-1/flowers/cactus-78.jpg'
    }
    return data;
}

app.use(express.static(path.join(__dirname, 'public')))

/* GET home page. */
app.get('/', function (req, res) {

    // my site template as string
    var index_string_above = '<!DOCTYPE html><html><head>'
        + '<title>Ross White COMP 4711 Lab 5 Home Page</title>'
        + '<link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet">'
        + '<link rel="stylesheet" type="text/css" href="/css/lab05_CSS.css">'
        + '<script src="/javascript/lab05_JS.js" defer></script></head>'
        + '<body onload="initial_hide()"></p>'
        + '<div id="artist_app_id" class="artist_app_class">'
        + '<div class="directory" id="directory">'
        + '<h1>Artist Directory</h1>'
        + '<input type="text" id="artist_input">'
        + '<button id="search_artist_btn" onclick="search_artist()">Search</button>'
        + '<button id="add_artist_btn" onclick="hide_add_artist_div()">Add</button><br><br></div>'
        + '<form id="new_artist_div_id" class="new_artist_div_class" method="POST" action="/">'
        + '<input type="text" id="new_artist_name_field" name="new_artist_name_field" required="true" maxlength="40" placeholder="Artist Name" class="artist_lookup_fields">'
        + '<input type="text" id="new_artist_about_field" name="new_artist_about_field" required="true" maxlength="40" placeholder="About artist" class="artist_lookup_fields">'
        + '<input type="text" id="new_artist_img_field" name="new_artist_img_field" required="true" placeholder="Image url" class="artist_lookup_fields"><br>'
        + '<input type="submit" id="add_btn" value="Add"></input></form>'
        + '<div id="saved_artists_div"></div>'

    var index_string_below = '</div></div>'
        + '<br><br><div><form method="POST" action="/delete_all"><input type="submit" id="add_btn" value="Delete All Artitsts"></input></form></div></body></html>'

    var artists_file = require(__dirname + '\\artists.json');

    res.write(index_string_above);

    for (var i = 0; i < artists_file.length; i++) {
        // creating a text html node
        var artist_i = artists_file[i]
        var new_artist_string = '<div class="artist">'
            + '<form method="POST" action="/delete_single"><input type="submit" name="jim" class="delete_btn" value="Delete"></input>'
            // this is super ugly, must be a better way to do this
            + '<input type="test" id="for_delete_reference" name="for_delete_reference" value="' + artist_i.name + '" style="display: none">'
            + '<img alt="image not found" src="' + artist_i.img + '">'
            + '<h2>' + artist_i.name + '</h2>'
            + '<p name="' + artist_i.name + '">' + artist_i.about + '</p></div></form>'
        res.write(new_artist_string)
    }

    // var artist1 = artists_file[0].name

    console.log(artists_file.length)

    res.write(index_string_below);

    res.end()

});

module.exports = app;
