const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('fs');
const { Console } = require('console');

const URL= "https://www.flipkart.com/search?q=mobiles&page=1";
const URL2 = "https://www.flipkart.com/search?q=c5"
const URL3="https://www.amazon.in/s?k=mobile"


request(URL, function (err, res, body) {
    if(err)
    {
        console.log(err);
    }
    else
    {

        const smartphones = [];
        let $ = cheerio.load(body);  //loading of complete HTML body
        if(URL.includes('flipkart')){
            $('div._2kHMtA').each(function(index){
                if(index<3){ ///!!!
                const link = $(this).find('div._2kHMtA> a').attr('href');
                const name = $(this).find('div._4rR01T').text(); //name ok
                const priceText =$(this).find('div._3tbKJL ._1_WHN1').text(); // price
                //console.log(price, name);   //link for smartphone
                // console.log(name);   //name of smartphone
                  // Extract the numeric part of the price and convert it to an integer
                const price = parseInt(priceText.replace(/\D/g, '')); ///!!!
                smartphones.push({ name, price });
    
                }
                
            });
        }else{
            console.log("AMAAAAZ")
            $('div.a-section').each(function(index, el) {
                if (index < 3) {
                    const namee = $(el).find('a.a-size-base.a-link-normal.s-no-hover.s-underline-text.s-underline-link-text.s-link-style.a-text-normal')
                        .find('.a-offscreen')
                        .text();
            
                    smartphones.push({ namee });
                }
            });
        }
    
       

        // Sort the smartphones array by price in ascending order
        smartphones.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); ///!!!

        // Now you have the smartphones sorted by price, with the lower price first
        console.log(smartphones);

    }
});
