package com.ez.marketplacebackend.repository;

import com.ez.marketplacebackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // search products based on pageNumber, pageSize and searchTerm(product name)
    @Query(value = "" +
            " select a.* " +
            " from product a " +
            " where a.name like %:searchTerm% " + // searchTerm
            " limit :pageNumber,:pageSize " // pageNumber and pageSize
            , nativeQuery = true)
    public List<Product> searchProducts(@Param("pageNumber") int pageNumber,
                                        @Param("pageSize") int pageSize,
                                        @Param("searchTerm") String searchTerm);

    // get total elements for pagination
    @Query(value = "" +
            " select count(a.id) as totalElements " +
            " from product a " +
            " where a.name like %:searchTerm% " // searchTerm
            , nativeQuery = true)
    public long getTotalElements(@Param("searchTerm") String searchTerm);

}