# UCRMJS - Wrapper library around Ubiquiti's UCRM Rest API

This is a NodeJS library around Ubiquiti's UCRM API.

This code is in very alpha stages, API is **NOT** yet frozen and might change without notice.

### Example Usage

```javascript

const UCRM = require('@diegomax/ucrmjs');

let config = {
    // String: Fully qualified domain name to your UCRM installation.
    "fqdn": "your.ucrmdomain.com",
    // Boolean: Connect using SSL
    "ssl": true,
    // API Token (You can generate one from UCRM's "System > Security")
    "token": "ucrmapitoken"
}

// Instantiate an UCRM instance. By using getInstance() you are assured that the same instance will always be returned (singleton behavior);
let ucrm = new UCRM(config).getInstance();

// Get an array with all services. All methods return promises.
ucrm.getServices()
.then(services => {
    console.log(services[0]);
})
```

Check the source code for a list of all the implemented methods.

License: MIT.
