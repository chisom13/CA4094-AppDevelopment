var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */

router.get('/', async(req, res, next) => {
  try {
    const prodAPI = await axios.get('http://127.0.0.1:8000/products/');
    res.render('index', { title: 'Home', products: prodAPI.data});
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if(error.request) {
      console.log(error.request);
    } else {
      console.error('Error', error.message);
    }
  }
})

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/my-orders', function(req, res, next) {
  res.render('my-orders', { title: 'My Orders' });
});

router.get('/all-products', async(req, res, next) => {
  try {
    const prodAPI = await axios.get('http://127.0.0.1:8000/products/');
    res.render('all-products', { title: 'All-Products', products: prodAPI.data});
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if(error.request) {
      console.log(error.request);
    } else {
      console.error('Error', error.message);
    }
  }
})

router.post('/all-products', async(req, res, next) => {
  let searchQuery = req.body.search
  console.log(searchQuery);

  try {
    const prodAPI = await axios.get(`http://127.0.0.1:8000/products?search=${searchQuery}`);
    console.log(prodAPI.data);
    res.render('all-products-search', { title: 'All-Products', products: prodAPI.data, search: searchQuery});
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if(error.request) {
      console.log(error.request);
    } else {
      console.error('Error', error.message);
    }
  }
})

router.get('/products/:id', async(req, res, next) => {
  let prodID = req.params.id
  let urlOne = `http://127.0.0.1:8000/products/${prodID}`;
  let urlTwo = 'http://127.0.0.1:8000/products/'
  console.log();
  try {
    const prodAPI = await axios.all([axios.get(urlOne), axios.get(urlTwo)]);
    res.render('products', { title: 'Products', product: prodAPI[0].data, products: prodAPI[1].data});
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if(error.request) {
      console.log(error.request);
    } else {
      console.error('Error', error.message);
    }
  }
})

router.get('/styles', function(req, res, next) {
  res.render('styles', { title: 'Styles' });
});

router.get('/sign-up', function(req, res, next) {
  res.render('sign-up', { title: 'Sign-up' });
});

router.get('/basket', async(req, res, next) => {
  try {
    const prodAPI = await axios.get('http://127.0.0.1:8000/products/');
    res.render('basket', { title: 'Checkout', products: prodAPI.data});
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if(error.request) {
      console.log(error.request);
    } else {
      console.error('Error', error.message);
    }
  }
})

router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Checkout' });
});

module.exports = router;
