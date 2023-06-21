package com.ez.marketplacebackend.controller;

import com.ez.marketplacebackend.entity.Product;
import com.ez.marketplacebackend.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityNotFoundException;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
public class ProductController {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private ProductService productService;

    //
    // search products by pageNumber based on the search criteria
    //
    // url: ex: /product-search?pageNumber=0&pageSize=8&searchTerm=
    // parameters:
    //  - pageNumber: page number
    //  - pageSize: page size(default = 8)
    //  - searchTerm: product name. '' is for search all
    @GetMapping("/product-search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam int pageNumber,
                                                        @RequestParam int pageSize,
                                                        @RequestParam(defaultValue = "") String searchTerm) {

        // get all products of 1 page
        List<Product> products = productService.searchProducts(pageNumber, pageSize, searchTerm);

        return new ResponseEntity<>(products, OK);
    }

    //
    // get total products based on the search criteria.
    //
    // url: ex: /product-total-elements?searchTerm=
    //
    // all users can access this end point "/product-total-elements"
    @GetMapping("/product-total-elements")
    public ResponseEntity<Long> getTotalElements(@RequestParam(defaultValue = "") String searchTerm) {

        // get total products based on the search criteria
        long totalElements = productService.getTotalElements(searchTerm);

        return new ResponseEntity<>(totalElements, HttpStatus.OK);
    }

    // find product by id.
    // this method is used for View product detail.
    // all users can access this end point "/product-list/{id}"
    @GetMapping("/product-list/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) throws EntityNotFoundException {

        LOGGER.info("find product by id: " + id);

        Product product = productService.findById(id);

        return new ResponseEntity<>(product, OK);
    }

}
