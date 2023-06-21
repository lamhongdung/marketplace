package com.ez.marketplacebackend.service;

import com.ez.marketplacebackend.entity.Product;
import com.ez.marketplacebackend.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

import static com.ez.marketplacebackend.constant.Constant.NO_PRODUCT_FOUND_BY_ID;

@Service
public class ProductService {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private ProductRepository productRepository;

    // search products by pageNumber and based on the search criteria.
    // parameters:
    //  - pageNumber: page number
    //  - pageSize: page size
    //  - searchTerm: product name
    public List<Product> searchProducts(int pageNumber, int pageSize, String searchTerm) {

        LOGGER.info("search products");

        return productRepository.searchProducts(pageNumber, pageSize, searchTerm);
    }

    // get total products based on the search criteria
    public long getTotalElements(String searchTerm) {

        LOGGER.info("get total products based on the search criteria");

        return productRepository.getTotalElements(searchTerm);
    }

    // find product by product id
    public Product findById(Long id) throws EntityNotFoundException {

        LOGGER.info("find product by id");

        // find product by product id
        return productRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(NO_PRODUCT_FOUND_BY_ID + id));
    }

}
