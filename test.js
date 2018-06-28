//This test will fail with firefox browser because of an invalid certificate error

const assert = require('chai').assert;

describe('checks "https://internet.frontier.com/?lp=6108" homepage opens successfully', function() {
    it('should have the right title', function() {
        
        //Open the homepage for Frontier Communications
        browser.url('');

        //Gets the title of the page once it loads and calls it "title"
        var title = browser.getTitle();

        //Verifies that the returned title matches as expected
        assert.equal(title,'Frontier® Internet Service | 855-858-4802 | Frontier Communications');
        
        //Prints the title to the console
        console.log('Title of homepage is: ' + title);
    });
});


describe('checks initial price on homepage', function() {
    it('should print and verify the inital price on homepage', function(){
        
        //Open the homepage for Frontier Communications
        browser.url('');  

        //Gets the initial pricing displayed on homepage
        var priceTitle = browser.getText('.price__title=Frontier Internet starting at');
        var priceCurrency = browser.getText('.price__currency=$');
        var priceDollars = browser.getText('.price__dollars=20');
        var priceFreq = browser.getText('.price__frequency*=mo');
        var initPrice = priceTitle+' '+priceCurrency+priceDollars+priceFreq;
        
        //Checks that the initial pricing matches as expected and prints result to console
        assert.equal(initPrice,'Frontier Internet starting at $20/mo[1]');
        console.log('Intial Pricing on homepage is: '+initPrice);
    });
});


describe('"Shop Frontier Internet Plans" button', function() {
    it('should have a link to Services page', function() {
        
        //Open the homepage for Frontier Communications
        browser.url('');
        
        //Checks that the Services link exists on homepage
        var hasServicesLink = browser.isExisting('a[href="/services/"]');
        assert(hasServicesLink);
    });
});


describe('Zip Code search field', function(){
      it('should return an error "Address is required." when clicking on submit button without entering a zip code', function() {
        
        //Open the homepage for Frontier Communications
        browser.url('');

        //Clicks the Zip Code search button
        browser.click('.form-address-check__button');

        //Checks that the page displays an error and prints the error to console
        var formError = browser.getText('.form__error--home=Address is required.');
        console.log(formError);
        assert.exists(formError);
    });
});


describe('"Shop Online" button', function() {
    it('should take you to the Cart page', function() {
        
        //Open the homepage for Frontier Communications
        browser.url('');

        //Clicks the Shop Online button, waits for 5 seconds
        browser.click('a[href="/cart/"]');
        browser.pause(5000);

        //Checks that the next page loads and prints the new page's url to console
        var url = browser.getUrl();
        assert.equal(url,'https://internet.frontier.com/cart/address');
        console.log('Cart Url is: ' + url);
    });
});


describe('Address Checker', function(){
    it('should check availability for the submitted address and return as unserviceable', function(){
        
        //Open the cart page
        browser.url('https://internet.frontier.com/cart/address');

        //Enter the value for street address and zip code; clicks submit and waits
        browser.setValue('input[name="StreetAddress"]', '391 Agnew Road');
        browser.setValue('input[name="Zip"]', '28117');
        browser.click('button.h-font-light');
        browser.pause(9999);

        //Checks that the new page loads with the unserviceable message
        var text = browser.getText('.headline-primary*=Looks like Frontier Internet');
        console.log(text);
        assert(text);
    });
});

describe('"Availability" link opens', function(){
    it('should take you to the Availability page',function(){
        
        ///Open the homepage for Frontier Communications
        browser.url('');

        //Clicks the tab for Availability and waits
        browser.click('=Availability');
        browser.pause(5000);
        
        //Checks that the url for the Availability page matches as expected
        var url = browser.getUrl();
        assert.equal(url,'https://internet.frontier.com/local/');
    });
});

