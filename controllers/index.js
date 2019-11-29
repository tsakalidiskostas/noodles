'use strict';

// const NotificationLogic = rootRequire('components/Test/NotificationLogic');

/*
 * GET home page.
 */
exports.index = function(req, res){
    console.log("connecting to page");
    // NotificationLogic.getCountriesList(function(countriesList){
    //     const params = {
    //         title: 'Home page',
    //         countriesList : countriesList
    //     };

         res.render('index', params);
    // });
    
};