# gdpr.js

gdpr.js is a jQuery cookiebanner that blocks scripts and src elements if no consent is given. 

## Initializing

```javascript
$(document).ready(function() {
	$.gpdrBanner({
		culture: 'nl',
		cookiePageUrl: {
			nl: '/privacy/',           
		}
      // more properties
	});
});
```
## Usage

#### Block src scripts

```html
<script type="text/plain" src="scripts.js" class="block-cookie"></script>
```

#### Block inline scripts

```html
<script type="text/plain" class="block-cookie">
	// Run only if consent is true
</script>
```

#### Block src elements 
```html
<iframe block-src="https://www.youtube.com/embed/kxopViU98Xo" class="block-cookie"></iframe>
```

#### Public Methods
This method returns true or false if cookies are accepted.
```javascript
$.gdprBanner.consent();
```

This method manually overwrites the cookie consent
```javascript
$.gdprBanner.setConsent(false);
```

#### Condition
```javascript
if ( $.gdprBanner.consent()) {
	// Run only if consent is true
}
```
#### Extra
The block-cookie class is removed after consent, so you can use this to show/inject a cookies are disabled message.

## Properties

#### bannerClass:
String: Banner class  
Default: 'gdpr-banner'

#### bannerLinkText:
Object: Policy page link text  
Default:
```javascript
bannerLinkText: {
  	 nl: 'Lees meer',
	en: 'Learn more',
	de: 'Mehr dazu'
},
```
#### bannerText:
Object: Banner text      
Default:
```javascript
bannerText: {
   	nl: 'Deze website maakt gebruik van cookies. Wij onderscheiden functionele cookies en cookies voor het beheer van webstatistieken, het tonen van videos, het personaliseren van advertenties en het integreren van social media. Wij slaat geen persoonlijke gegevens op.',
	en: 'This website uses cookies (also third-party cookies) to provide you a better navigation experience.',
	de: 'Diese Website verwendet Cookies, auch von Dritten, um Ihre Browser-Erfahrung zu verbessern.'
},
```
#### blockCookie:
Boolean: Run blocked elements on consent (iframe, js, img ... )  
Default: 'true'

#### blockCookieAttribute:
String: Attribute name for the original src (iframe, img ...)  
Default: 'block-src'

#### blockCookieClass:
String: Class to identify locked items (iframe, js, img ...)  
Default: 'block-cookie'

#### acceptButtonClass:
String: Class for explicit accept button  
Default: 'cookie-banner-accept'

#### declineButtonClass:
String: Class for explicit accept button  
Default: 'cookie-banner-decline'

#### acceptButtonText:
Object: accept button Text  
Default:
```javascript
acceptButtonText: {
	nl: 'Accepteren',
	en: 'Accept',
	de: 'Akzeptieren'
}
```
#### declineButtonText:
Object: decline button Text  
Default:
```javascript
declineButtonText: {
	nl: 'Weigeren',
	en: 'Decline',
	de: 'Ablehnen'
}
```
#### acceptButtonTextClass:
String: Class for accept text  
Default: 'gdpr-banner-taccept'

### declineButtonTextClass
String: Class for decline text  
Default: 'gdpr-banner-tdecline'

#### cookieExpiry:
integer: Cookie expiry in days  
Default: 365

#### cookieName:
String: Cookie name  
Default: 'cookieConsent'

#### cookiePageUrl:
String: Privacy page url  
Default:
```javascript
cookiePageUrl: {
   	nl: '',
	en: '',
	de: '',
}
```
####  language:
String: Specify the language  
Default: 'nl'

#### onConsent:
Function: Callback when cookies are accepted  
Default: function() {}

#### onNoConsent:
Function: Callback when cookies are declined  
Default: function() {}

#### prependBannerTo:
String:  Inserts banner at the beginning of this selector/class.  
Default: 'body'

#### reloadPage:
Boolean:  Reload page when button ("consentClass") is accepted  
Default: false


## More
### Event Hooks
The event triggered when cookies are accepted or declined
```javascript
$( document ).on( "onConsent", function() {
	console.log('Cookies accepted');
});


$( document ).on( "onNoConsent", function() {
	console.log('Cookies declined');
});
```

## Credits
* Fabio Quarantini (http://www.fabioquarantini.com)
* Bob Vrijland (http://www.esens.nl)

## License
[MIT License](http://opensource.org/licenses/MIT)
